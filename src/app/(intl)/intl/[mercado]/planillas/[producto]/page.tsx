import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ventaIntlActiva } from "@/lib/pagos";
import { catalogoIntl, productoIntlDe } from "@/lib/pagos/catalogo-intl";
import { rutaIntl, urlIntl } from "@/motor/seo";
import { intlActivo, modoPublicacion } from "@/motor/sitio";
import type { CodigoMercado } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { IconoFlecha } from "@/motor/ui/Iconos";
import { Migas } from "@/motor/ui/Sitio";
import { registro } from "@/paises";
import { precioIntl, textosPlanillas } from "../_textos";

export const revalidate = 3600;

type Props = { params: Promise<{ mercado: string; producto: string }> };

export function generateStaticParams({ params }: { params: { mercado: string } }) {
  if (!intlActivo()) return [];
  if (!registro.mercados(modoPublicacion()).some((m) => m.codigo === params.mercado)) return [];
  return catalogoIntl()
    .filter((p) => p.mercado === params.mercado)
    .map((p) => ({ producto: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mercado, producto } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  const p = ctx ? productoIntlDe(ctx.mercado.codigo, producto) : null;
  if (!ctx || !p) return {};
  return {
    title: `${p.titulo} | CalcularYa`,
    description: `${p.paraQuien}. ${precioIntl(p, ctx.mercado.locale)}, con actualizaciones incluidas.`,
    alternates: { canonical: urlIntl(ctx.mercado.codigo, `planillas/${p.slug}`) },
    robots: ctx.mercado.estado === "publicado" && ctx.modo === "produccion" ? undefined : { index: false, follow: true },
  };
}

export default async function LandingPlanillaIntl({ params }: Props) {
  const { mercado, producto } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  const p = ctx ? productoIntlDe(ctx.mercado.codigo, producto) : null;
  if (!ctx || !p) notFound();
  const m = ctx.mercado;
  const t = textosPlanillas(m);
  const precio = precioIntl(p, m.locale);
  return (
    <div className="cy-pagina">
      <Migas
        etiqueta={ctx.textos.migas.etiqueta}
        items={[{ nombre: m.nombre, href: rutaIntl(m.codigo) }, { nombre: t.migaPlanillas, href: rutaIntl(m.codigo, "planillas") }, { nombre: p.tituloCorto }]}
      />
      <header className="cy-heroe cy-heroe-chico">
        <h1 className="cy-titular">{p.titulo}</h1>
        <p className="cy-bajada">{p.paraQuien}.</p>
      </header>
      <div className="cy-texto">
        {p.descripcion.map((d) => (
          <p key={d}>{d}</p>
        ))}
        <h2>{t.incluye}</h2>
        <ul>
          {t.incluyeLista(p).map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
      {ventaIntlActiva() ? (
        <p>
          <a className="cy-boton cy-boton-principal" href={`${rutaIntl(m.codigo, "planillas/comprar")}?p=${p.slug}`} rel="nofollow">
            <span>{t.comprar(precio)}</span>
            <span className="cy-boton-icono">
              <IconoFlecha />
            </span>
          </a>
        </p>
      ) : (
        <p className="cy-pildora">{t.pronto}</p>
      )}
      <p className="cy-vacio">{t.pagoUnico}</p>
    </div>
  );
}
