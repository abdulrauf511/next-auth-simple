export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none focus:border-white/20 ${className}`}
      {...props}
    />
  );
}
