"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { rastrear } from "./medir";
import { codigoPropio, leerCodigoPropio, origenCorto } from "./ref";

export type EstadoCompartir = "listo" | "compartido" | "copiado" | "error";

export type CanalCompartir = "nativo" | "copiar" | "whatsapp" | "x" | "telegram" | "linkedin";

export interface OpcionesCompartir {
  // De dónde sale el compartido, para medir: "calculadora:<id>", "mundo", "duelo"...
  origen: string;
  // URL absoluta o relativa al sitio actual, sin parámetros de seguimiento (se agregan acá).
  url: string;
  titulo: string;
  texto: string;
  // Imagen opcional para compartir como archivo (Stories). Solo se usa si el navegador lo soporta.
  imagen?: () => Promise<Blob | null>;
  // Se suman a las props del evento `compartir` (por ejemplo la variante de un A/B). Nunca montos.
  datos?: Readonly<Record<string, string | number | boolean>>;
}

// Agrega el código de quien comparte (?r=) y el origen corto (&o=) a la URL. Nunca toca nada más: los
// montos no viajan en el link. Sin navegador devuelve la URL tal cual.
export function conRef(url: string, origen?: string): string {
  if (typeof window === "undefined") return url;
  try {
    const u = new URL(url, window.location.href);
    u.searchParams.set("r", codigoPropio());
    if (origen) u.searchParams.set("o", origenCorto(origen));
    return u.toString();
  } catch {
    return url;
  }
}

function haySharePorToque(): boolean {
  if (typeof navigator === "undefined" || typeof navigator.share !== "function") return false;
  // En escritorio el share del sistema (Windows, Chrome) abre una hoja torpe: ahí va el menú propio.
  return typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;
}

const sinSuscripcion = () => () => {};

async function copiarAlPortapapeles(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    // Contextos sin Clipboard API (http, iframes sin permiso): el camino viejo todavía anda.
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

export function enlaceDeCanal(canal: Exclude<CanalCompartir, "nativo" | "copiar">, texto: string, url: string): string {
  const t = encodeURIComponent(texto);
  const u = encodeURIComponent(url);
  switch (canal) {
    case "whatsapp":
      return `https://wa.me/?text=${encodeURIComponent(`${texto} ${url}`)}`;
    case "x":
      return `https://x.com/intent/post?text=${t}&url=${u}`;
    case "telegram":
      return `https://t.me/share/url?url=${u}&text=${t}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
  }
}

const VUELTA_A_LISTO_MS = 2600;

export function usarCompartir(opciones: OpcionesCompartir) {
  const [estado, setEstado] = useState<EstadoCompartir>("listo");
  const soportaNativo = useSyncExternalStore(sinSuscripcion, haySharePorToque, () => false);
  const reloj = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { origen, url, titulo, texto, imagen, datos } = opciones;

  useEffect(() => () => clearTimeout(reloj.current), []);

  const avisar = useCallback((e: EstadoCompartir) => {
    clearTimeout(reloj.current);
    setEstado(e);
    if (e !== "listo") reloj.current = setTimeout(() => setEstado("listo"), VUELTA_A_LISTO_MS);
  }, []);

  const medir = useCallback(
    (canal: CanalCompartir) => {
      const [tipo, ...resto] = origen.split(":");
      rastrear("compartir", {
        props: { origen: tipo, canal, ...(resto.length ? { calc: resto.join(":") } : {}), ref: leerCodigoPropio(), ...datos },
      });
    },
    [origen, datos],
  );

  const copiar = useCallback(async (): Promise<boolean> => {
    const ok = await copiarAlPortapapeles(conRef(url, origen));
    avisar(ok ? "copiado" : "error");
    if (ok) medir("copiar");
    return ok;
  }, [url, origen, avisar, medir]);

  // true: se compartió. "cancelado": la persona cerró la hoja, que no es un error. false: no se pudo.
  const compartirNativo = useCallback(async (): Promise<boolean | "cancelado"> => {
    const enlace = conRef(url, origen);
    const carga: ShareData = { title: titulo, text: texto, url: enlace };
    try {
      const blob = imagen ? await imagen() : null;
      if (blob) {
        const archivo = new File([blob], "calcularya.png", { type: blob.type || "image/png" });
        if (navigator.canShare?.({ files: [archivo] })) {
          // Con archivo, varias apps descartan la url: el link va dentro del texto.
          carga.files = [archivo];
          carga.text = `${texto} ${enlace}`;
          delete carga.url;
        }
      }
      await navigator.share(carga);
      avisar("compartido");
      medir("nativo");
      return true;
    } catch (e) {
      return e instanceof DOMException && e.name === "AbortError" ? "cancelado" : false;
    }
  }, [url, origen, titulo, texto, imagen, avisar, medir]);

  const compartir = useCallback(async () => {
    if (soportaNativo) {
      const r = await compartirNativo();
      if (r === "cancelado" || r === true) return;
    }
    await copiar();
  }, [soportaNativo, compartirNativo, copiar]);

  const compartirEn = useCallback(
    async (canal: CanalCompartir) => {
      if (canal === "copiar") {
        await copiar();
        return;
      }
      if (canal === "nativo") {
        await compartir();
        return;
      }
      const enlace = enlaceDeCanal(canal, texto, conRef(url, origen));
      window.open(enlace, "_blank", "noopener,noreferrer");
      medir(canal);
    },
    [copiar, compartir, texto, url, origen, medir],
  );

  return { compartir, estado, soportaNativo, compartirEn };
}
