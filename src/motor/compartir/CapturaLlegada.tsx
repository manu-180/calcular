"use client";

import { useEffect } from "react";
import { rastrear } from "./medir";
import { leerCodigoPropio, ORIGEN_VALIDO, REF_VALIDO } from "./ref";

const CLAVE_SESION = "cy-llegada";
const CLAVE_PRIMERA = "cy-ref-in";

function sesion(): Storage | null {
  try {
    return sessionStorage;
  } catch {
    return null;
  }
}

// Alguien entra por un link compartido (?r=<quien compartió>&o=<de dónde>). Se mide una sola vez por
// sesión y los parámetros salen de la barra: si esa persona reenvía la URL tal cual, el ref no pasa a
// otro. Va montado antes del Rastreador porque lee ca_vid antes de que iniciar() lo cree: así «nuevo»
// dice si quien llegó nunca había visitado el sitio, que es lo que cuenta para el boca en boca.
export function CapturaLlegada() {
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const r = q.get("r");
    const o = q.get("o");
    if (r === null && o === null) return;

    q.delete("r");
    q.delete("o");
    const resto = q.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${resto ? `?${resto}` : ""}${window.location.hash}`);

    if (!r || !REF_VALIDO.test(r)) return;
    const origen = o && ORIGEN_VALIDO.test(o) ? o : "";
    // Abrir el propio link compartido no es una llegada.
    if (r === leerCodigoPropio()) return;

    const s = sesion();
    try {
      if (s?.getItem(CLAVE_SESION)) return;
      s?.setItem(CLAVE_SESION, r);
    } catch {}

    let nuevo = true;
    try {
      nuevo = !localStorage.getItem("ca_vid");
      if (!localStorage.getItem(CLAVE_PRIMERA)) localStorage.setItem(CLAVE_PRIMERA, JSON.stringify({ r, o: origen, t: Date.now() }));
    } catch {}

    rastrear("llegada", { props: { ref: r, origen, nuevo } });
  }, []);
  return null;
}
