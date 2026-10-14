import type { CSSProperties } from "react";
import { formatearFecha } from "../formato";
import { frescuraDePais, type FrescuraPais } from "../frescura";
import { rutaIntl } from "../seo";
import type { FechaISO } from "../tipos";
import { hoyEn } from "../vigencia";
import { ArranquePais, type PaisArranque } from "./ArranquePais";
import { Bandera } from "./Bandera";
import { calculadorasDe, nombreEnPagina, porCategoria, tarjetaDe, type ContextoSitio } from "./contexto";
import { FechaViva } from "./FechaViva";
import { CLAVE_PAIS } from "./geo-cliente";
import { IconoFlecha } from "./Iconos";
import { ldInicioGlobal, ldInicioPais } from "./metadatos";
import { porGrupo } from "./menu";
import { AvisoDePais, JsonLd } from "./Sitio";
import { textosInicio } from "./textos-inicio";

// Un país de otro sitio en la grilla (Argentina vive en calcular.ar): mismo formato, link absoluto.
export interface PaisExterno {
  codigo: string;
  nombre: string;
  pais: string;
  locale: string;
  href: string;
  calculadoras: number;
}

const ANCLA_PAISES = "paises";

// Provisorio hasta que el diccionario del sitio tenga la etiqueta (pedido a i18n: pais.irASeccion).
const IR_A_SECCION: Readonly<Record<string, string>> = { es: "Ir a una sección", pt: "Ir para uma seção", en: "Jump to a section" };

const masNueva = (...fechas: (FechaISO | null | undefined)[]) => (fechas.filter(Boolean) as FechaISO[]).sort().at(-1);

// Vuelta directa al país elegido antes. Corre como <script> en línea antes de pintar la grilla, sin
// esperar a React: el que vuelve no ve el selector parpadear. Nunca mira la IP (D-017: Googlebot
// rastrea desde EE. UU. y no tiene localStorage, así que siempre ve la raíz). No salta si se llegó
// desde otra página del sitio (el link "Todos los países" tiene que mostrar los países) ni con
// ?paises en la URL.
function scriptVuelta(destinos: Readonly<Record<string, string>>): string {
  const mapa = JSON.stringify(destinos).replace(/</g, "\\u003c");
  return `(function(){try{var r=document.referrer;if(r&&new URL(r).origin===location.origin)return;if(/(^|&)paises(=|&|$)/.test(location.search.slice(1)))return;var c=localStorage.getItem(${JSON.stringify(CLAVE_PAIS)});var m=${mapa};if(c&&Object.prototype.hasOwnProperty.call(m,c))location.replace(m[c])}catch(e){}})()`;
}

export function InicioGlobal({ ctx, externos = [] }: { ctx: ContextoSitio; externos?: readonly PaisExterno[] }) {
  const t = ctx.textos;
  const ti = textosInicio(ctx.mercado.idioma, ctx.mercado.trato);
  const frescuras = new Map<string, FrescuraPais | null>(ctx.paises.map((m) => [m.codigo, frescuraDePais(ctx.registro, m.codigo, hoyEn(m))]));
  const tarjetas = [
    ...ctx.paises.map((m) => ({
      codigo: m.codigo,
      nombre: nombreEnPagina(ctx, m),
      pais: m.pais,
      locale: m.locale,
      href: rutaIntl(m.codigo),
      calculadoras: calculadorasDe(ctx, m).length,
    })),
    ...externos,
  ].sort((a, b) => a.nombre.localeCompare(b.nombre, ctx.mercado.locale));

  const fechaDe = (iso: FechaISO | undefined, locale: string) => (iso ? { iso, absoluta: formatearFecha(iso, locale) } : undefined);
  const arranque: PaisArranque[] = [
    ...ctx.paises.map((m) => {
      const tm = textosInicio(m.idioma, m.trato);
      const f = frescuras.get(m.codigo);
      const fecha = fechaDe(masNueva(f?.verificadoEl, f?.actualizadoEl), m.locale);
      return {
        codigo: m.codigo,
        pais: m.pais,
        nombre: m.nombre,
        href: rutaIntl(m.codigo),
        estas: tm.arranque.estasEn(m.nombre),
        resumen: tm.arranque.resumen(t.global.calculadoras(calculadorasDe(ctx, m).length)),
        ultimoDato: tm.arranque.ultimoDato,
        ir: tm.arranque.ir(m.nombre),
        otro: tm.arranque.otro,
        ...(fecha ? { fecha } : {}),
      };
    }),
    ...externos.map((e) => ({
      codigo: e.codigo,
      pais: e.pais,
      nombre: e.nombre,
      href: e.href,
      estas: textosInicio("es", "vos").arranque.estasEn(e.nombre),
      resumen: textosInicio("es", "vos").arranque.argentina,
      ultimoDato: "",
      ir: ti.arranque.argentinaIr,
      otro: textosInicio("es", "vos").arranque.otro,
    })),
  ];
  const ultimo = masNueva(...[...frescuras.values()].flatMap((f) => [f?.verificadoEl, f?.actualizadoEl]));
  const destinos = Object.fromEntries(tarjetas.map((m) => [m.codigo, m.href]));

  return (
    <div className="cy-pagina cy-inicio-global">
      <script dangerouslySetInnerHTML={{ __html: scriptVuelta(destinos) }} />
      <JsonLd datos={ldInicioGlobal(ctx)} />
      {/* El héroe es sticky en escritorio: va en su propio contenedor con la grilla para que no se
          monte sobre "Cómo trabajamos" al bajar (sticky se limita a su contenedor, no a su fila). */}
      <div className="cy-inicio">
        <header className="cy-heroe">
          <p className="cy-pildora">{t.global.eyebrow}</p>
          <h1 className="cy-display">{t.global.titulo}</h1>
          <p className="cy-bajada">{t.global.bajada}</p>
          {/* Sin AvisoDePais en esta página: el arranque ya le ofrece su país a la persona. */}
          {ctx.paises.length ? (
            <ArranquePais
              paises={arranque}
              neutro={{
                titulo: ti.arranque.neutroTitulo(tarjetas.length),
                texto: ti.arranque.neutroTexto,
                ultimoDato: ti.arranque.ultimoDato,
                ir: ti.arranque.neutroIr,
                banderas: tarjetas.slice(0, 3).map((m) => m.pais),
                ...(ultimo
                  ? {
                      fecha: {
                        iso: ultimo,
                        absoluta: formatearFecha(ultimo, ctx.mercado.locale),
                      },
                    }
                  : {}),
              }}
              hoy={ti.vivo.hoy}
              ayer={ti.vivo.ayer}
              ancla={`#${ANCLA_PAISES}`}
            />
          ) : null}
        </header>

        <section className="cy-paises" id={ANCLA_PAISES} aria-labelledby="cy-paises-titulo">
          <h2 id="cy-paises-titulo" className="cy-seccion-titulo">
            {t.global.elegir}
          </h2>
          {ctx.paises.length ? (
            <ul className="cy-paises-grilla">
              {tarjetas.map((m, i) => (
                <li key={m.codigo} style={{ "--i": i } as CSSProperties}>
                  <a className="cy-pais" href={m.href} hrefLang={m.locale} data-cy-pais={m.codigo}>
                    <span className="cy-pais-bandera">
                      <Bandera pais={m.pais} ancho={36} />
                    </span>
                    <span className="cy-pais-nombre">{m.nombre}</span>
                    <span className="cy-pais-cuenta">{t.global.calculadoras(m.calculadoras)}</span>
                    <span className="cy-boton-icono">
                      <IconoFlecha />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cy-vacio">{t.global.vacio}</p>
          )}
        </section>
      </div>

      <section className="cy-promesas" aria-labelledby="cy-promesas-titulo">
        <h2 id="cy-promesas-titulo" className="cy-seccion-titulo">
          {t.global.promesaTitulo}
        </h2>
        <ol>
          {t.global.promesas.map((p) => (
            <li key={p.titulo}>
              <p className="cy-promesa-titulo">{p.titulo}</p>
              <p>{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

// "Datos oficiales, actualizados solos" del inicio de cada país. Solo afirma lo que es cierto hoy:
// "automático" sale de una serie con detector y con un punto vigente (dentro de su maxAntiguedadDias),
// y el "hoy"/"ayer" lo decide el navegador (FechaViva), no el HTML cacheado.
function DatosVivos({ ctx, f }: { ctx: ContextoSitio; f: FrescuraPais }) {
  const m = ctx.mercado;
  const tv = textosInicio(m.idioma, m.trato).vivo;
  const automatica = [...f.series].filter((s) => s.automatica).sort((a, b) => b.fecha.localeCompare(a.fecha))[0];
  return (
    <section className="cy-vivo" aria-labelledby="cy-vivo-titulo">
      <div className="cy-vivo-nucleo">
        <h2 className="cy-vivo-titulo" id="cy-vivo-titulo">
          <span className="cy-punto-vivo" aria-hidden="true" />
          {tv.titulo}
        </h2>
        <p className="cy-vivo-texto">{f.vigilado ? tv.vigilado : tv.sinVigilar}</p>
        <dl className="cy-vivo-datos">
          {f.verificadoEl ? (
            <div>
              <dt>{tv.verificado}</dt>
              <dd>
                <time dateTime={f.verificadoEl}>{formatearFecha(f.verificadoEl, m.locale)}</time>
              </dd>
            </div>
          ) : null}
          {automatica ? (
            <div>
              <dt>{tv.automatico}</dt>
              <dd>
                {automatica.nombre},{" "}
                <FechaViva fecha={automatica.fecha} absoluta={tv.elDia(formatearFecha(automatica.fecha, m.locale))} hoy={tv.hoy} ayer={tv.ayer} />
              </dd>
            </div>
          ) : null}
          <div>
            <dt>{tv.fuentes}</dt>
            <dd>{tv.nFuentes(f.fuentes.length)}</dd>
          </div>
        </dl>
        <p className="cy-vivo-enlaces">
          <a className="cy-enlace-flecha" href={rutaIntl(m.codigo, "fuentes")}>
            {tv.verFuentes}
            <IconoFlecha />
          </a>
          <a className="cy-enlace-flecha" href={rutaIntl(m.codigo, "novedades")}>
            {tv.verNovedades}
            <IconoFlecha />
          </a>
        </p>
      </div>
    </section>
  );
}

export function InicioPais({ ctx }: { ctx: ContextoSitio }) {
  const t = ctx.textos;
  const m = ctx.mercado;
  const entradas = calculadorasDe(ctx, m);
  const grupos = porGrupo(ctx, porCategoria(entradas));
  const pais = ctx.registro.pais(m.codigo);
  const novedades = [...(pais?.novedades ?? [])].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 3);
  const frescura = frescuraDePais(ctx.registro, m.codigo, hoyEn(m));

  return (
    <div className="cy-pagina cy-inicio-pais">
      <JsonLd datos={ldInicioPais(ctx)} />
      <header className="cy-heroe cy-heroe-pais">
        <p className="cy-ceja">
          <Bandera pais={m.pais} ancho={22} />
          {m.nombre}
        </p>
        <h1 className="cy-display">{t.pais.titulo(m.nombre)}</h1>
        <p className="cy-bajada">{t.pais.bajada(m.nombre)}</p>
        {frescura && (frescura.verificadoEl || frescura.actualizadoEl) ? <DatosVivos ctx={ctx} f={frescura} /> : null}
      </header>

      <div className="cy-inicio-pais-cuerpo">
        <div className="cy-categorias">
          {grupos.length > 2 ? (
            <nav className="cy-grupos" aria-label={IR_A_SECCION[m.idioma] ?? IR_A_SECCION.es}>
              {grupos.map((g) => (
                <a key={g.key} href={`#cy-grupo-${g.key}`} className="cy-grupo-enlace">
                  {g.titulo}
                  <span className="cy-grupo-n">{g.total}</span>
                </a>
              ))}
            </nav>
          ) : null}
          {grupos.length ? (
            grupos.map((g) => (
              <section key={g.key} id={`cy-grupo-${g.key}`} className="cy-grupo" aria-labelledby={`cy-grupo-${g.key}-titulo`}>
                <h2 id={`cy-grupo-${g.key}-titulo`} className="cy-grupo-titulo">
                  {g.titulo}
                </h2>
                {g.categorias.map((c) => (
                  <div key={c.categoria} className="cy-grupo-categoria">
                    {g.categorias.length > 1 ? <h3 className="cy-seccion-titulo">{t.categorias[c.categoria]}</h3> : null}
                    <ul className="cy-tarjetas" data-compactas={g.key === "vida" || undefined}>
                      {c.entradas.map((e) => {
                        const tarjeta = tarjetaDe(ctx, m, e);
                        return (
                          <li key={e.definicion.id}>
                            <a className="cy-tarjeta" href={rutaIntl(m.codigo, e.definicion.slug)}>
                              <span className="cy-tarjeta-titulo">{tarjeta.titulo}</span>
                              {g.key === "vida" ? null : <span className="cy-tarjeta-texto">{tarjeta.resumen}</span>}
                              <span className="cy-boton-icono">
                                <IconoFlecha />
                              </span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </section>
            ))
          ) : (
            <p className="cy-vacio">{t.pais.sinCalculadoras}</p>
          )}
        </div>

        {novedades.length ? (
          <aside className="cy-novedades-lateral" aria-labelledby="cy-novedades-titulo">
            <h2 id="cy-novedades-titulo" className="cy-seccion-titulo">
              {t.pais.novedades}
            </h2>
            <ol className="cy-linea-tiempo">
              {novedades.map((n) => (
                <li key={n.id}>
                  <time dateTime={n.fecha}>{formatearFecha(n.fecha, m.locale)}</time>
                  <p className="cy-novedad-titulo">{n.titulo}</p>
                  <p>{n.texto}</p>
                </li>
              ))}
            </ol>
            <a className="cy-enlace-flecha" href={rutaIntl(m.codigo, "novedades")}>
              {t.pais.verNovedades}
              <IconoFlecha />
            </a>
          </aside>
        ) : null}
      </div>
      <AvisoDePais ctx={ctx} />
    </div>
  );
}
