import React from 'react';
import { OrderStatus } from '../../api/orderApi';

interface Props {
  status: OrderStatus | string;
}

export const OrderStatusBadge: React.FC<Props> = ({ status }) => {
  const styles: Record<string, string> = {
    Pending: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    Processing: 'bg-blue-100 text-blue-800 border border-blue-300',
    Delivered: 'bg-green-100 text-green-800 border border-green-300',
    Cancelled: 'bg-red-100 text-red-800 border border-red-300',
  };

  const dots: Record<string, string> = {
    Pending: 'bg-yellow-500',
    Processing: 'bg-blue-500',
    Delivered: 'bg-green-500',
    Cancelled: 'bg-red-500',
  };

  const cls = styles[status] || styles['Pending'];
  const dot = dots[status] || dots['Pending'];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot} animate-pulse`} />
      {status}
    </span>
  );
};
