// Lo que comparten en el navegador el arranque de la home, el selector y el aviso de país: el país
// de la IP (para sugerir, nunca para redirigir: ADR 0001, D6 y D-017), la última elección explícita
// de la persona y el mapa de calculadoras equivalentes entre países.

export const CLAVE_PAIS = "cy-pais";
// v3: /api/geo ahora también devuelve AR (para mandar a calcular.ar); lo guardado con v2 no lo traía.
const CLAVE_GEO = "cy-geo-v3";

function leerSesion(clave: string): string | null {
  try {
    return sessionStorage.getItem(clave);
  } catch {
    return null;
  }
}

function guardarSesion(clave: string, valor: string) {
  try {
    sessionStorage.setItem(clave, valor);
  } catch {}
}

// Solo una elección hecha a mano (selector, tarjeta, botón del arranque o del aviso). Entrar a una
// página de otro país desde Google no cuenta: eso no es elegir.
export function recordarPais(codigo: string | undefined) {
  if (!codigo) return;
  try {
    localStorage.setItem(CLAVE_PAIS, codigo.toLowerCase());
  } catch {}
}

// undefined: todavía no se preguntó en esta pestaña.
export function paisGuardadoEnSesion(): string | null | undefined {
  const v = leerSesion(CLAVE_GEO);
  return v === null ? undefined : v || null;
}

let pedidoGeo: Promise<string | null> | null = null;

export function paisDelVisitante(): Promise<string | null> {
  const guardado = paisGuardadoEnSesion();
  if (guardado !== undefined) return Promise.resolve(guardado);
  pedidoGeo ??= fetch("/api/geo", { cache: "no-store" })
    .then((r) => (r.ok ? (r.json() as Promise<{ pais: string | null }>) : { pais: null }))
    .then(({ pais }) => {
      guardarSesion(CLAVE_GEO, pais ?? "");
      return pais;
    })
    .catch(() => {
      pedidoGeo = null;
      return null;
    });
  return pedidoGeo;
}

export interface MapaEquivalentes {
  // mercado -> slug -> concepto, solo calculadoras publicadas hoy.
  porMercado: Record<string, Record<string, string>>;
  // concepto -> URL absoluta en calcular.ar.
  ar: Record<string, string>;
  origenAR: string;
}

const pedidosMapa = new Map<string, Promise<MapaEquivalentes | null>>();

function pedirMapa(consulta: string): Promise<MapaEquivalentes | null> {
  let pedido = pedidosMapa.get(consulta);
  if (!pedido) {
    pedido = fetch(`/api/geo/equivalentes?${consulta}`)
      .then((r) => (r.ok ? (r.json() as Promise<MapaEquivalentes>) : null))
      .catch(() => {
        pedidosMapa.delete(consulta);
        return null;
      });
    pedidosMapa.set(consulta, pedido);
  }
  return pedido;
}

// Solo el clúster de la página (el concepto de /<m>/<slug>): con 190 países el mapa completo pesaba
// cientos de KB y el selector usa una sola fila. Cada consulta se cachea en el CDN por su URL.
export function mapaEquivalentes(ruta: string): Promise<MapaEquivalentes | null> {
  const [mercado, slug] = ruta.split("/").filter(Boolean);
  if (!mercado || !slug || SECCIONES.has(slug)) return Promise.resolve(null);
  return pedirMapa(new URLSearchParams({ m: mercado, s: slug }).toString());
}

export function mapaDeConcepto(concepto: string): Promise<MapaEquivalentes | null> {
  return pedirMapa(new URLSearchParams({ c: concepto }).toString());
}

const SECCIONES = new Set(["fuentes", "novedades"]);

// Adónde lleva elegir otro país estando en `ruta`: la calculadora del mismo concepto si el destino la
// tiene, la misma sección (fuentes, novedades) o, si no, el inicio del país. `hub` es ese inicio.
export function destinoEquivalente(
  mapa: MapaEquivalentes | null,
  ruta: string,
  destino: { codigo: string; href: string },
): { href: string; mismaCalculadora: boolean } {
  const [mercado, slug] = ruta.split("/").filter(Boolean);
  const hub = { href: destino.href, mismaCalculadora: false };
  if (mercado === destino.codigo && slug) return { href: ruta, mismaCalculadora: false };
  if (!mercado || !slug) return hub;
  if (destino.codigo === "ar") {
    if (!mapa) return hub;
    if (slug === "novedades") return { href: `${mapa.origenAR}/novedades`, mismaCalculadora: false };
    const concepto = mapa.porMercado[mercado]?.[slug];
    const url = concepto ? mapa.ar[concepto] : undefined;
    return url ? { href: url, mismaCalculadora: true } : hub;
  }
  if (SECCIONES.has(slug)) return { href: `/${destino.codigo}/${slug}`, mismaCalculadora: false };
  if (!mapa) return hub;
  const concepto = mapa.porMercado[mercado]?.[slug];
  if (!concepto) return hub;
  const enDestino = Object.entries(mapa.porMercado[destino.codigo] ?? {}).find(([, c]) => c === concepto)?.[0];
  return enDestino ? { href: `/${destino.codigo}/${enDestino}`, mismaCalculadora: true } : hub;
}
