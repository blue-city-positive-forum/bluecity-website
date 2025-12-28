import { format, formatDistance, parseISO } from 'date-fns';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: Date | string | undefined, formatStr: string = 'PPP'): string => {
  if (!date) return 'N/A';
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Invalid date format:', date);
    return 'N/A';
  }
};

export const formatRelativeTime = (date: Date | string | undefined): string => {
  if (!date) return 'N/A';
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistance(dateObj, new Date(), { addSuffix: true });
  } catch (error) {
    console.error('Invalid date format:', date);
    return 'N/A';
  }
};

export const calculateAge = (dateOfBirth: Date | string | undefined): number => {
  if (!dateOfBirth) return 0;
  try {
    const dob = typeof dateOfBirth === 'string' ? parseISO(dateOfBirth) : dateOfBirth;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    return age;
  } catch (error) {
    console.error('Invalid date format for age calculation:', dateOfBirth);
    return 0;
  }
};

export const formatHeight = (heightInCm: number): string => {
  const feet = Math.floor(heightInCm / 30.48);
  const inches = Math.round((heightInCm % 30.48) / 2.54);
  return `${feet}'${inches}" (${heightInCm} cm)`;
};

export const formatPhone = (phone: string): string => {
  // Format: +91 XXXXX XXXXX
  if (phone.startsWith('+91')) {
    return phone;
  }
  return `+91 ${phone}`;
};

