"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { usarCompartir } from "../../compartir";
import type { RegionMundo } from "../../i18n/mundo";
import { cargaDesde, codificarCarga, compararDesde, decodificarCarga, diaDeCarga, diasDelAnio, fechaDelDia, type FilaMundo } from "../calculo";
import { AporteSueldo } from "../../sueldos/ui/AporteSueldo";
import { leerTraspaso } from "../traspaso";
import type { CargaCompartida } from "../tipos";
import { Afiliados } from "./Afiliados";
import { expandir, type GrillaCliente, type PaisCliente } from "./compacta";
import { ORDEN_REGIONES } from "./regiones";
import { rellenar, type TextosCliente } from "./textos-cliente";

export interface PropsMundo {
  grilla: GrillaCliente;
  textos: TextosCliente;
  locale: string;
  anio: number;
  // Edición de la página: decide el país de origen inicial (global no tiene uno).
  origenInicial: string;
  meses: readonly string[];
  // URL absoluta de la página, sin el `c`. El link compartido es `${base}/${c}`.
  base: string;
  carga: CargaCompartida | null;
  // El sitio que firma la tarjeta: calcular.ar usa la suya en su página (sin esto, CalcularYa).
  marca?: MarcaMundo;
}

export interface MarcaMundo {
  nombre: string;
  dominio: string;
}

const MARCA_INTL: MarcaMundo = { nombre: "CalcularYa", dominio: "calcularya.com" };

type Periodo = "mes" | "anio";
const TOPE = 10;
// Sueldo de ejemplo: 3.000 dólares internacionales por mes llevados a la moneda del país y redondeados
// a dos cifras. No es la mediana de nadie: es un punto de partida que se ve razonable en la escala local.
const EJEMPLO_PPA_MENSUAL = 3000;

const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

function dosCifras(n: number): number {
  if (n <= 0) return 0;
  const p = Math.pow(10, Math.max(0, Math.floor(Math.log10(n)) - 1));
  return Math.round(n / p) * p;
}

function parsear(texto: string, locale: string): number | null {
  const normal = texto.normalize("NFKC").replace(/[\s  ']/g, "");
  if (!/\d/.test(normal)) return null;
  const decimal = new Intl.NumberFormat(locale).formatToParts(1.5).find((p) => p.type === "decimal")?.value ?? ".";
  const limpio = normal.replace(/[^\d.,]/g, "");
  const ultimo = Math.max(limpio.lastIndexOf("."), limpio.lastIndexOf(","));
  // Un separador seguido de exactamente 3 dígitos es de miles salvo que sea el decimal del locale y haya uno solo.
  let entero = limpio;
  let fraccion = "";
  if (ultimo >= 0) {
    const sep = limpio[ultimo];
    const cola = limpio.slice(ultimo + 1);
    const repetido = limpio.indexOf(sep) !== ultimo;
    if (sep === decimal && !repetido && cola.length !== 3) {
      entero = limpio.slice(0, ultimo);
      fraccion = cola;
    } else if (sep !== decimal && !repetido && cola.length > 0 && cola.length < 3) {
      entero = limpio.slice(0, ultimo);
      fraccion = cola;
    }
  }
  const n = Number(`${entero.replace(/[.,]/g, "") || "0"}${fraccion ? `.${fraccion}` : ""}`);
  return Number.isFinite(n) ? n : null;
}

function usarFormatos(locale: string) {
  return useMemo(() => {
    const monedas = new Map<string, Intl.NumberFormat>();
    const moneda = (m: string) => {
      let f = monedas.get(m);
      if (!f) {
        f = new Intl.NumberFormat(locale, { style: "currency", currency: m, maximumFractionDigits: 0, minimumFractionDigits: 0 });
        monedas.set(m, f);
      }
      return f;
    };
    const pct1 = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 1, minimumFractionDigits: 1 });
    const pct0 = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 });
    const numero = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    const dia = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", timeZone: "UTC" });
    const frances = locale.toLowerCase().startsWith("fr");
    return {
      dinero: (n: number, m: string) => moneda(m).format(n),
      simbolo: (m: string) => moneda(m).formatToParts(0).find((p) => p.type === "currency")?.value ?? m,
      simboloAntes: (m: string) => {
        const partes = moneda(m).formatToParts(0);
        return partes.findIndex((p) => p.type === "currency") < partes.findIndex((p) => p.type === "integer");
      },
      tasa: (t: number) => pct1.format(t),
      pct: (t: number) => pct0.format(t),
      numero: (n: number) => numero.format(n),
      fecha: (d: Date) =>
        frances
          ? dia
              .formatToParts(d)
              .map((p) => (p.type === "day" && p.value === "1" ? "1er" : p.value))
              .join("")
          : dia.format(d),
    };
  }, [locale]);
}

type Formatos = ReturnType<typeof usarFormatos>;

function Bandera({ iso, ancho = 24 }: { iso: string; ancho?: number }) {
  if (!/^[A-Z]{2}$/.test(iso) || iso === "ZZ") return null;
  return <img className="cy-bandera" src={`/banderas/${iso.toLowerCase()}.svg`} width={ancho} height={Math.round((ancho * 2) / 3)} alt="" loading="lazy" decoding="async" />;
}

// ─────────────────────────────── el año ───────────────────────────────

function Anio({ anio, dia, meses, etiqueta }: { anio: number; dia: number; meses: readonly string[]; etiqueta: string }) {
  const filas = useMemo(
    () =>
      meses.map((_, m) => {
        const dias = new Date(Date.UTC(anio, m + 1, 0)).getUTCDate();
        const inicio = Math.round((Date.UTC(anio, m, 1) - Date.UTC(anio, 0, 1)) / 86400000);
        return { m, dias, inicio };
      }),
    [anio, meses],
  );
  return (
    <figure className="cy-anio" role="img" aria-label={etiqueta}>
      {filas.map(({ m, dias, inicio }) => (
        <div key={m} className="cy-anio-mes">
          <span className="cy-anio-nombre" aria-hidden="true">
            {meses[m]}
          </span>
          <span className="cy-anio-dias" aria-hidden="true">
            {Array.from({ length: dias }, (_, d) => {
              const n = inicio + d + 1;
              const estado = n < dia ? "e" : n === dia ? "x" : "l";
              return <i key={d} data-d={estado} style={{ "--n": n } as CSSProperties} />;
            })}
          </span>
        </div>
      ))}
    </figure>
  );
}

// ─────────────────────────────── ranking ───────────────────────────────

function Ranking({
  filas,
  origen,
  t,
  f,
  monedaOrigen,
  porMercado,
}: {
  filas: readonly FilaMundo[];
  origen: string;
  t: TextosCliente;
  f: Formatos;
  monedaOrigen: string;
  porMercado: ReadonlyMap<string, PaisCliente>;
}) {
  const [region, setRegion] = useState<RegionMundo | "todas">("todas");
  const [q, setQ] = useState("");
  const [todos, setTodos] = useState(false);
  const idBuscar = useId();
  const tr = t.ranking;
  const propia = filas.find((x) => x.pais.mercado === origen);
  const max = filas.reduce((a, x) => Math.max(a, x.netoMensualEquivalente), 0) || 1;
  const regiones = ORDEN_REGIONES.filter((r) => filas.some((x) => porMercado.get(x.pais.mercado)?.region === r));
  const normal = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
  const filtro = normal(q.trim());
  const filtradas = filas
    .map((x, i) => ({ x, puesto: i + 1, info: porMercado.get(x.pais.mercado)! }))
    .filter(({ info }) => (region === "todas" || info.region === region) && (!filtro || normal(info.nombre).includes(filtro)));
  const recortar = !todos && !filtro && filtradas.length > TOPE + 1;
  let visibles = recortar ? filtradas.slice(0, TOPE) : filtradas;
  const propiaFila = filtradas.find((v) => v.x.pais.mercado === origen);
  const propiaFuera = recortar && propiaFila && !visibles.includes(propiaFila);
  if (propiaFuera) visibles = [...visibles, propiaFila];

  const lista = useRef<HTMLOListElement>(null);
  const posiciones = useRef(new Map<string, number>());
  const orden = visibles.map((v) => v.x.pais.mercado).join(",");
  // FLIP: cada fila se anima desde donde estaba hasta su lugar nuevo cuando cambia el orden.
  useLayoutEffect(() => {
    const ol = lista.current;
    if (!ol) return;
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nuevas = new Map<string, number>();
    for (const li of Array.from(ol.children) as HTMLElement[]) {
      const k = li.dataset.m;
      if (!k) continue;
      const y = li.offsetTop;
      nuevas.set(k, y);
      const antes = posiciones.current.get(k);
      if (!quieto && antes !== undefined && antes !== y) {
        li.animate([{ transform: `translateY(${antes - y}px)` }, { transform: "none" }], { duration: 460, easing: ease });
      }
    }
    posiciones.current = nuevas;
  }, [orden]);

  return (
    <section className="cy-mundo-ranking" aria-labelledby="cy-mundo-ranking-titulo">
      <div className="cy-mundo-seccion-cabeza">
        <h2 id="cy-mundo-ranking-titulo" className="cy-mundo-h2">
          {tr.titulo}
        </h2>
        <p className="cy-mundo-bajada">{tr.bajada}</p>
        {propia && filas.length > 1 ? <p className="cy-mundo-puesto">{rellenar(tr.puesto, { n: filas.indexOf(propia) + 1, total: filas.length })}</p> : null}
      </div>

      <div className="cy-mundo-filtros">
        <div className="cy-mundo-chips" role="group" aria-label={tr.filtrar}>
          {(["todas", ...regiones] as const).map((r) => (
            <button key={r} type="button" className="cy-mundo-chip" aria-pressed={region === r} onClick={() => setRegion(r)}>
              {r === "todas" ? tr.todas : tr.regiones[r]}
            </button>
          ))}
        </div>
        <label className="cy-mundo-buscar" htmlFor={idBuscar}>
          <span className="cy-mundo-lector">{tr.buscar}</span>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="m13.2 13.2 3.3 3.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input id={idBuscar} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={tr.buscar} autoComplete="off" />
        </label>
      </div>

      <div className="cy-mundo-cols" aria-hidden="true">
        <span>{tr.enMano}</span>
        <span>{tr.enTuMoneda}</span>
        <span>{tr.vsTuPais}</span>
      </div>

      {visibles.length ? (
        <ol ref={lista} className="cy-mundo-lista" aria-label={tr.lista}>
          {visibles.map(({ x, puesto, info }) => {
            const esPropia = x.pais.mercado === origen;
            const esMejor = puesto === 1;
            const delta = propia && propia.netoMensualEquivalente > 0 ? x.netoMensualEquivalente / propia.netoMensualEquivalente - 1 : 0;
            const redondo = Math.round(delta * 100);
            const variacion = esPropia ? tr.tuPais : redondo === 0 ? tr.igual : rellenar(redondo > 0 ? tr.mas : tr.menos, { pct: f.pct(Math.abs(delta)) });
            return (
              <li key={x.pais.mercado} data-m={x.pais.mercado} data-propia={esPropia || undefined} data-mejor={esMejor || undefined} data-salto={propiaFuera && esPropia ? "" : undefined}>
                <a className="cy-mundo-fila" href={info.href} aria-label={`${puesto}. ${info.nombre}: ${f.dinero(x.netoMensualLocal, x.pais.moneda)}, ${f.dinero(x.netoMensualEquivalente, monedaOrigen)}, ${variacion}. ${tr.abrir[x.pais.iso] ?? ""}`}>
                  <span className="cy-mundo-pos">{puesto}</span>
                  <span className="cy-mundo-pais">
                    <Bandera iso={x.pais.iso} ancho={28} />
                    <span className="cy-mundo-pais-texto">
                      <span className="cy-mundo-pais-nombre">{info.nombre}</span>
                      <span className="cy-mundo-etiqueta">{esPropia ? tr.tuPais : esMejor ? tr.mejor : f.dinero(x.netoMensualLocal, x.pais.moneda)}</span>
                    </span>
                  </span>
                  <span className="cy-mundo-local">{f.dinero(x.netoMensualLocal, x.pais.moneda)}</span>
                  <span className="cy-mundo-equiv">
                    <span className="cy-mundo-monto">{f.dinero(x.netoMensualEquivalente, monedaOrigen)}</span>
                    <span className="cy-mundo-barra">
                      <span style={{ transform: `scaleX(${Math.max(0.02, x.netoMensualEquivalente / max)})` }} />
                    </span>
                  </span>
                  {esPropia ? null : (
                    <span className="cy-mundo-delta" data-signo={redondo > 0 ? "+" : redondo < 0 ? "-" : "0"}>
                      {variacion}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="cy-mundo-vacio">{rellenar(tr.sinResultados, { q: q.trim() })}</p>
      )}

      {(recortar || todos) && !filtro ? (
        <button type="button" className="cy-mundo-ver" onClick={() => setTodos((v) => !v)} aria-expanded={todos}>
          {todos ? tr.verMenos : rellenar(tr.verTodos, { n: filtradas.length })}
          <svg viewBox="0 0 16 16" aria-hidden="true" data-abierto={todos || undefined}>
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}
    </section>
  );
}

// ─────────────────────────────── tarjeta ───────────────────────────────

export function TarjetaVista({
  t,
  fecha,
  tasa,
  frase,
  iso,
  cero,
  marca = MARCA_INTL,
}: {
  t: TextosCliente;
  fecha: string;
  tasa: string;
  frase: string;
  iso: string | null;
  cero: boolean;
  marca?: MarcaMundo;
}) {
  const [antes, despues] = cero ? [t.cero.tarjetaAntes, ""] : t.tarjeta.hasta;
  return (
    <div className="cy-tarjeta-historia" aria-hidden="true">
      <div className="cy-th-marca">
        <span className="cy-th-logo" />
        {marca.nombre}
      </div>
      <div className="cy-th-nucleo">
        <p className="cy-th-antes">{antes}</p>
        <p className="cy-th-fecha">{cero ? t.cero.dia : fecha}</p>
        {despues ? <p className="cy-th-antes">{despues}</p> : null}
        <p className="cy-th-tasa">{cero ? t.cero.motivo : rellenar(t.tarjeta.tasa, { pct: tasa })}</p>
      </div>
      <div className="cy-th-puntos" />
      <p className="cy-th-frase">
        {iso ? <Bandera iso={iso} ancho={22} /> : null}
        {frase}
      </p>
      <div className="cy-th-pie">
        <span>{t.tarjeta.yVos}</span>
        <span className="cy-th-url">{marca.dominio}</span>
      </div>
    </div>
  );
}

function Compartir({ t, url, imagen, texto, duelo, archivo }: { t: TextosCliente; url: string; imagen: string; texto: string; duelo: boolean; archivo: string }) {
  const { compartir, estado } = usarCompartir({
    origen: duelo ? "duelo" : "mundo",
    url,
    titulo: t.tarjeta.titulo2,
    texto,
    imagen,
  });
  const aviso = estado === "copiado" ? t.tarjeta.copiado : estado === "compartido" ? t.tarjeta.compartido : estado === "error" ? t.tarjeta.error : "";
  return (
    <div className="cy-mundo-acciones">
      <button type="button" className="cy-mundo-boton" onClick={compartir}>
        <span>{duelo ? t.tarjeta.compartirDuelo : t.tarjeta.compartir}</span>
        <span className="cy-mundo-boton-icono" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path d="M8 10.5V2.5M5 5.5l3-3 3 3M3.5 9v3.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <a className="cy-mundo-enlace" href={imagen} download={archivo}>
        {t.tarjeta.descargar}
      </a>
      <p className="cy-mundo-aviso" role="status" aria-live="polite">
        {aviso}
      </p>
    </div>
  );
}

// ─────────────────────────────── página ───────────────────────────────

export function MundoCliente({ grilla, textos: t, locale, anio, origenInicial, meses, base, carga: cargaInicial, marca = MARCA_INTL }: PropsMundo) {
  const f = usarFormatos(locale);
  const contrato = useMemo(() => expandir(grilla), [grilla]);
  const porMercado = useMemo(() => new Map(grilla.paises.map((p) => [p.mercado, p])), [grilla]);
  const ordenados = useMemo(() => [...grilla.paises].sort((a, b) => a.nombre.localeCompare(b.nombre, locale)), [grilla, locale]);
  const ejemploDe = (mercado: string) => dosCifras(EJEMPLO_PPA_MENSUAL * (porMercado.get(mercado)?.ppa ?? 1));
  // «Por mes» es el sueldo del recibo: el año son esas pagas de ley (13 con aguinaldo, 14 en España).
  const pagasDe = (mercado: string) => porMercado.get(mercado)?.pagas ?? 12;

  const [origen, setOrigen] = useState(origenInicial);
  const [periodo, setPeriodo] = useState<Periodo>("mes");
  const [texto, setTexto] = useState(() => f.numero(ejemploDe(origenInicial)));
  const [modo, setModo] = useState<"ejemplo" | "propio" | "traspaso">("ejemplo");
  const [amigo, setAmigo] = useState<CargaCompartida | null>(cargaInicial);
  const [vivo, setVivo] = useState(false);
  const idSueldo = useId();
  const idPais = useId();
  const idAyuda = useId();

  // Una sola vez al montar: el sueldo que la persona ya cargó en su calculadora (sessionStorage, nunca
  // la URL) y el `c` de un link viejo con ?c= en vez de /<c>.
  useEffect(() => {
    const tr = leerTraspaso();
    if (tr && porMercado.has(tr.mercado)) {
      setOrigen(tr.mercado);
      setPeriodo("mes");
      setTexto(f.numero(Math.round(tr.brutoAnual / pagasDe(tr.mercado))));
      setModo("traspaso");
    }
    if (!cargaInicial) {
      const c = decodificarCarga(new URLSearchParams(window.location.search).get("c"), grilla);
      if (c) setAmigo(c);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pais = porMercado.get(origen);
  const pagas = pagasDe(origen);
  const monto = parsear(texto, locale);
  const valido = monto !== null && monto > 0;
  const anual = valido ? (periodo === "anio" ? monto : monto * pagas) : 0;
  const filas = useMemo(() => (anual > 0 ? compararDesde(contrato, origen, anual) : []), [contrato, origen, anual]);
  const propia = filas.find((x) => x.pais.mercado === origen);
  // La tasa y el día que se ven son los de la carga que se comparte (redondeados sobre la franja del
  // sueldo): la tarjeta, el link y esta pantalla dicen lo mismo.
  const carga = useMemo(() => (anual > 0 ? cargaDesde(contrato, origen, anual) : null), [contrato, origen, anual]);
  const total = diasDelAnio(anio);
  const dia = carga ? diaDeCarga(carga, anio) : 0;
  const cero = carga?.tasa === 0;
  const fecha = dia > 0 ? f.fecha(fechaDelDia(dia, anio)) : "";
  const tasa = carga ? f.pct(carga.tasa / 100) : "";
  const mejorIso = carga?.mejor ?? null;
  const frase = carga && mejorIso && pais ? (mejorIso === pais.iso || carga.ventaja === 0 ? t.tarjeta.mejorPropio[pais.iso] : rellenar(t.tarjeta.mejor[mejorIso] ?? "", { pct: f.pct(carga.ventaja / 100) })) : "";
  const c = carga ? codificarCarga(carga) : null;
  const urlCompartir = c ? `${base}/${c}` : base;
  const imagen = `${base}/og?formato=historia${c ? `&c=${c}` : ""}`;

  // Otro país es otra moneda: el monto escrito ya no significa lo mismo, así que vuelve el ejemplo.
  const cambiarPais = (m: string) => {
    setVivo(true);
    setOrigen(m);
    setTexto(f.numero(periodo === "anio" ? ejemploDe(m) * pagasDe(m) : ejemploDe(m)));
    setModo("ejemplo");
  };
  const cambiarPeriodo = (p: Periodo) => {
    if (p === periodo) return;
    setVivo(true);
    setPeriodo(p);
    if (valido) setTexto(f.numero(Math.round(p === "anio" ? monto * pagas : monto / pagas)));
  };

  const simbolo = pais ? f.simbolo(pais.moneda) : "";
  const antes = pais ? f.simboloAntes(pais.moneda) : true;
  const amigoPais = amigo ? porMercado.get(amigo.mercado) : undefined;
  const diaAmigo = amigo ? diaDeCarga(amigo, anio) : 0;
  const fechaAmigo = diaAmigo > 0 ? f.fecha(fechaDelDia(diaAmigo, anio)) : "";
  const conDuelo = Boolean(amigo);
  const mostrarComparacion = conDuelo && modo !== "ejemplo" && carga;
  const notaPagas = periodo === "mes" && pagas > 12 ? t.form.pagas : "";
  const ayuda = !valido ? t.form.invalido : [modo === "ejemplo" ? t.form.ejemploAyuda : modo === "traspaso" ? t.form.propio : "", notaPagas].filter(Boolean).join(" ") || " ";
  const fechaDe = (d: number) => (d > 0 ? f.fecha(fechaDelDia(d, anio)) : t.cero.dia);

  return (
    <div className="cy-mundo-app" data-duelo={conDuelo || undefined} data-vivo={vivo || undefined}>
      {amigo ? (
        <section className="cy-duelo" aria-labelledby="cy-duelo-titulo">
          <p className="cy-duelo-titulo" id="cy-duelo-titulo">
            {amigoPais ? <Bandera iso={amigoPais.iso} ancho={26} /> : null}
            {diaAmigo > 0 ? (
              <span>
                {t.duelo.amigo[0]} <strong>{fechaAmigo}</strong>
                {t.duelo.amigo[1]}
              </span>
            ) : (
              <span>{t.cero.amigo}</span>
            )}
          </p>
          <p className="cy-duelo-pregunta">{t.duelo.yVos}</p>
          {mostrarComparacion ? (
            <div className="cy-duelo-tabla">
              {[
                { quien: t.duelo.vos, dia, tasa: carga.tasa, mejor: carga.mejor, propio: true },
                { quien: t.duelo.elAmigo, dia: diaAmigo, tasa: amigo.tasa, mejor: amigo.mejor, propio: false },
              ].map((p) => (
                <div key={p.quien} className="cy-duelo-lado" data-propio={p.propio || undefined} data-gana={(p.propio ? dia < diaAmigo : diaAmigo < dia) || undefined}>
                  <p className="cy-duelo-quien">{p.quien}</p>
                  <dl>
                    <div>
                      <dt>{t.duelo.dia}</dt>
                      <dd className="cy-duelo-fecha">{fechaDe(p.dia)}</dd>
                    </div>
                    <div>
                      <dt>{t.duelo.tasa}</dt>
                      <dd>{f.pct(p.tasa / 100)}</dd>
                    </div>
                    <div>
                      <dt>{t.duelo.mejorPais}</dt>
                      <dd className="cy-duelo-mejor">
                        <Bandera iso={p.mejor} ancho={20} />
                        {grilla.paises.find((x) => x.iso === p.mejor)?.nombre ?? p.mejor}
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
              <p className="cy-duelo-veredicto" aria-live="polite">
                {dia === diaAmigo
                  ? t.duelo.empate
                  : dia < diaAmigo
                    ? diaAmigo - dia === 1
                      ? t.duelo.antes1
                      : rellenar(t.duelo.antes, { n: diaAmigo - dia })
                    : dia - diaAmigo === 1
                      ? t.duelo.despues1
                      : rellenar(t.duelo.despues, { n: dia - diaAmigo })}
              </p>
            </div>
          ) : (
            <p className="cy-duelo-invitacion">{t.duelo.invitacion}</p>
          )}
        </section>
      ) : null}

      <section className="cy-mundo-panel" aria-label={t.form.titulo}>
        <div className="cy-mundo-panel-nucleo">
          <form className="cy-mundo-form" onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="cy-mundo-campo cy-mundo-campo-sueldo">
              <div className="cy-mundo-etiquetas">
                <label htmlFor={idSueldo}>{t.form.sueldo}</label>
                <div className="cy-mundo-segmento" role="radiogroup" aria-label={t.form.periodo} data-activo={periodo}>
                  {(["mes", "anio"] as const).map((p) => (
                    <button key={p} type="button" role="radio" aria-checked={periodo === p} onClick={() => cambiarPeriodo(p)}>
                      {p === "mes" ? t.form.mes : t.form.anio}
                    </button>
                  ))}
                </div>
              </div>
              <div className="cy-mundo-monto-campo" data-invalido={!valido || undefined}>
                {antes ? <span className="cy-mundo-simbolo">{simbolo}</span> : null}
                <input
                  id={idSueldo}
                  inputMode="decimal"
                  autoComplete="off"
                  enterKeyHint="done"
                  value={texto}
                  aria-describedby={idAyuda}
                  aria-invalid={!valido || undefined}
                  onFocus={(e) => {
                    if (modo === "ejemplo") e.currentTarget.select();
                  }}
                  onChange={(e) => {
                    setTexto(e.target.value);
                    setModo("propio");
                    setVivo(true);
                  }}
                  onBlur={() => {
                    if (valido) setTexto(f.numero(Math.round(monto)));
                  }}
                />
                {!antes ? <span className="cy-mundo-simbolo">{simbolo}</span> : null}
                {modo === "ejemplo" ? <span className="cy-mundo-ejemplo">{t.form.ejemplo}</span> : null}
              </div>
              <p className="cy-mundo-ayuda" id={idAyuda} data-error={!valido || undefined}>
                {ayuda}
              </p>
            </div>
            <div className="cy-mundo-campo">
              <label className="cy-mundo-etiqueta-campo" htmlFor={idPais}>
                {t.form.pais}
              </label>
              <div className="cy-mundo-select">
                {pais ? <Bandera iso={pais.iso} ancho={22} /> : null}
                <select id={idPais} value={origen} onChange={(e) => cambiarPais(e.target.value)}>
                  {ordenados.map((p) => (
                    <option key={p.mercado} value={p.mercado}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </form>

          <div className="cy-mundo-resultado">
            <p className="cy-mundo-antes">{cero ? t.cero.heroeAntes : t.heroe.hasta[0]}</p>
            <p className="cy-mundo-fecha" key={cero ? "cero" : fecha}>
              {propia && carga ? (cero ? t.cero.dia : fecha) : " "}
            </p>
            {cero ? <p className="cy-mundo-antes">{t.cero.motivo}</p> : t.heroe.hasta[1] ? <p className="cy-mundo-antes">{t.heroe.hasta[1]}</p> : null}
            {propia && carga ? (
              <div className="cy-mundo-cifras">
                <div>
                  <p className="cy-mundo-cifra" aria-describedby={`${idAyuda}-t`}>
                    {tasa}
                  </p>
                  <p className="cy-mundo-cifra-texto" id={`${idAyuda}-t`}>
                    {t.duelo.tasa}
                  </p>
                </div>
                <div>
                  <p className="cy-mundo-cifra">{f.dinero(propia.netoMensualLocal, propia.pais.moneda)}</p>
                  <p className="cy-mundo-cifra-texto">
                    {t.heroe.enMano} · {t.heroe.porMes}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="cy-mundo-anio-caja">
            <Anio anio={anio} dia={dia} meses={meses} etiqueta={rellenar(t.heroe.anio, { anio, n: dia, total })} />
            <p className="cy-mundo-anio-pie">
              <span className="cy-mundo-leyenda" data-d="e" />
              {rellenar(t.heroe.dias, { n: dia, total })}
              <span className="cy-mundo-resto">{t.heroe.resto}</span>
            </p>
          </div>
        </div>
      </section>

      {filas.length ? <Ranking filas={filas} origen={origen} t={t} f={f} monedaOrigen={pais?.moneda ?? "USD"} porMercado={porMercado} /> : null}
      {modo !== "ejemplo" && filas.length > 1 && filas[0].pais.mercado !== origen ? <Afiliados locale={locale} mejor={filas[0].pais.iso} /> : null}
      {pais && filas.length ? <AporteSueldo mercado={origen} moneda={pais.moneda} ppa={pais.ppa} nombrePais={pais.nombre} locale={locale} base={base} bruto={modo !== "ejemplo" && valido ? Math.round(anual / pagas) : null} /> : null}

      {carga && pais ? (
        <section className="cy-mundo-compartir" aria-labelledby="cy-mundo-compartir-titulo">
          <div className="cy-mundo-compartir-texto">
            <h2 id="cy-mundo-compartir-titulo" className="cy-mundo-h2">
              {t.tarjeta.titulo}
            </h2>
            <p className="cy-mundo-bajada">{t.tarjeta.bajada}</p>
            <Compartir t={t} url={urlCompartir} imagen={imagen} texto={cero ? t.cero.texto : rellenar(t.tarjeta.texto, { fecha })} duelo={conDuelo} archivo={`${marca.dominio.split(".")[0]}.png`} />
          </div>
          <div className="cy-mundo-compartir-vista">
            <TarjetaVista t={t} fecha={fecha} tasa={tasa} frase={frase} iso={mejorIso} cero={cero} marca={marca} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
