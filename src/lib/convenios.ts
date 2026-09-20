// Lógica pura de las calculadoras de convenios (sin UI).
// Comercio (CCT 130/75): básico + no remunerativo + antigüedad 1%/año + presentismo 1/12.
// UOCRA (CCT 76/75): jornal × horas + asistencia perfecta 20% + SNR fija por categoría/zona.

import {
  CAMIONEROS_ANTIGUEDAD_POR_ANIO,
  CAMIONEROS_APORTES_REMUNERATIVO,
  CAMIONEROS_BASE_MAYO,
  CATEGORIAS_CAMIONEROS,
  MESES_CAMIONEROS,
  type CategoriaCamionerosId,
  basicoCamioneros,
} from "@/data/convenios/camioneros";
import {
  CATEGORIAS_COMERCIO,
  COMERCIO_ANTIGUEDAD_POR_ANIO,
  COMERCIO_APORTES_NO_REM,
  COMERCIO_APORTES_REMUNERATIVO,
  COMERCIO_PRESENTISMO_FRACCION,
  MESES_COMERCIO,
  type CategoriaComercioId,
} from "@/data/convenios/comercio";
import {
  CATEGORIAS_UOCRA,
  MESES_UOCRA,
  UOCRA_APORTES_REMUNERATIVO,
  UOCRA_APORTES_SNR,
  UOCRA_APORTE_SOLIDARIO,
  UOCRA_ASISTENCIA_PERFECTA,
  ZONAS_UOCRA,
  type CategoriaUocraId,
  type ZonaUocraId,
} from "@/data/convenios/uocra";

function fechaEnProsa(iso: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function textoProximaParitaria(
  p: { fechaISO: string; define: string; publicada: boolean; comprobadoEl: string },
  hoyISO: string,
): string {
  if (p.publicada) return "El acuerdo ya está cargado.";
  if (p.fechaISO > hoyISO) {
    return `La próxima definición es la reunión del ${fechaEnProsa(p.fechaISO)}, que fija ${p.define}.`;
  }
  return `La Comisión Especial se reunió el ${fechaEnProsa(p.fechaISO)} para fijar ${p.define}, y al ${fechaEnProsa(p.comprobadoEl)} el acuerdo todavía no se publicó: la tabla llega hasta el último mes acordado.`;
}

// ---------------------------------------------------------------------------
// Empleados de Comercio
// ---------------------------------------------------------------------------

export type ResultadoComercio = {
  mesEtiqueta: string;
  // Bases proporcionales a la jornada.
  basico: number;
  noRemunerativo: number;
  // Asignación extraordinaria por única vez (acuerdo 07/2026, julio y agosto de 2026).
  // Va aparte porque queda fuera de la antigüedad, del presentismo y del aguinaldo.
  asignacionExtraordinaria: number;
  // Adicionales, separados por naturaleza (la parte calculada sobre lo no remunerativo
  // también es no remunerativa, según instruye la circular FAECYS).
  antiguedadRem: number;
  antiguedadNoRem: number;
  presentismoRem: number;
  presentismoNoRem: number;
  antiguedadTotal: number;
  presentismoTotal: number;
  totalRemunerativo: number;
  totalNoRemunerativo: number;
  bruto: number;
  descuentos: number;
  neto: number;
};

export function calcularComercio(params: {
  mesId: string;
  categoriaId: CategoriaComercioId | string;
  aniosAntiguedad: number;
  jornadaFactor: number;
  conPresentismo: boolean;
}): ResultadoComercio | null {
  const mes = MESES_COMERCIO.find((m) => m.id === params.mesId);
  if (!mes) return null;

  const categoria = CATEGORIAS_COMERCIO.find((c) => c.id === params.categoriaId);
  if (!categoria) return null;
  const basicoCompleto = mes.basicos[categoria.id];

  const { aniosAntiguedad, jornadaFactor } = params;
  if (!Number.isFinite(aniosAntiguedad) || aniosAntiguedad < 0 || aniosAntiguedad > 60)
    return null;
  if (!Number.isFinite(jornadaFactor) || jornadaFactor <= 0 || jornadaFactor > 1) return null;

  // Bases proporcionales a la jornada (cláusula CUARTO del acuerdo + LCT).
  const basico = basicoCompleto * jornadaFactor;
  const noRemunerativo = mes.noRemunerativo * jornadaFactor;
  const asignacionExtraordinaria = (mes.asignacionExtraordinaria ?? 0) * jornadaFactor;

  // Antigüedad: 1% por año, sobre las cifras remunerativas Y no remunerativas.
  const antiguedadRem = basico * COMERCIO_ANTIGUEDAD_POR_ANIO * aniosAntiguedad;
  const antiguedadNoRem = noRemunerativo * COMERCIO_ANTIGUEDAD_POR_ANIO * aniosAntiguedad;

  // Presentismo: 1/12 de la remuneración del mes (incluye antigüedad y no remunerativos).
  const presentismoRem = params.conPresentismo
    ? (basico + antiguedadRem) * COMERCIO_PRESENTISMO_FRACCION
    : 0;
  const presentismoNoRem = params.conPresentismo
    ? (noRemunerativo + antiguedadNoRem) * COMERCIO_PRESENTISMO_FRACCION
    : 0;

  const totalRemunerativo = basico + antiguedadRem + presentismoRem;
  // La asignación extraordinaria es no remunerativa, pero NO suma antigüedad ni
  // presentismo: la circular la excluye expresamente de las dos.
  const totalNoRemunerativo =
    noRemunerativo + antiguedadNoRem + presentismoNoRem + asignacionExtraordinaria;
  const bruto = totalRemunerativo + totalNoRemunerativo;

  // Neto estimado: 17% de aportes sobre lo remunerativo; lo no remunerativo solo
  // aporta a la obra social (3%). No incluye cuota sindical ni Ganancias.
  const descuentos =
    totalRemunerativo * COMERCIO_APORTES_REMUNERATIVO +
    totalNoRemunerativo * COMERCIO_APORTES_NO_REM;

  return {
    mesEtiqueta: mes.etiqueta,
    basico,
    noRemunerativo,
    asignacionExtraordinaria,
    antiguedadRem,
    antiguedadNoRem,
    presentismoRem,
    presentismoNoRem,
    antiguedadTotal: antiguedadRem + antiguedadNoRem,
    presentismoTotal: presentismoRem + presentismoNoRem,
    totalRemunerativo,
    totalNoRemunerativo,
    bruto,
    descuentos,
    neto: bruto - descuentos,
  };
}

// Aguinaldo (SAC) de Comercio = 50% de la MEJOR remuneración mensual del semestre
// (Ley 23.041 + art. 121 LCT). El acuerdo paritario 2026 de Comercio extiende las sumas
// no remunerativas al SAC: la "mejor remuneración" INCLUYE los $120.000 (verificado contra
// la cláusula del acuerdo; ver FAQ de /convenios/comercio). Por eso los aportes sobre el
// SAC siguen la naturaleza de cada componente: 17% sobre la mitad remunerativa y solo 3%
// (obra social) sobre la mitad no remunerativa — no un 17% plano sobre todo. `proporcion`
// (0..1 = días trabajados / días del semestre) ajusta el SAC de un semestre incompleto.
export type ResultadoAguinaldoComercio = {
  mejorBruto: number;
  sacRemunerativo: number;
  sacNoRemunerativo: number;
  sacBruto: number;
  descuentos: number;
  sacNeto: number;
  proporcion: number;
};

export function calcularAguinaldoComercio(
  mejorMes: ResultadoComercio,
  proporcion = 1,
): ResultadoAguinaldoComercio {
  const f = Number.isFinite(proporcion) ? Math.min(Math.max(proporcion, 0), 1) : 1;
  const sacRemunerativo = (mejorMes.totalRemunerativo / 2) * f;
  // La asignación extraordinaria por única vez (acuerdo 07/2026) NO integra la base del
  // SAC: es un pago extraordinario que la circular deja fuera de antigüedad y presentismo.
  const baseNoRemSac = mejorMes.totalNoRemunerativo - mejorMes.asignacionExtraordinaria;
  const sacNoRemunerativo = (baseNoRemSac / 2) * f;
  const sacBruto = sacRemunerativo + sacNoRemunerativo;
  const descuentos =
    sacRemunerativo * COMERCIO_APORTES_REMUNERATIVO +
    sacNoRemunerativo * COMERCIO_APORTES_NO_REM;
  return {
    mejorBruto: mejorMes.bruto,
    sacRemunerativo,
    sacNoRemunerativo,
    sacBruto,
    descuentos,
    sacNeto: sacBruto - descuentos,
    proporcion: f,
  };
}

// ---------------------------------------------------------------------------
// UOCRA (construcción)
// ---------------------------------------------------------------------------

export type ResultadoUocra = {
  mesEtiqueta: string;
  esMensual: boolean; // true solo para el sereno
  jornal: number | null; // jornal horario (null para el sereno)
  horasMes: number | null;
  basicoMensual: number;
  asistenciaPerfecta: number;
  snr: number;
  totalRemunerativo: number;
  bruto: number;
  descuentos: number;
  neto: number;
};

// ---------------------------------------------------------------------------
// Camioneros (CCT 40/89)
// ---------------------------------------------------------------------------

export type ResultadoCamioneros = {
  mesEtiqueta: string;
  basico: number;
  antiguedad: number;
  totalRemunerativo: number;
  descuentos: number;
  neto: number;
};

export function calcularCamioneros(params: {
  mesId: string;
  categoriaId: CategoriaCamionerosId | string;
  aniosAntiguedad: number;
}): ResultadoCamioneros | null {
  const mes = MESES_CAMIONEROS.find((m) => m.id === params.mesId);
  if (!mes) return null;

  const categoria = CATEGORIAS_CAMIONEROS.find((c) => c.id === params.categoriaId);
  if (!categoria) return null;

  const { aniosAntiguedad } = params;
  if (!Number.isFinite(aniosAntiguedad) || aniosAntiguedad < 0 || aniosAntiguedad > 60)
    return null;

  const basico =
    basicoCamioneros(mes.id, categoria.id)!;
  const antiguedad = basico * CAMIONEROS_ANTIGUEDAD_POR_ANIO * aniosAntiguedad;
  const totalRemunerativo = basico + antiguedad;
  const descuentos = totalRemunerativo * CAMIONEROS_APORTES_REMUNERATIVO;

  return {
    mesEtiqueta: mes.etiqueta,
    basico,
    antiguedad,
    totalRemunerativo,
    descuentos,
    neto: totalRemunerativo - descuentos,
  };
}

export function calcularUocra(params: {
  mesId: string;
  categoriaId: CategoriaUocraId | string;
  zonaId: ZonaUocraId | string;
  horasMes: number;
  conAsistencia: boolean;
  conAporteSindical: boolean;
}): ResultadoUocra | null {
  const mes = MESES_UOCRA.find((m) => m.id === params.mesId);
  if (!mes) return null;

  const categoria = CATEGORIAS_UOCRA.find((c) => c.id === params.categoriaId);
  if (!categoria) return null;

  const zona = ZONAS_UOCRA.find((z) => z.id === params.zonaId);
  if (!zona) return null;
  const zonaId: ZonaUocraId = zona.id;
  const snrZona = mes.snr[categoria.id][zonaId];

  let jornal: number | null = null;
  let horasMes: number | null = null;
  let basicoMensual: number;

  if (categoria.mensual) {
    // Sereno: sueldo mensual directo de la tabla oficial.
    basicoMensual = mes.serenoMensual[zonaId];
  } else {
    if (!Number.isFinite(params.horasMes) || params.horasMes <= 0 || params.horasMes > 300)
      return null;
    jornal = mes.jornales[categoria.id as Exclude<CategoriaUocraId, "sereno">][zonaId];
    horasMes = params.horasMes;
    basicoMensual = jornal * horasMes;
  }

  // Asistencia perfecta (art. 52): 20% del salario básico.
  const asistenciaPerfecta = params.conAsistencia
    ? basicoMensual * UOCRA_ASISTENCIA_PERFECTA
    : 0;

  const totalRemunerativo = basicoMensual + asistenciaPerfecta;
  const bruto = totalRemunerativo + snrZona;

  // Neto estimado: 17% de aportes sobre lo remunerativo (+2% de aporte solidario/cuota
  // sindical si corresponde); la SNR solo aporta a la obra social (3%).
  const tasaRem =
    UOCRA_APORTES_REMUNERATIVO + (params.conAporteSindical ? UOCRA_APORTE_SOLIDARIO : 0);
  const descuentos = totalRemunerativo * tasaRem + snrZona * UOCRA_APORTES_SNR;

  return {
    mesEtiqueta: mes.etiqueta,
    esMensual: categoria.mensual,
    jornal,
    horasMes,
    basicoMensual,
    asistenciaPerfecta,
    snr: snrZona,
    totalRemunerativo,
    bruto,
    descuentos,
    neto: bruto - descuentos,
  };
}
