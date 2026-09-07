import { TIPOS_OPERACION, type TipoOperacion } from "@/data/transferencia-establecimiento";
import {
  antiguedadEntre,
  calcularIndemnizacion,
  type Antiguedad,
  type ResultadoIndemnizacion,
} from "@/lib/indemnizacion";

// Transferencia del establecimiento (LCT arts. 225 a 230): cuánto se juega en la antigüedad y
// quién responde por la deuda cuando la empresa cambia de dueño.
//
// LAS DOS PREGUNTAS QUE CONTESTA, Y POR QUÉ VAN JUNTAS:
//   1. **¿Cuánta antigüedad tengo?** La segunda oración del art. 225 —que la reforma NO tocó— dice
//      que «el trabajador conservará la antigüedad adquirida con el transmitente». La calculadora
//      pone en pesos la diferencia entre eso y el error más caro del tema: liquidar como si el
//      contrato hubiera empezado el día de la transferencia (el «ingreso nuevo» que se firma al
//      cambiar el dueño). Son las mismas cuentas que /indemnizacion, corridas dos veces.
//   2. **¿Quién me lo tiene que pagar?** Ahí sí cambió todo: el art. 228, sustituido el 6/3/2026,
//      exime al adquirente de la solidaridad por «toda información oculta o viciada» que no
//      conociera «luego de realizar los actos de debida diligencia». El crédito no se extingue —
//      desaparece un deudor. Y el que queda es el que vendió.
//
// EL ART. 245 NO SE REIMPLEMENTA (regla de s85): los dos escenarios salen de
// `calcularIndemnizacion`. El escenario "sin la antigüedad anterior" no inventa nada: corre la
// misma función con la fecha de la transferencia como ingreso, que es exactamente lo que hace una
// liquidación mal hecha.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type MotivoEgreso = "despido-sin-causa" | "art-226";

export type ResultadoTransferencia = {
  tipo: TipoOperacion;
  /** Antigüedad total, desde el ingreso con el transmitente (lo que manda el art. 225). */
  antiguedadTotal: Antiguedad;
  /** Antigüedad contada sólo desde la transferencia: lo que sale de una liquidación mal hecha. */
  antiguedadDesdeLaTransferencia: Antiguedad;
  /** Liquidación correcta: toda la antigüedad. */
  conAntiguedad: ResultadoIndemnizacion;
  /** Liquidación como si el contrato hubiera empezado el día de la transferencia. */
  sinAntiguedad: ResultadoIndemnizacion;
  /** Cuánto se pierde si te toman la antigüedad desde la transferencia. */
  diferencia: number;
  /** true si el cambio de antigüedad además cambia la duración del preaviso (1 mes vs 2). */
  cambiaElPreaviso: boolean;
  motivo: MotivoEgreso;
  /** Quiénes responden hoy por esa deuda, y con qué excepción. */
  responsables: { quien: string; base: string; condicionado: boolean }[];
  avisos: Aviso[];
};

export function calcularTransferencia(params: {
  tipoId: TipoOperacion["id"];
  ingresoISO: string;
  transferenciaISO: string;
  egresoISO: string;
  mejorRemuneracion: number;
  motivo: MotivoEgreso;
  topeCCT?: number;
}): ResultadoTransferencia | null {
  const { tipoId, ingresoISO, transferenciaISO, egresoISO, mejorRemuneracion, motivo, topeCCT } =
    params;

  const tipo = TIPOS_OPERACION.find((t) => t.id === tipoId);
  if (!tipo) return null;
  if (!ingresoISO || !transferenciaISO || !egresoISO) return null;
  if (!(mejorRemuneracion > 0)) return null;
  if (transferenciaISO <= ingresoISO) return null;
  if (egresoISO <= transferenciaISO) return null;

  const conAntiguedad = calcularIndemnizacion({
    ingresoISO,
    despidoISO: egresoISO,
    mejorRemuneracion,
    preavisoOtorgado: false,
    topeCCT,
  });
  const sinAntiguedad = calcularIndemnizacion({
    ingresoISO: transferenciaISO,
    despidoISO: egresoISO,
    mejorRemuneracion,
    preavisoOtorgado: false,
    topeCCT,
  });
  if (!conAntiguedad || !sinAntiguedad) return null;

  const antiguedadTotal = antiguedadEntre(ingresoISO, egresoISO);
  const antiguedadDesdeLaTransferencia = antiguedadEntre(transferenciaISO, egresoISO);

  const responsables: ResultadoTransferencia["responsables"] = [
    {
      quien: "El nuevo dueño (adquirente)",
      base: "Art. 225: el contrato continúa con él y pasan a su cargo las obligaciones del contrato de trabajo, «en los términos de lo estipulado por el artículo 228».",
      condicionado: false,
    },
    {
      quien: "El dueño anterior (transmitente), en forma solidaria",
      base: "Art. 228: transmitente y adquirente responden solidariamente por las obligaciones laborales existentes al momento de la transmisión.",
      condicionado: false,
    },
    {
      quien: "El adquirente, por deudas que estaban ocultas",
      base: "Art. 228, texto vigente desde el 6/3/2026: si la información estaba «oculta o viciada» y no llegó a su conocimiento pese a los actos de debida diligencia, queda eximido de la responsabilidad solidaria. Antes de la reforma no había excepción alguna.",
      condicionado: true,
    },
  ];

  if (tipo.id === "transitoria") {
    responsables.push({
      quien: "El propietario o cedente, cuando recupera el establecimiento",
      base: "Art. 227 (intacto): al vencimiento del arrendamiento o de la cesión transitoria, quien recupera el establecimiento asume las mismas obligaciones del art. 225.",
      condicionado: false,
    });
  }
  if (tipo.id === "cesion-personal") {
    responsables.push({
      quien: "Cedente y cesionario, aun con tu conformidad",
      base: "Art. 229 (intacto): la cesión de personal sin el establecimiento requiere tu aceptación expresa y por escrito, y aun así los dos responden solidariamente por todas las obligaciones de la relación cedida.",
      condicionado: false,
    });
  }

  const avisos: Aviso[] = [];

  avisos.push({
    tono: "ok",
    texto: `Tu antigüedad no se corta con el cambio de dueño: el artículo 225 dice que «el trabajador conservará la antigüedad adquirida con el transmitente y los derechos que de ella se deriven», y esa oración la reforma NO la tocó. Son ${antiguedadTotal.anios} año(s) y ${antiguedadTotal.meses} mes(es) desde tu ingreso, no ${antiguedadDesdeLaTransferencia.anios} año(s) y ${antiguedadDesdeLaTransferencia.meses} mes(es) desde la transferencia.`,
  });

  if (conAntiguedad.aniosComputables > sinAntiguedad.aniosComputables) {
    avisos.push({
      tono: "atencion",
      texto: `Si te liquidaran como si el contrato hubiera empezado el día de la transferencia, perderías ${
        conAntiguedad.aniosComputables - sinAntiguedad.aniosComputables
      } año(s) computable(s) del artículo 245. Es lo que pasa cuando al cambiar el dueño se firma un «ingreso nuevo»: el papel no borra los años, pero la liquidación sale mal si nadie lo discute.`,
    });
  }

  avisos.push({
    tono: "bloqueante",
    texto:
      "Lo que sí cambió el 6 de marzo de 2026 es quién responde. El artículo 228 vigente exime al adquirente de la responsabilidad solidaria por «toda información oculta o viciada que no fuera de conocimiento del adquirente luego de realizar los actos de debida diligencia para ello». El texto anterior no tenía ninguna excepción. Ojo con la lectura: tu crédito no se extingue —lo que puede desaparecer es un deudor—, y el que queda es el que vendió la empresa. La solidaridad existía justamente para eso.",
  });

  if (motivo === "art-226") {
    avisos.push({
      tono: "atencion",
      texto:
        "Considerarte despedido por la transferencia no es automático: el artículo 226 pide un perjuicio «apreciado con el criterio del artículo 242», y enumera qué se pondera —que cambie el objeto de la explotación, que se alteren funciones, cargo o empleo, o que la separación entre secciones o sucursales disminuya la responsabilidad patrimonial del empleador—. El monto que ves es el del despido indirecto; la causa hay que poder probarla. Consultá a un profesional antes de dar por roto el contrato.",
    });
  }

  if (tipo.id === "cesion-personal") {
    avisos.push({
      tono: "atencion",
      texto:
        "En la cesión de personal sin el establecimiento tenés algo que en los otros dos casos no: el artículo 229 exige tu aceptación expresa y por escrito. Sin esa conformidad, la cesión no procede.",
    });
  }

  if (egresoISO < "2026-03-06") {
    avisos.push({
      tono: "atencion",
      texto:
        "El egreso que cargaste es anterior al 6 de marzo de 2026: en ese caso rige el artículo 228 en su texto anterior, que hacía solidarios al transmitente y al adquirente sin excepción alguna. La defensa de debida diligencia no existía.",
    });
  }

  return {
    tipo,
    antiguedadTotal,
    antiguedadDesdeLaTransferencia,
    conAntiguedad,
    sinAntiguedad,
    diferencia: conAntiguedad.totalGeneral - sinAntiguedad.totalGeneral,
    cambiaElPreaviso:
      (conAntiguedad.preaviso?.meses ?? 0) !== (sinAntiguedad.preaviso?.meses ?? 0),
    motivo,
    responsables,
    avisos,
  };
}
