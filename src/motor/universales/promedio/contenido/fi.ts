import { formatearCifra, formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const c = (x: number) => formatearCifra(ctx, x);
  const ponderado = (7 * 20 + 8 * 30 + 9 * 50) / (20 + 30 + 50);
  const simple = (7 + 8 + 9) / 3;
  return {
    h1: "Laske painotettu keskiarvo",
    title: tituloQueEntre(
      `Painotettu keskiarvo: laske keskiarvo painoilla | ${ctx.nombrePais}`,
      `Painotettu keskiarvo | ${ctx.nombrePais}`,
      "Painotettu keskiarvo",
    ),
    description: "Laske tavallinen tai painotettu keskiarvo enintään 10 arvosta ja jokaisen arvon painosta prosentteina, opintopisteinä tai kertoina.",
    intro: [
      "Syötä jokainen arvosana tai arvo ja sen paino. Näet painotetun ja tavallisen keskiarvon rinnakkain.",
      "Laskuri sopii koulun ja korkeakoulun arvosanoihin sekä kaikkiin keskiarvoihin, joissa osa arvoista painaa enemmän kuin muut.",
    ],
    comoSeCalcula: [
      "Tavallinen keskiarvo = arvojen summa ÷ arvojen määrä.",
      "Painotettu keskiarvo: kerro jokainen arvo painollaan, laske tulot yhteen ja jaa painojen summalla.",
      "Painojen ei tarvitse olla yhteensä 100, koska laskussa jaetaan niiden summalla.",
    ],
    ejemplo: [
      `Kun arvosanan 7 paino on 20 %, arvosanan 8 paino 30 % ja arvosanan 9 paino 50 %, painotettu keskiarvo on ${n(ponderado)}.`,
      `Samojen kolmen arvosanan tavallinen keskiarvo on ${n(simple)}. Arvosana 9 painaa eniten ja nostaa painotettua keskiarvoa.`,
    ],
    faq: [
      {
        pregunta: "Miten painotettu keskiarvo lasketaan?",
        respuesta: "Kerro jokainen arvo painollaan, laske tulot yhteen ja jaa painojen summalla.",
      },
      {
        pregunta: "Entä jos painot eivät ole yhteensä 100 %?",
        respuesta: `Se ei haittaa. Jos yhdestä kurssista saa 6 opintopistettä ja toisesta 4, käytä painoina lukuja 6 ja 4. Laskussa jaetaan painojen summalla, tässä ${c(6 + 4)}.`,
      },
      {
        pregunta: "Mitä eroa on tavallisella ja painotetulla keskiarvolla?",
        respuesta: "Tavallisessa keskiarvossa kaikki arvot painavat yhtä paljon. Painotetussa keskiarvossa jokainen arvo lasketaan painonsa mukaan.",
      },
    ],
    glosario: [
      { termino: "Paino", definicion: "Kuinka paljon arvo vaikuttaa lopulliseen keskiarvoon." },
      { termino: "Painotettu keskiarvo", definicion: "Keskiarvo, jossa jokainen arvo kerrotaan painollaan." },
    ],
  };
};
