import type { OrigenTraduccion } from "@/motor/tipos";
import { MERCADOS } from "./mercados";
import type { Cargador } from "./tipos";

export { MERCADOS };
export type { Cargador };

// Primer paso, el mapa del mercado (cargadores/<m>.ts, un chunk por país); segundo, la calculadora.
// Un mercado sin mapa (zz, una edición o un país en "interno") en `next dev` usa cargadores/dev.ts;
// en producción no tiene cargador, como antes.
export function cargadorLocal(mercado: string, slug: string, traduccion?: OrigenTraduccion): Cargador | undefined {
  const delMercado = MERCADOS[mercado];
  if (!delMercado) {
    if (process.env.NODE_ENV === "development") {
      return async () => {
        const cargador = (await import("./dev")).cargadorDev(mercado, slug, traduccion);
        if (!cargador) throw new Error(`sin cargador de desarrollo para ${mercado}/${slug}`);
        return cargador();
      };
    }
    return undefined;
  }
  return async () => {
    const cargador = (await delMercado()).CARGADORES[slug];
    if (!cargador) throw new Error(`sin cargador para ${mercado}/${slug}`);
    return cargador();
  };
}

// La forma vieja (CARGADORES[mercado][slug]) para el informe (informes/[informe]/ver/_informe-vivo.tsx).
// Un slug que no existe ya no da undefined acá: da un cargador que falla, y el informe lo muestra
// como cálculo fallido, igual que si el chunk no bajara.
export const CARGADORES = new Proxy({} as Readonly<Record<string, Readonly<Record<string, Cargador>>>>, {
  get: (_, mercado) =>
    typeof mercado === "string" && MERCADOS[mercado]
      ? new Proxy({} as Readonly<Record<string, Cargador>>, { get: (__, slug) => (typeof slug === "string" ? cargadorLocal(mercado, slug) : undefined) })
      : undefined,
});
