import { AxiosInstance } from 'axios';
import { CheckoutSchemaType } from '../schemas/checkoutSchema';
import { CartItem } from './cartApi';

export interface PaymentIntentResponse {
  clientSecret: string;
}

export interface SSLPaymentResponse {
  gatewayUrl: string;
}

export interface PaymentSavePayload extends CheckoutSchemaType {
  transactionId: string;
  totalPrice: number;
  items: CartItem[];
  cartIds: string[];
}

export const getStripePublishableKey = async (axiosPublic: AxiosInstance): Promise<string> => {
  try {
    const response = await axiosPublic.get<{ publishableKey: string }>('/stripe-publishable-key');
    if (response.data?.publishableKey) {
      return response.data.publishableKey;
    }
  } catch (e) {
    // Fallback if backend route not declared
  }
  return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51Pdemo_key';
};

export const createPaymentIntent = async (axiosSecure: AxiosInstance, amount: number): Promise<PaymentIntentResponse> => {
  const response = await axiosSecure.post<PaymentIntentResponse>('/create-payment-intent', { price: amount });
  return response.data;
};

export const initiateSSLPayment = async (axiosSecure: AxiosInstance, payload: PaymentSavePayload): Promise<SSLPaymentResponse> => {
  const response = await axiosSecure.post<SSLPaymentResponse>('/ssl-payment-init', payload);
  return response.data;
};

export const savePaymentRecord = async (axiosSecure: AxiosInstance, payload: PaymentSavePayload): Promise<{ success: boolean; orderId: string }> => {
  const response = await axiosSecure.post<{ success: boolean; orderId: string }>('/payments', payload);
  return response.data;
};
