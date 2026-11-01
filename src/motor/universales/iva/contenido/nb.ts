import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `Mva-kalkulator for ${ctx.nombrePais}`,
    title: tituloQueEntre(
      `Mva-kalkulator (${tasa}): regn ut merverdiavgift | ${ctx.nombrePais}`,
      `Mva-kalkulator (${tasa}): regn ut mva. | ${ctx.nombrePais}`,
      `Mva-kalkulator (${tasa}) | ${ctx.nombrePais}`,
      `Mva-kalkulator (${tasa})`,
    ),
    description: `Legg ${tasa} mva. til eller trekk den ut av en hvilken som helst pris i ett steg. Du ser pris eks. mva., mva. og pris inkl. mva.`,
    intro: [
      `Den alminnelige mva-satsen som brukes her for ${ctx.nombrePais}, er ${tasa}.`,
      "Velg om du vil legge mva. til en pris eks. mva. eller trekke ut mva. fra en pris der den allerede er med. Fyll deretter inn beløpet.",
    ],
    comoSeCalcula: [
      "Legg til mva.: mva. = pris eks. mva. × mva-sats ÷ 100. Pris inkl. mva. = pris eks. mva. + mva.",
      "Trekk ut mva.: pris eks. mva. = pris inkl. mva. ÷ (1 + mva-sats ÷ 100). Mva. er forskjellen.",
      "Har varen en annen mva-sats, kan du fylle den inn under «Annen mva-sats».",
    ],
    ejemplo: [
      `For å legge mva. til ${precio} ganger du beløpet med ${tasa} og legger resultatet til prisen.`,
      `For å se hvor mye mva. som er i ${precio}, deler du beløpet på 1 pluss mva-satsen og trekker resultatet fra ${precio}.`,
    ],
    faq: [
      {
        pregunta: "Hvordan trekker jeg ut mva. fra en pris?",
        respuesta: "Del prisen på 1 pluss mva-satsen som desimaltall. Det som blir igjen, er prisen eks. mva., og forskjellen er merverdiavgiften.",
      },
      {
        pregunta: "Hvorfor kan jeg ikke bare trekke prosenten fra totalen?",
        respuesta: "Fordi mva. ble regnet av den lavere prisen eks. mva. Trekker du prosenten fra totalen, tar du bort for mye.",
      },
      {
        pregunta: `Gjelder ${tasa} mva. på alt?`,
        respuesta: "Ikke alltid. Noen varer og tjenester har lavere sats eller er fritatt for mva., for eksempel matvarer, persontransport, helsetjenester og undervisning. Bruk da «Annen mva-sats».",
      },
    ],
    glosario: [
      { termino: "Mva.", definicion: "Merverdiavgift, en avgift som legges på prisen for varer og tjenester." },
      { termino: "Pris eks. mva.", definicion: "Prisen før merverdiavgiften er lagt til." },
    ],
  };
};
