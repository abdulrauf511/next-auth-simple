import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 lg:grid-cols-[240px_1fr]">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}
