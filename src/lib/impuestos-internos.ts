import {
  RUBROS,
  VIGENCIA_ELIMINACION,
  type Rubro,
} from "@/data/impuestos-internos";

// Impuestos internos eliminados por el art. 195 de la Ley 27.802: ¿cuánto del importe era impuesto?
//
// LA PREGUNTA QUE CONTESTA, y por qué la respuesta no es «la alícuota»:
//
// El art. 4° de la Ley 24.674 manda liquidar sobre el precio neto de venta que resulta de la
// factura y prohíbe descontar de esa base el propio impuesto: «En ningún caso se podrá descontar
// valor alguno en concepto del impuesto de esta ley». O sea que la alícuota se aplica sobre un
// importe que YA contiene al impuesto. De ahí salen dos números distintos, y confundirlos es el
// error que repite toda nota que titula «se elimina el impuesto del 20%»:
//
//   · **Impuesto contenido en el importe facturado** = importe × t.
//     Es lo que el responsable ingresa por esa operación.
//   · **Sobrecosto sobre el precio limpio** = t / (1 − t). Es la TASA EFECTIVA: cuánto encarecía el
//     impuesto un precio que no lo tuviera. Un 20% nominal es 25%; un 35% es 53,85%; un 5% es
//     5,26%.
//
// El precio sin el impuesto es importe × (1 − t), y la diferencia entre los dos es exactamente el
// impuesto contenido. La aritmética cierra sola y no depende de ningún supuesto.
//
// LO QUE NO SE CALCULA, A PROPÓSITO:
//   · **Cuánto bajó el precio de venta.** La ley elimina el impuesto; trasladar ese ahorro al
//     precio es una decisión comercial del vendedor, no un efecto legal. Acá se calcula cuánto del
//     importe era impuesto, que es un hecho, y no cuánto va a bajar la góndola, que es un
//     pronóstico.
//   · **Si el bien superaba el monto exento del Capítulo IX.** Los importes del art. 39 se
//     actualizan trimestralmente por el IPIM y el valor vigente no está en la ley. La calculadora
//     avisa cuándo el rubro tiene monto exento y manda a verificarlo, en vez de aplicar un número
//     de 2019 como si fuera el de hoy.
//   · **El arrastre de etapas de los objetos suntuarios.** El 20% del art. 35 se aplicaba «en cada
//     una de las etapas de su comercialización», pero el art. 37 permite computar como pago a
//     cuenta el impuesto ya pagado sobre los productos gravados que se usen. El resultado neto
//     depende de la cadena concreta y de esa compensación: se explica en la página con los dos
//     artículos a la vista, y no se simula una cascada que la ley no manda.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoImpuestosInternos = {
  rubro: Rubro;
  /** El importe que cargó el usuario (factura, precio o prima). */
  importe: number;
  /** Alícuota nominal, en tanto por uno. */
  alicuota: number;
  /** Impuesto contenido en ese importe: importe × alícuota. */
  impuestoContenido: number;
  /** Lo que quedaba del importe una vez sacado el impuesto. */
  importeSinImpuesto: number;
  /** Tasa efectiva sobre el precio limpio: t / (1 − t). En tanto por uno. */
  tasaEfectiva: number;
  /** Qué porcentaje del importe era impuesto. En tanto por uno (= la alícuota). */
  participacionEnElImporte: number;
  avisos: Aviso[];
};

const pct = (t: number) =>
  `${(t * 100).toLocaleString("es-AR", { maximumFractionDigits: 2 })}%`;

const pesos = (n: number) =>
  `$${Math.round(n).toLocaleString("es-AR")}`;

export function calcularImpuestoInterno(params: {
  rubroId: string;
  /** Importe facturado, precio neto de venta o prima, según el rubro. */
  importe: number;
}): ResultadoImpuestosInternos | null {
  const { rubroId, importe } = params;

  if (!(importe > 0)) return null;

  const rubro = RUBROS.find((r) => r.id === rubroId);
  if (!rubro) return null;

  const t = rubro.alicuota;
  const impuestoContenido = importe * t;
  const importeSinImpuesto = importe - impuestoContenido;
  // t / (1 − t): cuánto encarecía el impuesto sobre un precio que no lo tuviera. Con t < 1 siempre,
  // que es el caso de todas las alícuotas de esta ley (la más alta es 35%).
  const tasaEfectiva = t / (1 - t);

  const avisos: Aviso[] = [];

  avisos.push({
    tono: "ok",
    texto: `Este impuesto dejó de aplicarse el ${VIGENCIA_ELIMINACION}. El art. 195 de la Ley 27.802 no lo eliminó desde la vigencia de la ley (6 de marzo de 2026) sino «a partir del primer día del mes inmediato siguiente»: durante todo marzo se siguió pagando.`,
  });

  avisos.push({
    tono: "atencion",
    texto: `La alícuota nominal era ${rubro.alicuotaTexto}, pero el sobrecosto sobre un precio limpio era ${pct(tasaEfectiva)}. La diferencia sale del art. 4° de la Ley 24.674, que prohíbe descontar de la base «valor alguno en concepto del impuesto de esta ley»: el impuesto se calcula sobre un importe que ya lo contiene. Sobre ${pesos(importe)}, eran ${pesos(impuestoContenido)} de impuesto y ${pesos(importeSinImpuesto)} de precio.`,
  });

  if (rubro.todasLasEtapas) {
    avisos.push({
      tono: "atencion",
      texto:
        "Los objetos suntuarios son el único rubro que se gravaba en cada etapa de comercialización, y no una sola vez: el art. 2° exceptúa expresamente al Capítulo VIII de la regla de la etapa única. El art. 37 amortigua el arrastre (fabricantes, talleristas y revendedores podían computar como pago a cuenta el impuesto pagado por los productos gravados que usaran), así que el efecto sobre el precio final depende de la cadena concreta. Esta calculadora resuelve una etapa: es el piso, no el total.",
    });
  }

  if (rubro.yaSuspendidoPorDecreto) {
    avisos.push({
      tono: "bloqueante",
      texto:
        "Ojo con el titular: esta alícuota figura en la ley, pero el Decreto 50/2025 ya la había dejado sin efecto o reducido para los bienes de los incisos a) a e) del art. 38, con efectos hasta el 30 de junio de 2027. O sea que en 2026 no se estaba pagando: el ahorro real de la eliminación no se mide contra este número. Lo que cambia con la ley es que el alivio deja de depender de un decreto que hay que renovar.",
    });
  }

  if (rubro.tieneMontoExento) {
    avisos.push({
      tono: "atencion",
      texto:
        "Este rubro tenía un monto exento: por debajo de cierto precio de venta (sin impuestos, incluidos los opcionales), la operación no tributaba. El art. 39 escribió esos importes en 2019 y mandó actualizarlos trimestralmente por el IPIM, así que el valor vigente no está en la ley y esta página no lo publica. Si el precio de la operación era bajo, puede que no hubiera impuesto para eliminar.",
    });
  }

  if (rubro.id === "seguros" || rubro.id === "art") {
    avisos.push({
      tono: "atencion",
      texto:
        "Varios seguros ya estaban exentos antes de la Ley 27.802: los agrícolas, los de vida (individuales o colectivos), los de accidentes personales y los colectivos que cubren gastos de internación, cirugía o maternidad. Para ésos, el art. 195 no cambia nada.",
    });
  }

  if (rubro.id === "celular") {
    avisos.push({
      tono: "atencion",
      texto:
        "El 5% alcanzaba tanto al abono como a la recarga: el art. 31 incluía expresamente «la venta de tarjetas prepagas y/o recargables». El impuesto lo ingresaba quien prestaba el servicio, no el usuario, pero venía dentro del importe facturado.",
    });
  }

  if (rubro.id === "aeronaves") {
    avisos.push({
      tono: "ok",
      texto:
        "Éste es el rubro del Capítulo IX donde la eliminación baja algo que se estaba pagando de verdad: el Decreto 50/2025 enumeró los incisos a), b), c), d) y e) del art. 38 y dejó afuera al f). Las aeronaves de recreo tampoco tenían monto exento (el art. 39 dice «sin aplicarse monto exento para el inciso f)»), así que el 20% corría desde el primer peso.",
    });
  }

  return {
    rubro,
    importe,
    alicuota: t,
    impuestoContenido,
    importeSinImpuesto,
    tasaEfectiva,
    participacionEnElImporte: t,
    avisos,
  };
}
