"use client";

import { useEffect } from "react";

// /cuenta llega en streaming: el navegador intenta ir al #ancla cuando todavía está el esqueleto
// y la sección no existe, así que los links del menú (/cuenta#planillas, #calculos, #seguridad)
// quedaban arriba de todo. Se reintenta al montar el contenido real, salvo que la persona ya se
// haya movido.
export function IrAlAncla() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || window.scrollY > 0) return;
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, []);
  return null;
}
