import type { ReactNode } from "react";

export type FilaBarra = {
  clave: string;
  etiqueta: ReactNode;
  valor: number;
  texto: string;
  nota?: ReactNode;
  pct?: number;
};

export function Barras({ filas, max }: { filas: FilaBarra[]; max?: number }) {
  const tope = max ?? Math.max(1, ...filas.map((f) => f.valor));
  return (
    <ul className="space-y-3.5">
      {filas.map((f) => {
        const bruto = f.pct ?? (f.valor / tope) * 100;
        const pct = f.valor > 0 ? Math.max(1.5, Math.min(100, bruto)) : 0;
        return (
          <li key={f.clave}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="min-w-0 text-zinc-800">{f.etiqueta}</span>
              <span className="shrink-0 font-medium tabular-nums text-zinc-900">{f.texto}</span>
            </div>
            {f.nota ? <p className="mt-0.5 text-xs text-zinc-600">{f.nota}</p> : null}
            <div className="mt-1.5 h-1.5 rounded-full bg-zinc-100" aria-hidden>
              <div
                className="panel-barra h-full rounded-full bg-emerald-500"
                style={{ clipPath: `inset(0 ${100 - pct}% 0 0 round 999px)` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
