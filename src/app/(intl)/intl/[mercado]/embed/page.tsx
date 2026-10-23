import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MARCA_NOMBRE } from "@/motor/embed/codigo";
import { Generador, type OpcionCalculadora } from "@/motor/embed/Generador";
import { textosEmbed } from "@/motor/i18n/embed";
import { elegirTitulo, grafo, ldMigas, ldPagina, metadataDe, origenPublicoIntl, rutaIntl, urlImagenOg, urlIntl } from "@/motor/seo";
import { intlActivo } from "@/motor/sitio";
import type { CodigoMercado } from "@/motor/tipos";
import { calculadorasDe, contextoSitio, tarjetaDe } from "@/motor/ui/contexto";
import { JsonLd } from "@/motor/ui/Sitio";
import { registro } from "@/paises";
import "@/motor/embed/estilos-generador.css";

export const revalidate = 3600;

type Props = { params: Promise<{ mercado: string }> };

function contexto(mercado: string) {
  if (!intlActivo()) return null;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  return ctx && ctx.mercado.codigo !== "global" ? ctx : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mercado } = await params;
  const ctx = contexto(mercado);
  if (!ctx) return {};
  const m = ctx.mercado;
  const t = textosEmbed(m.idioma, m.trato, m.locale).pagina;
  return metadataDe({ mercado: m, slug: "embed", title: elegirTitulo(t.titulo(m.nombre)), description: t.descripcion(m.nombre), imagen: urlImagenOg(m.codigo) });
}

export default async function EmbedGenerador({ params }: Props) {
  const { mercado } = await params;
  const ctx = contexto(mercado);
  if (!ctx) notFound();
  const m = ctx.mercado;
  const texto = textosEmbed(m.idioma, m.trato, m.locale);
  const t = texto.pagina;
  const entradas = calculadorasDe(ctx, m);
  if (!entradas.length) notFound();
  const calculadoras: OpcionCalculadora[] = entradas.map((e) => ({ slug: e.definicion.slug, titulo: tarjetaDe(ctx, m, e).titulo }));
  // Arranca en el sueldo neto si el país lo tiene: es la que más se pone en blogs de contadores y de RRHH.
  const inicial = (entradas.find((e) => e.definicion.concepto === "sueldo-neto") ?? entradas[0]).definicion.slug;
  const url = urlIntl(m.codigo, "embed");
  const titulo = elegirTitulo(t.titulo(m.nombre));

  return (
    <article className="cy-pagina cye-pagina">
      <JsonLd
        datos={grafo([
          ldPagina({ url, nombre: titulo, descripcion: t.descripcion(m.nombre), locale: m.locale }),
          ldMigas([
            { nombre: m.nombre, url: urlIntl(m.codigo) },
            { nombre: t.h1, url },
          ]),
        ])}
      />
      <header className="cye-cabecera">
        <h1 className="cy-titular">{t.h1}</h1>
        <p className="cy-bajada">{t.bajada}</p>
        <ul className="cye-ventajas">
          {t.ventajas.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </header>
      <Generador
        mercado={m.codigo}
        origen={origenPublicoIntl()}
        calculadoras={calculadoras}
        inicial={inicial}
        hrefPais={rutaIntl(m.codigo)}
        t={{
          calculadora: t.calculadora,
          buscar: t.buscar,
          sinResultados: t.sinResultados,
          tema: t.tema,
          claro: t.claro,
          oscuro: t.oscuro,
          ancho: t.ancho,
          anchoCompleto: t.anchoCompleto,
          acento: t.acento,
          colores: t.colores,
          credito: t.credito,
          vistaPrevia: t.vistaPrevia,
          codigo: t.codigo,
          copiar: t.copiar,
          copiado: t.copiado,
          ayudaScript: t.ayudaScript,
          nota: t.nota,
          verTodas: t.verTodas(m.nombre),
          marca: texto.marca,
          tituloIframe: t.tituloIframe(MARCA_NOMBRE),
        }}
      />
    </article>
  );
}
