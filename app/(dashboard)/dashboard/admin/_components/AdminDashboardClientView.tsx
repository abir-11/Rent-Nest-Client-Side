"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Building2, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

interface DashboardProps {
  users: any[];
  properties: any[];
  rentals: any[];
}

export default function AdminDashboardClientView({ users, properties, rentals }: DashboardProps) {
  
  // --- Data Processing for Metrics ---
  const totalUsers = users.length;
  const totalProperties = properties.length;
  const totalRentals = rentals.length;
  const pendingRentals = rentals.filter(r => r.status === 'pending' || r.status === 'processing').length;

  // --- Data Processing for Charts ---
  
  // 1. Users by Role
  const roleCount = users.reduce((acc: any, u) => {
    const role = u.role || 'user';
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});
  
  const userRoleData = Object.keys(roleCount).map(key => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: roleCount[key]
  }));

  // 2. Properties by Category
  const categoryCount = properties.reduce((acc: any, p) => {
    const catName = p.category?.name || "Uncategorized";
    acc[catName] = (acc[catName] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.keys(categoryCount).map(key => ({
    name: key,
    Properties: categoryCount[key]
  }));

  // Animations
  const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={fadeIn} initial="initial" animate="animate" className="p-6 sm:p-8 lg:p-10 text-gray-800 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Overview</h1>
        <p className="text-gray-500 mt-1">Platform wide statistics and current status.</p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: totalUsers, icon: Users, color: "bg-blue-500" },
          { title: "Total Properties", value: totalProperties, icon: Building2, color: "bg-emerald-500" },
          { title: "Total Rentals", value: totalRentals, icon: FileText, color: "bg-indigo-500" },
          { title: "Pending Requests", value: pendingRentals, icon: AlertTriangle, color: "bg-amber-500" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
            <div className={`w-12 h-12 ${stat.color} text-white rounded-full flex items-center justify-center shadow-sm`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart 1: Users Role Distribution (Pie Chart) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center col-span-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2 w-full text-left">User Roles</h3>
          <div className="h-72 w-full relative flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={userRoleData} innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                  {userRoleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute text-center pointer-events-none">
              <span className="block text-3xl font-bold text-gray-900">{totalUsers}</span>
              <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Total</span>
            </div>
          </div>
          {/* Custom Legend */}
          <div className="flex gap-4 mt-2">
            {userRoleData.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Properties by Category (Bar Chart) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Properties by Category</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7280' }} allowDecimals={false} />
                <RechartsTooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="Properties" fill="#10b981" radius={[6, 6, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </motion.div>
  );
}