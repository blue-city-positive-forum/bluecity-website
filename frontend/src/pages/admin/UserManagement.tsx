import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { adminService } from '../../services/adminService';
import { useUIStore } from '../../store/uiStore';
import { formatDate, formatRelativeTime } from '../../utils/formatters';
import type { User } from '../../types/auth.types';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'suspended'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'approve' | 'reject' | 'suspend' | 'makeAdmin' | null>(null);
  const showAlert = useUIStore((state) => state.showAlert);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, filter, searchTerm]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const fetchedUsers = await adminService.getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      showAlert('Failed to load users', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...users];

    // Apply status filter
    if (filter === 'pending') {
      filtered = filtered.filter(u => !u.isApproved);
    } else if (filter === 'approved') {
      filtered = filtered.filter(u => u.isApproved);
    } else if (filter === 'suspended') {
      filtered = filtered.filter(u => u.isSuspended);
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.phone.includes(term)
      );
    }

    setFilteredUsers(filtered);
  };

  const handleApprove = async (userId: string) => {
    try {
      await adminService.approveUser(userId);
      showAlert('User approved successfully', 'success');
      fetchUsers();
    } catch (error) {
      showAlert('Failed to approve user', 'error');
    }
  };

  const handleReject = async (userId: string) => {
    try {
      await adminService.rejectUser(userId);
      showAlert('User rejected successfully', 'success');
      fetchUsers();
    } catch (error) {
      showAlert('Failed to reject user', 'error');
    }
  };

  const handleSuspend = async (userId: string, suspend: boolean) => {
    try {
      if (suspend) {
        const reason = prompt('Enter suspension reason:');
        if (!reason) return;
        await adminService.suspendUser(userId, reason);
        showAlert('User suspended successfully', 'success');
      } else {
        await adminService.unsuspendUser(userId);
        showAlert('User unsuspended successfully', 'success');
      }
      fetchUsers();
    } catch (error) {
      showAlert(`Failed to ${suspend ? 'suspend' : 'unsuspend'} user`, 'error');
    }
  };

  const handleMakeAdmin = async (userId: string) => {
    try {
      await adminService.makeAdmin(userId);
      showAlert('User granted admin privileges', 'success');
      fetchUsers();
    } catch (error) {
      showAlert('Failed to grant admin privileges', 'error');
    }
  };

  const handleMarkAsPaid = async (userId: string) => {
    try {
      await adminService.markAsPaidMember(userId);
      showAlert('User marked as paid member', 'success');
      fetchUsers();
    } catch (error) {
      showAlert('Failed to mark user as paid', 'error');
    }
  };

  const handleBulkAction = async () => {
    if (selectedUsers.size === 0 || !confirmAction) return;

    try {
      const userIds = Array.from(selectedUsers);
      
      if (confirmAction === 'approve') {
        await adminService.bulkApproveUsers(userIds);
        showAlert(`${userIds.length} users approved successfully`, 'success');
      } else if (confirmAction === 'reject') {
        await adminService.bulkRejectUsers(userIds);
        showAlert(`${userIds.length} users rejected successfully`, 'success');
      }

      setSelectedUsers(new Set());
      setConfirmAction(null);
      setShowConfirmDialog(false);
      fetchUsers();
    } catch (error) {
      showAlert('Bulk action failed', 'error');
    }
  };

  const toggleUserSelection = (userId: string) => {
    const newSelection = new Set(selectedUsers);
    if (newSelection.has(userId)) {
      newSelection.delete(userId);
    } else {
      newSelection.add(userId);
    }
    setSelectedUsers(newSelection);
  };

  const selectAll = () => {
    setSelectedUsers(new Set(filteredUsers.map(u => u._id)));
  };

  const deselectAll = () => {
    setSelectedUsers(new Set());
  };

  return (
    <DashboardLayout title="User Management">
      <div className="space-y-6">
        {/* Filters and Search */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'primary' : 'outline'}
                onClick={() => setFilter('all')}
                size="sm"
              >
                All ({users.length})
              </Button>
              <Button
                variant={filter === 'pending' ? 'primary' : 'outline'}
                onClick={() => setFilter('pending')}
                size="sm"
              >
                Pending ({users.filter(u => !u.isApproved).length})
              </Button>
              <Button
                variant={filter === 'approved' ? 'primary' : 'outline'}
                onClick={() => setFilter('approved')}
                size="sm"
              >
                Approved ({users.filter(u => u.isApproved).length})
              </Button>
              <Button
                variant={filter === 'suspended' ? 'primary' : 'outline'}
                onClick={() => setFilter('suspended')}
                size="sm"
              >
                Suspended ({users.filter(u => u.isSuspended).length})
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.size > 0 && (
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <span className="font-semibold">{selectedUsers.size} selected</span>
              <Button
                size="sm"
                onClick={() => {
                  setConfirmAction('approve');
                  setShowConfirmDialog(true);
                }}
              >
                Approve Selected
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setConfirmAction('reject');
                  setShowConfirmDialog(true);
                }}
              >
                Reject Selected
              </Button>
              <Button size="sm" variant="outline" onClick={deselectAll}>
                Deselect All
              </Button>
              <Button size="sm" variant="outline" onClick={selectAll}>
                Select All
              </Button>
            </div>
          )}
        </Card>

        {/* Users Table */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500">No users found</p>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Select
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.has(user._id)}
                          onChange={() => toggleUserSelection(user._id)}
                          className="rounded text-blue-city-primary"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-blue-city-text">{user.name}</div>
                        {user.isAdmin && (
                          <Badge variant="info" size="sm">Admin</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div>{user.email}</div>
                        <div>{user.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {user.isApproved ? (
                            <Badge variant="success" size="sm">Approved</Badge>
                          ) : (
                            <Badge variant="warning" size="sm">Pending</Badge>
                          )}
                          {user.isMember && (
                            <Badge variant="info" size="sm">Member</Badge>
                          )}
                          {user.isSuspended && (
                            <Badge variant="error" size="sm">Suspended</Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatRelativeTime(user.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {!user.isApproved && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApprove(user._id)}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(user._id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {user.isApproved && !user.isMember && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkAsPaid(user._id)}
                            >
                              Mark Paid
                            </Button>
                          )}
                          {!user.isAdmin && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMakeAdmin(user._id)}
                            >
                              Make Admin
                            </Button>
                          )}
                          {user.isSuspended ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSuspend(user._id, false)}
                            >
                              Unsuspend
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSuspend(user._id, true)}
                            >
                              Suspend
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
          setConfirmAction(null);
        }}
        onConfirm={handleBulkAction}
        title={`Confirm ${confirmAction}`}
        message={`Are you sure you want to ${confirmAction} ${selectedUsers.size} selected users?`}
        confirmText={confirmAction || 'Confirm'}
      />
    </DashboardLayout>
  );
};

