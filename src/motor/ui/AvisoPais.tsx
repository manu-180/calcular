"use client";

import { useEffect, useState } from "react";
import { Bandera } from "./Bandera";
import { IconoCerrar, IconoFlecha } from "./Iconos";

export interface DestinoPais {
  pais: string;
  href: string;
  texto: string;
  ir: string;
}

const CLAVE_DESCARTE = "cy-aviso-pais";
const CLAVE_GEO = "cy-geo";

function leer(clave: string): string | null {
  try {
    return sessionStorage.getItem(clave);
  } catch {
    return null;
  }
}

function guardar(clave: string, valor: string) {
  try {
    sessionStorage.setItem(clave, valor);
  } catch {}
}

async function paisDelVisitante(): Promise<string | null> {
  const guardado = leer(CLAVE_GEO);
  if (guardado !== null) return guardado || null;
  try {
    const r = await fetch("/api/geo", { cache: "no-store" });
    if (!r.ok) return null;
    const { pais } = (await r.json()) as { pais: string | null };
    guardar(CLAVE_GEO, pais ?? "");
    return pais;
  } catch {
    return null;
  }
}

// Sugiere, nunca redirige (ADR 0001, D6). Pide el país recién después de load + idle para no
// competir con el render, y la barra es fixed: aparecer no mueve nada de la página (CLS 0).
export function AvisoPais({ paisActual, destinos, cerrar }: { paisActual: string; destinos: readonly DestinoPais[]; cerrar: string }) {
  const [destino, setDestino] = useState<DestinoPais | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!destinos.length || leer(CLAVE_DESCARTE) === "1") return;
    let vivo = true;
    const buscar = async () => {
      const pais = await paisDelVisitante();
      const d = pais && pais !== paisActual ? destinos.find((x) => x.pais === pais) : undefined;
      if (vivo && d) {
        setDestino(d);
        requestAnimationFrame(() => requestAnimationFrame(() => vivo && setVisible(true)));
      }
    };
    const enOcio = () => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(() => void buscar(), { timeout: 3000 });
      else setTimeout(() => void buscar(), 1200);
    };
    if (document.readyState === "complete") enOcio();
    else window.addEventListener("load", enOcio, { once: true });
    return () => {
      vivo = false;
      window.removeEventListener("load", enOcio);
    };
  }, [paisActual, destinos]);

  if (!destino) return null;

  const descartar = () => {
    guardar(CLAVE_DESCARTE, "1");
    setVisible(false);
  };

  return (
    <div className="cy-aviso-pais" data-visible={visible || undefined} role="region" aria-label={destino.texto}>
      <div className="cy-aviso-pais-cuerpo">
        <Bandera pais={destino.pais} ancho={22} />
        <p className="cy-aviso-pais-texto">{destino.texto}</p>
        <a className="cy-aviso-pais-ir" href={destino.href}>
          <span>{destino.ir}</span>
          <span className="cy-boton-icono">
            <IconoFlecha />
          </span>
        </a>
        <button type="button" className="cy-aviso-pais-cerrar" onClick={descartar} aria-label={cerrar}>
          <IconoCerrar />
        </button>
      </div>
    </div>
  );
}
