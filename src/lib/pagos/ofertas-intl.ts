import type { Concepto } from "@/motor/conceptos";
import type { Campo, CampoNumerico, Trato } from "@/motor/tipos";
import { avisoEs } from "./textos/aviso-es";
import { segunTrato } from "./textos/tipos";

// Qué se vende dentro del resultado de cada calculadora de calcularya.com, por concepto y no por
// calculadora: una calculadora nueva de un concepto que ya tiene oferta la recibe sola.
//
// Este archivo es la estructura (conceptos, precio, escenarios) y lo que necesita el navegador. Los
// textos de venta viven en src/lib/pagos/textos/<idioma>.ts y no se importan desde acá: son pesados y
// el navegador recibe solo los de su país, ya resueltos, en el JSON de /api/pagos/ofertas.
//
// Dos clases de producto:
// - la planilla de sueldo y liquidación de un país (catalogo-intl.ts), opcional: solo la tienen los
//   países que ya la escribieron;
// - los informes de esta lista: una página imprimible que vuelve a correr la misma calculadora con
//   los datos de la compra, así el número del informe es por construcción el de la web.
// Sin familia a propósito: salario mínimo, tipo de cambio, conversores de unidad (el número es el
// dato oficial del día y no hay nada que agregarle), sueldo neto (lo cubre la planilla) y las
// calculadoras propias.

export const SIN_FAMILIA: readonly Concepto[] = ["salario-minimo", "tipo-de-cambio", "conversor-unidad", "sueldo-neto", "propio"];

export type ClaveFamilia =
  | "liquidacion"
  | "pagos-laborales"
  | "impuesto"
  | "contratacion"
  | "ajuste-inflacion"
  | "regimen"
  | "deposito"
  | "alimentos"
  | "jubilacion"
  | "plan-prestamo"
  | "plan-hipoteca"
  | "plan-inversion"
  | "plan-deudas"
  | "plan-presupuesto"
  | "plan-negocio"
  | "kit-freelance"
  | "plan-sueldo"
  | "kit-calculos"
  | "kit-gastos-grupo"
  | "kit-estudio"
  | "kit-fechas"
  | "plan-salud"
  | "plan-embarazo"
  | "plan-entrenamiento"
  | "kit-viaje"
  | "kit-hogar"
  | "kit-obra"
  | "kit-facturacion";

// moneda: el primer monto obligatorio · tasa: el primer porcentaje · horas y plazo: solo los ids que
// declara la familia. Nunca se elige por la etiqueta: cambia con el idioma.
export type TipoEscenario = "moneda" | "tasa" | "horas" | "plazo";

export interface EscenarioFamilia {
  tipo: TipoEscenario;
  // Ids de campo preferidos, en orden. Si la familia los declara, solo valen esos.
  campos?: readonly string[];
}

export interface FamiliaInforme {
  clave: ClaveFamilia;
  slug: string;
  conceptos: readonly Concepto[];
  precioCentavos: number;
  escenarios: EscenarioFamilia | null;
  // Conceptos cuya calculadora tiene que declarar tablas: el texto de venta promete la tabla completa.
  conTabla?: readonly Concepto[];
}

const USD = (n: number) => n * 100;

// Precio por familia: este es el único lugar. Cambiar uno ya vendido exige sumar el anterior a
// preciosAnterioresCentavos (si no, un pago viejo deja de cubrir la entrega).
export const FAMILIAS: readonly FamiliaInforme[] = [
  { clave: "liquidacion", slug: "informe-liquidacion", conceptos: ["liquidacion-final", "indemnizacion-despido", "preaviso"], precioCentavos: USD(9), escenarios: null },
  {
    clave: "pagos-laborales",
    slug: "informe-pagos-laborales",
    conceptos: ["bono-semestral", "decimo-cuarto", "vacaciones", "horas-extra", "reparto-utilidades", "fondo-cesantia"],
    precioCentavos: USD(5),
    escenarios: { tipo: "horas", campos: ["horas", "horasExtra", "horasDiurnas", "extraDiurnas", "diurnas", "suplementarias"] },
  },
  { clave: "impuesto", slug: "informe-impuesto", conceptos: ["impuesto-renta", "retencion-honorarios"], precioCentavos: USD(7), escenarios: { tipo: "moneda" } },
  {
    clave: "contratacion",
    slug: "informe-contratacion",
    conceptos: ["costo-empleador", "aportes-seguridad-social", "trabajo-domestico"],
    precioCentavos: USD(9),
    escenarios: { tipo: "moneda" },
  },
  { clave: "ajuste-inflacion", slug: "informe-ajuste-inflacion", conceptos: ["inflacion"], precioCentavos: USD(7), escenarios: null },
  { clave: "regimen", slug: "informe-regimen-simplificado", conceptos: ["regimen-simplificado"], precioCentavos: USD(7), escenarios: { tipo: "moneda" } },
  { clave: "deposito", slug: "informe-deposito", conceptos: ["plazo-fijo"], precioCentavos: USD(5), escenarios: { tipo: "plazo", campos: ["dias", "plazo"] } },
  { clave: "alimentos", slug: "informe-alimentos", conceptos: ["pension-alimentos"], precioCentavos: USD(9), escenarios: { tipo: "moneda" } },
  { clave: "jubilacion", slug: "informe-jubilacion", conceptos: ["jubilacion"], precioCentavos: USD(7), escenarios: { tipo: "moneda" } },
  { clave: "plan-prestamo", slug: "plan-prestamo", conceptos: ["prestamo", "tasa-efectiva"], precioCentavos: USD(5), escenarios: { tipo: "tasa" }, conTabla: ["prestamo"] },
  { clave: "plan-hipoteca", slug: "plan-hipoteca", conceptos: ["hipoteca", "alquilar-o-comprar"], precioCentavos: USD(9), escenarios: { tipo: "tasa" }, conTabla: ["hipoteca"] },
  {
    clave: "plan-inversion",
    slug: "plan-inversion",
    conceptos: ["interes-compuesto", "interes-simple", "meta-de-ahorro", "ahorro-retiro"],
    precioCentavos: USD(7),
    escenarios: { tipo: "tasa" },
    conTabla: ["interes-compuesto"],
  },
  {
    clave: "plan-deudas",
    slug: "plan-deudas",
    conceptos: ["tarjeta-de-credito"],
    precioCentavos: USD(5),
    escenarios: { tipo: "moneda", campos: ["pago", "pagoMensual", "cuota"] },
    conTabla: ["tarjeta-de-credito"],
  },
  { clave: "plan-presupuesto", slug: "plan-presupuesto", conceptos: ["presupuesto", "fondo-de-emergencia", "costo-de-un-auto"], precioCentavos: USD(5), escenarios: { tipo: "moneda" } },
  {
    clave: "plan-negocio",
    slug: "plan-negocio",
    conceptos: ["rendimiento-inversion", "margen-de-ganancia", "punto-de-equilibrio"],
    precioCentavos: USD(7),
    escenarios: { tipo: "moneda" },
  },
  { clave: "kit-freelance", slug: "kit-freelance", conceptos: ["tarifa-freelance"], precioCentavos: USD(5), escenarios: { tipo: "moneda" } },
  { clave: "plan-sueldo", slug: "plan-sueldo", conceptos: ["conversor-sueldo", "aumento-de-sueldo", "horas-trabajadas"], precioCentavos: USD(4), escenarios: { tipo: "moneda" } },
  { clave: "kit-calculos", slug: "kit-calculos", conceptos: ["porcentaje", "variacion-porcentual", "regla-de-tres", "descuento"], precioCentavos: USD(3), escenarios: { tipo: "moneda" } },
  { clave: "kit-gastos-grupo", slug: "kit-gastos-grupo", conceptos: ["propina", "dividir-gastos"], precioCentavos: USD(3), escenarios: { tipo: "moneda" } },
  { clave: "kit-estudio", slug: "kit-estudio", conceptos: ["promedio"], precioCentavos: USD(3), escenarios: null },
  { clave: "kit-fechas", slug: "kit-fechas", conceptos: ["edad", "dias-entre-fechas", "sumar-dias"], precioCentavos: USD(3), escenarios: null },
  { clave: "plan-salud", slug: "plan-salud", conceptos: ["imc", "calorias"], precioCentavos: USD(5), escenarios: null },
  { clave: "plan-embarazo", slug: "plan-embarazo", conceptos: ["fecha-de-parto", "ovulacion"], precioCentavos: USD(5), escenarios: null },
  { clave: "plan-entrenamiento", slug: "plan-entrenamiento", conceptos: ["ritmo-de-carrera"], precioCentavos: USD(5), escenarios: null },
  { clave: "kit-viaje", slug: "kit-viaje", conceptos: ["combustible"], precioCentavos: USD(3), escenarios: { tipo: "moneda" } },
  { clave: "kit-hogar", slug: "kit-hogar", conceptos: ["consumo-electrico"], precioCentavos: USD(3), escenarios: { tipo: "moneda" } },
  { clave: "kit-obra", slug: "kit-obra", conceptos: ["pintura", "metros-cuadrados", "ceramicos", "hormigon"], precioCentavos: USD(5), escenarios: null },
  { clave: "kit-facturacion", slug: "kit-facturacion", conceptos: ["iva"], precioCentavos: USD(4), escenarios: { tipo: "moneda" } },
];

export const PRECIO_PLANILLA_CENTAVOS = USD(7);

const POR_CONCEPTO = new Map<string, FamiliaInforme>();
for (const f of FAMILIAS) {
  for (const c of f.conceptos) {
    if (POR_CONCEPTO.has(c)) throw new Error(`ofertas intl: el concepto ${c} está en dos familias`);
    POR_CONCEPTO.set(c, f);
  }
}

export function familiaDeConcepto(concepto: string): FamiliaInforme | null {
  return POR_CONCEPTO.get(concepto) ?? null;
}

export function familiaPorSlug(slug: string): FamiliaInforme | null {
  return FAMILIAS.find((f) => f.slug === slug) ?? null;
}

export function familiaPorClave(clave: string): FamiliaInforme | null {
  return FAMILIAS.find((f) => f.clave === clave) ?? null;
}

// ─── Lo que viaja al navegador ────────────────────────────────────────────────────────────────

export type TipoProducto = "planilla" | "informe";

export interface OfertaPublica {
  producto: string;
  slug: string;
  tipo: TipoProducto;
  familia: ClaveFamilia | "planilla";
  precioCentavos: number;
  tituloCorto: string;
  hoja?: string;
}

export interface OfertasCalculadora {
  calc: string;
  nombre: string;
  ofertas: readonly OfertaPublica[];
}

// Cuántas unidades de la moneda local vale un dólar hoy, para mostrar junto al precio en USD. Solo
// referencia: se cobra en dólares. Sin serie confiable del país, no hay referencia y va solo el USD.
export interface ReferenciaLocal {
  moneda: string;
  locale: string;
  tasa: number;
}

export interface PuntoResuelto {
  titulo: string;
  texto: string;
}

// Lo que dice la tarjeta de un producto, ya en el idioma y el trato del país.
export interface CopyTarjeta {
  nombre: string;
  gancho: string;
  incluye: readonly PuntoResuelto[];
}

export interface TextosAviso {
  pronto: string;
  titulo: string;
  ayuda: string;
  boton: string;
  listo: string;
  error: string;
  correo: string;
}

// Para quien arma el aviso sin el JSON de ofertas (la página de compra pasa solo el trato).
export function avisoRespaldo(trato: Trato): TextosAviso {
  const a = avisoEs;
  return {
    pronto: a.pronto,
    titulo: segunTrato(a.titulo, trato),
    ayuda: segunTrato(a.ayuda, trato),
    boton: a.boton,
    listo: segunTrato(a.listo, trato),
    error: segunTrato(a.error, trato),
    correo: segunTrato(a.correo, trato),
  };
}

export interface TextosTarjeta {
  cejaInforme: string;
  cejaPlanilla: string;
  pagoUnico: string;
  comprarInforme: string;
  comprarPlanilla: string;
  confianza: string;
  verDetalle: string;
  tambien: string;
  tablasOficiales: string;
  bajadaInforme: string;
  bajadaPlanilla: string;
  bajadaPlanillaHoja: string;
  equivale: string;
  cobroDolares: string;
  si: string;
  no: string;
  aviso: TextosAviso;
}

export interface OfertasMercado {
  activa: boolean;
  porCalculadora: Readonly<Record<string, OfertasCalculadora>>;
  referencia?: ReferenciaLocal | null;
  locale?: string;
  textos?: TextosTarjeta;
  // Por familia (clave) y "planilla".
  copy?: Readonly<Record<string, CopyTarjeta>>;
}

// El h1 tal cual, sin las marcas de plantilla ni lo que va después de los dos puntos. No se recorta
// nada más: cualquier otro recorte depende del idioma.
export function nombreDeCalculo(h1: string): string {
  return h1
    .split(":")[0]
    .replace(/\{\{[^}]*\}\}/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// La bajada lleva el número que la persona acaba de ver: es lo que la hace sentir que el producto
// es suyo y no un genérico.
export function bajadaOferta(o: { tipo: TipoProducto; etiqueta: string; cifra: string; hoja?: string; textos: Pick<TextosTarjeta, "bajadaInforme" | "bajadaPlanilla" | "bajadaPlanillaHoja"> }): string {
  const cifra = `${o.etiqueta}: ${o.cifra}.`;
  if (o.tipo === "informe") return `${cifra} ${o.textos.bajadaInforme}`;
  return `${cifra} ${o.hoja ? o.textos.bajadaPlanillaHoja.replace("{hoja}", o.hoja) : o.textos.bajadaPlanilla}`;
}

// Siempre en dólares (se cobra en USD), con el formato del país.
export function precioUSD(centavos: number, locale: string): string {
  const entero = centavos % 100 === 0;
  return new Intl.NumberFormat(locale, { style: "currency", currency: "USD", minimumFractionDigits: entero ? 0 : 2, maximumFractionDigits: entero ? 0 : 2 }).format(centavos / 100);
}

// «unos MXN 130» a dos cifras significativas: con el cambio del día a un decimal sería una precisión
// que no tiene (el banco o la tarjeta convierten con su propio tipo de cambio).
export function precioLocalAproximado(centavos: number, r: ReferenciaLocal): string | null {
  const n = (centavos / 100) * r.tasa;
  if (!Number.isFinite(n) || n <= 0) return null;
  const paso = 10 ** Math.max(0, Math.floor(Math.log10(n)) - 1);
  const redondo = Math.max(paso, Math.round(n / paso) * paso);
  return new Intl.NumberFormat(r.locale, { style: "currency", currency: r.moneda, currencyDisplay: "code", maximumFractionDigits: 0 }).format(redondo);
}

export function leyendaDeCobro(centavos: number, r: ReferenciaLocal | null | undefined, textos: Pick<TextosTarjeta, "equivale" | "cobroDolares">): string {
  const local = r ? precioLocalAproximado(centavos, r) : null;
  return local ? `${textos.equivale.replace("{monto}", local)} ${textos.cobroDolares}` : textos.cobroDolares;
}

// ─── Escenarios: qué campo se varía ───────────────────────────────────────────────────────────

const NUMERICOS = new Set(["moneda", "numero", "entero", "porcentaje"]);
const esNumerico = (c: Campo): c is CampoNumerico => NUMERICOS.has(c.tipo);

export function campoEscenario(e: EscenarioFamilia, campos: readonly Campo[]): CampoNumerico | null {
  const numericos = campos.filter(esNumerico);
  if (e.campos?.length) {
    for (const id of e.campos) {
      const c = numericos.find((x) => x.id === id);
      if (c) return c;
    }
    return null;
  }
  if (e.tipo === "moneda") return numericos.find((c) => c.tipo === "moneda" && c.requerido !== false) ?? null;
  if (e.tipo === "tasa") return numericos.find((c) => c.tipo === "porcentaje" && c.requerido !== false) ?? null;
  return null;
}

const FACTORES_MONEDA = [0.75, 0.9, 1, 1.1, 1.25, 1.5];
const PLAZOS = [30, 60, 90, 180, 270, 365];
const PASOS_TASA = [-2, -1, -0.5, 0, 0.5, 1, 2];

export function valoresEscenario(tipo: TipoEscenario, campo: Campo, actual: number): number[] {
  if (!esNumerico(campo)) return [];
  const { min, max } = campo;
  const dentro = (v: number) => (min === undefined || v >= min) && (max === undefined || v <= max);
  let lista: number[];
  if (tipo === "moneda") lista = FACTORES_MONEDA.map((f) => Math.round(actual * f * 100) / 100);
  else if (tipo === "tasa") lista = PASOS_TASA.map((d) => Math.round((actual + d) * 100) / 100);
  else if (tipo === "plazo") lista = [...new Set([...PLAZOS, actual])].sort((a, b) => a - b);
  else {
    const base = Math.max(1, actual);
    lista = [...new Set([0.5, 1, 1.5, 2, 3].map((f) => Math.round(base * f)))];
  }
  if (campo.tipo === "entero") lista = lista.map((v) => Math.round(v));
  return [...new Set(lista)].filter((v) => v > 0 && dentro(v));
}
