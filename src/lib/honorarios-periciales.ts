import {
  COBERTURA_CONTINUA_DESDE,
  PISO_ANTERIOR_UMA,
  SERIE_UMA,
  SUPUESTOS,
  UMA_VIGENTE,
  VIGENCIA_REFORMA_ISO,
  type ClaveSupuesto,
  type FilaUma,
  type Supuesto,
} from "@/data/uma";

// Honorarios periciales: el piso legal en pesos, y cuánto vale hoy una regulación vieja.
//
// LAS DOS CUENTAS, Y POR QUÉ SON DOS COSAS DISTINTAS:
//
//   1. **El piso.** Los arts. 60, 61 y 61 bis de la Ley 27.423 fijan un mínimo EN UMA. Pasarlo a
//      pesos es multiplicar por el valor vigente. Lo único que hay que decidir es cuál valor: el de
//      la fecha en que se regula. La reforma de la Ley 27.802 (6/3/2026) bajó ese piso de 6 a 2 UMA,
//      así que una regulación anterior a esa fecha tiene un piso distinto, y la función lo elige por
//      fecha en vez de aplicar el número de hoy hacia atrás.
//
//   2. **El pago.** El art. 51 dice que el pago sólo es cancelatorio si se abona el equivalente a
//      las UMA de la resolución «según su valor vigente al momento del pago». Entonces un honorario
//      regulado en UMA no se paga por su importe nominal: se recalcula. Esa es la conversión que
//      hace `actualizarRegulacion`, y el número que le importa a quien tiene una regulación firme.
//
// LO QUE NO SE CALCULA, A PROPÓSITO:
//   · **El honorario que va a fijar el juez.** El piso es un mínimo de orden público (art. 16 in
//     fine: «Los jueces no podrán apartarse de los mínimos establecidos en la presente ley»), pero
//     el monto concreto sale de la apreciación judicial. Estimarlo sería inventar un número.
//   · **Un valor de UMA para una fecha que la Corte publicó escaneada.** Fuera del tramo continuo
//     verificado, la función devuelve `null` y la página manda a la fuente. Nunca se interpola.
//   · **Intereses, IVA, aportes ni el impuesto a las ganancias sobre el honorario.** No están en la
//     Ley 27.423 y dependen de la situación fiscal de cada perito.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

/** El valor de la UMA vigente en una fecha, o null si esa fecha cae fuera del tramo verificado. */
export function umaVigenteEn(fechaIso: string): FilaUma | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaIso)) return null;
  if (fechaIso < COBERTURA_CONTINUA_DESDE) return null;
  // La serie viene de la más nueva a la más vieja: la primera cuyo "desde" no supere la fecha.
  return SERIE_UMA.find((f) => f.desde <= fechaIso) ?? null;
}

export function supuestoPorClave(clave: ClaveSupuesto): Supuesto {
  const s = SUPUESTOS.find((x) => x.clave === clave);
  if (!s) throw new Error(`supuesto desconocido: ${clave}`);
  return s;
}

export type ResultadoPiso = {
  supuesto: Supuesto;
  /** Fecha de la regulación que se usó para elegir piso y valor de UMA. */
  fechaIso: string;
  /** La UMA aplicable a esa fecha. */
  uma: FilaUma;
  /** Cuántas UMA manda la ley para ese supuesto EN esa fecha. */
  umaDelPiso: number;
  /** El piso en pesos. */
  pisoPesos: number;
  /** Cuántas pericias se computaron (art. 61 bis: el mínimo es por cada pericia). */
  pericias: number;
  /** Piso total = pisoPesos × pericias. */
  totalPesos: number;
  /** Si la fecha es posterior a la reforma: cuánto habría sido con el piso viejo de 6 UMA. */
  comparacionReforma: {
    umaAnterior: number;
    pisoAnteriorPesos: number;
    diferencia: number;
    caidaPorcentual: number;
  } | null;
  avisos: Aviso[];
};

/**
 * El piso legal en pesos para un supuesto y una fecha de regulación.
 * `pericias` sólo multiplica en los supuestos con pericia presentada (art. 61 bis: «Por cada
 * pericia, se fijará un monto mínimo de dos (2) UMA»).
 */
export function calcularPiso(
  clave: ClaveSupuesto,
  fechaIso: string,
  pericias = 1,
): ResultadoPiso | null {
  const uma = umaVigenteEn(fechaIso);
  if (!uma) return null;

  const supuesto = supuestoPorClave(clave);
  const posterior = fechaIso >= VIGENCIA_REFORMA_ISO;
  const avisos: Aviso[] = [];

  // Antes del 6/3/2026 regía la redacción anterior: 6 UMA en los arts. 60 y 61. El art. 61 bis no
  // existía, así que el supuesto "sin pericia" no tiene piso escrito para fechas anteriores.
  if (!posterior && supuesto.clave === "sinPericia") {
    avisos.push({
      tono: "bloqueante",
      texto:
        "El cuarto de UMA para el proceso que termina sin pericia lo incorporó el art. 61 bis, que rige desde el 6 de marzo de 2026. Para una regulación anterior no hay piso escrito para este supuesto.",
    });
    return {
      supuesto,
      fechaIso,
      uma,
      umaDelPiso: 0,
      pisoPesos: 0,
      pericias: 1,
      totalPesos: 0,
      comparacionReforma: null,
      avisos,
    };
  }

  const umaDelPiso = posterior ? supuesto.uma : (supuesto.umaAnterior ?? supuesto.uma);
  const cantidad = supuesto.clave === "sinPericia" ? 1 : Math.max(1, Math.floor(pericias));
  const pisoPesos = umaDelPiso * uma.valor;
  const totalPesos = pisoPesos * cantidad;

  if (!posterior)
    avisos.push({
      tono: "atencion",
      texto: `Esa fecha es anterior al 6 de marzo de 2026, así que rige la redacción vieja: el piso era de ${PISO_ANTERIOR_UMA} UMA, no de ${supuesto.uma}.`,
    });

  if (supuesto.clave === "sinPericia")
    avisos.push({
      tono: "atencion",
      texto:
        "Este piso exige haber aceptado el cargo. Sin aceptación del cargo, el art. 61 bis no lo reconoce.",
    });

  if (cantidad > 1)
    avisos.push({
      tono: "ok",
      texto: `El art. 61 bis fija el mínimo «por cada pericia»: ${cantidad} pericias × ${umaDelPiso} UMA.`,
    });

  avisos.push({
    tono: "atencion",
    texto:
      "Es un mínimo, no una estimación del honorario. El monto lo fija el juez según las pautas del art. 16; lo que la ley prohíbe es regular por debajo de este piso.",
  });

  const comparacionReforma =
    posterior && supuesto.umaAnterior !== null
      ? {
          umaAnterior: supuesto.umaAnterior,
          pisoAnteriorPesos: supuesto.umaAnterior * uma.valor * cantidad,
          diferencia: supuesto.umaAnterior * uma.valor * cantidad - totalPesos,
          caidaPorcentual: 1 - supuesto.uma / supuesto.umaAnterior,
        }
      : null;

  return { supuesto, fechaIso, uma, umaDelPiso, pisoPesos, pericias: cantidad, totalPesos, comparacionReforma, avisos };
}

export type ResultadoActualizacion = {
  umaReguladas: number;
  /** La UMA vigente cuando se dictó la regulación. */
  umaEntonces: FilaUma;
  /** La UMA vigente hoy (o al momento del pago). */
  umaHoy: FilaUma;
  montoEntonces: number;
  montoHoy: number;
  diferencia: number;
  variacion: number;
  avisos: Aviso[];
};

/**
 * Art. 51: cuántos pesos hay que pagar HOY por una regulación expresada en UMA.
 * `fechaRegulacionIso` sólo se usa para mostrar cuánto valían esas UMA entonces; el número que
 * cancela es el de hoy.
 */
export function actualizarRegulacion(
  umaReguladas: number,
  fechaRegulacionIso: string,
): ResultadoActualizacion | null {
  const umaEntonces = umaVigenteEn(fechaRegulacionIso);
  if (!umaEntonces || !(umaReguladas > 0)) return null;

  const umaHoy = UMA_VIGENTE;
  const montoEntonces = umaReguladas * umaEntonces.valor;
  const montoHoy = umaReguladas * umaHoy.valor;
  const avisos: Aviso[] = [
    {
      tono: "ok",
      texto:
        "El art. 51 exige que la resolución diga el monto en pesos y la cantidad de UMA que representa. Si tu regulación no tiene las UMA, es la cantidad la que hay que reclamar: el artículo la impone bajo pena de nulidad.",
    },
    {
      tono: "atencion",
      texto:
        "El valor que cancela es el vigente al momento del pago, no el de hoy. Si el pago se hace después de la próxima resolución de la Corte, el número sube.",
    },
  ];

  return {
    umaReguladas,
    umaEntonces,
    umaHoy,
    montoEntonces,
    montoHoy,
    diferencia: montoHoy - montoEntonces,
    variacion: umaEntonces.valor === 0 ? 0 : umaHoy.valor / umaEntonces.valor - 1,
    avisos,
  };
}

/** El tramo de la serie que la página muestra como tabla: el verificado mes a mes. */
export function serieContinua(): FilaUma[] {
  return SERIE_UMA.filter((f) => f.desde >= COBERTURA_CONTINUA_DESDE);
}
