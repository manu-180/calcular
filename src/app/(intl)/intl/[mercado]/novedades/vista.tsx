import type { ReactNode } from "react";
import { frescuraDePais } from "@/motor/frescura";
import type { EntradaFeed } from "@/motor/novedades";
import { ultimaEntrada } from "@/motor/novedades";
import { rutaIntl } from "@/motor/seo";
import type { Fuente } from "@/motor/tipos";
import { Bandera } from "@/motor/ui/Bandera";
import type { ContextoSitio } from "@/motor/ui/contexto";
import { FechaViva } from "@/motor/ui/FechaViva";
import { IconoExterno } from "@/motor/ui/Iconos";
import { ldPaginaDeMercado } from "@/motor/ui/metadatos";
import { AvisoDePais, JsonLd, Migas } from "@/motor/ui/Sitio";
import { textosInicio } from "@/motor/ui/textos-inicio";
import { fecha, registroNovedades, textoDe, valorTexto, type CalculadoraEnlazada, type RegistroNovedades } from "./entradas";

const trazo = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: false } as const;

function IconoRss() {
  return (
    <svg {...trazo} viewBox="0 0 24 24" width="14" height="14">
      <path d="M5 5a14 14 0 0 1 14 14M5 11a8 8 0 0 1 8 8" />
      <circle cx="6" cy="18" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EnlaceFuente({ f }: { f: Fuente }) {
  return f.url.startsWith("https://") ? (
    <a className="cy-nov-fuente" href={f.url} rel="noopener" target="_blank">
      {f.organismo}
      <IconoExterno />
    </a>
  ) : (
    <span>{f.organismo}</span>
  );
}

function Calculadoras({ lista, etiqueta }: { lista: readonly CalculadoraEnlazada[]; etiqueta: string }) {
  if (!lista.length) return null;
  return (
    <p className="cy-nov-calcs">
      <span>{etiqueta}</span>
      {lista.slice(0, 4).map((c) => (
        <a key={c.id} href={c.href}>
          {c.titulo}
        </a>
      ))}
    </p>
  );
}

function Entrada({ e, r }: { e: EntradaFeed; r: RegistroNovedades }) {
  const { ctx, tn } = r;
  const tv = textosInicio(ctx.mercado.idioma, ctx.mercado.trato, ctx.mercado.locale).vivo;
  const { titulo } = textoDe(e, r);
  const etiqueta = e.tipo === "dato" && e.proximo ? "proximo" : e.tipo;
  let cuerpo: ReactNode;
  switch (e.tipo) {
    case "editorial":
      cuerpo = (
        <>
          <h3 className="cy-nov-entrada-titulo">{e.titulo}</h3>
          <p className="cy-nov-texto">{e.texto}</p>
          <p className="cy-nov-meta">
            {e.vigenteDesde ? <span>{tn.rige(fecha(e.vigenteDesde, ctx))}</span> : null}
            <EnlaceFuente f={e.fuente} />
          </p>
        </>
      );
      break;
    case "dato":
      cuerpo = (
        <>
          <h3 className="cy-nov-entrada-titulo">
            {e.nombre}
            <span className="cy-nov-valor">{valorTexto(e.valor, tn)}</span>
          </h3>
          <p className="cy-nov-meta">
            <span>{e.hasta ? tn.rigeDesdeHasta(fecha(e.desde, ctx), fecha(e.hasta, ctx)) : tn.rige(fecha(e.desde, ctx))}</span>
            <EnlaceFuente f={e.fuente} />
          </p>
        </>
      );
      break;
    case "serie":
      cuerpo = (
        <>
          <h3 className="cy-nov-entrada-titulo">
            {e.nombre}
            <span className="cy-nov-valor">{valorTexto(e.valor, tn)}</span>
          </h3>
          <p className="cy-nov-meta">
            {e.anterior ? <span>{tn.antes(valorTexto(e.anterior.valor, tn), fecha(e.anterior.fecha, ctx))}</span> : null}
            <EnlaceFuente f={e.fuente} />
          </p>
        </>
      );
      break;
    case "revision":
      cuerpo = (
        <>
          <h3 className="cy-nov-entrada-titulo">{titulo}</h3>
          <p className="cy-nov-texto">{textoDe(e, r).resumen}</p>
          <details className="cy-nov-detalle">
            <summary>
              {tn.verDatos(e.datos.length)}
              <svg {...trazo} viewBox="0 0 24 24" width="14" height="14">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <ul>
              {e.datos.map((d) => (
                <li key={d.id}>
                  <span>{d.nombre}</span>
                  <strong>{valorTexto(d.valor, tn)}</strong>
                  <span>
                    {tn.rige(fecha(d.desde, ctx))} · {d.fuente.organismo}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        </>
      );
      break;
  }
  return (
    <li className="cy-nov-entrada" id={e.id}>
      <p className="cy-nov-cuando">
        <FechaViva fecha={e.fecha} absoluta={fecha(e.fecha, ctx)} hoy={tv.hoy} ayer={tv.ayer} />
      </p>
      <div className="cy-nov-cuerpo">
        <span className="cy-nov-etiqueta" data-tipo={etiqueta}>
          {e.tipo === "serie" ? <span className="cy-punto-vivo" aria-hidden="true" /> : null}
          {tn.etiqueta[etiqueta]}
        </span>
        {cuerpo}
        <Calculadoras lista={r.calculadorasDe(e)} etiqueta={tn.calculadoras} />
      </div>
    </li>
  );
}

// Registro de cambios del país, a la altura del /novedades de calcular.ar: las notas del país más todo
// lo que se movió solo en sus datos (tramos nuevos, últimos puntos de las series, revisiones).
export function NovedadesVivas({ ctx }: { ctx: ContextoSitio }) {
  const m = ctx.mercado;
  const t = ctx.textos;
  const r = registroNovedades(ctx);
  const { tn } = r;
  const tv = textosInicio(m.idioma, m.trato, m.locale).vivo;
  const frescura = frescuraDePais(ctx.registro, m.codigo, ctx.fecha);
  const ultimo = ultimaEntrada(r.registro);
  const organismos = [...new Set((frescura?.fuentes ?? []).map((f) => f.organismo))];
  const visibles = organismos.slice(0, 3);
  const titulo = tn.titulo(m.nombre);

  return (
    <div className="cy-pagina cy-novedades-vivas">
      <JsonLd datos={ldPaginaDeMercado(ctx, { tipo: "novedades" })} />
      <Migas etiqueta={t.migas.etiqueta} items={[{ nombre: m.nombre, href: rutaIntl(m.codigo) }, { nombre: t.novedades.titulo(m.nombre) }]} />
      <header className="cy-nov-heroe">
        <p className="cy-nov-pildora">
          <span className="cy-punto-vivo" aria-hidden="true" />
          <Bandera pais={m.pais} ancho={16} />
          {tn.pildora}
        </p>
        <h1 className="cy-nov-titulo">
          {titulo}, <em>{tn.acento}</em>
        </h1>
        <p className="cy-nov-bajada">{tn.bajada}</p>
        <dl className="cy-nov-cifras">
          <div>
            <dt>{tn.ultimoCambio}</dt>
            <dd>{ultimo ? <FechaViva fecha={ultimo} absoluta={fecha(ultimo, ctx)} hoy={tv.hoy} ayer={tv.ayer} /> : "-"}</dd>
          </div>
          <div>
            <dt>{tn.revision}</dt>
            <dd>{frescura?.vigilado ? tn.diaria : tn.porNorma}</dd>
          </div>
          {visibles.length ? (
            <div>
              <dt>{tn.siguiendo}</dt>
              <dd>
                {visibles.join(", ")}
                {organismos.length > visibles.length ? ` ${tn.masOrganismos(organismos.length - visibles.length)}` : ""}
              </dd>
            </div>
          ) : null}
        </dl>
      </header>

      <section className="cy-nov-seccion" aria-labelledby="cy-nov-pasos">
        <h2 id="cy-nov-pasos" className="cy-nov-h2">
          {tn.pasosTitulo}
        </h2>
        <ol className="cy-nov-pasos">
          {tn.pasos.map((p) => (
            <li key={p.titulo}>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {r.proximos.length ? (
        <section className="cy-nov-seccion" aria-labelledby="cy-nov-proximos">
          <div className="cy-nov-seccion-cabeza">
            <div>
              <h2 id="cy-nov-proximos" className="cy-nov-h2">
                {tn.proximos}
              </h2>
              <p className="cy-nov-h2-texto">{tn.proximosTexto}</p>
            </div>
          </div>
          <ul className="cy-nov-proximos">
            {r.proximos.map((e) => (
              <li key={e.id} id={e.id} className="cy-nov-proximo">
                <time className="cy-nov-proximo-fecha" dateTime={e.desde}>
                  {tn.rige(fecha(e.desde, ctx))}
                </time>
                <p className="cy-nov-entrada-titulo">
                  {e.nombre}
                  <span className="cy-nov-valor">{valorTexto(e.valor, tn)}</span>
                </p>
                <p className="cy-nov-meta">
                  <EnlaceFuente f={e.fuente} />
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="cy-nov-seccion" aria-labelledby="cy-nov-registro">
        <div className="cy-nov-seccion-cabeza">
          <h2 id="cy-nov-registro" className="cy-nov-h2">
            {tn.registro}
          </h2>
          <a className="cy-nov-rss" href={rutaIntl(m.codigo, "novedades.xml")} type="application/atom+xml">
            <IconoRss />
            {tn.rss}
          </a>
        </div>
        {r.registro.length ? (
          <ol className="cy-nov-registro">
            {r.registro.map((e) => (
              <Entrada key={e.id} e={e} r={r} />
            ))}
          </ol>
        ) : (
          <p className="cy-vacio">{tn.vacio}</p>
        )}
      </section>
      <AvisoDePais ctx={ctx} />
    </div>
  );
}
