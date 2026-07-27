import React, { useState } from 'react';
import { SectionTitle } from '../../components/common/SectionTitle';
import menuData from '../../data/menu.json';
import { MenuItem } from '../../api/menuApi';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

export const ManageMenu: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>(menuData as MenuItem[]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      setItems((prev) => prev.filter((item) => item._id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <SectionTitle heading="MANAGE ALL ITEMS" subHeading="Hurry Up!" />

      <div className="flex justify-between items-center bg-base-200 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
        <h3 className="font-cinzel font-bold text-lg">Total Items: {items.length}</h3>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl">
        <table className="table w-full">
          <thead className="bg-base-200 text-base-content font-cinzel text-xs uppercase tracking-wider">
            <tr>
              <th className="py-4 px-4">#</th>
              <th className="py-4 px-4">Item Image</th>
              <th className="py-4 px-4">Item Name</th>
              <th className="py-4 px-4 text-center">Category</th>
              <th className="py-4 px-4 text-center">Price</th>
              <th className="py-4 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 15).map((item, idx) => (
              <tr key={item._id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-base-200/50">
                <td className="py-3 px-4 font-bold">{idx + 1}</td>
                <td className="py-3 px-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg border border-gray-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/home/slide1.jpg';
                    }}
                  />
                </td>
                <td className="py-3 px-4 font-cinzel font-bold text-base-content">{item.name}</td>
                <td className="py-3 px-4 text-center capitalize">
                  <span className="badge badge-warning font-semibold text-xs">{item.category}</span>
                </td>
                <td className="py-3 px-4 text-center font-bold text-gold-500">${item.price.toFixed(2)}</td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button className="btn btn-xs btn-circle bg-gold-500 hover:bg-gold-600 text-black border-none">
                    <FaEdit className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-xs btn-circle btn-error text-white"
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
