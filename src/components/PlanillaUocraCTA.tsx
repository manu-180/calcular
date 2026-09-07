import Link from "next/link";

// CTA hacia la planilla paga de UOCRA. Va en las páginas con tráfico de liquidación de la
// construcción — /convenios/uocra es la página #1 del sitio en clics orgánicos y hasta el
// 4/9/2026 no tenía nada para vender.
//
// El copy ataca la objeción real del comprador (un estudio o un contratista que liquida todos
// los meses): no es "comprá una planilla", es "dejá de perseguir la circular de cada tramo".
// Single-source: si cambia el copy o el destino, se cambia acá y se actualiza en todo el embudo.
export function PlanillaUocraCTA() {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-emerald-900">
            ¿Liquidás sueldos de la construcción todos los meses?
          </p>
          <p className="mt-1 text-sm text-emerald-800">
            La planilla de Excel y Sheets con los jornales de las 5 categorías en las 4 zonas ya
            cargados, la asistencia perfecta y la suma no remunerativa de cada tramo. Da los
            mismos números que esta calculadora, y cuando se firma la paritaria nueva te llega
            actualizada sin costo.
          </p>
          <p className="mt-2 text-sm font-semibold text-emerald-900">
            $14.900 pago único · devolución dentro de los 7 días
          </p>
        </div>
        <Link
          href="/planillas/uocra"
          className="shrink-0 rounded-lg bg-emerald-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 active:translate-y-px"
        >
          Ver la planilla →
        </Link>
      </div>
    </section>
  );
}
