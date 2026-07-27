import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { checkoutSchema, CheckoutSchemaType } from '../../schemas/checkoutSchema';
import { SectionTitle } from '../../components/common/SectionTitle';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useAxiosPublic } from '../../hooks/useAxiosPublic';
import { getStripePublishableKey } from '../../api/paymentApi';
import { StripeCheckoutForm } from '../../components/payment/StripeCheckoutForm';
import { SSLCommerzButton } from '../../components/payment/SSLCommerzButton';

export const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'sslcommerz'>('stripe');
  const [formData, setFormData] = useState<CheckoutSchemaType | null>(null);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    getStripePublishableKey(axiosPublic).then((key) => {
      setStripePromise(loadStripe(key));
    });
  }, [axiosPublic]);

  const tax = total * 0.05;
  const grandTotal = total + tax;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      paymentMethod: 'stripe',
    },
  });

  const onSubmitForm = (data: CheckoutSchemaType) => {
    setFormData(data);
    setPaymentMethod(data.paymentMethod);
  };

  const handlePaymentSuccess = (transactionId: string) => {
    clearCart();
    navigate('/order-confirmation', {
      state: {
        transactionId,
        totalPrice: grandTotal,
        paymentMethod,
        itemsCount: cart.length,
      },
    });
  };

  return (
    <div className="pt-20 pb-16 font-inter bg-white">
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <SectionTitle heading="CHECKOUT ORDER" subHeading="Payment Details" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
          {/* Order Info & Delivery Address Form */}
          <div className="lg:col-span-7 bg-[#F3F3F3] p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-3">
              1. Delivery & Billing Address
            </h3>

            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name*</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  {...register('name')}
                  className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-[#D1A054] text-gray-800"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    {...register('email')}
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-[#D1A054] text-gray-800"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone*</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    {...register('phone')}
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-[#D1A054] text-gray-800"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Street Address*</label>
                <input
                  type="text"
                  placeholder="House number and street name"
                  {...register('address')}
                  className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-[#D1A054] text-gray-800"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
              </div>

              {/* Payment Gateway Selection */}
              <div className="pt-4 border-t border-gray-300">
                <label className="block text-xs font-bold text-gray-700 mb-3">Select Payment Gateway*</label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`p-4 border rounded cursor-pointer text-center font-bold text-xs uppercase tracking-wider transition-colors ${
                      paymentMethod === 'stripe'
                        ? 'border-[#D1A054] bg-[#D1A054]/10 text-[#D1A054]'
                        : 'border-gray-300 bg-white text-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      value="stripe"
                      {...register('paymentMethod')}
                      onChange={() => setPaymentMethod('stripe')}
                      className="sr-only"
                    />
                    <span>Stripe Card</span>
                  </label>

                  <label
                    className={`p-4 border rounded cursor-pointer text-center font-bold text-xs uppercase tracking-wider transition-colors ${
                      paymentMethod === 'sslcommerz'
                        ? 'border-[#D1A054] bg-[#D1A054]/10 text-[#D1A054]'
                        : 'border-gray-300 bg-white text-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      value="sslcommerz"
                      {...register('paymentMethod')}
                      onChange={() => setPaymentMethod('sslcommerz')}
                      className="sr-only"
                    />
                    <span>SSLCommerz</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#835D23] hover:bg-[#6c4c1b] text-white font-cinzel font-bold text-xs uppercase tracking-widest rounded transition-colors shadow-md mt-4"
              >
                Confirm Address & Proceed to Pay
              </button>
            </form>
          </div>

          {/* Payment Element & Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F3F3F3] p-6 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-cinzel text-lg font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-2">
                Order Summary ({cart.length} Items)
              </h3>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%):</span>
                  <span className="font-bold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-300 pt-2 text-sm font-bold text-[#D1A054]">
                  <span>Total Amount:</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Execution */}
            {formData && (
              <div className="bg-white p-6 border border-gray-200 shadow-md rounded space-y-4">
                <h3 className="font-cinzel text-base font-bold uppercase tracking-wider text-gray-900">
                  2. Complete Payment ({paymentMethod.toUpperCase()})
                </h3>

                {paymentMethod === 'stripe' && stripePromise ? (
                  <Elements stripe={stripePromise}>
                    <StripeCheckoutForm
                      payload={{
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        address: formData.address,
                        paymentMethod: 'stripe',
                        totalPrice: grandTotal,
                        items: cart,
                        cartIds: cart.map((i) => i._id),
                      }}
                      onSuccess={handlePaymentSuccess}
                    />
                  </Elements>
                ) : (
                  <SSLCommerzButton
                    payload={{
                      name: formData.name,
                      email: formData.email,
                      phone: formData.phone,
                      address: formData.address,
                      paymentMethod: 'sslcommerz',
                      totalPrice: grandTotal,
                      items: cart,
                      cartIds: cart.map((i) => i._id),
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
