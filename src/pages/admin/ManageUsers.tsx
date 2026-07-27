import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SectionTitle } from '../../components/common/SectionTitle';
import { UserProfile } from '../../api/authApi';
import { fetchAllUsers, makeAdmin, deleteUser } from '../../api/userApi';
import { useAxiosSecure } from '../../hooks/useAxiosSecure';
import { FaUserShield, FaTrashAlt, FaUserCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MOCK_USERS_FALLBACK: UserProfile[] = [
  { _id: 'u1', name: 'Samim Ahsan', email: 'admin@safus.com', role: 'admin', isVerified: true },
  { _id: 'u2', name: 'Jane Doe', email: 'jane@safus.com', role: 'user', isVerified: true },
  { _id: 'u3', name: 'John Doe', email: 'john@safus.com', role: 'customer', isVerified: true },
  { _id: 'u4', name: 'Sarah Smith', email: 'sarah@safus.com', role: 'user', isVerified: true },
];

export const ManageUsers: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = MOCK_USERS_FALLBACK, isLoading } = useQuery<UserProfile[]>({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        return await fetchAllUsers(axiosSecure);
      } catch (e) {
        return MOCK_USERS_FALLBACK;
      }
    },
  });

  const makeAdminMutation = useMutation({
    mutationFn: (userId: string) => makeAdmin(axiosSecure, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated to Admin role!');
    },
    onError: () => {
      toast.error('Failed to make Admin. (Demo Mode: Local state updated)');
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => deleteUser(axiosSecure, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete user.');
    },
  });

  const handleMakeAdmin = (user: UserProfile) => {
    Swal.fire({
      title: `Promote ${user.name}?`,
      text: 'This user will get full Administrator control panel access.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D1A054',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Make Admin!',
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminMutation.mutate(user._id);
        // Instant Optimistic Update for UI
        queryClient.setQueryData<UserProfile[]>(['users'], (old) =>
          (old || users).map((u) => (u._id === user._id ? { ...u, role: 'admin' } : u))
        );
        Swal.fire('Promoted!', `${user.name} is now an Admin.`, 'success');
      }
    });
  };

  const handleDelete = (user: UserProfile) => {
    Swal.fire({
      title: `Delete ${user.name}?`,
      text: 'This action cannot be undone!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete Account',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(user._id);
        // Instant Optimistic Update for UI
        queryClient.setQueryData<UserProfile[]>(['users'], (old) =>
          (old || users).filter((u) => u._id !== user._id)
        );
        Swal.fire('Deleted!', `${user.name} has been removed.`, 'success');
      }
    });
  };

  return (
    <div className="space-y-6 font-inter">
      <SectionTitle heading="MANAGE ALL USERS" subHeading="System Accounts & Roles" />

      <div className="bg-gradient-to-r from-dark-200 to-dark-300 p-6 rounded-2xl border border-gold-500/30 text-white flex items-center justify-between shadow-lg">
        <div>
          <h3 className="font-cinzel font-bold text-xl uppercase tracking-wider text-gold-400">
            TOTAL ACCOUNTS: {users.length}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Admins: {users.filter((u) => u.role === 'admin').length} • Customers:{' '}
            {users.filter((u) => u.role !== 'admin').length}
          </p>
        </div>
        <div className="p-3.5 bg-gold-500/20 rounded-xl border border-gold-500/40">
          <FaUserCheck className="w-6 h-6 text-gold-400" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg text-gold-500"></span>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
          <table className="table w-full text-left">
            <thead className="bg-dark-200 text-white font-cinzel text-xs uppercase tracking-wider">
              <tr>
                <th className="py-4 px-4">#</th>
                <th className="py-4 px-4">User Name</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4 text-center">Assigned Role</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {users.map((u, idx) => (
                <tr key={u._id} className="hover:bg-base-200/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-gray-600 dark:text-gray-400">{idx + 1}</td>
                  <td className="py-4 px-4 font-bold text-black dark:text-black">
                    {u.name}
                  </td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400 text-sm font-mono">{u.email}</td>
                  <td className="py-4 px-4 text-center">
                    {u.role === 'admin' ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/40">
                        🛡️ Admin
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(u)}
                        className="btn btn-xs bg-gold-500 hover:bg-gold-600 text-black border-none font-bold uppercase tracking-wider shadow-sm"
                      >
                        <FaUserShield className="mr-1" /> Make Admin
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleDelete(u)}
                      className="btn btn-xs btn-circle btn-error text-white shadow"
                      title="Remove Account"
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

