export default function PageTitle({ title, desc }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {desc && <p className="mt-1 text-sm text-white/60">{desc}</p>}
    </div>
  );
}
