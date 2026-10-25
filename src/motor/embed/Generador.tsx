"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { codigoParaPegar, MARCA_NOMBRE, rutaEmbed } from "./codigo";
import { ALTO_INICIAL } from "./mensajes";
import { ACENTO_BASE, ACENTOS, ANCHOS, TEMA_BASE, TEMAS, type AnchoId, type TemaEmbed } from "./opciones";

export interface TextosGenerador {
  calculadora: string;
  buscar: string;
  sinResultados: string;
  tema: string;
  claro: string;
  oscuro: string;
  ancho: string;
  anchoCompleto: string;
  acento: string;
  colores: readonly string[];
  credito: string;
  vistaPrevia: string;
  codigo: string;
  copiar: string;
  copiado: string;
  ayudaScript: string;
  nota: string;
  verTodas: string;
  marca: string;
  // Con {{nombre}} donde va el de la calculadora (las funciones del diccionario no viajan al navegador).
  tituloIframe: string;
}

export interface OpcionCalculadora {
  slug: string;
  titulo: string;
}

const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: false } as const;

const Lupa = () => (
  <svg {...base} width="18" height="18">
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </svg>
);
const Copiar = () => (
  <svg {...base} width="18" height="18">
    <rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
    <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
  </svg>
);
const Tilde = ({ tamano = 16 }: { tamano?: number }) => (
  <svg {...base} width={tamano} height={tamano} strokeWidth={2}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

const sinTildes = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/ı/g, "i");

export function Generador({
  mercado,
  origen,
  calculadoras,
  inicial,
  hrefPais,
  t,
}: {
  mercado: string;
  origen: string;
  calculadoras: readonly OpcionCalculadora[];
  inicial: string;
  hrefPais: string;
  t: TextosGenerador;
}) {
  const [slug, setSlug] = useState(inicial);
  const [tema, setTema] = useState<TemaEmbed>(TEMA_BASE);
  const [ancho, setAncho] = useState<AnchoId>("completo");
  const [acento, setAcento] = useState<string>(ACENTO_BASE);
  const [credito, setCredito] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [listo, setListo] = useState(false);
  const [cargada, setCargada] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const lista = useRef<HTMLUListElement>(null);
  const area = useRef<HTMLTextAreaElement>(null);
  const temporizador = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // La calculadora que viene en ?c= (el link «Insertar en tu sitio» de cada calculadora). La página
  // es estática, así que se lee acá y la vista previa espera a saber cuál es para no cargar dos.
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("c");
    if (c && calculadoras.some((x) => x.slug === c)) setSlug(c);
    setListo(true);
  }, [calculadoras]);

  useEffect(() => {
    if (!listo) return;
    window.history.replaceState(null, "", `?c=${slug}`);
  }, [listo, slug]);

  // El mismo script que lleva el código para pegar: lo que se ve acá es lo que se instala.
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "/embed.js";
    s.async = true;
    document.body.appendChild(s);
    return () => s.remove();
  }, []);

  // Solo al llegar: después, mover la lista mientras la persona la usa molesta.
  useEffect(() => {
    if (!listo || !lista.current) return;
    const marcada = lista.current.querySelector<HTMLElement>("input:checked")?.closest("li");
    if (marcada) lista.current.scrollTop = Math.max(0, marcada.offsetTop - lista.current.clientHeight / 2 + marcada.clientHeight / 2);
  }, [listo]);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  const elegida = calculadoras.find((c) => c.slug === slug) ?? calculadoras[0];
  const acentoUrl = acento === ACENTO_BASE ? null : acento;
  const src = rutaEmbed(mercado, elegida.slug, { tema, acento: acentoUrl });
  const anchoPx = ANCHOS.find((a) => a.id === ancho)?.px ?? null;
  const tituloIframe = t.tituloIframe.replace(MARCA_NOMBRE, elegida.titulo);

  useEffect(() => setCargada(false), [src]);

  const codigo = useMemo(
    () =>
      codigoParaPegar({
        origen,
        mercado,
        slug: elegida.slug,
        tema,
        acento: acentoUrl,
        anchoPx,
        tituloIframe,
        credito: credito ? { texto: t.marca, href: `${origen}/${mercado}/${elegida.slug}` } : null,
      }),
    [origen, mercado, elegida.slug, tema, acentoUrl, anchoPx, tituloIframe, credito, t.marca],
  );

  const visibles = useMemo(() => {
    const q = sinTildes(filtro.trim());
    return q ? calculadoras.filter((c) => sinTildes(c.titulo).includes(q)) : calculadoras;
  }, [calculadoras, filtro]);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(codigo);
    } catch {
      area.current?.select();
      document.execCommand("copy");
    }
    setCopiado(true);
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setCopiado(false), 2400);
  }

  const nombresTema: Record<TemaEmbed, string> = { claro: t.claro, oscuro: t.oscuro };

  return (
    <div className="cye-gen">
      <div className="cye-panel cye-controles">
        <fieldset className="cy-campo">
          <legend className="cy-campo-etiqueta">{t.calculadora}</legend>
          <div className="cy-entrada cye-buscar" data-moneda>
            <span className="cy-entrada-afijo" aria-hidden="true">
              <Lupa />
            </span>
            <input type="search" value={filtro} onChange={(ev) => setFiltro(ev.target.value)} placeholder={t.buscar} aria-label={t.buscar} autoComplete="off" enterKeyHint="search" />
          </div>
          <ul className="cye-lista" ref={lista}>
            {visibles.map((c) => (
              <li key={c.slug}>
                <label className="cye-fila">
                  <input type="radio" name="cye-calculadora" value={c.slug} checked={c.slug === elegida.slug} onChange={() => setSlug(c.slug)} />
                  <span className="cye-fila-texto">{c.titulo}</span>
                  <span className="cye-fila-tilde">
                    <Tilde />
                  </span>
                </label>
              </li>
            ))}
          </ul>
          {visibles.length ? null : (
            <p className="cy-campo-ayuda" role="status">
              {t.sinResultados}
            </p>
          )}
        </fieldset>

        <fieldset className="cy-campo">
          <legend className="cy-campo-etiqueta">{t.tema}</legend>
          <div className="cy-segmentado" style={{ "--n": TEMAS.length } as CSSProperties}>
            {TEMAS.map((id) => (
              <label key={id} className="cy-segmento">
                <input type="radio" name="cye-tema" value={id} checked={tema === id} onChange={() => setTema(id)} />
                <span>{nombresTema[id]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="cy-campo">
          <legend className="cy-campo-etiqueta">{t.ancho}</legend>
          <div className="cy-segmentado cye-anchos" style={{ "--n": ANCHOS.length } as CSSProperties}>
            {ANCHOS.map((a) => (
              <label key={a.id} className="cy-segmento">
                <input type="radio" name="cye-ancho" value={a.id} checked={ancho === a.id} onChange={() => setAncho(a.id)} />
                <span>{a.px ? `${a.px} px` : t.anchoCompleto}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="cy-campo">
          <legend className="cy-campo-etiqueta">{t.acento}</legend>
          <div className="cye-muestras">
            {ACENTOS.map((hex, i) => (
              <label key={hex} className="cye-muestra" style={{ "--c": hex } as CSSProperties}>
                <input type="radio" name="cye-acento" value={hex} checked={acento === hex} onChange={() => setAcento(hex)} aria-label={t.colores[i]} />
                <span className="cye-muestra-color">
                  <Tilde tamano={14} />
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="cy-casilla">
          <input type="checkbox" checked={credito} onChange={(ev) => setCredito(ev.target.checked)} />
          <span>{t.credito}</span>
        </label>
      </div>

      <div className="cye-salida">
        <section className="cye-panel" aria-labelledby="cye-vista">
          <h2 id="cye-vista" className="cye-rotulo">
            {t.vistaPrevia}
          </h2>
          <div className="cye-escenario">
            <div className="cye-marco" style={{ maxWidth: anchoPx ? `${anchoPx}px` : "100%" }}>
              {listo ? (
                <iframe
                  key={elegida.slug}
                  src={src}
                  title={tituloIframe}
                  width="100%"
                  height={ALTO_INICIAL}
                  className="cye-iframe"
                  data-cargada={cargada || undefined}
                  onLoad={() => setCargada(true)}
                />
              ) : (
                <div className="cye-esqueleto" style={{ height: ALTO_INICIAL }} aria-hidden="true" />
              )}
            </div>
          </div>
        </section>

        <section className="cye-panel" aria-labelledby="cye-codigo">
          <h2 id="cye-codigo" className="cye-rotulo">
            {t.codigo}
          </h2>
          <textarea ref={area} className="cye-codigo" readOnly rows={7} wrap="off" spellCheck={false} value={codigo} onFocus={(ev) => ev.currentTarget.select()} aria-labelledby="cye-codigo" />
          <div className="cye-acciones">
            <button type="button" className="cy-boton cy-boton-principal" onClick={copiar}>
              <span>{t.copiar}</span>
              <span className="cy-boton-icono">{copiado ? <Tilde tamano={18} /> : <Copiar />}</span>
            </button>
            <span className="cye-estado" role="status" aria-live="polite">
              {copiado ? t.copiado : ""}
            </span>
          </div>
          <p className="cy-campo-ayuda">{t.ayudaScript}</p>
          <p className="cy-campo-ayuda">{t.nota}</p>
        </section>

        <a className="cy-enlace-flecha" href={hrefPais}>
          {t.verTodas}
          <svg {...base} width="16" height="16">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
