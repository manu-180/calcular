import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  return {
    h1: "Reguladetri",
    title: tituloQueEntre(
      `Reguladetri: beregn forholdet med det samme | ${ctx.nombrePais}`,
      `Reguladetri | ${ctx.nombrePais}`,
      "Reguladetri",
    ),
    description: "Løs et ligefremt eller omvendt forhold på få sekunder. Skriv tre værdier, og få den fjerde med hele udregningen vist.",
    intro: [
      "Reguladetri bruges, når to størrelser hænger sammen, og du kender tre af de fire værdier.",
      "Vælg ligefrem eller omvendt forhold, skriv A, B og C, så regner beregneren X ud.",
    ],
    comoSeCalcula: [
      "Ligefrem: X = B × C ÷ A. Bruges, når begge størrelser vokser sammen (flere kilo, højere pris).",
      "Omvendt: X = A × B ÷ C. Bruges, når den ene vokser og den anden falder (flere personer, færre dage).",
    ],
    ejemplo: [
      `Hvis 3 kilo koster ${m(precio3)}, koster 5 kilo ${m((precio3 * 5) / 3)}.`,
      `Hvis 4 personer maler et hus på 12 dage, klarer 6 personer det på ${c((4 * 12) / 6)} dage.`,
    ],
    faq: [
      {
        pregunta: "Hvordan ved jeg, om forholdet er ligefremt eller omvendt?",
        respuesta: "Stiger den ene størrelse, når den anden stiger, er det ligefremt. Falder den ene, når den anden stiger, er det omvendt.",
      },
      {
        pregunta: "Hvordan regner jeg reguladetri i hånden?",
        respuesta: `Gang de to kendte værdier på diagonalen, og del med den sidste. Hvis 3 svarer til 600, svarer 5 til 600 × 5 ÷ 3 = ${formatearNumero(ctx, (600 * 5) / 3)}.`,
      },
      {
        pregunta: "Kan jeg bruge reguladetri til procent?",
        respuesta: `Ja. Hvis 200 er 100 %, er 50 lig med ${c((100 * 50) / 200)} %. Det er et ligefremt forhold med A = 200, B = 100 og C = 50.`,
      },
    ],
    glosario: [
      { termino: "Ligefremt forhold", definicion: "Begge størrelser stiger eller falder sammen." },
      { termino: "Omvendt forhold", definicion: "Den ene størrelse stiger, når den anden falder." },
    ],
  };
};
