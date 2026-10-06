import Link from "next/link";
import { formatARS, formatPctFijo } from "@/lib/formato";
import { InformeGananciasMiniatura } from "@/components/informe-ganancias/Miniatura";
import { FICHAS, RUTA_LANDING_INFORME, SLUG_INFORME, principales, type Informe } from "@/app/informes/ganancias/_modelo";

// Va a la landing y no abre el diálogo de compra: ahí la persona ve el informe con SUS números antes
// de pagar. `desde` termina en la referencia de MercadoPago: es como se sabe qué calculadora vendió.
export function GananciasInformeCTA({ informe, precio }: { informe: Informe; precio: number }) {
  const top = principales(informe, 3);
  return (
    <section
      data-oferta={SLUG_INFORME}
      aria-labelledby="cta-informe-ganancias"
      className="rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5"
    >
      <div className="grid gap-6 overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:grid-cols-[1fr_13rem] sm:items-center sm:p-6">
        <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">Informe personal · PDF</p>
          <h2 id="cta-informe-ganancias" className="mt-1.5 text-xl font-bold tracking-tight text-zinc-900">
            Pagá menos Ganancias, con lo que la ley ya te permite
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Estás en el tramo del {formatPctFijo(informe.alicuotaMarginal * 100, 0)}: cada $100.000 por mes que deducís te
            devuelven <strong className="font-semibold text-zinc-900">{formatARS(informe.porCada100k, 0)}</strong> en el año.
            Lo que más te puede devolver:
          </p>
          <dl className="mt-3 divide-y divide-zinc-100 rounded-xl ring-1 ring-zinc-200">
            {top.map((o) => (
              <div key={o.id} className="flex items-baseline justify-between gap-4 px-3.5 py-2 text-sm">
                <dt className="text-zinc-700">{FICHAS[o.id].titulo}</dt>
                <dd className="shrink-0 tabular-nums text-zinc-900">
                  <span className="text-xs text-zinc-500">hasta </span>
                  <span className="font-semibold">{formatARS(o.ahorroTecho, 0)}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            Cada cifra es el máximo legal de esa deducción para tu sueldo. En el informe cargás lo que pagás y ves tu
            número exacto, con el paso a paso para cargarlo en el SiRADIG.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`${RUTA_LANDING_INFORME}?desde=ganancias`}
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
              <span className="font-semibold text-zinc-800">${precio.toLocaleString("es-AR")}</span> · pago único · devolución
              dentro de los 7 días
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[13rem] sm:rotate-[1.5deg]">
          <InformeGananciasMiniatura informe={informe} />
        </div>
      </div>
    </section>
  );
}
