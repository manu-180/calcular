import type { ResultadoCredito } from "@/lib/actualizacion-creditos";
import { formatARS } from "@/lib/formato";
import { nombrePeriodo } from "@/lib/inflacion";
import { fuenteInforme } from "@/components/InformeCuotaFuente";

const SERIF = "[font-family:var(--font-informe),Georgia,serif]";

const coef = (n: number) => n.toLocaleString("es-AR", { minimumFractionDigits: 4, maximumFractionDigits: 4 });

// La primera hoja de la liquidación en chico, con el crédito de la persona: no es decoración, es la
// prueba de que lo que compra ya tiene su caso adentro. Las filas punteadas son los rubros que
// todavía no cargó: la calculadora resuelve uno, el informe los suma todos.
export function InformeCreditoMiniatura({ r, monto }: { r: ResultadoCredito; monto: number }) {
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
        <span>IPC · {nombrePeriodo(r.hastaIpc)}</span>
      </div>
      <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.16em] text-emerald-700">Liquidación · art. 276 LCT</p>
      <p className={`${SERIF} text-[16px] leading-tight text-zinc-900`}>Crédito laboral actualizado</p>

      <div className="mt-2.5 rounded-md bg-emerald-50/80 px-2.5 py-2">
        <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-emerald-800">Al {nombrePeriodo(r.hastaPedido)}</p>
        <p className={`${SERIF} text-[19px] leading-none text-zinc-900 tabular-nums`}>{formatARS(r.total, 0)}</p>
      </div>

      <div className="mt-2.5 space-y-1">
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 border-b border-zinc-200 pb-1 text-[8px] text-zinc-400">
          <span>Rubro</span>
          <span>Coef.</span>
          <span>Total</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 border-b border-zinc-100 pb-1">
          <span className="truncate">1. {formatARS(monto, 0)}</span>
          <span className="tabular-nums">{coef(r.coeficiente)}</span>
          <span className="tabular-nums text-zinc-800">{formatARS(r.total, 0)}</span>
        </div>
        {[0, 1].map((k) => (
          <div key={k} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 border-b border-dashed border-zinc-200 pb-1 text-zinc-300">
            <span>{k + 2}. Otro rubro</span>
            <span className="h-1 w-8 rounded-full bg-zinc-100" />
            <span className="h-1 w-10 rounded-full bg-zinc-100" />
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-6 gap-0.5">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className={`h-1 rounded-full ${i === 0 ? "bg-emerald-300" : "bg-zinc-100"}`} />
        ))}
      </div>
      <p className="mt-1 text-[8px] text-zinc-400">Tabla de índices mes a mes</p>
    </div>
  );
}
