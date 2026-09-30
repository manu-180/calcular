import type { ReactNode } from "react";

export function Etiqueta({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700/10 bg-emerald-50/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-800">
      <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
      {children}
    </span>
  );
}

// Doble bisel: bandeja translúcida + placa blanca con radio concéntrico. Sombra negra y difusa,
// nunca teñida con el esmeralda (veto de Manuel).
export function Placa({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/[0.06] ${className}`}>
      <div className="h-full rounded-[calc(1.75rem-0.375rem)] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.05),0_14px_36px_-18px_rgba(0,0,0,0.18)]">
        {children}
      </div>
    </div>
  );
}

export function MarcoAuth({
  etiqueta,
  titulo,
  bajada,
  children,
  pie,
}: {
  etiqueta: string;
  titulo: string;
  bajada?: ReactNode;
  children: ReactNode;
  pie?: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[27rem] pb-6 sm:pt-6">
      <header className="animate-[ca-col_0.5s_var(--ease-fluid)_backwards]">
        <Etiqueta>{etiqueta}</Etiqueta>
        <h1 className="mt-4 text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-zinc-900 sm:text-[2rem]">
          {titulo}
        </h1>
        {bajada ? <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-600">{bajada}</p> : null}
      </header>
      <Placa className="mt-7 animate-[ca-col_0.55s_var(--ease-fluid)_0.06s_backwards]">
        <div className="p-5 sm:p-7">{children}</div>
      </Placa>
      {pie ? (
        <div className="mt-6 animate-[ca-col_0.55s_var(--ease-fluid)_0.12s_backwards] text-center text-sm text-zinc-600">
          {pie}
        </div>
      ) : null}
    </div>
  );
}
