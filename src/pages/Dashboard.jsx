import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";
import toast from "react-hot-toast";
import { fetchDashboardData } from "../api";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import ReferralTable from "../components/ReferralTable";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (search = "", sort = "desc") => {
    try {
      setIsRefetching(true);
      setError(null);
      const result = await fetchDashboardData(search, sort);
      setData(result);
    } catch (err) {
      setError(err.message || "Failed to fetch dashboard data");
    } finally {
      setIsLoading(false);
      setIsRefetching(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <Loader size="lg" />
          <p className="mt-4 text-slate-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" role="alert">
        <EmptyState
          title="Something went wrong"
          description={error || "Unknown error occurred"}
          action={<Button onClick={() => fetchData()}>Try Again</Button>}
        />
      </div>
    );
  }

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Referral Dashboard</h1>
        <p className="text-slate-500 mt-2">Track your referrals, earnings, and partner activity in one place.</p>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        {/* Overview Metrics */}
        <section className="bg-white rounded-xl shadow-sm p-6" role="region" aria-label="Overview metrics">
          <h3 className="text-sm font-bold text-slate-800 mb-6">Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.metrics?.map((metric) => {
              let Icon = FiDollarSign;
              if (metric.kind === "number") Icon = FiUsers;
              if (metric.id === "discountAmt") Icon = FiClock;
              if (metric.id === "totalEarn") Icon = FiCheckCircle;
              
              return (
                <div key={metric.id} className="flex items-center space-x-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex-shrink-0 p-3 bg-white rounded-lg border border-slate-100 text-blue-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{metric.label}</div>
                    <div className="text-xl font-black text-slate-800">{metric.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Service Summary */}
        <section className="bg-white rounded-xl shadow-sm p-6" role="region" aria-label="Service summary">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Service summary</h3>
          {data.serviceSummary ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Service</div>
                <div className="text-sm font-semibold text-blue-500">{data.serviceSummary.service}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Referrals</div>
                <div className="text-sm font-bold text-slate-800">{data.serviceSummary.yourReferrals}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Active Referrals</div>
                <div className="text-sm font-bold text-slate-800">{data.serviceSummary.activeReferrals}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Ref. Earnings</div>
                <div className="text-sm font-bold text-slate-800">{data.serviceSummary.totalRefEarnings}</div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">No service data available.</p>
          )}
        </section>

        {/* Share Referral */}
        <section className="bg-white rounded-xl shadow-sm p-6" role="region" aria-label="Share referral">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Refer friends and earn more</h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Your Referral Link</label>
              <div className="flex">
                <input type="text" readOnly value={data.referral.link} className="block w-full rounded-l-lg border border-slate-100 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none" />
                <button onClick={() => handleCopy(data.referral.link, "Referral link")} className="rounded-r-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition-colors">Copy</button>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Your Referral Code</label>
              <div className="flex">
                <input type="text" readOnly value={data.referral.code} className="block w-full rounded-l-lg border border-slate-100 bg-slate-50 px-4 py-2.5 text-sm font-mono text-slate-800 outline-none" />
                <button onClick={() => handleCopy(data.referral.code, "Referral code")} className="rounded-r-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition-colors">Copy</button>
              </div>
            </div>
          </div>
        </section>

        {/* Referral Table */}
        <section>
          <ReferralTable referrals={data.referrals} onFilterChange={fetchData} isLoading={isRefetching} />
        </section>
      </motion.div>
    </div>
  );
};

export default Dashboard;
