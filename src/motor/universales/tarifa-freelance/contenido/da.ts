import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Beregn din timepris som freelancer",
    title: tituloQueEntre(
      `Beregn timepris som freelancer og konsulent | ${ctx.nombrePais}`,
      `Beregn timepris | ${ctx.nombrePais}`,
      "Beregn timepris",
    ),
    description: "Beregn din timepris og dagspris som freelancer ud fra, hvad du vil tjene, dine udgifter, skat, fridage og fakturerbare timer.",
    intro: [
      "Den mest almindelige fejl som freelancer er at tage den løn, du gerne ville have som ansat, og dele den med 160 timer. Så glemmer du skat, udgifter, ferie og alle de timer, der ikke kan faktureres.",
      "Beregneren tager udgangspunkt i, hvad du vil have tilbage, og viser, hvad du skal tage i betaling for at nå dertil.",
    ],
    comoSeCalcula: [
      "Nødvendig fakturering = det, du vil have tilbage ÷ (1 − skatteprocent) + udgifter i virksomheden.",
      "Arbejdsdage = 52 uger × arbejdsdage om ugen − fridage.",
      "Fakturerbare timer om året = arbejdsdage × fakturerbare timer om dagen.",
      "Timepris = nødvendig fakturering ÷ fakturerbare timer om året.",
    ],
    ejemplo: [
      `For at have ${m(ingreso)} tilbage om året, med ${m(gastos)} i udgifter og 25 % i skat, skal du fakturere ${m(r.facturado)}.`,
      `Med 30 fridage og 25 fakturerbare timer om ugen giver det ${formatearNumero(ctx, r.horas)} timer om året. Det svarer til en timepris på ${m(r.hora)} eller en dagspris på ${m(r.dia)}.`,
    ],
    faq: [
      {
        pregunta: "Hvor mange timer om ugen kan jeg fakturere?",
        respuesta: "Færre end du arbejder. Kundejagt, mails, fakturering og efteruddannelse tager tid, som ingen betaler for. 20 til 30 fakturerbare timer ud af 40 er almindeligt.",
      },
      {
        pregunta: "Skal jeg tage betaling pr. time eller pr. opgave?",
        respuesta: "Begge dele virker. Selv om du sætter en fast pris for en opgave, kan du anslå timerne og gange med denne timepris, så du ikke giver underskud.",
      },
      {
        pregunta: "Hvilken skatteprocent skal jeg bruge?",
        respuesta: "Det afhænger af land og virksomhedsform. Regn både indkomstskat og sociale bidrag med. Er du i tvivl, så spørg en revisor.",
      },
    ],
    glosario: [
      { termino: "Fakturerbare timer", definicion: "Arbejdstimer, som en kunde betaler dig for." },
      { termino: "Det, du har tilbage", definicion: "Det, der er tilbage efter skat og udgifter i virksomheden." },
    ],
  };
};
