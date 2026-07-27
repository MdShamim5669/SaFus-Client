import { CheckoutSchemaType } from '../schemas/checkoutSchema';
import { CartItem } from './cart';

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
