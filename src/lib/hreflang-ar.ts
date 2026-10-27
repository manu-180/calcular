import { CONCEPTOS } from "@/motor/conceptos";
import { hreflangDe, hreflangVaAlSitemap, type Idiomas } from "@/motor/seo";
import { hreflangARActivo, intlActivo, modoPublicacion } from "@/motor/sitio";
import { hoyEn } from "@/motor/vigencia";
import { registro } from "@/paises";

// hreflang de calcular.ar hacia calcularya (ADR 0001, D6; plan 1.8). Cada calculadora de AR con concepto
// (CONCEPTOS[c].rutaAR) es una página más del clúster de ese concepto: lista a todas sus equivalentes de
// calcularya y ellas la listan como es-AR (hreflangDe pone es-AR con el flag prendido). Sin el flag
// todo devuelve undefined y el HTML de AR no cambia un byte.
//
// Mismo reparto que calcularya: un clúster de hasta MAX_HREFLANG_HEAD va en el <head> de la página; uno
// más grande va entero en el sitemap de AR (xhtml:link) y no en el <head>. Google acepta un método por
// página; lo que no acepta es un clúster que no sea recíproco, y eso lo vigila check_hreflang.

export function conceptoDeRutaAR(ruta: string): string | undefined {
  return Object.entries(CONCEPTOS).find(([, c]) => (c as { rutaAR?: string }).rutaAR === ruta)?.[0];
}

export function rutasARConCluster(): string[] {
  return Object.values(CONCEPTOS)
    .map((c) => (c as { rutaAR?: string }).rutaAR)
    .filter((r): r is string => Boolean(r));
}

export function clusterAR(ruta: string): Idiomas | undefined {
  if (!hreflangARActivo() || !intlActivo()) return undefined;
  const concepto = conceptoDeRutaAR(ruta);
  if (!concepto) return undefined;
  return hreflangDe(concepto, registro.equivalentes(concepto, (m) => hoyEn(m), modoPublicacion()));
}

// Lo que va en alternates.languages de la página (clúster chico). Los grandes van por sitemap.
export function hreflangHeadAR(ruta: string): Idiomas | undefined {
  const idiomas = clusterAR(ruta);
  return idiomas && !hreflangVaAlSitemap(idiomas) ? idiomas : undefined;
}

// Lo que va en el sitemap de AR (clúster grande), por ruta.
export function alternosSitemapAR(): Map<string, Idiomas> {
  const salida = new Map<string, Idiomas>();
  for (const ruta of rutasARConCluster()) {
    const idiomas = clusterAR(ruta);
    if (idiomas && hreflangVaAlSitemap(idiomas)) salida.set(ruta, idiomas);
  }
  return salida;
}
