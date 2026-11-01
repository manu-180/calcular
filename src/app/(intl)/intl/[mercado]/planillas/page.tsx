import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productosDeMercado } from "@/lib/pagos/catalogo-intl";
import { rutaLandingIntl } from "@/lib/pagos/flujo-intl";
import { rutaIntl, urlIntl } from "@/motor/seo";
import type { CodigoMercado } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { IconoFlecha } from "@/motor/ui/Iconos";
import { Migas } from "@/motor/ui/Sitio";
import { registro } from "@/paises";
import { precioIntl, textosPlanillas } from "./_textos";

export const revalidate = 86400;

type Props = { params: Promise<{ mercado: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mercado } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  if (!ctx || ctx.mercado.codigo === "global") return {};
  const t = textosPlanillas(ctx.mercado);
  const hay = productosDeMercado(ctx.mercado.codigo).length > 0;
  return {
    title: `${t.catalogoTitulo} | CalcularYa`,
    description: t.catalogoBajada,
    alternates: { canonical: urlIntl(ctx.mercado.codigo, "planillas") },
    robots: hay && ctx.mercado.estado === "publicado" && ctx.modo === "produccion" ? undefined : { index: false, follow: true },
  };
}

export default async function CatalogoPlanillasIntl({ params }: Props) {
  const { mercado } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  if (!ctx || ctx.mercado.codigo === "global") notFound();
  const m = ctx.mercado;
  const t = textosPlanillas(m);
  const productos = productosDeMercado(m.codigo);
  return (
    <div className="cy-pagina">
      <Migas etiqueta={ctx.textos.migas.etiqueta} items={[{ nombre: m.nombre, href: rutaIntl(m.codigo) }, { nombre: t.migaPlanillas }]} />
      <header className="cy-heroe cy-heroe-chico">
        <h1 className="cy-titular">{t.catalogoTitulo}</h1>
        <p className="cy-bajada">{t.catalogoBajada}</p>
      </header>
      {productos.length ? (
        <>
          {[
            { titulo: t.seccionPlanillas, lista: productos.filter((p) => p.tipo === "planilla") },
            { titulo: t.seccionInformes, lista: productos.filter((p) => p.tipo === "informe") },
          ]
            .filter((g) => g.lista.length)
            .map((g) => (
              <section key={g.titulo} className="cy-relacionadas" aria-label={g.titulo}>
                <h2>{g.titulo}</h2>
                <ul className="cy-tarjetas">
                  {g.lista.map((p) => (
                    <li key={p.id}>
                      <a className="cy-tarjeta" href={rutaLandingIntl(p)}>
                        <span className="cy-tarjeta-titulo">{p.titulo}</span>
                        <span className="cy-tarjeta-texto">
                          {p.paraQuien}. {precioIntl(p, m.locale)}
                        </span>
                        <span className="cy-boton-icono">
                          <IconoFlecha />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
        </>
      ) : (
        <>
          <p className="cy-vacio">{t.catalogoVacio}</p>
          <p>
            <a className="cy-boton cy-boton-principal" href={rutaIntl(m.codigo)}>
              <span>{t.verCalculadoras}</span>
              <span className="cy-boton-icono">
                <IconoFlecha />
              </span>
            </a>
          </p>
        </>
      )}
    </div>
  );
}
