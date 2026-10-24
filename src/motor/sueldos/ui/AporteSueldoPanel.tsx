"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { usarCompartir } from "../../compartir";
import { textosSueldos, type TextosSueldos } from "../../i18n/sueldos";
import type { Trato } from "../../tipos";
import { EXPERIENCIAS, OCUPACIONES, type Experiencia, type Ocupacion } from "../catalogo";
import { percentilAproximado } from "../estadistica";
import { dentroDeLimites, dosCifras } from "../reglas";
import { API_SUELDOS } from "../rutas";
import { TRAMOS, type CeldaPublica, type OcupacionPublica, type RespuestaAgregados, type RespuestaAporte, type TramoPublicado } from "../tipos";
import type { PropsAporteSueldo } from "./AporteSueldo";
import { dinero, edicionDeBase, enFrase, idiomaDeLocale, lugares, nuevoId, porcentaje, recordarAporte, rellenar, yaAporto } from "./comun";
import { BarraRango, TramoProgreso } from "./piezas";

// Tope de espera donde el navegador lo soporta (AbortSignal.any y timeout faltan en Safari viejo: ahí
// queda solo la señal propia, o ninguna).
function conTope(propia: AbortSignal | undefined, ms: number): AbortSignal | undefined {
  const s = AbortSignal as typeof AbortSignal & { any?: (l: AbortSignal[]) => AbortSignal; timeout?: (ms: number) => AbortSignal };
  if (!s.timeout) return propia;
  if (!propia) return s.timeout(ms);
  return s.any ? s.any([propia, s.timeout(ms)]) : propia;
}

type Envio = "listo" | "enviando" | "ok" | "error";
type Cargado = { mercado: string; resp: RespuestaAgregados };

function Compartir({ t, url, titulo, texto }: { t: TextosSueldos; url: string; titulo: string; texto: string }) {
  const { compartir, estado } = usarCompartir({ origen: "sueldos", url, titulo, texto });
  const aviso = estado === "copiado" ? t.aporte.copiado : estado === "compartido" ? t.aporte.compartido : estado === "error" ? t.aporte.errorCompartir : "";
  return (
    <div className="cy-su-compartir">
      <button type="button" className="cy-su-boton cy-su-boton-claro" onClick={compartir}>
        <span>{t.aporte.compartir}</span>
        <span className="cy-su-boton-icono" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path d="M8 10.5V2.5M5 5.5l3-3 3 3M3.5 9v3.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <p className="cy-su-aviso" role="status" aria-live="polite">
        {aviso}
      </p>
    </div>
  );
}

export default function AporteSueldoPanel({ mercado, moneda, ppa, nombrePais, locale, base, bruto }: PropsAporteSueldo) {
  const idioma = idiomaDeLocale(locale);
  const edicion = useMemo(() => edicionDeBase(base), [base]);
  const [cargado, setCargado] = useState<Cargado | null>(null);
  const [trato, setTrato] = useState<Trato | null>(null);
  const [ocupacion, setOcupacion] = useState<Ocupacion | "">("");
  const [experiencia, setExperiencia] = useState<Experiencia | null>(null);
  const [acepta, setAcepta] = useState(false);
  const [envio, setEnvio] = useState<Envio>("listo");
  const [ya, setYa] = useState(false);
  const idEnvio = useRef<string | null>(null);
  const idOcupacion = useId();
  const idTitulo = useId();
  const idConsent = useId();

  useEffect(() => {
    setYa(yaAporto(mercado));
    setEnvio("listo");
    idEnvio.current = null;
  }, [mercado]);

  // Los agregados vienen del CDN (una hora): casi siempre es instantáneo. Sin respuesta, el bloque no
  // se muestra y la página sigue igual.
  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`${API_SUELDOS}/${encodeURIComponent(mercado)}?e=${encodeURIComponent(edicion)}`, { signal: conTope(ctrl.signal, 8000) })
      .then((r) => r.json() as Promise<RespuestaAgregados>)
      .then((resp) => {
        setCargado({ mercado, resp });
        if (resp.ok) setTrato(resp.trato);
      })
      .catch(() => {
        if (!ctrl.signal.aborted) setCargado({ mercado, resp: { ok: false } });
      });
    return () => ctrl.abort();
  }, [mercado, edicion]);

  const t = useMemo(() => (trato ? textosSueldos(idioma, trato, locale) : null), [idioma, trato, locale]);
  const ordenadas = useMemo(() => (t ? [...OCUPACIONES].sort((a, b) => t.ocupaciones[a].localeCompare(t.ocupaciones[b], locale)) : []), [t, locale]);

  // Nunca hubo una respuesta buena: no hay bloque. Una mala después de una buena (otro país) deja el
  // bloque con el aviso de carga y sin envío.
  if (!t || !trato) return null;
  const vigente = cargado?.mercado === mercado && cargado.resp.ok ? cargado.resp : null;
  const cargando = !cargado || cargado.mercado !== mercado;
  if (!vigente && !cargando) return null;

  const k = vigente?.k ?? 10;
  const { enPais } = lugares(idioma, nombrePais);
  const nombreOcupacion = ocupacion ? enFrase(t.ocupaciones[ocupacion], idioma) : "";
  // Siempre la foto publicada (cacheada): el aporte propio entra recién en la del día siguiente, así que
  // la posición se calcula acá contra lo que ya ve cualquiera.
  const celda: OcupacionPublica | undefined = ocupacion ? vigente?.datos.ocupaciones[ocupacion] : undefined;
  const celdaExp: CeldaPublica | undefined = experiencia ? celda?.porExperiencia[experiencia] : undefined;
  const mostrada = celdaExp?.cifras ? celdaExp.cifras : (celda?.cifras ?? null);
  const soloOcupacion = Boolean(experiencia && celda?.cifras && !celdaExp?.cifras);
  const pais = { mercado, moneda, ppa };
  const brutoRedondo = bruto !== null ? dosCifras(bruto) : null;
  const valido = brutoRedondo !== null && dentroDeLimites(brutoRedondo, pais);
  const puede = Boolean(vigente && ocupacion && experiencia && acepta && valido && !ya && envio !== "enviando");
  const pagina = vigente?.pagina ?? "";
  const plata = (n: number) => dinero(n, moneda, locale);

  const enviar = async () => {
    if (!puede || !ocupacion || !experiencia || bruto === null) return;
    const o = ocupacion;
    // Optimista: el «gracias» se ve al tocar; si el servidor dice que no, vuelve al formulario con el aviso.
    setEnvio("ok");
    idEnvio.current ??= nuevoId();
    try {
      const r = await fetch(API_SUELDOS, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: idEnvio.current, m: mercado, o, e: experiencia, b: bruto, ok: true }),
        signal: conTope(undefined, 10_000),
      });
      const x = (await r.json()) as RespuestaAporte;
      if (!x.ok) throw new Error("rechazo");
      idEnvio.current = null;
      recordarAporte(mercado);
      setYa(true);
      setEnvio("ok");
    } catch {
      setEnvio("error");
    }
  };

  // Atajos mientras no hay ocupación elegida: las que ya tienen datos, las de más aportes primero (por
  // tramo; dentro del mismo tramo, en el orden del idioma).
  const peso = (o: Ocupacion) => TRAMOS.indexOf(vigente?.datos.ocupaciones[o]?.tramo ?? "lejos");
  const conDatos = vigente ? ordenadas.filter((o) => vigente.datos.ocupaciones[o]?.cifras).sort((a, b) => peso(b) - peso(a)).slice(0, 8) : [];
  const tramoCelda = celda && !celda.cifras && (celda.tramo === "lejos" || celda.tramo === "cerca") ? celda.tramo : null;
  const textoTramo = rellenar(tramoCelda === "cerca" ? t.aporte.cerca : t.aporte.lejos, { ocupacion: nombreOcupacion, enPais, pais: nombrePais });

  return (
    <section className="cy-su" aria-labelledby={idTitulo} data-cargando={cargando || undefined}>
      <div className="cy-su-cabeza">
        <p className="cy-su-ceja">
          <span className="cy-punto-vivo" aria-hidden="true" />
          {t.aporte.ceja}
        </p>
        <h2 id={idTitulo} className="cy-mundo-h2">
          {rellenar(t.aporte.titulo, { enPais, pais: nombrePais })}
        </h2>
        <p className="cy-mundo-bajada">{rellenar(t.aporte.bajada, { k })}</p>
      </div>

      <div className="cy-su-marco">
        <div className="cy-su-nucleo">
          <div className="cy-su-form">
            <div className="cy-su-campo">
              <label className="cy-su-etiqueta" htmlFor={idOcupacion}>
                {t.aporte.ocupacion}
              </label>
              <div className="cy-su-select">
                <select id={idOcupacion} value={ocupacion} onChange={(e) => setOcupacion(e.target.value as Ocupacion | "")}>
                  <option value="">{t.aporte.elegir}</option>
                  {ordenadas.map((o) => (
                    <option key={o} value={o}>
                      {t.ocupaciones[o]}
                    </option>
                  ))}
                </select>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <fieldset className="cy-su-campo cy-su-experiencias">
              <legend className="cy-su-etiqueta">{t.aporte.experiencia}</legend>
              <div className="cy-su-opciones">
                {EXPERIENCIAS.map((e) => (
                  <label key={e} className="cy-su-opcion">
                    <input type="radio" name={`${idOcupacion}-exp`} value={e} checked={experiencia === e} onChange={() => setExperiencia(e)} />
                    <span>{t.experienciasCortas[e]}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="cy-su-sueldo">
              <p className="cy-su-etiqueta">{t.aporte.sueldo}</p>
              {bruto !== null ? (
                <>
                  <p className="cy-su-sueldo-monto">{plata(bruto)}</p>
                  <p className="cy-su-nota">{valido ? t.aporte.sueldoNota : t.aporte.fueraDeRango}</p>
                </>
              ) : (
                <p className="cy-su-nota">{t.aporte.sinSueldo}</p>
              )}
            </div>
          </div>

          <div className="cy-su-resultado" aria-live="polite">
            {cargando ? (
              <p className="cy-su-nota cy-su-cargando">{t.aporte.cargando}</p>
            ) : !ocupacion ? (
              <div className="cy-su-espera">
                {conDatos.length ? (
                  <>
                    <p className="cy-su-etiqueta-clara">{t.aporte.conDatos}</p>
                    <div className="cy-su-atajos">
                      {conDatos.map((o) => (
                        <button key={o} type="button" className="cy-su-atajo" onClick={() => setOcupacion(o)}>
                          {t.ocupaciones[o]}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <TramoProgreso tramo={null} etiqueta="" />
                    <p className="cy-su-faltan-texto">{t.aporte.elegir}</p>
                  </>
                )}
              </div>
            ) : mostrada ? (
              <div className="cy-su-cifras" key={`${ocupacion}-${experiencia ?? ""}`}>
                <p className="cy-su-etiqueta-clara">{t.aporte.mediana}</p>
                <p className="cy-su-mediana">{plata(mostrada.p50)}</p>
                <BarraRango p25={mostrada.p25} p50={mostrada.p50} p75={mostrada.p75} propio={brutoRedondo && valido ? brutoRedondo : null} />
                <p className="cy-su-rango">{rellenar(t.aporte.rango, { p25: plata(mostrada.p25), p75: plata(mostrada.p75) })}</p>
                {brutoRedondo && valido ? (
                  <p className="cy-su-posicion">
                    {rellenar(t.aporte.posicion, { pct: porcentaje(percentilAproximado(brutoRedondo, mostrada), locale) })}
                    <span className="cy-su-nota-clara">{t.aporte.posicionNota}</span>
                  </p>
                ) : null}
                <p className="cy-su-nota-clara">
                  {soloOcupacion && experiencia
                    ? rellenar(t.aporte.soloOcupacion, { experiencia: t.experiencias[experiencia] })
                    : rellenar(t.aporte.basadoEn, { n: t.tramos[(celdaExp?.cifras ? celdaExp.tramo : celda?.tramo) as TramoPublicado] ?? "" })}
                </p>
              </div>
            ) : (
              <div className="cy-su-faltan" key={ocupacion}>
                <TramoProgreso tramo={tramoCelda} etiqueta={tramoCelda ? textoTramo : ""} />
                <p className="cy-su-faltan-texto">
                  {tramoCelda ? textoTramo : rellenar(t.aporte.nadie, { ocupacion: nombreOcupacion, enPais, pais: nombrePais, k })}
                </p>
                <p className="cy-su-nota-clara">{t.aporte.compartirPedido}</p>
                {pagina ? (
                  <Compartir
                    t={t}
                    url={pagina}
                    titulo={rellenar(t.aporte.compartirTitulo, { enPais, pais: nombrePais })}
                    texto={rellenar(t.aporte.compartirTexto, { ocupacion: nombreOcupacion, enPais, pais: nombrePais })}
                  />
                ) : null}
              </div>
            )}
          </div>

          <div className="cy-su-aporte">
            {envio === "ok" ? (
              <p className="cy-su-listo" role="status">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="m5 10.5 3.2 3.2L15 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.aporte.gracias}
              </p>
            ) : ya ? (
              <p className="cy-su-nota">{rellenar(t.aporte.yaAportaste, { enPais, pais: nombrePais })}</p>
            ) : bruto !== null && valido ? (
              <>
                <label className="cy-su-consent" htmlFor={idConsent}>
                  <input id={idConsent} type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} />
                  <span className="cy-su-consent-caja" aria-hidden="true">
                    <svg viewBox="0 0 16 16">
                      <path d="m3.5 8.5 3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="cy-su-consent-texto">
                    <strong>{t.aporte.consentimiento}</strong>
                    <span>
                      {rellenar(t.aporte.consentimientoNota, { k })}{" "}
                      <a href="/privacidad" className="cy-su-enlace">
                        {t.aporte.privacidad}
                      </a>
                    </span>
                  </span>
                </label>
                <button type="button" className="cy-su-boton" onClick={enviar} disabled={!puede} aria-disabled={!puede}>
                  <span>{envio === "enviando" ? t.aporte.enviando : t.aporte.enviar}</span>
                  <span className="cy-su-boton-icono" aria-hidden="true">
                    <svg viewBox="0 0 16 16">
                      <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                {envio === "error" ? (
                  <p className="cy-su-error" role="alert">
                    {t.aporte.error}
                  </p>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>

      {pagina ? (
        <a className="cy-mundo-enlace cy-su-ver" href={pagina}>
          {rellenar(t.aporte.verPagina, { enPais, pais: nombrePais })}
        </a>
      ) : null}
    </section>
  );
}
