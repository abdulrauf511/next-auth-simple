import Card from "../../components/ui/Card";

export default function HomePage() {
  return (
    <Card>
      <h1 className="text-2xl font-semibold">Home</h1>
      <p className="mt-2 text-white/70">This is a protected route.</p>
    </Card>
  );
}
