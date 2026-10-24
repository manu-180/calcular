"use client";

import { useEffect, useId, useMemo, useState, type CSSProperties } from "react";
import { usarCompartir, type OpcionesCompartir } from "../../compartir";
import { rellenarHoras, type TextosHoras } from "../../i18n/horas";
import type { DatosHorasCliente, PaisHorasCliente, ProductoCliente } from "./datos-cliente";
import { formatoHoras, formatoNumero, formatoPrecioConCodigo, textoJornadas } from "./formato";

export interface PropsHoras {
  datos: DatosHorasCliente;
  t: TextosHoras;
  locale: string;
  productoInicial: string;
  paisInicial: string;
  // URL absoluta del índice en esta edición (sin producto). Las tarjetas son `${base}/${producto}/${iso}`.
  base: string;
  slug: string;
}

// Hasta acá el ranking se ve entero; más largo, se pliega y siempre muestra el país elegido.
const TOPE = 10;
const HORAS_SEMANA = 40;
const SEMANAS_ANIO = 52;

// Mientras /api/e no sume «horas» a ORIGENES_COMPARTIR (src/motor/compartir/ref.ts), el evento de
// compartir se descarta: el link y la tarjeta funcionan igual, solo falta la medición.
const ORIGEN = "horas" as OpcionesCompartir["origen"];

function Bandera({ iso }: { iso: string }) {
  return <img className="cy-horas-bandera" src={`/banderas/${iso.toLowerCase()}.svg`} width={24} height={16} alt="" decoding="async" />;
}

// Una tarjeta de fichaje: con menos de 40 horas, cada cuadro es una hora (5 días de 8); con más, cada
// cuadro es una semana de 40 horas (un año de 52). El último cuadro se llena en proporción.
function Fichaje({ horas, t }: { horas: number; t: TextosHoras }) {
  const porHora = horas < HORAS_SEMANA;
  const total = porHora ? HORAS_SEMANA : SEMANAS_ANIO;
  const unidades = porHora ? horas : horas / HORAS_SEMANA;
  const mas = !porHora && unidades > SEMANAS_ANIO;
  return (
    <figure className="cy-horas-fichaje" data-escala={porHora ? "horas" : "semanas"}>
      <div className="cy-horas-celdas" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => {
          const lleno = Math.max(0, Math.min(1, unidades - i));
          return <i key={i} style={{ "--l": lleno, "--i": i } as CSSProperties} data-lleno={lleno >= 1 ? "" : undefined} />;
        })}
      </div>
      <figcaption>{mas ? `${t.heroe.masDeUnAnio} · ${t.heroe.escalaSemanas}` : porHora ? t.heroe.escalaHoras : t.heroe.escalaSemanas}</figcaption>
    </figure>
  );
}

function Compartir({ t, url, imagen, texto }: { t: TextosHoras; url: string; imagen: string; texto: string }) {
  const { compartir, estado } = usarCompartir({ origen: ORIGEN, url, titulo: t.nombre, texto, imagen: `${imagen}&formato=historia` });
  const aviso = estado === "copiado" ? t.compartir.copiado : estado === "compartido" ? t.compartir.compartido : estado === "error" ? t.compartir.error : "";
  return (
    <section className="cy-horas-compartir" aria-labelledby="cy-horas-compartir-titulo">
      <div className="cy-horas-compartir-texto">
        <h2 id="cy-horas-compartir-titulo" className="cy-horas-h3">
          {t.compartir.titulo}
        </h2>
        <p>{t.compartir.bajada}</p>
        <div className="cy-horas-acciones">
          <button type="button" className="cy-horas-boton" onClick={compartir}>
            <span>{t.compartir.boton}</span>
            <span className="cy-horas-boton-icono" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M8 10.5V2.5M5 5.5l3-3 3 3M3.5 9v3.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          <a className="cy-horas-enlace" href={`${imagen}&formato=historia`} download="calcularya-horas.png">
            {t.compartir.descargar}
          </a>
        </div>
        <p className="cy-horas-aviso" role="status" aria-live="polite">
          {aviso}
        </p>
      </div>
      <img className="cy-horas-vista" src={imagen} width={1200} height={630} alt={t.compartir.alt} loading="lazy" decoding="async" />
    </section>
  );
}

export function HorasCliente({ datos, t, locale, productoInicial, paisInicial, base, slug }: PropsHoras) {
  const [producto, setProducto] = useState(productoInicial);
  const [iso, setIso] = useState(paisInicial);
  const [todos, setTodos] = useState(false);
  const idSelect = useId();

  const p: ProductoCliente = datos.productos.find((x) => x.id === producto) ?? datos.productos[0];
  const pais: PaisHorasCliente | undefined = datos.paises.find((x) => x.iso === iso);
  const celda = pais?.celdas[p.id];

  const ranking = useMemo(() => datos.paises.filter((x) => x.celdas[p.id]).sort((a, b) => a.celdas[p.id].horas - b.celdas[p.id].horas), [datos.paises, p.id]);
  const max = ranking.at(-1)?.celdas[p.id].horas ?? 1;
  const puesto = ranking.findIndex((x) => x.iso === iso);
  const mejor = ranking[0];
  const sinDato = datos.paises.length - ranking.length;

  // La URL acompaña al producto (cada uno tiene su página), sin recargar: el índice entero ya está acá.
  useEffect(() => {
    try {
      const ruta = window.location.pathname;
      const i = ruta.indexOf(`/${slug}`);
      if (i < 0) return;
      const raiz = ruta.slice(0, i + slug.length + 1);
      const resto = ruta.slice(raiz.length).split("/").filter(Boolean);
      if (resto[0] === p.id || (!resto.length && p.id === productoInicial)) return;
      window.history.replaceState(window.history.state, "", `${raiz}/${p.id}`);
    } catch {
      // Sin History API la página sigue igual.
    }
  }, [p.id, slug, productoInicial]);

  const horas = celda ? formatoHoras(locale, celda.horas) : null;
  const visibles = todos || ranking.length <= TOPE + 2 ? ranking : ranking.filter((x, i) => i < TOPE || x.iso === iso);
  const imagen = `${base}/og?p=${p.id}${pais && celda ? `&pais=${pais.iso}` : ""}`;
  const urlTarjeta = `${base}/${p.id}${pais && celda ? `/${pais.iso.toLowerCase()}` : ""}`;
  const textoCompartir = pais && horas ? rellenarHoras(t.compartir.texto, { en: pais.en, producto: p.conArticulo, horas: horas.texto }) : rellenarHoras(t.og.generica, { producto: p.conArticulo });

  return (
    <div className="cy-horas-app">
      <section className="cy-horas-panel" aria-label={t.nombre}>
        <div className="cy-horas-panel-nucleo">
          <div className="cy-horas-controles">
            <fieldset className="cy-horas-productos">
              <legend className="cy-horas-lector">{t.form.producto}</legend>
              {datos.productos.map((x) => (
                <button key={x.id} type="button" className="cy-horas-producto" aria-pressed={x.id === p.id} onClick={() => setProducto(x.id)}>
                  <span>{x.nombre}</span>
                  {x.periodo === "mes" ? <small>{t.form.porMes}</small> : null}
                </button>
              ))}
            </fieldset>
            <div className="cy-horas-pais">
              <label htmlFor={idSelect}>{t.form.pais}</label>
              <div className="cy-horas-select">
                {pais ? <Bandera iso={pais.iso} /> : null}
                <select id={idSelect} value={iso} onChange={(e) => setIso(e.target.value)}>
                  {datos.paises.map((x) => (
                    <option key={x.iso} value={x.iso}>
                      {x.nombre}
                    </option>
                  ))}
                </select>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {pais && celda && horas ? (
            <div className="cy-horas-resultado" aria-live="polite">
              <p className="cy-horas-antes">{rellenarHoras(t.heroe.antes, { en: pais.en, producto: p.conArticulo })}</p>
              <p className="cy-horas-cifra" key={`${p.id}-${pais.iso}`}>
                <span className="cy-horas-numero">{horas.numero}</span>
                <span className="cy-horas-unidad">{horas.unidad}</span>
              </p>
              <p className="cy-horas-despues">{p.periodo === "mes" ? t.heroe.despuesMes : t.heroe.despues}</p>
              <p className="cy-horas-jornadas">{textoJornadas({ uno: t.heroe.jornadaUno, otras: t.heroe.jornadaOtras }, locale, celda.horas)}</p>
              <Fichaje horas={celda.horas} t={t} />
              <dl className="cy-horas-datos">
                <div>
                  <dt>{rellenarHoras(t.heroe.precio, { precio: "" }).trim()}</dt>
                  <dd>{formatoPrecioConCodigo(locale, celda.monto, celda.moneda)}</dd>
                </div>
                <div>
                  <dt>{rellenarHoras(t.heroe.salario, { monto: "" }).replace(/\s+/g, " ").trim()}</dt>
                  <dd>{formatoPrecioConCodigo(locale, pais.porHora, pais.moneda)}</dd>
                </div>
                <div>
                  <dt>{t.ranking.titulo}</dt>
                  <dd>{rellenarHoras(t.heroe.puesto, { p: formatoNumero(locale, puesto + 1), total: formatoNumero(locale, ranking.length) })}</dd>
                </div>
              </dl>
              {mejor ? (
                <p className="cy-horas-mejor">
                  <Bandera iso={mejor.iso} />
                  <span>{mejor.iso === pais.iso ? t.heroe.mejorPropio : rellenarHoras(t.heroe.mejor, { en: mejor.en, horas: formatoHoras(locale, mejor.celdas[p.id].horas).texto })}</span>
                </p>
              ) : null}
            </div>
          ) : (
            <div className="cy-horas-resultado" aria-live="polite">
              <p className="cy-horas-vacio">{pais ? rellenarHoras(t.heroe.sinPrecio, { en: pais.en }) : t.ranking.sinPrecio.replace("{n}", "1")}</p>
              {mejor ? (
                <p className="cy-horas-mejor">
                  <Bandera iso={mejor.iso} />
                  <span>{rellenarHoras(t.heroe.mejor, { en: mejor.en, horas: formatoHoras(locale, mejor.celdas[p.id].horas).texto })}</span>
                </p>
              ) : null}
            </div>
          )}
        </div>
      </section>

      <Compartir t={t} url={urlTarjeta} imagen={imagen} texto={textoCompartir} />

      <section className="cy-horas-ranking" aria-labelledby="cy-horas-ranking-titulo">
        <div className="cy-horas-seccion-cabeza">
          <h2 id="cy-horas-ranking-titulo" className="cy-horas-h2">
            {t.ranking.titulo}
          </h2>
          <p className="cy-horas-bajada">{t.ranking.bajada}</p>
        </div>
        <ol className="cy-horas-lista" aria-label={`${t.ranking.lista}: ${p.nombre}`}>
          {visibles.map((x) => {
            const c = x.celdas[p.id];
            const pos = ranking.indexOf(x) + 1;
            const h = formatoHoras(locale, c.horas);
            const salto = !todos && pos > TOPE && visibles.length < ranking.length;
            return (
              <li key={x.iso} data-elegido={x.iso === iso ? "" : undefined} data-salto={salto ? "" : undefined}>
                <button type="button" className="cy-horas-fila" aria-pressed={x.iso === iso} onClick={() => setIso(x.iso)}>
                  <span className="cy-horas-pos">{formatoNumero(locale, pos)}</span>
                  <span className="cy-horas-fila-pais">
                    <Bandera iso={x.iso} />
                    <span className="cy-horas-fila-texto">
                      <span className="cy-horas-fila-nombre">{x.nombre}</span>
                      <span className="cy-horas-fila-precio">{x.iso === iso ? `${t.ranking.elegido} · ` : ""}{formatoPrecioConCodigo(locale, c.monto, c.moneda)}</span>
                    </span>
                  </span>
                  <span className="cy-horas-fila-horas">{h.texto}</span>
                  <span className="cy-horas-barra" aria-hidden="true">
                    <span style={{ transform: `scaleX(${Math.max(0.015, c.horas / max)})` }} />
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        {ranking.length > TOPE + 2 ? (
          <button type="button" className="cy-horas-ver" aria-expanded={todos} onClick={() => setTodos((v) => !v)}>
            {todos ? t.ranking.verMenos : rellenarHoras(t.ranking.verTodos, { n: formatoNumero(locale, ranking.length) })}
          </button>
        ) : null}
        {sinDato > 0 ? <p className="cy-horas-nota">{rellenarHoras(t.ranking.sinPrecio, { n: formatoNumero(locale, sinDato) })}</p> : null}
      </section>
    </div>
  );
}
