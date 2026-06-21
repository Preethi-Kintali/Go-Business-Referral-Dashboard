import React from "react";
import { motion } from "framer-motion";

const Loader = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        className={`${sizeClasses[size]} border-slate-200 dark:border-slate-700 border-t-blue-600 dark:border-t-blue-500 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Loader;
