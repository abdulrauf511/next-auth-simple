export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed";

  const styles = {
    primary: "bg-white text-black hover:bg-white/90",
    secondary:
      "bg-white/10 text-white hover:bg-white/15 border border-white/10",
    danger: "bg-red-500/90 text-white hover:bg-red-500",
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
