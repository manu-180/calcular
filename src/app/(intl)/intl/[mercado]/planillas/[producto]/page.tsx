import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ventaIntlActiva } from "@/lib/pagos";
import { catalogoIntl, productoIntlDe } from "@/lib/pagos/catalogo-intl";
import { leyendaDeCobro } from "@/lib/pagos/ofertas-intl";
import { referenciaLocalDe } from "@/lib/pagos/ofertas-servidor";
import { rutaIntl, urlIntl } from "@/motor/seo";
import { intlActivo, modoPublicacion } from "@/motor/sitio";
import type { CodigoMercado } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { IconoFlecha } from "@/motor/ui/Iconos";
import { JsonLd, Migas } from "@/motor/ui/Sitio";
import { registro } from "@/paises";
import { AvisoPronto } from "@/motor/ui/Oferta";
import { muestraDePlanilla } from "../_muestra";
import { SeccionesProducto } from "../_secciones";
import { precioIntl, textosPlanillas } from "../_textos";
import { VistaPlanilla } from "../_vista";
import "@/motor/ui/estilos-oferta.css";

export const revalidate = 3600;

type Props = { params: Promise<{ mercado: string; producto: string }> };

export function generateStaticParams({ params }: { params: { mercado: string } }) {
  if (!intlActivo()) return [];
  if (!registro.mercados(modoPublicacion()).some((m) => m.codigo === params.mercado)) return [];
  return catalogoIntl()
    .filter((p) => p.mercado === params.mercado && p.tipo === "planilla")
    .map((p) => ({ producto: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mercado, producto } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  const p = ctx ? productoIntlDe(ctx.mercado.codigo, producto) : null;
  if (!ctx || !p || p.tipo !== "planilla") return {};
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
  if (!ctx || !p || p.tipo !== "planilla") notFound();
  const m = ctx.mercado;
  const t = textosPlanillas(m);
  const precio = precioIntl(p, m.locale);
  const referencia = referenciaLocalDe(m.codigo);
  const cobro = leyendaDeCobro(p.precioCentavos, referencia);
  const muestra = muestraDePlanilla(ctx, p);
  const faq = t.faq(p, referencia !== null);
  const ventaActiva = ventaIntlActiva();
  const botonCompra = ventaActiva ? (
    <div className="cy-producto-cta">
      <p>
        <a className="cy-boton cy-boton-principal" href={`${rutaIntl(m.codigo, "planillas/comprar")}?p=${p.slug}`} rel="nofollow">
          <span>{t.comprar(precio)}</span>
          <span className="cy-boton-icono">
            <IconoFlecha />
          </span>
        </a>
      </p>
      <p className="cy-oferta-cambio">{cobro}</p>
    </div>
  ) : null;
  return (
    <div className="cy-pagina">
      <JsonLd
        datos={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({ "@type": "Question", name: f.pregunta, acceptedAnswer: { "@type": "Answer", text: f.respuesta } })),
        }}
      />
      <Migas
        etiqueta={ctx.textos.migas.etiqueta}
        items={[{ nombre: m.nombre, href: rutaIntl(m.codigo) }, { nombre: t.migaPlanillas, href: rutaIntl(m.codigo, "planillas") }, { nombre: p.tituloCorto }]}
      />
      <header className="cy-heroe cy-heroe-chico">
        <h1 className="cy-titular">{p.titulo}</h1>
        <p className="cy-bajada">{p.paraQuien}.</p>
        {botonCompra}
      </header>
      <div className="cy-texto">
        {p.descripcion.map((d) => (
          <p key={d}>{d}</p>
        ))}
        {muestra ? (
          <>
            <h2>{t.muestra}</h2>
            <p>{t.muestraIntro(muestra.hoja)}</p>
            <VistaPlanilla muestra={muestra} leyenda={t.muestraLeyenda} />
            <div className="cy-vista-comprobar">
              <p>{t.comprobar}</p>
              <p>
                <a href={rutaIntl(m.codigo, muestra.calculo)}>{t.comprobarEnlace}</a>
              </p>
            </div>
          </>
        ) : null}
        <h2>{t.incluye}</h2>
        <ul>
          {t.incluyeLista(p).map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <SeccionesProducto ctx={ctx} producto={p} textos={{ calculadoras: t.calculadoras, fuentes: t.fuentes }} />
      </div>
      <section className="cy-seccion cy-preguntas cy-producto-faq" aria-labelledby="cy-faq">
        <h2 id="cy-faq">{t.faqTitulo}</h2>
        <div className="cy-preguntas-lista">
          {faq.map((f) => (
            <details key={f.pregunta} className="ca-acordeon">
              <summary>{f.pregunta}</summary>
              <p>{f.respuesta}</p>
            </details>
          ))}
        </div>
      </section>
      {botonCompra ?? (
        <div style={{ maxWidth: "30rem" }}>
          <AvisoPronto producto={p.id} trato={m.trato} />
        </div>
      )}
      <p className="cy-vacio">{t.pagoUnico}</p>
    </div>
  );
}
