import cron from 'node-cron';
import MatrimonyProfile from '../models/MatrimonyProfile';
import { deleteMultipleImages } from '../services/cloudinary.service';
import logger from '../utils/logger';

export const startMatrimonyCleanupJob = (): void => {
  const cronExpression = process.env.MATRIMONY_CLEANUP_CRON || '0 2 * * *'; // Default: 2 AM daily

  cron.schedule(cronExpression, async () => {
    try {
      logger.info('Starting matrimony profile cleanup job...');

      // Find all profiles scheduled for deletion
      const profilesToDelete = await MatrimonyProfile.find({
        isCompleted: true,
        scheduledDeletion: { $lte: new Date() },
      });

      logger.info(`Found ${profilesToDelete.length} profiles to delete`);

      for (const profile of profilesToDelete) {
        try {
          // Delete photos from Cloudinary
          const publicIds = profile.photos.map((photo) => photo.publicId);
          if (publicIds.length > 0) {
            await deleteMultipleImages(publicIds);
            logger.info(`Deleted ${publicIds.length} photos from Cloudinary for profile ${profile._id}`);
          }

          // Delete profile from database
          await profile.deleteOne();
          logger.info(`Deleted profile ${profile._id} from database`);
        } catch (error) {
          logger.error(`Failed to delete profile ${profile._id}:`, error);
          // Continue with next profile even if one fails
        }
      }

      logger.info('Matrimony profile cleanup job completed');
    } catch (error) {
      logger.error('Error in matrimony cleanup job:', error);
    }
  });

  logger.info(`Matrimony cleanup cron job scheduled: ${cronExpression}`);
};

