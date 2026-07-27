import React, { useState } from 'react';
import { SectionTitle } from '../../components/common/SectionTitle';
import { UserProfile } from '../../api/authApi';
import { FaUserShield, FaTrashAlt } from 'react-icons/fa';

export const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([
    { _id: 'u1', name: 'Samim Ahsan', email: 'admin@bistroboss.com', role: 'admin' },
    { _id: 'u2', name: 'Jane Doe', email: 'jane@example.com', role: 'user' },
    { _id: 'u3', name: 'John Doe', email: 'john@example.com', role: 'user' },
    { _id: 'u4', name: 'Sarah Smith', email: 'sarah@example.com', role: 'user' },
  ]);

  const handleMakeAdmin = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role: 'admin' } : u))
    );
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to remove this user account?')) {
      setUsers((prev) => prev.filter((u) => u._id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <SectionTitle heading="MANAGE ALL USERS" subHeading="How many??" />

      <div className="bg-base-200 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
        <h3 className="font-cinzel font-bold text-lg">Total Users: {users.length}</h3>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl">
        <table className="table w-full">
          <thead className="bg-base-200 text-base-content font-cinzel text-xs uppercase tracking-wider">
            <tr>
              <th className="py-4 px-4">#</th>
              <th className="py-4 px-4">Name</th>
              <th className="py-4 px-4">Email</th>
              <th className="py-4 px-4 text-center">Role</th>
              <th className="py-4 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-base-200/50">
                <td className="py-3 px-4 font-bold">{idx + 1}</td>
                <td className="py-3 px-4 font-semibold">{u.name}</td>
                <td className="py-3 px-4 text-gray-400 text-sm">{u.email}</td>
                <td className="py-3 px-4 text-center">
                  {u.role === 'admin' ? (
                    <span className="badge badge-warning font-bold text-xs uppercase">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(u._id)}
                      className="btn btn-xs bg-gold-500 hover:bg-gold-600 text-black border-none"
                    >
                      <FaUserShield className="mr-1" /> Make Admin
                    </button>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    className="btn btn-xs btn-circle btn-error text-white"
                    title="Delete User"
                  >
                    <FaTrashAlt className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
