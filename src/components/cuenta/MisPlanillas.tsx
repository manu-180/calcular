import Link from "next/link";
import { CATALOGO, productoPorSlug, type Producto } from "@/lib/mp";
import type { SitioCuenta } from "@/lib/auth/sitio";
import { textosDe, type TextosCuenta } from "@/lib/cuenta/textos";

// moneda y monto son opcionales: una compra de otro proveedor (PayPal, Stripe) o de un producto que
// este catálogo todavía no conoce igual se lista, con lo que se sepa de ella.
export type CompraFila = { id: number; producto: string; estado: string; pagado_at: string | null; moneda?: string | null; monto?: number | string | null };

const PRECIO = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

const anio = (p: Producto) => p.titulo.match(/20\d\d/)?.[0];

const humanizar = (slug: string) => {
  const s = slug.replace(/[-_]+/g, " ").trim();
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "Compra";
};

function importe(c: CompraFila, locale: string): string | null {
  const monto = Number(c.monto);
  if (!c.moneda || !/^[A-Z]{3}$/.test(c.moneda) || !Number.isFinite(monto)) return null;
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency: c.moneda }).format(monto);
  } catch {
    return null;
  }
}

type Tarjeta = { compra: CompraFila; producto: Producto | null; clave: string };

// Una tarjeta por producto: si alguien compró dos veces la misma planilla, gana la compra
// activa más reciente (las filas ya vienen ordenadas por fecha, de la más nueva).
function porProducto(compras: CompraFila[], conDesconocidos: boolean): Tarjeta[] {
  const vistos = new Map<string, Tarjeta>();
  for (const c of compras) {
    const producto = productoPorSlug(c.producto);
    if (!producto && !conDesconocidos) continue;
    const clave = producto?.slug ?? `?${c.producto}`;
    const previo = vistos.get(clave);
    if (!previo || (previo.compra.estado !== "aprobado" && c.estado === "aprobado")) {
      vistos.set(clave, { compra: c, producto, clave });
    }
  }
  return [...vistos.values()];
}

export function MisPlanillas({
  compras,
  error,
  verificado,
  sitio = "ar",
}: {
  compras: CompraFila[];
  error: boolean;
  verificado: boolean;
  sitio?: SitioCuenta;
}) {
  const textos = textosDe(sitio);
  const t = textos.planillas;
  if (error) {
    return <p className="rounded-2xl bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-600">{t.error}</p>;
  }

  const fechaDe = new Intl.DateTimeFormat(textos.formato.locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: textos.formato.zona,
  });
  const filas = porProducto(compras, sitio === "intl");
  if (filas.length === 0) return <SinPlanillas verificado={verificado} t={t} />;

  return (
    <ul className="divide-y divide-zinc-100">
      {filas.map(({ compra, producto, clave }, i) => {
        const activa = compra.estado === "aprobado";
        const informe = producto?.entrega === "informe";
        const fecha = compra.pagado_at ? fechaDe.format(new Date(compra.pagado_at)) : null;
        const precio = producto ? null : importe(compra, textos.formato.locale);
        return (
          <li
            key={clave}
            className="flex animate-[ca-col_0.4s_var(--ease-fluid)_backwards] flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
            style={{ animationDelay: `${i * 45}ms` }}
          >
            <div className="flex flex-1 items-start gap-4">
              {informe ? <IconoInforme /> : <IconoPlanilla />}
              <div className="min-w-0">
                <p className="font-semibold text-zinc-900">{producto ? producto.tituloCorto : humanizar(compra.producto)}</p>
                {producto ? <p className="mt-0.5 text-sm text-zinc-500">{producto.convenio}</p> : null}
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                  {fecha ? t.comprado(informe, fecha) : t.registrada}
                  {precio ? (
                    <>
                      <span aria-hidden> · </span>
                      <span className="tabular-nums">{precio}</span>
                    </>
                  ) : null}
                  {activa && producto && anio(producto) ? (
                    <>
                      <span aria-hidden> · </span>
                      <span className="font-medium text-emerald-700">{t.incluye(anio(producto)!)}</span>
                    </>
                  ) : null}
                </p>
              </div>
            </div>
            {activa && producto ? (
              <a
                href={`/api/cuenta/descargar/${compra.id}`}
                className="group inline-flex h-11 shrink-0 items-center justify-center gap-2.5 rounded-full bg-zinc-900 pl-5 pr-1.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.18)] transition-[background-color,transform,box-shadow] duration-300 ease-[var(--ease-snappy)] hover:-translate-y-px hover:bg-zinc-800 hover:shadow-[0_10px_22px_-10px_rgba(0,0,0,0.35)] active:translate-y-0 active:scale-[0.99]"
              >
                {informe ? t.verInforme : t.bajar}
                <span
                  className={`grid size-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 ease-[var(--ease-snappy)] ${informe ? "group-hover:translate-x-0.5" : "group-hover:translate-y-0.5"}`}
                >
                  <svg className="size-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={informe ? "M4 10h12M11.5 5.5 16 10l-4.5 4.5" : "M10 3.5v10M5.5 9.5 10 14l4.5-4.5M4 16.5h12"} />
                  </svg>
                </span>
              </a>
            ) : activa ? null : (
              <span className="inline-flex h-9 shrink-0 items-center rounded-full bg-zinc-100 px-4 text-[13px] font-medium text-zinc-500">
                {compra.estado === "reembolsado" ? t.reembolsada(informe) : t.noDisponible}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function SinPlanillas({ verificado, t }: { verificado: boolean; t: TextosCuenta["planillas"] }) {
  return (
    <div>
      <p className="text-[15px] leading-relaxed text-zinc-600">{verificado ? t.vacioVerificado : t.vacioSinVerificar}</p>
      {t.catalogo ? (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {CATALOGO.map((p, i) => (
            <li key={p.slug} className="animate-[ca-col_0.4s_var(--ease-fluid)_backwards]" style={{ animationDelay: `${i * 45}ms` }}>
              <Link
                href={p.rutaLanding}
                className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-4 transition-[border-color,transform,box-shadow] duration-300 ease-[var(--ease-snappy)] hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_12px_28px_-16px_rgba(0,0,0,0.22)]"
              >
                <span className="text-sm font-semibold text-zinc-900">{p.tituloCorto}</span>
                <span className="mt-1 flex-1 text-[13px] leading-relaxed text-zinc-500">{p.paraQuien}</span>
                <span className="mt-3 flex items-center justify-between text-[13px]">
                  <span className="font-medium tabular-nums text-zinc-700">{PRECIO.format(p.precio)}</span>
                  <span className="font-semibold text-emerald-700 transition-transform duration-300 ease-[var(--ease-snappy)] group-hover:translate-x-0.5">
                    {p.entrega === "informe" ? "Ver el informe →" : "Ver la planilla →"}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-5 text-[13px] leading-relaxed text-zinc-500">
        {t.otroMail}{" "}
        <Link href="/contacto" className="font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-600">
          {t.escribinos}
        </Link>{" "}
        {t.laSumamos}
      </p>
    </div>
  );
}

function IconoPlanilla() {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10" aria-hidden>
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
        <path d="M4 9h16M4 14.5h16M10 9v11.5" />
      </svg>
    </span>
  );
}

function IconoInforme() {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10" aria-hidden>
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3.5H7.5A2.5 2.5 0 0 0 5 6v12a2.5 2.5 0 0 0 2.5 2.5h9A2.5 2.5 0 0 0 19 18V8.5z" />
        <path d="M14 3.5v5h5M8.5 13h7M8.5 16.5h4.5" />
      </svg>
    </span>
  );
}
