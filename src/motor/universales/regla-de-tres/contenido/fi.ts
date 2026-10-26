import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  return {
    h1: "Verrantolaskuri",
    title: tituloQueEntre(
      `Verrantolaskuri: ratkaise verranto nopeasti | ${ctx.nombrePais}`,
      `Verrantolaskuri | ${ctx.nombrePais}`,
      "Verrantolaskuri",
    ),
    description: "Ratkaise suora tai käänteinen verranto muutamassa sekunnissa. Syötä kolme arvoa, niin saat neljännen ja näet koko laskun.",
    intro: [
      "Verranto toimii, kun kaksi suuretta riippuu toisistaan ja tiedät neljästä arvosta kolme.",
      "Valitse suora tai käänteinen verranto ja syötä A, B ja C. Laskuri laskee X:n.",
    ],
    comoSeCalcula: [
      "Suora verranto: X = B × C ÷ A. Sitä käytetään, kun molemmat suureet kasvavat yhdessä (enemmän kiloja, korkeampi hinta).",
      "Käänteinen verranto: X = A × B ÷ C. Sitä käytetään, kun toinen kasvaa ja toinen pienenee (enemmän tekijöitä, vähemmän päiviä).",
    ],
    ejemplo: [
      `Jos 3 kiloa maksaa ${m(precio3)}, 5 kiloa maksaa ${m((precio3 * 5) / 3)}.`,
      `Jos 4 henkilöä maalaa talon 12 päivässä, 6 henkilöä maalaa sen ${c((4 * 12) / 6)} päivässä.`,
    ],
    faq: [
      {
        pregunta: "Miten tiedän, onko verranto suora vai käänteinen?",
        respuesta: "Jos toinen suure kasvaa, kun toinen kasvaa, verranto on suora. Jos toinen pienenee, kun toinen kasvaa, verranto on käänteinen.",
      },
      {
        pregunta: "Miten verranto ratkaistaan käsin?",
        respuesta: `Kerro ristiin: kerro vinottain olevat tunnetut arvot keskenään ja jaa jäljelle jäävällä. Jos 3 vastaa arvoa 600, niin 5 vastaa arvoa 600 × 5 ÷ 3 = ${formatearNumero(ctx, (600 * 5) / 3)}.`,
      },
      {
        pregunta: "Voinko laskea verrannolla prosentteja?",
        respuesta: `Voit. Jos 200 on 100 %, niin 50 on ${c((100 * 50) / 200)} %. Se on suora verranto, jossa A = 200, B = 100 ja C = 50.`,
      },
    ],
    glosario: [
      { termino: "Suora verranto", definicion: "Molemmat suureet kasvavat tai pienenevät samassa suhteessa." },
      { termino: "Käänteinen verranto", definicion: "Toinen suure kasvaa, kun toinen pienenee." },
    ],
  };
};
