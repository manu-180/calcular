import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  return {
    h1: "Puskurirahasto: kuinka suuren puskurin tarvitset?",
    title: tituloQueEntre(
      `Puskurirahasto: laske puskurisi koko | ${ctx.nombrePais}`,
      `Puskurirahasto | ${ctx.nombrePais}`,
      "Puskurirahasto",
    ),
    description: "Laske, kuinka suuren puskurirahaston tarvitset välttämättömien menojesi perusteella ja montako kuukautta sen säästäminen vie.",
    intro: [
      "Puskurirahasto on sivuun pantua rahaa asioihin, joita ei voi suunnitella: työpaikan menetykseen, sairastumiseen tai kiireelliseen korjaukseen kotona.",
      "Kun puskuri on olemassa, sinun ei tarvitse ottaa kulutusluottoa juuri silloin, kun on tiukinta. Syötä välttämättömät menosi ja montako kuukautta haluat pärjätä.",
    ],
    comoSeCalcula: [
      "Suositeltu puskuri = välttämättömät menot kuukaudessa × kuukausien määrä.",
      "Vielä säästettävää = suositeltu puskuri − jo säästetty summa.",
      "Kuukausia, kunnes puskuri on koossa = vielä säästettävä summa ÷ kuukausisäästö, pyöristettynä ylöspäin.",
    ],
    ejemplo: [
      `Kun välttämättömät menot ovat ${m(gastos)} kuukaudessa, kuuden kuukauden puskuri on ${m(gastos * 6)}.`,
      `Jos säästät ${m(aporte)} kuukaudessa, puskuri on koossa ${Math.ceil((gastos * 6) / aporte)} kuukaudessa.`,
    ],
    faq: [
      {
        pregunta: "Kuinka monen kuukauden menot puskurin pitäisi kattaa?",
        respuesta:
          "Yleinen nyrkkisääntö on vähintään kolmen kuukauden välttämättömät menot, mieluummin kuuden. Jos tulosi vaihtelevat, olet yrittäjä tai kotitaloudessa on vain yhdet tulot, kuuden tai jopa kahdentoista kuukauden puskuri on turvallisempi.",
      },
      {
        pregunta: "Missä puskuria kannattaa pitää?",
        respuesta: "Turvallisella tilillä, josta saat rahat samana päivänä, erillään käyttötilistä. Puskuria ei sijoiteta osakkeisiin. Sen pitää olla tallessa silloin, kun tarvitset sitä.",
      },
      {
        pregunta: "Kannattaako ensin säästää puskuri vai maksaa lainat pois?",
        respuesta: "Yleinen järjestys on säästää ensin yhden kuukauden menot, sitten maksaa pois kalliit luotot, kuten luottokorttivelka, ja vasta sen jälkeen kerätä puskuri täyteen.",
      },
    ],
    glosario: [
      { termino: "Välttämättömät menot", definicion: "Laskut, jotka on maksettava, vaikka tulot loppuisivat: asuminen, ruoka, sähkö ja terveys." },
      { termino: "Likviditeetti", definicion: "Kuinka nopeasti rahat saa käyttöön menettämättä niiden arvoa." },
    ],
  };
};
