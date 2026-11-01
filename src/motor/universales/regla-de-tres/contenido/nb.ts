import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  return {
    h1: "Reguladetri",
    title: tituloQueEntre(
      `Reguladetri: regn ut forholdstall med en gang | ${ctx.nombrePais}`,
      `Reguladetri | ${ctx.nombrePais}`,
      "Reguladetri",
    ),
    description: "Løs et proporsjonalt eller omvendt proporsjonalt forhold på sekunder. Fyll inn tre verdier og få den fjerde, med utregningen vist.",
    intro: [
      "Reguladetri fungerer når to størrelser henger sammen og du kjenner tre av de fire verdiene.",
      "Velg proporsjonalt eller omvendt proporsjonalt, fyll inn A, B og C, så regner kalkulatoren ut X.",
    ],
    comoSeCalcula: [
      "Proporsjonalt: X = B × C ÷ A. Brukes når begge størrelsene vokser sammen (flere kilo, høyere pris).",
      "Omvendt proporsjonalt: X = A × B ÷ C. Brukes når den ene vokser og den andre minker (flere personer, færre dager).",
    ],
    ejemplo: [
      `Koster 3 kilo ${m(precio3)}, koster 5 kilo ${m((precio3 * 5) / 3)}.`,
      `Maler 4 personer et hus på 12 dager, klarer 6 personer det på ${c((4 * 12) / 6)} dager.`,
    ],
    faq: [
      {
        pregunta: "Hvordan vet jeg om forholdet er proporsjonalt eller omvendt proporsjonalt?",
        respuesta: "Øker den ene størrelsen når den andre øker, er det proporsjonalt. Går den ene ned når den andre øker, er det omvendt proporsjonalt.",
      },
      {
        pregunta: "Hvordan regner jeg reguladetri for hånd?",
        respuesta: `Gang de to kjente verdiene på diagonalen og del på den som er igjen. Tilsvarer 3 enheter 600, tilsvarer 5 enheter 600 × 5 ÷ 3 = ${formatearNumero(ctx, (600 * 5) / 3)}.`,
      },
      {
        pregunta: "Kan jeg bruke reguladetri til prosent?",
        respuesta: `Ja. Er 200 lik 100 %, er 50 lik ${c((100 * 50) / 200)} %. Det er et proporsjonalt forhold med A = 200, B = 100 og C = 50.`,
      },
    ],
    glosario: [
      { termino: "Proporsjonalt forhold", definicion: "Begge størrelsene øker eller minker sammen." },
      { termino: "Omvendt proporsjonalt forhold", definicion: "Den ene størrelsen øker når den andre minker." },
    ],
  };
};
