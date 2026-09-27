import Link from "next/link";

// CTA reusable hacia la planilla paga de Empleados de Comercio. Vive en las páginas con
// tráfico de liquidación de comercio (el hub /convenios/comercio, las programáticas por mes y
// los posts del blog), que son la audiencia con más intención de compra del producto.
// Single-source: si cambia el copy o el destino, se cambia acá y se actualiza en todas.
//
// El precio y la garantía van a la vista a propósito: hasta el 4/9/2026 el CTA mandaba a la
// landing sin decir cuánto costaba, así que el click lo hacía gente que todavía no había
// tomado ninguna decisión — y la landing tenía que vender desde cero.
export function PlanillaComercioCTA() {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-emerald-900">
            ¿Liquidás sueldos de comercio todos los meses?
          </p>
          <p className="mt-1 text-sm text-emerald-800">
            La planilla de Excel y Sheets con la escala oficial embebida: las 21 categorías con
            antigüedad, presentismo y jornada parcial. Da los mismos números que esta calculadora,
            y cuando FAECYS publica una circular nueva te llega actualizada sin costo. Nunca más
            buscar la circular.
          </p>
          <p className="mt-2 text-sm font-semibold text-emerald-900">
            $14.900 pago único · devolución dentro de los 7 días
          </p>
        </div>
        <Link
          href="/planillas?desde=cta-comercio"
          className="shrink-0 rounded-lg bg-emerald-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 active:translate-y-px"
        >
          Ver la planilla →
        </Link>
      </div>
    </section>
  );
}
