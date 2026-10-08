import ExcelJS from "exceljs";
import { resolverRequisito, publicabilidad, type DatoUsado } from "../../src/motor/registro";
import type { CodigoMercado, FechaISO, FilaEscala, Mercado, PaisDefinido, Trato, ValorResuelto } from "../../src/motor/tipos";
import { decimalesDeMoneda } from "../../src/motor/formato";
import { BORDE, S, bandaSeccion, desplegable, nota, relleno, titulo } from "../gen_planilla_estilos";

export type Celda = string | number | boolean | null;

export interface Entrada {
  ref: string;
  convertir(v: unknown): Celda;
}

export interface Bloque {
  calculadora: string;
  hoja: string;
  entradas: Record<string, Entrada>;
  resultados: Record<string, string>;
  hoy?: Entrada;
}

export interface Escala {
  filas: number;
  desde(i: number): string;
  hasta(i: number): string;
  tasa(i: number): string;
  cuota(i: number): string;
  rangoDesde: string;
  rangoTasa: string;
  rangoCuota: string;
}

export interface Mapa {
  (clave: string): string;
  opciones: OpcionHoja[];
  valores: string;
  de(ref: string): string;
}

export interface PorRegion {
  nombres: string;
  valores: string;
  de(regionRef: string): string;
}

export const HOJA_TABLAS = "Tablas oficiales";
export const HOJA_INSTRUCCIONES = "Instrucciones";
const PREFIJO_TABLAS = `'${HOJA_TABLAS}'!`;
export const SIN_TOPE = 1e15;

const VERDE = "FF1B5E20";
const PIZARRA = "FF37474F";
const NARANJA = "FFE65100";

export function segun<T>(trato: Trato, o: { tu: T; usted: T; vos: T }): T {
  return o[trato];
}

export function serialExcel(fecha: FechaISO): number {
  const [a, m, d] = fecha.split("-").map(Number);
  return Math.round((Date.UTC(a, m - 1, d) - Date.UTC(1899, 11, 30)) / 86_400_000);
}

export function fechaLarga(fecha: FechaISO): string {
  const [a, m, d] = fecha.split("-").map(Number);
  return `${d}/${m}/${a}`;
}

export class NoDisponible extends Error {
  override name = "NoDisponible";
}

const UNIDADES: Record<string, string> = { dias: "días", anios: "años", meses: "meses", horas: "horas", numero: "", factor: "veces", "%": "%" };

type FilaTabla =
  | { tipo: "valor"; fila: number; dato: string; detalle: string; valor: number; unidad: string; desde: FechaISO; fuente: DatoUsado["fuente"]; formato: string }
  | { tipo: "titulo-escala"; fila: number; dato: string; unidad: string; desde: FechaISO; fuente: DatoUsado["fuente"] }
  | { tipo: "encabezado-escala"; fila: number }
  | { tipo: "tramo"; fila: number; tramo: FilaEscala; formato: string };

export class Tablas {
  private fila = 4;
  private readonly filas: FilaTabla[] = [];
  private readonly cache = new Map<string, unknown>();

  constructor(private readonly libro: Libro) {}

  private resolver(id: string, req: Parameters<typeof resolverRequisito>[2]) {
    const r = resolverRequisito(this.libro.pais, id, req, this.libro.hoy);
    if (!r.ok) throw new NoDisponible(r.motivo);
    const dato = this.libro.pais.datos.find((d) => d.id === id);
    return { ...r, dato };
  }

  private formatoDe(unidad: string): string {
    return unidad === this.libro.mercado.monedas[0] ? this.libro.fmtMoneda : "#,##0.00##";
  }

  private unidadVisible(unidad: string): string {
    return UNIDADES[unidad] ?? unidad;
  }

  numero(id: string): string {
    const clave = `n:${id}`;
    if (this.cache.has(clave)) return this.cache.get(clave) as string;
    const r = this.resolver(id, "numero");
    const u = r.usados[0];
    const fila = this.fila++;
    this.filas.push({ tipo: "valor", fila, dato: u.nombre, detalle: "", valor: r.valor as number, unidad: this.unidadVisible(u.unidad), desde: u.desde, fuente: u.fuente, formato: this.formatoDe(u.unidad) });
    const ref = `${PREFIJO_TABLAS}$C$${fila}`;
    this.cache.set(clave, ref);
    return ref;
  }

  mapa(id: string): Mapa {
    const clave = `m:${id}`;
    if (this.cache.has(clave)) return this.cache.get(clave) as Mapa;
    const r = this.resolver(id, "mapa");
    const u = r.usados[0];
    const valor = r.valor as Readonly<Record<string, number>>;
    const refs: Record<string, string> = {};
    const opciones: OpcionHoja[] = [];
    const primera = this.fila;
    for (const [k, v] of Object.entries(valor)) {
      opciones.push({ valor: k, etiqueta: r.dato?.etiquetas?.[k] ?? k });
      const fila = this.fila++;
      this.filas.push({ tipo: "valor", fila, dato: u.nombre, detalle: r.dato?.etiquetas?.[k] ?? k, valor: v, unidad: this.unidadVisible(u.unidad), desde: u.desde, fuente: u.fuente, formato: this.formatoDe(u.unidad) });
      refs[k] = `${PREFIJO_TABLAS}$C$${fila}`;
    }
    const ultima = this.fila - 1;
    const f = Object.assign(
      (k: string) => {
        if (!(k in refs)) throw new Error(`${id}: no tiene la clave ${k}`);
        return refs[k];
      },
      {
        opciones,
        valores: `${PREFIJO_TABLAS}$C$${primera}:$C$${ultima}`,
        de: (ref: string) => `INDEX(${PREFIJO_TABLAS}$C$${primera}:$C$${ultima},MATCH(${ref},${PREFIJO_TABLAS}$B$${primera}:$B$${ultima},0))`,
      },
    );
    this.cache.set(clave, f);
    return f;
  }

  porRegion(id: string): PorRegion {
    const clave = `r:${id}`;
    if (this.cache.has(clave)) return this.cache.get(clave) as PorRegion;
    const r = this.resolver(id, "numero-por-region");
    const valor = r.valor as Readonly<Record<string, number>>;
    const regiones = this.libro.mercado.regiones ?? [];
    const primera = this.fila;
    for (const reg of regiones) {
      const u = r.usados.find((x) => x.region === reg.id);
      if (!u || !(reg.id in valor)) throw new NoDisponible(`${id}: falta la región ${reg.id}`);
      const fila = this.fila++;
      this.filas.push({ tipo: "valor", fila, dato: u.nombre, detalle: reg.nombre, valor: valor[reg.id], unidad: this.unidadVisible(u.unidad), desde: u.desde, fuente: u.fuente, formato: this.formatoDe(u.unidad) });
    }
    const ultima = this.fila - 1;
    const nombres = `${PREFIJO_TABLAS}$B$${primera}:$B$${ultima}`;
    const valores = `${PREFIJO_TABLAS}$C$${primera}:$C$${ultima}`;
    const pr: PorRegion = { nombres, valores, de: (ref) => `INDEX(${valores},MATCH(${ref},${nombres},0))` };
    this.cache.set(clave, pr);
    return pr;
  }

  escala(id: string): Escala {
    const clave = `e:${id}`;
    if (this.cache.has(clave)) return this.cache.get(clave) as Escala;
    const r = this.resolver(id, "escala");
    const u = r.usados[0];
    const escala = r.valor as readonly FilaEscala[];
    this.filas.push({ tipo: "titulo-escala", fila: this.fila++, dato: u.nombre, unidad: this.unidadVisible(u.unidad), desde: u.desde, fuente: u.fuente });
    this.filas.push({ tipo: "encabezado-escala", fila: this.fila++ });
    const primera = this.fila;
    for (const tramo of escala) this.filas.push({ tipo: "tramo", fila: this.fila++, tramo, formato: this.formatoDe(u.unidad) });
    const ultima = this.fila - 1;
    this.fila++;
    const c = (col: string) => (i: number) => `${PREFIJO_TABLAS}$${col}$${primera + i}`;
    const e: Escala = {
      filas: escala.length,
      desde: c("B"),
      hasta: c("C"),
      tasa: c("D"),
      cuota: c("E"),
      rangoDesde: `${PREFIJO_TABLAS}$B$${primera}:$B$${ultima}`,
      rangoTasa: `${PREFIJO_TABLAS}$D$${primera}:$D$${ultima}`,
      rangoCuota: `${PREFIJO_TABLAS}$E$${primera}:$E$${ultima}`,
    };
    this.cache.set(clave, e);
    return e;
  }

  // Las series (UF, UTM, tipo de cambio) cambian solas: el check acepta un valor reciente de la serie
  // en vez de exigir el del día, y recalcula el motor con el valor que quedó en el archivo.
  readonly series = new Map<string, { celda: string; ref: string }>();

  serie(id: string): string {
    const clave = `s:${id}`;
    if (this.cache.has(clave)) return this.cache.get(clave) as string;
    const r = resolverRequisito(this.libro.pais, id, "serie", this.libro.hoy);
    if (!r.ok) throw new NoDisponible(r.motivo);
    const u = r.usados[0];
    const punto = r.valor as { fecha: FechaISO; valor: number };
    const fila = this.fila++;
    this.filas.push({ tipo: "valor", fila, dato: u.nombre, detalle: `Valor al ${fechaLarga(punto.fecha)}`, valor: punto.valor, unidad: this.unidadVisible(u.unidad), desde: punto.fecha, fuente: u.fuente, formato: "#,##0.00##" });
    const ref = `${PREFIJO_TABLAS}$C$${fila}`;
    this.series.set(id, { celda: `C${fila}`, ref });
    this.cache.set(clave, ref);
    return ref;
  }

  vacia(): boolean {
    return this.filas.length === 0;
  }

  escribir(ws: ExcelJS.Worksheet): void {
    ws.columns = [{ width: 46 }, { width: 30 }, { width: 18 }, { width: 12 }, { width: 14 }, { width: 58 }, { width: 14 }];
    titulo(ws, "A1:G1", `Tablas oficiales de ${this.libro.mercado.nombre}`, PIZARRA);
    nota(
      ws,
      "A2:G2",
      `Son los valores que usan las fórmulas de esta planilla, vigentes al ${fechaLarga(this.libro.hoy)}. Cada uno trae el enlace a la norma o al organismo que lo publica y la fecha en que lo verificamos.`,
    );
    ws.getRow(2).height = 30;
    const encabezado = (fila: number, textos: string[]) =>
      textos.forEach((t, i) => {
        const c = ws.getCell(fila, i + 1);
        c.value = t;
        c.font = { bold: true, color: { argb: "FFFFFFFF" } };
        c.fill = relleno("FF546E7A");
        c.border = BORDE;
      });
    encabezado(3, ["Dato", "Detalle", "Valor", "Unidad", "Vigente desde", "Fuente oficial", "Verificado el"]);
    const fuente = (fila: number, f: DatoUsado["fuente"], desde: FechaISO) => {
      ws.getCell(fila, 5).value = fechaLarga(desde);
      const uc = ws.getCell(fila, 6);
      uc.value = { text: f.url, hyperlink: f.url };
      uc.font = { color: { argb: "FF1565C0" }, underline: true };
      ws.getCell(fila, 7).value = fechaLarga(f.verificadoEl);
    };
    let n = 0;
    for (const f of this.filas) {
      if (f.tipo === "valor") {
        const fill = n++ % 2 === 0 ? S.white : S.label;
        ws.getCell(f.fila, 1).value = f.dato;
        ws.getCell(f.fila, 2).value = f.detalle;
        const v = ws.getCell(f.fila, 3);
        v.value = f.valor;
        v.numFmt = f.formato;
        ws.getCell(f.fila, 4).value = f.unidad;
        fuente(f.fila, f.fuente, f.desde);
        for (let c = 1; c <= 7; c++) {
          const cell = ws.getCell(f.fila, c);
          cell.fill = fill;
          cell.border = BORDE;
          cell.alignment = { vertical: "top", wrapText: c !== 3 };
        }
      } else if (f.tipo === "titulo-escala") {
        ws.getCell(f.fila, 1).value = f.dato;
        ws.getCell(f.fila, 1).font = { bold: true };
        ws.getCell(f.fila, 4).value = f.unidad;
        fuente(f.fila, f.fuente, f.desde);
        for (let c = 1; c <= 7; c++) {
          const cell = ws.getCell(f.fila, c);
          cell.fill = S.cebra;
          cell.border = BORDE;
          cell.alignment = { vertical: "top", wrapText: true };
        }
      } else if (f.tipo === "encabezado-escala") {
        ["Desde", "Hasta", "Tasa %", "Cuota fija"].forEach((t, i) => {
          const c = ws.getCell(f.fila, i + 2);
          c.value = t;
          c.font = { bold: true, size: 9 };
          c.fill = S.label;
          c.border = BORDE;
        });
      } else {
        const t = f.tramo;
        const vals: [number, string][] = [
          [t.desde, f.formato],
          [t.hasta ?? SIN_TOPE, `[>=${SIN_TOPE / 10}]"en adelante";${f.formato}`],
          [t.tasa, "0.00##"],
          [t.cuotaFija ?? 0, f.formato],
        ];
        vals.forEach(([v, fmt], i) => {
          const c = ws.getCell(f.fila, i + 2);
          c.value = v;
          c.numFmt = fmt;
          c.border = BORDE;
        });
      }
    }
    ws.views = [{ state: "frozen", ySplit: 3 }];
  }
}

export type Formato = "moneda" | "entero" | "numero" | "porcentaje" | "dias" | "anios" | "factor" | "fecha" | "texto";

export interface OpcionHoja {
  valor: string;
  etiqueta: string;
}

export class BloqueHoja {
  constructor(private readonly b: Bloque) {}
  campo(id: string, e: Entrada): this {
    this.b.entradas[id] = e;
    return this;
  }
  // La celda que hace de «hoy» para las calculadoras que miran la fecha del cálculo: el check le
  // pone la misma fecha con que corre el motor.
  hoy(e: Entrada): this {
    this.b.hoy = e;
    return this;
  }

  resultado(clave: string, ref: string): this {
    this.b.resultados[clave] = ref;
    return this;
  }
}

export class Hoja {
  readonly ws: ExcelJS.Worksheet;
  private fila = 3;
  private filaPaso = 4;

  constructor(
    private readonly libro: Libro,
    readonly nombre: string,
    tituloHoja: string,
  ) {
    this.ws = libro.wb.addWorksheet(nombre, { properties: { tabColor: { argb: VERDE } } });
    this.ws.columns = [{ width: 50 }, { width: 18 }, { width: 52 }, { width: 3 }, { width: 50 }, { width: 18 }];
    titulo(this.ws, "A1:C1", tituloHoja, VERDE);
    bandaSeccion(this.ws, "E3:F3", "Paso a paso");
  }

  formato(f: Formato): string {
    switch (f) {
      case "moneda":
        return this.libro.fmtMoneda;
      case "entero":
      case "dias":
        return "#,##0.##";
      case "anios":
        return "0.00";
      case "porcentaje":
        return '0.00##" %"';
      case "factor":
        return "0.000000";
      case "fecha":
        return "dd/mm/yyyy";
      case "texto":
        return "General";
      default:
        return "#,##0.00##";
    }
  }

  seccion(texto: string): void {
    this.fila++;
    bandaSeccion(this.ws, `A${this.fila}:C${this.fila}`, texto);
    this.fila++;
  }

  private filaEntrada(etiqueta: string, ayuda?: string): number {
    const r = this.fila++;
    const l = this.ws.getCell(`A${r}`);
    l.value = etiqueta;
    l.fill = S.label;
    l.border = BORDE;
    l.alignment = { horizontal: "left", indent: 1, wrapText: true, vertical: "middle" };
    const c = this.ws.getCell(`B${r}`);
    c.fill = S.input;
    c.border = BORDE;
    c.font = { bold: true };
    if (ayuda) {
      const a = this.ws.getCell(`C${r}`);
      a.value = ayuda;
      a.font = { italic: true, size: 9, color: { argb: "FF777777" } };
      a.alignment = { wrapText: true, vertical: "middle" };
      if (ayuda.length > 70) this.ws.getRow(r).height = 30;
    }
    return r;
  }

  numero(etiqueta: string, defecto: number | null, o: { formato?: Formato; ayuda?: string; min?: number; max?: number } = {}): Entrada {
    const r = this.filaEntrada(etiqueta, o.ayuda);
    const c = this.ws.getCell(`B${r}`);
    if (defecto !== null) c.value = defecto;
    c.numFmt = this.formato(o.formato ?? "moneda");
    c.alignment = { horizontal: "right" };
    const entero = o.formato === "entero" || o.formato === "dias";
    c.dataValidation = {
      type: entero ? "whole" : "decimal",
      operator: "between",
      allowBlank: true,
      showErrorMessage: true,
      error: o.max !== undefined ? `Escribe un número entre ${o.min ?? 0} y ${o.max}.` : `Escribe un número mayor o igual a ${o.min ?? 0}.`,
      formulae: [o.min ?? 0, o.max ?? 1e12],
    };
    return { ref: `B${r}`, convertir: (v) => (v === null || v === undefined ? null : Number(v)) };
  }

  opcion(etiqueta: string, opciones: readonly OpcionHoja[], defecto: string, ayuda?: string): Entrada {
    const r = this.filaEntrada(etiqueta, ayuda);
    const c = this.ws.getCell(`B${r}`);
    const def = opciones.find((o) => o.valor === defecto);
    if (!def) throw new Error(`${this.nombre}: el valor por defecto ${defecto} no está entre las opciones`);
    c.value = def.etiqueta;
    c.alignment = { horizontal: "left", indent: 1 };
    c.dataValidation = desplegable(
      opciones.map((o) => o.etiqueta),
      "Elige una opción de la lista.",
    );
    return {
      ref: `B${r}`,
      convertir: (v) => {
        const o = opciones.find((x) => x.valor === v);
        if (!o) throw new Error(`${this.nombre}!B${r}: la opción ${String(v)} no está en la planilla`);
        return o.etiqueta;
      },
    };
  }

  siNo(etiqueta: string, defecto: boolean, ayuda?: string): Entrada {
    const { ref } = this.opcion(
      etiqueta,
      [
        { valor: "si", etiqueta: "Sí" },
        { valor: "no", etiqueta: "No" },
      ],
      defecto ? "si" : "no",
      ayuda,
    );
    return { ref, convertir: (v) => (v ? "Sí" : "No") };
  }

  opcionDato(etiqueta: string, mapa: Mapa, defecto: string, ayuda?: string): Entrada {
    return this.opcion(etiqueta, mapa.opciones, defecto, ayuda);
  }

  region(etiqueta: string, defecto: string, ayuda?: string): Entrada {
    const regiones = this.libro.mercado.regiones ?? [];
    return this.opcion(
      etiqueta,
      regiones.map((r) => ({ valor: r.id, etiqueta: r.nombre })),
      defecto,
      ayuda,
    );
  }

  fecha(etiqueta: string, defecto: FechaISO | null, ayuda?: string): Entrada {
    const r = this.filaEntrada(etiqueta, ayuda);
    const c = this.ws.getCell(`B${r}`);
    if (defecto) c.value = serialExcel(defecto);
    c.numFmt = "dd/mm/yyyy";
    c.alignment = { horizontal: "right" };
    c.dataValidation = {
      type: "date",
      operator: "greaterThan",
      allowBlank: true,
      showErrorMessage: true,
      error: "Escribe una fecha como dd/mm/aaaa.",
      formulae: [new Date(Date.UTC(1950, 0, 1))],
    };
    return { ref: `B${r}`, convertir: (v) => (v === null || v === undefined ? null : serialExcel(v as FechaISO)) };
  }

  fechaHoy(etiqueta: string, ayuda?: string): Entrada {
    const r = this.filaEntrada(etiqueta, ayuda);
    const c = this.ws.getCell(`B${r}`);
    c.value = { formula: "TODAY()" };
    c.numFmt = "dd/mm/yyyy";
    c.alignment = { horizontal: "right" };
    return { ref: `B${r}`, convertir: (v) => (v === null || v === undefined ? null : serialExcel(v as FechaISO)) };
  }

  paso(etiqueta: string, formula: string, formato: Formato = "moneda"): string {
    const r = this.filaPaso++;
    const l = this.ws.getCell(`E${r}`);
    l.value = etiqueta;
    l.fill = S.label;
    l.border = BORDE;
    l.font = { size: 10 };
    l.alignment = { horizontal: "left", indent: 1, wrapText: true };
    const v = this.ws.getCell(`F${r}`);
    v.value = { formula: formula.replace(/^=/, "") };
    v.fill = S.white;
    v.border = BORDE;
    v.font = { size: 10 };
    v.numFmt = this.formato(formato);
    v.alignment = { horizontal: "right" };
    return `F${r}`;
  }

  pasoTitulo(texto: string): void {
    this.filaPaso++;
    const c = this.ws.getCell(`E${this.filaPaso}`);
    c.value = texto;
    c.font = { bold: true, size: 10, color: { argb: VERDE } };
    this.filaPaso++;
  }

  resultado(etiqueta: string, formula: string, o: { total?: boolean; formato?: Formato; ayuda?: string } = {}): string {
    const r = this.fila++;
    const fill = o.total ? S.total : S.output;
    const l = this.ws.getCell(`A${r}`);
    l.value = etiqueta;
    l.fill = fill;
    l.border = BORDE;
    l.alignment = { horizontal: "left", indent: 1, wrapText: true };
    if (o.total) l.font = { bold: true };
    const v = this.ws.getCell(`B${r}`);
    v.value = { formula: formula.replace(/^=/, "") };
    v.fill = fill;
    v.border = BORDE;
    v.numFmt = this.formato(o.formato ?? "moneda");
    v.alignment = { horizontal: "right" };
    if (o.total) v.font = { bold: true };
    if (o.ayuda) {
      const a = this.ws.getCell(`C${r}`);
      a.value = o.ayuda;
      a.font = { italic: true, size: 9, color: { argb: "FF777777" } };
      a.alignment = { wrapText: true, vertical: "middle" };
    }
    return `B${r}`;
  }

  aviso(formula: string): void {
    const r = this.fila++;
    this.ws.mergeCells(`A${r}:C${r}`);
    const c = this.ws.getCell(`A${r}`);
    c.value = { formula: formula.replace(/^=/, "") };
    c.font = { bold: true, color: { argb: "FFB71C1C" } };
    c.alignment = { wrapText: true };
  }

  nota(texto: string): void {
    this.fila++;
    const r = this.fila++;
    nota(this.ws, `A${r}:C${r}`, texto);
    this.ws.getRow(r).height = Math.min(90, 15 * Math.ceil(texto.length / 110) + 6);
  }

  bloque(calculadora: string): BloqueHoja {
    const b: Bloque = { calculadora, hoja: this.nombre, entradas: {}, resultados: {} };
    this.libro.bloques.push(b);
    return new BloqueHoja(b);
  }

  // aplicarEscala del motor: cuota fija + tasa sobre el excedente del límite inferior del tramo.
  // Debajo del primer tramo el motor usa la primera fila; MATCH daría #N/A, de ahí el IFERROR.
  escala(e: Escala, base: string): string {
    const idx = `IFERROR(MATCH(${base},${e.rangoDesde},1),1)`;
    return `IF(${base}<=0,0,INDEX(${e.rangoCuota},${idx})+(${base}-INDEX(${e.rangoDesde},${idx}))*INDEX(${e.rangoTasa},${idx})/100)`;
  }

  // aplicarEscalaMarginal: una fila de paso por tramo en vez de SUMPRODUCT con comparaciones, que
  // Excel resuelve pero HyperFormula (el evaluador del check) no sin aritmética de matrices.
  marginal(etiqueta: string, e: Escala, base: string, unidad?: string): string {
    const refs: string[] = [];
    const u = unidad ? `*${unidad}` : "";
    for (let i = 0; i < e.filas; i++) {
      refs.push(this.paso(`${etiqueta}: tramo ${i + 1}`, `MAX(0,MIN(${base},${e.hasta(i)}${u})-${e.desde(i)}${u})*${e.tasa(i)}/100`));
    }
    return this.paso(`${etiqueta}: total`, `SUM(${refs.join(",")})`);
  }

  tasaDeTramo(e: Escala, base: string): string {
    return `INDEX(${e.rangoTasa},IFERROR(MATCH(${base},${e.rangoDesde},1),1))`;
  }
}

export interface DescripcionHoja {
  nombre: string;
  texto: string;
}

export class Libro {
  readonly wb = new ExcelJS.Workbook();
  readonly tablas: Tablas;
  readonly bloques: Bloque[] = [];
  readonly hojas: DescripcionHoja[] = [];
  readonly mercado: Mercado;
  readonly fmtMoneda: string;
  readonly decimales: number;
  private readonly instrucciones: ExcelJS.Worksheet;

  constructor(
    readonly pais: PaisDefinido,
    readonly hoy: FechaISO,
  ) {
    this.mercado = pais.mercado;
    this.tablas = new Tablas(this);
    this.decimales = pais.mercado.redondeo.decimales;
    const moneda = pais.mercado.monedas[0];
    const simbolo =
      pais.mercado.simbolos?.[moneda] ??
      new Intl.NumberFormat(pais.mercado.locale, { style: "currency", currency: moneda }).formatToParts(1).find((p) => p.type === "currency")?.value ??
      moneda;
    const dec = decimalesDeMoneda(moneda, pais.mercado.locale) > 0 && this.decimales > 0 ? `.${"0".repeat(this.decimales)}` : "";
    this.fmtMoneda = `"${simbolo.replace(/"/g, "")} "#,##0${dec}`;
    this.instrucciones = this.wb.addWorksheet(HOJA_INSTRUCCIONES, { properties: { tabColor: { argb: NARANJA } } });
  }

  get trato(): Trato {
    return this.mercado.trato;
  }

  disponible(slug: string): boolean {
    const entrada = this.pais.calculadoras.find((c) => c.definicion.slug === slug);
    if (!entrada) return false;
    return publicabilidad(this.pais, entrada, this.hoy, "produccion").publicable;
  }

  r(expr: string, decimales = this.decimales): string {
    return `ROUND(${expr},${decimales})`;
  }

  hoja(nombre: string, tituloHoja: string, descripcion: string): Hoja {
    this.hojas.push({ nombre, texto: descripcion });
    return new Hoja(this, nombre, tituloHoja);
  }

  descartarHoja(nombre: string): void {
    const ws = this.wb.getWorksheet(nombre);
    if (ws) this.wb.removeWorksheet(ws.id);
    const i = this.hojas.findIndex((h) => h.nombre === nombre);
    if (i >= 0) this.hojas.splice(i, 1);
    for (let j = this.bloques.length - 1; j >= 0; j--) if (this.bloques[j].hoja === nombre) this.bloques.splice(j, 1);
  }

  finalizar(tituloLibro: string, notasPais: readonly string[] = []): void {
    const t = this.trato;
    const ws = this.instrucciones;
    ws.columns = [{ width: 4 }, { width: 110 }];
    titulo(ws, "A1:B1", tituloLibro, NARANJA);
    const pasos = [
      segun(t, {
        tu: "Las celdas amarillas son para tus datos. Las verdes se calculan solas, con las fórmulas de la ley. A la derecha de cada hoja está el paso a paso de la cuenta.",
        usted: "Las celdas amarillas son para sus datos. Las verdes se calculan solas, con las fórmulas de la ley. A la derecha de cada hoja está el paso a paso de la cuenta.",
        vos: "Las celdas amarillas son para tus datos. Las verdes se calculan solas, con las fórmulas de la ley. A la derecha de cada hoja está el paso a paso de la cuenta.",
      }),
      ...this.hojas.map((h) => `«${h.nombre}»: ${h.texto}`),
      `«${HOJA_TABLAS}» tiene cada valor oficial que usan las fórmulas, con el enlace a su fuente y la fecha en que lo verificamos. Los valores son los vigentes al ${fechaLarga(this.hoy)}.`,
      segun(t, {
        tu: "Cuando cambia un valor oficial, actualizamos la planilla y el mismo enlace de descarga te baja la versión nueva.",
        usted: "Cuando cambia un valor oficial, actualizamos la planilla y el mismo enlace de descarga le baja la versión nueva.",
        vos: "Cuando cambia un valor oficial, actualizamos la planilla y el mismo enlace de descarga te baja la versión nueva.",
      }),
    ];
    pasos.forEach((texto, i) => {
      const r = 3 + i;
      const nc = ws.getCell(r, 1);
      nc.value = i + 1;
      nc.font = { bold: true, color: { argb: "FFFFFFFF" } };
      nc.fill = relleno(NARANJA);
      nc.alignment = { horizontal: "center", vertical: "middle" };
      const tc = ws.getCell(r, 2);
      tc.value = texto;
      tc.alignment = { wrapText: true, vertical: "middle", indent: 1 };
      ws.getRow(r).height = texto.length > 105 ? 34 : 20;
    });
    let r = 3 + pasos.length + 1;
    const notas = [
      ...notasPais,
      segun(t, {
        tu: "Da los mismos números que las calculadoras gratuitas de calcularya.com. Antes de publicar cada versión, una verificación automática recalcula este archivo y lo compara con ellas.",
        usted: "Da los mismos números que las calculadoras gratuitas de calcularya.com. Antes de publicar cada versión, una verificación automática recalcula este archivo y lo compara con ellas.",
        vos: "Da los mismos números que las calculadoras gratuitas de calcularya.com. Antes de publicar cada versión, una verificación automática recalcula este archivo y lo compara con ellas.",
      }),
      segun(t, {
        tu: "Es una referencia de cálculo con sus fuentes, no asesoría legal. Tu contrato o tu empresa pueden darte más que el mínimo de ley.",
        usted: "Es una referencia de cálculo con sus fuentes, no asesoría legal. Su contrato o su empresa pueden darle más que el mínimo de ley.",
        vos: "Es una referencia de cálculo con sus fuentes, no asesoramiento legal. Tu contrato o tu empresa pueden darte más que el mínimo de ley.",
      }),
      segun(t, {
        tu: "Las fechas van como dd/mm/aaaa. Si tu Excel está en inglés y las lee al revés, escríbelas como aaaa-mm-dd.",
        usted: "Las fechas van como dd/mm/aaaa. Si su Excel está en inglés y las lee al revés, escríbalas como aaaa-mm-dd.",
        vos: "Las fechas van como dd/mm/aaaa. Si tu Excel está en inglés y las lee al revés, escribilas como aaaa-mm-dd.",
      }),
    ];
    for (const n of notas) {
      nota(ws, `A${r}:B${r}`, n);
      ws.getRow(r).height = n.length > 110 ? 30 : 18;
      r++;
    }
    const tablas = this.wb.addWorksheet(HOJA_TABLAS, { properties: { tabColor: { argb: PIZARRA } } });
    this.tablas.escribir(tablas);
    this.wb.creator = "CalcularYa (calcularya.com)";
    this.wb.title = tituloLibro;
    const fecha = new Date(`${this.hoy}T12:00:00Z`);
    this.wb.created = fecha;
    this.wb.modified = fecha;
  }
}

export interface PlanillaPais {
  mercado: CodigoMercado;
  titulo(anio: number): string;
  construir(l: Libro): void;
  notas?: readonly string[];
}

export function nombreArchivo(anio: number): string {
  return `sueldo-y-liquidacion-${anio}.xlsx`;
}

export type { ValorResuelto };
