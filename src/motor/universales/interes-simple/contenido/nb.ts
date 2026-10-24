import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Rentekalkulator",
    title: tituloQueEntre(
      `Rentekalkulator: regn ut renter på et beløp | ${ctx.nombrePais}`,
      `Rentekalkulator | ${ctx.nombrePais}`,
      "Rentekalkulator",
    ),
    description: "Regn ut enkel rente på et beløp med en årlig rente over dager, måneder eller år. Velg år med 365 eller 360 dager, og se beløpet totalt.",
    intro: [
      "Enkel rente regnes alltid av det opprinnelige beløpet. Renten legges ikke til saldoen underveis.",
      "Den brukes for korte innskudd, lån mellom privatpersoner og mange skoleoppgaver.",
    ],
    comoSeCalcula: [
      "Renter = beløp × rente per år × tid i år.",
      "Er tiden i måneder, deler du på 12. Er den i dager, deler du på 365 eller 360, alt etter hvilket år banken regner med.",
      "Totalt = beløp + renter.",
    ],
    ejemplo: [
      `${m(capital)} med 10 % rente per år i 6 måneder gir ${m(capital * 0.1 * 0.5)} i renter.`,
      `Samme beløp i 90 dager gir ${m((capital * 0.1 * 90) / 365)} med 365 dager per år og ${m((capital * 0.1 * 90) / 360)} med 360 dager per år.`,
    ],
    faq: [
      {
        pregunta: "Hvordan regner jeg ut renter på et beløp?",
        respuesta: `Renter = K × r × t. K er beløpet, r er renten per år som desimaltall (10 % er ${formatearNumero(ctx, 0.1, 2)}), og t er tiden i år.`,
      },
      {
        pregunta: "Hva er forskjellen fra renters rente?",
        respuesta: "Enkel rente regnes alltid av det samme beløpet. Med renters rente legges renten til saldoen og gir selv renter.",
      },
      {
        pregunta: "Hvorfor regner noen banker med 360 dager?",
        respuesta: "Det er en vane i bankverdenen som gjør regnestykket enklere. Med 360 dager blir renten litt høyere. Sjekk hva banken din bruker.",
      },
    ],
    glosario: [
      { termino: "Beløp", definicion: "Pengene som lånes ut eller settes inn, også kalt kapital eller hovedstol." },
      { termino: "Bankår", definicion: "Et år som regnes som 360 dager, med måneder på 30 dager." },
    ],
  };
};
