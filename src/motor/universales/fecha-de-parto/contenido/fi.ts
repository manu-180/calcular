import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Laskettu aika: laske synnytyksen arvioitu päivä",
    title: tituloQueEntre(
      `Laskettu aika: laske raskausviikot ja LA | ${ctx.nombrePais}`,
      `Laskettu aika -laskuri | ${ctx.nombrePais}`,
      "Laskettu aika -laskuri",
    ),
    description: "Laske laskettu aika (LA) viimeisten kuukautisten tai hedelmöityksen perusteella ja katso, millä raskausviikolla olet tänään.",
    intro: [
      "Syötä viimeisten kuukautisten ensimmäinen päivä (tai hedelmöityspäivä, jos tiedät sen). Näet lasketun ajan, raskausviikon ja raskauskolmanneksen.",
      "Tulos on arvio. Se ei korvaa kätilön, terveydenhoitajan tai lääkärin arviota, ja ultraäänitutkimus antaa varmimman päivämäärän.",
    ],
    comoSeCalcula: [
      "Laskenta noudattaa Naegelen sääntöä: laskettu aika on viimeisten kuukautisten ensimmäinen päivä plus 280 päivää (40 viikkoa).",
      "Jos kiertosi on pidempi tai lyhyempi kuin 28 päivää, päivämäärä siirtyy saman verran.",
      "Hedelmöityspäivästä lisätään 266 päivää (38 viikkoa).",
      "Raskausviikot lasketaan viimeisistä kuukautisista, ei hedelmöityksestä.",
    ],
    ejemplo: [
      `Kun viimeiset kuukautiset alkoivat ${f(fum)} ja kierto on 28 päivää, laskettu aika on ${f(fpp)}.`,
      `Jos kierto on 32 päivää, laskettu aika siirtyy 4 päivää myöhemmäksi: ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Miten laskettu aika lasketaan?",
        respuesta: "Viimeisten kuukautisten ensimmäiseen päivään lisätään 280 päivää. Nopea nyrkkisääntö antaa lähes saman päivän: lisää 7 päivää, vähennä 3 kuukautta ja lisää vuosi.",
      },
      {
        pregunta: "Miksi raskausviikot lasketaan viimeisistä kuukautisista?",
        respuesta: "Koska lähes kaikki tietävät sen päivän. Siksi hedelmöitystä ei ole vielä tapahtunut raskausviikolla 2.",
      },
      {
        pregunta: "Kuinka moni vauva syntyy laskettuna päivänä?",
        respuesta: "Harva. Useimmat syntyvät raskausviikoilla 37 ja 42 välillä, joten laskettu aika on suuntaa antava eikä tarkka päivä.",
      },
    ],
    glosario: [
      { termino: "Laskettu aika (LA)", definicion: "Arvioitu synnytyspäivä, jolloin raskaus on kestänyt 40 viikkoa." },
      { termino: "Viimeiset kuukautiset", definicion: "Viimeisimmän kuukautisvuodon ensimmäinen päivä." },
      { termino: "Naegelen sääntö", definicion: "Tapa arvioida laskettu aika lisäämällä viimeisiin kuukautisiin 280 päivää." },
    ],
  };
};
