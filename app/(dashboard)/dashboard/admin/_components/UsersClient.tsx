"use client";

import React, { useTransition } from "react";
import { motion } from "framer-motion";
import { Shield, UserX, CheckCircle, MoreVertical } from "lucide-react";
import { updateUserRole, updateUserStatus } from "../_actions/adminActions";

export default function UsersClient({ users }: { users: any[] }) {
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (userId: string, newRole: string) => {
    startTransition(async () => {
      await updateUserRole(userId, newRole);
    });
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    startTransition(async () => {
      await updateUserStatus(userId, newStatus);
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <p className="text-gray-500">View and update user roles and permissions.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">User Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 relative">
              {isPending && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                </div>
              )}
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="bg-gray-100 border-none text-gray-700 text-xs rounded-lg focus:ring-2 focus:ring-emerald-500 p-2 font-medium cursor-pointer"
                    >
                      <option value="TENANT">Tenant</option>
                      <option value="LANDLORD">Landlord</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status === 'ACTIVE' ? <CheckCircle className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                      {user.status === 'ACTIVE' ? 'ACTIVE' : 'BANNED'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleStatusChange(user.id, user.status === 'ACTIVE' ? 'BANNED' : 'ACTIVE')}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                        user.status === 'ACTIVE' 
                          ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                          : 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                      }`}
                    >
                      {user.status === 'ACTIVE' ? 'Ban User' : 'Unban'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
             <div className="p-8 text-center text-gray-500">No users found.</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}