"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building, TrendingUp, DollarSign, CheckCircle } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

const COLORS = ['#10b981', '#f43f5e', '#f59e0b', '#3b82f6'];

export default function DashboardClientView({ properties }: { properties: any[] }) {
  
  // --- Data Processing for Metrics ---
  const totalProperties = properties.length;
  const availableProps = properties.filter(p => p.isAvailable).length;
  const rentedProps = totalProperties - availableProps;
  const totalRevenue = properties.reduce((acc, p) => acc + (p.price || 0), 0);

  // --- Data Processing for Charts ---
  const statusData = [
    { name: 'Available', value: availableProps },
    { name: 'Rented', value: rentedProps }
  ];

  const priceData = properties.map(p => ({
    name: p.title.substring(0, 12) + "...",
    price: p.price
  }));

  const categoryCount = properties.reduce((acc: any, p) => {
    const catName = p.category?.name || "Uncategorized";
    acc[catName] = (acc[catName] || 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.keys(categoryCount).map(key => ({
    name: key,
    count: categoryCount[key]
  }));

  // Animations
  const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={fadeIn} initial="initial" animate="animate" className="p-6 sm:p-8 lg:p-10 text-gray-800 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Real-time insights and metrics for your properties.</p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Properties", value: totalProperties, icon: Building, color: "bg-blue-500" },
          { title: "Available Now", value: availableProps, icon: CheckCircle, color: "bg-emerald-500" },
          { title: "Rented Out", value: rentedProps, icon: TrendingUp, color: "bg-rose-500" },
          { title: "Total Value (Monthly)", value: `৳${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "bg-amber-500" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.color} text-white rounded-full flex items-center justify-center shadow-md`}>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Price Comparison (Bar Chart) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Property Prices (৳)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <RechartsTooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="price" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Availability Status (Pie Chart) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2 w-full text-left">Availability Status</h3>
          <div className="h-72 w-full relative flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Available' ? '#10b981' : '#f43f5e'} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute text-center">
              <span className="block text-3xl font-bold text-gray-900">{totalProperties}</span>
              <span className="text-sm text-gray-500">Total</span>
            </div>
          </div>
        </div>

        {/* Chart 3: Properties by Category (Area Chart) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Properties by Category</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={categoryData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7280' }} allowDecimals={false} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    

    </motion.div>
  );
}