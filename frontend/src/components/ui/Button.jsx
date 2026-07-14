import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-soft hover:shadow-card",
  secondary:
    "bg-white text-surface-900 border border-surface-200 hover:bg-surface-50 hover:border-surface-300 active:bg-surface-100",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-soft hover:shadow-card",
  ghost:
    "text-primary-500 hover:bg-primary-50 active:bg-primary-100",
  danger:
    "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-soft",
  none: "",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      loading = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = variant === "none" ? "" : variants[variant] || variants.primary;
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2 font-semibold rounded-2xl
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-soft
          ${variantClasses} ${sizes[size]} ${className}
        `}
        {...props}
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;