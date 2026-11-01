import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const yhden = imperial ? "mailin" : "kilometrin";
  const kohden = imperial ? "mailia kohden" : "kilometriä kohden";
  const lyhyt = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Laske juoksuvauhtisi",
    title: tituloQueEntre(
      `Juoksuvauhti: laske vauhti, aika ja matka | ${ctx.nombrePais}`,
      `Juoksuvauhtilaskuri | ${ctx.nombrePais}`,
      "Juoksuvauhtilaskuri",
    ),
    description: `Laske juoksuvauhtisi ${kohden}, loppuaikasi tai matkasi. Valmiina ovat 5 km, 10 km, puolimaraton ja maraton.`,
    intro: [
      "Kun tiedät kaksi kolmesta arvosta (matka, aika ja vauhti), laskuri antaa kolmannen. Käytä sitä kilpailun suunnitteluun tai harjoituksen seurantaan.",
      "Valmiina vaihtoehtoina ovat 5 km, 10 km, puolimaraton ja maraton.",
    ],
    comoSeCalcula: [
      `Vauhti = aika ÷ matka, minuutteina ja sekunteina ${kohden}.`,
      "Aika = vauhti × matka.",
      "Matka = aika ÷ vauhti. Keskinopeus on matka jaettuna tuntien määrällä.",
    ],
    ejemplo: imperial
      ? [
          `Kun juokset 3 mailia 27 minuutissa, vauhtisi on ${ritmoTexto(27 * 20)} mailia kohden eli ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Puolimaraton (${formatearNumero(ctx, media, 2)} ${lyhyt}) vauhdilla ${ritmoTexto(ritmoMedia)} mailia kohden kestää ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          `Kun juokset 10 km 50 minuutissa, vauhtisi on ${ritmoTexto(50 * 6)} kilometriä kohden eli ${formatearNumero(ctx, 10 / (50 / 60), 0)} km/h.`,
          `Puolimaraton (${formatearNumero(ctx, media, 1)} ${lyhyt}) vauhdilla ${ritmoTexto(ritmoMedia)} kilometriä kohden kestää ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Miten lasken vauhtini ${kohden}?`,
        respuesta: imperial
          ? `Muuta aika minuuteiksi ja jaa mailien määrällä. 3 mailia ajassa 28 minuuttia 30 sekuntia on ${formatearNumero(ctx, 28.5 / 3, 1)} minuuttia mailia kohden eli ${ritmoTexto((28.5 * 60) / 3)}.`
          : `Muuta aika minuuteiksi ja jaa kilometrien määrällä. 10 km ajassa 55 minuuttia on ${formatearNumero(ctx, 55 / 10, 1)} minuuttia kilometriä kohden eli ${ritmoTexto((55 * 60) / 10)}.`,
      },
      {
        pregunta: "Mikä on hyvä vauhti aloittelijalle?",
        respuesta: "Vauhti, jolla pystyt vielä puhumaan juostessasi. Vauhti kovenee sitä mukaa kuin kuntosi paranee.",
      },
      {
        pregunta: "Kuinka pitkä maraton on?",
        respuesta: `Maraton on ${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} mailia). Puolimaraton on puolet siitä.`,
      },
    ],
    glosario: [
      { termino: "Vauhti", definicion: `Aika, joka kuluu yhden ${yhden} juoksemiseen.` },
      { termino: "Keskinopeus", definicion: "Matka, jonka ehdit kulkea tunnissa." },
    ],
  };
};
