import { formatARS, formatPctFijo } from "@/lib/formato";
import { fuenteInforme } from "@/components/InformeCuotaFuente";
import { FICHAS, principales, type Informe } from "@/app/(ar)/informes/ganancias/_modelo";

const SERIF = "[font-family:var(--font-informe),Georgia,serif]";

// La primera hoja en chico, con los números de la persona: la prueba de que lo que compra ya tiene
// su caso adentro.
export function InformeGananciasMiniatura({ informe }: { informe: Informe }) {
  const top = principales(informe, 3);
  return (
    <div
      aria-hidden
      className={`${fuenteInforme.variable} pointer-events-none w-full select-none rounded-xl bg-white p-4 text-[10px] leading-snug text-zinc-600 shadow-[var(--shadow-alzada)] ring-1 ring-zinc-900/5`}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <svg viewBox="0 0 32 32" className="size-3.5">
            <rect width="32" height="32" rx="8" fill="#059669" />
            <rect x="8.5" y="11" width="15" height="3.6" rx="1.8" fill="#fff" />
            <rect x="8.5" y="17.4" width="15" height="3.6" rx="1.8" fill="#ecfdf5" />
          </svg>
          <span className="font-semibold text-zinc-800">CalculAR</span>
        </span>
        <span>Escala ARCA 2026</span>
      </div>
      <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.16em] text-emerald-700">Informe personal</p>
      <p className={`${SERIF} text-[17px] leading-tight text-zinc-900`}>Ganancias 2026</p>

      <div className="mt-2.5 rounded-md bg-emerald-50/80 px-2.5 py-2">
        <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-emerald-800">Ganancias del año</p>
        <p className={`${SERIF} text-[20px] leading-none text-zinc-900 tabular-nums`}>{formatARS(informe.total, 0)}</p>
        <p className="mt-1 text-[8px]">Tramo {formatPctFijo(informe.alicuotaMarginal * 100, 0)}</p>
      </div>

      <p className="mt-2.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Te podrían devolver</p>
      <div className="mt-1 space-y-1">
        {top.map((o) => (
          <div key={o.id} className="flex justify-between gap-2 border-b border-zinc-100 pb-1">
            <span className="truncate">{FICHAS[o.id].titulo}</span>
            <span className="tabular-nums text-zinc-800">{formatARS(o.ahorroTecho, 0)}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-1">
        <div className="h-1 w-full rounded-full bg-zinc-100" />
        <div className="h-1 w-4/5 rounded-full bg-zinc-100" />
        <div className="h-1 w-2/3 rounded-full bg-zinc-100" />
      </div>
    </div>
  );
}
