import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Spinner } from '../../components/ui/Spinner';
import { Badge } from '../../components/ui/Badge';
import { Pagination } from '../../components/common/Pagination';
import { useAuth } from '../../hooks/useAuth';
import { matrimonyService } from '../../services/matrimonyService';
import { useUIStore } from '../../store/uiStore';
import { ROUTES } from '../../utils/constants';
import type { MatrimonyProfile } from '../../types/matrimony.types';

export const MatrimonyList: React.FC = () => {
  const { isAuthenticated, isApproved, isMember, user } = useAuth();
  const navigate = useNavigate();
  const showAlert = useUIStore((state) => state.showAlert);

  const [profiles, setProfiles] = useState<MatrimonyProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Filters
  const [filters, setFilters] = useState({
    gender: '',
    minAge: '',
    maxAge: '',
    minHeight: '',
    maxHeight: '',
    education: '',
    occupation: '',
    maritalStatus: '',
    search: '',
  });

  useEffect(() => {
    // Check access - user must be member OR have paid profile
    if (!isAuthenticated || !isApproved) {
      showAlert('Please login and get approved to view matrimony profiles', 'warning');
      navigate(ROUTES.LOGIN);
      return;
    }

    fetchProfiles();
  }, [currentPage, isAuthenticated, isApproved]);

  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 12,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== '')
        ),
      };

      const result = await matrimonyService.getProfiles(params);
      setProfiles(result.profiles);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
    } catch (error: any) {
      if (error.response?.status === 403) {
        showAlert('You need to be a member or have a paid profile to view listings', 'error');
        navigate(ROUTES.MATRIMONY);
      } else {
        showAlert('Failed to load profiles', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    fetchProfiles();
  };

  const handleResetFilters = () => {
    setFilters({
      gender: '',
      minAge: '',
      maxAge: '',
      minHeight: '',
      maxHeight: '',
      education: '',
      occupation: '',
      maritalStatus: '',
      search: '',
    });
    setCurrentPage(1);
    setTimeout(() => fetchProfiles(), 100);
  };

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Check if user has access
  const hasAccess = isMember || (user?.matrimonyProfiles?.some((p: any) => p.isPaid));

  if (!hasAccess && !isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-20 px-4 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-blue-city-text mb-4">
              Access Restricted
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              To view matrimony profiles, you need to either:
            </p>
            <div className="text-left max-w-md mx-auto space-y-4 mb-8">
              <Card className="p-4">
                <h3 className="font-bold text-blue-city-text mb-2">✓ Become a Member</h3>
                <p className="text-sm text-gray-600">
                  Get lifetime access to all profiles and create unlimited matrimony profiles for free
                </p>
              </Card>
              <Card className="p-4">
                <h3 className="font-bold text-blue-city-text mb-2">✓ Create a Paid Profile</h3>
                <p className="text-sm text-gray-600">
                  Create your own matrimony profile and gain access to view all listings
                </p>
              </Card>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate(ROUTES.JOIN_US)}>
                Become a Member
              </Button>
              <Button variant="outline" onClick={() => navigate(ROUTES.MATRIMONY_CREATE)}>
                Create Profile
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-city-text mb-2">
            Browse Matrimony Profiles
          </h1>
          <p className="text-gray-600">
            Found {totalCount} {totalCount === 1 ? 'profile' : 'profiles'}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold text-blue-city-text mb-6">Filters</h2>

              <div className="space-y-4">
                <Input
                  label="Search"
                  placeholder="Search by name..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />

                <Select
                  label="Gender"
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                >
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Min Age"
                    type="number"
                    placeholder="Min"
                    value={filters.minAge}
                    onChange={(e) => handleFilterChange('minAge', e.target.value)}
                  />
                  <Input
                    label="Max Age"
                    type="number"
                    placeholder="Max"
                    value={filters.maxAge}
                    onChange={(e) => handleFilterChange('maxAge', e.target.value)}
                  />
                </div>

                <Select
                  label="Education"
                  value={filters.education}
                  onChange={(e) => handleFilterChange('education', e.target.value)}
                >
                  <option value="">All</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </Select>

                <Input
                  label="Occupation"
                  placeholder="e.g. Engineer"
                  value={filters.occupation}
                  onChange={(e) => handleFilterChange('occupation', e.target.value)}
                />

                <Select
                  label="Marital Status"
                  value={filters.maritalStatus}
                  onChange={(e) => handleFilterChange('maritalStatus', e.target.value)}
                >
                  <option value="">All</option>
                  <option value="never_married">Never Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </Select>

                <div className="pt-4 space-y-2">
                  <Button className="w-full" onClick={handleApplyFilters}>
                    Apply Filters
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleResetFilters}>
                    Reset
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Profiles Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Spinner size="lg" />
              </div>
            ) : profiles.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Profiles Found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <Button variant="outline" onClick={handleResetFilters}>
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {profiles.map((profile) => (
                    <Card
                      key={profile._id}
                      className="cursor-pointer hover:shadow-xl transition-shadow"
                      onClick={() => navigate(`/matrimony/profile/${profile._id}`)}
                    >
                      <div className="aspect-[3/4] bg-gray-200 overflow-hidden rounded-t-lg">
                        {profile.photos && profile.photos.length > 0 ? (
                          <img
                            src={profile.photos[0].url || profile.photos[0]}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-blue-city-text mb-2">
                          {profile.name}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <p>{calculateAge(profile.dateOfBirth)} years • {profile.height}</p>
                          <p>{profile.education}</p>
                          <p>{profile.occupation}</p>
                          <p className="capitalize">{profile.maritalStatus.replace('_', ' ')}</p>
                        </div>
                        <Badge variant="info" size="sm">
                          {profile.gender === 'male' ? 'Groom' : 'Bride'}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

