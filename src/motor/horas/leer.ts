// Lectura de precios de las páginas oficiales. Funciones puras sobre el HTML: las usa
// scripts/horas/actualizar_precios.ts y las prueba scripts/horas/casos.ts.

export interface PrecioLeido {
  monto: number;
  moneda: string;
}

export type Lectura = { ok: true; precio: PrecioLeido; detalle?: string } | { ok: false; motivo: string };

// Un monto escrito como en cada país: «$1,390», «R$ 23,90», «12,14 €», «$ 4.499», «Rp 59.990», «1 299,00».
// Un separador seguido de exactamente tres dígitos es de miles; seguido de uno o dos, decimal. Con los
// dos separadores, el último es el decimal.
export function numeroDeTexto(texto: string): number | null {
  const limpio = texto.replace(/[  \s']/g, "");
  if (!/^\d[\d.,]*$/.test(limpio)) return null;
  const ultimoPunto = limpio.lastIndexOf(".");
  const ultimaComa = limpio.lastIndexOf(",");
  let entero = limpio;
  let decimales = "";
  if (ultimoPunto >= 0 && ultimaComa >= 0) {
    const sep = Math.max(ultimoPunto, ultimaComa);
    entero = limpio.slice(0, sep);
    decimales = limpio.slice(sep + 1);
  } else if (ultimoPunto >= 0 || ultimaComa >= 0) {
    const sep = Math.max(ultimoPunto, ultimaComa);
    const caracter = limpio[sep];
    const veces = limpio.split(caracter).length - 1;
    const despues = limpio.slice(sep + 1);
    if (veces === 1 && despues.length >= 1 && despues.length <= 2) {
      entero = limpio.slice(0, sep);
      decimales = despues;
    } else if (despues.length !== 3) return null;
  }
  const n = Number(`${entero.replace(/[.,]/g, "")}${decimales ? `.${decimales}` : ""}`);
  return Number.isFinite(n) ? n : null;
}

const MARCAS_USD = /^(US\$|U\$S|USD|\$US)$/;
const MONEDA_DE_SIMBOLO: Readonly<Record<string, string>> = { "€": "EUR", EUR: "EUR", "£": "GBP", GBP: "GBP" };

// Montos con su marca de moneda pegada (antes o después). Un número sin marca («2 meses») no es un precio.
const MARCA = String.raw`US\$|U\$S|S\/|[A-Z]{3}|R\$|HK\$|NZ\$|A\$|CA\$|C\$|S\$|RM|Rp|Rs\.?|K[Ss]h|TSh|GH₵|₵|zł|kr|CHF|[$£€¥￥₦₱₹₩฿₫]`;
const NUM = String.raw`\d[\d.,   ]*\d|\d`;
const MONTO = new RegExp(String.raw`(?:(${MARCA})\s?(${NUM}))|(?:(${NUM})\s?(\$US|[A-Z]{3}|€|£|zł|kr|円|원|元))`, "g");

export interface MontoConMarca {
  monto: number;
  marca: string;
}

export function montosDeTexto(texto: string): MontoConMarca[] {
  const salida: MontoConMarca[] = [];
  for (const m of texto.matchAll(MONTO)) {
    const marca = (m[1] ?? m[4] ?? "").trim();
    const n = numeroDeTexto((m[2] ?? m[3] ?? "").trim());
    if (n !== null) salida.push({ monto: n, marca });
  }
  return salida;
}

// La moneda de un precio de Spotify: «US$», «USD» o «U$S» es el dólar; € y £ son esas; cualquier otra
// marca ($, R$, ₦, Ksh) es la moneda del país.
export function monedaDeMarca(marca: string, local: string): string {
  if (MARCAS_USD.test(marca)) return "USD";
  if (/^[A-Z]{3}$/.test(marca)) return marca;
  return MONEDA_DE_SIMBOLO[marca] ?? local;
}

function jsonLd(html: string): unknown[] {
  const salida: unknown[] = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      salida.push(JSON.parse(m[1]));
    } catch {
      // Un bloque roto no invalida los demás.
    }
  }
  return salida;
}

// Apple: el Product del JSON-LD con ese nombre exacto, su AggregateOffer y lowPrice (la configuración
// más barata). La moneda tiene que ser la que la tienda declara para el país.
export function leerApple(html: string, nombre: string, monedaEsperada: string): Lectura {
  const productos = jsonLd(html).flatMap((j) => (Array.isArray(j) ? j : [j])) as { "@type"?: string; name?: string; offers?: unknown }[];
  const p = productos.find((x) => x["@type"] === "Product" && x.name === nombre);
  if (!p) return { ok: false, motivo: `la página no trae el producto «${nombre}» en sus datos estructurados` };
  const ofertas = (Array.isArray(p.offers) ? p.offers : [p.offers]) as { lowPrice?: unknown; price?: unknown; priceCurrency?: unknown }[];
  const o = ofertas.find((x) => x && (typeof x.lowPrice === "number" || typeof x.price === "number"));
  if (!o) return { ok: false, motivo: "sin precio en los datos estructurados" };
  const monto = (typeof o.lowPrice === "number" ? o.lowPrice : o.price) as number;
  const moneda = typeof o.priceCurrency === "string" ? o.priceCurrency : "";
  if (!(monto > 0)) return { ok: false, motivo: `precio inválido (${monto})` };
  if (moneda !== monedaEsperada) return { ok: false, motivo: `la tienda cobra en ${moneda || "una moneda sin declarar"}, no en ${monedaEsperada}` };
  return { ok: true, precio: { monto, moneda } };
}

interface PlanSpotify {
  planId?: string;
  offerTypeId?: string | null;
  primaryPriceDescription?: string | null;
  secondaryPriceDescription?: string | null;
  prepaidSection?: { prepaid?: { prepaidOption?: { price?: string }[] } } | null;
}

// Spotify: el plan PREMIUM_INDIVIDUAL de __NEXT_DATA__. Con oferta de entrada, el precio de lista es el
// de «después» (secondaryPriceDescription); sin oferta, el principal.
export function leerSpotify(html: string, monedaLocal: string): Lectura {
  const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!m) return { ok: false, motivo: "la página no trae los datos de los planes" };
  let datos: unknown;
  try {
    datos = JSON.parse(m[1]);
  } catch {
    return { ok: false, motivo: "los datos de los planes no se pueden leer" };
  }
  const planes: PlanSpotify[] = [];
  const visitar = (o: unknown) => {
    if (!o || typeof o !== "object") return;
    if (typeof (o as PlanSpotify).planId === "string") planes.push(o as PlanSpotify);
    for (const v of Object.values(o)) visitar(v);
  };
  visitar(datos);
  const plan = planes.find((p) => p.planId === "PREMIUM_INDIVIDUAL");
  if (!plan) return { ok: false, motivo: "el país no tiene el plan Premium Individual" };
  const conOferta = Boolean(plan.offerTypeId);
  const texto = conOferta ? plan.secondaryPriceDescription : plan.primaryPriceDescription;
  if (!texto) return { ok: false, motivo: "no aparece el precio de lista del plan" };
  const monto = montosDeTexto(texto).find((x) => x.monto > 0);
  if (!monto) return { ok: false, motivo: `no se pudo leer el precio en «${texto}»` };
  const moneda = monedaDeMarca(monto.marca, monedaLocal);
  const prepagos = (plan.prepaidSection?.prepaid?.prepaidOption ?? []).flatMap((o) => montosDeTexto(o.price ?? "")).map((x) => x.monto);
  const detalle = prepagos.length && !prepagos.includes(monto.monto) ? `prepagos ${prepagos.join(", ")} sin uno igual al mensual` : undefined;
  return { ok: true, precio: { monto: monto.monto, moneda }, ...(detalle ? { detalle } : {}) };
}

// robots.txt: el grupo de nuestro agente o, si no hay, el de «*». Gana la regla más larga que coincide;
// a igual largo, Allow. Soporta * y $ como Google.
export function robotsPermite(robots: string, agente: string, ruta: string): boolean {
  const grupos: { agentes: string[]; reglas: { permite: boolean; patron: string }[] }[] = [];
  let actual: (typeof grupos)[number] | null = null;
  let leyendoAgentes = false;
  for (const linea of robots.split(/\r?\n/)) {
    const sinComentario = linea.replace(/#.*/, "").trim();
    const i = sinComentario.indexOf(":");
    if (i < 0) continue;
    const clave = sinComentario.slice(0, i).trim().toLowerCase();
    const valor = sinComentario.slice(i + 1).trim();
    if (clave === "user-agent") {
      if (!actual || !leyendoAgentes) {
        actual = { agentes: [], reglas: [] };
        grupos.push(actual);
      }
      actual.agentes.push(valor.toLowerCase());
      leyendoAgentes = true;
    } else if (clave === "allow" || clave === "disallow") {
      leyendoAgentes = false;
      if (actual && valor) actual.reglas.push({ permite: clave === "allow", patron: valor });
    } else leyendoAgentes = false;
  }
  const nombre = agente.toLowerCase();
  const propios = grupos.filter((g) => g.agentes.some((a) => a !== "*" && nombre.includes(a)));
  const aplican = propios.length ? propios : grupos.filter((g) => g.agentes.includes("*"));
  let mejor: { permite: boolean; largo: number } | null = null;
  for (const r of aplican.flatMap((g) => g.reglas)) {
    const fin = r.patron.endsWith("$");
    const cuerpo = (fin ? r.patron.slice(0, -1) : r.patron).split("*").map((s) => s.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*");
    if (!new RegExp(`^${cuerpo}${fin ? "$" : ""}`).test(ruta)) continue;
    if (!mejor || r.patron.length > mejor.largo || (r.patron.length === mejor.largo && r.permite)) mejor = { permite: r.permite, largo: r.patron.length };
  }
  return mejor ? mejor.permite : true;
}
