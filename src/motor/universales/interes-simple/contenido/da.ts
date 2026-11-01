import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Renteberegner",
    title: tituloQueEntre(
      `Renteberegner: beregn renten af et beløb | ${ctx.nombrePais}`,
      `Renteberegner | ${ctx.nombrePais}`,
      "Renteberegner",
    ),
    description: "Beregn simpel rente af et beløb med en årlig rente over dage, måneder eller år. Vælg år med 365 eller 360 dage, og se det samlede beløb.",
    intro: [
      "Simpel rente regnes altid af det oprindelige beløb. Renten lægges ikke til saldoen i løbet af perioden.",
      "Den bruges til korte indskud, lån mellem privatpersoner og mange skoleopgaver.",
    ],
    comoSeCalcula: [
      "Rente = beløb × årlig rente × tid i år.",
      "Ved måneder deler du med 12. Ved dage deler du med 365 eller 360, alt efter hvilket år banken regner med.",
      "I alt = beløb + rente.",
    ],
    ejemplo: [
      `${m(capital)} med 10 % i årlig rente i 6 måneder giver ${m(capital * 0.1 * 0.5)} i rente.`,
      `Samme beløb i 90 dage giver ${m((capital * 0.1 * 90) / 365)} med 365 dage pr. år og ${m((capital * 0.1 * 90) / 360)} med 360 dage pr. år.`,
    ],
    faq: [
      {
        pregunta: "Hvordan regner man renten af et beløb ud?",
        respuesta: `Rente = K × r × t. K er beløbet, r er den årlige rente som decimaltal (10 % er ${formatearNumero(ctx, 0.1, 2)}), og t er tiden i år.`,
      },
      {
        pregunta: "Hvad er forskellen fra renters rente?",
        respuesta: "Simpel rente regnes altid af det samme beløb. Med renters rente lægges renten til saldoen og giver selv renter.",
      },
      {
        pregunta: "Hvorfor regner nogle banker med 360 dage?",
        respuesta: "Det er en konvention i bankverdenen, som gør regnestykket enklere. Med 360 dage bliver renten lidt højere. Tjek, hvad din bank bruger.",
      },
    ],
    glosario: [
      { termino: "Beløb", definicion: "De penge, der lånes ud eller sættes ind, også kaldet kapital eller hovedstol." },
      { termino: "Bankår", definicion: "Et år, der regnes som 360 dage, med måneder på 30 dage." },
    ],
  };
};
