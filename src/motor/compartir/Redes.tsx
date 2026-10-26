"use client";

import { useId, useState } from "react";
import type { TextosRedes } from "../i18n/redes";
import { usarCompartir, type OpcionesCompartir } from "./index";
import { AlCelu } from "./AlCelu";
import { ICONOS } from "./iconos";
import "./estilos-redes.css";

export { ICONOS };

// Panel de compartir con tarjeta: la vista previa en su formato (historia 9:16 o publicación 1:1) y los
// canales. Instagram no acepta links, así que va con la imagen vertical (ver compartirInstagram). Las
// imágenes salen de la OG de cada página y nunca llevan montos de la persona.

type Formato = "historia" | "cuadrado";

export interface PropsRedes {
  t: TextosRedes;
  opciones: OpcionesCompartir & { historia: string };
  // Sin ella, solo la historia y sin selector de formato.
  cuadrado?: string;
  // Nombre base de los archivos: «calcularya-horas» → calcularya-horas-historia.png.
  archivo: string;
  alt: string;
  // Adónde lleva el QR de Instagram en escritorio. Sin ella, a la imagen vertical.
  celu?: string;
}

export function Redes({ t, opciones, cuadrado, archivo, alt, celu }: PropsRedes) {
  const { compartir, compartirEn, compartirInstagram, bajarHistoria, estado, soportaNativo } = usarCompartir(opciones);
  const [formato, setFormato] = useState<Formato>("historia");
  const [alCelu, setAlCelu] = useState(false);
  const instagram = async () => {
    if ((await compartirInstagram(`${archivo}-historia.png`)) === "celu") setAlCelu(true);
  };
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
        <button type="button" className="cy-redes-canal cy-redes-ig" onClick={() => void instagram()}>
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
      <AlCelu abierto={alCelu} cerrar={() => setAlCelu(false)} destino={celu ?? opciones.historia} pagina={Boolean(celu)} t={t} bajar={() => void bajarHistoria(`${archivo}-historia.png`)} />
    </div>
  );
}
