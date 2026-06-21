import { forwardRef } from "react";

const Input = forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="flex flex-col w-full mb-4">
      {label && (
        <label className="mb-1 text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200
            ${
              error
                ? "border-red-500 focus:ring-red-500/50"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/50"
            }
            text-slate-900 placeholder-slate-400
            ${className}
          `}
        {...props}
      />

      {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
