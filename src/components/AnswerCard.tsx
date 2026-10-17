import { useEffect, useState } from "react";
import {
  Check,
  ChevronDown,
  MapPin,
  Cpu,
  Coffee,
  Music,
  Utensils,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";
import type { AgentResult, AgentStep, NeighborhoodMatch, Place } from "@/lib/agent";
import { cityPhoto } from "@/lib/photos";
import { Button } from "./Button";

function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border p-5">
      <Button
        variant="plain"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-sm"
      >
        <span className="flex items-center gap-2">
          <Cpu className="h-4 w-4" />
          {title}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </Button>
      {open && <div className="mt-5 border-t pt-5">{children}</div>}
    </div>
  );
}
export function StepList({ steps, pending }: { steps: AgentStep[]; pending?: boolean }) {
  return (
    <ol className="space-y-3 text-sm">
      {steps.map((s, i) => (
        <li key={i} className="animate-rise flex items-start gap-3">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
          <span className="flex-1">{s.label}</span>
          <span className="text-xs text-muted-foreground">{(s.ms / 1000).toFixed(2)}s</span>
        </li>
      ))}
      {pending && (
        <li className="flex items-center gap-3 text-muted-foreground">
          <span className="h-4 w-4 animate-spin rounded-full border border-foreground border-t-transparent" />
          Finding your corner of the city…
        </li>
      )}
    </ol>
  );
}
const label = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export function NeighborhoodCard({
  n,
  city,
  index = 0,
}: {
  n: NeighborhoodMatch;
  city: string;
  index?: number;
}) {
  return (
    <article className="min-w-0">
      <div className="relative">
        <img
          src={cityPhoto(city, index)}
          alt={`${city} city view`}
          className="neighborhood-photo"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 rounded-full bg-card px-3 py-2 text-[11px]">
          {n.score}% match
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-2">
        <h3 className="neighborhood-name">{n.name}</h3>
        <ArrowUpRight className="mt-2 h-4 w-4 shrink-0" />
      </div>
      <p className="eyebrow mt-2 text-muted-foreground">
        {city} · {n.borough}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {n.tags.slice(0, 3).map((t) => (
          <span className="outline-tag" key={t}>
            {label(t)}
          </span>
        ))}
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
        {n.matched.length
          ? `Your love of ${n.matched.slice(0, 3).join(", ")} feels right at home here.`
          : n.why}
      </p>
      <p className="mt-4 border-t pt-3 text-xs">
        <span className="text-muted-foreground">Rent · 1BR </span>
        {n.rentRange}
      </p>
    </article>
  );
}
function PlaceCard({ p }: { p: Place }) {
  const Icon =
    p.category === "Cafe"
      ? Coffee
      : p.category === "Venue"
        ? Music
        : p.category === "Shop"
          ? ShoppingBag
          : Utensils;
  const price = p.tags.includes("budget") ? "$" : "$$";
  return (
    <article className="flex gap-4 rounded-2xl border p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-2">
          <h4 className="text-2xl leading-none">{p.name}</h4>
          <span className="text-xs text-muted-foreground">{price}</span>
        </div>
        <p className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
          {p.category} · <MapPin className="h-3 w-3 shrink-0" />
          {p.neighborhood}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.reason}</p>
      </div>
    </article>
  );
}
export function Timeline({ plan, city }: { plan: AgentResult["plan"]; city: string }) {
  const storageKey = `soft-landing:plan:${city}:${plan.map((w) => w.items.join("|")).join("||")}`;
  const [state, setState] = useState<{ key: string; done: string[] }>({ key: "", done: [] });
  useEffect(() => {
    let done: string[] = [];
    try {
      const raw = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
      if (Array.isArray(raw)) done = raw.filter((v): v is string => typeof v === "string");
    } catch {}
    setState({ key: storageKey, done });
  }, [storageKey]);
  useEffect(() => {
    if (state.key !== storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state.done));
    } catch {}
  }, [state, storageKey]);
  const done = state.key === storageKey ? state.done : [];
  const total = plan.reduce((a, w) => a + w.items.length, 0);
  const toggle = (key: string) =>
    setState((s) => ({
      key: storageKey,
      done: s.done.includes(key) ? s.done.filter((k) => k !== key) : [...s.done, key],
    }));
  return (
    <section className="plan-panel">
      <div>
        <p className="eyebrow text-muted-foreground">Your plan</p>
        <h2 className="section-title mt-5">
          Your first <em>30 days</em>, sorted.
        </h2>
        <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
          A little less unknown. A few more familiar faces. One small step at a time in {city}.
        </p>
        <div
          className="mt-8 h-1 w-full overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-label="Plan progress"
          aria-valuenow={done.length}
          aria-valuemin={0}
          aria-valuemax={total}
        >
          <div
            className="h-full bg-foreground transition-all"
            style={{ width: `${total ? (done.length / total) * 100 : 0}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {done.length} of {total} little steps complete
        </p>
      </div>
      <div>
        {plan.map((w) => (
          <div key={w.week}>
            {w.items.map((it) => {
              const key = `${w.week}|${it}`;
              const checked = done.includes(key);
              return (
                <Button
                  key={key}
                  variant="plain"
                  role="checkbox"
                  aria-checked={checked}
                  onClick={() => toggle(key)}
                  className="flex w-full items-center gap-3 border-b py-4 text-left text-xs leading-relaxed"
                >
                  <span
                    className={`plan-check ${checked ? "bg-foreground text-primary-foreground" : ""}`}
                  >
                    {checked && <Check className="h-3 w-3" />}
                  </span>
                  <span className={`flex-1 ${checked ? "text-muted-foreground line-through" : ""}`}>
                    {it}
                  </span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{w.week}</span>
                </Button>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
export function AnswerCard({ r }: { r: AgentResult }) {
  return (
    <div className="animate-rise space-y-10">
      <div>
        <p className="eyebrow text-muted-foreground">
          {r.mode === "qloo" ? "Qloo-grounded answer" : "LLM-only answer"}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed">{r.summary}</p>
      </div>
      <div>
        <h2 className="mb-6 font-display text-4xl">
          Neighborhoods that <em>get you.</em>
        </h2>
        <div className="grid gap-7 md:grid-cols-3">
          {r.neighborhoods.map((n, i) => (
            <NeighborhoodCard key={n.name} n={n} city={r.city} index={i} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-6 font-display text-4xl">
          Your new <em>regular spots.</em>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {r.places.map((p) => (
            <PlaceCard key={p.name} p={p} />
          ))}
        </div>
      </div>
      <Timeline plan={r.plan} city={r.city} />
      <Collapsible title="Agent steps">
        <StepList steps={r.steps} />
      </Collapsible>
    </div>
  );
}
