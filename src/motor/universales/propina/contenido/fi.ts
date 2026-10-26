import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Tippilaskuri",
    title: tituloQueEntre(
      `Tippilaskuri: laske tippi ja jaa lasku | ${ctx.nombrePais}`,
      `Tippilaskuri | ${ctx.nombrePais}`,
      "Tippilaskuri",
    ),
    description: "Laske tippi, loppusumma ja jokaisen osuus, kun jaatte laskun. Voit myös pyöristää jokaisen osuuden ylöspäin tasasummaksi.",
    intro: [
      "Syötä laskun summa, tipin prosentti ja maksajien määrä. Näet tipin, loppusumman ja jokaisen osuuden.",
      "Jos haluat tasasummia, jokainen osuus pyöristetään ylöspäin ja ylijäämä menee tippiin.",
    ],
    comoSeCalcula: [
      "Tippi = laskun summa × tippiprosentti ÷ 100.",
      "Yhteensä = laskun summa + tippi.",
      "Jokaisen osuus on loppusumma jaettuna maksajien määrällä.",
    ],
    ejemplo: [
      `Kun lasku on ${m(cuenta)}, 10 prosentin tippi on ${m(propina)} ja loppusumma ${m(cuenta + propina)}.`,
      `Jos jaatte laskun kolmen kesken, kukin maksaa ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Paljonko tippiä pitää antaa?",
        respuesta: "Se riippuu paikan tavoista. Pohjoismaissa ja monessa muussa maassa palvelu sisältyy hintaan, joten tippi on vapaaehtoinen eikä sitä odoteta. Jos palvelu oli hyvää, summan pyöristäminen ylöspäin riittää. Matkoilla kannattaa tarkistaa paikallinen tapa ja se, onko laskuun jo lisätty palvelumaksu.",
      },
      {
        pregunta: "Lasketaanko tippi summasta ennen arvonlisäveroa vai sen jälkeen?",
        respuesta: "Useimmat laskevat sen laskun loppusummasta. Jos haluat laskea verottomasta summasta, syötä se laskun summaksi.",
      },
      {
        pregunta: "Miten lasken nopeasti 10 prosentin tipin?",
        respuesta: `Jaa laskun summa kymmenellä. Kun lasku on ${n(450)}, tippi on ${n(450 / 10)}.`,
      },
    ],
    glosario: [
      { termino: "Tippi", definicion: "Vapaaehtoinen lisäsumma, jonka annat palvelusta hinnan päälle. Toinen nimi on juomaraha." },
      { termino: "Palvelumaksu", definicion: "Maksu, jonka ravintola tai muu paikka on jo lisännyt laskuun palvelusta." },
    ],
  };
};
