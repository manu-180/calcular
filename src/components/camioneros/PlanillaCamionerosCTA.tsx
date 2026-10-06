import Link from "next/link";
import { PRODUCTOS } from "@/lib/mp";
import { MESES_CAMIONEROS } from "@/data/convenios/camioneros";

// Oferta de la planilla paga en las páginas de escala mes a mes (/convenios/camioneros/[mes]): quien
// llega ahí busca la tabla de un mes para liquidar, no hacer una cuenta. La objeción real es «tengo
// que buscar el PDF escaneado cada mes y armar los viáticos a mano»: eso es lo que resuelve.
export function PlanillaCamionerosCTA({ mesEtiqueta }: { mesEtiqueta: string }) {
  const p = PRODUCTOS["planilla-camioneros"];
  const precio = `$${p.precio.toLocaleString("es-AR")}`;
  const desde = MESES_CAMIONEROS[0].etiqueta.toLowerCase();
  const hasta = MESES_CAMIONEROS.at(-1)!.etiqueta.toLowerCase();
  return (
    <section
      data-oferta={p.slug}
      aria-labelledby="cta-planilla-camioneros"
      className="rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/[0.06]"
    >
      <div className="grid gap-5 rounded-[1.375rem] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-8 sm:p-7">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-800 ring-1 ring-emerald-700/10">
            Planilla para liquidar
          </p>
          <h2 id="cta-planilla-camioneros" className="mt-3 text-xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-[1.375rem]">
            La escala de {mesEtiqueta.toLowerCase()} ya cargada, con kilómetros y viáticos
          </h2>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-zinc-600">
            Excel y Google Sheets con los básicos firmados de {desde} a {hasta}, la comida, la pernoctada y el valor
            por km del convenio, la nómina de toda la flota, el recibo para imprimir y el aguinaldo. Cuando FADEEAC
            publica la planilla siguiente, te llega actualizada sin pagar de nuevo.
          </p>
          <p className="mt-3 text-sm text-zinc-500">
            <span className="font-semibold tabular-nums text-zinc-900">{precio}</span> pago único · devolución dentro de
            los 7 días
          </p>
        </div>
        <Link
          href={`${p.rutaLanding}?desde=cta-camioneros-mes`}
          data-evento="cta_compra"
          data-producto={p.slug}
          data-ubicacion="escala-mensual"
          className="group flex min-h-12 items-center justify-between gap-3 rounded-xl bg-emerald-600 py-1.5 pr-1.5 pl-5 text-base font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-snappy)] hover:bg-emerald-700 hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.35)] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          Ver la planilla
          <span
            aria-hidden
            className="grid size-9 place-items-center rounded-lg bg-white/15 transition-transform duration-200 ease-[var(--ease-snappy)] group-hover:translate-x-0.5"
          >
            <svg viewBox="0 0 20 20" fill="none" className="size-4">
              <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
