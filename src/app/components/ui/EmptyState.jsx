export default function EmptyState({ title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
      <p className="font-semibold">{title}</p>
      <p className="mt-2 text-sm text-white/60">{desc}</p>
    </div>
  );
}
