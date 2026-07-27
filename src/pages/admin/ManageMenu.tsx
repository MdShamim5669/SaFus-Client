import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SectionTitle } from '../../components/common/SectionTitle';
import menuData from '../../data/menu.json';
import { fetchMenuItems, deleteMenuItem, MenuItem } from '../../api/menuApi';
import { axiosPublic, axiosSecure } from '../../api/axiosConfig';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

export const ManageMenu: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: items = (menuData as MenuItem[]), isLoading } = useQuery<MenuItem[]>({
    queryKey: ['admin-menu-all'],
    queryFn: async () => {
      try {
        const data = await fetchMenuItems(axiosPublic);
        return data.length > 0 ? data : (menuData as MenuItem[]);
      } catch (e) {
        return menuData as MenuItem[];
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMenuItem(axiosSecure, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-menu-all'] });
      queryClient.invalidateQueries({ queryKey: ['admin-menu-live'] });
      toast.success('Menu item deleted!');
    },
    onError: () => {
      toast.error('Failed to delete item from server.');
    },
  });

  const handleDelete = (item: MenuItem) => {
    Swal.fire({
      title: `Delete ${item.name}?`,
      text: 'This menu item will be permanently removed from catalog.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete Item',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(item._id);
        // Instant Optimistic UI Update
        queryClient.setQueryData<MenuItem[]>(['admin-menu-all'], (old) =>
          (old || items).filter((i) => i._id !== item._id)
        );
        Swal.fire('Deleted!', `${item.name} has been removed.`, 'success');
      }
    });
  };

  return (
    <div className="space-y-6 font-inter">
      <SectionTitle heading="MANAGE ALL ITEMS" subHeading="Menu Catalog Operations" />

      <div className="flex justify-between items-center bg-[#F3F3F3] dark:bg-dark-200 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <h3 className="font-cinzel font-bold text-lg text-gray-900 dark:text-white uppercase tracking-wider">
          TOTAL MENU ITEMS: {items.length}
        </h3>
        <Link to="/dashboard/add-item">
          <button className="btn btn-sm bg-[#D1A054] hover:bg-[#b8883e] text-black font-cinzel font-bold text-xs uppercase tracking-wider border-none">
            <FaPlus className="mr-1" /> Add New Item
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg text-[#D1A054]"></span>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl">
          <table className="table w-full">
            <thead className="bg-[#111827] text-white font-cinzel text-xs uppercase tracking-wider">
              <tr>
                <th className="py-4 px-4">#</th>
                <th className="py-4 px-4">Item Image</th>
                <th className="py-4 px-4">Item Name</th>
                <th className="py-4 px-4 text-center">Category</th>
                <th className="py-4 px-4 text-center">Price</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {items.map((item, idx) => (
                <tr key={item._id} className="hover:bg-base-200/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-gray-500">{idx + 1}</td>
                  <td className="py-3 px-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/home/slide1.jpg';
                      }}
                    />
                  </td>
                  <td className="py-3 px-4 font-cinzel font-bold text-gray-900 dark:text-white">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 text-center capitalize">
                    <span className="badge badge-warning font-semibold text-xs uppercase">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-[#D1A054]">
                    ${item.price?.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      className="btn btn-xs btn-circle bg-[#D1A054] hover:bg-[#b8883e] text-black border-none shadow-sm"
                      title="Edit Item"
                    >
                      <FaEdit className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-xs btn-circle btn-error text-white shadow-sm"
                      title="Delete Item"
                    >
                      <FaTrashAlt className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

