import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosSecure } from '../../api/axiosConfig';
import { fetchAllOrders, updateOrderStatus, Order, OrderStatus } from '../../api/orderApi';
import { OrderStatusBadge } from '../../components/common/OrderStatusBadge';
import { SectionTitle } from '../../components/common/SectionTitle';
import { Spinner } from '../../components/common/Spinner';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FaBoxOpen, FaEdit } from 'react-icons/fa';

const STATUS_OPTIONS: OrderStatus[] = ['Pending', 'Processing', 'Delivered', 'Cancelled'];

export const ManageOrders: React.FC = () => {
  const queryClient = useQueryClient();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['admin-orders'],
    queryFn: () => fetchAllOrders(axiosSecure),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      updateOrderStatus(axiosSecure, id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast.success('Order status updated!');
    },
    onError: () => {
      toast.error('Failed to update status');
    },
  });

  const handleStatusChange = async (order: Order, newStatus: OrderStatus) => {
    if (newStatus === order.status) return;
    const result = await Swal.fire({
      title: 'Update Order Status?',
      html: `Change <b>${order._id.slice(-8).toUpperCase()}</b> from <b>${order.status}</b> to <b>${newStatus}</b>?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#D1A054',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Update',
    });
    if (result.isConfirmed) {
      setUpdatingId(order._id);
      await updateMutation.mutateAsync({ id: order._id, status: newStatus });
      setUpdatingId(null);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-white pb-16 font-inter">
      <Helmet>
        <title>SaFus | Manage Orders</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <SectionTitle heading="MANAGE ORDERS" subHeading="View & update all customer orders" />

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <FaBoxOpen className="w-16 h-16 mb-4 opacity-30" />
            <p className="font-cinzel text-lg">No orders found yet.</p>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto rounded-2xl border border-gray-200 shadow-lg">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#111827] text-white font-cinzel text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4">Order ID</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Items</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Payment</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-[#F3F3F3] transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-gray-600 font-bold">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-gray-900 text-xs">{order.userName || 'Customer'}</div>
                      <div className="text-gray-400 text-xs truncate max-w-[140px]">{order.userEmail}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-600 text-xs max-w-[160px]">
                      {order.items?.map((it) => it.name).join(', ') || `${order.items?.length || 0} item(s)`}
                    </td>
                    <td className="px-5 py-4 font-bold text-[#D1A054]">
                      ${order.totalPrice?.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-500 capitalize">
                      {order.paymentMethod || 'Stripe'}
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="relative inline-block">
                        <select
                          value={order.status}
                          disabled={updatingId === order._id}
                          onChange={(e) => handleStatusChange(order, e.target.value as OrderStatus)}
                          className="appearance-none text-xs pl-3 pr-7 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 font-bold focus:outline-none focus:border-[#D1A054] cursor-pointer disabled:opacity-50 shadow-sm"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <FaEdit className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary Stats */}
        {orders.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {(['Pending', 'Processing', 'Delivered', 'Cancelled'] as OrderStatus[]).map((s) => {
              const count = orders.filter((o) => o.status === s).length;
              const colors: Record<string, string> = {
                Pending: 'border-yellow-400 text-yellow-700 bg-yellow-50',
                Processing: 'border-blue-400 text-blue-700 bg-blue-50',
                Delivered: 'border-green-400 text-green-700 bg-green-50',
                Cancelled: 'border-red-400 text-red-700 bg-red-50',
              };
              return (
                <div key={s} className={`p-4 rounded-xl border-2 text-center ${colors[s]}`}>
                  <p className="text-2xl font-extrabold font-cinzel">{count}</p>
                  <p className="text-xs font-bold uppercase tracking-wide mt-1">{s}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
