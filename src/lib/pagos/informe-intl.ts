import { ejecutar, type Crudos, type EstadoCalculo, type FilaFormateada } from "@/motor/formulario";
import { formatearFecha, formatearMoneda, formatearNumero, formatearPorcentaje, formatearValorUnidad } from "@/motor/formato";
import type { TextosMotor } from "@/motor/textos";
import type { Campo, ColumnaTabla, ContextoSerializado, DefinicionCalculadora, FechaISO, PropsCalculadora, ResultadoBase, TablaResultado } from "@/motor/tipos";
import { crudoDeNumero } from "@/lib/prefill/intl-cliente";
import { campoEscenario, valoresEscenario, type EscenarioFamilia } from "./ofertas-intl";
import { parsearEntrada } from "@/motor/formulario";

// Los números del informe salen de ejecutar(): la misma función, con la misma definición y los mismos
// valores oficiales que usa la calculadora web. Así el informe y la web no pueden dar distinto; lo
// vigila scripts/check_ofertas_intl.ts, que además prueba el viaje entrada → texto → entrada.

export interface Escenarios {
  campo: string;
  columnas: string[];
  filas: { valor: string; resultados: string[]; actual: boolean }[];
}

export function filaClave(filas: readonly FilaFormateada[]): FilaFormateada | null {
  const destacadas = filas.filter((f) => f.destacada);
  return destacadas.at(-1) ?? filas.at(-1) ?? null;
}

function textoValor(campo: Campo, v: number, props: PropsCalculadora): string {
  const c = props.contexto;
  if (campo.tipo === "moneda") {
    const moneda = campo.moneda ?? c.moneda;
    return formatearMoneda(v, c.locale, moneda, undefined, c.simbolos?.[moneda]);
  }
  if (campo.tipo === "porcentaje") return formatearPorcentaje(v, c.locale);
  return formatearNumero(v, c.locale);
}

export function calcularEscenarios(
  def: DefinicionCalculadora,
  escenario: EscenarioFamilia,
  crudos: Crudos,
  props: PropsCalculadora,
  textos: TextosMotor,
): Escenarios | null {
  const campo = campoEscenario(escenario, def.campos);
  if (!campo) return null;
  const p = parsearEntrada(def.campos, crudos, props.contexto, props.opcionesDinamicas);
  if (!p.ok) return null;
  const actual = p.entrada[campo.id];
  if (typeof actual !== "number" || actual <= 0) return null;
  let columnas: { clave: string; etiqueta: string }[] | null = null;
  const filas: Escenarios["filas"] = [];
  for (const v of valoresEscenario(escenario.tipo, campo, actual)) {
    const e = ejecutar(def, { ...crudos, [campo.id]: crudoDeNumero(v, props.contexto.locale) }, props, textos);
    if (e.tipo !== "ok") continue;
    if (!columnas) {
      const dest = e.filas.filter((f) => f.destacada);
      columnas = (dest.length ? dest : e.filas.slice(-1)).slice(-2).map((f) => ({ clave: f.clave, etiqueta: f.etiqueta }));
    }
    filas.push({
      valor: textoValor(campo, v, props),
      resultados: columnas.map((c) => e.filas.find((f) => f.clave === c.clave)?.texto ?? "-"),
      actual: Math.abs(v - actual) < 1e-9,
    });
  }
  if (!columnas || filas.length < 2) return null;
  return { campo: campo.etiqueta, columnas: columnas.map((c) => c.etiqueta), filas };
}

export function estadoDelInforme(def: DefinicionCalculadora, crudos: Crudos, props: PropsCalculadora, textos: TextosMotor): EstadoCalculo {
  return ejecutar(def, crudos, props, textos);
}

// ─── Tablas completas ─────────────────────────────────────────────────────────────────────────

export interface TablaInforme {
  clave: string;
  titulo: string;
  columnas: string[];
  filas: string[][];
}

const esTabla = (v: unknown): v is TablaResultado => !!v && typeof v === "object" && (v as { tipo?: unknown }).tipo === "tabla" && Array.isArray((v as TablaResultado).filas);

function celda(v: number | string | null, col: ColumnaTabla, c: ContextoSerializado): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return col.formato === "fecha" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? formatearFecha(v as FechaISO, c.locale, "corta") : v;
  if (!Number.isFinite(v)) return "";
  switch (col.formato) {
    case "moneda":
      return formatearMoneda(v, c.locale, c.moneda, undefined, c.simbolos?.[c.moneda]);
    case "porcentaje":
      return formatearPorcentaje(v, c.locale);
    case "numero":
    case "texto":
    case "fecha":
      return formatearNumero(v, c.locale);
    default:
      return formatearValorUnidad(v, col.formato, c.locale);
  }
}

// La página gratis muestra las primeras filas de cada tabla; el informe las muestra todas.
export function tablasDelInforme(tablas: DefinicionCalculadora["tablas"], resultado: ResultadoBase, contexto: ContextoSerializado): TablaInforme[] {
  const salida: TablaInforme[] = [];
  for (const t of tablas ?? []) {
    const valor = resultado[t.clave];
    if (!esTabla(valor) || !valor.filas.length) continue;
    salida.push({
      clave: t.clave,
      titulo: t.titulo,
      columnas: valor.columnas.map((x) => x.etiqueta),
      filas: valor.filas.map((f) => valor.columnas.map((col, i) => celda(f[i] ?? null, col, contexto))),
    });
  }
  return salida;
}
