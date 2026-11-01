import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Osoba od 160 lb i visine 5 ft 9 in ima BMI ${n((160 * KG_POR_LB) / (m * m))}, što je normalna telesna masa.`,
        `Zdrava telesna masa za tu visinu je od ${n((18.5 * m * m) / KG_POR_LB)} lb do ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Osoba od 70 kg i visine ${n(1.75, 2)} m ima BMI ${n(70 / (1.75 * 1.75))}, što je normalna telesna masa.`,
        `Zdrava telesna masa za tu visinu je od ${n(18.5 * 1.75 * 1.75)} kg do ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "BMI kalkulator",
    title: tituloQueEntre(
      `BMI kalkulator: indeks telesne mase (${ctx.nombrePais})`,
      "BMI kalkulator: indeks telesne mase",
      "BMI kalkulator",
    ),
    description:
      "Izračunajte indeks telesne mase (BMI) iz visine i telesne mase. Saznajte svoju kategoriju po SZO i raspon zdrave telesne mase za vašu visinu.",
    intro: [
      "Unesite telesnu masu i visinu. Dobićete BMI, kategoriju po klasifikaciji Svetske zdravstvene organizacije i raspon zdrave telesne mase za vašu visinu.",
      "BMI je opšti pokazatelj za odrasle. Ne zamenjuje pregled i savet lekara.",
    ],
    comoSeCalcula: [
      imperial
        ? "BMI = masa u funtama × 703 ÷ (visina u inčima × visina u inčima)."
        : "BMI = masa u kilogramima ÷ (visina u metrima × visina u metrima).",
      `Ispod ${n(18.5)} je pothranjenost, od ${n(18.5)} do ${n(24.9)} normalna telesna masa, od 25 do ${n(29.9)} prekomerna telesna masa, a od 30 naviše gojaznost.`,
      `Zdrava telesna masa obuhvata vrednosti pri kojima BMI za vašu visinu ostaje između ${n(18.5)} i ${n(24.9)}.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Koliki BMI je normalan?",
        respuesta: `Po SZO, za odrasle od ${n(18.5)} do ${n(24.9)}. Granice su iste za žene i muškarce.`,
      },
      {
        pregunta: "Da li BMI važi za svakoga?",
        respuesta:
          "Ne. Ne razlikuje mišiće od masnog tkiva, pa kod ljudi sa dosta mišićne mase može da ispadne previsok. Kod trudnica, dece i adolescenata tumači se drugačije.",
      },
      {
        pregunta: "Šta ako je BMI visok?",
        respuesta:
          "Razgovarajte o rezultatu sa lekarom ili nutricionistom. Najbolje ga je posmatrati zajedno sa drugim pokazateljima: obimom struka, ishranom i fizičkom aktivnošću.",
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Indeks telesne mase: odnos telesne mase i kvadrata visine." },
      { termino: "SZO", definicion: "Svetska zdravstvena organizacija. Određuje kategorije BMI za odrasle." },
    ],
  };
};
