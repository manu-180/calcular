import type { SitioCuenta } from "@/lib/auth/sitio";

// Base fija sólo para parsear: el resultado es siempre un path del mismo sitio que hizo el pedido,
// nunca una URL con dominio, así que el host no entra en juego y no hay redirect abierto posible.
const BASE = "https://calcular.ar";

// Volver a una pantalla de auth después de entrar sólo arma loops.
const EXCLUIDAS = ["/login", "/registro", "/recuperar", "/auth"];
// El panel vive sólo en calcular.ar y la sesión no cruza de dominio: desde calcularya terminaría en
// el login del otro sitio.
const EXCLUIDAS_INTL = [...EXCLUIDAS, "/dashboard"];

// El navegador lee «//x» y «/\x» como otro dominio.
const aOtroSitio = (ruta: string) => ruta.startsWith("//") || ruta.startsWith("/\\");

export function destinoSeguro(crudo: unknown, porDefecto = "/cuenta", sitio: SitioCuenta = "ar"): string {
  if (typeof crudo !== "string" || crudo.length === 0 || crudo.length > 300) return porDefecto;
  if (!crudo.startsWith("/") || aOtroSitio(crudo)) return porDefecto;
  if (/[\u0000-\u001f\u007f\\]/.test(crudo)) return porDefecto;
  let url: URL;
  try {
    url = new URL(crudo, BASE);
  } catch {
    return porDefecto;
  }
  if (url.origin !== BASE) return porDefecto;
  const excluidas = sitio === "intl" ? EXCLUIDAS_INTL : EXCLUIDAS;
  if (excluidas.some((r) => url.pathname === r || url.pathname.startsWith(`${r}/`))) return porDefecto;
  // Se revalida la SALIDA: la normalización de puntos convierte «/..//evil.com» o
  // «/%2e%2e//evil.com» en «//evil.com», que no empezaba así en la entrada. Las barras
  // codificadas (%2F, %5C) no las usa ninguna ruta del sitio y un router que decodifique
  // después las volvería a convertir en «//».
  const salida = `${url.pathname}${url.search}${url.hash}`;
  if (aOtroSitio(salida) || /%2f|%5c/i.test(url.pathname)) return porDefecto;
  return salida;
}

// Dónde cae quien entra sin un destino pedido: el panel sólo existe en calcular.ar.
export const inicioTrasEntrar = (sitio: SitioCuenta, admin: boolean) => (admin && sitio === "ar" ? "/dashboard" : "/cuenta");
