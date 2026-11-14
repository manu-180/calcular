// El método acumulado de la RG 4003 para un jubilado o pensionado: lo que su caja le retiene
// mes a mes, con sus doce haberes reales.
//
// POR QUÉ NO ALCANZA `calcularGananciasJubilados` (el motor de /ganancias-jubilados): ese es un
// modelo ANUAL con un haber fijo, y la propia página lo dice («la retención mes a mes la hace
// ANSES, o tu caja, con el método acumulado»). Dos cosas lo separan de un recibo real:
//   · el haber cambia todos los meses (la movilidad es mensual) y cada caja paga lo suyo;
//   · la deducción específica no es un número del año repartido en doce: es ocho veces la suma
//     de los haberes mínimos de los meses YA TRANSCURRIDOS (así lo acumula un agente de
//     retención oficial, ver JUBILADOS_TEXTOS.issysMensual).
// Por eso la retención de enero no es la de diciembre, y por eso una estimación anual nunca
// coincide con el recibo mes por mes.
//
// LAS DOS DIFERENCIAS CON LA CALCULADORA GRATIS, dichas de frente:
//   1. Ahí el aporte de obra social del año es el del haber multiplicado por trece. Acá cada
//      liquidación paga el suyo con el haber mínimo de SU mes, y el aguinaldo es medio haber que
//      pasa por la escala del art. 8 de la Ley 19.032 por separado, que es lo que dice la norma
//      («incluido el haber complementario») y lo que hace /descuento-pami. Con un haber plano los
//      dos efectos casi se cancelan y la diferencia del año son pesos; con los haberes reales,
//      que suben todos los meses, no.
//   2. El aguinaldo entra acá en junio y en diciembre, como se cobra. La RG 4003 le manda al
//      agente de retención sumar cada mes una doceava parte del aguinaldo (Anexo II, apartado C),
//      así que el reparto mes por mes de tu caja puede correr pesos de un mes a otro. El total del
//      año no se mueve: en diciembre la ganancia acumulada tiene el aguinaldo entero de las dos
//      formas. Por eso el número que la planilla afirma es el del año, y la comparación contra los
//      recibos se lee sobre el total.
//
//
// Nada de números acá: la escala y las deducciones salen de data/ganancias, el aporte de
// lib/descuento-pami y la deducción específica de lib/ganancias-jubilados.

import { DEDUCCIONES } from "@/data/ganancias";
import { MULTIPLICADOR_ESPECIFICA } from "@/data/ganancias-jubilados";
import { aporteSobre } from "@/lib/descuento-pami";
import { impuestoSegunEscala } from "@/lib/ganancias";
import { DEDUCCIONES_A_Y_C, type MotivoSinEspecifica } from "@/lib/ganancias-jubilados";

export const MESES_DEL_ANIO = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
] as const;

/** Meses en los que se paga el aguinaldo previsional, 1 a 12. */
export const MESES_CON_AGUINALDO = [6, 12] as const;

const r2 = (n: number) => Math.round(n * 100) / 100;

export type EntradaPlanillaJubilados = {
  /** Los doce haberes brutos del año, de enero a diciembre, sin el bono. */
  haberes: number[];
  /** El aguinaldo cobrado en cada mes (cero en los diez meses que no lo tienen). */
  aguinaldos: number[];
  /** El haber mínimo garantizado de cada mes: la unidad de la deducción específica. */
  haberesMinimos: number[];
  regimenPamiId?: string;
  conyuge?: boolean;
  hijos?: number;
  /** Otros ingresos gravados por encima de la ganancia no imponible anual. */
  otrosIngresos?: boolean;
  /** Obligado a Bienes Personales por algo más que la vivienda única. */
  bienesPersonales?: boolean;
  /** Lo informado en el SiRADIG en el año (prepaga, médicos, donaciones, seguros). */
  otrasDeduccionesAnual?: number;
};

export type FilaMesJubilado = {
  mes: number;
  nombreMes: string;
  haber: number;
  aguinaldo: number;
  haberMinimo: number;
  /** Aporte del art. 8 de la Ley 19.032 sobre el haber y, aparte, sobre el aguinaldo. */
  aporteObraSocial: number;
  brutoAcumulado: number;
  aportesAcumulados: number;
  deduccionAcumulada: number;
  /** Ganancia del período: bruto menos aportes y deducciones acumuladas. */
  gniProporcional: number;
  /** La misma ganancia llevada a año completo, que es sobre la que corre la escala. */
  gniExtrapolada: number;
  impuestoAnualProyectado: number;
  retencionAcumulada: number;
  retencionMes: number;
};

export type ResultadoPlanillaJubilados = {
  filas: FilaMesJubilado[];
  /** Ocho veces la suma de los doce haberes mínimos cargados. */
  especificaAnual: number;
  aplicaEspecifica: boolean;
  motivoSinEspecifica: MotivoSinEspecifica;
  cargasFamilia: number;
  /** No imponible más deducción especial más la doceava parte, con las cargas: el camino alterno. */
  alternativaAnual: number;
  brutoAnual: number;
  aportesAnual: number;
  gniAnual: number;
  impuestoAnual: number;
};

/** El aguinaldo previsional de cada mes: la mitad del mejor haber del semestre, en junio y en
 *  diciembre. Es la sugerencia que la planilla deja escrita; si el recibo dice otra cosa, manda
 *  el recibo. */
export function aguinaldosPorSemestre(haberes: number[]): number[] {
  const mejor = (desde: number, hasta: number) => Math.max(0, ...haberes.slice(desde, hasta).map((h) => (h > 0 ? h : 0)));
  return Array.from({ length: 12 }, (_, i) => {
    if (i === 5) return r2(mejor(0, 6) / 2);
    if (i === 11) return r2(mejor(6, 12) / 2);
    return 0;
  });
}

export function cargasDeFamilia(conyuge = false, hijos = 0): number {
  return r2((conyuge ? DEDUCCIONES.conyuge : 0) + Math.max(0, Math.floor(hijos)) * DEDUCCIONES.hijo);
}

export function calcularPlanillaJubilados(e: EntradaPlanillaJubilados): ResultadoPlanillaJubilados {
  const regimen = e.regimenPamiId ?? "dependencia";
  const haberes = Array.from({ length: 12 }, (_, i) => Math.max(0, e.haberes[i] ?? 0));
  const aguinaldos = Array.from({ length: 12 }, (_, i) => Math.max(0, e.aguinaldos[i] ?? 0));
  const minimos = Array.from({ length: 12 }, (_, i) => Math.max(0, e.haberesMinimos[i] ?? 0));
  const otrasAnual = Math.max(0, e.otrasDeduccionesAnual ?? 0);

  const cargasFamilia = cargasDeFamilia(e.conyuge, e.hijos);
  const especificaAnual = r2(MULTIPLICADOR_ESPECIFICA * minimos.reduce((s, m) => s + m, 0));
  const alternativaBase = DEDUCCIONES_A_Y_C + cargasFamilia;
  const alternativaAnual = r2(alternativaBase + alternativaBase / 12);

  // El mismo orden de la ley que usa el motor anual: los dos casos de pérdida primero y recién
  // después la comparación de montos.
  let motivoSinEspecifica: MotivoSinEspecifica = null;
  if (e.otrosIngresos) motivoSinEspecifica = "otros-ingresos";
  else if (e.bienesPersonales) motivoSinEspecifica = "bienes-personales";
  else if (especificaAnual <= DEDUCCIONES_A_Y_C) motivoSinEspecifica = "no-supera";
  const aplicaEspecifica = motivoSinEspecifica === null;

  const filas: FilaMesJubilado[] = [];
  let brutoAcumulado = 0;
  let aportesAcumulados = 0;
  let minimosAcumulados = 0;
  let retencionPrevia = 0;

  for (let mes = 1; mes <= 12; mes++) {
    const haber = haberes[mes - 1];
    const aguinaldo = aguinaldos[mes - 1];
    const haberMinimo = minimos[mes - 1];

    // Dos liquidaciones distintas, cada una con su propia escala del art. 8 y el mismo punto de
    // corte del mes. El bono no entra: el decreto que lo fija lo declara no remunerativo.
    const aporteHaber = aporteSobre(haber, regimen, haberMinimo).total;
    const aporteAguinaldo = aguinaldo > 0 ? aporteSobre(aguinaldo, regimen, haberMinimo).total : 0;
    const aporteObraSocial = r2(aporteHaber + aporteAguinaldo);

    brutoAcumulado = r2(brutoAcumulado + haber + aguinaldo);
    aportesAcumulados = r2(aportesAcumulados + aporteObraSocial);
    // Sin redondear: la planilla lo hace con un SUM de la columna, y un centavo de más acá se
    // multiplica por ocho en la deducción.
    minimosAcumulados += haberMinimo;

    const deduccionAcumulada = aplicaEspecifica
      ? r2(MULTIPLICADOR_ESPECIFICA * minimosAcumulados + (cargasFamilia * mes) / 12)
      : r2((alternativaAnual * mes) / 12);

    const gniProporcional = r2(brutoAcumulado - aportesAcumulados - deduccionAcumulada - (otrasAnual * mes) / 12);
    const gniExtrapolada = gniProporcional > 0 ? r2((gniProporcional * 12) / mes) : 0;
    const impuestoAnualProyectado = r2(impuestoSegunEscala(gniExtrapolada));
    const retencionAcumulada = r2((impuestoAnualProyectado * mes) / 12);
    const retencionMes = r2(Math.max(0, retencionAcumulada - retencionPrevia));

    filas.push({
      mes,
      nombreMes: MESES_DEL_ANIO[mes - 1],
      haber,
      aguinaldo,
      haberMinimo,
      aporteObraSocial,
      brutoAcumulado,
      aportesAcumulados,
      deduccionAcumulada,
      gniProporcional,
      gniExtrapolada,
      impuestoAnualProyectado,
      retencionAcumulada,
      retencionMes,
    });

    retencionPrevia = retencionAcumulada;
  }

  const diciembre = filas[11];
  return {
    filas,
    especificaAnual,
    aplicaEspecifica,
    motivoSinEspecifica,
    cargasFamilia,
    alternativaAnual,
    brutoAnual: diciembre.brutoAcumulado,
    aportesAnual: diciembre.aportesAcumulados,
    gniAnual: diciembre.gniExtrapolada,
    impuestoAnual: diciembre.impuestoAnualProyectado,
  };
}
