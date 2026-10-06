import type { ResultadoIndemnizacion } from "@/lib/indemnizacion";
import { formatARS } from "@/lib/formato";
import { fuenteInforme } from "@/components/InformeCuotaFuente";

const SERIF = "[font-family:var(--font-informe),Georgia,serif]";

// La primera hoja del informe en chico, con los números de la persona: es la prueba de que lo que
// compra ya tiene su caso adentro. Lee el resultado de la calculadora y nada más, para no sumarle
// al bundle de /indemnizacion el calendario de feriados que usa el informe completo.
export function InformeIndemnizacionMiniatura({ r }: { r: ResultadoIndemnizacion }) {
  const filas: [string, string, number][] = [];
  if (!r.enPeriodoPrueba) filas.push(["Antigüedad", "art. 245", r.indemnizacionAntiguedad]);
  if (r.preaviso) filas.push(["Preaviso + SAC", "art. 232", r.preaviso.monto + r.preaviso.sac]);
  if (r.integracion) filas.push(["Integración + SAC", "art. 233", r.integracion.monto + r.integracion.sac]);
  filas.push(["Aguinaldo proporcional", "art. 123", r.sacProporcional.monto]);
  filas.push(["Vacaciones + SAC", "art. 156", r.vacaciones.monto + r.vacaciones.sac]);

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
        <span>LCT · Ley 27.802</span>
      </div>
      <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.16em] text-emerald-700">Informe de referencia</p>
      <p className={`${SERIF} text-[16px] leading-tight text-zinc-900`}>Liquidación final por despido</p>

      <div className="mt-2.5 rounded-md bg-emerald-50/80 px-2.5 py-2">
        <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-emerald-800">Total estimado</p>
        <p className={`${SERIF} text-[20px] leading-none text-zinc-900 tabular-nums`}>{formatARS(r.totalGeneral, 0)}</p>
        <p className="mt-1 text-[7.5px] text-zinc-500">más los días trabajados del mes</p>
      </div>

      <div className="mt-2.5 space-y-1">
        {filas.map(([n, a, m]) => (
          <div key={n} className="flex justify-between gap-2 border-b border-zinc-100 pb-1">
            <span className="truncate">
              {n} <span className="text-zinc-400">· {a}</span>
            </span>
            <span className="tabular-nums text-zinc-800">{formatARS(m, 0)}</span>
          </div>
        ))}
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-1 text-[7.5px] font-medium text-zinc-500">
        <span className="rounded bg-zinc-50 px-1 py-0.5 text-center ring-1 ring-zinc-100">Lo que ofrecen</span>
        <span className="rounded bg-zinc-50 px-1 py-0.5 text-center ring-1 ring-zinc-100">Antes de firmar</span>
        <span className="rounded bg-zinc-50 px-1 py-0.5 text-center ring-1 ring-zinc-100">Plazos</span>
      </div>

      <div className="mt-3 space-y-1">
        <div className="h-1 w-full rounded-full bg-zinc-100" />
        <div className="h-1 w-4/5 rounded-full bg-zinc-100" />
      </div>
    </div>
  );
}
