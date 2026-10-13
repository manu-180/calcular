// Motor de Ganancias para jubilados y pensionados. Funciones puras, sin fetch.
//
// Modelo ANUAL, igual que estimarGananciasAnual de la calculadora de sueldos: 13 haberes (12 + el
// aguinaldo, que tributa), menos el aporte a la obra social de cada uno, menos las deducciones del
// art. 30. Los meses del año que ANSES todavía no fijó se completan con el último haber mínimo
// publicado: eso SUBESTIMA la deducción (el haber mínimo sube todos los meses), así que el impuesto
// que muestra la página es, si algo, un poco más alto que el real. Nunca al revés.

import { DEDUCCIONES } from "@/data/ganancias";
import {
  ANIO_JUBILADOS,
  MULTIPLICADOR_ESPECIFICA,
  haberesMinimosDelAnio,
} from "@/data/ganancias-jubilados";
import { haberMinimoVigente } from "@/data/descuento-pami";
import { aporteSobre } from "@/lib/descuento-pami";
import { impuestoSegunEscala } from "@/lib/ganancias";

const r2 = (n: number) => Math.round(n * 100) / 100;

export type MesHaberMinimo = { periodo: string; haberMinimo: number; publicado: boolean };

export function haberesMinimosProyectados(anio = ANIO_JUBILADOS): MesHaberMinimo[] {
  const publicados = haberesMinimosDelAnio(anio);
  const ultimo = publicados.at(-1)?.haberMinimo ?? haberMinimoVigente();
  return Array.from({ length: 12 }, (_, i) => {
    const periodo = `${anio}-${String(i + 1).padStart(2, "0")}`;
    const p = publicados.find((m) => m.periodo === periodo);
    return p
      ? { periodo, haberMinimo: p.haberMinimo, publicado: true }
      : { periodo, haberMinimo: ultimo, publicado: false };
  });
}

export function deduccionEspecificaAnual(anio = ANIO_JUBILADOS) {
  const suma = haberesMinimosProyectados(anio).reduce((s, m) => s + m.haberMinimo, 0);
  return r2(MULTIPLICADOR_ESPECIFICA * suma);
}

/** Incisos a) + c) apartado 2: lo que la específica tiene que superar para reemplazarlo. */
export const DEDUCCIONES_A_Y_C = r2(DEDUCCIONES.mni + DEDUCCIONES.deduccionEspecialDependencia);

export type EntradaJubilados = {
  haberBruto: number;
  regimenPamiId?: string;
  conyuge?: boolean;
  hijos?: number;
  /** Ingresos de otra naturaleza (alquileres gravados, honorarios, monotributo…) por encima de la ganancia no imponible anual. */
  otrosIngresos?: boolean;
  /** Obligado a pagar Bienes Personales por algo más que la vivienda única. */
  bienesPersonales?: boolean;
};

export type MotivoSinEspecifica = "otros-ingresos" | "bienes-personales" | "no-supera" | null;

export type ResultadoJubilados = {
  brutoAnual: number;
  obraSocialAnual: number;
  especificaAnual: number;
  aplicaEspecifica: boolean;
  motivoSinEspecifica: MotivoSinEspecifica;
  deduccionBase: number;
  doceava: number;
  cargasFamilia: number;
  deduccionesTotales: number;
  gananciaNetaImponible: number;
  impuestoAnual: number;
  retencionMensual: number;
  pagaGanancias: boolean;
  /** Haber bruto mensual desde el que empieza a pagar, con las mismas cargas y condiciones. */
  umbralHaber: number;
  umbralEnHaberesMinimos: number;
};

function deduccionesPara(e: EntradaJubilados) {
  const cargasFamilia = r2(
    (e.conyuge ? DEDUCCIONES.conyuge : 0) + Math.max(0, Math.floor(e.hijos ?? 0)) * DEDUCCIONES.hijo,
  );
  const especificaAnual = deduccionEspecificaAnual();
  let motivo: MotivoSinEspecifica = null;
  if (e.otrosIngresos) motivo = "otros-ingresos";
  else if (e.bienesPersonales) motivo = "bienes-personales";
  else if (especificaAnual <= DEDUCCIONES_A_Y_C) motivo = "no-supera";

  if (motivo === null) {
    return {
      especificaAnual,
      aplicaEspecifica: true,
      motivo,
      deduccionBase: especificaAnual,
      doceava: 0,
      cargasFamilia,
      total: r2(especificaAnual + cargasFamilia),
    };
  }
  const doceava = r2((DEDUCCIONES_A_Y_C + cargasFamilia) / 12);
  return {
    especificaAnual,
    aplicaEspecifica: false,
    motivo,
    deduccionBase: DEDUCCIONES_A_Y_C,
    doceava,
    cargasFamilia,
    total: r2(DEDUCCIONES_A_Y_C + cargasFamilia + doceava),
  };
}

function netoAnual(haber: number, regimenPamiId: string) {
  const brutoAnual = r2(haber * 13);
  const obraSocialAnual = r2(aporteSobre(haber, regimenPamiId).total * 13);
  return { brutoAnual, obraSocialAnual, neto: brutoAnual - obraSocialAnual };
}

export function calcularGananciasJubilados(e: EntradaJubilados): ResultadoJubilados {
  const regimen = e.regimenPamiId ?? "dependencia";
  const haber = Math.max(0, e.haberBruto || 0);
  const d = deduccionesPara(e);
  const { brutoAnual, obraSocialAnual, neto } = netoAnual(haber, regimen);
  const gni = r2(Math.max(0, neto - d.total));
  const impuestoAnual = r2(impuestoSegunEscala(gni));

  let lo = 0;
  let hi = 1e9;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (netoAnual(mid, regimen).neto > d.total) hi = mid;
    else lo = mid;
  }
  const umbralHaber = r2(hi);

  return {
    brutoAnual,
    obraSocialAnual,
    especificaAnual: d.especificaAnual,
    aplicaEspecifica: d.aplicaEspecifica,
    motivoSinEspecifica: d.motivo,
    deduccionBase: d.deduccionBase,
    doceava: d.doceava,
    cargasFamilia: d.cargasFamilia,
    deduccionesTotales: d.total,
    gananciaNetaImponible: gni,
    impuestoAnual,
    retencionMensual: r2(impuestoAnual / 12),
    pagaGanancias: impuestoAnual > 0,
    umbralHaber,
    umbralEnHaberesMinimos: umbralHaber / haberMinimoVigente(),
  };
}
