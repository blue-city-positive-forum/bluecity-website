import { useState, useCallback } from 'react';
import { RAZORPAY_KEY_ID } from '../utils/constants';
import { useUIStore } from '../store/uiStore';
import type { RazorpayPaymentSuccess } from '../types/payment.types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface UseRazorpayOptions {
  onSuccess: (response: RazorpayPaymentSuccess) => void | Promise<void>;
  onFailure?: (error: any) => void;
}

export const useRazorpay = ({ onSuccess, onFailure }: UseRazorpayOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const showAlert = useUIStore((state) => state.showAlert);

  const loadRazorpayScript = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const initiatePayment = useCallback(
    async (orderId: string, amount: number, description: string, userEmail?: string, userName?: string) => {
      setIsLoading(true);

      try {
        // Load Razorpay script
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          throw new Error('Failed to load Razorpay SDK');
        }

        // Configure Razorpay options
        const options = {
          key: RAZORPAY_KEY_ID,
          amount: amount,
          currency: 'INR',
          name: 'Blue City Positive Forum',
          description: description,
          order_id: orderId,
          prefill: {
            email: userEmail,
            name: userName,
          },
          theme: {
            color: '#3A6EA5', // Blue City primary color
          },
          handler: async (response: RazorpayPaymentSuccess) => {
            try {
              await onSuccess(response);
            } catch (error) {
              console.error('Payment verification failed:', error);
              showAlert('Payment verification failed. Please contact support.', 'error');
            }
          },
          modal: {
            ondismiss: () => {
              setIsLoading(false);
              showAlert('Payment cancelled', 'warning');
            },
          },
        };

        // Open Razorpay checkout
        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', (response: any) => {
          setIsLoading(false);
          if (onFailure) {
            onFailure(response);
          } else {
            showAlert('Payment failed. Please try again.', 'error');
          }
        });
        razorpay.open();
      } catch (error) {
        setIsLoading(false);
        console.error('Razorpay error:', error);
        showAlert('Failed to initiate payment. Please try again.', 'error');
        if (onFailure) onFailure(error);
      }
    },
    [loadRazorpayScript, onSuccess, onFailure, showAlert]
  );

  return {
    initiatePayment,
    isLoading,
  };
};

