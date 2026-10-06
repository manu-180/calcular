import Link from "next/link";
import { CATALOGO, productoPorSlug, type Producto } from "@/lib/mp";

export type CompraFila = { id: number; producto: string; estado: string; pagado_at: string | null };

const FECHA = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "America/Argentina/Buenos_Aires",
});

const PRECIO = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

const anio = (p: Producto) => p.titulo.match(/20\d\d/)?.[0];

// Una tarjeta por producto: si alguien compró dos veces la misma planilla, gana la compra
// activa más reciente (las filas ya vienen ordenadas por fecha, de la más nueva).
function porProducto(compras: CompraFila[]) {
  const vistos = new Map<string, { compra: CompraFila; producto: Producto }>();
  for (const c of compras) {
    const producto = productoPorSlug(c.producto);
    if (!producto) continue;
    const previo = vistos.get(producto.slug);
    if (!previo || (previo.compra.estado !== "aprobado" && c.estado === "aprobado")) {
      vistos.set(producto.slug, { compra: c, producto });
    }
  }
  return [...vistos.values()];
}

export function MisPlanillas({
  compras,
  error,
  verificado,
}: {
  compras: CompraFila[];
  error: boolean;
  verificado: boolean;
}) {
  if (error) {
    return (
      <p className="rounded-2xl bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-600">
        No pudimos cargar tus planillas en este momento. Si compraste alguna, también la tenés en el
        mail de la compra. Probá de nuevo en un rato.
      </p>
    );
  }

  const filas = porProducto(compras);
  if (filas.length === 0) return <SinPlanillas verificado={verificado} />;

  return (
    <ul className="divide-y divide-zinc-100">
      {filas.map(({ compra, producto }, i) => {
        const activa = compra.estado === "aprobado";
        const fecha = compra.pagado_at ? FECHA.format(new Date(compra.pagado_at)) : null;
        return (
          <li
            key={producto.slug}
            className="flex animate-[ca-col_0.4s_var(--ease-fluid)_backwards] flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
            style={{ animationDelay: `${i * 45}ms` }}
          >
            <div className="flex flex-1 items-start gap-4">
              {producto.entrega === "informe" ? <IconoInforme /> : <IconoPlanilla />}
              <div className="min-w-0">
                <p className="font-semibold text-zinc-900">{producto.tituloCorto}</p>
                <p className="mt-0.5 text-sm text-zinc-500">{producto.convenio}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                  {fecha ? `${producto.entrega === "informe" ? "Comprado" : "Comprada"} el ${fecha}` : "Compra registrada"}
                  {activa && anio(producto) ? (
                    <>
                      <span aria-hidden> · </span>
                      <span className="font-medium text-emerald-700">Incluye las actualizaciones de {anio(producto)}</span>
                    </>
                  ) : null}
                </p>
              </div>
            </div>
            {activa ? (
              <a
                href={`/api/cuenta/descargar/${compra.id}`}
                className="group inline-flex h-11 shrink-0 items-center justify-center gap-2.5 rounded-full bg-zinc-900 pl-5 pr-1.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.18)] transition-[background-color,transform,box-shadow] duration-300 ease-[var(--ease-snappy)] hover:-translate-y-px hover:bg-zinc-800 hover:shadow-[0_10px_22px_-10px_rgba(0,0,0,0.35)] active:translate-y-0 active:scale-[0.99]"
              >
                {producto.entrega === "informe" ? "Ver el informe" : "Bajar la versión actual"}
                <span
                  className={`grid size-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 ease-[var(--ease-snappy)] ${producto.entrega === "informe" ? "group-hover:translate-x-0.5" : "group-hover:translate-y-0.5"}`}
                >
                  <svg className="size-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={producto.entrega === "informe" ? "M4 10h12M11.5 5.5 16 10l-4.5 4.5" : "M10 3.5v10M5.5 9.5 10 14l4.5-4.5M4 16.5h12"} />
                  </svg>
                </span>
              </a>
            ) : (
              <span className="inline-flex h-9 shrink-0 items-center rounded-full bg-zinc-100 px-4 text-[13px] font-medium text-zinc-500">
                {compra.estado === "reembolsado" ? (producto.entrega === "informe" ? "Reembolsado" : "Reembolsada") : "No disponible"}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function SinPlanillas({ verificado }: { verificado: boolean }) {
  return (
    <div>
      <p className="text-[15px] leading-relaxed text-zinc-600">
        {verificado
          ? "Todavía no tenés planillas acá. Cuando compres una con este mail, aparece sola y siempre en su última versión."
          : "Cuando confirmes tu mail, las planillas que hayas comprado con él aparecen acá solas."}
      </p>
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
      <p className="mt-5 text-[13px] leading-relaxed text-zinc-500">
        ¿Compraste con otro mail?{" "}
        <Link href="/contacto" className="font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-600">
          Escribinos
        </Link>{" "}
        y la sumamos a tu cuenta.
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
