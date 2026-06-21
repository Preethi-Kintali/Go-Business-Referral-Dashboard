import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchReferralById } from "../api";
import { formatDate, formatProfit } from "../utils";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";

const DetailRow = ({ label, value }) => (
  <div className="py-4 flex items-center justify-between border-b border-slate-50 last:border-0">
    <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</dt>
    <dd className="text-sm font-bold text-slate-900">{value}</dd>
  </div>
);

const ReferralDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [referral, setReferral] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchReferralById(id);
        setReferral(data);
      } catch (err) {
        if (err.message !== "Referral not found") {
          console.error("Error fetching referral details:", err);
        }
        setError(err.message || "An error occurred while fetching referral details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-8">
        <Link to="/" className="inline-block text-blue-500 font-medium hover:text-blue-600 transition-colors mb-6 text-sm">
          &larr; Back to dashboard
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Referral Details</h1>
        <p className="mt-2 text-slate-500 text-lg">Full information for this referral partner.</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Loader size="lg" />
          <p className="mt-4 text-slate-500">Loading referral details...</p>
        </div>
      ) : error || !referral ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <EmptyState
            title="Referral not found"
            description={error === "Referral not found" ? "We could not locate the referral you are looking for." : error || "An unknown error occurred."}
            action={<Button onClick={() => navigate(-1)}>Go Back</Button>}
          />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-2xl">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-50">
              <h2 className="text-2xl font-bold text-slate-900">{referral.name}</h2>
              <span className="bg-blue-50 text-blue-500 px-4 py-1 rounded-full text-sm font-medium">{referral.serviceName}</span>
            </div>
            <dl>
              <DetailRow label="Referral ID" value={referral.id} />
              <DetailRow label="Name" value={referral.name} />
              <DetailRow label="Service Name" value={referral.serviceName} />
              <DetailRow label="Date" value={formatDate(referral.date)} />
              <DetailRow label="Profit" value={formatProfit(referral.profit)} />
            </dl>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReferralDetails;
