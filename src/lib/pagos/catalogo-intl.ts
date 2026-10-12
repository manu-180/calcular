import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CodigoMercado } from "@/motor/tipos";
import { hoyEn } from "@/motor/vigencia";
import { registro } from "@/paises";
import { FAMILIAS, type ClaveFamilia, type FamiliaInforme, type TipoProducto } from "./ofertas-intl";
import type { ProductoVenta } from "./tipos";

// Planillas que vende calcularya.com. Cada una es de un país: el id es `<mercado>/<slug>` y el
// archivo vive en private/intl/<mercado>/. Para sumar una:
//   1. dejar el .xlsx en private/intl/<mercado>/<archivo>.xlsx (o generarlo en el build),
//   2. agregar un definirProductoIntl({...}) a PRODUCTOS_INTL,
//   3. confirmar que next.config.ts incluye ./private/intl/** en /api/pagos/descarga.
// Nada más: catálogo, landing, cobro, webhook, mail y descarga leen de acá.
// Los informes (tipo "informe") no tienen archivo: se arman desde ofertas-intl.ts, uno por familia y
// por país con al menos una calculadora de la familia, y se entregan como página imprimible.

export type ProductoIntl = ProductoVenta & {
  mercado: string;
  slug: string;
  tipo: TipoProducto;
  familia?: ClaveFamilia;
  tituloCorto: string;
  paraQuien: string;
  descripcion: readonly string[];
  disparadorActualizacion: string;
  moneda: "USD";
  // "" en los informes.
  archivo: string;
};

export type DefinicionProductoIntl = Omit<ProductoIntl, "id" | "moneda" | "tipo"> & { moneda?: "USD"; tipo?: TipoProducto };

const RE_MERCADO = /^[a-z]{2,6}$/;
const RE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RE_ARCHIVO = /^[a-z0-9]+(?:-[a-z0-9]+)*\.xlsx$/;

export function definirProductoIntl(d: DefinicionProductoIntl): ProductoIntl {
  if (!RE_MERCADO.test(d.mercado) || d.mercado === "ar") throw new Error(`producto intl con mercado inválido: ${d.mercado}`);
  if (d.slug === "comprar" || d.slug === "gracias") throw new Error(`producto intl: «${d.slug}» es una ruta de planillas`);
  if (!RE_SLUG.test(d.slug)) throw new Error(`producto intl con slug inválido: ${d.slug}`);
  const tipo = d.tipo ?? "planilla";
  if (tipo === "planilla" && !RE_ARCHIVO.test(d.archivo)) throw new Error(`producto intl ${d.slug}: el archivo es un nombre .xlsx, sin carpetas`);
  if (tipo === "informe" && (d.archivo !== "" || !d.familia)) throw new Error(`producto intl ${d.slug}: un informe no tiene archivo y sí familia`);
  if (!Number.isInteger(d.precioCentavos) || d.precioCentavos < 100 || d.precioCentavos > 100000) {
    throw new Error(`producto intl ${d.slug}: precioCentavos entero entre 100 y 100000`);
  }
  const id = `${d.mercado}/${d.slug}`;
  // ca_compras.producto y ca_checkouts.producto aceptan hasta 60 caracteres.
  if (id.length > 60) throw new Error(`producto intl ${id}: id de más de 60 caracteres`);
  return { ...d, id, tipo, moneda: "USD" };
}

// Planilla de sueldo y liquidación de cada país. La genera scripts/paises/gen_planillas_intl.ts en el
// build y scripts/check_planillas_intl.ts falla si se vende la de un país cuyas fórmulas no dan lo
// mismo que sus calculadoras.
const CARGA = {
  tu: "cargas tus datos en las celdas amarillas",
  usted: "carga sus datos en las celdas amarillas",
  vos: "cargás tus datos en las celdas amarillas",
} as const;

function planillaSueldo(d: {
  mercado: string;
  trato: keyof typeof CARGA;
  titulo: string;
  tituloCorto: string;
  paraQuien: string;
  incluye: string;
  normas: string;
  disparador: string;
}): ProductoIntl {
  const anio = () => anioPlanillaIntl(d.mercado);
  const producto = definirProductoIntl({
    mercado: d.mercado,
    slug: "sueldo-y-liquidacion",
    titulo: `${d.titulo} ${anio()}`,
    tituloCorto: d.tituloCorto,
    paraQuien: d.paraQuien,
    descripcion: [
      `Una planilla de Excel lista para usar: ${CARGA[d.trato]} y las cuentas salen solas, con fórmulas que siguen ${d.normas}.`,
      `Incluye ${d.incluye}. Cada hoja muestra el paso a paso, y la hoja de tablas oficiales trae cada valor con su fuente y la fecha en que lo verificamos.`,
    ],
    disparadorActualizacion: d.disparador,
    precioCentavos: 700,
    archivo: archivoPlanillaSueldo(anio()),
  });
  // Getters y no valores: un proceso que sigue vivo al cambiar el año tiene que pasar a servir el
  // archivo nuevo, igual que el generador del build, que nombra el archivo con el año del día.
  return Object.defineProperties(producto, {
    titulo: { get: () => `${d.titulo} ${anio()}`, enumerable: true, configurable: true },
    archivo: { get: () => archivoPlanillaSueldo(anio()), enumerable: true, configurable: true },
  });
}

export function anioPlanillaIntl(mercado: string): number {
  const pais = registro.pais(mercado as CodigoMercado);
  if (!pais) throw new Error(`planilla intl: el mercado ${mercado} no está en el registro`);
  return Number(hoyEn(pais.mercado).slice(0, 4));
}

export function archivoPlanillaSueldo(anio: number): string {
  return `sueldo-y-liquidacion-${anio}.xlsx`;
}

const DISPARADOR_INFORME = "Cada vez que cambia un valor oficial que usa el cálculo";

function informe(f: FamiliaInforme, mercado: string): ProductoIntl {
  const pais = registro.pais(mercado as CodigoMercado)!;
  const t = pais.mercado.trato;
  return definirProductoIntl({
    mercado,
    slug: f.slug,
    tipo: "informe",
    familia: f.clave,
    titulo: `${f.nombre} ${pais.mercado.nombre}`,
    tituloCorto: f.tituloCorto,
    paraQuien: f.paraQuien[t],
    descripcion: f.descripcion.map((d) => d[t]),
    disparadorActualizacion: DISPARADOR_INFORME,
    precioCentavos: f.precioCentavos,
    archivo: "",
  });
}

// Una calculadora en borrador no vende: no tiene página. zz es el mercado de pruebas.
export function calculadorasDeFamilia(f: FamiliaInforme, mercado: string) {
  const pais = registro.pais(mercado as CodigoMercado);
  if (!pais) return [];
  return pais.calculadoras.filter((c) => c.definicion.estado !== "borrador" && (f.conceptos as readonly string[]).includes(c.definicion.concepto));
}

function informesDelRegistro(): ProductoIntl[] {
  const salida: ProductoIntl[] = [];
  for (const pais of registro.paises) {
    const m = pais.mercado.codigo;
    if (m === "global" || m === "zz") continue;
    for (const f of FAMILIAS) if (calculadorasDeFamilia(f, m).length) salida.push(informe(f, m));
  }
  return salida;
}

export const PLANILLAS_SUELDO_INTL: readonly ProductoIntl[] = [
  planillaSueldo({
    mercado: "mx",
    trato: "tu",
    titulo: "Planilla de sueldo y finiquito México",
    tituloCorto: "planilla de sueldo y finiquito",
    paraQuien: "Para calcular tu sueldo neto, tu aguinaldo y tu finiquito o liquidación con la ley vigente",
    normas: "la Ley Federal del Trabajo, la Ley del ISR y la Ley del Seguro Social",
    incluye: "el sueldo neto con ISR, subsidio para el empleo y cuotas del IMSS; el aguinaldo con su parte exenta; y el finiquito y la liquidación por despido",
    disparador: "Cada vez que cambia un valor oficial, como el salario mínimo, la UMA o la tarifa del ISR",
  }),
  planillaSueldo({
    mercado: "co",
    trato: "tu",
    titulo: "Planilla de salario y liquidación Colombia",
    tituloCorto: "planilla de salario y liquidación",
    paraQuien: "Para calcular tu salario neto, tu prima, tus cesantías y tu liquidación con la ley vigente",
    normas: "el Código Sustantivo del Trabajo y el Estatuto Tributario",
    incluye: "el salario neto con salud, pensión y retención en la fuente; la prima de servicios y las cesantías con sus intereses; y la liquidación del contrato con indemnización",
    disparador: "Cada vez que cambia un valor oficial, como el salario mínimo, el auxilio de transporte o la UVT",
  }),
  planillaSueldo({
    mercado: "pe",
    trato: "tu",
    titulo: "Planilla de sueldo y liquidación Perú",
    tituloCorto: "planilla de sueldo y liquidación",
    paraQuien: "Para calcular tu sueldo neto, tu gratificación, tu CTS y tu liquidación con la ley vigente",
    normas: "la ley laboral peruana y la Ley del Impuesto a la Renta",
    incluye: "el sueldo neto con AFP u ONP y renta de quinta; la gratificación y la CTS; y la liquidación de beneficios sociales con la indemnización por despido arbitrario",
    disparador: "Cada vez que cambia un valor oficial, como la remuneración mínima, la UIT o las comisiones de las AFP",
  }),
  planillaSueldo({
    mercado: "cl",
    trato: "tu",
    titulo: "Planilla de sueldo y finiquito Chile",
    tituloCorto: "planilla de sueldo y finiquito",
    paraQuien: "Para calcular tu sueldo líquido, tu gratificación y tu finiquito con la ley vigente",
    normas: "el Código del Trabajo y la Ley sobre Impuesto a la Renta",
    incluye: "el sueldo líquido con AFP, salud, seguro de cesantía e impuesto único; la gratificación legal; y el finiquito con indemnizaciones y vacaciones",
    disparador: "Cada vez que cambia un valor oficial, como el ingreso mínimo, los topes imponibles o la tabla del impuesto único",
  }),
  planillaSueldo({
    mercado: "uy",
    trato: "vos",
    titulo: "Planilla de sueldo y liquidación Uruguay",
    tituloCorto: "planilla de sueldo y liquidación",
    paraQuien: "Para calcular tu sueldo líquido, tu aguinaldo, tu salario vacacional y tu liquidación con la ley vigente",
    normas: "las leyes laborales uruguayas y el decreto de retención del IRPF",
    incluye: "el sueldo líquido con montepío, Fonasa, FRL e IRPF; el aguinaldo y el salario vacacional; y la liquidación por egreso con la indemnización por despido",
    disparador: "Cada vez que cambia un valor oficial, como la BPC, las tasas del Fonasa o la escala del IRPF",
  }),
  planillaSueldo({
    mercado: "ec",
    trato: "tu",
    titulo: "Planilla de sueldo y liquidación Ecuador",
    tituloCorto: "planilla de sueldo y liquidación",
    paraQuien: "Para calcular tu sueldo neto, tus décimos y tu liquidación con la ley vigente",
    normas: "el Código del Trabajo y la Ley de Régimen Tributario Interno",
    incluye: "el sueldo neto con aporte al IESS e impuesto a la renta; el décimo tercero y el décimo cuarto; y la liquidación con desahucio, despido y vacaciones",
    disparador: "Cada vez que cambia un valor oficial, como el salario básico unificado o la tabla del impuesto a la renta",
  }),
  planillaSueldo({
    mercado: "cr",
    trato: "usted",
    titulo: "Planilla de salario y liquidación Costa Rica",
    tituloCorto: "planilla de salario y liquidación",
    paraQuien: "Para calcular su salario neto, su aguinaldo y su liquidación con la ley vigente",
    normas: "el Código de Trabajo y la Ley del Impuesto sobre la Renta",
    incluye: "el salario neto con cargas sociales e impuesto al salario; el aguinaldo; y la liquidación con preaviso, cesantía, vacaciones y aguinaldo proporcional",
    disparador: "Cada vez que cambia un valor oficial, como los tramos del impuesto al salario o las cuotas de la Caja",
  }),
  planillaSueldo({
    mercado: "gt",
    trato: "usted",
    titulo: "Planilla de salario y prestaciones Guatemala",
    tituloCorto: "planilla de salario y prestaciones",
    paraQuien: "Para calcular su ISR, su aguinaldo, su Bono 14 y su indemnización con la ley vigente",
    normas: "el Código de Trabajo y la Ley de Actualización Tributaria",
    incluye: "el ISR de su salario; el aguinaldo y el Bono 14; y la indemnización con las prestaciones proporcionales",
    disparador: "Cada vez que cambia un valor oficial, como las deducciones del ISR o la escala del impuesto",
  }),
  planillaSueldo({
    mercado: "py",
    trato: "vos",
    titulo: "Planilla de salario y liquidación Paraguay",
    tituloCorto: "planilla de salario y liquidación",
    paraQuien: "Para calcular tu salario neto, tu aguinaldo y tu liquidación con la ley vigente",
    normas: "el Código del Trabajo y las normas del IPS",
    incluye: "el salario neto con el aporte al IPS; el aguinaldo; y la liquidación con preaviso, indemnización, vacaciones y aguinaldo proporcional",
    disparador: "Cada vez que cambia un valor oficial, como el salario mínimo o los aportes al IPS",
  }),
  planillaSueldo({
    mercado: "do",
    trato: "tu",
    titulo: "Planilla de salario y prestaciones República Dominicana",
    tituloCorto: "planilla de salario y prestaciones",
    paraQuien: "Para calcular tu salario neto, tu regalía pascual y tus prestaciones laborales con la ley vigente",
    normas: "el Código de Trabajo, la ley de la Seguridad Social y el Código Tributario",
    incluye: "el salario neto con SFS, AFP e ISR; la regalía pascual; y las prestaciones laborales con preaviso, cesantía, vacaciones y regalía",
    disparador: "Cada vez que cambia un valor oficial, como el salario mínimo, los topes de la TSS o la escala del ISR",
  }),
  planillaSueldo({
    mercado: "sv",
    trato: "usted",
    titulo: "Planilla de salario y prestaciones El Salvador",
    tituloCorto: "planilla de salario y prestaciones",
    paraQuien: "Para calcular su renta, su aguinaldo, su Quincena 25 y su indemnización con la ley vigente",
    normas: "el Código de Trabajo y la Ley de Impuesto sobre la Renta",
    incluye: "la retención de renta con AFP e ISSS; el aguinaldo y la Quincena 25; y la indemnización por despido y la prestación por renuncia voluntaria",
    disparador: "Cada vez que cambia un valor oficial, como el salario mínimo o las tablas de retención de renta",
  }),
  planillaSueldo({
    mercado: "pa",
    trato: "tu",
    titulo: "Planilla de salario y liquidación Panamá",
    tituloCorto: "planilla de salario y liquidación",
    paraQuien: "Para calcular tu salario neto, tu décimo tercer mes y tu liquidación con la ley vigente",
    normas: "el Código de Trabajo y el Código Fiscal",
    incluye: "el salario neto con Seguro Social, seguro educativo e ISR; el décimo tercer mes; y la liquidación con prima de antigüedad, indemnización, vacaciones y décimo",
    disparador: "Cada vez que cambia un valor oficial, como las cuotas del Seguro Social o la tarifa del ISR",
  }),
  planillaSueldo({
    mercado: "hn",
    trato: "usted",
    titulo: "Planilla de salario y prestaciones Honduras",
    tituloCorto: "planilla de salario y prestaciones",
    paraQuien: "Para calcular su ISR, su décimo cuarto mes y sus prestaciones laborales con la ley vigente",
    normas: "el Código del Trabajo y la Ley del Impuesto sobre la Renta",
    incluye: "el ISR de su salario; el décimo cuarto mes; y las prestaciones laborales con preaviso y auxilio de cesantía",
    disparador: "Cada vez que cambia un valor oficial, como la tabla del ISR o las reglas de cesantía",
  }),
  planillaSueldo({
    mercado: "ni",
    trato: "vos",
    titulo: "Planilla de salario y liquidación Nicaragua",
    tituloCorto: "planilla de salario y liquidación",
    paraQuien: "Para calcular tu salario neto, tu aguinaldo y tu liquidación con la ley vigente",
    normas: "el Código del Trabajo y la Ley de Concertación Tributaria",
    incluye: "el salario neto con INSS e IR; el aguinaldo; y la liquidación con indemnización por antigüedad, aguinaldo y vacaciones",
    disparador: "Cada vez que cambia un valor oficial, como las cuotas del INSS o la tarifa del IR",
  }),
  planillaSueldo({
    mercado: "ve",
    trato: "tu",
    titulo: "Planilla de prestaciones y liquidación Venezuela",
    tituloCorto: "planilla de prestaciones y liquidación",
    paraQuien: "Para calcular tus utilidades, tus vacaciones, tus prestaciones sociales y tu liquidación con la ley vigente",
    normas: "la LOTTT",
    incluye: "las utilidades y las vacaciones con su bono vacacional; y las prestaciones sociales con la liquidación completa, en bolívares o en dólares",
    disparador: "Cada vez que cambia un valor oficial de la LOTTT que usa la planilla",
  }),
  planillaSueldo({
    mercado: "bo",
    trato: "usted",
    titulo: "Planilla de sueldo y finiquito Bolivia",
    tituloCorto: "planilla de sueldo y finiquito",
    paraQuien: "Para calcular su líquido pagable, su aguinaldo y su finiquito con la ley vigente",
    normas: "la Ley General del Trabajo, la Ley de Pensiones y el régimen del RC-IVA",
    incluye: "el líquido pagable con aportes a la Gestora, Aporte Nacional Solidario y RC-IVA; el aguinaldo; y el finiquito con indemnización, desahucio, aguinaldo y vacaciones",
    disparador: "Cada vez que cambia un valor oficial, como el salario mínimo o los aportes a la Gestora",
  }),
];

export const PRODUCTOS_INTL: readonly ProductoIntl[] = [...PLANILLAS_SUELDO_INTL, ...informesDelRegistro()];

let catalogo: readonly ProductoIntl[] = PRODUCTOS_INTL;

// Sólo para los checks: cambia el catálogo que ven las rutas y devuelve cómo restaurarlo.
export function usarCatalogoIntl(lista: readonly ProductoIntl[]): () => void {
  const previo = catalogo;
  catalogo = lista;
  return () => {
    catalogo = previo;
  };
}

export function catalogoIntl(): readonly ProductoIntl[] {
  return catalogo;
}

export function productosDeMercado(mercado: string): ProductoIntl[] {
  return catalogo.filter((p) => p.mercado === mercado);
}

export function productoIntl(id: string | null | undefined): ProductoIntl | null {
  if (!id) return null;
  return catalogo.find((p) => p.id === id) ?? null;
}

export function productoIntlDe(mercado: string, slug: string): ProductoIntl | null {
  return productoIntl(`${mercado}/${slug}`);
}

export function rutaArchivoIntl(p: ProductoIntl): string {
  if (p.tipo !== "planilla") throw new Error(`${p.id} no tiene archivo`);
  return path.join(process.cwd(), "private", "intl", p.mercado, p.archivo);
}

// Entre la medianoche del 1/1 y el primer deploy del año, el bundle todavía tiene sólo el archivo
// del año anterior: se entrega ese antes que dejar al comprador sin planilla.
export async function leerArchivoIntl(p: ProductoIntl): Promise<Buffer> {
  try {
    return await readFile(rutaArchivoIntl(p));
  } catch (e) {
    const m = /^(.*-)(\d{4})\.xlsx$/.exec(p.archivo);
    if ((e as NodeJS.ErrnoException).code !== "ENOENT" || !m) throw e;
    return readFile(path.join(process.cwd(), "private", "intl", p.mercado, `${m[1]}${Number(m[2]) - 1}.xlsx`));
  }
}

// Referencia propia del pedido: `<mercado>/<slug>:<uuid>`. Viaja como custom_id de PayPal (o el
// metadato que tenga el proveedor) y vuelve en el pago: de ahí sale qué se compró, nunca del
// navegador. El uuid es la PK de ca_checkouts.
export function referenciaIntl(p: ProductoIntl, uuid: string = crypto.randomUUID()): string {
  return `${p.id}:${uuid}`;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function leerReferenciaIntl(ref: string | null | undefined): { producto: ProductoIntl; checkoutId: string } | null {
  const m = /^([a-z]{2,6}\/[a-z0-9-]+):([0-9a-f-]{36})$/i.exec(ref ?? "");
  if (!m || !UUID_RE.test(m[2])) return null;
  const producto = productoIntl(m[1]);
  return producto ? { producto, checkoutId: m[2].toLowerCase() } : null;
}
