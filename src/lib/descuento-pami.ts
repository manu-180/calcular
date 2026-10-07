// Motor del descuento de obra social sobre el haber jubilatorio. Funciones puras, sin fetch.
//
// LA MECÁNICA QUE SE EQUIVOCA TODO EL MUNDO: el aporte del inc. a) del art. 8 de la Ley 19.032 no
// es «3% o 6% según cuánto cobres». Es un tramo dentro del otro, como la escala de Ganancias:
//
//     aporte = 3% × min(haber, haberMínimo) + 6% × max(0, haber − haberMínimo)
//
// Leerlo como un salto —6% de TODO el haber al pasar el mínimo— infla el descuento justo en los
// haberes medios, que son la mayoría. Y el punto de corte no es fijo: es el haber mínimo
// garantizado, que ANSES redetermina cada mes. Por eso la alícuota EFECTIVA (aporte/haber) es un
// número distinto todos los meses aunque el haber no se mueva, y es el que la página muestra.
//
// No se copia ningún monto acá: el haber mínimo sale de PRESTACIONES_VIGENTES.

import {
  ALICUOTA_EXCEDENTE,
  ALICUOTA_HASTA_MINIMO,
  HABER_MINIMO_VIGENTE,
  REGIMENES,
  type RegimenPami,
} from "@/data/descuento-pami";

const r2 = (n: number) => Math.round(n * 100) / 100;

export type AvisoPami = { tono: "info" | "atencion" | "alerta"; texto: string };

export function regimenPorId(id: string): RegimenPami {
  return REGIMENES.find((r) => r.id === id) ?? REGIMENES[0];
}

/**
 * El aporte del art. 8 sobre una base. `haberMinimo` es el punto de corte del inciso a); en el
 * inciso b) las dos alícuotas son iguales, así que el corte no cambia el resultado.
 */
export function aporteSobre(base: number, regimenId: string, haberMinimo = HABER_MINIMO_VIGENTE) {
  const regimen = regimenPorId(regimenId);
  if (regimen.tramos === null || base <= 0) {
    return { tramoBajo: 0, tramoAlto: 0, baseBajo: 0, baseAlto: 0, total: 0 };
  }
  const baseBajo = Math.min(base, haberMinimo);
  const baseAlto = Math.max(0, base - haberMinimo);
  const tramoBajo = r2(baseBajo * regimen.tramos.hastaMinimo);
  const tramoAlto = r2(baseAlto * regimen.tramos.excedente);
  return { tramoBajo, tramoAlto, baseBajo, baseAlto, total: r2(tramoBajo + tramoAlto) };
}

export type EntradaPami = {
  /** Haber bruto mensual de la prestación. */
  haber?: number;
  regimenId?: string;
  /** Bono extraordinario del mes, si lo cobra: NO está sujeto al aporte y se suma al neto. */
  bono?: number;
  /** ¿Es un mes de aguinaldo? El «haber complementario» también aporta. */
  conAguinaldo?: boolean;
  /** Haber mínimo del mes; por defecto, el vigente. */
  haberMinimo?: number;
};

export type ResultadoPami = {
  regimen: RegimenPami;
  haber: number;
  haberMinimo: number;
  /** Parte del haber gravada al 3% (o al 6% en el inciso b). */
  baseBajo: number;
  /** Parte del haber que excede el haber mínimo. */
  baseAlto: number;
  tramoBajo: number;
  tramoAlto: number;
  /** Aporte mensual sobre el haber. */
  aporte: number;
  /** Aporte sobre el aguinaldo (medio haber), solo si el mes lo tiene. */
  aporteAguinaldo: number;
  /** Haber después del descuento, con el bono sumado si lo hay. */
  neto: number;
  /** aporte / haber, en % — el número que cambia mes a mes aunque el haber no se mueva. */
  alicuotaEfectiva: number;
  bono: number;
  avisos: AvisoPami[];
};

export function calcularDescuentoPami(e: EntradaPami = {}): ResultadoPami {
  const regimen = regimenPorId(e.regimenId ?? "dependencia");
  const haberMinimo = e.haberMinimo ?? HABER_MINIMO_VIGENTE;
  const cargado = Number.isFinite(e.haber) && (e.haber as number) > 0;
  const haber = cargado ? r2(e.haber as number) : haberMinimo;
  const bono = Number.isFinite(e.bono) && (e.bono as number) > 0 ? r2(e.bono as number) : 0;

  const mensual = aporteSobre(haber, regimen.id, haberMinimo);

  // El «haber complementario» del art. 8 es el aguinaldo previsional: medio haber, y se le aplica
  // la misma escala por separado, con el mismo punto de corte que define la norma.
  const aguinaldo = e.conAguinaldo ? aporteSobre(r2(haber / 2), regimen.id, haberMinimo) : null;

  const avisos: AvisoPami[] = [];

  if (!cargado) {
    avisos.push({
      tono: "info",
      texto:
        "No cargaste tu haber, así que la cuenta usa el haber mínimo garantizado del mes. Es el piso que todo beneficio tiene por el art. 125 de la Ley 24.241, y justo el punto donde el aporte pasa del 3% al 6%.",
    });
  }

  if (regimen.tramos === null) {
    avisos.push({
      tono: "atencion",
      texto:
        "Ninguna norma verificada fija una alícuota de obra social para las prestaciones no contributivas nacionales, y por eso acá no se inventa una. El Decreto 292/95 resolvió su salud por otra vía: los arts. 19 y 20 pusieron la cobertura médica a cargo del Estado, contratada por licitación pública. La única excepción que nombra la norma son los veteranos de la Ley 23.848, que siguen en el INSSJP.",
    });
  } else if (mensual.baseAlto > 0) {
    avisos.push({
      tono: "info",
      texto:
        regimen.id === "dependencia"
          ? "Tu haber supera el mínimo garantizado, así que tiene los dos tramos: el 3% corre sobre la parte de abajo y el 6% sólo sobre el excedente. No es 6% de todo: ese es el error más común al leer el artículo."
          : "El inciso b) no tiene escalón: el 6% corre sobre el haber entero, sin importar el haber mínimo.",
    });
  }

  if (regimen.tramos !== null) {
    avisos.push({
      tono: "info",
      texto:
        "El descuento no cambia si te pasás del PAMI a otra obra social. El Decreto 292/95 te da la libertad de elegir (art. 11), pero lo que ANSeS transfiere al agente elegido es una cápita tomada de los recursos del propio INSSJP (art. 13): lo que sale de tu haber lo sigue fijando el art. 8 de la Ley 19.032.",
    });
  }

  if (bono > 0) {
    avisos.push({
      tono: "info",
      texto:
        "El bono extraordinario no paga este aporte: el decreto que lo fija lo declara no remunerativo y no sujeto a descuentos. Por eso se suma entero al neto y no aparece en la base del cálculo.",
    });
  }

  if (e.conAguinaldo && regimen.tramos !== null) {
    avisos.push({
      tono: "atencion",
      texto:
        "Los dos incisos dicen «incluido el haber complementario»: el aguinaldo previsional también sufre el descuento, y se liquida aparte del haber del mes.",
    });
  }

  const aporteAguinaldo = aguinaldo?.total ?? 0;

  return {
    regimen,
    haber,
    haberMinimo,
    baseBajo: mensual.baseBajo,
    baseAlto: mensual.baseAlto,
    tramoBajo: mensual.tramoBajo,
    tramoAlto: mensual.tramoAlto,
    aporte: mensual.total,
    aporteAguinaldo,
    neto: r2(haber - mensual.total + bono),
    alicuotaEfectiva: haber > 0 ? r2((mensual.total / haber) * 100) : 0,
    bono,
    avisos,
  };
}

export type FilaEscala = {
  haber: number;
  /** Múltiplo del haber mínimo que representa esa fila, para nombrarla sin inventar casos. */
  vecesMinimo: number;
  aporte: number;
  alicuotaEfectiva: number;
};

/**
 * La tabla que prueba el punto: la alícuota efectiva del inciso a) sube de forma continua desde el
 * 3% y se acerca al 6% sin llegar nunca, porque el primer tramo no desaparece. Una escala que
 * saltara al 6% daría un número distinto en cada fila salvo la primera.
 */
export function escalaEfectiva(
  regimenId = "dependencia",
  haberMinimo = HABER_MINIMO_VIGENTE,
  multiplos = [1, 1.5, 2, 3, 4, 6],
): FilaEscala[] {
  return multiplos.map((v) => {
    const haber = r2(haberMinimo * v);
    const { total } = aporteSobre(haber, regimenId, haberMinimo);
    return {
      haber,
      vecesMinimo: v,
      aporte: total,
      alicuotaEfectiva: r2((total / haber) * 100),
    };
  });
}

/** La alícuota efectiva no puede salirse nunca del rango [3%, 6%) en el inciso a). */
export const RANGO_EFECTIVO = {
  piso: ALICUOTA_HASTA_MINIMO * 100,
  techo: ALICUOTA_EXCEDENTE * 100,
} as const;
