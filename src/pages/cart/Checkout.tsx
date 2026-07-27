import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Helmet } from 'react-helmet-async';
import { FaCreditCard, FaLock, FaShoppingBag, FaCheckCircle, FaGlobe } from 'react-icons/fa';
import toast from 'react-hot-toast';

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

  const [formData, setFormData] = useState<CheckoutSchemaType | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'stripe' | 'sslcommerz'>('stripe');
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    getStripePublishableKey(axiosPublic).then((key) => {
      // Only load Stripe with a real key (starts with pk_live_ or pk_test_51...)
      const isRealKey = key && (key.startsWith('pk_live_') || (key.startsWith('pk_test_') && key.length > 30));
      setStripePromise(isRealKey ? loadStripe(key) : null);
    });
  }, [axiosPublic]);

  // ── Exact Mathematical Calculation Equations ──
  // 1. Subtotal (S) = Sum of (price * quantity)
  const subtotal = total;
  // 2. Tax (T) = 5% of Subtotal
  const tax = subtotal * 0.05;
  // 3. Delivery Fee (D) = Free ($0.00) if Subtotal >= 50, else $5.00
  const deliveryFee = subtotal >= 50 || subtotal === 0 ? 0.00 : 5.00;
  // 4. Grand Total (G) = Subtotal + Tax + Delivery Fee
  const grandTotal = subtotal + tax + deliveryFee;

  const {
    register,
    handleSubmit,
    setValue,
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
    const finalData = { ...data, paymentMethod: selectedMethod };
    setFormData(finalData);
    toast.success('Address confirmed! Complete your payment below.', { duration: 3000 });

    // Smooth scroll to payment section
    setTimeout(() => {
      document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handlePaymentSuccess = (transactionId: string) => {
    clearCart();
    navigate('/order-confirmation', {
      state: {
        transactionId,
        totalPrice: grandTotal,
        subtotal,
        tax,
        deliveryFee,
        paymentMethod: selectedMethod,
        itemsCount: cart.length,
        address: formData?.address,
      },
    });
  };

  return (
    <div className="pt-20 pb-16 font-inter bg-white min-h-screen">
      <Helmet>
        <title>SaFus | Checkout</title>
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <SectionTitle heading="CHECKOUT ORDER" subHeading="Secure Payment & Fast Delivery" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
          {/* Delivery Address Form */}
          <div className="lg:col-span-7 bg-[#F3F3F3] p-6 md:p-8 border border-gray-200 shadow-sm space-y-6 rounded-lg">
            <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-3 flex items-center gap-2">
              <FaShoppingBag className="text-[#D1A054]" />
              1. Delivery &amp; Billing Address
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
                    placeholder="Enter email address"
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

              {/* Payment Method Option Selector */}
              <div className="pt-4 border-t border-gray-300 space-y-3">
                <label className="block text-xs font-bold text-gray-700">Select Payment Method*</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => {
                      setSelectedMethod('stripe');
                      setValue('paymentMethod', 'stripe');
                    }}
                    className={`cursor-pointer p-4 border-2 rounded-lg transition-all flex items-center gap-3 ${
                      selectedMethod === 'stripe'
                        ? 'border-[#D1A054] bg-[#D1A054]/10 shadow-sm'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <FaCreditCard className="text-[#D1A054] w-5 h-5 shrink-0" />
                    <div>
                      <p className="font-bold text-xs text-gray-900">Stripe Credit/Debit Card</p>
                      <p className="text-[10px] text-gray-500">Visa, Mastercard, Amex</p>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setSelectedMethod('sslcommerz');
                      setValue('paymentMethod', 'sslcommerz');
                    }}
                    className={`cursor-pointer p-4 border-2 rounded-lg transition-all flex items-center gap-3 ${
                      selectedMethod === 'sslcommerz'
                        ? 'border-emerald-600 bg-emerald-500/10 shadow-sm'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <FaGlobe className="text-emerald-600 w-5 h-5 shrink-0" />
                    <div>
                      <p className="font-bold text-xs text-gray-900">SSLCommerz Gateway</p>
                      <p className="text-[10px] text-gray-500">bKash, Nagad, Mobile Banking</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#835D23] hover:bg-[#6c4c1b] text-white font-cinzel font-bold text-xs uppercase tracking-widest rounded transition-colors shadow-md mt-4 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaCheckCircle className="w-4 h-4" />
                Confirm Address &amp; Proceed to Pay
              </button>
            </form>
          </div>

          {/* Order Summary + Payment Form Container */}
          <div className="lg:col-span-5 space-y-6">
            {/* Order Summary */}
            <div className="bg-[#F3F3F3] p-6 border border-gray-200 shadow-sm space-y-4 rounded-lg">
              <h3 className="font-cinzel text-lg font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-2">
                Order Summary ({cart.length} Items)
              </h3>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item._id} className="flex justify-between items-center text-xs text-gray-600">
                    <span className="truncate max-w-[180px]">
                      {item.name} × {item.quantity || 1}
                    </span>
                    <span className="font-bold text-gray-800">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mathematical Equation Summary Breakdown */}
              <div className="space-y-2 text-xs text-gray-700 border-t border-gray-300 pt-3">
                <div className="flex justify-between">
                  <span>Items Subtotal (S):</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (5% T):</span>
                  <span className="font-bold">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Delivery Fee (D):</span>
                  <span className="font-bold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[10px] bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        FREE (Over $50)
                      </span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between border-t border-gray-300 pt-2 text-sm font-extrabold text-[#D1A054]">
                  <span>Grand Total (G = S + T + D):</span>
                  <span className="text-base font-black">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Section */}
            <div id="payment-section" className="space-y-4">
              <div className="bg-[#F3F3F3] p-6 border border-gray-200 shadow-sm rounded-lg space-y-4">
                <h3 className="font-cinzel text-base font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-2 flex items-center gap-2">
                  <FaCreditCard className="text-[#D1A054]" />
                  2. Complete Payment (${grandTotal.toFixed(2)})
                </h3>

                {!formData ? (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-2 font-medium">
                    <span>⚠️ Fill in your delivery details and click "Confirm Address &amp; Proceed to Pay" above to activate payment.</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2 font-semibold">
                      <FaCheckCircle className="text-emerald-600 w-4 h-4 shrink-0" />
                      <span>Address Confirmed: {formData.name} &bull; {formData.address}</span>
                    </div>

                    {selectedMethod === 'stripe' ? (
                      stripePromise ? (
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
                      )
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
                        onSuccessDemo={handlePaymentSuccess}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <FaLock className="text-green-500 w-3.5 h-3.5" />
              <span>Secured by Stripe &amp; SSLCommerz &bull; 256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
