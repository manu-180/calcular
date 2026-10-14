import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Voor 150 ft² met tegels van 12 × 12 in (1 ft² per stuk) en 10% snijverlies heb je ${n(piezas, 0)} tegels nodig.`,
          `Zitten er 10 tegels in een doos, dan zijn dat ${n(Math.ceil(piezas / 10), 0)} dozen.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Voor 20 m² met tegels van 60 × 60 cm (${n(pieza)} m² per stuk) en 10% snijverlies heb je ${n(piezas, 0)} tegels nodig.`,
          `Zitten er 4 tegels in een doos, dan zijn dat ${n(Math.ceil(piezas / 4), 0)} dozen.`,
        ];
      })();
  return {
    h1: "Tegels berekenen",
    title: tituloQueEntre(`Tegels berekenen in ${ctx.nombrePais}`, "Tegels berekenen"),
    description: "Bereken hoeveel tegels je nodig hebt voor een vloer of wand, met snijverlies erbij, en hoeveel dozen je moet kopen.",
    intro: [
      "Vul de oppervlakte in, de maat van een tegel en hoeveel tegels er in een doos zitten. Je ziet hoeveel tegels en dozen je moet kopen.",
      "Het snijverlies is voor de zaagsneden langs de randen en een tegel die breekt.",
    ],
    comoSeCalcula: [
      `Oppervlakte van één tegel = lengte × breedte, omgerekend naar ${imperial ? "vierkante voet" : "vierkante meter"}.`,
      "Tegels = oppervlakte × (1 + snijverlies ÷ 100) ÷ oppervlakte van één tegel, naar boven afgerond.",
      "Dozen = tegels ÷ tegels per doos, naar boven afgerond.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hoeveel snijverlies moet je rekenen?",
        respuesta: "10% als je recht legt. Leg je diagonaal of in visgraat, of heeft de ruimte veel hoeken, reken dan 15% tot 20%.",
      },
      {
        pregunta: "Moet je rekening houden met de voegen?",
        respuesta: "Nee. Een voeg is maar een paar millimeter breed en het snijverlies vangt dat verschil al op.",
      },
      {
        pregunta: "Moet je extra tegels kopen?",
        respuesta: "Ja, een paar reservetegels uit dezelfde partij. Breekt er later een, dan vind je vaak niet meer precies dezelfde kleur.",
      },
    ],
    glosario: [
      { termino: "Snijverlies", definicion: "Het extra percentage dat je koopt voor zaagsneden en breuk." },
      { termino: "Partij", definicion: "Een productieserie. Tegels uit verschillende partijen kunnen net iets anders van kleur zijn." },
    ],
  };
};
