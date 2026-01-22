import React from "react";
import { Link } from "react-router-dom";

// Lightweight inline icons
const FileText = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const Plus = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const Eye = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ArrowUpRight = ({ className = "w-3 h-3" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7" />
    <polyline points="8 7 17 7 17 16" />
  </svg>
);

const IndianRupee = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 5h18" />
    <path d="M3 9h18" />
    <path d="M7 17c4 0 6-4 10-4" />
    <path d="M17 21v-4" />
  </svg>
);

// =============================
// Reusable Stat Card
// =============================
const StatCard = ({ icon, title, value, subtext, trend, trendPositive }) => (
  <div className="bg-white rounded-xl border p-5 flex justify-between items-start shadow-sm">
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{title}</p>
      <h3 className="text-2xl font-semibold mt-2">{value}</h3>
      <p className="text-xs text-gray-400 mt-1">{subtext}</p>
    </div>

    <div className="flex flex-col items-end gap-2">
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${
          trendPositive
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {trend}
      </span>
    </div>
  </div>
);

// =============================
// Quick Stats Card
// =============================
const QuickStats = () => (
  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl p-5 shadow-md">
    <h4 className="text-sm font-medium mb-4">Quick Stats</h4>

    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="opacity-90">Paid Rate</span>
        <span className="font-semibold">100.0%</span>
      </div>
      <div className="flex justify-between">
        <span className="opacity-90">Avg. Invoice</span>
        <span className="font-semibold">₹10,648.00</span>
      </div>
      <div className="flex justify-between">
        <span className="opacity-90">Collection Eff.</span>
        <span className="font-semibold">100.0%</span>
      </div>
    </div>
  </div>
);

// =============================
// Quick Actions Card (routing fixed)
// =============================
const QuickActions = () => (
  <div className="bg-white rounded-xl border p-5 shadow-sm">
    <div className="flex flex-col gap-2">
      <Link
        to="create-invoice"
        className="flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
      >
        <Plus /> Create Invoice
      </Link>

      <Link
        to="invoices"
        className="flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-gray-100"
      >
        <Eye /> View All Invoices
      </Link>

      <Link
        to="business"
        className="flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-gray-100"
      >
        <FileText /> Business Profile
      </Link>
    </div>
  </div>
);

// =============================
// Recent Invoices
// =============================
const RecentInvoices = () => (
  <div className="bg-white rounded-xl border shadow-sm">
    <div className="flex items-center justify-between px-5 py-4 border-b">
      <div>
        <h4 className="text-sm font-medium">Recent Invoices</h4>
        <p className="text-xs text-gray-500">
          Latest 5 invoices from your account
        </p>
      </div>
      <Link to="invoices" className="text-sm text-blue-600 flex items-center gap-1">
        View All <ArrowUpRight />
      </Link>
    </div>
  </div>
);

// =============================
// MAIN DASHBOARD PAGE
// =============================
const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">
          Track your invoicing performance and business insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Invoices"
          value="1"
          subtext="Active invoices"
          icon={<FileText />}
          trend="+8.5%"
          trendPositive
        />
        <StatCard
          title="Total Paid"
          value="₹10,648.00"
          subtext="Received amount (INR)"
          icon={<IndianRupee />}
          trend="+12.2%"
          trendPositive
        />
        <StatCard
          title="Total Unpaid"
          value="₹0.00"
          subtext="Outstanding balance (INR)"
          icon={<IndianRupee />}
          trend="-3.1%"
          trendPositive={false}
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickStats />
        <QuickActions />
        <div />
      </div>

      <RecentInvoices />
    </div>
  );
};

export default Dashboard;
