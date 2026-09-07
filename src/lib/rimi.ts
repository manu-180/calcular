import {
  ANIOS_PERMANENCIA,
  BIENES,
  FACTOR_VIDA_UTIL_OBRA,
  MONTOS_MINIMOS,
  PERIODOS_IVA,
  type CategoriaPyme,
  type TipoBien,
} from "@/data/rimi";

// RIMI (Título XXIII de la Ley 27.802): ¿la inversión califica, y en cuántas cuotas se amortiza?
//
// LAS DOS PREGUNTAS QUE ESTA CALCULADORA CONTESTA, y por qué son las únicas dos que se pueden
// contestar con la ley en la mano:
//
//   1. **¿Califica por monto?** El art. 181 fija cuatro pisos en dólares según la categoría MiPyME.
//      Pero el art. 180 —el artículo ANTERIOR, que es donde nadie lo busca— exceptúa de ese piso a
//      cuatro tipos de bien: riego, alta eficiencia energética, mallas antigranizo y semovientes,
//      «independientemente del monto de la inversión involucrada». Un equipo de riego de USD 20.000
//      entra aunque el piso de la categoría sea USD 150.000. Esa bifurcación es todo el resultado.
//
//   2. **¿En cuántas cuotas se amortiza?** El art. 182 tiene cinco incisos con tres respuestas:
//      dos cuotas (muebles), una cuota (riego/eficiencia, semovientes, mallas) o —para obras— «la
//      cantidad de cuotas anuales, iguales y consecutivas que surja de considerar su vida útil
//      reducida al sesenta por ciento (60%) de la estimada».
//
// LO QUE NO SE CALCULA, A PROPÓSITO: el ahorro en pesos. El beneficio de la amortización acelerada
// es de TIMING, y su valor depende de la alícuota de Ganancias del contribuyente y de su tasa de
// descuento — dos números que la ley no fija. Publicar un ahorro sería fabricar un dato. Lo que sí
// es aritmética verificable es el cronograma, y es lo que se muestra.
//
// TAMPOCO SE CONVIERTE A PESOS: el art. 181 escribe los mínimos en dólares estadounidenses y no
// dice con qué tipo de cambio se miden. La calculadora trabaja en dólares y lo dice.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoRimi = {
  /** Piso del art. 181 para la categoría elegida, en USD. */
  montoMinimo: number;
  /** Si el bien está exceptuado del piso por el art. 180. */
  exentoDelMinimo: boolean;
  /** Si la inversión califica: por monto, o por la excepción del art. 180. */
  califica: boolean;
  /** Cuánto falta para llegar al piso, en USD. Cero si califica. */
  faltaParaElMinimo: number;
  /** Cuotas anuales del régimen acelerado del art. 182. */
  cuotasAceleradas: number;
  /** Cuotas del régimen general (la vida útil declarada), para contrastar. */
  cuotasGenerales: number;
  /** Años que se adelanta la deducción completa respecto del régimen general. */
  aniosQueAdelanta: number;
  /** Importe de cada cuota acelerada, en USD. */
  cuotaAcelerada: number;
  /** Inciso del art. 182 que aplica. */
  inciso: string;
  /** Períodos fiscales mensuales de espera para pedir la devolución de IVA (art. 183). */
  periodosIva: number;
  /** Años fiscales que el bien tiene que permanecer en el patrimonio (art. 186). */
  aniosPermanencia: number;
  avisos: Aviso[];
};

export function calcularRimi(params: {
  categoria: CategoriaPyme;
  tipoBien: TipoBien;
  /** Monto de la inversión productiva, en dólares estadounidenses. */
  montoUsd: number;
  /** Vida útil estimada del bien en años, según el régimen general de Ganancias. */
  vidaUtilAnios: number;
}): ResultadoRimi | null {
  const { categoria, tipoBien, montoUsd, vidaUtilAnios } = params;

  if (!(montoUsd > 0)) return null;
  if (!(vidaUtilAnios > 0)) return null;

  const bien = BIENES.find((b) => b.id === tipoBien);
  if (!bien) return null;

  const montoMinimo = MONTOS_MINIMOS[categoria];
  const exentoDelMinimo = bien.exentoDelMinimo;
  const alcanzaElPiso = montoUsd >= montoMinimo;
  const califica = exentoDelMinimo || alcanzaElPiso;
  const faltaParaElMinimo = califica ? 0 : montoMinimo - montoUsd;

  // Art. 182: dos cuotas para muebles, una para los cuatro bienes de los incisos c), d) y e), y
  // para obras la cantidad que surja de reducir la vida útil al 60%. «Como mínimo» esa cantidad:
  // se redondea hacia arriba, porque las cuotas son enteras y el artículo fija un piso, no un techo.
  const cuotasAceleradas =
    bien.cuotas ?? Math.max(1, Math.ceil(vidaUtilAnios * FACTOR_VIDA_UTIL_OBRA));
  const cuotasGenerales = Math.max(1, Math.round(vidaUtilAnios));

  const avisos: Aviso[] = [];

  if (exentoDelMinimo) {
    avisos.push({
      tono: "ok",
      texto: `Este bien no tiene monto mínimo. El artículo 180 dice que las inversiones en riego, alta eficiencia energética, mallas antigranizo y semovientes «serán susceptibles de promoción, independientemente del monto de la inversión involucrada, en cada caso». O sea que califica aunque esté muy por debajo de los USD ${montoMinimo.toLocaleString("es-AR")} que pide el artículo 181 para tu categoría. Es la oración que más cambia quién entra al régimen, y está en el artículo anterior al de los montos.`,
    });
  } else if (califica) {
    avisos.push({
      tono: "ok",
      texto: `La inversión supera el piso de USD ${montoMinimo.toLocaleString("es-AR")} que el artículo 181 fija para tu categoría.`,
    });
  } else {
    avisos.push({
      tono: "bloqueante",
      texto: `No llega al piso: el artículo 181 pide USD ${montoMinimo.toLocaleString("es-AR")} para tu categoría y faltan USD ${faltaParaElMinimo.toLocaleString("es-AR")}. Ojo con una cosa antes de descartarlo: si parte de la inversión es en riego, bienes de alta eficiencia energética, mallas antigranizo o semovientes, esa parte entra igual por el artículo 180, sin monto mínimo.`,
    });
  }

  if (tipoBien === "obra") {
    avisos.push({
      tono: "atencion",
      texto: `Para obras, el artículo 182 inciso b) no da un número fijo: manda amortizar «como mínimo» en las cuotas que surjan de reducir la vida útil al 60% de la estimada. Con ${cuotasGenerales} año(s) de vida útil declarada, eso da ${cuotasAceleradas} cuota(s). Como el artículo fija un piso y no un techo, se puede amortizar en más cuotas, nunca en menos.`,
    });
  }

  if (tipoBien === "mueble") {
    avisos.push({
      tono: "atencion",
      texto:
        "Los automóviles están expresamente excluidos del concepto de inversión productiva (artículo 180), igual que los activos financieros, de portfolio y los bienes de cambio.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto: `El bien tiene que quedarse ${ANIOS_PERMANENCIA} años fiscales en el patrimonio o los beneficios caducan (artículo 186), con tres excepciones: reemplazo por otro de valor igual o mayor, destrucción por caso fortuito o fuerza mayor, o haber transcurrido un tercio de la vida útil.`,
  });

  avisos.push({
    tono: "bloqueante",
    texto:
      "Una inversión, un régimen. El artículo 184 inciso f) excluye a quienes accedan al RIGI «y/o a cualquier otro régimen de incentivos, por las mismas inversiones productivas», y faculta a la Autoridad de Aplicación a ampliar esa exclusión. También quedan afuera quienes registren deudas fiscales, aduaneras o previsionales firmes, exigibles e impagas.",
  });

  avisos.push({
    tono: "atencion",
    texto: `La inversión se considera realizada en el ejercicio fiscal en el que se verifique «su puesta en marcha y su afectación a la producción de ganancias gravadas» (artículo 185), no en el de la compra. Y el crédito fiscal de IVA se puede pedir en devolución recién después de ${PERIODOS_IVA} períodos fiscales mensuales (artículo 183).`,
  });

  return {
    montoMinimo,
    exentoDelMinimo,
    califica,
    faltaParaElMinimo,
    cuotasAceleradas,
    cuotasGenerales,
    aniosQueAdelanta: Math.max(0, cuotasGenerales - cuotasAceleradas),
    cuotaAcelerada: montoUsd / cuotasAceleradas,
    inciso: bien.inciso,
    periodosIva: PERIODOS_IVA,
    aniosPermanencia: ANIOS_PERMANENCIA,
    avisos,
  };
}
