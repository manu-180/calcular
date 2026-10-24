"use client";

import { useCallback, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { usarCompartir } from "../../compartir";
import { altosFranja } from "../franja";
import type { CambioVista, FilaVista, VarianteVista, VistaRanking } from "../vista";

// La tabla del ranking con su selector de sueldo, el panel del país de la edición y el kit de prensa.
// Llega todo formateado del servidor (vista.ts): acá no se calcula ni se formatea nada, solo se elige
// cuál de las variantes ya pintadas se muestra. Cambiar de variante reordena las filas con FLIP
// (transform, nada de layout) y sin movimiento con prefers-reduced-motion.

export interface TextosRankingCliente {
  puesto: string;
  pais: string;
  metrica: string;
  carga: string;
  unidad: string | null;
  cambio: string | null;
  de: string;
  edicion: string;
  lider: string;
  kit: { titulo: string; bajada: string; compartir: string; descargar: string; copiar: string; copiado: string; enlace: string; compartido: string; error: string; alt: string };
}

export interface PropsRanking {
  vista: VistaRanking;
  textos: TextosRankingCliente;
}

const ESPERA_AVISO_MS = 2600;

function Cambio({ c }: { c: CambioVista | null }) {
  if (!c) return null;
  return (
    <span className="cy-rk-cambio" data-tipo={c.tipo} title={c.texto}>
      <span aria-hidden="true">
        {c.tipo === "sube" ? (
          <svg viewBox="0 0 10 10">
            <path d="M5 2l3.5 5h-7z" />
          </svg>
        ) : c.tipo === "baja" ? (
          <svg viewBox="0 0 10 10">
            <path d="M5 8L1.5 3h7z" />
          </svg>
        ) : null}
        {c.tipo === "nuevo" ? "•" : c.corto.replace(/^[+−]/, "")}
      </span>
      <span className="cy-rk-lector">{c.texto}</span>
    </span>
  );
}

function Bandera({ iso, tam = 18 }: { iso: string; tam?: number }) {
  return <img className="cy-bandera" src={`/banderas/${iso.toLowerCase()}.svg`} width={tam} height={Math.round((tam * 2) / 3)} alt="" loading="lazy" decoding="async" />;
}

function Franja({ filas }: { filas: readonly FilaVista[] }) {
  const h = altosFranja(filas);
  return (
    <div className="cy-rk-franja" aria-hidden="true">
      {filas.map((f, i) => (
        <i key={f.iso} data-propia={f.propia ? "" : undefined} style={{ "--h": h[i] } as CSSProperties} />
      ))}
    </div>
  );
}

async function copiarTexto(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = texto;
      area.setAttribute("readonly", "");
      area.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

function Kit({ v, vista, t }: { v: VarianteVista; vista: VistaRanking; t: TextosRankingCliente }) {
  const { compartir, estado } = usarCompartir({ origen: "ranking", url: vista.url, titulo: vista.titulo, texto: v.texto, imagen: v.og });
  const [cita, setCita] = useState<"listo" | "copiado" | "error">("listo");
  const reloj = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const copiar = useCallback(async () => {
    const ok = await copiarTexto(v.cita);
    clearTimeout(reloj.current);
    setCita(ok ? "copiado" : "error");
    reloj.current = setTimeout(() => setCita("listo"), ESPERA_AVISO_MS);
  }, [v.cita]);
  const aviso =
    cita === "copiado" ? t.kit.copiado : cita === "error" ? t.kit.error : estado === "copiado" ? t.kit.enlace : estado === "compartido" ? t.kit.compartido : estado === "error" ? t.kit.error : "";
  const nombreArchivo = `calcularya-${vista.id}-${v.id}.png`;

  return (
    <section className="cy-rk-kit" aria-labelledby="cy-rk-kit-titulo">
      <div className="cy-rk-kit-cabeza">
        <h2 id="cy-rk-kit-titulo" className="cy-rk-h3">
          {t.kit.titulo}
        </h2>
        <p>{t.kit.bajada}</p>
      </div>
      <blockquote className="cy-rk-cita" cite={vista.url}>
        <p>{v.cita}</p>
      </blockquote>
      <div className="cy-rk-acciones">
        <button type="button" className="cy-rk-boton cy-rk-boton-principal" onClick={copiar} data-estado={cita}>
          <span>{cita === "copiado" ? t.kit.copiado : t.kit.copiar}</span>
          <span className="cy-rk-boton-icono" aria-hidden="true">
            {cita === "copiado" ? (
              <svg viewBox="0 0 16 16">
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16">
                <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
                <path d="M10.5 3.5v-.5a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.5" />
              </svg>
            )}
          </span>
        </button>
        <button type="button" className="cy-rk-boton" onClick={compartir}>
          <span>{t.kit.compartir}</span>
          <span className="cy-rk-boton-icono" aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M8 10.5V2.5M5 5.5l3-3 3 3M3.5 9v3.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9" />
            </svg>
          </span>
        </button>
        <a className="cy-rk-boton" href={v.descarga} download={nombreArchivo}>
          <span>{t.kit.descargar}</span>
          <span className="cy-rk-boton-icono" aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M8 2.5v8M5 7.5l3 3 3-3M3 13.5h10" />
            </svg>
          </span>
        </a>
      </div>
      <p className="cy-rk-aviso" role="status" aria-live="polite">
        {aviso}
      </p>
      <figure className="cy-rk-vista-previa">
        <img src={v.og} width={1200} height={630} alt={t.kit.alt} loading="lazy" decoding="async" />
      </figure>
    </section>
  );
}

function reducido(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function RankingCliente({ vista, textos: t }: PropsRanking) {
  const [indice, setIndice] = useState(vista.porDefecto);
  const v = vista.variantes[indice] ?? vista.variantes[0];
  const cuerpo = useRef<HTMLTableSectionElement>(null);
  const antes = useRef<Map<string, number> | null>(null);
  const idCaption = useId();

  const elegir = (i: number) => {
    if (i === indice) return;
    if (!reducido() && cuerpo.current) {
      const pos = new Map<string, number>();
      for (const fila of cuerpo.current.querySelectorAll<HTMLTableRowElement>("tr[data-iso]")) pos.set(fila.dataset.iso!, fila.getBoundingClientRect().top);
      antes.current = pos;
    }
    setIndice(i);
  };

  // FLIP: cada fila arranca donde estaba y se desliza a su lugar nuevo. Solo transform.
  useLayoutEffect(() => {
    const previas = antes.current;
    antes.current = null;
    if (!previas || !cuerpo.current) return;
    for (const fila of cuerpo.current.querySelectorAll<HTMLTableRowElement>("tr[data-iso]")) {
      const desde = previas.get(fila.dataset.iso!);
      if (desde === undefined) continue;
      const dy = desde - fila.getBoundingClientRect().top;
      if (Math.abs(dy) < 1) continue;
      fila.animate([{ transform: `translateY(${dy}px)` }, { transform: "translateY(0)" }], { duration: Math.min(620, 320 + Math.abs(dy) * 0.12), easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
    }
  }, [indice]);

  const d = v.destacado;

  return (
    <div className="cy-rk-app">
      {vista.variantes.length > 1 ? (
        <div className="cy-rk-selector" role="group" aria-label={vista.tituloVariantes}>
          <p className="cy-rk-selector-titulo" aria-hidden="true">
            {vista.tituloVariantes}
          </p>
          <div className="cy-rk-opciones">
            {vista.variantes.map((x, i) => (
              <button key={x.id} type="button" className="cy-rk-opcion" aria-pressed={i === indice} onClick={() => elegir(i)}>
                <span className="cy-rk-opcion-nombre">{x.etiqueta}</span>
                <span className="cy-rk-opcion-sub">{x.sub}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <section className="cy-rk-panel" aria-label={d.nombre}>
        <div className="cy-rk-panel-nucleo">
          <div className="cy-rk-panel-texto">
            <p className="cy-rk-panel-ceja">
              <Bandera iso={d.iso} tam={24} />
              <span>{v.esPropia ? t.edicion : t.lider}</span>
            </p>
            <p className="cy-rk-puesto" aria-hidden="true">
              <span className="cy-rk-puesto-n">{d.puesto}</span>
              <span className="cy-rk-puesto-de">{t.de}</span>
            </p>
            <p className="cy-rk-frase" aria-live="polite">
              {v.frase}
            </p>
            <dl className="cy-rk-panel-datos">
              <div>
                <dt>{t.metrica}</dt>
                <dd>{d.valor}</dd>
              </div>
              <div>
                <dt>{t.carga}</dt>
                <dd>{d.pct}</dd>
              </div>
              {d.cambio && t.cambio ? (
                <div>
                  <dt>{t.cambio}</dt>
                  <dd>
                    <Cambio c={d.cambio} /> <span>{d.cambio.texto}</span>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
          <Franja filas={v.filas} />
        </div>
      </section>

      <div className="cy-rk-tabla-caja">
        <table className="cy-rk-tabla" aria-describedby={idCaption}>
          <caption id={idCaption}>{v.caption}</caption>
          <thead>
            <tr>
              <th scope="col" className="cy-rk-c-puesto">
                {t.puesto}
              </th>
              <th scope="col" className="cy-rk-c-pais">
                {t.pais}
              </th>
              <th scope="col" className="cy-rk-c-valor">
                <span>{t.metrica}</span>
                {t.unidad ? <span className="cy-rk-th-sub">{t.unidad}</span> : null}
              </th>
              <th scope="col" className="cy-rk-c-carga">
                {t.carga}
              </th>
              {t.cambio ? (
                <th scope="col" className="cy-rk-c-cambio">
                  {t.cambio}
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody ref={cuerpo}>
            {v.filas.map((f) => (
              <tr key={f.iso} data-iso={f.iso} data-propia={f.propia ? "" : undefined}>
                <td className="cy-rk-c-puesto">
                  <span className="cy-rk-n">{f.puesto}</span>
                  {f.empate ? <span className="cy-rk-empate" aria-hidden="true">=</span> : null}
                </td>
                <th scope="row" className="cy-rk-c-pais">
                  <a href={f.href}>
                    <Bandera iso={f.iso} />
                    <span>{f.nombre}</span>
                  </a>
                </th>
                <td className="cy-rk-c-valor">
                  <span className="cy-rk-valor">{f.valor}</span>
                  <span className="cy-rk-barra" aria-hidden="true">
                    <span style={{ transform: `scaleX(${f.barra})` }} />
                  </span>
                </td>
                <td className="cy-rk-c-carga">{f.detalle}</td>
                {t.cambio ? (
                  <td className="cy-rk-c-cambio">
                    <Cambio c={f.cambio} />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Kit v={v} vista={vista} t={t} />
    </div>
  );
}
