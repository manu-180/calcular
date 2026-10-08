import Link from "next/link";
import type { ResultadoCuota } from "@/lib/cuota-alimentaria";
import { InformeCuotaMiniatura } from "@/components/InformeCuotaMiniatura";
import { RUTA_LANDING_INFORME, SLUG_INFORME } from "@/app/(ar)/informes/cuota-alimentaria/_modelo";

// Va a la landing y no abre el diálogo de compra: ahí la persona ve el informe entero con SUS
// números antes de pagar, que es lo que vende un documento que todavía no vio.
// `desde` termina en la referencia de MercadoPago: es como se sabe qué calculadora vendió.
const PUNTOS = [
  "Tu cuenta explicada, con la fuente del INDEC y el mes del dato",
  "El reparto entre los dos y cómo se actualiza la cuota",
  "Para imprimir o guardar en PDF, con los nombres si querés",
];

export function CuotaInformeCTA({ r, precio }: { r: ResultadoCuota; precio: number }) {
  return (
    <section
      data-oferta={SLUG_INFORME}
      aria-labelledby="cta-informe-titulo"
      className="mt-6 rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5"
    >
      <div className="grid gap-6 overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:grid-cols-[1fr_13rem] sm:items-center sm:p-6">
        <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Informe para imprimir
          </p>
          <h2 id="cta-informe-titulo" className="mt-1.5 text-xl font-bold tracking-tight text-zinc-900">
            Llevá este cálculo a la mediación
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            {PUNTOS.map((p) => (
              <li key={p} className="flex gap-2">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600">
                  <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`${RUTA_LANDING_INFORME}?desde=cuota-alimentaria`}
              data-evento="cta_compra"
              data-producto={SLUG_INFORME}
              data-ubicacion="calculadora-resultado"
              className="group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-emerald-600 py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-snappy)] hover:bg-emerald-700 hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)] active:scale-[0.98]"
            >
              Ver mi informe
              <span className="grid size-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 ease-[var(--ease-snappy)] group-hover:translate-x-0.5">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-4">
                  <path d="M4.5 10h11m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-500">
              <span className="font-semibold text-zinc-800">${precio.toLocaleString("es-AR")}</span> · pago único ·
              devolución dentro de los 7 días
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[13rem] sm:rotate-[1.5deg]">
          <InformeCuotaMiniatura r={r} />
        </div>
      </div>
    </section>
  );
}
