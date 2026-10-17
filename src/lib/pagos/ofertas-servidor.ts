import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import ExcelJS from "exceljs";
import { esMercadoDePrueba } from "@/motor/datos";
import type { CodigoMercado, FechaISO } from "@/motor/tipos";
import { hoyEn } from "@/motor/vigencia";
import { opcionesDinamicas, resolverValores } from "@/motor/registro";
import { registro } from "@/paises";
import { validarDatosIntl, type DatosIntl } from "@/lib/prefill/intl";
import { catalogoIntl, calculadorasDeFamilia, leerArchivoIntl, productosDeMercado, type ProductoIntl } from "./catalogo-intl";
import { archivoMapa, leerMapa, valorDeCelda, type BloqueMapa, type MapaPlanilla } from "./mapa-planilla-intl";
import { familiaDeConcepto, familiaPorClave, nombreDeCalculo, type CopyTarjeta, type OfertaPublica, type OfertasCalculadora, type OfertasMercado, type ReferenciaLocal } from "./ofertas-intl";
import { copyFamilia, copyPlanilla, diccionarioVenta, textosTarjeta, tieneVenta } from "./textos";
import { ventaIntlActiva } from "./index";

// ─── Mapa de la planilla ──────────────────────────────────────────────────────────────────────

const mapas = new Map<string, MapaPlanilla | null>();

function leerMapaDe(ruta: string): MapaPlanilla | null {
  if (mapas.has(ruta)) return mapas.get(ruta)!;
  let mapa: MapaPlanilla | null = null;
  try {
    mapa = leerMapa(JSON.parse(readFileSync(ruta, "utf8")));
    if (!mapa) console.error("[ofertas-intl] mapa de planilla con forma inválida", ruta);
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") console.error("[ofertas-intl] no pude leer el mapa de la planilla", ruta, e);
  }
  mapas.set(ruta, mapa);
  return mapa;
}

// Mismo criterio que leerArchivoIntl: entre el 1/1 y el primer deploy del año vale el del año anterior.
export function mapaDePlanillaIntl(p: ProductoIntl): MapaPlanilla | null {
  if (p.tipo !== "planilla") return null;
  const dir = path.join(process.cwd(), "private", "intl", p.mercado);
  const actual = leerMapaDe(path.join(dir, archivoMapa(p.archivo)));
  if (actual) return actual;
  const m = /^(.*-)(\d{4})\.xlsx$/.exec(p.archivo);
  return m ? leerMapaDe(path.join(dir, archivoMapa(`${m[1]}${Number(m[2]) - 1}.xlsx`))) : null;
}

export function bloqueDe(p: ProductoIntl, calc: string): BloqueMapa | null {
  return mapaDePlanillaIntl(p)?.bloques.find((b) => b.calculadora === calc) ?? null;
}

// Las calculadoras (slug) cuyos datos puede llevar el producto.
export function calculadorasDeProducto(p: ProductoIntl): string[] {
  if (p.tipo === "planilla") return (mapaDePlanillaIntl(p)?.bloques ?? []).map((b) => b.calculadora);
  const f = p.familia ? familiaPorClave(p.familia) : null;
  return f ? calculadorasDeFamilia(f, p.mercado).map((c) => c.definicion.slug) : [];
}

export function hoyDe(mercado: string): FechaISO {
  const pais = registro.pais(mercado as CodigoMercado);
  if (!pais) throw new Error(`mercado ${mercado} fuera del registro`);
  return hoyEn(pais.mercado);
}

export function validarDatosDeProducto(p: ProductoIntl, raw: unknown, fecha: FechaISO = hoyDe(p.mercado)): DatosIntl | null {
  try {
    return validarDatosIntl(p.mercado, calculadorasDeProducto(p), raw, fecha);
  } catch (e) {
    console.error(`[prefill/intl] ${p.id}: validar tiró con datos hostiles o rotos`, e instanceof Error ? e.message : e);
    return null;
  }
}

// ─── Ofertas por calculadora ──────────────────────────────────────────────────────────────────

function publica(p: ProductoIntl, hoja?: string): OfertaPublica {
  return {
    producto: p.id,
    slug: p.slug,
    tipo: p.tipo,
    familia: p.tipo === "planilla" ? "planilla" : p.familia!,
    precioCentavos: p.precioCentavos,
    tituloCorto: p.tituloCorto,
    ...(hoja ? { hoja } : {}),
  };
}

// Por calculadora (id de la definición): primero lo que más le sirve a quien la usa. En una
// liquidación pesa más el informe para firmar o reclamar que la planilla anual; en el resto, si la
// planilla tiene la hoja de esa calculadora, va primero (trae sus números y sirve todo el año).
export function ofertasDeMercado(mercado: string): OfertasMercado {
  const pais = registro.pais(mercado as CodigoMercado);
  const porCalculadora: Record<string, OfertasCalculadora> = {};
  if (!pais || mercado === "global" || esMercadoDePrueba(mercado) || !tieneVenta(pais.mercado.idioma)) return { activa: false, porCalculadora, referencia: null };
  const { idioma, trato } = pais.mercado;
  const productos = productosDeMercado(mercado);
  const planillas = productos.filter((p) => p.tipo === "planilla");
  const copy: Record<string, CopyTarjeta> = {};
  for (const c of pais.calculadoras) {
    const def = c.definicion;
    if (def.estado === "borrador") continue;
    const lista: OfertaPublica[] = [];
    const f = familiaDeConcepto(def.concepto);
    const informe = f ? productos.find((p) => p.tipo === "informe" && p.familia === f.clave) : undefined;
    const conHoja = planillas.map((p) => ({ p, b: bloqueDe(p, def.slug) })).filter((x) => x.b);
    const planilla = conHoja.map((x) => publica(x.p, x.b!.hoja));
    if (informe && f?.clave === "liquidacion") lista.push(publica(informe), ...planilla);
    else lista.push(...planilla, ...(informe ? [publica(informe)] : []));
    if (!lista.length) continue;
    porCalculadora[def.id] = { calc: def.slug, nombre: nombreDeCalculo(c.contenido.h1), ofertas: lista };
    for (const o of lista) {
      if (copy[o.familia]) continue;
      copy[o.familia] = o.familia === "planilla" ? copyPlanilla(idioma, trato) : copyFamilia(o.familia, idioma, trato, pais.mercado.locale);
    }
  }
  return {
    activa: ventaIntlActiva(),
    porCalculadora,
    referencia: referenciaLocalDe(mercado),
    locale: pais.mercado.locale,
    textos: textosTarjeta(idioma, trato),
    copy,
  };
}

// El tipo de cambio del dólar que ya cargan los datos del país (la serie vigente, con su tope de
// antigüedad). Entre compra y venta, la venta: es a la que la persona compra dólares. Un país que
// cobra en su moneda (ec, pa, sv) o sin serie confiable (cl, pe) no tiene referencia.
const RE_SERIE_DOLAR = /dolar|cambio|trm|tasa-bcv/;

export function referenciaLocalDe(mercado: string): ReferenciaLocal | null {
  const pais = registro.pais(mercado as CodigoMercado);
  if (!pais) return null;
  const local = pais.mercado.monedas[0];
  if (!local || local === "USD") return null;
  const candidatas = registro.fichasSeries(pais.mercado.codigo, hoyEn(pais.mercado)).filter((f) => f.serie.unidad === local && RE_SERIE_DOLAR.test(f.serie.id) && f.vigente);
  const ficha = candidatas.find((f) => /venta/.test(f.serie.id)) ?? candidatas[0];
  const tasa = ficha?.vigente?.valor;
  return typeof tasa === "number" && tasa > 0 ? { moneda: local, locale: pais.mercado.locale, tasa } : null;
}

export function informesDeMercado(mercado: string): ProductoIntl[] {
  return catalogoIntl().filter((p) => p.mercado === mercado && p.tipo === "informe");
}

// ─── Planilla con los datos de la persona ─────────────────────────────────────────────────────

// Escribe sólo el valor de las celdas amarillas de la hoja de su calculadora: formato, validación y
// fórmulas quedan como los dejó el generador, y el archivo abre en esa hoja. Tira ante cualquier
// problema: quien llama sirve la planilla sin datos.
export async function planillaConDatos(p: ProductoIntl, datos: DatosIntl, bytes?: Buffer): Promise<Buffer> {
  const bloque = bloqueDe(p, datos.calc);
  if (!bloque) throw new Error(`${p.id}: la planilla no tiene hoja para ${datos.calc}`);
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load((bytes ?? (await leerArchivoIntl(p))) as unknown as ArrayBuffer);
  const ws = wb.getWorksheet(bloque.hoja);
  if (!ws) throw new Error(`${p.id}: falta la hoja «${bloque.hoja}»`);
  let escritas = 0;
  for (const [campo, celda] of Object.entries(bloque.celdas)) {
    if (!Object.prototype.hasOwnProperty.call(datos.entrada, campo)) continue;
    const v = valorDeCelda(celda, datos.entrada[campo]);
    if (v === undefined) continue;
    ws.getCell(celda.ref).value = v;
    escritas++;
  }
  if (!escritas) throw new Error(`${p.id}: ningún dato de ${datos.calc} entró en la hoja`);
  const indice = wb.worksheets.indexOf(ws);
  wb.views = [{ x: 0, y: 0, width: 12000, height: 9000, firstSheet: 0, activeTab: Math.max(0, indice), visibility: "visible" }];
  wb.calcProperties = { ...wb.calcProperties, fullCalcOnLoad: true };
  const salida = Buffer.from(await wb.xlsx.writeBuffer());
  if (salida.length < 4 || salida[0] !== 0x50 || salida[1] !== 0x4b) throw new Error("exceljs no devolvió un .xlsx");
  return salida;
}

// ─── Resumen de los campos (para mostrar los datos antes de pagar) ───────────────────────────

export type ResumenCalculo = { nombre: string; campos: { id: string; etiqueta: string; tipo: string; opciones?: Record<string, string> }[] };

export function resumenCalculos(p: ProductoIntl): Record<string, ResumenCalculo> {
  const pais = registro.pais(p.mercado as CodigoMercado);
  const salida: Record<string, ResumenCalculo> = {};
  if (!pais) return salida;
  const hoy = hoyEn(pais.mercado);
  const { si, no } = diccionarioVenta(pais.mercado.idioma).general;
  for (const slug of calculadorasDeProducto(p)) {
    const e = pais.calculadoras.find((c) => c.definicion.slug === slug);
    if (!e) continue;
    const def = e.definicion;
    const r = resolverValores(pais, def, hoy);
    const dinamicas = r.ok ? opcionesDinamicas(pais, def, r.valores) : {};
    salida[slug] = {
      nombre: nombreDeCalculo(e.contenido.h1),
      campos: def.campos.map((c) => {
        const ops =
          c.tipo === "opcion"
            ? c.opciones
            : c.tipo === "region"
              ? (pais.mercado.regiones ?? []).map((x) => ({ valor: x.id, etiqueta: x.nombre }))
              : c.tipo === "opcion-dato"
                ? (dinamicas[c.id] ?? [])
                : c.tipo === "si-no"
                  ? [
                      { valor: "true", etiqueta: si },
                      { valor: "false", etiqueta: no },
                    ]
                  : null;
        return { id: c.id, etiqueta: c.etiqueta, tipo: c.tipo, ...(ops ? { opciones: Object.fromEntries(ops.map((o) => [o.valor, o.etiqueta])) } : {}) };
      }),
    };
  }
  return salida;
}
