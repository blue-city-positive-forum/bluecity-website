import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { Badge } from '../../components/ui/Badge';
import { adminService } from '../../services/adminService';
import { useUIStore } from '../../store/uiStore';
import { formatRelativeTime } from '../../utils/formatters';

interface DashboardStats {
  totalUsers: number;
  pendingUsers: number;
  approvedUsers: number;
  suspendedUsers: number;
  totalMembers: number;
  totalMatrimonies: number;
  pendingMatrimonies: number;
  activeMatrimonies: number;
  totalEvents: number;
  upcomingEvents: number;
  totalPhotos: number;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const showAlert = useUIStore((state) => state.showAlert);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch stats from various endpoints
      const [pendingUsers, allUsers, pendingMatrimonies] = await Promise.all([
        adminService.getPendingUsers(),
        adminService.getAllUsers(),
        adminService.getPendingMatrimonies(),
      ]);

      const approvedUsers = allUsers.filter(u => u.isApproved);
      const suspendedUsers = allUsers.filter(u => u.isSuspended);
      const members = allUsers.filter(u => u.isMember);

      setStats({
        totalUsers: allUsers.length,
        pendingUsers: pendingUsers.length,
        approvedUsers: approvedUsers.length,
        suspendedUsers: suspendedUsers.length,
        totalMembers: members.length,
        totalMatrimonies: 0, // Would come from a separate endpoint
        pendingMatrimonies: pendingMatrimonies.length,
        activeMatrimonies: 0,
        totalEvents: 0,
        upcomingEvents: 0,
        totalPhotos: 0,
      });
    } catch (error) {
      showAlert('Failed to load dashboard data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Spinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon="👥"
            color="blue"
          />
          <StatCard
            title="Pending Approval"
            value={stats?.pendingUsers || 0}
            icon="⏳"
            color="yellow"
            link="/admin/users"
          />
          <StatCard
            title="Total Members"
            value={stats?.totalMembers || 0}
            icon="⭐"
            color="green"
          />
          <StatCard
            title="Suspended"
            value={stats?.suspendedUsers || 0}
            icon="🚫"
            color="red"
          />
        </div>

        {/* Matrimony Stats */}
        <div>
          <h2 className="text-2xl font-bold text-blue-city-text mb-4">Matrimony</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Pending Profiles"
              value={stats?.pendingMatrimonies || 0}
              icon="💑"
              color="yellow"
              link="/admin/matrimonies"
            />
            <StatCard
              title="Active Profiles"
              value={stats?.activeMatrimonies || 0}
              icon="✓"
              color="green"
            />
            <StatCard
              title="Total Profiles"
              value={stats?.totalMatrimonies || 0}
              icon="📋"
              color="blue"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-blue-city-text mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard
              title="User Management"
              description="Approve, reject, or manage user accounts"
              icon="👤"
              link="/admin/users"
              badge={stats?.pendingUsers}
            />
            <ActionCard
              title="Matrimony Management"
              description="Manage matrimony profiles and completions"
              icon="💍"
              link="/admin/matrimonies"
              badge={stats?.pendingMatrimonies}
            />
            <ActionCard
              title="Events Management"
              description="Create and manage community events"
              icon="📅"
              link="/admin/events"
            />
            <ActionCard
              title="Gallery Management"
              description="Upload and manage event photos"
              icon="📸"
              link="/admin/gallery"
            />
            <ActionCard
              title="Reports"
              description="View analytics and reports"
              icon="📊"
              link="/admin/reports"
            />
            <ActionCard
              title="Settings"
              description="Configure system settings"
              icon="⚙️"
              link="/admin/settings"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-blue-city-text mb-4">Recent Activity</h2>
          <Card className="p-6">
            <p className="text-gray-500 text-center py-8">
              Recent activity feed coming soon...
            </p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Helper Components
const StatCard: React.FC<{
  title: string;
  value: number;
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'red';
  link?: string;
}> = ({ title, value, icon, color, link }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    red: 'from-red-500 to-red-600',
  };

  const content = (
    <Card className={`p-6 bg-gradient-to-br ${colorClasses[color]} text-white ${link ? 'cursor-pointer hover:shadow-xl transition-shadow' : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm mb-1">{title}</p>
          <p className="text-4xl font-bold">{value}</p>
        </div>
        <div className="text-5xl opacity-80">{icon}</div>
      </div>
    </Card>
  );

  return link ? <Link to={link}>{content}</Link> : content;
};

const ActionCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  link: string;
  badge?: number;
}> = ({ title, description, icon, link, badge }) => (
  <Link to={link}>
    <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer h-full relative">
      {badge !== undefined && badge > 0 && (
        <div className="absolute top-4 right-4">
          <Badge variant="error">{badge}</Badge>
        </div>
      )}
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-blue-city-text mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </Card>
  </Link>
);

