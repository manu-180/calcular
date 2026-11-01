import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Oseba, ki tehta 160 lb in je visoka 5 ft 9 in, ima ITM ${n((160 * KG_POR_LB) / (m * m))}, kar je normalna telesna masa.`,
        `Zdrava telesna masa pri tej višini je od ${n((18.5 * m * m) / KG_POR_LB)} lb do ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Oseba, ki tehta 70 kg in je visoka ${n(1.75, 2)} m, ima ITM ${n(70 / (1.75 * 1.75))}, kar je normalna telesna masa.`,
        `Zdrava telesna masa pri tej višini je od ${n(18.5 * 1.75 * 1.75)} kg do ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "Izračun ITM",
    title: tituloQueEntre(
      `Izračun ITM: indeks telesne mase (${ctx.nombrePais})`,
      "Izračun ITM: indeks telesne mase",
      "Izračun ITM",
    ),
    description:
      "Izračunajte indeks telesne mase (ITM) iz višine in telesne mase. Preverite svojo kategorijo po SZO in razpon zdrave telesne mase za svojo višino.",
    intro: [
      "Vnesite telesno maso in višino. Dobili boste ITM, kategorijo po razvrstitvi Svetovne zdravstvene organizacije in razpon zdrave telesne mase za svojo višino.",
      "ITM je splošen kazalnik za odrasle. Ne nadomešča pregleda in nasveta zdravnika.",
    ],
    comoSeCalcula: [
      imperial
        ? "ITM = masa v funtih × 703 ÷ (višina v palcih × višina v palcih)."
        : "ITM = masa v kilogramih ÷ (višina v metrih × višina v metrih).",
      `Pod ${n(18.5)} je podhranjenost, od ${n(18.5)} do ${n(24.9)} normalna telesna masa, od 25 do ${n(29.9)} čezmerna telesna masa, od 30 naprej pa debelost.`,
      `Zdrava telesna masa zajema vrednosti, pri katerih ITM za vašo višino ostane med ${n(18.5)} in ${n(24.9)}.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kakšen je normalen ITM?",
        respuesta: `Po SZO za odrasle od ${n(18.5)} do ${n(24.9)}. Meje so enake za ženske in moške.`,
      },
      {
        pregunta: "Ali ITM velja za vsakogar?",
        respuesta:
          "Ne. Ne razlikuje mišic od maščobnega tkiva, zato je lahko pri ljudeh z veliko mišične mase previsok. Pri nosečnicah, otrocih in mladostnikih se razlaga drugače.",
      },
      {
        pregunta: "Kaj če je ITM visok?",
        respuesta:
          "O rezultatu se pogovorite z zdravnikom ali dietetikom. Najbolje ga je opazovati skupaj z drugimi kazalniki: obsegom pasu, prehrano in telesno dejavnostjo.",
      },
    ],
    glosario: [
      { termino: "ITM", definicion: "Indeks telesne mase: razmerje med telesno maso in kvadratom višine." },
      { termino: "SZO", definicion: "Svetovna zdravstvena organizacija. Določa kategorije ITM za odrasle." },
    ],
  };
};
