"use client";

import { useEffect, useState } from "react";
import { Bandera } from "./Bandera";
import { mapaDeConcepto, paisDelVisitante, recordarPais } from "./geo-cliente";
import { IconoCerrar, IconoFlecha } from "./Iconos";
import { usePaises } from "./ListaPaises";
import { textosInicio } from "./textos-inicio";

interface Destino {
  pais: string;
  href: string;
  texto: string;
  ir: string;
}

const CLAVE_DESCARTE = "cy-aviso-pais";
// La misma marca que MARCA_PAIS de contexto.ts (no se importa: ese módulo es del servidor).
const MARCA = "{{pais}}";

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

// Sugiere, nunca redirige (ADR 0001, D6). Pide el país recién después de load + idle para no
// competir con el render, y la barra es fixed: aparecer no mueve nada de la página (CLS 0). El país
// sale de la lista compacta (ProveedorPaises) y, en una calculadora, la del mismo concepto en ese
// país se pide aparte (/api/geo/equivalentes?c=): el HTML ya no lleva un destino armado por país.
export function AvisoPais({
  mercado,
  paisActual,
  concepto,
  plantillas,
  cerrar,
}: {
  mercado: string;
  paisActual: string;
  concepto?: string;
  plantillas: { texto: string; ir: string };
  cerrar: string;
}) {
  const opciones = usePaises();
  const [destino, setDestino] = useState<Destino | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (descartado()) return;
    let vivo = true;
    const buscar = async () => {
      const pais = await paisDelVisitante();
      // Solo mercados de calcularya (href propio): Argentina está en la lista del selector, pero el
      // aviso nunca la ofreció.
      const opcion = pais && pais !== paisActual ? opciones.find((o) => o.pais === pais && o.codigo !== mercado && o.href.startsWith("/")) : undefined;
      if (!opcion) return;
      let href = opcion.href;
      let ir = plantillas.ir.replace(MARCA, opcion.nombre);
      if (concepto && concepto !== "propio") {
        const mapa = await mapaDeConcepto(concepto);
        const slug = Object.keys(mapa?.porMercado[opcion.codigo] ?? {})[0];
        if (slug) {
          href = `${opcion.href}/${slug}`;
          ir = textosInicio(paisActual === "BR" ? "pt" : "es", "tu").aviso.mismaCalculadora(opcion.nombre);
        }
      }
      if (!vivo) return;
      setDestino({ pais: opcion.pais, href, texto: plantillas.texto.replace(MARCA, opcion.nombre), ir });
      requestAnimationFrame(() => requestAnimationFrame(() => vivo && setVisible(true)));
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
  }, [mercado, paisActual, concepto, plantillas, opciones]);

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
