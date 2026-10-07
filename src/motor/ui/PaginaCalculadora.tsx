import type { ComponentType } from "react";
import { categoriaDe } from "../i18n";
import type { PaginaResuelta } from "../registro";
import { ldFaq, ldMigas, ldWebApplication, rutaIntl, urlIntl } from "../seo";
import type { PropsCalculadora } from "../tipos";
import { Bandera } from "./Bandera";
import { calculadorasDe, tarjetaDe, type ContextoSitio } from "./contexto";
import { IconoFlecha } from "./Iconos";
import { Sello } from "./Sello";
import { AvisoDePais, JsonLd, Migas } from "./Sitio";

export function PaginaCalculadora({ ctx, pagina, Cliente }: { ctx: ContextoSitio; pagina: PaginaResuelta; Cliente: ComponentType<PropsCalculadora> }) {
  const { mercado, contenido, calculadora } = pagina;
  const t = ctx.textos;
  const url = urlIntl(mercado.codigo, calculadora.slug);
  const otras = calculadorasDe(ctx, mercado).filter((e) => e.definicion.slug !== calculadora.slug);
  const categoria = categoriaDe(calculadora.concepto);
  const relacionadas = [...otras.filter((e) => categoriaDe(e.definicion.concepto) === categoria), ...otras.filter((e) => categoriaDe(e.definicion.concepto) !== categoria)].slice(0, 6);
  const enOtrosPaises = pagina.equivalentes
    .filter((e) => e.mercado !== mercado.codigo)
    .map((e) => ({ ...e, m: ctx.paises.find((p) => p.codigo === e.mercado) }))
    .filter((e) => e.m);
  const faq = ldFaq(contenido.faq);
  const ld = [
    ldWebApplication({ nombre: contenido.h1, descripcion: contenido.description, url, mercado }),
    ldMigas([
      { nombre: mercado.nombre, url: urlIntl(mercado.codigo) },
      { nombre: contenido.h1, url },
    ]),
    ...(faq ? [faq] : []),
  ];

  return (
    <article className="cy-pagina cy-pagina-calculadora">
      <JsonLd datos={ld} />
      <Migas etiqueta={t.migas.etiqueta} items={[{ nombre: mercado.nombre, href: rutaIntl(mercado.codigo) }, { nombre: contenido.h1 }]} />
      <div className="cy-calc-grilla">
        <div className="cy-calc-lateral">
          <header className="cy-heroe-texto">
            <p className="cy-ceja">
              <Bandera pais={mercado.pais} ancho={18} />
              {mercado.nombre}
            </p>
            <h1 className="cy-titular">{contenido.h1}</h1>
            <div className="cy-intro">
              {contenido.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </header>
          <Sello sello={pagina.sello} usados={pagina.usados} locale={mercado.locale} textos={t} hrefFuentes={rutaIntl(mercado.codigo, "fuentes")} />
        </div>
        <div className="cy-heroe-herramienta">
          <Cliente {...pagina.props} />
        </div>
        <div className="cy-texto">
          <section aria-labelledby="cy-como">
            <h2 id="cy-como">{t.calculadora.comoSeCalcula}</h2>
            <ol className="cy-pasos">
              {contenido.comoSeCalcula.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </section>
          {contenido.ejemplo?.length ? (
            <section aria-labelledby="cy-ejemplo">
              <h2 id="cy-ejemplo">{t.calculadora.ejemplo}</h2>
              <div className="cy-ejemplo">
                {contenido.ejemplo.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ) : null}
          {contenido.faq.length ? (
            <section aria-labelledby="cy-faq">
              <h2 id="cy-faq">{t.calculadora.faq}</h2>
              <div className="cy-faq">
                {contenido.faq.map((f) => (
                  <details key={f.pregunta}>
                    <summary>{f.pregunta}</summary>
                    <p>{f.respuesta}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}
          {contenido.glosario.length ? (
            <section aria-labelledby="cy-glosario">
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
        </div>
      </div>

      {relacionadas.length ? (
        <section className="cy-relacionadas" aria-labelledby="cy-relacionadas">
          <h2 id="cy-relacionadas">{t.calculadora.relacionadas}</h2>
          <ul className="cy-tarjetas">
            {relacionadas.map((e) => (
              <li key={e.definicion.id}>
                <a className="cy-tarjeta" href={rutaIntl(mercado.codigo, e.definicion.slug)}>
                  <span className="cy-tarjeta-titulo">{tarjetaDe(ctx, mercado, e).titulo}</span>
                  <span className="cy-tarjeta-texto">{tarjetaDe(ctx, mercado, e).resumen}</span>
                  <span className="cy-boton-icono">
                    <IconoFlecha />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {enOtrosPaises.length ? (
        <section className="cy-otros-paises" aria-labelledby="cy-otros-paises">
          <h2 id="cy-otros-paises">{t.calculadora.otrosPaises}</h2>
          <ul>
            {enOtrosPaises.map((e) => (
              <li key={e.mercado}>
                <a href={rutaIntl(e.mercado, e.slug)} hrefLang={e.locale}>
                  <Bandera pais={e.m!.pais} ancho={18} />
                  {e.m!.nombre}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <AvisoDePais ctx={ctx} concepto={calculadora.concepto} />
    </article>
  );
}
