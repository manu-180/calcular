import type { CSSProperties } from "react";
import { grafo, ldPagina, rutaIntl, urlIntl } from "../../seo";
import { Bandera } from "../../ui/Bandera";
import type { ContextoSitio } from "../../ui/contexto";
import { IconoExterno, IconoFlecha } from "../../ui/Iconos";
import { AvisoDePais, JsonLd, Migas } from "../../ui/Sitio";
import { TIPOS_EVENTO } from "../eventos";
import { Copiar, Cuenta, CuentaGrande, Filtro, type TextosCuenta } from "./Cliente";
import { descripcionSeo, type EventoVista, type VistaCalendario } from "./presentar";
import "./estilos-calendario.css";

const trazo = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: false } as const;

function IconoCalendario() {
  return (
    <svg {...trazo} viewBox="0 0 24 24" width="16" height="16">
      <rect x="4" y="5.5" width="16" height="14" rx="3" />
      <path d="M8 3.5v4M16 3.5v4M4 10h16M12 13v4M10 15h4" />
    </svg>
  );
}

function Agregar({ e, v }: { e: EventoVista; v: VistaCalendario }) {
  return (
    <details className="cy-cal-agregar">
      <summary className="cy-cal-boton cy-cal-boton-claro">
        <IconoCalendario />
        {v.t.agregar}
      </summary>
      <div className="cy-cal-agregar-menu">
        <a href={e.google} rel="noopener nofollow" target="_blank">
          {v.t.google}
          <IconoExterno />
        </a>
        <a href={e.ics} download rel="nofollow">
          {v.t.descargar}
        </a>
      </div>
    </details>
  );
}

function Evento({ e, v, cuenta }: { e: EventoVista; v: VistaCalendario; cuenta: TextosCuenta }) {
  return (
    <li className="cy-cal-evento" id={e.id} data-tipo={e.tipo}>
      <time className="cy-cal-fecha" dateTime={e.fecha}>
        <span className="cy-cal-fecha-dia">{e.dia}</span>
        <span className="cy-cal-fecha-mes">{e.mesCorto}</span>
        <span className="cy-cal-fecha-semana">{e.semana}</span>
      </time>
      <div className="cy-cal-cuerpo">
        <p className="cy-cal-meta">
          <span className="cy-cal-etiqueta" data-tipo={e.tipo}>
            <span className="cy-cal-punto" aria-hidden="true" />
            {e.etiqueta}
          </span>
          <Cuenta fecha={e.fecha} dias={e.dias} textos={cuenta} />
        </p>
        <h3 className="cy-cal-titulo">{e.titulo}</h3>
        {e.cambio || e.zonas ? <p className="cy-cal-cambio">{[e.cambio, e.zonas].filter(Boolean).join(". ")}</p> : null}
        {e.texto ? <p className="cy-cal-texto">{e.texto}</p> : null}
        <p className="cy-cal-fuente">
          <a href={e.fuente.url} rel="noopener" target="_blank" title={e.fuente.titulo}>
            {e.fuente.linea}
            <IconoExterno />
          </a>
        </p>
        <div className="cy-cal-acciones">
          <a className="cy-cal-boton cy-cal-boton-tinta" href={e.calculadora.href}>
            <span className="cy-cal-boton-texto">
              {v.t.calcular}
              <span className="cy-cal-oculto">: {e.calculadora.titulo}</span>
            </span>
            <span className="cy-boton-icono">
              <IconoFlecha />
            </span>
          </a>
          <Agregar e={e} v={v} />
        </div>
        {e.otras.length ? (
          <p className="cy-cal-otras">
            <span>{v.t.tambien}</span>
            {e.otras.map((o) => (
              <a key={o.href} href={o.href}>
                {o.titulo}
              </a>
            ))}
          </p>
        ) : null}
      </div>
    </li>
  );
}

function Proxima({ e, v, cuenta }: { e: EventoVista; v: VistaCalendario; cuenta: TextosCuenta }) {
  return (
    <section className="cy-cal-heroe" aria-labelledby="cy-cal-proxima">
      <div className="cy-cal-heroe-nucleo">
        <div className="cy-cal-heroe-cuenta">
          <p id="cy-cal-proxima" className="cy-cal-heroe-ceja">
            {v.t.proxima}
          </p>
          <p className="cy-cal-gran" aria-hidden="true">
            <CuentaGrande fecha={e.fecha} dias={e.dias} textos={cuenta} otros={v.t.cuenta.dias(2)} />
          </p>
          <time className="cy-cal-heroe-fecha" dateTime={e.fecha}>
            {e.semana}, {e.fechaLarga}
          </time>
        </div>
        <div className="cy-cal-heroe-detalle">
          <span className="cy-cal-etiqueta cy-cal-etiqueta-oscura" data-tipo={e.tipo}>
            <span className="cy-cal-punto" aria-hidden="true" />
            {e.etiqueta}
          </span>
          <h2 className="cy-cal-heroe-titulo">{e.titulo}</h2>
          {e.cambio || e.zonas ? <p className="cy-cal-heroe-cambio">{[e.cambio, e.zonas].filter(Boolean).join(". ")}</p> : null}
          <div className="cy-cal-acciones">
            <a className="cy-cal-boton cy-cal-boton-crema" href={e.calculadora.href}>
              <span className="cy-cal-boton-texto">
                {v.t.calcular}
                <span className="cy-cal-oculto">: {e.calculadora.titulo}</span>
              </span>
              <span className="cy-boton-icono">
                <IconoFlecha />
              </span>
            </a>
            <Agregar e={e} v={v} />
          </div>
          <p className="cy-cal-heroe-fuente">
            <a href={e.fuente.url} rel="noopener" target="_blank" title={e.fuente.titulo}>
              {e.fuente.linea}
              <IconoExterno />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Meses({ v }: { v: VistaCalendario }) {
  const semana = new Intl.DateTimeFormat(v.m.locale, { weekday: "narrow", timeZone: "UTC" });
  // 2024-01-01 fue lunes.
  const iniciales = Array.from({ length: 7 }, (_, i) => semana.format(new Date(Date.UTC(2024, 0, 1 + i))));
  return (
    <ol className="cy-cal-meses">
      {v.meses.map((mes) => {
        const conEvento = new Map<number, EventoVista>();
        for (const e of mes.eventos) if (!conEvento.has(Number(e.fecha.slice(8)))) conEvento.set(Number(e.fecha.slice(8)), e);
        const tipos = [...new Set(mes.eventos.map((e) => e.tipo))].join(" ");
        const primero = mes.eventos[0];
        const cuerpo = (
          <>
            <span className="cy-cal-mes-cabeza">
              <span className="cy-cal-mes-nombre">{mes.nombre}</span>
              <span className="cy-cal-mes-anio">{mes.anio}</span>
            </span>
            <span className="cy-cal-mini" aria-hidden="true" style={{ "--inicio": mes.inicio } as CSSProperties}>
              {iniciales.map((x, i) => (
                <b key={`s${i}`}>{x}</b>
              ))}
              {Array.from({ length: mes.dias }, (_, d) => {
                const e = conEvento.get(d + 1);
                return (
                  <i key={d} data-tipo={e?.tipo} style={d === 0 ? { gridColumnStart: mes.inicio + 1 } : undefined}>
                    {d + 1}
                  </i>
                );
              })}
            </span>
            <span className="cy-cal-mes-resumen">{primero ? `${primero.dia} ${primero.mesCorto} · ${primero.titulo}` : v.t.sinFechas}</span>
          </>
        );
        return (
          <li key={mes.clave} className="cy-cal-mes" data-tipos={tipos || undefined} data-vacio={primero ? undefined : ""}>
            {primero ? (
              <a href={`#${primero.id}`} aria-label={`${mes.nombre} ${mes.anio}: ${mes.eventos.map((e) => `${e.fechaLarga}, ${e.titulo}`).join("; ")}`}>
                {cuerpo}
              </a>
            ) : (
              <div>{cuerpo}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function agrupar(eventos: readonly EventoVista[], locale: string) {
  const f = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" });
  const grupos: { clave: string; nombre: string; eventos: EventoVista[] }[] = [];
  for (const e of eventos) {
    const clave = e.fecha.slice(0, 7);
    let g = grupos.at(-1);
    if (!g || g.clave !== clave) grupos.push((g = { clave, nombre: f.format(new Date(`${clave}-15T12:00:00Z`)), eventos: [] }));
    g.eventos.push(e);
  }
  return grupos;
}

function ldEventos(v: VistaCalendario) {
  return v.proximos.slice(0, 20).map((e) => ({
    "@type": "Event",
    name: e.titulo,
    description: [e.cambio, e.zonas, e.fuente.linea].filter(Boolean).join(". "),
    startDate: e.fecha,
    endDate: e.fecha,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: { "@type": "VirtualLocation", url: urlIntl(v.m.codigo, e.calculadora.href.split("/").pop()) },
    organizer: { "@type": "Organization", name: e.fuente.organismo, url: e.fuente.url },
    isAccessibleForFree: true,
    inLanguage: v.m.locale,
    url: `${v.url}#${e.id}`,
  }));
}

export function PaginaCalendario({ ctx, v }: { ctx: ContextoSitio; v: VistaCalendario }) {
  const { m, t } = v;
  const cuenta: TextosCuenta = {
    hoy: t.cuenta.hoy,
    manana: t.cuenta.manana,
    ayer: t.cuenta.ayer,
    en: t.cuenta.en("{n}" as unknown as number),
    hace: t.cuenta.hace("{n}" as unknown as number),
  };
  const [primera, ...resto] = v.proximos;
  const conteo = TIPOS_EVENTO.map((id) => ({ id, nombre: t.tipos[id], n: v.proximos.filter((e) => e.tipo === id).length })).filter((x) => x.n > 0);
  const titulo = t.h1(m.nombre);

  return (
    <article className="cy-pagina cy-cal">
      <JsonLd
        datos={grafo([
          ldPagina({ tipo: "CollectionPage", url: v.url, nombre: titulo, descripcion: descripcionSeo(v), locale: m.locale, actualizado: v.fecha }),
          { "@type": "ItemList", itemListElement: ldEventos(v).map((item, i) => ({ "@type": "ListItem", position: i + 1, item })) },
        ])}
      />
      <Migas etiqueta={ctx.textos.migas.etiqueta} items={[{ nombre: m.nombre, href: rutaIntl(m.codigo) }, { nombre: t.nombre }]} />

      <header className="cy-cal-cabeza">
        <p className="cy-cal-ceja">
          <span className="cy-punto-vivo" aria-hidden="true" />
          <Bandera pais={m.pais} ancho={16} />
          {t.ceja(v.anios)}
        </p>
        <h1 className="cy-cal-h1">
          {titulo}
          <span className="cy-cal-oculto">: </span>
          <em>{t.acento}</em>
        </h1>
        <p className="cy-cal-bajada">{t.bajada}</p>
      </header>

      {primera ? <Proxima e={primera} v={v} cuenta={cuenta} /> : null}

      <Filtro tipos={conteo} etiqueta={t.filtro} todo={t.todo}>
        <section className="cy-cal-seccion" aria-labelledby="cy-cal-anio">
          <h2 id="cy-cal-anio" className="cy-cal-h2">
            {t.mesPorMes}
          </h2>
          <Meses v={v} />
        </section>

        {resto.length ? (
          <section className="cy-cal-seccion" aria-labelledby="cy-cal-viene">
            <h2 id="cy-cal-viene" className="cy-cal-h2">
              {t.queViene}
            </h2>
            {agrupar(resto, m.locale).map((g) => (
              <div key={g.clave} className="cy-cal-grupo">
                <h3 className="cy-cal-grupo-mes">{g.nombre}</h3>
                <ol className="cy-cal-lista">
                  {g.eventos.map((e) => (
                    <Evento key={e.id} e={e} v={v} cuenta={cuenta} />
                  ))}
                </ol>
              </div>
            ))}
            <p className="cy-cal-vacio">{t.vacio}</p>
          </section>
        ) : null}
      </Filtro>

      <section className="cy-cal-suscribir" aria-labelledby="cy-cal-suscribir">
        <div className="cy-cal-suscribir-texto">
          <h2 id="cy-cal-suscribir" className="cy-cal-h2">
            {t.suscribir.titulo}
          </h2>
          <p>{t.suscribir.texto}</p>
        </div>
        <div className="cy-cal-acciones">
          <a className="cy-cal-boton cy-cal-boton-tinta" href={v.webcal} rel="nofollow">
            <span className="cy-cal-boton-texto">{t.suscribir.boton}</span>
            <span className="cy-boton-icono">
              <IconoCalendario />
            </span>
          </a>
          <a className="cy-cal-boton cy-cal-boton-claro" href={v.googleSuscribir} rel="noopener nofollow" target="_blank">
            {t.google}
            <IconoExterno />
          </a>
          <Copiar texto={v.ics} copiar={t.suscribir.copiar} copiado={t.suscribir.copiado} />
        </div>
      </section>

      {v.pasados.length ? (
        <section className="cy-cal-seccion" aria-labelledby="cy-cal-rige">
          <h2 id="cy-cal-rige" className="cy-cal-h2">
            {t.yaRige}
          </h2>
          <ol className="cy-cal-lista cy-cal-lista-pasada">
            {v.pasados.map((e) => (
              <Evento key={e.id} e={e} v={v} cuenta={cuenta} />
            ))}
          </ol>
        </section>
      ) : null}

      <section className="cy-cal-fuentes" aria-labelledby="cy-cal-fuentes">
        <h2 id="cy-cal-fuentes" className="cy-cal-h2">
          {t.fuentes.titulo}
        </h2>
        <p>{t.fuentes.texto}</p>
        <ul>
          {v.fuentes.map((f) => (
            <li key={f.url}>
              <a href={f.url} rel="noopener" target="_blank">
                <span>{f.organismo}</span>
                <span className="cy-cal-fuentes-titulo">{f.titulo}</span>
                <IconoExterno />
              </a>
              <span className="cy-cal-fuentes-fecha">{t.verificado(f.verificado)}</span>
            </li>
          ))}
        </ul>
      </section>
      <AvisoDePais ctx={ctx} />
    </article>
  );
}
