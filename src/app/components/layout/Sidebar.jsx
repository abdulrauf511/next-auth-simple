import Link from "next/link";

const links = [
  { href: "/home", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
  { href: "/settings", label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="rounded-2xl border border-white/10 bg-white/5 p-4 h-fit">
      <p className="text-sm font-semibold text-white mb-3">Navigation</p>
      <nav className="space-y-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
