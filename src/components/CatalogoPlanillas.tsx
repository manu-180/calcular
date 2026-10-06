import Link from "next/link";
import { CATALOGO, type ProductoSlug } from "@/lib/mp";

const CORTO: Record<ProductoSlug, string> = {
  "planilla-comercio": "Comercio",
  "planilla-casas-particulares": "Casas particulares",
  "planilla-monotributo": "Monotributo",
  "planilla-uocra": "UOCRA",
  "planilla-alquileres": "Alquileres",
  "informe-cuota-alimentaria": "Cuota alimentaria",
  "planilla-camioneros": "Camioneros",
  "planilla-vacaciones": "Vacaciones",
  "planilla-mi-sueldo": "Mi sueldo",
  "planilla-plazo-fijo": "Plazo fijo",
  "informe-indemnizacion": "Despido",
  "informe-ganancias": "Ganancias",
  "informe-credito-laboral": "Crédito laboral",
  "informe-inflacion": "Inflación",
};

/** Navegación entre los productos: el que cayó en el equivocado encuentra el suyo en un toque. */
export function CatalogoPlanillas({ actual }: { actual: ProductoSlug }) {
  return (
    <nav aria-label="Planillas e informes" className="mb-6 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-1.5 rounded-xl border border-zinc-200 bg-white/70 p-1 text-sm">
        {CATALOGO.map((p) => {
          const activo = p.slug === actual;
          return (
            <li key={p.slug}>
              <Link
                href={p.rutaLanding}
                aria-current={activo ? "page" : undefined}
                className={
                  activo
                    ? "block rounded-lg bg-zinc-900 px-3 py-1.5 font-semibold text-white"
                    : "block rounded-lg px-3 py-1.5 font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                }
              >
                {CORTO[p.slug]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** El resto del catálogo, para la sidebar y la página de gracias. */
export function OtrasPlanillas({ actual, titulo = "También te puede servir" }: { actual: ProductoSlug; titulo?: string }) {
  const otras = CATALOGO.filter((p) => p.slug !== actual);
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm">
      <p className="font-semibold text-zinc-900">{titulo}</p>
      <ul className="mt-2 divide-y divide-zinc-100">
        {otras.map((p) => (
          <li key={p.slug}>
            <Link
              href={p.rutaLanding}
              data-evento="cta_compra"
              data-producto={p.slug}
              data-ubicacion="otras-planillas"
              className="group flex items-start justify-between gap-3 py-2.5"
            >
              <span>
                <span className="block font-medium text-zinc-800 group-hover:text-emerald-700">{p.tituloCorto}</span>
                <span className="block text-xs text-zinc-500">{p.paraQuien}</span>
              </span>
              <span className="shrink-0 text-xs font-semibold tabular-nums text-zinc-700">
                ${p.precio.toLocaleString("es-AR")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
