import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Egy szoba falainak hossza 48 ft, magassága 8 ft, az ajtók és ablakok 40 ft² felületet foglalnak el: a festendő felület ${n(neta, 0)} ft².`,
          `Két réteggel és gallononként 350 ft² kiadósságú festékkel ${n(gal, 2)} gallon kell. Ráhagyással: ${n(gal * (1 + MARGEN), 2)} gallon.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Egy szoba falainak hossza 14 m, magassága ${n(2.6)} m, az ajtók és ablakok 4 m² felületet foglalnak el: a festendő felület ${n(neta)} m².`,
          `Két réteggel és literenként 10 m² kiadósságú festékkel ${n(litros, 2)} liter kell. Ráhagyással: ${n(litros * (1 + MARGEN), 2)} liter.`,
        ];
      })();
  return {
    h1: "Festékszükséglet kalkulátor",
    title: tituloQueEntre(`Festékszükséglet kalkulátor: ${ctx.nombrePais}`, "Festékszükséglet kalkulátor: mennyi festék kell a falra", "Festékszükséglet kalkulátor"),
    description: "Számold ki, mennyi festék kell a falakra a méretek, az ajtók és ablakok, a rétegek száma és a dobozon szereplő kiadósság alapján.",
    intro: [
      "Add meg a falak hosszát és magasságát (vagy rögtön a felületet), mennyit foglalnak el az ajtók és ablakok, és hány réteget tervezel.",
      "A kalkulátor 10% ráhagyást számol, hogy ne fogyjon ki a festék a munka közepén.",
    ],
    comoSeCalcula: [
      "Felület = a falak teljes hossza × magasság, az ajtók és ablakok nélkül.",
      "Festék = felület × rétegek száma ÷ kiadósság.",
      `Végül hozzáadunk ${n(MARGEN * 100, 0)}% ráhagyást.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hány négyzetmétert fed le egy liter festék?",
        respuesta: "Egy átlagos beltéri falfesték egy réteggel literenként nagyjából 8 és 12 m² közötti felületet fed le. A pontos értéket a dobozon találod.",
      },
      {
        pregunta: "Hány réteg festék kell?",
        respuesta: "Általában kettő. Új vakolatnál, nagyon nedvszívó falnál vagy erős színváltásnál harmadik réteg is kellhet.",
      },
      {
        pregunta: "Le kell vonni az ajtókat és ablakokat?",
        respuesta: "Igen, ha nagyok. A kis ablakokat jobb nem levonni: a többlet elmegy a széleken és a sarkok átfestésén.",
      },
    ],
    glosario: [
      { termino: "Kiadósság", definicion: "Mekkora felületet fed le egy liter festék egy réteggel." },
      { termino: "Réteg", definicion: "A falra felvitt festék egy-egy rétege." },
    ],
  };
};
