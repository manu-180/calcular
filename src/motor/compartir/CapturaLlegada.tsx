"use client";

import { useEffect } from "react";
import { rastrear } from "./medir";
import { ORIGENES_CORTOS, REF_VALIDO } from "./ref";

// Solo sessionStorage: quién te trajo no tiene que sobrevivir a la pestaña.
const CLAVE_LLEGADA = "cy-ref-in";

// Alguien entra por un link compartido (?r=<código del compartido>&o=<de dónde>). Se mide una sola vez
// por sesión y los parámetros salen de la barra: si esa persona reenvía la URL tal cual, el código no
// pasa a otro. Va montado antes del Rastreador porque lee ca_vid antes de que iniciar() lo cree: así
// «nuevo» dice si quien llegó nunca había visitado el sitio, que es lo que cuenta para el boca en boca.
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
    const origen = o && ORIGENES_CORTOS.includes(o) ? o : null;

    try {
      if (sessionStorage.getItem(CLAVE_LLEGADA)) return;
      sessionStorage.setItem(CLAVE_LLEGADA, JSON.stringify(origen ? { r, o: origen } : { r }));
    } catch {}

    let nuevo = true;
    try {
      nuevo = !localStorage.getItem("ca_vid");
    } catch {}

    rastrear("llegada", { props: origen ? { ref: r, origen, nuevo } : { ref: r, nuevo } });
  }, []);
  return null;
}
