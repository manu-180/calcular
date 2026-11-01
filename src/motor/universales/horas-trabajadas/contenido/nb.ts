import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Beregn arbeidstid og lønn for uken",
    title: tituloQueEntre(
      `Beregn arbeidstid: timer, pauser og overtid | ${ctx.nombrePais}`,
      `Beregn arbeidstid | ${ctx.nombrePais}`,
      "Beregn arbeidstid",
    ),
    description: "Legg sammen timene du har jobbet i uken ut fra starttid, sluttid og pause, og regn ut lønnen med overtid regnet med.",
    intro: [
      "Velg start og slutt for hver dag, den ubetalte pausen og timelønnen din. Du ser timene totalt, overtiden og lønnen for uken.",
      "Bruk den til å sjekke lønnsslippen, fylle ut en timeliste eller fakturere arbeid per time.",
    ],
    comoSeCalcula: [
      "Timer per dag = sluttid − starttid − pause. Er sluttiden tidligere enn starttiden, slutter vakten dagen etter.",
      "Overtid = ukens timer − vanlig arbeidstid, når ukens timer er flere.",
      "Lønn = ordinære timer × timelønn + overtidstimer × timelønn × (1 + overtidstillegg).",
    ],
    ejemplo: [
      `Fra ${hora("09:00")} til ${hora("17:30")} med 30 minutters pause gir ${n(jornada)} timer per dag. Mandag til fredag blir det ${n(jornada * 5)} timer, og med ${m(pago)} i timen ${m(jornada * 5 * pago)}.`,
      `Fra ${hora("08:00")} til ${hora("18:00")} med en times pause gir ${n(larga * 5)} timer i uken. Med 40 timer som vanlig arbeidstid er ${n(extra)} av dem overtid, og med 50 % overtidstillegg blir lønnen ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Hvordan regner jeg ut arbeidstimene mine?",
        respuesta: "Trekk starttiden fra sluttiden, og trekk fra pausen. Legg deretter sammen alle dagene i uken.",
      },
      {
        pregunta: "Hvordan regner jeg om minutter til timer med desimaler?",
        respuesta: `Del minuttene på 60. En halvtime er ${n(0.5, 1)}, 15 minutter er ${n(0.25, 2)}, og 45 minutter er ${n(0.75, 2)}. Så 7 timer og 45 minutter blir ${n(7.75, 2)} timer.`,
      },
      {
        pregunta: "Hvor mye overtid kan jeg ha, og hvordan betales den?",
        respuesta: "Det avhenger av loven der du jobber, av tariffavtalen og av arbeidsavtalen din. Kalkulatoren bruker tillegget og den vanlige arbeidstiden du fyller inn, uten å bruke noen bestemt regel.",
      },
    ],
    glosario: [
      { termino: "Overtid", definicion: "Timer utover vanlig arbeidstid, som betales med høyere lønn." },
      { termino: "Pause", definicion: "Et opphold i arbeidet der du har fri, og som oftest ikke får lønn." },
    ],
  };
};
