import api from './api';
import type { RazorpayOrder, PaymentVerification } from '../types/payment.types';

export const paymentService = {
  // Create membership payment order
  createMembershipOrder: async (): Promise<RazorpayOrder> => {
    const response = await api.post<RazorpayOrder>('/membership/create-order');
    return response.data;
  },

  // Verify membership payment
  verifyMembershipPayment: async (
    paymentData: PaymentVerification
  ): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>(
      '/membership/verify-payment',
      paymentData
    );
    return response.data;
  },
};

