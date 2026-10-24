import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhDia = (1000 * 4) / 1000;
  const kwhMes = kwhDia * 30;
  return {
    h1: "Laske laitteen sähkönkulutus ja hinta",
    title: tituloQueEntre(
      `Sähkönkulutus: laske laitteen kulutus ja hinta | ${ctx.nombrePais}`,
      `Sähkönkulutuslaskuri | ${ctx.nombrePais}`,
      "Sähkönkulutuslaskuri",
    ),
    description: "Laske, paljonko sähköä laite kuluttaa ja mitä se maksaa vuorokaudessa, kuukaudessa ja vuodessa tehon, käyttöajan ja kilowattitunnin hinnan perusteella.",
    intro: [
      "Syötä laitteen teho, montako tuntia sitä käytetään ja sähkön hinta kilowattitunnilta sähkölaskustasi. Näet kulutuksen ja kustannuksen.",
      "Laskurilla näet, mikä laite painaa sähkölaskussa eniten: lämpöpumppu, sähköpatteri, pakastin, sauna tai tietokone.",
    ],
    comoSeCalcula: [
      `kWh vuorokaudessa = watit × käyttötunnit ÷ ${n(1000)}.`,
      "kWh kuukaudessa = kWh vuorokaudessa × käyttöpäivät. Vuoden kulutus on kuukauden kulutus kertaa 12.",
      "Kustannus = kWh × sähkön hinta per kWh.",
    ],
    ejemplo: [
      `${n(1000)} watin laite, jota käytetään 4 tuntia päivässä, kuluttaa ${n(kwhDia)} kWh vuorokaudessa ja ${n(kwhMes)} kWh kuukaudessa.`,
      `Kun sähkö maksaa ${m(precio)} kilowattitunnilta, laitteen käyttö maksaa ${m(kwhMes * precio)} kuukaudessa.`,
    ],
    faq: [
      {
        pregunta: "Mikä on kilowattitunti?",
        respuesta: `Kilowattitunti (kWh) on energia, jonka ${n(1000)} watin laite käyttää tunnissa. Sähkölasku lasketaan kilowattitunteina.`,
      },
      {
        pregunta: "Käykö jääkaappi täydellä teholla koko vuorokauden?",
        respuesta: "Ei. Kompressori käynnistyy ja sammuu vuorotellen. Tällaisille laitteille on järkevämpää laskea 8 tai 10 tuntia vuorokaudessa kuin 24.",
      },
      {
        pregunta: "Miksi tulos ei vastaa tarkalleen sähkölaskua?",
        respuesta: "Laskuun tulee lisäksi perusmaksut, siirtomaksu, verot ja joskus tunneittain vaihtuva hinta. Laskuri näyttää vain sen, mitä laite itse kuluttaa.",
      },
    ],
    glosario: [
      { termino: "Watti (W)", definicion: "Tehon yksikkö eli se, kuinka paljon energiaa laite käyttää joka sekunti." },
      { termino: "Kilowattitunti (kWh)", definicion: `${n(1000)} wattia tunnin ajan. Siitä maksat sähkölaskussa.` },
    ],
  };
};
