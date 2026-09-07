// Motor de la deducción de casas particulares en Ganancias. Funciones puras.
//
// LO QUE ESTA CALCULADORA RESUELVE Y NINGUNA OTRA: la SERP repite el tope ("podés deducir hasta la
// ganancia no imponible") y se queda ahí. Pero al empleador le importan otras tres cosas:
//   1. **Cuánto le vuelve de verdad.** Una deducción no devuelve lo deducido: devuelve lo deducido
//      × la alícuota marginal del contribuyente. Acá se calcula corriendo el impuesto DOS veces —
//      con y sin la deducción — con el mismo motor de /ganancias, en vez de estimar un porcentaje.
//   2. **Si le sirve para algo.** Quien no llega a pagar Ganancias no recupera un peso: la
//      deducción existe, pero el ahorro es cero. Nadie lo dice y es la mitad de los casos.
//   3. **Qué parte del pago mensual a ARCA entra.** El art. 16 inc. b) de la Ley 26.063 remite a
//      las contribuciones del art. 3º del régimen especial (SIPA + salud). La cuota de ART se
//      ingresa en el mismo importe pero nace de otra norma: se muestra separada, no sumada.

import { filaDe, rangoPorHoras } from "./aportes-casas-particulares";
import { estimarGananciasAnual, type EstimacionGanancias } from "./ganancias";
import { TOPE_DEDUCCION_ANUAL } from "@/data/deduccion-domestica";
import type { CondicionTrabajador } from "@/data/aportes-casas-particulares";

export type EntradaDeduccion = {
  /** Sueldo mensual de bolsillo que el empleador le paga al trabajador. */
  sueldoMensual: number;
  /** Meses del año fiscal en que hubo relación laboral (1 a 12). */
  mesesTrabajados: number;
  /** Si en el año se pagó aguinaldo (SAC): en el régimen es 50% de la mejor remuneración por semestre. */
  incluirAguinaldo: boolean;
  /** Horas semanales que le trabaja a ESTE empleador: definen la fila de la tabla de ARCA. */
  horasSemanales: number;
  condicion: CondicionTrabajador;
  /** Sueldo bruto mensual del EMPLEADOR: define su alícuota marginal, o sea cuánto le vuelve. */
  brutoMensualEmpleador: number;
  conyuge: boolean;
  hijos: number;
};

export type AvisoDeduccion = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoDeduccion = {
  /** Sueldos + SAC pagados en el año (art. 16 inc. a). */
  remuneracionAnual: number;
  /** Contribuciones del art. 3º del régimen (SIPA + salud) ingresadas en el año (art. 16 inc. b). */
  contribucionesAnual: number;
  /** Cuota de ART del año: se paga, pero NO está en el artículo al que remite la deducción. */
  artAnual: number;
  /** Lo computable antes del tope = remuneración + contribuciones. */
  computable: number;
  tope: number;
  /** Lo que efectivamente se puede deducir = min(computable, tope). */
  deduccionAplicada: number;
  /** Lo que pasa del tope y se pierde. */
  excedente: number;
  /** Impuesto anual del empleador sin computar la deducción. */
  impuestoSin: EstimacionGanancias;
  /** El mismo, computando la deducción. */
  impuestoCon: EstimacionGanancias;
  /** Plata que el empleador deja de pagar de Ganancias en el año. */
  ahorroAnual: number;
  ahorroMensual: number;
  /** Ahorro / deducción: la alícuota que efectivamente le devuelve el beneficio (0 si no paga). */
  alicuotaEfectiva: number;
  avisos: AvisoDeduccion[];
};

export function calcularDeduccionDomestica(e: EntradaDeduccion): ResultadoDeduccion {
  const meses = Math.min(12, Math.max(0, Math.round(e.mesesTrabajados)));
  const sueldo = Math.max(0, e.sueldoMensual);

  // SAC: 50% de la mejor remuneración por semestre → un sueldo entero por año completo,
  // proporcional a los meses efectivamente trabajados.
  const sac = e.incluirAguinaldo ? sueldo * (meses / 12) : 0;
  const remuneracionAnual = sueldo * meses + sac;

  const fila = filaDe(e.condicion, rangoPorHoras(e.horasSemanales));
  const contribucionesMes = (fila.obraSocial ?? 0) + (fila.sipa ?? 0);
  const contribucionesAnual = contribucionesMes * meses;
  const artAnual = fila.art * meses;

  const computable = remuneracionAnual + contribucionesAnual;
  const tope = TOPE_DEDUCCION_ANUAL;
  const deduccionAplicada = Math.min(computable, tope);
  const excedente = Math.max(0, computable - tope);

  const base = {
    brutoMensual: Math.max(0, e.brutoMensualEmpleador),
    conyuge: e.conyuge,
    hijos: Math.max(0, Math.floor(e.hijos)),
  };
  const impuestoSin = estimarGananciasAnual(base);
  const impuestoCon = estimarGananciasAnual({ ...base, otrasDeduccionesAnual: deduccionAplicada });

  const ahorroAnual = Math.max(0, impuestoSin.impuestoAnual - impuestoCon.impuestoAnual);
  const alicuotaEfectiva = deduccionAplicada > 0 ? ahorroAnual / deduccionAplicada : 0;

  const avisos: AvisoDeduccion[] = [];

  if (!impuestoSin.pagaGanancias) {
    avisos.push({
      tono: "bloqueante",
      texto:
        "Con ese sueldo no llegás a pagar Ganancias, así que la deducción no te devuelve nada: es un descuento sobre un impuesto que no estás pagando. No es un reintegro ni un crédito que se acumule para otro año.",
    });
  } else if (impuestoCon.impuestoAnual === 0) {
    avisos.push({
      tono: "ok",
      texto:
        "Con esta deducción dejás de pagar Ganancias por completo en el año. Ojo: el ahorro que ves es todo el impuesto que te quedaba, no el monto deducido.",
    });
  }

  if (excedente > 0) {
    avisos.push({
      tono: "atencion",
      texto:
        "Lo que pagaste supera el tope anual: el excedente no se deduce, no se traslada al año siguiente y no lo puede computar otra persona del hogar por el mismo trabajador.",
    });
  }

  if (artAnual > 0) {
    avisos.push({
      tono: "atencion",
      texto:
        "La cuota de ART del año no está incluida en el cómputo, aunque la pagues en el mismo importe mensual a ARCA: la deducción remite a las contribuciones del artículo 3º del régimen especial (SIPA y salud), y la ART nace de otra norma. Si tu contador la computa igual, la diferencia es la que ves más abajo.",
    });
  }

  if (meses > 0 && sueldo > 0) {
    avisos.push({
      tono: "ok",
      texto:
        "Para computarla hay que tener la relación registrada y conservar los comprobantes de pago; se informa en el F. 572 web (SIRADIG), en «Deducciones y desgravaciones».",
    });
  }

  return {
    remuneracionAnual,
    contribucionesAnual,
    artAnual,
    computable,
    tope,
    deduccionAplicada,
    excedente,
    impuestoSin,
    impuestoCon,
    ahorroAnual,
    ahorroMensual: ahorroAnual / 12,
    alicuotaEfectiva,
    avisos,
  };
}
