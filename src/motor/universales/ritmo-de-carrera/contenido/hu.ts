import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const enkent = imperial ? "mérföldenként" : "kilométerenként";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  const millasMaraton = DISTANCIAS_KM.maraton / KM_POR_MILLA;
  return {
    h1: "Futótempó kalkulátor",
    title: tituloQueEntre(`Futótempó kalkulátor: ${ctx.nombrePais}`, `Futótempó kalkulátor: tempó perc/${corto}`, "Futótempó kalkulátor"),
    description: `Számold ki a tempót (perc/${corto}), a célidőt vagy a távot 5 és 10 kilométeres versenyre, félmaratonra vagy maratonra.`,
    intro: [
      "A három adat (táv, idő és tempó) közül kettőből megkapod a harmadikat. Jól jön a verseny megtervezéséhez vagy az edzés ellenőrzéséhez.",
      "Az 5 és 10 kilométeres táv, a félmaraton és a maraton már szerepel a listában.",
    ],
    comoSeCalcula: [
      `Tempó = idő ÷ táv, percben és másodpercben, ${enkent}.`,
      "Idő = tempó × táv.",
      "Táv = idő ÷ tempó. Az átlagsebesség a táv osztva az órák számával.",
    ],
    ejemplo: imperial
      ? [
          `3 mérföld 27 perc alatt: a tempó 9:00 perc/mi, vagyis ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `A félmaratont (${formatearNumero(ctx, media, 2)} mi) ${ritmoTexto(ritmoMedia)} perc/mi tempóval ennyi idő alatt futod le: ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 km 50 perc alatt: a tempó 5:00 perc/km, vagyis 12 km/h.",
          `A félmaratont (${formatearNumero(ctx, media, 1)} ${corto}) ${ritmoTexto(ritmoMedia)} perc/km tempóval ennyi idő alatt futod le: ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Hogyan számolom ki a tempót ${enkent}?`,
        respuesta: imperial
          ? `Váltsd át az időt percre, és oszd el a mérföldek számával. 3 mérföld 28 perc 30 másodperc alatt: ${formatearNumero(ctx, 9.5, 1)} perc mérföldenként, vagyis 9:30.`
          : `Váltsd át az időt percre, és oszd el a kilométerek számával. 10 km 55 perc alatt: ${formatearNumero(ctx, 5.5, 1)} perc kilométerenként, vagyis 5:30.`,
      },
      {
        pregunta: "Milyen tempó jó kezdőknek?",
        respuesta: "Olyan, amelynél futás közben még beszélgetni tudsz. Ahogy javul az állóképességed, a tempó fokozatosan gyorsul.",
      },
      {
        pregunta: "Milyen hosszú a maraton?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, millasMaraton, 1)} mérföld). A félmaraton ennek a fele.`,
      },
    ],
    glosario: [
      { termino: "Tempó", definicion: "Mennyi idő alatt futsz le egy kilométert vagy egy mérföldet." },
      { termino: "Átlagsebesség", definicion: "Az egy óra alatt megtett táv." },
    ],
  };
};
