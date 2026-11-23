"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { idVisitante, normalizarRuta, rastrear } from "@/lib/rastreo";
import { leerDatosCompra } from "@/lib/prefill/cliente";

// «Comprar» va derecho a MercadoPago. Hasta el 3/11/2026 abría un diálogo que pedía el mail antes de
// pagar (para un recordatorio de recupero): de 27 personas que lo abrieron en 30 días lo mandaron 13,
// y las 16 ventas de los 90 días anteriores se pagaron a los minutos del checkout, o sea que el
// recordatorio no recuperó ninguna. MercadoPago pide el mail en su checkout y lo devuelve en el pago
// (las 16 lo trajeron), así que la entrega no lo necesita de antemano. docs/decisiones/compra-directa.md.

// Mismo tope que DATOS_MAX en prefill/servidor.ts: más grande se descarta allá igual.
const DATOS_MAX = 2048;

function datosGuardados(slug: string): string {
  const datos = leerDatosCompra(slug);
  if (datos === null || datos === undefined) return "";
  try {
    const texto = JSON.stringify(datos);
    return texto.length <= DATOS_MAX ? texto : "";
  } catch {
    return "";
  }
}

// De dónde vino el comprador. Los CTA internos lo marcan con `?desde=<pagina>`; si no, vale el host
// del referrer externo (google, chatgpt…). Con navegación SPA el referrer no cambia, así que la marca
// del CTA es la única señal confiable de qué calculadora mandó la venta.
function origen(): string {
  const marcado = new URLSearchParams(location.search).get("desde");
  if (marcado && /^[a-z0-9-]{1,40}$/i.test(marcado)) return marcado;
  try {
    if (document.referrer) {
      const r = new URL(document.referrer);
      if (r.host !== location.host) return r.hostname.replace(/^www\./, "");
      return r.pathname;
    }
  } catch {
    // referrer ilegible: se cae a "directo"
  }
  return "directo";
}

// `desde` viaja en la referencia de MP (la lee tools/embudo-planillas.ts); `ruta` es la página donde
// se tocó Comprar (va a ca_checkouts); `datos`, lo que la persona cargó en la calculadora, vuelve en
// la entrega. `sitio` es el campo trampa del POST: vacío es «humano».
export function camposCompra(slug: string): Record<string, string> {
  return {
    p: slug,
    desde: `${origen()}_${location.pathname}`,
    ruta: normalizarRuta(location.pathname),
    vid: idVisitante(),
    datos: datosGuardados(slug),
    sitio: "",
  };
}

// «Fue a pagar»: se anota justo antes de salir a MercadoPago y la lee VueltaDePago cuando la
// persona vuelve al sitio sin haber pagado (con «atrás» o reabriendo la página). Con la compra
// directa ya no hay mail para un recordatorio: el único momento para destrabar una duda es ese.
// sessionStorage y no local: es de esta pestaña y de esta visita, no un recuerdo para otro día.
const CLAVE_IDA = "ca_ida_pago";
/** Pasada una hora ya no es «volvió de pagar»: es otra visita. */
const VENTANA_IDA_MS = 60 * 60 * 1000;

export function anotarIda(slug: string): void {
  try {
    sessionStorage.setItem(CLAVE_IDA, `${slug}.${Date.now()}`);
  } catch {
    // modo privado estricto: sin la marca no hay aviso al volver, la compra sigue igual
  }
}

export function olvidarIda(): void {
  try {
    sessionStorage.removeItem(CLAVE_IDA);
  } catch {
    // nada que borrar
  }
}

/** El producto que la persona salió a pagar hace menos de una hora, o null. */
export function idaPendiente(ahora: number = Date.now()): string | null {
  let crudo: string | null = null;
  try {
    crudo = sessionStorage.getItem(CLAVE_IDA);
  } catch {
    return null;
  }
  const corte = crudo?.lastIndexOf(".") ?? -1;
  if (!crudo || corte < 1) return null;
  const slug = crudo.slice(0, corte);
  const t = Number(crudo.slice(corte + 1));
  if (!/^[a-z0-9-]{1,60}$/.test(slug) || !Number.isFinite(t) || ahora - t > VENTANA_IDA_MS || ahora < t) return null;
  return slug;
}

/** Manda el POST a /api/mp/checkout con un formulario armado al vuelo. Devuelve false si no hay DOM:
 *  el botón sigue entonces su href a /planillas/comprar, que tiene el mismo formulario. */
export function comprar(slug: string, precio?: number): boolean {
  if (typeof document === "undefined" || !document.body) return false;
  const f = document.createElement("form");
  f.method = "post";
  f.action = "/api/mp/checkout";
  f.hidden = true;
  for (const [k, v] of Object.entries(camposCompra(slug))) {
    const i = document.createElement("input");
    i.type = "hidden";
    i.name = k;
    i.value = v;
    f.appendChild(i);
  }
  document.body.appendChild(f);
  // En el tick siguiente: así el `cta_compra` del botón (delegado en document) entra a la cola antes
  // que el checkout, que la vacía de un saque porque la página se va a MercadoPago.
  setTimeout(() => {
    rastrear("checkout", { producto: slug, valor: precio });
    anotarIda(slug);
    f.submit();
  }, 0);
  return true;
}

/** Estado del botón de compra: al tocarlo manda el POST y queda en «Te llevamos a MercadoPago…»
 *  hasta que la página se va. Volver con «atrás» desde MP restaura la página del bfcache con el botón
 *  todavía ocupado: `pageshow` lo libera para que el arrepentido pueda reintentar. */
export function useComprar(slug: string, precio?: number) {
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const reset = (e: PageTransitionEvent) => e.persisted && setEnviando(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const onClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (enviando) {
        e.preventDefault();
        return;
      }
      if (comprar(slug, precio)) {
        e.preventDefault();
        setEnviando(true);
      }
    },
    [enviando, slug, precio],
  );

  return { enviando, onClick };
}
