// Motor de la prestación por desempleo (Ley 24.013). Funciones puras, sin estado ni fetch.
//
// ⚠️ ENCUADRE — leer antes de tocar esto. Esto NO liquida un beneficio ni reemplaza a ANSES:
// aplica las reglas publicadas al dato que declara el usuario. El importe real puede diferir por
// la reconstrucción que ANSES hace de la historia laboral (los meses cotizados los toma de los
// aportes registrados, no de lo que uno recuerda), por descuentos, y por situaciones especiales.
//
// LAS CUATRO REGLAS QUE NADIE PUBLICA JUNTAS:
//   1. La base es el 75% del NETO de la mejor remuneración mensual normal y habitual de los 6
//      meses previos al cese — no del bruto, como repiten casi todas las notas.
//   2. La prestación se DEGRADA: cuotas 1 a 4 al 100%, 5 a 8 al 85%, 9 a 12 al 70% (art. 118).
//      Por eso el titular «cobrás $X» sólo vale para los primeros cuatro meses.
//   3. Piso y techo se aplican a CADA cuota mensual, no sólo a la primera: el texto dice «en
//      ningún caso la prestación mensual podrá ser inferior… ni superior…». En la práctica, a
//      quien cobra poco el escalonamiento no lo afecta: el piso lo sostiene.
//   4. Presentarla tarde cuesta plata: pasados los 90 días del cese, los días de exceso se
//      descuentan del total del período (art. 115).

import {
  REGLAS_DESEMPLEO as R,
  SMVM_SERIE,
  SMVM_ULTIMO,
  type MesSmvm,
} from "@/data/desempleo";

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Días que ANSES computa por cuota mensual. */
export const DIAS_POR_CUOTA = 30;

/**
 * El SMVM vigente a una fecha: el último mes de la escala cuyo período ya arrancó.
 * Si la fecha cae después del último mes con norma, devuelve ese último y marca `vencido`.
 */
export function smvmVigente(fecha: Date = new Date()): { mes: MesSmvm; vencido: boolean } {
  const periodo = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
  const aplicables = SMVM_SERIE.filter((m) => m.periodo <= periodo);
  if (aplicables.length === 0) return { mes: SMVM_SERIE[0], vencido: false };
  const mes = aplicables[aplicables.length - 1];
  return { mes, vencido: periodo > SMVM_ULTIMO.periodo };
}

/** Cuotas que corresponden por meses cotizados en los últimos 3 años (art. 117 Ley 24.013). */
export function cuotasPorCotizacion(mesesCotizados: number): number {
  const m = Math.floor(mesesCotizados);
  for (const tramo of R.duracion) {
    if (m >= tramo.desdeMeses && (tramo.hastaMeses === null || m <= tramo.hastaMeses)) {
      return tramo.cuotas;
    }
  }
  return 0;
}

/** Porcentaje del escalonamiento que le toca a una cuota ordinaria (art. 118 Ley 24.013). */
export function porcentajeDeCuota(numero: number): number {
  for (const t of R.escalonamiento) {
    if (numero >= t.desdeCuota && numero <= t.hastaCuota) return t.porcentaje;
  }
  // Fuera de la tabla ordinaria (sólo puede pasar con la extensión, que se calcula aparte).
  return R.escalonamiento[R.escalonamiento.length - 1].porcentaje;
}

export type Cuota = {
  numero: number;
  /** "ordinaria" = las que salen del art. 117; "extension45" = las 6 del Dec. 267/2006. */
  tramo: "ordinaria" | "extension45";
  /** Porcentaje aplicado sobre la prestación original. */
  porcentaje: number;
  /** Lo que daría el porcentaje antes de aplicar piso y techo. */
  sinTopes: number;
  /** Importe final de la cuota. */
  monto: number;
  topeAplicado: "piso" | "techo" | null;
  /** Días cubiertos por esta cuota. Menor a 30 si quedó recortada por presentación tardía. */
  dias: number;
};

export type Entrada = {
  /** Mejor remuneración mensual NETA, normal y habitual, de los 6 meses anteriores al cese. */
  mejorRemuneracionNeta: number;
  /** Meses con aportes en los 3 años anteriores al cese. */
  mesesCotizados: number;
  /** Edad del trabajador (para la extensión del Dec. 267/2006). */
  edad: number;
  /** Días transcurridos entre el cese y la presentación del trámite. */
  diasDesdeCese?: number;
  /** Fecha con la que se resuelve el SMVM vigente. Por defecto, hoy. */
  fecha?: Date;
};

export type Resultado = {
  elegible: boolean;
  /** Motivo por el que no corresponde, si no es elegible. */
  motivo: string | null;
  smvm: MesSmvm;
  smvmVencido: boolean;
  piso: number;
  techo: number;
  /** 75% del neto declarado, antes de topes. */
  base: number;
  /** La «prestación original»: la base ya acotada entre piso y techo. */
  prestacionOriginal: number;
  topeInicial: "piso" | "techo" | null;
  cuotasOrdinarias: number;
  cuotasExtension: number;
  cuotas: Cuota[];
  total: number;
  /** Días perdidos por presentar fuera del plazo de 90 días (art. 115). */
  diasDescontados: number;
  /** Lo que se habría cobrado presentando en plazo. Igual al total si no hubo demora. */
  totalSinDemora: number;
};

/** Acota un importe entre el piso y el techo mensuales y dice cuál se aplicó. */
function acotar(
  monto: number,
  piso: number,
  techo: number,
): { monto: number; tope: "piso" | "techo" | null } {
  if (monto < piso) return { monto: piso, tope: "piso" };
  if (monto > techo) return { monto: techo, tope: "techo" };
  return { monto: r2(monto), tope: null };
}

export function calcularDesempleo(e: Entrada): Resultado {
  const { mes: smvm, vencido: smvmVencido } = smvmVigente(e.fecha ?? new Date());
  const piso = r2(smvm.mensual * R.pisoSobreSmvm);
  const techo = r2(smvm.mensual * R.techoSobreSmvm);

  const neto = Number.isFinite(e.mejorRemuneracionNeta) && e.mejorRemuneracionNeta > 0
    ? e.mejorRemuneracionNeta
    : 0;
  const base = r2(neto * R.porcentajeBase);
  const inicial = acotar(base, piso, techo);
  const prestacionOriginal = inicial.monto;

  const cuotasOrdinarias = cuotasPorCotizacion(e.mesesCotizados);
  const vacio: Resultado = {
    elegible: false,
    motivo: null,
    smvm,
    smvmVencido,
    piso,
    techo,
    base,
    prestacionOriginal,
    topeInicial: inicial.tope,
    cuotasOrdinarias: 0,
    cuotasExtension: 0,
    cuotas: [],
    total: 0,
    diasDescontados: 0,
    totalSinDemora: 0,
  };

  if (neto <= 0) {
    return { ...vacio, motivo: "Falta la mejor remuneración neta de los últimos 6 meses." };
  }
  if (cuotasOrdinarias === 0) {
    return {
      ...vacio,
      motivo: `Con menos de ${R.mesesMinimosCotizados} meses de aportes en los últimos ${R.aniosVentanaCotizacion} años no se accede a la prestación (art. 113, Ley 24.013).`,
    };
  }

  const cuotasExtension = e.edad >= R.extension45.edadMinima ? R.extension45.cuotasExtra : 0;

  // 1) Se arma el período completo, cuota por cuota, como si se hubiera presentado en plazo.
  const completas: Cuota[] = [];
  for (let n = 1; n <= cuotasOrdinarias; n++) {
    const pct = porcentajeDeCuota(n);
    const sinTopes = r2(prestacionOriginal * pct);
    const { monto, tope } = acotar(sinTopes, piso, techo);
    completas.push({
      numero: n,
      tramo: "ordinaria",
      porcentaje: pct,
      sinTopes,
      monto,
      topeAplicado: tope,
      dias: DIAS_POR_CUOTA,
    });
  }
  for (let i = 1; i <= cuotasExtension; i++) {
    const pct = R.extension45.porcentaje;
    const sinTopes = r2(prestacionOriginal * pct);
    const { monto, tope } = acotar(sinTopes, piso, techo);
    completas.push({
      numero: cuotasOrdinarias + i,
      tramo: "extension45",
      porcentaje: pct,
      sinTopes,
      monto,
      topeAplicado: tope,
      dias: DIAS_POR_CUOTA,
    });
  }

  const totalSinDemora = r2(completas.reduce((acc, c) => acc + c.monto, 0));

  // 2) Art. 115: los días que excedan los 90 se descuentan del total del período. Se recortan
  //    desde el final, que es lo que pasa en la práctica (se cobra desde el alta y el período
  //    termina antes).
  const diasDescontados = Math.max(0, Math.floor(e.diasDesdeCese ?? 0) - R.diasParaSolicitar);
  let restanPorDescontar = diasDescontados;
  const cuotas: Cuota[] = [];
  for (const c of [...completas].reverse()) {
    if (restanPorDescontar <= 0) {
      cuotas.unshift(c);
      continue;
    }
    if (restanPorDescontar >= c.dias) {
      restanPorDescontar -= c.dias;
      continue; // la cuota se pierde entera
    }
    const dias = c.dias - restanPorDescontar;
    restanPorDescontar = 0;
    cuotas.unshift({ ...c, dias, monto: r2((c.monto * dias) / DIAS_POR_CUOTA) });
  }

  return {
    elegible: cuotas.length > 0,
    motivo:
      cuotas.length > 0
        ? null
        : `La demora de ${diasDescontados} días desde el cese consume el período completo de la prestación (art. 115, Ley 24.013).`,
    smvm,
    smvmVencido,
    piso,
    techo,
    base,
    prestacionOriginal,
    topeInicial: inicial.tope,
    cuotasOrdinarias,
    cuotasExtension,
    cuotas,
    total: r2(cuotas.reduce((acc, c) => acc + c.monto, 0)),
    diasDescontados,
    totalSinDemora,
  };
}

/** "agosto de 2026" a partir de un período AAAA-MM. */
export function etiquetaMes(periodo: string): string {
  const [a, m] = periodo.split("-").map(Number);
  const nombres = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${nombres[m - 1]} de ${a}`;
}
