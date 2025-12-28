import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Spinner } from '../components/ui/Spinner';
import { useAuth } from '../hooks/useAuth';
import { useRazorpay } from '../hooks/useRazorpay';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';
import { paymentService } from '../services/paymentService';
import { authService } from '../services/authService';
import { ROUTES, MEMBERSHIP_PRICE } from '../utils/constants';
import { formatCurrency } from '../utils/formatters';

export const JoinUs: React.FC = () => {
  const { user, isAuthenticated, isApproved, isMember } = useAuth();
  const navigate = useNavigate();
  const showAlert = useUIStore((state) => state.showAlert);
  const setUser = useAuthStore((state) => state.setUser);
  const [isProcessing, setIsProcessing] = useState(false);

  const { initiatePayment, isLoading: razorpayLoading } = useRazorpay({
    onSuccess: async (response) => {
      try {
        setIsProcessing(true);
        await paymentService.verifyMembershipPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        // Refresh user data
        const updatedUser = await authService.getCurrentUser();
        setUser(updatedUser);

        showAlert('Payment successful! You are now a lifetime member!', 'success');
        setTimeout(() => navigate(ROUTES.ACCOUNT), 2000);
      } catch (error: any) {
        showAlert(error.response?.data?.message || 'Payment verification failed', 'error');
      } finally {
        setIsProcessing(false);
      }
    },
    onFailure: () => {
      showAlert('Payment failed. Please try again.', 'error');
    },
  });

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      const orderData = await paymentService.createMembershipOrder();
      
      await initiatePayment(
        orderData.orderId,
        orderData.amount,
        'Blue City Parivar - Lifetime Membership',
        user?.email,
        user?.name
      );
    } catch (error: any) {
      showAlert(error.response?.data?.message || 'Failed to create payment order', 'error');
      setIsProcessing(false);
    }
  };

  // Redirect if already a member
  useEffect(() => {
    if (isMember) {
      showAlert('You are already a lifetime member!', 'info');
      navigate(ROUTES.ACCOUNT);
    }
  }, [isMember, navigate, showAlert]);

  // Not logged in
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-20 px-4 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-blue-city-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-blue-city-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-blue-city-text mb-4">
              Login Required
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Please login to become a member of Blue City Parivar
            </p>
            <Button size="lg" onClick={() => navigate(ROUTES.LOGIN)}>
              Go to Login
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Not approved yet
  if (!isApproved) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-20 px-4 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-blue-city-text mb-4">
              Approval Pending
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your account is awaiting admin approval. You will be able to purchase membership once your account is approved.
            </p>
            <Button variant="outline" onClick={() => navigate(ROUTES.ACCOUNT)}>
              Go to My Account
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-city-text mb-4">
            Become a <span className="text-gradient">Lifetime Member</span>
          </h1>
          <p className="text-xl text-gray-600">
            Join Blue City Parivar and enjoy exclusive benefits for your entire family
          </p>
        </div>

        {/* Pricing Card */}
        <Card className="max-w-2xl mx-auto mb-12 overflow-hidden">
          <div className="bg-gradient-to-br from-blue-city-primary to-blue-city-accent p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Lifetime Membership</h2>
            <div className="text-6xl font-bold mb-2">{formatCurrency(MEMBERSHIP_PRICE)}</div>
            <p className="text-blue-100">One-time payment • No recurring fees</p>
          </div>

          <div className="p-8">
            <h3 className="text-xl font-bold text-blue-city-text mb-6">
              What's Included:
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-blue-city-text">Entire Family Coverage</p>
                  <p className="text-sm text-gray-600">All family members included under one membership</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-blue-city-text">Free Matrimony Profiles</p>
                  <p className="text-sm text-gray-600">Create unlimited matrimony profiles at no extra cost</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-blue-city-text">Browse All Matrimony Listings</p>
                  <p className="text-sm text-gray-600">Access to view and connect with all matrimony profiles</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-blue-city-text">Priority Event Access</p>
                  <p className="text-sm text-gray-600">Early registration for community events and gatherings</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-blue-city-text">Community Support</p>
                  <p className="text-sm text-gray-600">Connect with families from Jodhpur in Ahmedabad</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-blue-city-text">Lifetime Validity</p>
                  <p className="text-sm text-gray-600">No expiry date, no renewal fees ever</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={handlePayment}
              disabled={isProcessing || razorpayLoading}
            >
              {isProcessing || razorpayLoading ? (
                <span className="flex items-center justify-center">
                  <Spinner size="sm" color="white" className="mr-2" />
                  Processing...
                </span>
              ) : (
                `Pay ${formatCurrency(MEMBERSHIP_PRICE)} Now`
              )}
            </Button>

            <p className="text-sm text-gray-500 text-center mt-4">
              Secure payment powered by Razorpay
            </p>
          </div>
        </Card>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-city-text mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <Card>
              <h3 className="font-bold text-blue-city-text mb-2">
                Is this a one-time payment?
              </h3>
              <p className="text-gray-600">
                Yes! This is a one-time payment of ₹7,000 for lifetime membership. There are no recurring fees or renewals.
              </p>
            </Card>

            <Card>
              <h3 className="font-bold text-blue-city-text mb-2">
                Does this cover my entire family?
              </h3>
              <p className="text-gray-600">
                Absolutely! One membership covers your entire immediate family. All family members can benefit from the membership.
              </p>
            </Card>

            <Card>
              <h3 className="font-bold text-blue-city-text mb-2">
                Can I create matrimony profiles for free?
              </h3>
              <p className="text-gray-600">
                Yes! As a member, you can create unlimited matrimony profiles at no additional cost. Non-members pay ₹400 per profile.
              </p>
            </Card>

            <Card>
              <h3 className="font-bold text-blue-city-text mb-2">
                What if I paid offline?
              </h3>
              <p className="text-gray-600">
                If you have paid through offline methods (cash/bank transfer), please contact the admin. They can mark your account as paid without requiring online payment.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

