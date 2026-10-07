import type { ResultadoCuota } from "@/lib/cuota-alimentaria";
import { formatARS } from "@/lib/formato";
import { fuenteInforme } from "@/components/InformeCuotaFuente";
import { nombreTramo } from "@/app/(ar)/informes/cuota-alimentaria/_modelo";

const SERIF = "[font-family:var(--font-informe),Georgia,serif]";

// La primera hoja del informe en chico, con los números de la persona: no es decoración, es la
// prueba de que lo que compra ya tiene su caso adentro.
export function InformeCuotaMiniatura({ r }: { r: ResultadoCuota }) {
  const pct = r.participacion === null ? null : Math.round(r.participacion * 100);
  const filas = r.detalle.slice(0, 3);
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
        <span>INDEC · {r.mesEtiqueta}</span>
      </div>
      <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.16em] text-emerald-700">Informe de referencia</p>
      <p className={`${SERIF} text-[17px] leading-tight text-zinc-900`}>Cuota alimentaria</p>

      <div className="mt-2.5 rounded-md bg-emerald-50/80 px-2.5 py-2">
        <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-emerald-800">
          {r.cuotaEstimada !== null ? "Cuota de referencia" : "Costo mensual a cubrir"}
        </p>
        <p className={`${SERIF} text-[20px] leading-none text-zinc-900 tabular-nums`}>
          {formatARS(r.cuotaEstimada ?? r.costoTotal, 0)}
        </p>
      </div>

      <div className="mt-2.5 space-y-1">
        {filas.map((d, i) => (
          <div key={i} className="flex justify-between gap-2 border-b border-zinc-100 pb-1">
            <span className="truncate">Hijo {i + 1} · {nombreTramo(d.tramo).toLowerCase()}</span>
            <span className="tabular-nums text-zinc-800">{d.tramo === "mayor-12" ? "—" : formatARS(d.total, 0)}</span>
          </div>
        ))}
        <div className="flex justify-between gap-2 font-semibold text-zinc-900">
          <span>Costo de crianza</span>
          <span className="tabular-nums">{formatARS(r.costoTotal, 0)}</span>
        </div>
      </div>

      {pct !== null ? (
        <div className="mt-2.5">
          <div className="flex justify-between text-[8px]">
            <span>Quien paga · {pct}%</span>
            <span>Otro progenitor · {100 - pct}%</span>
          </div>
          <div className="mt-1 flex h-1.5 overflow-hidden rounded-full bg-zinc-200">
            <div className="h-full bg-emerald-700" style={{ width: `${pct}%` }} />
          </div>
        </div>
      ) : null}

      <div className="mt-3 space-y-1">
        <div className="h-1 w-full rounded-full bg-zinc-100" />
        <div className="h-1 w-4/5 rounded-full bg-zinc-100" />
        <div className="h-1 w-2/3 rounded-full bg-zinc-100" />
      </div>
    </div>
  );
}
