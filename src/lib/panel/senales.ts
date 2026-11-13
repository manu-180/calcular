import type { Lectura } from "@/lib/panel/tipos";

// Las lecturas con tono "oportunidad" del panel no se quedan en el panel: cada una viaja a Kairo
// como pedido autónomo y el ejecutor la resuelve hasta producción (Manuel 2026-11-12: "apenas se
// consideren oportunidades se accionen"). La conecta /api/cron/oportunidades, una vez por día.

export type Senal = {
  proyecto: "calcular";
  clave_origen: string;
  titulo: string;
  detalle: string;
  link?: string;
};

const SITIO = "https://calcular.ar";

// Kairo acepta sólo [\w.:@\-/] en la clave. La clave tiene que ser la misma todos los días mientras la
// oportunidad siga ahí: es lo que hace que Kairo no la tome dos veces.
export function claveDeLectura(id: string): string {
  return `oportunidad:${id}`
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^\w.:@/-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/-$/, "")
    .slice(0, 200);
}

function queHacer(l: Lectura): string {
  if (l.id.startsWith("candidata-")) {
    const path = l.id.slice("candidata-".length);
    return [
      `Qué hacer: que ${path} venda. Primero fijate si alguna planilla del catálogo (src/lib/mp.ts) le resuelve algo real a quien usa esa calculadora y, si sirve, mostrala ahí con la misma oferta que ya usan las calculadoras que venden (la página declara qué vende con el campo «vende» de PAGINAS en src/data/navegacion.ts, y la oferta se monta como en las páginas que ya lo tienen).`,
      `Si ninguna le sirve de verdad, armá la planilla propia de ese tema con el mismo sistema que las otras (generador en scripts/, xlsx en private/, alta en el catálogo y su oferta en la página), con los datos oficiales vigentes y sus fuentes.`,
      `Hecho = en producción, la oferta visible en ${SITIO}${path} y la compra llegando a Mercado Pago. La lectura del panel deja de aparecer sola cuando la página tiene producto.`,
    ].join(" ");
  }
  if (l.id.startsWith("busqueda-")) {
    return `Qué hacer: que esa búsqueda encuentre algo. Si ya hay una calculadora o página del tema, que el buscador la devuelva (sinónimos o palabras clave); si no existe, creala con el sistema de siempre (fuentes oficiales, casos de prueba, SEO) y, si tiene sentido, con su planilla. Hecho = en producción y la búsqueda devolviendo resultados.`;
  }
  return `Qué hacer: resolvé la causa hasta producción y dejá cómo se mide que funcionó.`;
}

export function senalesDeLecturas(lecturas: Lectura[]): Senal[] {
  return lecturas
    .filter((l) => l.tono === "oportunidad")
    .map((l) => {
      const href = l.accion?.href;
      const link = href?.startsWith("/") ? `${SITIO}${href}` : undefined;
      const detalle = `${l.titulo}. ${l.detalle} (Panel de calcular.ar, últimos 30 días.) ${queHacer(l)}`;
      return {
        proyecto: "calcular" as const,
        clave_origen: claveDeLectura(l.id),
        titulo: l.titulo.slice(0, 200),
        detalle: detalle.slice(0, 4000),
        ...(link ? { link } : {}),
      };
    });
}
