"use client";

import { useEffect, useId, useMemo, useState, type CSSProperties } from "react";
import type { OpcionesCompartir } from "../../compartir";
import { Redes } from "../../compartir/Redes";
import { rellenarHoras, type TextosHoras } from "../../i18n/horas";
import type { TextosHorasPropio } from "../../i18n/horas-propio";
import type { TextosRedes } from "../../i18n/redes";
import { CLAVE_TRASPASO, edicionPrincipal } from "../../mundo/rutas";
import type { DatosHorasCliente, PaisHorasCliente, ProductoCliente } from "./datos-cliente";
import { formatoHoras, formatoNumero, formatoPrecioConCodigo, textoJornadas } from "./formato";

export interface PropsHoras {
  datos: DatosHorasCliente;
  t: TextosHoras;
  tp: TextosHorasPropio;
  tr: TextosRedes;
  locale: string;
  productoInicial: string;
  // El producto que muestra el índice: su URL es la del índice, no /<slug>/<producto>.
  productoIndice: string;
  paisInicial: string;
  // URL absoluta del índice en esta edición (sin producto). Las tarjetas son `${base}/${producto}/${iso}`.
  base: string;
  slug: string;
}

// Hasta acá el ranking se ve entero; más largo, se pliega y siempre muestra el país elegido.
const TOPE = 10;
const HORAS_SEMANA = 40;
const SEMANAS_ANIO = 52;

const ORIGEN: OpcionesCompartir["origen"] = "horas";

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

// El sueldo que la persona ya cargó en la calculadora de su país (sessionStorage, nunca la URL). Se lee
// a mano y no con leerTraspaso: ese módulo arrastra los adaptadores del mundo al JS de esta página.
function traspasoGuardado(): { mercado: string; brutoAnual: number } | null {
  try {
    const t = JSON.parse(sessionStorage.getItem(CLAVE_TRASPASO) ?? "null") as { mercado?: unknown; brutoAnual?: unknown } | null;
    return t && typeof t.mercado === "string" && typeof t.brutoAnual === "number" && t.brutoAnual > 0 ? { mercado: edicionPrincipal(t.mercado), brutoAnual: t.brutoAnual } : null;
  } catch {
    return null;
  }
}

// Las horas viajan a la tarjeta en décimas y nunca el sueldo: la imagen arma el resto con el índice.
const TOPE_DECIMAS = 10_000_000;

function leerNumero(texto: string, locale: string): number | null {
  const decimal = new Intl.NumberFormat(locale).formatToParts(1.5).find((x) => x.type === "decimal")?.value ?? ".";
  const limpio = texto.replace(decimal === "," ? /[^\d,]/g : /[^\d.]/g, "").replace(decimal, ".");
  if (!/\d/.test(limpio)) return null;
  const n = Number(limpio);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function simboloDe(locale: string, moneda: string): string {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency: moneda, currencyDisplay: "narrowSymbol" }).formatToParts(0).find((x) => x.type === "currency")?.value ?? moneda;
  } catch {
    return moneda;
  }
}

function Propio({
  t,
  tp,
  locale,
  pais,
  producto,
  ranking,
  texto,
  setTexto,
  traido,
  ratio,
}: {
  t: TextosHoras;
  tp: TextosHorasPropio;
  locale: string;
  pais: PaisHorasCliente;
  producto: ProductoCliente;
  ranking: readonly PaisHorasCliente[];
  texto: string;
  setTexto: (v: string) => void;
  traido: boolean;
  ratio: number | null;
}) {
  const idCampo = useId();
  const idAyuda = useId();
  const celda = pais.celdas[producto.id];
  const invalido = texto.trim() !== "" && ratio === null;
  const horas = celda && ratio ? formatoHoras(locale, celda.horas / ratio) : null;
  const filas = ratio && celda ? ranking.slice(0, 5).concat(ranking.slice(5).filter((x) => x.iso === pais.iso)) : [];
  const max = ratio && filas.length ? Math.max(...filas.map((x) => x.celdas[producto.id].horas / ratio)) : 1;
  const veces = ratio ? formatoNumero(locale, ratio, ratio < 10 ? 1 : 0) : "";

  return (
    <section className="cy-horas-propio" aria-labelledby="cy-horas-propio-titulo">
      <div className="cy-horas-seccion-cabeza">
        <h2 id="cy-horas-propio-titulo" className="cy-horas-h2">
          {tp.titulo}
        </h2>
        <p className="cy-horas-bajada">{tp.bajada}</p>
      </div>
      <div className="cy-horas-propio-cuerpo">
        <div className="cy-horas-propio-campo">
          <label htmlFor={idCampo}>{tp.campo}</label>
          <div className="cy-horas-propio-entrada" data-invalido={invalido || undefined}>
            <span className="cy-horas-propio-simbolo" aria-hidden="true">
              {simboloDe(locale, pais.moneda)}
            </span>
            <input
              id={idCampo}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              spellCheck={false}
              value={texto}
              placeholder={formatoNumero(locale, Math.round(pais.porHora * pais.horasMes * 2))}
              aria-describedby={idAyuda}
              aria-invalid={invalido || undefined}
              onChange={(e) => setTexto(e.target.value)}
            />
            <span className="cy-horas-propio-codigo" aria-hidden="true">
              {pais.moneda}
            </span>
          </div>
          <p id={idAyuda} className="cy-horas-propio-ayuda" data-invalido={invalido || undefined}>
            {invalido ? tp.invalido : traido ? tp.traido : rellenarHoras(tp.ayuda, { moneda: pais.moneda })}
          </p>
        </div>
        <div className="cy-horas-propio-resultado" aria-live="polite">
          {!celda ? (
            <p className="cy-horas-propio-espera">{rellenarHoras(t.heroe.sinPrecio, { en: pais.en })}</p>
          ) : horas && ratio ? (
            <>
              <p className="cy-horas-propio-antes">{rellenarHoras(tp.antes, { en: pais.en, producto: producto.conArticulo })}</p>
              <p className="cy-horas-propio-cifra" key={`${producto.id}-${pais.iso}`}>
                <span>{horas.numero}</span>
                <small>{horas.unidad}</small>
              </p>
              <p className="cy-horas-propio-antes">{producto.periodo === "mes" ? tp.despuesMes : tp.despues}</p>
              <p className="cy-horas-propio-nota">
                <span>{rellenarHoras(tp.minimo, { horas: formatoHoras(locale, celda.horas).texto })}</span>
                <span className="cy-horas-propio-chip">{rellenarHoras(tp.veces, { x: veces })}</span>
              </p>
            </>
          ) : (
            <p className="cy-horas-propio-espera">{tp.vacio}</p>
          )}
        </div>
      </div>
      {ratio && celda ? (
        <div className="cy-horas-propio-ranking">
          <div>
            <h3 className="cy-horas-h3">{tp.rankingTitulo}</h3>
            <p className="cy-horas-propio-ayuda">{rellenarHoras(tp.rankingBajada, { x: veces })}</p>
          </div>
          <ol className="cy-horas-propio-lista">
            {filas.map((x) => {
              const h = x.celdas[producto.id].horas / ratio;
              return (
                <li key={x.iso} data-elegido={x.iso === pais.iso ? "" : undefined}>
                  <span className="cy-horas-pos">{formatoNumero(locale, ranking.indexOf(x) + 1)}</span>
                  <Bandera iso={x.iso} />
                  <span className="cy-horas-propio-pais">{x.nombre}</span>
                  <span className="cy-horas-propio-horas">{formatoHoras(locale, h).texto}</span>
                  <span className="cy-horas-barra" aria-hidden="true">
                    <span style={{ transform: `scaleX(${Math.max(0.015, h / max)})` }} />
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}
    </section>
  );
}

function Compartir({ t, tp, tr, url, imagen, texto, propio }: { t: TextosHoras; tp: TextosHorasPropio; tr: TextosRedes; url: string; imagen: string; texto: string; propio: boolean }) {
  const historia = `${imagen}&formato=historia`;
  const opciones = useMemo(() => ({ origen: ORIGEN, url, titulo: t.nombre, texto, imagen: historia, historia }), [url, t.nombre, texto, historia]);
  return (
    <section className="cy-horas-compartir" aria-labelledby="cy-horas-compartir-titulo">
      <div className="cy-horas-compartir-texto">
        <h2 id="cy-horas-compartir-titulo" className="cy-horas-h3">
          {propio ? tp.tarjetaTitulo : t.compartir.titulo}
        </h2>
        <p>{propio ? tp.tarjetaBajada : t.compartir.bajada}</p>
      </div>
      <Redes t={tr} opciones={opciones} cuadrado={`${imagen}&formato=cuadrado`} archivo="calcularya-horas" alt={t.compartir.alt} />
    </section>
  );
}

export function HorasCliente({ datos, t, tp, tr, locale, productoInicial, productoIndice, paisInicial, base, slug }: PropsHoras) {
  const [producto, setProducto] = useState(productoInicial);
  const [iso, setIso] = useState(paisInicial);
  const [todos, setTodos] = useState(false);
  const [sueldo, setSueldo] = useState("");
  const [traido, setTraido] = useState(false);
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
      // El producto del índice vive en el índice (su página propia lleva canonical ahí).
      if (resto[0] === p.id || (!resto.length && p.id === productoIndice)) return;
      window.history.replaceState(window.history.state, "", p.id === productoIndice ? raiz : `${raiz}/${p.id}`);
    } catch {
      // Sin History API la página sigue igual.
    }
  }, [p.id, slug, productoIndice]);

  // Una sola vez al montar: si la persona viene de su calculadora de sueldo, su país y su sueldo mensual.
  useEffect(() => {
    const guardado = traspasoGuardado();
    const suyo = guardado ? datos.paises.find((x) => x.mercado === guardado.mercado) : undefined;
    if (!guardado || !suyo) return;
    setIso(suyo.iso);
    setSueldo(formatoNumero(locale, Math.round(guardado.brutoAnual / suyo.pagas)));
    setTraido(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Otro país es otra moneda: el sueldo escrito ya no significa lo mismo.
  const elegirPais = (nuevo: string) => {
    if (nuevo !== iso && sueldo) {
      setSueldo("");
      setTraido(false);
    }
    setIso(nuevo);
  };
  const escribir = (v: string) => {
    setSueldo(v);
    setTraido(false);
  };

  const mensual = leerNumero(sueldo, locale);
  // Cuántos mínimos es el sueldo: con eso salen las horas de este país y del resto del índice.
  const ratio = pais && mensual ? mensual / pais.horasMes / pais.porHora : null;
  const horas = celda ? formatoHoras(locale, celda.horas) : null;
  const visibles = todos || ranking.length <= TOPE + 2 ? ranking : ranking.filter((x, i) => i < TOPE || x.iso === iso);
  const propias = celda && ratio ? Math.min(TOPE_DECIMAS, Math.max(1, Math.round((celda.horas / ratio) * 10))) : null;
  const imagen = `${base}/og?p=${p.id}${pais && celda ? `&pais=${pais.iso}` : ""}${propias ? `&h=${propias}` : ""}`;
  const urlTarjeta = `${base}/${p.id}${pais && celda ? `/${pais.iso.toLowerCase()}` : ""}`;
  const textoCompartir = pais && propias ? rellenarHoras(tp.texto, { en: pais.en, producto: p.conArticulo, horas: formatoHoras(locale, propias / 10).texto }) : pais && horas ? rellenarHoras(t.compartir.texto, { en: pais.en, producto: p.conArticulo, horas: horas.texto }) : rellenarHoras(t.og.generica, { producto: p.conArticulo });

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
                <select id={idSelect} value={iso} onChange={(e) => elegirPais(e.target.value)}>
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

      {pais ? <Propio t={t} tp={tp} locale={locale} pais={pais} producto={p} ranking={ranking} texto={sueldo} setTexto={escribir} traido={traido} ratio={ratio} /> : null}

      <Compartir t={t} tp={tp} tr={tr} url={urlTarjeta} imagen={imagen} texto={textoCompartir} propio={Boolean(propias)} />

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
                <button type="button" className="cy-horas-fila" aria-pressed={x.iso === iso} onClick={() => elegirPais(x.iso)}>
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
