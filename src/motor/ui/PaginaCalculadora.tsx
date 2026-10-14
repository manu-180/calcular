import type { ComponentType } from "react";
import { categoriaDe } from "../i18n";
import type { PaginaResuelta } from "../registro";
import { rutaIntl } from "../seo";
import type { PropsCalculadora } from "../tipos";
import { Bandera } from "./Bandera";
import { calculadorasDe, nombreEnPagina, tarjetaDe, type ContextoSitio } from "./contexto";

const MAX_OTROS_PAISES = 24;
import { ldCalculadora } from "./metadatos";
import { Sello } from "./Sello";
import { AvisoDePais, JsonLd } from "./Sitio";

// Misma columna y mismo orden que una página de calculadora de calcular.ar (src/app/(ar)/aguinaldo):
// título e intro, la calculadora, accesos a otras cuentas, el texto, las preguntas y las fuentes al
// final. La miga de pan visible no está porque calcular.ar no la tiene; sigue en el JSON-LD.
export function PaginaCalculadora({ ctx, pagina, Cliente }: { ctx: ContextoSitio; pagina: PaginaResuelta; Cliente: ComponentType<PropsCalculadora> }) {
  const { mercado, contenido, calculadora } = pagina;
  const t = ctx.textos;
  const otras = calculadorasDe(ctx, mercado).filter((e) => e.definicion.slug !== calculadora.slug);
  const categoria = categoriaDe(calculadora.concepto);
  const relacionadas = [...otras.filter((e) => categoriaDe(e.definicion.concepto) === categoria), ...otras.filter((e) => categoriaDe(e.definicion.concepto) !== categoria)].slice(0, 6);
  // Solo los del mismo idioma y con tope: una universal tiene equivalente en casi todos los países y
  // 190 links con bandera al pie de cada calculadora eran ruido (y peso). El resto del clúster sigue
  // en el hreflang y en el selector de país.
  const porCodigo = new Map(ctx.paises.map((p) => [p.codigo, p]));
  const enOtrosPaises = pagina.equivalentes
    .filter((e) => e.mercado !== mercado.codigo)
    .flatMap((e) => {
      const m = porCodigo.get(e.mercado);
      return m && m.idioma === mercado.idioma ? [{ ...e, m, nombre: nombreEnPagina(ctx, m) }] : [];
    })
    .slice(0, MAX_OTROS_PAISES);

  return (
    <article className="cy-pagina cy-pagina-calculadora">
      <JsonLd datos={ldCalculadora(ctx, pagina)} />
      <header className="cy-calc-encabezado">
        <h1>{contenido.h1}</h1>
        {contenido.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </header>

      <Cliente {...pagina.props} />

      {relacionadas.length ? (
        <nav className="cy-accesos" aria-label={t.calculadora.relacionadas}>
          {relacionadas.map((e) => {
            const tarjeta = tarjetaDe(ctx, mercado, e);
            return (
              <a key={e.definicion.id} className="cy-acceso" href={rutaIntl(mercado.codigo, e.definicion.slug)}>
                <span className="cy-acceso-titulo">
                  {tarjeta.titulo} <span aria-hidden="true">→</span>
                </span>
                <span className="cy-acceso-texto">{tarjeta.resumen}</span>
              </a>
            );
          })}
        </nav>
      ) : null}

      <section className="cy-seccion" aria-labelledby="cy-como">
        <h2 id="cy-como">{t.calculadora.comoSeCalcula}</h2>
        <ol className="cy-pasos">
          {contenido.comoSeCalcula.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      </section>

      {contenido.ejemplo?.length ? (
        <section className="cy-seccion" aria-labelledby="cy-ejemplo">
          <h2 id="cy-ejemplo">{t.calculadora.ejemplo}</h2>
          <div className="cy-seccion-texto">
            {contenido.ejemplo.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      ) : null}

      {contenido.faq.length ? (
        <section className="cy-seccion cy-preguntas" aria-labelledby="cy-faq">
          <h2 id="cy-faq">{t.calculadora.faq}</h2>
          <div className="cy-preguntas-lista">
            {contenido.faq.map((f) => (
              <details key={f.pregunta} className="ca-acordeon">
                <summary>{f.pregunta}</summary>
                <p>{f.respuesta}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {contenido.glosario.length ? (
        <section className="cy-seccion" aria-labelledby="cy-glosario">
          <h2 id="cy-glosario">{t.calculadora.glosario}</h2>
          <dl className="cy-glosario">
            {contenido.glosario.map((g) => (
              <div key={g.termino}>
                <dt>{g.termino}</dt>
                <dd>{g.definicion}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {enOtrosPaises.length ? (
        <section className="cy-seccion cy-otros-paises" aria-labelledby="cy-otros-paises">
          <h2 id="cy-otros-paises">{t.calculadora.otrosPaises}</h2>
          <ul>
            {enOtrosPaises.map((e) => (
              <li key={e.mercado}>
                <a href={rutaIntl(e.mercado, e.slug)} hrefLang={e.locale}>
                  <Bandera pais={e.m.pais} ancho={18} />
                  {e.nombre}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <Sello sello={pagina.sello} usados={pagina.usados} locale={mercado.locale} textos={t} hrefFuentes={rutaIntl(mercado.codigo, "fuentes")} />
      <AvisoDePais ctx={ctx} concepto={calculadora.concepto} />
    </article>
  );
}
