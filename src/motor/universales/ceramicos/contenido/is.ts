import { formaIs } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const flisar = (x: number) => `${n(x, 0)} ${formaIs(x, "flís", "flísar")}`;
  const kassar = (x: number) => `${n(x, 0)} ${formaIs(x, "kassi", "kassar")}`;
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Á 150 ft² með flísum sem eru 12 × 12 in (1 ft² hver) og 10% afföllum þarftu ${flisar(piezas)}.`,
          `Ef 10 flísar eru í kassa verða það ${kassar(Math.ceil(piezas / 10))}.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Á 20 m² með flísum sem eru 60 × 60 cm (${n(pieza)} m² hver) og 10% afföllum þarftu ${flisar(piezas)}.`,
          `Ef 4 flísar eru í kassa verða það ${kassar(Math.ceil(piezas / 4))}.`,
        ];
      })();
  return {
    h1: "Hvað þarf ég margar flísar?",
    title: tituloQueEntre(
      `Hvað þarf ég margar flísar á gólf eða vegg? | ${ctx.nombrePais}`,
      `Hvað þarf ég margar flísar? | ${ctx.nombrePais}`,
      "Hvað þarf ég margar flísar?",
    ),
    description: "Reiknaðu hvað þú þarft margar flísar á gólf eða vegg, með afföllum, og hvað þú þarft að kaupa marga kassa.",
    intro: [
      "Sláðu inn flötinn, stærð flísanna og hvað margar eru í kassa. Þá sérðu hvað þú þarft að kaupa margar flísar og marga kassa.",
      "Afföllin dekka afskurð við brúnir og einstaka flís sem brotnar.",
    ],
    comoSeCalcula: [
      `Flatarmál flísar = lengd × breidd, umreiknað í ${imperial ? "ferfet" : "fermetra"}.`,
      "Flísar = flötur × (1 + afföll ÷ 100) ÷ flatarmál flísar, námundað upp.",
      "Kassar = flísar ÷ flísar í kassa, námundað upp.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvað á ég að reikna með miklum afföllum?",
        respuesta: "10% ef lagt er beint. Ef lagt er á ská, í fiskibeinamynstur eða í rými þar sem þarf að skera mikið skaltu reikna með 15 til 20%.",
      },
      {
        pregunta: "Þarf ég að reikna með fúgunum?",
        respuesta: "Nei. Fúgurnar eru aðeins nokkrir millimetrar á breidd og afföllin dekka muninn.",
      },
      {
        pregunta: "Á ég að kaupa nokkrar flísar aukalega?",
        respuesta: "Já, nokkrar úr sömu framleiðslulotu. Ef flís brotnar seinna getur verið erfitt að finna nákvæmlega sama litatón.",
      },
    ],
    glosario: [
      { termino: "Afföll", definicion: "Aukahlutfallið sem þú kaupir vegna afskurðar og flísa sem brotna." },
      { termino: "Veggflísar og gólfflísar", definicion: "Veggflísar eru ætlaðar á veggi en gólfflísar á gólf, þar sem þær þola meira álag." },
    ],
  };
};
