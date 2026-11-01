import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { ventaIntlActiva } from "@/lib/pagos";
import { catalogoIntl, productoIntlDe } from "@/lib/pagos/catalogo-intl";
import { rutaComprarIntl } from "@/lib/pagos/flujo-intl";
import { familiaPorClave, leyendaDeCobro, precioUSD } from "@/lib/pagos/ofertas-intl";
import { textosFamilia, textosTarjeta } from "@/lib/pagos/textos";
import { calculadorasDeProducto, referenciaLocalDe } from "@/lib/pagos/ofertas-servidor";
import { ejecutar, valoresIniciales } from "@/motor/formulario";
import { rutaIntl, urlIntl } from "@/motor/seo";
import { intlActivo, modoPublicacion } from "@/motor/sitio";
import { textosMotor } from "@/motor/textos";
import type { CodigoMercado } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { IconoFlecha } from "@/motor/ui/Iconos";
import { AvisoPronto, MuestraInforme } from "@/motor/ui/Oferta";
import { Migas } from "@/motor/ui/Sitio";
import { registro } from "@/paises";
import { SeccionesProducto } from "../../planillas/_secciones";
import { textosPlanillas } from "../../planillas/_textos";
import "@/motor/ui/estilos-oferta.css";

export const revalidate = 86400;

type Props = { params: Promise<{ mercado: string; informe: string }> };

export function generateStaticParams({ params }: { params: { mercado: string } }) {
  if (!intlActivo()) return [];
  if (!registro.mercados(modoPublicacion()).some((m) => m.codigo === params.mercado)) return [];
  return catalogoIntl()
    .filter((p) => p.mercado === params.mercado && p.tipo === "informe")
    .map((p) => ({ informe: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mercado, informe } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  const p = ctx ? productoIntlDe(ctx.mercado.codigo, informe) : null;
  if (!ctx || !p || p.tipo !== "informe") return {};
  const tx = textosTarjeta(ctx.mercado.idioma, ctx.mercado.trato, ctx.mercado.locale);
  return {
    title: `${p.titulo} | CalcularYa`,
    description: `${p.paraQuien}. ${precioUSD(p.precioCentavos, ctx.mercado.locale)}, ${tx.pagoUnico}.`,
    alternates: { canonical: urlIntl(ctx.mercado.codigo, `informes/${p.slug}`) },
    robots: ctx.mercado.estado === "publicado" && ctx.modo === "produccion" ? undefined : { index: false, follow: true },
  };
}

const TILDE = (
  <span className="cy-oferta-tilde" aria-hidden="true">
    <svg viewBox="0 0 20 20" width="12" height="12" fill="currentColor">
      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
    </svg>
  </span>
);

export default async function LandingInformeIntl({ params }: Props) {
  const { mercado, informe } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  const p = ctx ? productoIntlDe(ctx.mercado.codigo, informe) : null;
  const familia = p?.familia ? familiaPorClave(p.familia) : null;
  if (!ctx || !p || p.tipo !== "informe" || !familia) notFound();
  const m = ctx.mercado;
  const tx = textosPlanillas(m);
  const tarjeta = textosTarjeta(m.idioma, m.trato, m.locale);
  const tf = textosFamilia(familia.clave, m.idioma, m.trato, m.locale);

  // La muestra es real: la primera calculadora del informe con sus valores por defecto y los datos
  // oficiales de hoy, por la misma función que arma el informe pagado.
  const slug = calculadorasDeProducto(p)[0];
  const pagina = slug ? registro.pagina(m.codigo, slug, ctx.fecha, ctx.modo) : null;
  const def = slug ? registro.calculadora(m.codigo, slug)?.definicion : undefined;
  const calculo =
    pagina && def ? ejecutar(def, valoresIniciales(def.campos, pagina.props.contexto, pagina.props.opcionesDinamicas), pagina.props, textosMotor(m.idioma, m.trato)) : null;
  // Sin valores por defecto que calculen, la muestra lleva las filas del resultado sin montos.
  const filasMuestra =
    calculo?.tipo === "ok"
      ? calculo.filas
      : (def?.resultado ?? [])
          .filter((f) => f.formato !== "texto" && f.formato !== "fecha")
          .map((f) => ({ clave: f.clave, etiqueta: f.etiqueta, texto: "···", destacada: f.destacada === true }));

  return (
    <div className="cy-pagina">
      <Migas
        etiqueta={ctx.textos.migas.etiqueta}
        items={[{ nombre: m.nombre, href: rutaIntl(m.codigo) }, { nombre: tx.migaPlanillas, href: rutaIntl(m.codigo, "planillas") }, { nombre: p.tituloCorto }]}
      />
      <div className="cy-producto">
        <div>
          <header className="cy-heroe cy-heroe-chico">
            <p className="cy-oferta-ceja">
              <span className="cy-oferta-ceja-punto" />
              {tarjeta.cejaInforme}
            </p>
            <h1 className="cy-titular">{p.titulo}</h1>
            <p className="cy-bajada">{p.paraQuien}.</p>
          </header>
          <div className="cy-texto">
            {p.descripcion.map((d) => (
              <p key={d}>{d}</p>
            ))}
            {tf.aviso ? <p className="cy-vacio">{tf.aviso}</p> : null}
            {filasMuestra.length ? (
              <>
                <h2>{tx.muestra}</h2>
                <div className="cy-producto-muestra" aria-hidden="true">
                  <MuestraInforme titulo={tf.nombre} filas={filasMuestra} />
                </div>
              </>
            ) : null}
            <SeccionesProducto ctx={ctx} producto={p} textos={{ calculadoras: tx.calculadoras, fuentes: tx.fuentes }} />
          </div>
        </div>
        <aside className="cy-producto-compra">
          <div className="cy-oferta-placa" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
            <div className="cy-oferta-cuerpo">
              <h2 className="cy-oferta-titulo">{tx.incluye}</h2>
              <ul className="cy-oferta-incluye">
                {tf.incluye.map((x, i) => (
                  <li key={x.titulo} style={{ "--i": i } as CSSProperties}>
                    {TILDE}
                    <span>
                      <strong>{x.titulo}</strong> {x.texto}
                    </span>
                  </li>
                ))}
                {tx.incluyeLista(p).slice(0, 2).map((x, i) => (
                  <li key={x} style={{ "--i": i + tf.incluye.length } as CSSProperties}>
                    {TILDE}
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <div className="cy-oferta-pie">
                <p className="cy-oferta-precio">
                  <strong>{precioUSD(p.precioCentavos, m.locale)}</strong>
                  <span>{tarjeta.pagoUnico}</span>
                </p>
                <p className="cy-oferta-cambio">{leyendaDeCobro(p.precioCentavos, referenciaLocalDe(m.codigo), tarjeta)}</p>
                {ventaIntlActiva() ? (
                  <>
                    <a
                      className="cy-boton cy-boton-principal cy-oferta-cta"
                      href={`${rutaComprarIntl(p)}?p=${p.slug}`}
                      rel="nofollow"
                      data-evento="cta_compra"
                      data-producto={p.id}
                      data-ubicacion="landing"
                    >
                      <span>{tarjeta.comprarInforme}</span>
                      <span className="cy-boton-icono">
                        <IconoFlecha />
                      </span>
                    </a>
                    <p className="cy-oferta-confianza">{tarjeta.confianza}</p>
                  </>
                ) : (
                  <AvisoPronto producto={p.id} textos={tarjeta.aviso} />
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
