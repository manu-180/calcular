import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { agregadosDe } from "@/lib/sueldos/lectura";
import { paisAportable } from "@/lib/sueldos/paises";
import { ogSueldos } from "@/lib/sueldos/og";
import { textosSueldos } from "@/motor/i18n/sueldos";
import { edicionPrincipal } from "@/motor/mundo/rutas";
import { urlMundo } from "@/motor/mundo/ui/seo";
import { elegirTitulo, metadataDe, urlIntl } from "@/motor/seo";
import { intlActivo, NOMBRE_SITIO_INTL } from "@/motor/sitio";
import { K } from "@/motor/sueldos/catalogo";
import { ocupacionesPublicadas } from "@/motor/sueldos/filas";
import { SLUG_SUELDOS } from "@/motor/sueldos/rutas";
import { lugares, rellenar } from "@/motor/sueldos/ui/comun";
import { PaginaSueldos } from "@/motor/sueldos/ui/PaginaSueldos";
import type { CodigoMercado, Idioma } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { registro } from "@/paises";

// «Sueldos reales» de un país, compartida por la carpeta de cada slug de SLUG_SUELDOS (una por idioma).
// Existe en toda edición con país en la grilla del mundo (global no tiene país); las ediciones de otro
// idioma (ca-fr) muestran los datos del país (ca). Sin ocupaciones publicadas la página se dibuja con
// el llamado a aportar, fuera del índice: una página casi vacía no se manda a Google.

type Props = { params: Promise<{ mercado: string; resto?: string[] }> };

function resolver(idioma: Idioma, mercado: string) {
  const ctx = intlActivo() ? contextoSitio(registro, mercado as CodigoMercado) : null;
  if (!ctx || ctx.mercado.idioma !== idioma || ctx.mercado.codigo === "global") return null;
  const principal = edicionPrincipal(ctx.mercado.codigo);
  const pais = paisAportable(principal);
  if (!pais) return null;
  const m = ctx.mercado;
  return { ctx, m, pais, principal, t: textosSueldos(m.idioma, m.trato, m.locale) };
}

export function crearPaginaSueldos(idioma: Idioma) {
  const slug = SLUG_SUELDOS[idioma];

  // Como el mundo: nada en el build (la página vive en un [[...resto]] vacío; sin él, el build la pintaba
  // por cada edición del layout), cada edición se pinta al primer pedido y queda en caché.
  function generateStaticParams() {
    return [];
  }

  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { mercado, resto } = await params;
    const r = resto?.length ? null : resolver(idioma, mercado);
    if (!r) return {};
    const { enPais } = lugares(r.m.idioma, r.m.nombre);
    const datos = await agregadosDe(r.principal);
    const meta = metadataDe({
      mercado: r.m,
      slug,
      title: elegirTitulo([rellenar(r.t.pagina.seoTitulo, { enPais, pais: r.m.nombre }), rellenar(r.t.pagina.h1, { enPais, pais: r.m.nombre })]),
      description: rellenar(r.t.pagina.seoDescripcion, { enPais, pais: r.m.nombre, k: K }),
      imagen: `${urlIntl(r.m.codigo, slug)}/og`,
    });
    return datos && ocupacionesPublicadas(datos) > 0 ? meta : { ...meta, robots: { index: false, follow: true } };
  }

  async function Pagina({ params }: Props) {
    const { mercado, resto } = await params;
    const r = resto?.length ? null : resolver(idioma, mercado);
    if (!r) notFound();
    const datos = await agregadosDe(r.principal);
    return (
      <PaginaSueldos
        t={r.t}
        idioma={r.m.idioma}
        locale={r.m.locale}
        nombrePais={r.m.nombre}
        moneda={r.pais.moneda}
        datos={datos}
        k={K}
        urlAporte={urlMundo(r.m)}
        url={urlIntl(r.m.codigo, slug)}
      />
    );
  }

  return { generateStaticParams, generateMetadata, Pagina };
}

export function crearOgSueldos(idioma: Idioma) {
  return async function GET(req: Request, { params }: Props) {
    const { mercado } = await params;
    const r = resolver(idioma, mercado);
    if (!r) return new Response("No encontrado", { status: 404 });
    // nxtP… son los parámetros de ruta que Next pasa por la query en algunos entornos; cualquier otro
    // parámetro es 404, así nadie llena la caché con variantes.
    if ([...new URL(req.url).searchParams.keys()].some((k) => !k.startsWith("nxtP"))) return new Response("No encontrado", { status: 404 });
    const datos = await agregadosDe(r.principal);
    const n = datos ? ocupacionesPublicadas(datos) : 0;
    const { enPais } = lugares(r.m.idioma, r.m.nombre);
    return ogSueldos({
      titulo: rellenar(r.t.pagina.h1, { enPais, pais: r.m.nombre }),
      bajada: n ? rellenar(r.t.pagina.ogBajada, { n }) : r.t.pagina.ogBajadaCero,
      ceja: r.t.pagina.ceja,
      marca: NOMBRE_SITIO_INTL,
      dominio: "calcularya.com",
      iso: r.m.pais,
      idioma: r.m.idioma,
      locale: r.m.locale,
    });
  };
}
