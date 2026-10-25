"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { rastrear } from "./medir";
import { CANALES_COMPARTIR, codigoCompartido, ORIGENES_COMPARTIR, origenCorto, type OrigenCompartir, type VariantePuente } from "./ref";

export type EstadoCompartir = "listo" | "compartido" | "copiado" | "error" | "historia" | "descargado";

export type CanalCompartir = (typeof CANALES_COMPARTIR)[number];

export interface OpcionesCompartir {
  // De dónde sale el compartido, para medir: "calculadora:<id>", "mundo" o "duelo". /api/e descarta
  // el evento con un origen fuera de esa lista.
  origen: Exclude<OrigenCompartir, "calculadora"> | `calculadora:${string}`;
  // URL absoluta o relativa al sitio actual, sin parámetros de seguimiento (se agregan acá).
  url: string;
  titulo: string;
  texto: string;
  // Imagen opcional para compartir como archivo (Stories), solo si el navegador lo soporta. Mejor la
  // URL que una función: se precarga una vez por URL, mientras que una función nueva en cada render
  // obliga a precargar de nuevo.
  imagen?: string | (() => Promise<Blob | null>);
  // La imagen vertical (1080 x 1920) para Instagram, que no acepta links web: en el celular se manda
  // como archivo a la hoja del sistema y en escritorio se descarga. Sin ella no hay botón de Instagram.
  historia?: string;
  // Se suman a las props del evento `compartir`. /api/e solo acepta la variante del A/B.
  datos?: Readonly<{ v?: VariantePuente }>;
}

// Agrega el código de este compartido (?r=) y el origen corto (&o=) a la URL. Nunca toca nada más: los
// montos no viajan en el link. Sin navegador devuelve la URL tal cual.
export function conRef(url: string, codigo: string, origen?: string): string {
  if (typeof window === "undefined") return url;
  try {
    const u = new URL(url, window.location.href);
    u.searchParams.set("r", codigo);
    const corto = origen ? origenCorto(origen) : null;
    if (corto) u.searchParams.set("o", corto);
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

export type CanalWeb = Exclude<CanalCompartir, "nativo" | "copiar" | "instagram">;

export function enlaceDeCanal(canal: CanalWeb, texto: string, url: string): string {
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
    // Facebook ya no toma el texto del sharer: arma la vista previa con la OG de la URL.
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
  }
}

const VUELTA_A_LISTO_MS = 2600;
// Mientras la persona tipea, la URL de la imagen cambia con cada tecla: se baja cuando se queda quieta.
const PRECARGA_MS = 400;

async function bajarImagen(url: string, senal: AbortSignal): Promise<Blob | null> {
  const r = await fetch(url, { signal: senal });
  return r.ok ? await r.blob() : null;
}

function descargar(blob: Blob, archivo: string) {
  const enlace = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = enlace;
  a.download = archivo;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(enlace), 30_000);
}

function esOrigenCompartir(x: string): x is OrigenCompartir {
  return (ORIGENES_COMPARTIR as readonly string[]).includes(x);
}

export function usarCompartir(opciones: OpcionesCompartir) {
  const [estado, setEstado] = useState<EstadoCompartir>("listo");
  const soportaNativo = useSyncExternalStore(sinSuscripcion, haySharePorToque, () => false);
  const reloj = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const imagenLista = useRef<Blob | null>(null);
  const historiaLista = useRef<Blob | null>(null);
  const { origen, url, titulo, texto, imagen, historia, datos } = opciones;

  useEffect(() => () => clearTimeout(reloj.current), []);

  // navigator.share tiene que salir en el mismo toque: si antes se espera la red, en el celular vence
  // la activación del usuario y el share tira NotAllowedError. Por eso la imagen se baja antes, y si al
  // tocar todavía no llegó, se comparte sin archivo.
  useEffect(() => {
    imagenLista.current = null;
    if (!imagen || !soportaNativo) return;
    const corte = new AbortController();
    const espera = setTimeout(() => {
      (typeof imagen === "string" ? bajarImagen(imagen, corte.signal) : imagen())
        .then((blob) => {
          if (!corte.signal.aborted) imagenLista.current = blob;
        })
        .catch(() => {});
    }, PRECARGA_MS);
    return () => {
      clearTimeout(espera);
      corte.abort();
    };
  }, [imagen, soportaNativo]);

  // La de Instagram también se precarga en el celular, por la misma razón: la hoja sale en el toque.
  useEffect(() => {
    historiaLista.current = null;
    if (!historia || !soportaNativo) return;
    const corte = new AbortController();
    const espera = setTimeout(() => {
      bajarImagen(historia, corte.signal)
        .then((blob) => {
          if (!corte.signal.aborted) historiaLista.current = blob;
        })
        .catch(() => {});
    }, PRECARGA_MS);
    return () => {
      clearTimeout(espera);
      corte.abort();
    };
  }, [historia, soportaNativo]);

  const avisar = useCallback((e: EstadoCompartir) => {
    clearTimeout(reloj.current);
    setEstado(e);
    if (e !== "listo") reloj.current = setTimeout(() => setEstado("listo"), VUELTA_A_LISTO_MS);
  }, []);

  const medir = useCallback(
    (canal: CanalCompartir, codigo: string) => {
      const [tipo, ...resto] = origen.split(":");
      if (!esOrigenCompartir(tipo)) return;
      const props: Record<string, string> = { origen: tipo, canal, ref: codigo };
      if (tipo === "calculadora" && resto.length) props.calc = resto.join(":");
      if (datos?.v) props.v = datos.v;
      rastrear("compartir", { props });
    },
    [origen, datos],
  );

  const copiar = useCallback(async (): Promise<boolean> => {
    const codigo = codigoCompartido();
    const ok = await copiarAlPortapapeles(conRef(url, codigo, origen));
    avisar(ok ? "copiado" : "error");
    if (ok) medir("copiar", codigo);
    return ok;
  }, [url, origen, avisar, medir]);

  // true: se compartió. "cancelado": la persona cerró la hoja, que no es un error. false: no se pudo.
  // Nada de await antes de navigator.share (ver la precarga de arriba).
  const compartirNativo = useCallback(async (): Promise<boolean | "cancelado"> => {
    const codigo = codigoCompartido();
    const enlace = conRef(url, codigo, origen);
    const carga: ShareData = { title: titulo, text: texto, url: enlace };
    const blob = imagenLista.current;
    if (blob) {
      const archivo = new File([blob], "calcularya.png", { type: blob.type || "image/png" });
      if (navigator.canShare?.({ files: [archivo] })) {
        // Con archivo, varias apps descartan la url: el link va dentro del texto.
        carga.files = [archivo];
        carga.text = `${texto} ${enlace}`;
        delete carga.url;
      }
    }
    try {
      await navigator.share(carga);
      avisar("compartido");
      medir("nativo", codigo);
      return true;
    } catch (e) {
      return e instanceof DOMException && e.name === "AbortError" ? "cancelado" : false;
    }
  }, [url, origen, titulo, texto, avisar, medir]);

  const compartir = useCallback(async () => {
    if (soportaNativo) {
      const r = await compartirNativo();
      if (r === "cancelado" || r === true) return;
    }
    await copiar();
  }, [soportaNativo, compartirNativo, copiar]);

  // Instagram no recibe links: va la imagen vertical y el link queda copiado para el sticker «Enlace».
  // En el celular, la hoja del sistema con el archivo (ahí está Instagram > Historias); en escritorio
  // o sin la imagen precargada, se descarga. El portapapeles se escribe antes del share, sin await,
  // para no gastar la activación del toque.
  const compartirInstagram = useCallback(
    async (archivo: string): Promise<boolean> => {
      if (!historia) return false;
      const codigo = codigoCompartido();
      const enlace = conRef(url, codigo, origen);
      const copia = copiarAlPortapapeles(enlace);
      const blob = historiaLista.current;
      if (soportaNativo && blob) {
        const file = new File([blob], archivo, { type: blob.type || "image/png" });
        if (navigator.canShare?.({ files: [file] })) {
          try {
            await navigator.share({ files: [file] });
            avisar("historia");
            medir("instagram", codigo);
            return true;
          } catch (e) {
            if (e instanceof DOMException && e.name === "AbortError") return false;
          }
        }
      }
      try {
        const bajada = blob ?? (await bajarImagen(historia, new AbortController().signal));
        if (!bajada) throw new Error("sin imagen");
        descargar(bajada, archivo);
        await copia;
        avisar("descargado");
        medir("instagram", codigo);
        return true;
      } catch {
        avisar("error");
        return false;
      }
    },
    [historia, url, origen, soportaNativo, avisar, medir],
  );

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
      if (canal === "instagram") {
        await compartirInstagram("calcularya-historia.png");
        return;
      }
      const codigo = codigoCompartido();
      const enlace = enlaceDeCanal(canal, texto, conRef(url, codigo, origen));
      window.open(enlace, "_blank", "noopener,noreferrer");
      medir(canal, codigo);
    },
    [copiar, compartir, compartirInstagram, texto, url, origen, medir],
  );

  return { compartir, estado, soportaNativo, compartirEn, compartirInstagram };
}
