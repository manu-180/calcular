"use client";

import { useId, useState, type ReactNode } from "react";
import type { TextosRedes } from "../i18n/redes";
import { usarCompartir, type OpcionesCompartir } from "./index";
import "./estilos-redes.css";

// Panel de compartir con tarjeta: la vista previa en su formato (historia 9:16 o publicación 1:1) y los
// canales. Instagram no acepta links, así que va con la imagen vertical (ver compartirInstagram). Las
// imágenes salen de la OG de cada página y nunca llevan montos de la persona.

type Formato = "historia" | "cuadrado";

const trazo = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const ICONOS: Record<"instagram" | "facebook" | "whatsapp" | "x" | "copiar" | "mas" | "bajar", ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" {...trazo}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" {...trazo}>
      <path d="M14.5 8.5h2V5h-2.4A3.6 3.6 0 0 0 10.5 8.6V11H8v3.4h2.5V21h3.4v-6.6h2.4l.5-3.4h-2.9V9.2c0-.4.3-.7.6-.7Z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" {...trazo}>
      <path d="M4.5 19.5l1.1-3.6A7.8 7.8 0 1 1 8.4 18.6Z" />
      <path d="M9.3 8.6c.2-.4.6-.4.8 0l.6 1.4c.1.3 0 .5-.2.7l-.4.4c.5 1.1 1.4 2 2.5 2.5l.4-.4c.2-.2.5-.3.7-.2l1.4.6c.4.2.4.6 0 .8-.6.6-1.4.9-2.2.6a7 7 0 0 1-4.2-4.2c-.3-.8 0-1.6.6-2.2Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" {...trazo}>
      <path d="M5 4.5l14 15M19 4.5l-14 15" />
    </svg>
  ),
  copiar: (
    <svg viewBox="0 0 24 24" {...trazo}>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </svg>
  ),
  mas: (
    <svg viewBox="0 0 24 24" {...trazo}>
      <path d="M12 15V4M8 7.5 12 4l4 3.5M5 12v6.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V12" />
    </svg>
  ),
  bajar: (
    <svg viewBox="0 0 24 24" {...trazo}>
      <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" />
    </svg>
  ),
};

export interface PropsRedes {
  t: TextosRedes;
  opciones: OpcionesCompartir & { historia: string };
  // Sin ella, solo la historia y sin selector de formato.
  cuadrado?: string;
  // Nombre base de los archivos: «calcularya-horas» → calcularya-horas-historia.png.
  archivo: string;
  alt: string;
}

export function Redes({ t, opciones, cuadrado, archivo, alt }: PropsRedes) {
  const { compartir, compartirEn, compartirInstagram, estado, soportaNativo } = usarCompartir(opciones);
  const [formato, setFormato] = useState<Formato>("historia");
  const idFormato = useId();
  const imagen = formato === "cuadrado" && cuadrado ? cuadrado : opciones.historia;

  const aviso = estado === "copiado" ? t.copiado : estado === "compartido" ? t.compartido : estado === "historia" ? t.enInstagram : estado === "descargado" ? t.descargado : estado === "error" ? t.error : "";

  const canal = (c: "facebook" | "whatsapp" | "x" | "copiar", nombre: string) => (
    <button type="button" className="cy-redes-canal" onClick={() => void compartirEn(c)}>
      <span className="cy-redes-icono" aria-hidden="true">
        {ICONOS[c]}
      </span>
      <span>{nombre}</span>
      {c !== "copiar" ? <span className="cy-redes-lector">{t.nuevaPestana}</span> : null}
    </button>
  );

  return (
    <div className="cy-redes" data-formato={formato}>
      <div className="cy-redes-escena">
        {cuadrado ? (
          <div className="cy-redes-formatos" role="radiogroup" aria-labelledby={idFormato}>
            <span id={idFormato} className="cy-redes-lector">
              {t.formato}
            </span>
            {(["historia", "cuadrado"] as const).map((f) => (
              <button key={f} type="button" role="radio" aria-checked={formato === f} className="cy-redes-formato" onClick={() => setFormato(f)}>
                <span className="cy-redes-forma" data-forma={f} aria-hidden="true" />
                <span>{f === "historia" ? t.historia : t.feed}</span>
              </button>
            ))}
          </div>
        ) : null}
        <figure className="cy-redes-marco">
          <img key={imagen} src={imagen} width={1080} height={formato === "historia" ? 1920 : 1080} alt={alt} loading="lazy" decoding="async" />
        </figure>
        <a className="cy-redes-bajar" href={imagen} download={`${archivo}-${formato}.png`}>
          <span className="cy-redes-icono" aria-hidden="true">
            {ICONOS.bajar}
          </span>
          {t.descargar}
        </a>
      </div>

      <div className="cy-redes-canales" role="group" aria-label={t.grupo}>
        <button type="button" className="cy-redes-canal cy-redes-ig" onClick={() => void compartirInstagram(`${archivo}-historia.png`)}>
          <span className="cy-redes-icono" aria-hidden="true">
            {ICONOS.instagram}
          </span>
          <span className="cy-redes-ig-texto">
            <span>Instagram</span>
            <small>{t.instagramSub}</small>
          </span>
        </button>
        {canal("facebook", "Facebook")}
        {canal("whatsapp", "WhatsApp")}
        {canal("x", "X")}
        {canal("copiar", t.copiar)}
        {soportaNativo ? (
          <button type="button" className="cy-redes-canal" onClick={() => void compartir()}>
            <span className="cy-redes-icono" aria-hidden="true">
              {ICONOS.mas}
            </span>
            <span>{t.mas}</span>
          </button>
        ) : null}
        <p className="cy-redes-aviso" role="status" aria-live="polite">
          {aviso}
        </p>
      </div>
    </div>
  );
}
