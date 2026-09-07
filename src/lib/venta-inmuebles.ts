import {
  ALICUOTA_CEDULAR,
  DEROGACION_ITI,
  DEROGACION_ITI_MES,
  PRIMER_MES_ADQUISICION_CEDULAR,
  PRIMER_MES_EXENCION,
  type Regimen,
} from "@/data/venta-inmuebles";
import { ULTIMO_PERIODO, existePeriodo, indiceDe, nombrePeriodo } from "@/lib/inflacion";

// Venta de un inmueble por una persona humana: ¿qué impuesto nacional le corresponde, y cuánto?
//
// EL ÁRBOL DE DECISIÓN, y de dónde sale cada rama (las tres normas están citadas en el data file):
//
//   1. **Enajenación desde el 1/1/2026 → EXENTO.** Art. 26 inc. n) de la LIG, texto del art. 192 de
//      la Ley 27.802: está exento «el resultado derivado de la enajenación de inmuebles y de la
//      transferencia de derechos sobre inmuebles, alcanzados por las disposiciones del artículo 99
//      (…) que se enajenen o transfieran a partir del 1° de enero de 2026».
//   2. **Adquirido antes del 1/1/2018 → nunca estuvo en el cedular.** Art. 86 inc. a) de la Ley
//      27.430. Esas operaciones iban por el ITI (Título VII de la Ley 23.905), que el art. 67 de la
//      Ley 27.743 DEROGÓ el 8/7/2024. Vendido después de esa fecha: no hay impuesto nacional a la
//      transferencia. Vendido antes: estaba el ITI, cuyo texto ya no está vigente y por eso esta
//      calculadora no publica su alícuota.
//   3. **Adquirido desde el 1/1/2018 y vendido hasta el 31/12/2025 → cedular del 15%** sobre
//      (precio − costo actualizado − gastos), art. 99.
//
// LA ACTUALIZACIÓN DEL COSTO, que es lo que casi nadie hace bien: el art. 99 inc. a) manda deducir
// «el costo de adquisición, actualizado mediante la aplicación del índice mencionado en el segundo
// párrafo del artículo 93, desde la fecha de adquisición hasta la fecha de enajenación», y ese
// índice, para las adquisiciones desde el 1/1/2018, es el IPC nivel general del INDEC. Acá se usa
// la serie oficial que ya vive en el repo (`IPC_SERIE`, generada desde la API del INDEC), tomando
// el índice del MES de cada fecha. Sin actualizar, el impuesto se calcula sobre inflación pura y da
// cualquier cosa: un departamento comprado en 2019 y vendido en 2025 "gana" varios miles por ciento
// en pesos nominales.
//
// LO QUE NO SE CALCULA, A PROPÓSITO:
//   · **El ITI.** Su texto está derogado y no figura en InfoLEG: no hay alícuota que leer.
//   · **La venta que hace una empresa.** El art. 99 es de personas humanas y sucesiones indivisas.
//   · **Sellos, ingresos brutos y tasas municipales.** Son de cada jurisdicción, no de esta ley.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoVentaInmueble = {
  regimen: Regimen;
  /** Costo de adquisición actualizado por IPC hasta el mes de la venta (art. 99 inc. a). */
  costoActualizado: number;
  /** Coeficiente de actualización aplicado: IPC(venta) / IPC(adquisición). */
  coeficiente: number;
  /** Ganancia gravada: precio − costo actualizado − gastos. Nunca negativa a los fines del impuesto. */
  gananciaGravada: number;
  /** Ganancia antes de restar los gastos, para mostrar la cuenta abierta. */
  gananciaAntesDeGastos: number;
  /** Impuesto que corresponde pagar hoy. Cero cuando está exento o cuando no hay impuesto. */
  impuesto: number;
  /** Lo que se habría pagado con el cedular, aunque hoy esté exento. Sirve para dimensionar. */
  impuestoSiNoEstuvieraExento: number;
  /** Si la actualización se hizo con un índice tope porque la serie del INDEC no llega a esa fecha. */
  indiceTopeado: boolean;
  avisos: Aviso[];
};

const pesos = (n: number) => `$${Math.round(n).toLocaleString("es-AR")}`;

/** Compara dos períodos "YYYY-MM" como strings: el formato es ordenable por sí mismo. */
const desdeInclusive = (periodo: string, limite: string) => periodo >= limite;

/**
 * Índice del período pedido. Si el período es posterior al último publicado, devuelve el último
 * (y avisa): es preferible una actualización incompleta y declarada que extrapolar un IPC que el
 * INDEC todavía no publicó.
 */
function indiceConTope(periodo: string): { indice: number | null; topeado: boolean } {
  if (existePeriodo(periodo)) return { indice: indiceDe(periodo), topeado: false };
  if (periodo > ULTIMO_PERIODO) return { indice: indiceDe(ULTIMO_PERIODO), topeado: true };
  return { indice: null, topeado: false };
}

export function calcularVentaInmueble(params: {
  /** Mes de adquisición, "YYYY-MM". */
  adquisicion: string;
  /** Mes de la enajenación o transferencia, "YYYY-MM". */
  venta: string;
  precioVenta: number;
  costoAdquisicion: number;
  /** Comisiones, honorarios, impuestos y tasas de la operación (art. 99, último párrafo). */
  gastos: number;
}): ResultadoVentaInmueble | null {
  const { adquisicion, venta, precioVenta, costoAdquisicion, gastos } = params;

  if (!/^\d{4}-\d{2}$/.test(adquisicion) || !/^\d{4}-\d{2}$/.test(venta)) return null;
  if (!(precioVenta > 0)) return null;
  if (!(costoAdquisicion >= 0) || !(gastos >= 0)) return null;
  if (venta < adquisicion) return null;

  const avisos: Aviso[] = [];

  const enElCedularPorFechaDeCompra = desdeInclusive(adquisicion, PRIMER_MES_ADQUISICION_CEDULAR);
  const ventaExenta = desdeInclusive(venta, PRIMER_MES_EXENCION);

  // Actualización del costo (art. 99 inc. a). Se calcula siempre, aunque el resultado esté exento:
  // ver la cuenta es la única forma de dimensionar lo que la exención evita.
  const iAdq = indiceConTope(adquisicion);
  const iVenta = indiceConTope(venta);
  let coeficiente = 1;
  let indiceTopeado = iVenta.topeado;
  if (iAdq.indice && iVenta.indice && iAdq.indice > 0) {
    coeficiente = iVenta.indice / iAdq.indice;
  } else {
    avisos.push({
      tono: "atencion",
      texto: `La serie oficial del IPC del INDEC no cubre ${nombrePeriodo(adquisicion)}, así que el costo no se actualizó. El art. 99 inc. a) manda actualizarlo con el índice del segundo párrafo del art. 93 y, para las adquisiciones desde 2018, ese índice es el IPC nivel general. Sin actualización, la ganancia que muestra la cuenta está inflada.`,
    });
  }

  const costoActualizado = costoAdquisicion * coeficiente;
  const gananciaAntesDeGastos = precioVenta - costoActualizado;
  const gananciaGravada = Math.max(0, gananciaAntesDeGastos - gastos);
  const impuestoSiNoEstuvieraExento = enElCedularPorFechaDeCompra
    ? gananciaGravada * ALICUOTA_CEDULAR
    : 0;

  let regimen: Regimen;
  if (ventaExenta) {
    regimen = "exento";
  } else if (enElCedularPorFechaDeCompra) {
    regimen = "cedular";
  } else if (desdeInclusive(venta, DEROGACION_ITI_MES)) {
    regimen = "sinImpuesto";
  } else {
    regimen = "iti";
  }

  const impuesto = regimen === "cedular" ? impuestoSiNoEstuvieraExento : 0;

  if (indiceTopeado) {
    avisos.push({
      tono: "atencion",
      texto: `El INDEC todavía no publicó el IPC de ${nombrePeriodo(venta)}: la actualización del costo se hizo hasta ${nombrePeriodo(ULTIMO_PERIODO)}, el último mes publicado. La cuenta queda corta, no larga — y acá se dice, en vez de extrapolar un índice que no existe.`,
    });
  }

  if (regimen === "exento") {
    avisos.push({
      tono: "ok",
      texto: `La operación está exenta. El art. 26 inc. n) de la Ley de Ganancias, en el texto que le puso el art. 192 de la Ley 27.802, exime «el resultado derivado de la enajenación de inmuebles y de la transferencia de derechos sobre inmuebles, alcanzados por las disposiciones del artículo 99 (…) que se enajenen o transfieran a partir del 1° de enero de 2026». Con las mismas cifras, antes de esa fecha el cedular habría sido de ${pesos(impuestoSiNoEstuvieraExento)}.`,
    });
    avisos.push({
      tono: "atencion",
      texto:
        "El propio inciso agrega «en los términos que al respecto establezca la reglamentación». La exención está en la ley y rige; la operatoria concreta —qué se le presenta al escribano, cómo se acredita— puede estar en una resolución de ARCA. Antes de escriturar conviene verificar si ya salió: esta página publica lo que dice la ley, que es lo que no va a cambiar.",
    });
  }

  if (regimen === "cedular") {
    avisos.push({
      tono: "bloqueante",
      texto: `La operación está alcanzada por el impuesto cedular del ${ALICUOTA_CEDULAR * 100}% del art. 99: el inmueble se adquirió desde el 1/1/2018 y se enajenó antes del 1/1/2026. La ganancia se calcula sobre el costo ACTUALIZADO, no sobre el que figura en la escritura de compra.`,
    });
    avisos.push({
      tono: "atencion",
      texto:
        "Contra esta ganancia no se deducen las deducciones generales. El art. 100 dice que «sólo podrán computarse (…) los costos de adquisición y gastos directa o indirectamente relacionados con ellas, no pudiendo deducirse los conceptos previstos en los artículos 29, 30 y 85 de la ley»: ni el mínimo no imponible, ni las cargas de familia, ni la deducción especial entran acá.",
    });
  }

  if (regimen === "sinImpuesto") {
    avisos.push({
      tono: "ok",
      texto: `No hay impuesto nacional a la transferencia, y hacen falta dos leyes para verlo. El inmueble se adquirió antes del 1/1/2018, así que nunca entró al cedular: el art. 86 inc. a) de la Ley 27.430 lo alcanza sólo «en tanto el enajenante o cedente hubiera adquirido el bien a partir del 1° de enero de 2018», y para esos casos deja afuera al Título VII de la Ley 23.905. Y ese Título VII —el ITI— fue derogado por el art. 67 de la Ley 27.743 el ${DEROGACION_ITI}. Comprado antes de 2018 y vendido después de esa fecha: ninguno de los dos.`,
    });
  }

  if (regimen === "iti") {
    avisos.push({
      tono: "atencion",
      texto: `La operación es anterior al ${DEROGACION_ITI} y el inmueble se adquirió antes del 1/1/2018: quedaba fuera del cedular y alcanzada por el ITI, el Impuesto a la Transferencia de Inmuebles del Título VII de la Ley 23.905. Esta calculadora no publica su alícuota porque ese Título está derogado y su texto ya no figura vigente en InfoLEG: los dieciocho artículos son notas de derogación. Un número que no se puede leer en la fuente no se publica.`,
    });
  }

  if (gananciaAntesDeGastos <= 0 && regimen === "cedular") {
    avisos.push({
      tono: "ok",
      texto:
        "Con el costo actualizado, la operación no arroja ganancia: en pesos constantes el inmueble se vendió por menos de lo que costó. Es el caso que más se paga de más cuando se calcula sobre el precio nominal de la escritura vieja.",
    });
  }

  return {
    regimen,
    costoActualizado,
    coeficiente,
    gananciaGravada,
    gananciaAntesDeGastos,
    impuesto,
    impuestoSiNoEstuvieraExento,
    indiceTopeado,
    avisos,
  };
}
