"use client";

import { useEffect, useState } from "react";
import { Bandera } from "./Bandera";
import { paisDelVisitante, recordarPais } from "./geo-cliente";
import { IconoCerrar, IconoFlecha } from "./Iconos";
import { textosInicio } from "./textos-inicio";

export interface DestinoPais {
  pais: string;
  href: string;
  texto: string;
  ir: string;
}

const CLAVE_DESCARTE = "cy-aviso-pais";

function descartado(): boolean {
  try {
    return sessionStorage.getItem(CLAVE_DESCARTE) === "1";
  } catch {
    return false;
  }
}

function descartar() {
  try {
    sessionStorage.setItem(CLAVE_DESCARTE, "1");
  } catch {}
}

// destinosAviso() (contexto.ts) ya resuelve la calculadora del mismo concepto en cada país: si el
// href tiene slug es la misma cuenta, y el botón lo dice. El nombre sale de Intl.DisplayNames con el
// idioma de la página, porque el destino solo trae el código ISO y los textos armados.
function conMismaCalculadora(d: DestinoPais, paisActual: string): DestinoPais {
  const partes = d.href.split("/").filter(Boolean);
  if (partes.length < 2) return d;
  const lang = document.documentElement.lang || "es";
  const nombre = new Intl.DisplayNames([lang], { type: "region" }).of(d.pais) ?? d.pais;
  const t = textosInicio(paisActual === "BR" ? "pt" : "es", "tu");
  return { ...d, ir: t.aviso.mismaCalculadora(nombre) };
}

// Sugiere, nunca redirige (ADR 0001, D6). Pide el país recién después de load + idle para no
// competir con el render, y la barra es fixed: aparecer no mueve nada de la página (CLS 0).
export function AvisoPais({ paisActual, destinos, cerrar }: { paisActual: string; destinos: readonly DestinoPais[]; cerrar: string }) {
  const [destino, setDestino] = useState<DestinoPais | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!destinos.length || descartado()) return;
    let vivo = true;
    const buscar = async () => {
      const pais = await paisDelVisitante();
      const d = pais && pais !== paisActual ? destinos.find((x) => x.pais === pais) : undefined;
      if (vivo && d) {
        setDestino(conMismaCalculadora(d, paisActual));
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

  const cerrarAviso = () => {
    descartar();
    setVisible(false);
  };

  return (
    <div className="cy-aviso-pais" data-visible={visible || undefined} role="region" aria-label={destino.texto}>
      <div className="cy-aviso-pais-cuerpo">
        <Bandera pais={destino.pais} ancho={22} />
        <p className="cy-aviso-pais-texto">{destino.texto}</p>
        <a className="cy-aviso-pais-ir" href={destino.href} onClick={() => recordarPais(destino.href.split("/").filter(Boolean)[0])}>
          <span>{destino.ir}</span>
          <span className="cy-boton-icono">
            <IconoFlecha />
          </span>
        </a>
        <button type="button" className="cy-aviso-pais-cerrar" onClick={cerrarAviso} aria-label={cerrar}>
          <IconoCerrar />
        </button>
      </div>
    </div>
  );
}
