export default function Alert({ children }) {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
      {children}
    </div>
  );
}
