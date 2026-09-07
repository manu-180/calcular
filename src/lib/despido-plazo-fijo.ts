import { ANIOS_LIMITE_PREAVISO, DIVISOR_DIA } from "@/data/indemnizacion";
import {
  ANIOS_MAXIMO_PLAZO,
  ANIOS_MINIMO_ART250,
  MESES_SIN_DEBER_DE_PREAVISAR,
} from "@/data/despido-plazo-fijo";
import {
  antiguedadEntre,
  calcularIndemnizacion,
  nucleoArt245,
  type Antiguedad,
  type NucleoArt245,
  type ResultadoIndemnizacion,
} from "@/lib/indemnizacion";

// Despido antes del vencimiento del plazo (LCT art. 95, texto Ley 27.802): cuánto se cobra hoy
// cuando el empleador rompe un contrato a plazo fijo antes de su vencimiento.
//
// EL CAMBIO QUE ESTA PÁGINA PONE EN PESOS (regla de s78, aplicada al art. 95): hasta el 6/3/2026
// el artículo daba las indemnizaciones por extinción sobre la antigüedad REAL, más un rubro de
// "daños y perjuicios provenientes del derecho común" que fijaba el juez. Desde esa fecha el rubro
// de daños no existe, y en su lugar el art. 245 se calcula sobre la antigüedad que el trabajador
// "habría acumulado hasta la fecha de finalización del plazo originariamente pactado".
//
// POR QUÉ NO SE PUBLICA UN NÚMERO PARA EL SISTEMA VIEJO: los daños y perjuicios no tenían fórmula
// legal —"los que justifique haber sufrido quien los alegue o los que, a falta de demostración,
// fije el juez o tribunal prudencialmente"—. Inventar un importe sería fabricar un dato. Lo que sí
// es aritmética verificable, y es lo que se muestra, es el TAMAÑO DE LA VENTANA que se cerró: los
// días que faltaban hasta el vencimiento, expresados en sueldos. Ese número no es una
// indemnización: es la magnitud sobre la que el juez podía decidir y hoy ya no puede.
//
// EL ART. 245 NO SE REIMPLEMENTA (regla de s85): los dos escenarios salen de `nucleoArt245`, el
// mismo núcleo que usan /indemnizacion y /indemnizacion-por-fallecimiento. Dos páginas de
// calcular.ar no pueden publicar dos importes distintos para el mismo sueldo y la misma
// antigüedad.
//
// EL PERÍODO DE PRUEBA NO APLICA: el art. 92 bis lo reserva al contrato "por tiempo
// indeterminado". Por eso se llama a `calcularIndemnizacion` con `sinPeriodoPrueba: true`. Es la
// diferencia que hace que un plazo fijo roto en el mes 2 indemnice y un contrato común no.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoPlazoFijo = {
  /** Antigüedad efectivamente trabajada: inicio → despido. */
  antiguedadReal: Antiguedad;
  /** La antigüedad ficta del art. 95: inicio → fin del plazo originariamente pactado. */
  antiguedadFicta: Antiguedad;
  /** Días corridos que faltaban para el vencimiento (despido → fin del plazo). */
  diasQueFaltaban: number;
  /** Esos días expresados en sueldos, a razón de sueldo ÷ 30 (art. 233). NO es una indemnización. */
  ventanaQueSeCerro: number;
  /** Art. 245 con la antigüedad ficta: lo que ordena el texto vigente. */
  art245Hoy: NucleoArt245;
  /** Art. 245 con la antigüedad real: la base sobre la que se liquidaba antes de la reforma. */
  art245Antes: NucleoArt245;
  /** Diferencia entre los dos tramos de art. 245 (lo que suma la antigüedad ficta). */
  loQueSumaLaFicta: number;
  /** Preaviso omitido (art. 232), calculado con la antigüedad ficta como manda el art. 95. */
  preaviso: { meses: number; monto: number; sac: number };
  /** Integración del mes de despido (art. 233), sobre la fecha REAL del despido. */
  integracion: { dias: number; monto: number; sac: number } | null;
  /** SAC proporcional y vacaciones no gozadas, sobre el tiempo REALMENTE trabajado. */
  liquidacionFinal: {
    sac: ResultadoIndemnizacion["sacProporcional"];
    vacaciones: ResultadoIndemnizacion["vacaciones"];
    total: number;
  };
  /** Suma de los rubros indemnizatorios (art. 245 ficta + preaviso + integración, con sus SAC). */
  totalIndemnizatorio: number;
  /** Todo junto: indemnizaciones + liquidación final. */
  totalGeneral: number;
  /**
   * El otro final posible: dejar vencer el plazo con preaviso y el contrato íntegramente cumplido
   * (art. 95, 2º párrafo → art. 250 → art. 247 = la mitad del art. 245). `aplicaArt250` es false
   * —y el monto, cero— cuando el contrato dura menos de un año, porque el art. 250 lo exige.
   */
  siHubieraVencido: { monto: number; aplicaArt250: boolean };
  avisos: Aviso[];
};

function superaCincoAnios(ant: Antiguedad): boolean {
  const limite = ANIOS_LIMITE_PREAVISO * 12;
  return ant.totalMeses > limite || (ant.totalMeses === limite && ant.dias > 0);
}

const DIA_MS = 86_400_000;

function diasCorridos(desdeISO: string, hastaISO: string): number {
  return Math.round(
    (Date.parse(`${hastaISO}T00:00:00Z`) - Date.parse(`${desdeISO}T00:00:00Z`)) / DIA_MS,
  );
}

export function calcularDespidoPlazoFijo(params: {
  /** Inicio del contrato a plazo fijo. */
  inicioISO: string;
  /** Fecha de finalización pactada ORIGINARIAMENTE (la que manda el art. 95, no la renovada). */
  finPactadoISO: string;
  /** Fecha del despido anticipado. */
  despidoISO: string;
  mejorRemuneracion: number;
  topeCCT?: number;
}): ResultadoPlazoFijo | null {
  const { inicioISO, finPactadoISO, despidoISO, mejorRemuneracion, topeCCT } = params;

  if (!inicioISO || !finPactadoISO || !despidoISO) return null;
  if (!(mejorRemuneracion > 0)) return null;
  if (despidoISO <= inicioISO) return null;
  if (finPactadoISO <= inicioISO) return null;

  const antiguedadReal = antiguedadEntre(inicioISO, despidoISO);
  const antiguedadFicta = antiguedadEntre(inicioISO, finPactadoISO);
  const diasQueFaltaban = Math.max(0, diasCorridos(despidoISO, finPactadoISO));

  // Los dos tramos del art. 245, con el mismo núcleo compartido. `enPeriodoPrueba: false` porque
  // el art. 92 bis no alcanza al contrato a plazo fijo.
  const art245Hoy = nucleoArt245({
    ant: antiguedadFicta,
    mejorRemuneracion,
    enPeriodoPrueba: false,
    topeCCT,
  });
  const art245Antes = nucleoArt245({
    ant: antiguedadReal,
    mejorRemuneracion,
    enPeriodoPrueba: false,
    topeCCT,
  });

  // La liquidación final y la integración del mes salen de la MISMA función que /indemnizacion,
  // corrida sobre las fechas reales: lo que se devengó se devengó, la ficta es sólo "a ese solo
  // efecto" (el de las indemnizaciones por la extinción).
  const real = calcularIndemnizacion({
    ingresoISO: inicioISO,
    despidoISO,
    mejorRemuneracion,
    preavisoOtorgado: false,
    topeCCT,
    sinPeriodoPrueba: true,
  });
  if (!real) return null;

  // Art. 232 con la antigüedad ficta: el art. 95 manda calcular con ella "las indemnizaciones que
  // correspondan por la extinción del contrato", en plural, no sólo el art. 245.
  const mesesPreaviso = superaCincoAnios(antiguedadFicta) ? 2 : 1;
  const montoPreaviso = mejorRemuneracion * mesesPreaviso;
  const preaviso = { meses: mesesPreaviso, monto: montoPreaviso, sac: montoPreaviso / 12 };

  const integracion = real.integracion;

  const liquidacionFinal = {
    sac: real.sacProporcional,
    vacaciones: real.vacaciones,
    total: real.sacProporcional.monto + real.vacaciones.monto + real.vacaciones.sac,
  };

  const totalIndemnizatorio =
    art245Hoy.monto +
    preaviso.monto +
    preaviso.sac +
    (integracion ? integracion.monto + integracion.sac : 0);

  // Art. 95, 2º párrafo → art. 250 → art. 247: si el plazo se cumple entero y hubo preaviso, la
  // indemnización es la MITAD del art. 245 — y sólo si el contrato duró un año o más.
  const duracionPactadaEnMeses = antiguedadFicta.totalMeses;
  const llegaAlAnio = duracionPactadaEnMeses >= ANIOS_MINIMO_ART250 * 12;
  const siHubieraVencido = llegaAlAnio
    ? { monto: art245Hoy.monto / 2, aplicaArt250: true }
    : { monto: 0, aplicaArt250: false };

  const avisos: Aviso[] = [];

  if (despidoISO >= finPactadoISO) {
    avisos.push({
      tono: "bloqueante",
      texto:
        "La fecha del despido no es anterior al vencimiento del plazo, así que el primer párrafo del artículo 95 no se aplica: el contrato terminó por vencimiento, no por ruptura anticipada. Fijate abajo en el segundo párrafo del artículo, que remite al 250.",
    });
  }

  if (antiguedadFicta.anios > ANIOS_MAXIMO_PLAZO) {
    avisos.push({
      tono: "bloqueante",
      texto: `El plazo pactado supera los ${ANIOS_MAXIMO_PLAZO} años. El artículo 93 de la LCT dice que el contrato a plazo fijo "no podrá celebrarse por más de cinco (5) años": un plazo mayor no convierte al contrato en uno más largo, lo expone a ser tratado como de plazo indeterminado. El cálculo de abajo usa igual la fecha que cargaste, pero el encuadre hay que revisarlo con un profesional.`,
    });
  }

  avisos.push({
    tono: "ok",
    texto: `Desde el 6 de marzo de 2026 el artículo 245 se calcula sobre la antigüedad que habrías acumulado hasta el vencimiento del plazo: ${antiguedadFicta.anios} año(s) y ${antiguedadFicta.meses} mes(es), y no sobre los ${antiguedadReal.anios} año(s) y ${antiguedadReal.meses} mes(es) que trabajaste. Esa es la antigüedad ficta que ordena el texto nuevo del artículo 95.`,
  });

  if (art245Hoy.monto > art245Antes.monto) {
    avisos.push({
      tono: "ok",
      texto: `La antigüedad ficta suma ${art245Hoy.aniosComputables - art245Antes.aniosComputables} sueldo(s) más de indemnización por antigüedad que la antigüedad real. Es lo único que el texto nuevo agrega, y tiene techo: como el contrato no puede pactarse por más de ${ANIOS_MAXIMO_PLAZO} años (artículo 93), el artículo 245 nunca llega a más de ${ANIOS_MAXIMO_PLAZO} sueldos por esta vía.`,
    });
  } else {
    avisos.push({
      tono: "atencion",
      texto:
        "En tu caso la antigüedad ficta no cambia el resultado del artículo 245: la fracción que faltaba no alcanza para sumar otro año computable. El texto nuevo, entonces, no te agrega nada respecto de la antigüedad real — y el rubro de daños y perjuicios que sí agregaba el texto anterior ya no existe.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto: `Faltaban ${diasQueFaltaban} día(s) para el vencimiento del plazo. Con el texto anterior al 6 de marzo de 2026, esa ruptura anticipada abría además un reclamo de daños y perjuicios del derecho común, sin fórmula legal: lo fijaba el juez. Ese rubro desapareció del artículo. La calculadora muestra esos días en sueldos para que veas el tamaño de lo que se discutía, pero no es una indemnización ni un monto que hoy se pueda reclamar por el artículo 95.`,
  });

  if (antiguedadReal.totalMeses < 6) {
    avisos.push({
      tono: "ok",
      texto:
        "Trabajaste menos de seis meses y aun así te corresponde indemnización: en el contrato a plazo fijo NO hay período de prueba. El artículo 92 bis lo reserva, en su primera oración, al contrato «por tiempo indeterminado». Es el error más frecuente en las notas sobre el tema.",
    });
  }

  if (duracionPactadaEnMeses < 12) {
    avisos.push({
      tono: "atencion",
      texto: `Si en vez de romperlo antes lo hubieran dejado vencer con preaviso, no habrías cobrado indemnización: el artículo 250 exige que el contrato haya durado al menos ${ANIOS_MINIMO_ART250} año, y el tuyo se pactó por ${duracionPactadaEnMeses} mes(es).`,
    });
  }

  if (duracionPactadaEnMeses < MESES_SIN_DEBER_DE_PREAVISAR) {
    avisos.push({
      tono: "atencion",
      texto:
        "El contrato se pactó por menos de un mes: el artículo 94 exime de preavisar la expiración en ese caso. Eso no toca el despido anticipado, que sigue siendo el supuesto del artículo 95.",
    });
  }

  return {
    antiguedadReal,
    antiguedadFicta,
    diasQueFaltaban,
    ventanaQueSeCerro: (mejorRemuneracion / DIVISOR_DIA) * diasQueFaltaban,
    art245Hoy,
    art245Antes,
    loQueSumaLaFicta: art245Hoy.monto - art245Antes.monto,
    preaviso,
    integracion,
    liquidacionFinal,
    totalIndemnizatorio,
    totalGeneral: totalIndemnizatorio + liquidacionFinal.total,
    siHubieraVencido,
    avisos,
  };
}
