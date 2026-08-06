"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Building2, FileText, AlertTriangle, UserCheck, AlertCircle } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b'];
const STATUS_COLORS = { pending: '#f59e0b', resolved: '#10b981' };

interface DashboardProps {
  users?: any[];
  properties?: any[];
  rentals?: any[];
  landlordRequests?: any[];
  complaints?: any[];
}

export default function AdminDashboardClientView({ 
  users = [], 
  properties = [], 
  rentals = [],
  landlordRequests = [],
  complaints = []
}: DashboardProps) {
  
  // --- Data Processing for Metrics ---
  const totalUsers = users.length;
  const totalProperties = properties.length;
  const totalRentals = rentals.length;
  const totalLandlordReqs = landlordRequests.length;
  const totalComplaints = complaints.length;


  const pendingRentals = rentals.filter(r => r.status === 'PENDING' || r.status === 'processing').length;
  const pendingLandlordReqs = landlordRequests.filter(r => r.landlordStatus === 'PENDING' || r.status === 'PENDING').length;
  const pendingComplaints = complaints.filter(c => c.status === 'PENDING').length;
  
  const totalPendingActions = pendingRentals + pendingLandlordReqs + pendingComplaints;

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

  // 3. Requests & Complaints Status Data
  const supportData = [
    {
      name: 'Landlord Req',
      Pending: pendingLandlordReqs,
      Resolved: totalLandlordReqs - pendingLandlordReqs
    },
    {
      name: 'Complaints',
      Pending: pendingComplaints,
      Resolved: totalComplaints - pendingComplaints
    }
  ];

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {[
          { title: "Total Users", value: totalUsers, icon: Users, color: "bg-blue-500" },
          { title: "Properties", value: totalProperties, icon: Building2, color: "bg-emerald-500" },
          { title: "Rentals", value: totalRentals, icon: FileText, color: "bg-indigo-500" },
          { title: "Landlord Req", value: totalLandlordReqs, icon: UserCheck, color: "bg-purple-500" },
          { title: "Complaints", value: totalComplaints, icon: AlertCircle, color: "bg-rose-500" },
          { title: "Action Needed", value: totalPendingActions, icon: AlertTriangle, color: "bg-amber-500" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
            <div className={`w-12 h-12 ${stat.color} text-white rounded-full flex items-center justify-center shadow-sm shrink-0`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section 1 */}
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

      {/* Charts Section 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 3: Requests & Complaints Status */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Support & Issues Overview</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supportData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7280' }} allowDecimals={false} />
                <RechartsTooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
                <Bar dataKey="Pending" stackId="a" fill={STATUS_COLORS.pending} radius={[0, 0, 4, 4]} barSize={50} />
                <Bar dataKey="Resolved" stackId="a" fill={STATUS_COLORS.resolved} radius={[4, 4, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </motion.div>
  );
}