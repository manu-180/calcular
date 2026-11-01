import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  // Cantidades con decimales: con el símbolo (l, gal) no hace falta declinar tras la cifra.
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        const conMargen = gal * (1 + MARGEN);
        return [
          `Prostor s stenami skupne dolžine 48 ft, višine 8 ft in s 40 ft² vrat in oken ima ${n(neta, 0)} ft² za barvanje.`,
          `Pri dveh slojih in izdatnosti barve 350 ft² na galono potrebujete ${n(gal, 2)} gal. Z rezervo ${n(conMargen, 2)} gal.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        const conMargen = litros * (1 + MARGEN);
        return [
          `Prostor s stenami skupne dolžine 14 m, višine ${n(2.6)} m in s 4 m² vrat in oken ima ${n(neta)} m² za barvanje.`,
          `Pri dveh slojih in izdatnosti barve 10 m² na liter potrebujete ${n(litros, 2)} l. Z rezervo ${n(conMargen, 2)} l.`,
        ];
      })();
  return {
    h1: "Izračun barve za stene",
    title: tituloQueEntre(
      `Koliko barve za stene: izračun ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      "Koliko barve za stene: izračun",
      "Izračun barve",
    ),
    description:
      "Izračunajte, koliko barve potrebujete za stene glede na njihove mere, vrata in okna, število slojev in izdatnost z embalaže.",
    intro: [
      "Vnesite dolžino in višino sten (ali kar površino), koliko zavzemajo vrata in okna ter koliko slojev načrtujete.",
      "Kalkulator doda 10 % več, da vam barve ne zmanjka sredi dela.",
    ],
    comoSeCalcula: [
      "Površina = skupna dolžina sten × višina, brez vrat in oken.",
      "Barva = površina × število slojev ÷ izdatnost.",
      `Na koncu se doda rezerva ${n(MARGEN * 100, 0)} %.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Koliko kvadratnih metrov pokrije liter barve?",
        respuesta: "Navadna notranja barva z enim slojem pokrije približno 8 do 12 m² na liter. Točen podatek piše na embalaži.",
      },
      {
        pregunta: "Koliko slojev je potrebnih?",
        respuesta: "Običajno dva. Nov omet, stene, ki močno vpijajo, ali velika sprememba barve lahko zahtevajo tudi tretji sloj.",
      },
      {
        pregunta: "Ali moram odšteti vrata in okna?",
        respuesta: "Da, če so velika. Majhnih oken raje ne odštevajte: presežek pokrije robove in kote.",
      },
    ],
    glosario: [
      { termino: "Izdatnost", definicion: "Koliko površine pokrije liter barve z enim slojem." },
      { termino: "Sloj", definicion: "Vsak nanos barve na steno." },
    ],
  };
};
