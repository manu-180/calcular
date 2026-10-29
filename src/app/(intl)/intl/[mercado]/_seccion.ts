import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import type { Idioma } from "@/motor/tipos";

// Puente entre la ruta única de cada sección (i/<seccion>/[seccion]) y las fábricas por idioma de
// _horas, _mundo, _rankings, _sueldos y _calendario: el slug de la URL dice el idioma y la fábrica de
// ese idioma hace todo lo demás, con el mismo 404 de siempre si el mercado es de otro idioma.
// Ver src/motor/secciones.ts.

type ConSeccion = { params: Promise<{ seccion: string }> };

function idiomaDe(slugs: Record<Idioma, string>, seccion: string): Idioma | null {
  for (const [idioma, slug] of Object.entries(slugs)) if (slug === seccion) return idioma as Idioma;
  return null;
}

function porIdioma<F>(slugs: Record<Idioma, string>, crear: (idioma: Idioma) => F) {
  const hechas = new Map<Idioma, F>();
  return async (params: Promise<object>) => {
    const { seccion } = (await params) as { seccion: string };
    const idioma = idiomaDe(slugs, seccion);
    if (!idioma) return null;
    let f = hechas.get(idioma);
    if (!f) hechas.set(idioma, (f = crear(idioma)));
    return f;
  };
}

type Fabrica<P> = {
  generateMetadata: (props: P) => Promise<Metadata>;
  Pagina: (props: P) => Promise<ReactNode>;
};

export function paginaPorSeccion<P extends { params: Promise<object> }>(slugs: Record<Idioma, string>, crear: (idioma: Idioma) => Fabrica<P>) {
  const de = porIdioma(slugs, crear);
  return {
    // Nada en el build, como en cada fábrica: cada edición se pinta al primer pedido.
    generateStaticParams: () => [],
    async generateMetadata(props: P & ConSeccion): Promise<Metadata> {
      const f = await de(props.params);
      return f ? f.generateMetadata(props) : {};
    },
    async Pagina(props: P & ConSeccion) {
      const f = await de(props.params);
      if (!f) notFound();
      return f.Pagina(props);
    },
  };
}

export function getPorSeccion<C extends { params: Promise<object> }>(
  slugs: Record<Idioma, string>,
  crear: (idioma: Idioma) => (req: Request, ctx: C) => Promise<Response>,
) {
  const de = porIdioma(slugs, crear);
  return async function GET(req: Request, ctx: C & ConSeccion) {
    const get = await de(ctx.params);
    return get ? get(req, ctx) : new Response("No encontrado", { status: 404 });
  };
}
