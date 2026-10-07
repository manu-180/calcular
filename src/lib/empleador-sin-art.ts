// Motor de «quién responde cuando el empleador no tiene la ART en regla». Funciones puras.
//
// QUÉ DECIDE Y QUÉ NO. Decide QUIÉN responde por las prestaciones y CON QUÉ ALCANCE, según el
// estado de la afiliación al momento del accidente. NO calcula montos: los pisos y las fórmulas
// están en `/indemnizacion-art`, que es la fuente única de esos números.
//
// EL ORDEN DE LAS PREGUNTAS ES EL ORDEN DE LA LEY, Y NO ES INTERCAMBIABLE. Primero: ¿hay contrato
// de afiliación vivo? Si no lo hay —porque nunca se afilió, o porque se extinguió— manda el art. 28
// ap. 1 y responde el empleador, con la salvedad de los tres meses del art. 27 ap. 6. Si lo hay, la
// ART responde siempre, y lo que cambia es contra quién repite: por el trabajador no declarado
// repite el costo (ap. 2), por las cuotas impagas ejecuta las cotizaciones (ap. 4).
//
// LA TRAMPA QUE ESTE MOTOR NO REPITE: leer «el empleador no paga la ART» como «no estoy cubierto».
// La falta de pago, por sí sola, no corta nada — el ap. 4 dice que la ART otorga las prestaciones
// igual. Lo que corta es la EXTINCIÓN del contrato, que es un acto de la aseguradora, requiere dos
// cuotas impagas y tiene que ajustarse a una reglamentación. Mientras el contrato viva, la deuda es
// un problema entre la ART y la empresa, no del trabajador accidentado.

import {
  CUOTAS_PARA_EXTINGUIR,
  MESES_ESPECIE_TRAS_EXTINCION,
} from "@/data/empleador-sin-art";

export type Responsable = "art" | "empleador" | "art-parcial" | "fondo-de-garantia";

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type Entrada = {
  /** ¿El empleador llegó a contratar alguna vez una ART? */
  afiliadoAlgunaVez: boolean;
  /** ¿La ART extinguió el contrato por falta de pago? */
  contratoExtinguido: boolean;
  /** Meses transcurridos entre la extinción y el accidente. */
  mesesDesdeExtincion?: number;
  /** ¿El empleador declaró la contratación del trabajador? */
  trabajadorDeclarado: boolean;
  /** ¿El empleador está al día con las cuotas? */
  cuotasAlDia: boolean;
  /** ¿Se declaró judicialmente la insuficiencia patrimonial del empleador? */
  insuficienciaDeclarada: boolean;
};

export type Resultado = {
  responsable: Responsable;
  /** El artículo que lo decide. */
  norma: string;
  /** Qué se cobra: todo lo de la ley, o sólo las prestaciones en especie. */
  alcance: "completo" | "solo-en-especie";
  titulo: string;
  detalle: string;
  /** Contra quién repite o ejecuta el que pagó, si corresponde. Vacío cuando no hay repetición. */
  repeticion: string;
  avisos: Aviso[];
};

/** ¿El accidente cae dentro de la ventana de tres meses del art. 27 ap. 6? */
export function dentroDeLaVentana(mesesDesdeExtincion: number | undefined): boolean {
  const m = mesesDesdeExtincion ?? Number.POSITIVE_INFINITY;
  return m >= 0 && m <= MESES_ESPECIE_TRAS_EXTINCION;
}

export function calcularResponsable(e: Entrada): Resultado {
  const avisos: Aviso[] = [];

  // 1 · Nunca hubo afiliación: no hay aseguradora a la que reclamarle.
  if (!e.afiliadoAlgunaVez) {
    if (e.insuficienciaDeclarada) {
      avisos.push({
        tono: "atencion",
        texto:
          "Con la insuficiencia patrimonial ya declarada judicialmente, las prestaciones las financia la SRT con cargo al Fondo de Garantía de la LRT (art. 29). No es automático: se prueba por el procedimiento sumarísimo de las acciones meramente declarativas.",
      });
      return {
        responsable: "fondo-de-garantia",
        norma: "Ley 24.557, art. 29",
        alcance: "completo",
        titulo: "Responde el Fondo de Garantía de la SRT",
        detalle:
          "El empleador no asegurado es el obligado, pero con su insuficiencia patrimonial declarada judicialmente las prestaciones pasan a financiarse con cargo al Fondo de Garantía de la LRT.",
        repeticion: "",
        avisos,
      };
    }
    avisos.push({
      tono: "bloqueante",
      texto:
        "No hay aseguradora a la que reclamarle: el obligado es el empleador y responde con su propio patrimonio. Si no puede, el art. 29 abre la puerta del Fondo de Garantía, pero antes hay que conseguir la declaración judicial de insuficiencia patrimonial.",
    });
    avisos.push({
      tono: "ok",
      texto:
        "Si además la relación no estaba registrada, no hay que agotar la comisión médica antes de ir a la justicia: el art. 1° de la Ley 27.348 exime expresamente al trabajador no registrado de un empleador del apartado 1 del art. 28.",
    });
    return {
      responsable: "empleador",
      norma: "Ley 24.557, art. 28 ap. 1",
      alcance: "completo",
      titulo: "Responde el empleador, directamente",
      detalle:
        "El empleador que no está en el régimen de autoseguro y omitió afiliarse a una ART «responderá directamente ante los beneficiarios por las prestaciones previstas en esta ley». Le debe todo lo que le hubiera pagado la aseguradora.",
      repeticion: "",
      avisos,
    };
  }

  // 2 · Hubo afiliación pero el contrato se extinguió por falta de pago.
  if (e.contratoExtinguido) {
    const enVentana = dentroDeLaVentana(e.mesesDesdeExtincion);
    if (enVentana) {
      avisos.push({
        tono: "ok",
        texto: `La red dura ${MESES_ESPECIE_TRAS_EXTINCION} meses y cubre sólo las prestaciones EN ESPECIE del Capítulo V: atención médica y farmacéutica, prótesis y ortopedia, rehabilitación, recalificación profesional y servicio funerario. Las dinerarias no están adentro.`,
      });
      avisos.push({
        tono: "atencion",
        texto:
          "Por lo que no cubre esa red (la indemnización en dinero), el obligado sigue siendo el empleador, que desde la extinción «se considerará no asegurado» y queda en la situación del art. 28 ap. 1.",
      });
      return {
        responsable: "art-parcial",
        norma: "Ley 24.557, art. 27 ap. 6",
        alcance: "solo-en-especie",
        titulo: "La ART tiene que atenderte igual, aunque el contrato ya no exista",
        detalle: `El accidente ocurrió dentro de los ${MESES_ESPECIE_TRAS_EXTINCION} meses posteriores a la extinción por falta de pago, así que «la aseguradora deberá otorgar prestaciones en especie» pese a que el contrato ya estaba extinguido.`,
        repeticion:
          "La aseguradora puede repetir del empleador el costo de las prestaciones que otorgó en esa ventana.",
        avisos,
      };
    }
    avisos.push({
      tono: "bloqueante",
      texto: `Pasaron más de ${MESES_ESPECIE_TRAS_EXTINCION} meses desde la extinción: la ventana del art. 27 ap. 6 se cerró y ya no hay obligación de la aseguradora. El empleador está en la misma situación que el que nunca se afilió.`,
    });
    if (e.insuficienciaDeclarada) {
      return {
        responsable: "fondo-de-garantia",
        norma: "Ley 24.557, art. 29",
        alcance: "completo",
        titulo: "Responde el Fondo de Garantía de la SRT",
        detalle:
          "Extinguido el contrato y vencida la ventana, el obligado es el empleador; con su insuficiencia patrimonial declarada judicialmente, las prestaciones se financian con cargo al Fondo de Garantía de la LRT.",
        repeticion: "",
        avisos,
      };
    }
    return {
      responsable: "empleador",
      norma: "Ley 24.557, art. 27 ap. 6 + art. 28 ap. 1",
      alcance: "completo",
      titulo: "Responde el empleador, directamente",
      detalle:
        "«A partir de la extinción, el empleador se considerará no asegurado y estará en la situación prevista en el apartado 1 del artículo 28»: responde él por todas las prestaciones de la ley.",
      repeticion: "",
      avisos,
    };
  }

  // 3 · Hay contrato vivo. La ART responde siempre; cambia contra quién repite.
  if (!e.trabajadorDeclarado) {
    avisos.push({
      tono: "ok",
      texto:
        "Estar sin registrar NO te deja sin cobertura si la empresa tiene ART: el art. 28 ap. 2 pone las prestaciones a cargo de la aseguradora y le da a ella el derecho de cobrarle después al empleador. La deuda es entre ellos.",
    });
    if (!e.cuotasAlDia) {
      avisos.push({
        tono: "atencion",
        texto: `Las cuotas impagas tampoco cortan la cobertura por sí solas (art. 28 ap. 4). Lo que la cortaría es que la ART extinga el contrato, y para eso necesita ${CUOTAS_PARA_EXTINGUIR} cuotas impagas (seguidas o alternadas) o una deuda equivalente, y ajustarse a la reglamentación.`,
      });
    }
    return {
      responsable: "art",
      norma: "Ley 24.557, art. 28 ap. 2",
      alcance: "completo",
      titulo: "Responde la ART",
      detalle:
        "«Si el empleador omitiera declarar su obligación de pago o la contratación de un trabajador, la ART otorgará las prestaciones»: el contrato de afiliación está vivo y la aseguradora tiene que cubrir la contingencia.",
      repeticion:
        "La ART puede repetir del empleador el costo de las prestaciones, y el empleador debe depositar las cuotas omitidas en la cuenta del Fondo de Garantía de la ART (art. 28 ap. 3).",
      avisos,
    };
  }

  if (!e.cuotasAlDia) {
    avisos.push({
      tono: "ok",
      texto: `Que el empleador deba cuotas no te saca la cobertura: el art. 28 ap. 4 manda a la ART a otorgar las prestaciones igual. Recién con ${CUOTAS_PARA_EXTINGUIR} cuotas impagas (o una deuda equivalente a ${CUOTAS_PARA_EXTINGUIR}, tomando la de mayor valor del último año), la aseguradora puede extinguir el contrato, y aun así te debe ${MESES_ESPECIE_TRAS_EXTINCION} meses de prestaciones en especie.`,
    });
    return {
      responsable: "art",
      norma: "Ley 24.557, art. 28 ap. 4",
      alcance: "completo",
      titulo: "Responde la ART",
      detalle:
        "Aunque el empleador no pague las cuotas (todas o una parte), la ART tiene que dar las prestaciones: la deuda del empleador no se le puede oponer al trabajador accidentado.",
      repeticion: "La ART puede ejecutar contra el empleador las cotizaciones adeudadas.",
      avisos,
    };
  }

  return {
    responsable: "art",
    norma: "Ley 24.557, arts. 20 y 26",
    alcance: "completo",
    titulo: "Responde la ART, por el contrato de afiliación",
    detalle:
      "Con el contrato vigente, el trabajador declarado y las cuotas al día, la cobertura es la ordinaria de la ley: la aseguradora otorga las prestaciones en especie y las dinerarias que correspondan.",
    repeticion: "",
    avisos,
  };
}
