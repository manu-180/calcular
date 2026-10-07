// Todo número del informe sale de acá, y acá todo sale de `calcularIndemnizacion`: el mismo motor y
// la misma traducción de entradas que usa la calculadora web. Si el informe y la web dieran
// distinto, la persona llega al SECLO o al abogado con dos cifras para el mismo despido: eso lo
// vigila scripts/check_informe_indemnizacion.ts.
//
// Lo único que el informe suma y la calculadora no muestra son los días trabajados del mes del
// despido. Salen de las mismas piezas que usan /renuncia y /periodo-de-prueba
// (`diasDelMesTrabajados` × sueldo ÷ 30), y el total de la calculadora queda a la vista como
// subtotal para que las dos cifras se puedan reconciliar en una línea.

import { calcularIndemnizacion, tratamientoGanancias, type ResultadoIndemnizacion, type TratamientoGanancias } from "@/lib/indemnizacion";
import { diasDelMesTrabajados } from "@/lib/liquidacion";
import { regimenDe, sumarDiasHabiles } from "@/lib/certificado-trabajo";
import { aISO, parseFechaISO, sumarDias } from "@/lib/licencias";
import { DIVISOR_DIA, MESES_PERIODO_PRUEBA } from "@/data/indemnizacion";
import { PLAZO_ENTREGA_DIAS_HABILES } from "@/data/certificado-trabajo";
import { REGLAS_DESEMPLEO } from "@/data/desempleo";
import { entradaDelMotor, type Datos } from "@/lib/prefill/indemnizacion";

export const SLUG_INFORME = "informe-indemnizacion";
export const RUTA_LANDING_INFORME = "/informes/indemnizacion";
/** Sólo para pintar el precio donde no se puede leer el catálogo (componentes de cliente).
 *  El cobro y la validación del pago leen SIEMPRE el precio de src/lib/mp.ts. */
export const PRECIO_INFORME_REFERENCIA = 7900;

/** Art. 255 bis → art. 128: plazo de pago de la liquidación final, en días hábiles. */
export const DIAS_HABILES_PAGO = 4;

export type ClaveRubro =
  | "antiguedad"
  | "preaviso"
  | "sac-preaviso"
  | "integracion"
  | "sac-integracion"
  | "dias-mes"
  | "sac-proporcional"
  | "vacaciones"
  | "sac-vacaciones";

export type Ganancias = "exento" | "no-exento" | "sin-exencion";

export type Rubro = {
  clave: ClaveRubro;
  nombre: string;
  norma: string;
  /** La cuenta, escrita para que se pueda rehacer con una calculadora de bolsillo. */
  cuenta: string;
  monto: number;
  grupo: "indemnizacion" | "liquidacion";
  ganancias: Ganancias;
};

export type Plazo = { clave: string; titulo: string; fecha: string | null; detalle: string; norma: string };

export type Informe = {
  r: ResultadoIndemnizacion;
  g: TratamientoGanancias;
  rubros: Rubro[];
  diasMes: { dias: number; sueldoMes: number; monto: number };
  /** Lo que muestra la calculadora como «Total estimado» (sin los días del mes). */
  totalCalculadora: number;
  totalIndemnizacion: number;
  totalLiquidacion: number;
  total: number;
  plazos: Plazo[];
};

const ars0 = (n: number) =>
  n.toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0, maximumFractionDigits: 0 });
const dec1 = (n: number) => n.toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function textoAntiguedad(a: { anios: number; meses: number; dias: number }): string {
  const partes: string[] = [];
  if (a.anios > 0) partes.push(`${a.anios} ${a.anios === 1 ? "año" : "años"}`);
  if (a.meses > 0) partes.push(`${a.meses} ${a.meses === 1 ? "mes" : "meses"}`);
  if (a.dias > 0 && a.anios === 0) partes.push(`${a.dias} ${a.dias === 1 ? "día" : "días"}`);
  return partes.length ? partes.join(" y ") : "menos de un día";
}

function sumarCorridos(iso: string, dias: number): string | null {
  const f = parseFechaISO(iso);
  return f ? aISO(sumarDias(f, dias)) : null;
}

export function plazosDe(despidoISO: string, enPeriodoPrueba: boolean): Plazo[] {
  const pago = sumarDiasHabiles(despidoISO, DIAS_HABILES_PAGO);
  const certificado = regimenDe(despidoISO) === "vigente" ? sumarDiasHabiles(despidoISO, PLAZO_ENTREGA_DIAS_HABILES) : null;
  const plazos: Plazo[] = [
    {
      clave: "pago",
      titulo: "Pago de la liquidación",
      fecha: pago?.vence ?? null,
      detalle: `La empresa tiene ${DIAS_HABILES_PAGO} días hábiles desde el despido para pagar todo lo que corresponde, cualquiera sea la causa.`,
      norma: "arts. 255 bis y 128 LCT",
    },
    {
      clave: "certificado",
      titulo: "Certificado de trabajo",
      fecha: certificado?.vence ?? null,
      detalle: certificado
        ? `${PLAZO_ENTREGA_DIAS_HABILES} días hábiles para entregar el certificado con tus datos laborales y la constancia de aportes. También se cumple si queda disponible en el sistema de ARCA.`
        : "Para despidos anteriores al 6 de marzo de 2026 rige el texto anterior del art. 80: consultá el plazo con un abogado.",
      norma: "art. 80 LCT (texto Ley 27.802)",
    },
  ];
  if (!enPeriodoPrueba) {
    plazos.push({
      clave: "desempleo",
      titulo: "Prestación por desempleo",
      fecha: sumarCorridos(despidoISO, REGLAS_DESEMPLEO.diasParaSolicitar),
      detalle: `Si tenés los aportes que pide la ley, se tramita en ANSES dentro de los ${REGLAS_DESEMPLEO.diasParaSolicitar} días corridos del despido. Pasado ese plazo, se descuentan los días de demora.`,
      norma: "arts. 113 y 115 Ley 24.013",
    });
  }
  plazos.push({
    clave: "prescripcion",
    titulo: "Plazo para reclamar",
    fecha: null,
    detalle: "Las acciones por créditos laborales prescriben a los dos años. Si algo no te cierra, no lo dejes para el final: el reclamo previo y la conciliación llevan tiempo.",
    norma: "art. 256 LCT",
  });
  return plazos;
}

export function armarInforme(d: Datos, opciones: { sueldoMes?: number } = {}): Informe | null {
  const r = calcularIndemnizacion(entradaDelMotor(d));
  if (!r) return null;
  const g = tratamientoGanancias(r);
  const base = ars0(r.base);

  const dias = diasDelMesTrabajados(d.ingreso, d.despido);
  const sueldoMes = opciones.sueldoMes && opciones.sueldoMes > 0 ? opciones.sueldoMes : d.sueldo;
  const diasMes = { dias, sueldoMes, monto: (sueldoMes / DIVISOR_DIA) * dias };

  const rubros: Rubro[] = [];
  if (!r.enPeriodoPrueba) {
    rubros.push({
      clave: "antiguedad",
      nombre: "Indemnización por antigüedad",
      norma: "art. 245 LCT",
      cuenta: `${r.aniosComputables} ${r.aniosComputables === 1 ? "año" : "años"} × ${ars0(r.baseAplicada)}${r.topeAplicado ? " (base con tope)" : ""}`,
      monto: r.indemnizacionAntiguedad,
      grupo: "indemnizacion",
      ganancias: "exento",
    });
  }
  if (r.preaviso) {
    rubros.push(
      {
        clave: "preaviso",
        nombre: "Preaviso no otorgado",
        norma: "arts. 231 y 232 LCT",
        cuenta: `${r.preaviso.meses} × ${base}`,
        monto: r.preaviso.monto,
        grupo: "indemnizacion",
        ganancias: "no-exento",
      },
      {
        clave: "sac-preaviso",
        nombre: "Aguinaldo sobre el preaviso",
        norma: "arts. 121 y 232 LCT",
        cuenta: `${ars0(r.preaviso.monto)} ÷ 12`,
        monto: r.preaviso.sac,
        grupo: "indemnizacion",
        ganancias: "no-exento",
      },
    );
  }
  if (r.integracion) {
    rubros.push(
      {
        clave: "integracion",
        nombre: "Integración del mes de despido",
        norma: "art. 233 LCT",
        cuenta: `${base} ÷ ${DIVISOR_DIA} × ${r.integracion.dias} días`,
        monto: r.integracion.monto,
        grupo: "indemnizacion",
        ganancias: "sin-exencion",
      },
      {
        clave: "sac-integracion",
        nombre: "Aguinaldo sobre la integración",
        norma: "arts. 121 y 233 LCT",
        cuenta: `${ars0(r.integracion.monto)} ÷ 12`,
        monto: r.integracion.sac,
        grupo: "indemnizacion",
        ganancias: "sin-exencion",
      },
    );
  }
  rubros.push(
    {
      clave: "dias-mes",
      nombre: "Días trabajados del mes",
      norma: "art. 255 bis LCT",
      cuenta: `${ars0(sueldoMes)} ÷ ${DIVISOR_DIA} × ${dias} ${dias === 1 ? "día" : "días"}`,
      monto: diasMes.monto,
      grupo: "liquidacion",
      ganancias: "sin-exencion",
    },
    {
      clave: "sac-proporcional",
      nombre: "Aguinaldo proporcional",
      norma: "art. 123 LCT",
      cuenta: `${base} ÷ 2 × ${r.sacProporcional.dias}/${r.sacProporcional.totalDiasSemestre} días del semestre`,
      monto: r.sacProporcional.monto,
      grupo: "liquidacion",
      ganancias: "sin-exencion",
    },
    {
      clave: "vacaciones",
      nombre: "Vacaciones no gozadas",
      norma: "arts. 155 y 156 LCT",
      cuenta: `${dec1(r.vacaciones.dias)} días × ${base} ÷ 25`,
      monto: r.vacaciones.monto,
      grupo: "liquidacion",
      ganancias: "sin-exencion",
    },
    {
      clave: "sac-vacaciones",
      nombre: "Aguinaldo sobre vacaciones",
      norma: "arts. 121 y 156 LCT",
      cuenta: `${ars0(r.vacaciones.monto)} ÷ 12`,
      monto: r.vacaciones.sac,
      grupo: "liquidacion",
      ganancias: "sin-exencion",
    },
  );

  const totalIndemnizacion = r.totalIndemnizatorio;
  const totalLiquidacion = r.totalLiquidacionFinal + diasMes.monto;

  return {
    r,
    g,
    rubros,
    diasMes,
    totalCalculadora: r.totalGeneral,
    totalIndemnizacion,
    totalLiquidacion,
    total: r.totalGeneral + diasMes.monto,
    plazos: plazosDe(d.despido, r.enPeriodoPrueba),
  };
}

export type FilaComparacion = { clave: ClaveRubro; nombre: string; ley: number; ofrecido: number | null; diferencia: number | null };

export type Comparacion = {
  filas: FilaComparacion[];
  /** Suma de lo ofrecido en los rubros cargados, o el total ofrecido si sólo se cargó eso. */
  ofrecidoTotal: number;
  /** Lo que surge de la ley en los MISMOS rubros que se cargaron (o el total, si se cargó el total). */
  leyComparable: number;
  diferencia: number;
  porRubro: boolean;
};

/** Lo que ofrecen contra lo que surge de la ley. null = no se cargó nada para comparar. */
export function comparar(
  inf: Informe,
  ofrecido: Partial<Record<ClaveRubro, number | null>>,
  totalOfrecido: number | null,
): Comparacion | null {
  const filas: FilaComparacion[] = inf.rubros.map((r) => {
    const o = ofrecido[r.clave];
    const v = typeof o === "number" && Number.isFinite(o) && o >= 0 ? o : null;
    return { clave: r.clave, nombre: r.nombre, ley: r.monto, ofrecido: v, diferencia: v === null ? null : r.monto - v };
  });
  const cargadas = filas.filter((f) => f.ofrecido !== null);
  if (cargadas.length > 0) {
    const ofrecidoTotal = cargadas.reduce((a, f) => a + (f.ofrecido ?? 0), 0);
    const leyComparable = cargadas.reduce((a, f) => a + f.ley, 0);
    return { filas, ofrecidoTotal, leyComparable, diferencia: leyComparable - ofrecidoTotal, porRubro: true };
  }
  if (totalOfrecido !== null && Number.isFinite(totalOfrecido) && totalOfrecido >= 0) {
    return { filas, ofrecidoTotal: totalOfrecido, leyComparable: inf.total, diferencia: inf.total - totalOfrecido, porRubro: false };
  }
  return null;
}

/** Caso de ejemplo de la landing: un despido común, a mitad de mes y sin preaviso. */
export const CASO_EJEMPLO: Datos = {
  sueldo: 1_450_000,
  ingreso: "2019-03-04",
  despido: "2026-09-12",
  preaviso: false,
  tope: null,
};

export { MESES_PERIODO_PRUEBA };
