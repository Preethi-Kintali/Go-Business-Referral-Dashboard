import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useDebounce, formatDate, formatProfit } from "../utils";

const ReferralTable = ({ referrals = [], onFilterChange, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    setCurrentPage(1);
    onFilterChange(debouncedSearch, sort);
  }, [debouncedSearch, sort, onFilterChange]);

  const paginatedReferrals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return referrals.slice(startIndex, startIndex + itemsPerPage);
  }, [referrals, currentPage]);

  const totalPages = Math.ceil(referrals.length / itemsPerPage) || 1;
  const startItem = referrals.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, referrals.length);

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-sm font-bold text-slate-800">All referrals</h3>
      </div>

      <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100">
        {/* Search */}
        <div className="relative w-full sm:w-1/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <FiSearch size={18} />
          </div>
          <input
            type="text"
            aria-label="Search referrals"
            placeholder="Name or service…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        {/* Sort */}
        <label className="flex items-center text-sm font-medium text-slate-600 w-full sm:w-auto">
          <span className="mr-2 whitespace-nowrap">Sort by date:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </label>
      </div>

      {isLoading ? (
        <div className="p-8 flex justify-center text-slate-400">Loading table...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                  <th className="px-6 py-4 border-b border-slate-100">Name</th>
                  <th className="px-6 py-4 border-b border-slate-100">Service</th>
                  <th className="px-6 py-4 border-b border-slate-100">Date</th>
                  <th className="px-6 py-4 border-b border-slate-100">Profit</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedReferrals.length === 0 ? (
                  <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">No matching entries</td></tr>
                ) : (
                  paginatedReferrals.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => navigate(`/referral/${r.id}`)}
                      className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 text-xs font-semibold text-slate-700">{r.name}</td>
                      <td className="px-6 py-4 text-xs text-slate-700">{r.serviceName}</td>
                      <td className="px-6 py-4 text-xs text-slate-700">{formatDate(r.date)}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-blue-500">{formatProfit(r.profit)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <div className="text-sm text-slate-500">
              Showing {startItem}–{endItem} of {referrals.length} entries
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(c => Math.max(1, c - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm font-medium text-slate-500 hover:text-slate-800 disabled:opacity-50"
              >
                Previous
              </button>
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    currentPage === page ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(c => Math.min(totalPages, c + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm font-medium text-slate-500 hover:text-slate-800 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReferralTable;
