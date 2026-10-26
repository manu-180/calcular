// Qué muestra la vista previa de cada planilla para un caso dado: filas del Liquidador del archivo
// con su número real (la etiqueta a veces abreviada para que entre en un celular) y los importes
// del motor de la calculadora. check_prefill_planillas.ts evalúa el archivo con esos datos y exige
// que cada fila y cada importe de esta previa coincidan. La usan la oferta de la calculadora y las
// landings, así las dos muestran exactamente lo mismo que se descarga.

import type { FilaHoja, HojaPrevia } from "@/components/HojaCalculo";
import * as comercio from "@/lib/prefill/comercio";
import * as uocra from "@/lib/prefill/uocra";
import * as casas from "@/lib/prefill/casas";
import { calcularComercio, calcularUocra } from "@/lib/convenios";
import { calcularCasasParticulares } from "@/lib/casas-particulares";
import { calcularAportes } from "@/lib/aportes-casas-particulares";
import { CATEGORIAS_COMERCIO, JORNADAS_COMERCIO, MESES_COMERCIO } from "@/data/convenios/comercio";
import { CATEGORIAS_UOCRA, MESES_UOCRA, ZONAS_UOCRA } from "@/data/convenios/uocra";
import { ESCALAS_POR_MES, HORAS_EXTRAS, escalaDe } from "@/data/casas-particulares";
import { formatARS } from "@/lib/formato";
import * as monotributo from "@/lib/prefill/monotributo";
import { categoriaPorParametros, cuotaMensual } from "@/lib/monotributo";
import { CATEGORIAS as CATEGORIAS_MONO } from "@/data/monotributo";

// Orden real de las pestañas de cada libro (check_prefill_planillas.ts lo compara con el archivo).
export const PESTANAS = {
  "planilla-monotributo": ["Instrucciones", "Mi monotributo", "Categorías 2026", "Fuentes"],
  "planilla-comercio": ["Liquidación", "Escala 2026", "SAC (Aguinaldo)", "Changelog"],
  "planilla-uocra": ["Instrucciones", "Escalas", "Liquidador", "Diferencias", "Fuentes"],
  "planilla-casas-particulares": [
    "Instrucciones",
    "Liquidador",
    "Pagos del año",
    "Recibo",
    "Escala 2026",
    "Aportes ARCA",
    "Fuentes",
  ],
} as const;

export type Resumen = { bruto: number; neto: number; etiqueta: string };

const horas = (n: number) => n.toLocaleString("es-AR", { maximumFractionDigits: 2 });
const siNo = (b: boolean) => (b ? "Sí" : "No");

export function hojaComercio(archivo: string, d: comercio.Datos): { hoja: HojaPrevia; resumen: Resumen } | null {
  const r = calcularComercio({
    mesId: d.mesId,
    categoriaId: d.categoriaId,
    aniosAntiguedad: d.anios,
    jornadaFactor: JORNADAS_COMERCIO.find((j) => j.id === d.jornadaId)!.factor,
    conPresentismo: d.presentismo,
  });
  if (!r) return null;
  const categoria = CATEGORIAS_COMERCIO.find((c) => c.id === d.categoriaId)!;
  const mes = MESES_COMERCIO.find((m) => m.id === d.mesId)!;
  const filas: FilaHoja[] = [
    { fila: 4, etiqueta: "DATOS DEL EMPLEADO", tono: "seccion" },
    { fila: 5, etiqueta: "Categoría del convenio", valor: categoria.nombre, tono: "input" },
    { fila: 6, etiqueta: "Mes a liquidar", valor: mes.etiqueta, tono: "input" },
    { fila: 7, etiqueta: "Años de antigüedad", valor: String(d.anios), tono: "input" },
    { fila: 8, etiqueta: "Jornada laboral", valor: comercio.JORNADA_EN_PLANILLA[d.jornadaId], tono: "input" },
    { fila: 9, etiqueta: "¿Cobró presentismo?", valor: siNo(d.presentismo), tono: "input" },
    { fila: 11, etiqueta: "LIQUIDACIÓN DEL MES", tono: "seccion" },
    { fila: 12, etiqueta: "Básico convencional", valor: r.basico },
    { fila: 13, etiqueta: "Sumas no remunerativas", valor: r.noRemunerativo },
    { fila: 14, etiqueta: "Adicional por antigüedad", valor: r.antiguedadTotal },
    { fila: 15, etiqueta: "Presentismo (8,33%)", valor: r.presentismoTotal },
    ...(r.asignacionExtraordinaria > 0
      ? [{ fila: 16, etiqueta: "Asignación extraordinaria", valor: r.asignacionExtraordinaria }]
      : []),
    { fila: 17, etiqueta: "TOTAL BRUTO", valor: r.bruto, tono: "total" },
    { fila: 18, etiqueta: "Aportes del trabajador", valor: -r.descuentos },
    { fila: 19, etiqueta: "NETO ESTIMADO", valor: r.neto, tono: "total" },
  ];
  return {
    hoja: { archivo, pestanas: [...PESTANAS["planilla-comercio"]], hoja: comercio.HOJA, filas },
    resumen: { bruto: r.bruto, neto: r.neto, etiqueta: `${categoria.nombre} · ${mes.etiqueta}` },
  };
}

export function hojaUocra(archivo: string, d: uocra.Datos): { hoja: HojaPrevia; resumen: Resumen } | null {
  const r = calcularUocra({
    mesId: d.mesId,
    categoriaId: d.categoriaId,
    zonaId: d.zonaId,
    horasMes: d.horas,
    conAsistencia: d.asistencia,
    conAporteSindical: d.aporteSolidario,
  });
  if (!r) return null;
  const categoria = CATEGORIAS_UOCRA.find((c) => c.id === d.categoriaId)!;
  const zona = ZONAS_UOCRA.find((z) => z.id === d.zonaId)!;
  const mes = MESES_UOCRA.find((m) => m.id === d.mesId)!;
  const filas: FilaHoja[] = [
    { fila: 4, etiqueta: "DATOS DEL TRABAJADOR", tono: "seccion" },
    { fila: 5, etiqueta: "Categoría", valor: categoria.nombre, tono: "input" },
    { fila: 6, etiqueta: "Zona", valor: zona.nombre, tono: "input" },
    { fila: 7, etiqueta: "Mes a liquidar", valor: mes.etiqueta, tono: "input" },
    ...(r.esMensual
      ? []
      : [{ fila: 8, etiqueta: "Horas trabajadas en el mes", valor: horas(d.horas), tono: "input" as const }]),
    { fila: 9, etiqueta: "¿Cobró asistencia perfecta?", valor: siNo(d.asistencia), tono: "input" },
    { fila: 10, etiqueta: "¿Aporte solidario 2%?", valor: siNo(d.aporteSolidario), tono: "input" },
    { fila: 12, etiqueta: "LIQUIDACIÓN DEL MES", tono: "seccion" },
    ...(r.jornal !== null ? [{ fila: 13, etiqueta: "Jornal por hora", valor: r.jornal }] : []),
    { fila: 15, etiqueta: "Básico del mes", valor: r.basicoMensual },
    { fila: 16, etiqueta: "Asistencia perfecta (20%)", valor: r.asistenciaPerfecta },
    // Un $0 sin explicación parece un error del producto: en agosto de 2026 es el dato correcto.
    { fila: 18, etiqueta: "Suma no remunerativa", valor: r.snr, nota: r.snr === 0 ? "absorbida al jornal en este tramo" : undefined },
    { fila: 19, etiqueta: "TOTAL BRUTO", valor: r.bruto, tono: "total" },
    { fila: 20, etiqueta: "Aportes del trabajador", valor: -r.descuentos },
    { fila: 21, etiqueta: "NETO ESTIMADO", valor: r.neto, tono: "total" },
    { fila: 23, etiqueta: "COSTO PARA EL EMPLEADOR", tono: "seccion" },
    { fila: 24, etiqueta: "Fondo de cese laboral · 1er año (12%)", valor: r.totalRemunerativo * 0.12 },
  ];
  return {
    hoja: { archivo, pestanas: [...PESTANAS["planilla-uocra"]], hoja: uocra.HOJA, filas },
    resumen: { bruto: r.bruto, neto: r.neto, etiqueta: `${categoria.nombre} · ${zona.nombre} · ${mes.etiqueta}` },
  };
}

export type ResumenCasas = Resumen & { arca: number; costo: number; faltaObraSocial: number };

export function hojaCasas(archivo: string, d: casas.Datos): { hoja: HojaPrevia; resumen: ResumenCasas } | null {
  const r = calcularCasasParticulares({
    mesId: d.mesId,
    categoriaId: d.categoriaId,
    modalidad: d.modalidad,
    horasSemanales: d.horasSemanales,
    zonaDesfavorable: d.zonaDesfavorable,
    horasExtrasComunes: d.extrasComunes,
    horasExtrasFinDeSemana: d.extrasFinDeSemana,
    aniosAntiguedad: d.aniosAntiguedad,
  });
  if (!r) return null;
  // La planilla trae «Mayor de 18 años» como condición para ARCA y el prefill no la cambia.
  const a = calcularAportes({ horasSemanales: d.horasSemanales, condicion: "activo-mayor-18", cantidadTrabajadores: 1 });
  const costo = Math.round((r.total + a.totalPorTrabajador) * 100) / 100;
  const categoria = escalaDe(d.mesId).find((c) => c.id === d.categoriaId)!;
  const mes = ESCALAS_POR_MES.find((m) => m.id === d.mesId)!;
  const filas: FilaHoja[] = [
    { fila: 4, etiqueta: "DATOS DEL MES", tono: "seccion" },
    { fila: 5, etiqueta: "Mes a liquidar", valor: mes.etiqueta, tono: "input" },
    { fila: 6, etiqueta: "Categoría", valor: categoria.nombre, tono: "input" },
    { fila: 7, etiqueta: "Modalidad", valor: casas.MODALIDAD_EN_PLANILLA[d.modalidad], tono: "input" },
    { fila: 8, etiqueta: "Horas por semana", valor: horas(d.horasSemanales), tono: "input" },
    { fila: 9, etiqueta: "¿Zona desfavorable?", valor: siNo(d.zonaDesfavorable), tono: "input" },
    ...(d.aniosAntiguedad > 0
      ? [{ fila: 10, etiqueta: "Años de antigüedad", valor: String(d.aniosAntiguedad), tono: "input" as const }]
      : []),
    ...(d.extrasComunes > 0
      ? [{ fila: 11, etiqueta: "Horas extras en días comunes", valor: horas(d.extrasComunes), tono: "input" as const }]
      : []),
    ...(d.extrasFinDeSemana > 0
      ? [{ fila: 12, etiqueta: "Horas extras fin de semana y feriados", valor: horas(d.extrasFinDeSemana), tono: "input" as const }]
      : []),
    { fila: 13, etiqueta: "Condición (para ARCA)", valor: "Mayor de 18 años", tono: "input" },
    { fila: 15, etiqueta: "SUELDO DEL MES", tono: "seccion" },
    { fila: 16, etiqueta: "Valor de la hora", valor: formatARS(r.valorHora, 2) },
    { fila: 20, etiqueta: "Básico del mes", valor: r.basico },
    ...(r.adicionalAntiguedad > 0
      ? [{ fila: 21, etiqueta: `Adicional por antigüedad (${r.aniosAntiguedad} ${r.aniosAntiguedad === 1 ? "año" : "años"})`, valor: r.adicionalAntiguedad }]
      : []),
    ...(r.extrasComunes > 0
      ? [{ fila: 22, etiqueta: `Horas extras comunes (+${HORAS_EXTRAS.comunes}%)`, valor: r.extrasComunes }]
      : []),
    ...(r.extrasFinDeSemana > 0
      ? [{ fila: 23, etiqueta: `Horas extras fin de semana (+${HORAS_EXTRAS.finDeSemanaYFeriados}%)`, valor: r.extrasFinDeSemana }]
      : []),
    { fila: 24, etiqueta: "TOTAL A PAGARLE ESTE MES", valor: r.total, tono: "total" },
    { fila: 25, etiqueta: "Aguinaldo que va generando", valor: r.aguinaldoEstimado },
    { fila: 27, etiqueta: "LO QUE LE PAGÁS A ARCA", tono: "seccion" },
    { fila: 29, etiqueta: "Pago mensual a ARCA", valor: a.totalPorTrabajador, nota: "aportes, contribuciones y ART" },
    ...(a.faltaParaObraSocial > 0
      ? [{ fila: 31, etiqueta: "Falta para que tenga obra social", valor: a.faltaParaObraSocial }]
      : []),
    { fila: 33, etiqueta: "COSTO TOTAL DEL MES", valor: costo, tono: "total" },
  ];
  return {
    hoja: { archivo, pestanas: [...PESTANAS["planilla-casas-particulares"]], hoja: casas.HOJA, filas },
    resumen: {
      bruto: r.total,
      neto: r.total,
      arca: a.totalPorTrabajador,
      costo,
      faltaObraSocial: a.faltaParaObraSocial,
      etiqueta: `${categoria.nombre} · ${horas(d.horasSemanales)} h por semana · ${mes.etiqueta}`,
    },
  };
}

export type ResumenMonotributo = Resumen & {
  categoria: string;
  /** null: ya está en la K; lo que sigue es quedar fuera del régimen. */
  siguiente: string | null;
  margen: number;
  cuota: number;
};

// Sin las filas de los 12 meses: sus rótulos salen de la ventana de recategorización del día en
// que se generó el archivo y no tienen por qué coincidir con la del día en que se mira la oferta.
export function hojaMonotributo(
  archivo: string,
  d: monotributo.Datos,
): { hoja: HojaPrevia; resumen: ResumenMonotributo } | null {
  const r = categoriaPorParametros({ ingresos: d.facturacion });
  const actual = CATEGORIAS_MONO.find((c) => c.cat === d.categoriaActual);
  if (r.tipo !== "ok" || !actual) return null;
  const cat = r.categoria;
  const i = CATEGORIAS_MONO.indexOf(cat);
  const iActual = CATEGORIAS_MONO.indexOf(actual);
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const margen = r2(cat.ingresosBrutosMax - d.facturacion);
  const cuota = r2(cuotaMensual(cat, d.actividad, d.dependencia).total);
  const cuotaActual = r2(cuotaMensual(actual, d.actividad, d.dependencia).total);
  const movimiento = i > iActual ? "Subís de categoría" : i < iActual ? "Bajás de categoría" : "Te mantenés en la misma";
  const filas: FilaHoja[] = [
    { fila: 4, etiqueta: "TUS DATOS", tono: "seccion" },
    { fila: 5, etiqueta: "Actividad principal", valor: monotributo.ACTIVIDAD_EN_PLANILLA[d.actividad], tono: "input" },
    { fila: 6, etiqueta: "Tu categoría actual", valor: actual.cat, tono: "input" },
    { fila: 7, etiqueta: "¿Trabajás en relación de dependencia?", valor: siNo(d.dependencia), tono: "input" },
    { fila: 30, etiqueta: "RESULTADO", tono: "seccion" },
    { fila: 31, etiqueta: "Facturación de los últimos 12 meses", valor: d.facturacion },
    { fila: 37, etiqueta: "CATEGORÍA QUE TE CORRESPONDE", valor: cat.cat, tono: "total" },
    { fila: 38, etiqueta: "Qué parámetro la define", valor: "La facturación" },
    { fila: 39, etiqueta: "Tope de esa categoría", valor: cat.ingresosBrutosMax },
    { fila: 40, etiqueta: "Margen para seguir facturando", valor: margen },
    { fila: 41, etiqueta: "CUOTA MENSUAL", valor: cuota, tono: "total" },
    { fila: 42, etiqueta: `Cuota de tu categoría actual (${actual.cat})`, valor: cuotaActual },
    { fila: 43, etiqueta: "¿Qué pasa en la recategorización?", valor: movimiento },
  ];
  return {
    hoja: { archivo, pestanas: [...PESTANAS["planilla-monotributo"]], hoja: monotributo.HOJA, filas },
    resumen: {
      bruto: d.facturacion,
      neto: d.facturacion,
      etiqueta: `${monotributo.ACTIVIDAD_EN_PLANILLA[d.actividad]} · hoy en ${actual.cat} · ${formatARS(d.facturacion, 0)} en 12 meses`,
      categoria: cat.cat,
      siguiente: CATEGORIAS_MONO[i + 1]?.cat ?? null,
      margen,
      cuota,
    },
  };
}
