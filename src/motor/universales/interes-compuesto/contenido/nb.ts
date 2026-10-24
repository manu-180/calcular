import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Renters rente-kalkulator",
    title: tituloQueEntre(
      `Renters rente: se hvordan sparingen din vokser | ${ctx.nombrePais}`,
      `Renters rente | ${ctx.nombrePais}`,
      "Renters rente",
    ),
    description: "Se hvordan pengene dine vokser med renters rente og månedlig sparing. Du får sluttbeløpet, hvor mye som er avkastning, og en tabell år for år.",
    intro: [
      "Med renters rente legges renten til saldoen og begynner selv å gi renter. Derfor vokser sparingen raskere og raskere jo lenger den får stå.",
      "Fyll inn hva du har i dag, hvor mye du kan spare hver måned, renten og antall år. Du ser sluttbeløpet og hvor stor del av det som er avkastning.",
    ],
    comoSeCalcula: [
      "Sluttbeløp = startbeløp × (1 + i) opphøyd i n + månedlig sparebeløp × ((1 + i) opphøyd i n − 1) ÷ i.",
      "Her er i den månedlige renten som svarer til hvor ofte renten legges til, og n er antall måneder.",
      "Det månedlige sparebeløpet settes inn på slutten av hver måned.",
    ],
    ejemplo: [
      `Starter du med ${m(capital)} og sparer ${m(aporte)} i måneden med 7 % i året, har du ${m(a10)} etter 10 år.`,
      `Fortsetter du 10 år til, vokser saldoen til ${m(a20)}. Det andre tiåret gir en god del mer enn det første.`,
    ],
    faq: [
      {
        pregunta: "Hva er forskjellen på enkel rente og renters rente?",
        respuesta:
          "Enkel rente regnes alltid av det opprinnelige beløpet. Renters rente regnes av beløpet pluss rentene du allerede har fått.",
      },
      {
        pregunta: "Hva er 72-regelen?",
        respuesta: `En rask måte å se hvor lang tid det tar før pengene er doblet. Del 72 på renten per år. Med 6 % dobles de på rundt ${formatearCifra(ctx, 72 / 6, 0)} år.`,
      },
      {
        pregunta: "Hvilken rente bør jeg regne med?",
        respuesta:
          "En som er rimelig for det du har tenkt å gjøre med pengene. Vil du se resultatet i dagens pengeverdi, bruker du renten minus den prisveksten du regner med.",
      },
    ],
    glosario: [
      { termino: "Rentekapitalisering", definicion: "At renten legges til saldoen, og hvor ofte det skjer." },
      { termino: "Renters rente", definicion: "Rente som regnes av saldoen pluss rentene som allerede er lagt til." },
    ],
  };
};
