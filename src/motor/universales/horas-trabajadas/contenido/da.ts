import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Beregn arbejdstimer og løn for ugen",
    title: tituloQueEntre(
      `Beregn arbejdstimer: timer, pauser og overarbejde | ${ctx.nombrePais}`,
      `Beregn arbejdstimer | ${ctx.nombrePais}`,
      "Beregn arbejdstimer",
    ),
    description: "Læg de timer sammen, du har arbejdet i ugen, ud fra starttid, sluttid og pause, og beregn lønnen med overarbejde regnet med.",
    intro: [
      "Vælg start og slut for hver dag, din pause uden løn og din timeløn. Du ser de samlede timer, overarbejdet og lønnen for ugen.",
      "Brug den til at tjekke lønsedlen, udfylde en timeseddel eller fakturere arbejde pr. time.",
    ],
    comoSeCalcula: [
      "Timer pr. dag = sluttid − starttid − pause. Er sluttiden tidligere end starttiden, slutter vagten dagen efter.",
      "Overarbejde = ugens timer − normal arbejdstid, når ugens timer er flere.",
      "Løn = normale timer × timeløn + overtimer × timeløn × (1 + overtidstillæg).",
    ],
    ejemplo: [
      `Fra ${hora("09:00")} til ${hora("17:30")} med 30 minutters pause giver ${n(jornada)} timer om dagen. Mandag til fredag giver det ${n(jornada * 5)} timer, og med ${m(pago)} i timen ${m(jornada * 5 * pago)}.`,
      `Fra ${hora("08:00")} til ${hora("18:00")} med en times pause giver ${n(larga * 5)} timer om ugen, hvoraf ${n(extra)} er overarbejde. Med 50 % i overtidstillæg bliver lønnen ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Hvordan beregner jeg mine arbejdstimer?",
        respuesta: "Træk starttiden fra sluttiden, og træk pausen fra. Læg derefter alle ugens dage sammen.",
      },
      {
        pregunta: "Hvordan regner jeg minutter om til timer med decimaler?",
        respuesta: `Del minutterne med 60. En halv time er ${n(0.5, 1)}, 15 minutter er ${n(0.25, 2)}, og 45 minutter er ${n(0.75, 2)}. Så 7 timer og 45 minutter bliver ${n(7.75, 2)} timer.`,
      },
      {
        pregunta: "Hvor meget overarbejde må jeg have, og hvordan betales det?",
        respuesta: "Det afhænger af lovgivningen, hvor du arbejder, af overenskomsten og af din ansættelseskontrakt. Beregneren bruger det tillæg og den normale arbejdstid, du skriver, uden at anvende nogen bestemt regel.",
      },
    ],
    glosario: [
      { termino: "Overarbejde", definicion: "Timer ud over den normale arbejdstid, som betales med en højere løn." },
      { termino: "Pause", definicion: "Et ophold i arbejdet, hvor du har fri, og som oftest ikke er med løn." },
    ],
  };
};
