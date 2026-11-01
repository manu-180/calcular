import { formaAr } from "./i18n/arabe";
import { LOCALE_RTL, simboloLegible } from "./i18n/direccion";
import { formaHe } from "./i18n/hebreo";
import { idiomaDeLocale } from "./i18n/resolver";
import { nombresUnidad, UNIDAD_PEGADA } from "./i18n/unidades";
import { esFechaISO } from "./vigencia";
import type { FechaISO, Moneda, ReglaRedondeo, Unidad } from "./tipos";
import { esMoneda, UNIDADES_REFERENCIA } from "./tipos";

// Un formateador por (locale, opciones), no por llamada: cada constructor de Intl arma un objeto ICU de
// varios KB y rellenar() los pide miles de veces por página (ver fechaEnZona en vigencia.ts).
const numeros = new Map<string, Intl.NumberFormat>();
const fechas = new Map<string, Intl.DateTimeFormat>();
function numero(locale: string, opciones: Intl.NumberFormatOptions): Intl.NumberFormat {
  const clave = `${locale}|${JSON.stringify(opciones)}`;
  let f = numeros.get(clave);
  if (!f) numeros.set(clave, (f = new Intl.NumberFormat(locale, opciones)));
  return f;
}
function fechaFmt(locale: string, opciones: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  const clave = `${locale}|${JSON.stringify(opciones)}`;
  let f = fechas.get(clave);
  if (!f) fechas.set(clave, (f = new Intl.DateTimeFormat(locale, opciones)));
  return f;
}

export function decimalesDeMoneda(moneda: Moneda, locale: string): number {
  return numero(locale, { style: "currency", currency: moneda }).resolvedOptions().maximumFractionDigits ?? 2;
}

// Redondeo decimal sin el error binario de Math.round(x * 100) / 100 (1.005 da 1.00 con el truco
// clásico). Se corre la coma en la representación decimal con notación exponencial.
function correrComa(n: number, decimales: number): number {
  const [mantisa, exponente = "0"] = String(n).split("e");
  return Number(`${mantisa}e${Number(exponente) + decimales}`);
}

export function redondear(n: number, regla: ReglaRedondeo): number {
  if (!Number.isFinite(n)) return n;
  const signo = n < 0 ? -1 : 1;
  // Un resultado como 2166.655 llega como 2166.6549999999997 y sin limpiar redondea a 2166.65. Se
  // recorta a 15 cifras significativas (lo que un double garantiza) antes de correr la coma.
  const abs = Number(Math.abs(n).toPrecision(15));
  const escalado = correrComa(abs, regla.decimales);
  let entero: number;
  if (regla.modo === "truncar") {
    entero = Math.floor(escalado + 1e-9);
  } else if (regla.modo === "mitad-par") {
    const piso = Math.floor(escalado);
    const resto = escalado - piso;
    if (Math.abs(resto - 0.5) < 1e-9) entero = piso % 2 === 0 ? piso : piso + 1;
    else entero = Math.round(escalado);
  } else {
    entero = Math.round(escalado);
  }
  const resultado = signo * correrComa(entero, -regla.decimales);
  return Object.is(resultado, -0) ? 0 : resultado;
}

// simbolo pisa el que elige Intl para ese locale (es-PA muestra "USD 1,250.50" y en Panamá se
// escribe "B/. 1,250.50"); el resto del formato sigue siendo el del locale.
export function formatearMoneda(n: number, locale: string, moneda: Moneda, decimales?: number, simbolo?: string): string {
  const d = decimales ?? decimalesDeMoneda(moneda, locale);
  const f = numero(locale, { style: "currency", currency: moneda, minimumFractionDigits: d, maximumFractionDigits: d });
  if (!simbolo && !LOCALE_RTL.test(locale)) return f.format(n);
  return f
    .formatToParts(n)
    .map((p) => (p.type === "currency" ? simboloLegible(simbolo ?? p.value, locale) : p.value))
    .join("");
}

// Mayúscula o minúscula en la primera letra con las reglas del locale: en turco «i» sube a «İ» e «I»
// baja a «ı» (toUpperCase daría «Iş» en vez de «İş»).
export function mayusculaInicial(s: string, locale: string): string {
  return s ? s.charAt(0).toLocaleUpperCase(locale) + s.slice(1) : s;
}

export function minusculaInicial(s: string, locale: string): string {
  return s ? s.charAt(0).toLocaleLowerCase(locale) + s.slice(1) : s;
}

// decimales fija los decimales; sin él van de 0 a `maximo` (2 si no se dice: un monto en KWD o TND
// lleva 3 y el formulario pasa los de la moneda para no perder el último).
export function formatearNumero(n: number, locale: string, decimales?: number, maximo = 2): string {
  return numero(locale, { minimumFractionDigits: decimales ?? 0, maximumFractionDigits: decimales ?? Math.max(0, maximo) }).format(n);
}

export function formatearPorcentaje(porcentaje: number, locale: string, decimales = 2): string {
  return numero(locale, { style: "percent", minimumFractionDigits: 0, maximumFractionDigits: decimales }).format(porcentaje / 100);
}

// En francés el primer día del mes es ordinal («1er juin»); Intl escribe «1 juin».
export function formatearFecha(fecha: FechaISO, locale: string, estilo: "larga" | "corta" = "larga"): string {
  const f = fechaFmt(locale, {
    timeZone: "UTC",
    ...(estilo === "larga" ? { day: "numeric", month: "long", year: "numeric" } : { day: "2-digit", month: "2-digit", year: "numeric" }),
  });
  const d = new Date(`${fecha}T12:00:00Z`);
  if (estilo !== "larga" || idiomaDeLocale(locale) !== "fr") return f.format(d);
  return f
    .formatToParts(d)
    .map((p) => (p.type === "day" && p.value === "1" ? "1er" : p.value))
    .join("");
}

function nombreDeUnidad(n: number, unidad: string, locale: string): string | null {
  const nombres = nombresUnidad(idiomaDeLocale(locale) ?? "es", locale);
  if (!(unidad in nombres)) return null;
  const formas = nombres[unidad as keyof typeof nombres];
  // Dual: el árabe trae además "pocos" y "muchos" (FormasAr); el hebreo, solo uno, dos y otros (FormasHe).
  if ("dos" in formas) return "pocos" in formas ? formaAr(n, formas) : formaHe(n, formas);
  const categoria = new Intl.PluralRules(locale).select(n);
  const forma = categoria === "one" ? formas.uno : categoria === "few" ? (formas.pocos ?? formas.otros) : categoria === "many" ? (formas.muchos ?? formas.otros) : formas.otros;
  const pegada = UNIDAD_PEGADA.has(idiomaDeLocale(locale) ?? "es");
  return `{n}${pegada ? "" : " "}${forma}`;
}

function decimalesPropios(n: number): number {
  const [, dec = ""] = String(n).split(".");
  return dec.length;
}

// Un dato se muestra con los decimales que trae la norma: el salario mínimo en COP o UYU es entero y
// con ",00" se lee como un error; la UF (CLP) y la UI (UYU) tienen más decimales que su moneda.
export function formatearValorUnidad(n: number, unidad: Unidad, locale: string, simbolos?: Readonly<Partial<Record<Moneda, string>>>): string {
  if (esMoneda(unidad)) {
    const moneda = unidad;
    const d = Number.isInteger(n) ? 0 : Math.min(6, Math.max(decimalesDeMoneda(moneda, locale), decimalesPropios(n)));
    return formatearMoneda(n, locale, moneda, d, simbolos?.[moneda]);
  }
  if (unidad === "%") return formatearPorcentaje(n, locale, 4);
  const nombre = nombreDeUnidad(n, unidad, locale);
  if (nombre) return nombre.replace("{n}", formatearNumero(n, locale));
  if ((UNIDADES_REFERENCIA as readonly string[]).includes(unidad)) return `${formatearNumero(n, locale, undefined)} ${unidad}`;
  return formatearNumero(n, locale, n % 1 === 0 ? 0 : undefined);
}

export interface Separadores {
  decimal: string;
  grupo: string;
}

export function separadoresDe(locale: string): Separadores {
  const partes = new Intl.NumberFormat(locale).formatToParts(1234567.5);
  const decimal = partes.find((p) => p.type === "decimal")?.value ?? ".";
  const grupo = partes.find((p) => p.type === "group")?.value ?? ",";
  return { decimal, grupo };
}

const ESPACIOS = /[\s   ]/g;
// sv, nb y fi escriben el negativo con el signo menos de Unicode (U+2212) y el formulario muestra los
// valores así: sin normalizarlo, «−12 345» se leía como 12345.
const MENOS = /−/g;
const normalizar = (texto: string) => texto.replace(ESPACIOS, "").replace(MENOS, "-");

// Dígitos de otras escrituras: se pasan a ASCII antes de las reglas (\d de JavaScript solo ve 0-9 y
// los tiraría como letras).
// - Teclados árabes y persas escriben ٣٬٥٠٠٫٧٥ (dígitos arábigo-índicos, ٬ de miles y ٫ decimal) y la
//   coma «،»: ٫ y ٬ dicen sin ambigüedad qué son, así que van al decimal y al separador de miles del
//   locale; «،» se lee como una coma más.
// - bn-BD formatea con dígitos bengalíes (১২,৩৪,৫৬৭) y los teclados bengalíes (Avro, Bijoy, Gboard)
//   escriben ০-৯. Los separadores de bn son los latinos («.» decimal y «,» de miles), así que no cambian.
// - En tailandés se pueden escribir los dígitos ๐ a ๙ (th-TH formatea con los arábigos).
const DIGITO_ARABE = /[٠-٩۰-۹]/g;
const DIGITO_BENGALI = /[০-৯]/g;
const HAY_BENGALI = /[০-৯]/;
const DIGITO_TAILANDES = /[๐-๙]/g;

function aLatino(texto: string, seps: Separadores = { decimal: ".", grupo: "," }): string {
  const t = texto.replace(DIGITO_BENGALI, (d) => String(d.charCodeAt(0) - 0x09e6)).replace(DIGITO_TAILANDES, (d) => String(d.charCodeAt(0) - 0x0e50));
  if (!/[؀-ۿ]/.test(t)) return t;
  return t
    .replace(DIGITO_ARABE, (d) => String(d.charCodeAt(0) & 0xf))
    .replace(/٫/g, seps.decimal)
    .replace(/٬/g, seps.grupo)
    .replace(/،/g, ",");
}

const aBengali = (texto: string): string => texto.replace(/\d/g, (d) => String.fromCharCode(0x09e6 + Number(d)));

function separadoresAscii(locale: string): Separadores {
  const { decimal, grupo } = separadoresDe(locale);
  return { decimal: decimal === "٫" ? "." : decimal, grupo: grupo === "٬" ? "," : grupo };
}

// El punto o la coma pegados a una letra o a «/» son del símbolo de la moneda, no del número:
// «د.ك.» (ar-KW), «د.ب.» (ar-BH), «S/.» o «B/.». Sin esto, «١٬٥٤٤٫١٣٦ د.ك.» termina en punto y no se lee.
function sinPuntosDeSimbolo(texto: string): string {
  return texto.replace(/(?<=[\p{L}/])[.,]+|[.,]+(?=[\p{L}/])/gu, "");
}

// en-IN y bn-BD agrupan en lakhs y crores («12,00,000»): el formulario muestra los valores así y tiene
// que poder leerlos de vuelta. Solo se acepta en los locales que formatean de esa manera.
const conLakhs = (locale: string): boolean => aLatino(new Intl.NumberFormat(locale).format(1234567)).replace(/\D/g, ",") === "12,34,567";

function gruposValidos(entero: string, separador: string, locale: string): boolean {
  const partes = entero.split(separador);
  if (partes.length === 1) return true;
  if (/^\d{1,3}$/.test(partes[0]) && partes.slice(1).every((p) => /^\d{3}$/.test(p))) return true;
  return conLakhs(locale) && /^\d{1,2}$/.test(partes[0]) && partes.slice(1, -1).every((p) => /^\d{2}$/.test(p)) && /^\d{3}$/.test(partes.at(-1)!);
}

// Reglas de parseo (D3 del ADR: un parseo equivocado multiplica por mil):
// 1. Se ignoran espacios (incluido el espacio fino que usa es-CR como separador de miles),
//    símbolos de moneda y letras.
// 2. Si aparecen punto y coma, el último que aparece es el decimal.
// 3. Si aparece uno solo de los dos y es el decimal del locale, es decimal (una sola vez).
// 4. Si es el separador de miles del locale: repetido o seguido de exactamente 3 dígitos, es miles;
//    una sola vez con 1 o 2 dígitos detrás, se toma como decimal (quien escribe "1474,77" en es-PE).
// 5. Con milesAmbiguos (campos de moneda y enteros): el decimal del locale como único separador,
//    una sola vez y con exactamente 3 dígitos detrás ("5.000" en es-MX) da null. Quien lo escribe
//    casi siempre quiso decir miles, y leerlo como 5 divide el resultado por mil sin avisar. Salvo
//    con decimales >= 3 (la moneda del campo los usa: KWD, BHD, OMR, JOD, TND, LYD): ahí
//    «1544,136» en fr-TN o «5.000» en en-KW son montos con sus tres decimales.
// 6. Los dígitos arábigo-índicos y persas, «٫», «٬» y «،» se leen (aLatino), y los puntos del
//    símbolo de la moneda («د.ك.», «S/.») no cuentan (sinPuntosDeSimbolo).
// Cualquier otra forma devuelve null: se le pide a la persona que lo escriba de nuevo.
// En japonés, chino y coreano se escriben montos con unidades de 10⁴ («3万», «1億2000万», «5천만»).
// Sin esto parsearNumero tiraría la unidad como si fuera una letra y «3万» daría 3: un error de diez
// mil veces. Las unidades grandes (万, 億, 兆) van de mayor a menor; 千 vale dentro de cada tramo
// («5천만» es 5000 × 10⁴) y el último tramo puede ir sin unidad.
const GRANDES_CJK: Readonly<Record<string, number>> = { 万: 1e4, 萬: 1e4, 만: 1e4, 億: 1e8, 亿: 1e8, 억: 1e8, 兆: 1e12, 조: 1e12 };
const RE_UNIDAD_CJK = /[千천万萬만億亿억兆조]/;

function tramoCjk(texto: string, locale: string, opciones: OpcionesParseo): number | null {
  const partes = texto.split(/[千천]/);
  if (partes.length > 2) return null;
  if (partes.length === 1) return texto ? parsearNumero(texto, locale, opciones) : 1;
  const miles = partes[0] ? parsearNumero(partes[0], locale, opciones) : 1;
  const resto = partes[1] ? parsearNumero(partes[1], locale, opciones) : 0;
  if (miles === null || resto === null || resto < 0 || resto >= 1000) return null;
  return miles * 1000 + resto;
}

function conUnidadesCjk(texto: string, locale: string, opciones: OpcionesParseo): number | null {
  const negativo = /^[^\d]*-/.test(texto);
  let resto = texto.replace(/[^\d.,千천万萬만億亿억兆조]/g, "");
  let total = 0;
  let anterior = Infinity;
  for (;;) {
    const m = /^([\d.,千천]*)([万萬만億亿억兆조])/.exec(resto);
    if (!m) break;
    const unidad = GRANDES_CJK[m[2]];
    if (unidad >= anterior) return null;
    const cifra = tramoCjk(m[1], locale, opciones);
    if (cifra === null || cifra < 0) return null;
    total += cifra * unidad;
    anterior = unidad;
    resto = resto.slice(m[0].length);
  }
  if (resto) {
    const cola = tramoCjk(resto, locale, opciones);
    if (cola === null || cola < 0 || cola >= anterior) return null;
    total += cola;
  }
  if (!Number.isFinite(total)) return null;
  return negativo ? -total : total;
}

// En tailandés se escriben montos con palabras de unidad («2.5 ล้าน», «1 ล้าน 5 แสน», «3 หมื่น»): igual que
// con 万, sin esto «2 ล้าน» daría 2 en vez de 2.000.000. Van de mayor a menor y la cola puede ir sin
// unidad. Los dígitos tailandeses (๐ a ๙) ya llegan pasados a ASCII (aLatino).
const UNIDADES_TH: Readonly<Record<string, number>> = { ล้าน: 1e6, แสน: 1e5, หมื่น: 1e4, พัน: 1e3 };
const RE_UNIDAD_TH = /ล้าน|แสน|หมื่น|พัน/;

function conUnidadesTh(texto: string, locale: string, opciones: OpcionesParseo): number | null {
  const negativo = /^[^\d]*-/.test(texto);
  // Solo cuentan las cifras y las palabras de unidad: «บาท», espacios y signos se ignoran.
  const fichas = [...texto.matchAll(/ล้าน|แสน|หมื่น|พัน|[\d.,]+/g)].map((m) => m[0]);
  let total = 0;
  let anterior = Infinity;
  for (let i = 0; i < fichas.length; i++) {
    const unidad = UNIDADES_TH[fichas[i]];
    const siguiente = UNIDADES_TH[fichas[i + 1] ?? ""];
    if (unidad === undefined && siguiente === undefined) {
      // Cola sin unidad: tiene que ser la última y menor que la unidad anterior.
      if (i !== fichas.length - 1) return null;
      const cola = parsearNumero(fichas[i], locale, opciones);
      if (cola === null || cola < 0 || cola >= anterior) return null;
      total += cola;
      continue;
    }
    const valor = unidad ?? siguiente;
    if (valor >= anterior) return null;
    const cifra = unidad === undefined ? parsearNumero(fichas[i], locale, opciones) : 1;
    if (cifra === null || cifra < 0) return null;
    total += cifra * valor;
    anterior = valor;
    if (unidad === undefined) i++;
  }
  if (!fichas.length || !Number.isFinite(total)) return null;
  return negativo ? -total : total;
}

export interface OpcionesParseo {
  milesAmbiguos?: boolean;
  // Decimales de la moneda del campo (decimalesDeMoneda); con 3 o más, la regla 5 no corre.
  decimales?: number;
}

export function parsearNumero(texto: string, locale: string, opciones: OpcionesParseo = {}): number | null {
  const seps = separadoresAscii(locale);
  const normal = aLatino(texto, seps).normalize("NFKC");
  if (RE_UNIDAD_CJK.test(normal)) return conUnidadesCjk(normal, locale, opciones);
  if (RE_UNIDAD_TH.test(normal)) return conUnidadesTh(normal, locale, opciones);
  const sinEspacios = sinPuntosDeSimbolo(normalizar(normal));
  const negativo = /^[^\d]*-/.test(sinEspacios);
  const limpio = sinEspacios.replace(/[^\d.,]/g, "");
  if (!/\d/.test(limpio)) return null;
  if (/[.,]{2,}/.test(limpio)) return null;
  if (/[.,]$/.test(limpio) || (/^[.,]/.test(limpio) && !/^[.,]\d+$/.test(limpio))) return null;
  const decLocale = seps.decimal;
  const hayPunto = limpio.includes(".");
  const hayComa = limpio.includes(",");
  let entero = limpio;
  let fraccion = "";
  if (hayPunto && hayComa) {
    const dec = limpio.lastIndexOf(".") > limpio.lastIndexOf(",") ? "." : ",";
    const grupo = dec === "." ? "," : ".";
    const pos = limpio.lastIndexOf(dec);
    entero = limpio.slice(0, pos);
    fraccion = limpio.slice(pos + 1);
    if (entero.includes(dec) || fraccion.includes(grupo) || !gruposValidos(entero, grupo, locale)) return null;
    entero = entero.split(grupo).join("");
  } else if (hayPunto || hayComa) {
    const sep = hayPunto ? "." : ",";
    const veces = limpio.split(sep).length - 1;
    if (sep === decLocale) {
      if (veces > 1) return null;
      [entero, fraccion] = limpio.split(sep);
      if (opciones.milesAmbiguos && (opciones.decimales ?? 2) < 3 && /[1-9]/.test(entero) && fraccion.length === 3) return null;
    } else {
      const [cabeza, ...resto] = limpio.split(sep);
      if (veces === 1 && resto[0].length !== 3) {
        if (resto[0].length > 2) return null;
        entero = cabeza;
        fraccion = resto[0];
      } else {
        if (!gruposValidos(limpio, sep, locale)) return null;
        entero = limpio.split(sep).join("");
      }
    }
  }
  const n = Number(`${entero || "0"}${fraccion ? `.${fraccion}` : ""}`);
  if (!Number.isFinite(n)) return null;
  return negativo ? -n : n;
}

// El número que la persona probablemente quiso escribir cuando parsearNumero lo rechazó por
// milesAmbiguos ("5.000" da "5000"); null si el texto no es ese caso. El sugerido va con los mismos
// dígitos que escribió la persona («৫.০০০» da «৫০০০»).
export function sugerenciaMiles(texto: string, locale: string): { sugerido: string; separador: string } | null {
  const seps = separadoresAscii(locale);
  const sinEspacios = sinPuntosDeSimbolo(normalizar(aLatino(texto, seps).normalize("NFKC")));
  const limpio = sinEspacios.replace(/[^\d.,]/g, "");
  const dec = seps.decimal;
  const otro = dec === "." ? "," : ".";
  if (limpio.includes(otro)) return null;
  const partes = limpio.split(dec);
  if (partes.length !== 2 || !/^\d*[1-9]\d*$/.test(partes[0]) || !/^\d{3}$/.test(partes[1])) return null;
  const negativo = /^[^\d]*-/.test(sinEspacios);
  const sugerido = `${negativo ? "-" : ""}${String(Number(partes.join("")))}`;
  return { sugerido: HAY_BENGALI.test(texto) ? aBengali(sugerido) : sugerido, separador: dec };
}

// Un resultado de texto armado por la calculadora («5:30», «3 de 10») trae cifras ASCII; en bengalí van
// con dígitos ০-৯ como el resto de la página (ADR 0002, D14). En los demás idiomas queda igual.
export function textoDelLocale(texto: string, locale: string): string {
  return idiomaDeLocale(locale) === "bn" ? aBengali(texto) : texto;
}

export function parsearEntero(texto: string, locale: string): number | null {
  const n = parsearNumero(texto, locale);
  return n !== null && Number.isInteger(n) ? n : null;
}

export function parsearFecha(texto: string): FechaISO | null {
  const t = texto.trim();
  return esFechaISO(t) ? t : null;
}
