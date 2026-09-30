"use client";

import { useId, useState } from "react";
import { rastrear } from "@/lib/rastreo";

interface Props {
  source: string;
  headline?: string;
  subtext?: string;
}

function Campana({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M18 8.4a6 6 0 10-12 0c0 5-2 6.4-2 6.4h16s-2-1.4-2-6.4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7 18.6a2 2 0 01-3.4 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Tilde({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EmailCapture({
  source,
  headline = "Avisame cuando cambien los datos",
  subtext = "Te mando un aviso cuando salga el nuevo IPC, cambien las escalas o haya novedades legales que te afecten. Sin spam.",
}: Props) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const cargando = status === "loading";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) rastrear("suscripcion", { props: { origen: source } });
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-600 text-white shadow-sm">
          <Tilde className="size-4" />
        </span>
        <div>
          <p className="font-semibold text-emerald-900">Listo, quedaste anotado.</p>
          <p className="mt-0.5 text-sm text-emerald-800/80">
            Te escribimos apenas cambien los datos que te afectan. Nada más que eso.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group/ec rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow duration-300 hover:shadow-[0_10px_28px_-18px_rgba(0,0,0,0.18)]">
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-transform duration-300 ease-out group-hover/ec:scale-105">
          <Campana className="size-5" />
        </span>
        <div className="min-w-0">
          <label htmlFor={id} className="block font-semibold text-zinc-900">
            {headline}
          </label>
          <p className="mt-1 text-sm leading-relaxed text-zinc-500">{subtext}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          id={id}
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={cargando}
          aria-describedby={status === "error" ? `${id}-err` : undefined}
          aria-invalid={status === "error" || undefined}
          className="min-h-11 min-w-0 flex-1 rounded-xl border border-zinc-300 bg-white px-3.5 text-[15px] text-zinc-900 outline-none transition-colors duration-150 placeholder:text-zinc-400 hover:border-zinc-400 focus:border-emerald-500 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={cargando}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-[15px] font-semibold text-white shadow-sm outline-none transition-[background-color,transform,box-shadow] duration-200 hover:bg-emerald-700 hover:shadow-[0_6px_16px_-8px_rgba(0,0,0,0.22)] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
        >
          {cargando && (
            <span
              aria-hidden
              className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
            />
          )}
          {cargando ? "Anotando…" : "Avisame"}
        </button>
      </form>

      {/* aria-live sin role=alert: avisa al lector de pantalla sin robarle el foco al input */}
      <p id={`${id}-err`} aria-live="polite" className="empty:hidden">
        {status === "error" && (
          <span className="mt-2 block text-xs text-rose-600">
            No pudimos anotarte. Probá de nuevo en un momento.
          </span>
        )}
      </p>
    </div>
  );
}
