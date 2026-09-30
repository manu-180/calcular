const BASE = "https://calcular.ar";

// Volver a una pantalla de auth después de entrar sólo arma loops.
const EXCLUIDAS = ["/login", "/registro", "/recuperar", "/auth"];

// El navegador lee «//x» y «/\x» como otro dominio.
const aOtroSitio = (ruta: string) => ruta.startsWith("//") || ruta.startsWith("/\\");

export function destinoSeguro(crudo: unknown, porDefecto = "/cuenta"): string {
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
  if (EXCLUIDAS.some((r) => url.pathname === r || url.pathname.startsWith(`${r}/`))) return porDefecto;
  // Se revalida la SALIDA: la normalización de puntos convierte «/..//evil.com» o
  // «/%2e%2e//evil.com» en «//evil.com», que no empezaba así en la entrada. Las barras
  // codificadas (%2F, %5C) no las usa ninguna ruta del sitio y un router que decodifique
  // después las volvería a convertir en «//».
  const salida = `${url.pathname}${url.search}${url.hash}`;
  if (aOtroSitio(salida) || /%2f|%5c/i.test(url.pathname)) return porDefecto;
  return salida;
}
