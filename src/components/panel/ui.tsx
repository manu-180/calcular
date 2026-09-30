import type { ReactNode } from "react";

export function Bandeja({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-inset ring-zinc-900/[0.055] ${className}`}
    >
      {children}
    </div>
  );
}

export const TARJETA =
  "rounded-[1.375rem] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.05),0_8px_24px_-14px_rgba(0,0,0,0.16)]";

export function Tarjeta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`${TARJETA} ${className}`}>{children}</div>;
}

export function Seccion({
  id,
  titulo,
  bajada,
  acciones,
  children,
  indice = 0,
}: {
  id: string;
  titulo: string;
  bajada?: ReactNode;
  acciones?: ReactNode;
  children: ReactNode;
  indice?: number;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="panel-aparece scroll-mt-24"
      style={{ ["--i" as string]: indice }}
    >
      <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-3 px-1">
        <div className="min-w-0">
          <h2 id={`${id}-titulo`} className="text-lg font-semibold tracking-[-0.01em] text-zinc-900">
            {titulo}
          </h2>
          {bajada ? <p className="mt-0.5 text-sm text-zinc-600">{bajada}</p> : null}
        </div>
        {acciones}
      </div>
      {children}
    </section>
  );
}

export function Vacio({ children }: { children: ReactNode }) {
  return <p className="px-5 py-8 text-center text-sm text-zinc-600">{children}</p>;
}

export function Chip({
  children,
  tono = "zinc",
  className = "",
}: {
  children: ReactNode;
  tono?: "zinc" | "esmeralda" | "ambar" | "rosa" | "cielo";
  className?: string;
}) {
  const tonos = {
    zinc: "bg-zinc-100 text-zinc-700 ring-zinc-900/[0.06]",
    esmeralda: "bg-emerald-50 text-emerald-800 ring-emerald-700/15",
    ambar: "bg-amber-50 text-amber-800 ring-amber-700/15",
    rosa: "bg-rose-50 text-rose-700 ring-rose-700/15",
    cielo: "bg-sky-50 text-sky-800 ring-sky-700/15",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${tonos[tono]} ${className}`}
    >
      {children}
    </span>
  );
}
