import { CONSERVACION_EMPLEO_MESES, PLAZOS_ART_208 } from "@/data/enfermedad";
import { EXTINCION, SUPUESTOS, SUSPENSION_MESES_SIN_APORTE } from "@/data/obra-social-continuidad";

export type SupuestoId = (typeof SUPUESTOS)[number]["id"];

export type EntradaContinuidad = {
  supuesto: SupuestoId;
  /** Distracto, primer día de la suspensión o de la licencia, o inicio de la enfermedad. */
  hechoISO: string;
  /** Ingreso: define si se cumple el piso de más de tres meses continuados y la antigüedad del 208. */
  ingresoISO: string;
  cargasDeFamilia: boolean;
};

export type ResultadoContinuidad = {
  /** Última fecha con cobertura gratuita, o null cuando la ley no fija un plazo cerrado. */
  hastaISO: string | null;
  /** Meses de cobertura sin obligación de aportar. 0 = ninguno. */
  mesesSinAporte: number;
  /** Si después del plazo gratuito la ley habilita seguir pagando. */
  hayOpcionPaga: boolean;
  /** Cuando el supuesto exige cumplir el piso del inc. a) y NO se cumple. */
  bloqueadoPorAntiguedad: boolean;
  mesesDesempeno: number;
  /** Sólo para enfermedad: los meses de licencia paga del art. 208 que corren antes del art. 211. */
  mesesLicenciaPaga: number | null;
  veredicto: string;
  detalle: string;
};

/** Fecha ISO + N meses, con el día clampeado al largo del mes destino (31/1 + 1 mes = 28/2). */
export function sumarMeses(iso: string, meses: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const totalMes = m - 1 + meses;
  const anio = y + Math.floor(totalMes / 12);
  const mes = ((totalMes % 12) + 12) % 12;
  const ultimoDia = new Date(Date.UTC(anio, mes + 1, 0)).getUTCDate();
  return `${anio}-${String(mes + 1).padStart(2, "0")}-${String(Math.min(d, ultimoDia)).padStart(2, "0")}`;
}

/** Meses enteros entre dos fechas ISO. Devuelve 0 si el orden está invertido. */
export function mesesEntre(desdeISO: string, hastaISO: string): number {
  const [y1, m1, d1] = desdeISO.split("-").map(Number);
  const [y2, m2, d2] = hastaISO.split("-").map(Number);
  const meses = (y2 - y1) * 12 + (m2 - m1) - (d2 < d1 ? 1 : 0);
  return Math.max(0, meses);
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;

export function calcularContinuidad(e: EntradaContinuidad): ResultadoContinuidad | null {
  if (!ISO.test(e.hechoISO) || !ISO.test(e.ingresoISO)) return null;
  if (e.ingresoISO > e.hechoISO) return null;

  const mesesDesempeno = mesesEntre(e.ingresoISO, e.hechoISO);
  // El inciso a) exige "MÁS de tres meses": tres justos no alcanzan, y tres meses y un día sí. Por
  // eso el piso se mide comparando FECHAS y no meses enteros — con `mesesDesempeno > 3` habría que
  // llegar a cuatro meses redondos, que es un mes entero de cobertura negada a quien la tiene.
  const cumpleElPiso = e.hechoISO > sumarMeses(e.ingresoISO, EXTINCION.mesesDesempenoMinimo);

  const anios = Math.floor(mesesDesempeno / 12);
  const mesesLicenciaPaga =
    anios < PLAZOS_ART_208.corteAntiguedadAnios
      ? e.cargasDeFamilia
        ? PLAZOS_ART_208.conCargas.hasta5
        : PLAZOS_ART_208.sinCargas.hasta5
      : e.cargasDeFamilia
        ? PLAZOS_ART_208.conCargas.mas5
        : PLAZOS_ART_208.sinCargas.mas5;

  switch (e.supuesto) {
    case "extincion":
    case "fallecimiento": {
      const esMuerte = e.supuesto === "fallecimiento";
      if (!cumpleElPiso) {
        return {
          hastaISO: null,
          mesesSinAporte: 0,
          hayOpcionPaga: esMuerte,
          bloqueadoPorAntiguedad: true,
          mesesDesempeno,
          mesesLicenciaPaga: null,
          veredicto: "No corren los tres meses",
          detalle: `El inciso a) los reserva a quien se desempeñó «en forma continuada durante más de tres (3) meses», y acá el desempeño fue de ${mesesDesempeno} ${mesesDesempeno === 1 ? "mes" : "meses"}. Es el requisito de entrada que casi nunca se menciona.`,
        };
      }
      return {
        hastaISO: sumarMeses(e.hechoISO, EXTINCION.mesesCobertura),
        mesesSinAporte: EXTINCION.mesesCobertura,
        hayOpcionPaga: esMuerte,
        bloqueadoPorAntiguedad: false,
        mesesDesempeno,
        mesesLicenciaPaga: null,
        veredicto: `${EXTINCION.mesesCobertura} meses de cobertura, sin pagar nada`,
        detalle: esMuerte
          ? "El inciso h) le da al grupo familiar primario «el plazo y las condiciones del inciso a)»: los mismos tres meses contados desde el fallecimiento, y vencidos puede optar por seguir pagando los aportes y contribuciones que le hubieran correspondido al titular."
          : "Los tres meses se cuentan desde el distracto, no desde el pago de la liquidación final ni desde el fin del mes. Alcanza al titular y a su grupo familiar.",
      };
    }

    case "enfermedad": {
      // El inciso b) no fija plazo propio: remite al de conservación del empleo (art. 211 LCT), que
      // arranca cuando se agotó la licencia paga del art. 208. Por eso la respuesta va de 15 meses
      // a 2 años según antigüedad y cargas de familia, y nunca es "un año" a secas.
      const finLicenciaPaga = sumarMeses(e.hechoISO, mesesLicenciaPaga);
      return {
        hastaISO: sumarMeses(finLicenciaPaga, CONSERVACION_EMPLEO_MESES),
        mesesSinAporte: mesesLicenciaPaga + CONSERVACION_EMPLEO_MESES,
        hayOpcionPaga: false,
        bloqueadoPorAntiguedad: false,
        mesesDesempeno,
        mesesLicenciaPaga,
        veredicto: `${mesesLicenciaPaga + CONSERVACION_EMPLEO_MESES} meses en total, sin pagar nada`,
        detalle: `Primero corren los ${mesesLicenciaPaga} meses de licencia paga del art. 208 (con sueldo y con obra social, porque el contrato sigue vivo), y recién ahí empieza el año de conservación del empleo del art. 211, que es el plazo al que remite el inciso b). Hasta el ${finLicenciaPaga} cobrás; después seguís con obra social pero sin remuneración.`,
      };
    }

    case "suspension":
      return {
        hastaISO: sumarMeses(e.hechoISO, SUSPENSION_MESES_SIN_APORTE),
        mesesSinAporte: SUSPENSION_MESES_SIN_APORTE,
        hayOpcionPaga: true,
        bloqueadoPorAntiguedad: false,
        mesesDesempeno,
        mesesLicenciaPaga: null,
        veredicto: `${SUSPENSION_MESES_SIN_APORTE} meses sin pagar, y después con opción`,
        detalle:
          "El inciso c) da tres meses gratis. Si la suspensión se estira, la cobertura sigue sólo si el trabajador cubre su aporte y también la contribución que pagaba el empleador.",
      };

    case "licencia":
    case "temporada":
    case "excedencia":
      return {
        hastaISO: null,
        mesesSinAporte: 0,
        hayOpcionPaga: true,
        bloqueadoPorAntiguedad: false,
        mesesDesempeno,
        mesesLicenciaPaga: null,
        veredicto: "Sigue mientras dure, pero se paga desde el día uno",
        detalle:
          "Acá la ley no regala ningún mes: la cobertura continúa sólo si el trabajador opta por mantenerla y se hace cargo del aporte a su cargo y de la contribución del empleador. Es una opción, no un derecho automático.",
      };

    default:
      return null;
  }
}
