import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  const real = formatearCifra(ctx, (1.07 / 1.03 - 1) * 100, 1);
  return {
    h1: "Pensjonssparing: regn på din egen sparing",
    title: tituloQueEntre(
      `Pensjonssparing: regn ut hva du har ved pensjon | ${ctx.nombrePais}`,
      `Pensjonssparing | ${ctx.nombrePais}`,
      "Pensjonssparing",
    ),
    description: "Se hvor mye du kan spare til pensjon med et månedlig sparebeløp, og hvor mye det kan gi i måneden, regnet i dagens pengeverdi.",
    intro: [
      "Den offentlige pensjonen holder sjelden til å beholde samme levestandard. Egen sparing, også litt, gjør stor forskjell hvis du begynner tidlig.",
      "Fyll inn alderen din, når du vil gå av med pensjon, hva du har spart og hvor mye du kan spare hver måned. Du ser beløpet ved pensjonsalder og hvor mye du kan ta ut av det hver måned.",
    ],
    comoSeCalcula: [
      "Sparingen vokser hver måned med realavkastningen, altså avkastningen minus prisveksten. Derfor er resultatet i dagens pengeverdi.",
      "Ved pensjonsalder betales beløpet ut i like store deler hver måned over de årene du velger. Det som er igjen, fortsetter å vokse i mellomtiden.",
      "Offentlig pensjon, skatt og kostnader til fond eller forvaltning er ikke med.",
    ],
    ejemplo: [
      `Med ${m(actual)} spart som 30-åring og ${m(aporte)} i måneden med 4 % realavkastning har du ${m(capital30)} når du er 65. Det holder til ${m(rentaMensual(capital30, 4, 25))} i måneden i 25 år.`,
      `Begynner du som 40-åring med de samme tallene, kommer du til ${m(capital40)}. Ti år gjør stor forskjell.`,
    ],
    faq: [
      {
        pregunta: "Hva er realavkastning?",
        respuesta: `Det er det en investering gir etter prisvekst. Gir en investering 7 % og prisveksten er 3 %, blir realavkastningen rundt ${real} %.`,
      },
      {
        pregunta: "Erstatter dette den offentlige pensjonen min?",
        respuesta: "Nei. Dette er din egen sparing i tillegg til offentlig pensjon og tjenestepensjon. Vil du vite hva du får i offentlig pensjon, sjekker du det hos pensjonsmyndigheten der du bor.",
      },
      {
        pregunta: "Hvor mye bør jeg spare til pensjon?",
        respuesta: "Det finnes ikke ett tall som passer for alle. En vanlig tommelfingerregel er 10 % til 15 % av inntekten. Det viktigste er å begynne så tidlig du kan.",
      },
    ],
    glosario: [
      { termino: "Realavkastning", definicion: "Det en investering gir utover prisveksten." },
      { termino: "Dagens pengeverdi", definicion: "Et fremtidig beløp uttrykt i hva det ville kunnet kjøpe i dag." },
    ],
  };
};
