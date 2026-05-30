import { Card } from "@/components/ui/card";

const sections = [
  "Profile",
  "Monitoring preferences",
  "Notifications",
  "Theme",
  "Integrations",
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold">Platform configuration</h1>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        {sections.map((section) => (
          <Card key={section} className="p-6">
            <h2 className="text-xl font-semibold">{section}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Frontend-only preference surfaces for premium account controls, routing policies, and operator experience.
            </p>
            <div className="mt-5 rounded-2xl border border-white/6 bg-card/[0.03] p-4 text-sm text-slate-400">
              Placeholder settings inputs and toggles live here until backend wiring is added.
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
