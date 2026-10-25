import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const total = formatearCifra(ctx, (1 - 0.7 * 0.9) * 100);
  return {
    h1: "Alennuslaskuri",
    title: tituloQueEntre(
      `Alennuslaskuri: laske hinta alennuksen jälkeen | ${ctx.nombrePais}`,
      `Alennuslaskuri | ${ctx.nombrePais}`,
      "Alennuslaskuri",
    ),
    description: "Laske hinta alennuksen jälkeen ja paljonko säästät, myös kun kaksi alennusta tulee peräkkäin, esimerkiksi 30 % ja sen päälle vielä 10 %.",
    intro: [
      "Syötä hinta ja alennus, niin näet heti, mitä maksat ja paljonko säästät.",
      "Jos saat vielä lisäalennuksen, syötä sekin. Kaksi peräkkäistä alennusta ei koskaan ole pelkkä niiden summa.",
    ],
    comoSeCalcula: [
      "Alennettu hinta = normaalihinta × (1 − alennus ÷ 100).",
      "Lisäalennus lasketaan jo alennetusta hinnasta.",
      "Säästö on normaalihinta miinus alennettu hinta.",
    ],
    ejemplo: [
      `Tuote, jonka hinta on ${m(precio)}, maksaa 25 prosentin alennuksella ${m(precio * 0.75)}.`,
      `Kun alennus on ensin 30 % ja sitten vielä 10 %, tuote maksaa ${m(precio * 0.7 * 0.9)}. Se on yhteensä ${total} % halvempi, ei 40 %.`,
    ],
    faq: [
      {
        pregunta: "Miten alennus lasketaan?",
        respuesta: "Kerro hinta alennusprosentilla ja jaa sadalla. Tulos on säästösi. Vähennä se hinnasta, niin saat maksettavan hinnan.",
      },
      {
        pregunta: "Onko 30 % ja 10 % alennus sama kuin 40 %?",
        respuesta: `Ei ole. Toinen alennus lasketaan jo alennetusta hinnasta. Yhteensä säästät siis ${total} %.`,
      },
      {
        pregunta: "Miten saan normaalihinnan selville alennetusta hinnasta?",
        respuesta: `Jaa alennettu hinta luvulla (1 − alennus ÷ 100). Kun alennus on 25 %, jaat luvulla ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Alennus", definicion: "Prosenttiosuus, joka vähennetään normaalihinnasta." },
      { termino: "Alennus yhteensä", definicion: "Montako prosenttia säästät kaikkiaan, kun alennuksia on useampi." },
    ],
  };
};
