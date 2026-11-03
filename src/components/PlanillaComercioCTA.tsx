import Link from "next/link";

// CTA reusable hacia la planilla paga de Empleados de Comercio. Vive en las páginas con
// tráfico de liquidación de comercio (las programáticas por mes, los posts del blog y las
// páginas del empleador: libro de sueldos, certificado de trabajo).
// Single-source: si cambia el copy o el destino, se cambia acá y se actualiza en todas.
//
// El precio y la garantía van a la vista a propósito: hasta el 4/9/2026 el CTA mandaba a la
// landing sin decir cuánto costaba, así que el click lo hacía gente que todavía no había
// tomado ninguna decisión — y la landing tenía que vender desde cero.
//
// Dice para quién es antes del botón (3/11/2026): a los meses de comercio y al blog entran
// empleados mirando su sueldo (233 vieron la oferta en octubre-2026, 26 tocaron, 0 compras).
// La planilla liquida sueldos: es para el que paga. Al empleado se lo manda a lo gratis.
export function PlanillaComercioCTA() {
  return (
    <section data-oferta="planilla-comercio" className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-800">
            Para quien paga sueldos
          </p>
          <p className="mt-1 font-semibold text-emerald-900">¿Liquidás sueldos de comercio?</p>
          <p className="mt-1 text-sm text-emerald-800">
            La planilla de Excel y Sheets con la escala oficial embebida: las 21 categorías con
            antigüedad, presentismo y jornada parcial, y el recibo del mes listo para imprimir. Da
            los mismos números que la calculadora gratis del sitio, y cuando FAECYS publica una
            circular nueva te llega actualizada sin costo. Nunca más buscar la circular.
          </p>
          <p className="mt-2 text-sm font-semibold text-emerald-900">
            $14.900 pago único · devolución dentro de los 7 días
          </p>
        </div>
        <Link
          href="/planillas?desde=cta-comercio"
          data-evento="cta_compra"
          data-producto="planilla-comercio"
          data-ubicacion="calculadora"
          className="shrink-0 rounded-lg bg-emerald-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 active:translate-y-px"
        >
          Ver la planilla →
        </Link>
      </div>
      <p className="mt-4 border-t border-emerald-200/70 pt-3 text-sm text-emerald-900/80">
        ¿Sos empleado de comercio? No necesitás la planilla: cuánto te queda en mano lo ves gratis en{" "}
        <Link
          href="/sueldo-neto/comercio"
          className="font-semibold text-emerald-800 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950"
        >
          sueldo neto de comercio
        </Link>
        .
      </p>
    </section>
  );
}
