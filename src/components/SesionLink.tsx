"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { haySesion } from "@/lib/sesion-cliente";

// Volver a una pestaña donde se entró o salió en otra también cambia la pista.
function suscribir(avisar: () => void) {
  window.addEventListener("focus", avisar);
  document.addEventListener("visibilitychange", avisar);
  return () => {
    window.removeEventListener("focus", avisar);
    document.removeEventListener("visibilitychange", avisar);
  };
}

// El servidor siempre pinta «Ingresar» (las páginas públicas son estáticas) y el cliente corrige
// al hidratar leyendo la cookie-pista: sin mismatch y sin tocar la sesión real.
export function SesionLink({ className }: { className?: string }) {
  // usePathname re-renderiza en cada navegación del lado del cliente, y cada render vuelve a
  // leer la cookie: tras entrar (Server Action + redirect) el link del footer pasa solo a «Mi cuenta».
  usePathname();
  const conSesion = useSyncExternalStore(suscribir, haySesion, () => false);
  if (!CUENTAS_ACTIVAS) return null;
  // <a> y no <Link>: navegación completa, así los scripts de anuncios de la página pública no
  // siguen vivos en /login ni en /cuenta.
  return (
    <a href={conSesion ? "/cuenta" : "/login"} className={className} data-sesion={conSesion ? "si" : "no"}>
      {conSesion ? "Mi cuenta" : "Ingresar"}
    </a>
  );
}
