import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Osoba od 160 lb i visine 5 ft 9 in ima BMI ${n((160 * KG_POR_LB) / (m * m))}, što je normalna tjelesna težina.`,
        `Zdrava tjelesna težina za tu visinu je od ${n((18.5 * m * m) / KG_POR_LB)} lb do ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Osoba od 70 kg i visine ${n(1.75, 2)} m ima BMI ${n(70 / (1.75 * 1.75))}, što je normalna tjelesna težina.`,
        `Zdrava tjelesna težina za tu visinu je od ${n(18.5 * 1.75 * 1.75)} kg do ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "BMI kalkulator",
    title: tituloQueEntre(
      `BMI kalkulator: indeks tjelesne mase (${ctx.nombrePais})`,
      "BMI kalkulator: indeks tjelesne mase",
      "BMI kalkulator",
    ),
    description:
      "Izračunajte indeks tjelesne mase (BMI) iz visine i tjelesne težine. Saznajte svoju kategoriju prema SZO i raspon zdrave tjelesne težine za svoju visinu.",
    intro: [
      "Unesite tjelesnu težinu i visinu. Dobit ćete BMI, kategoriju prema klasifikaciji Svjetske zdravstvene organizacije i raspon zdrave tjelesne težine za svoju visinu.",
      "BMI je opći pokazatelj za odrasle. Ne zamjenjuje pregled i savjet ljekara.",
    ],
    comoSeCalcula: [
      imperial
        ? "BMI = težina u funtama × 703 ÷ (visina u inčima × visina u inčima)."
        : "BMI = težina u kilogramima ÷ (visina u metrima × visina u metrima).",
      `Ispod ${n(18.5)} je pothranjenost, od ${n(18.5)} do ${n(24.9)} normalna tjelesna težina, od 25 do ${n(29.9)} prekomjerna tjelesna težina, a od 30 naviše gojaznost.`,
      `Zdrava tjelesna težina obuhvata vrijednosti pri kojima BMI za vašu visinu ostaje između ${n(18.5)} i ${n(24.9)}.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Koliki je normalan BMI?",
        respuesta: `Prema SZO, za odrasle od ${n(18.5)} do ${n(24.9)}. Granice su iste za žene i muškarce.`,
      },
      {
        pregunta: "Vrijedi li BMI za svakoga?",
        respuesta:
          "Ne. Ne razlikuje mišiće od masnog tkiva, pa kod ljudi s puno mišićne mase može ispasti previsok. Kod trudnica, djece i adolescenata tumači se drukčije.",
      },
      {
        pregunta: "Šta ako je BMI visok?",
        respuesta:
          "Razgovarajte o rezultatu s ljekarom ili nutricionistom. Najbolje ga je promatrati zajedno s drugim pokazateljima: opsegom struka, ishranom i tjelesnom aktivnošću.",
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Indeks tjelesne mase: omjer tjelesne težine i kvadrata visine." },
      { termino: "SZO", definicion: "Svjetska zdravstvena organizacija. Određuje kategorije BMI za odrasle." },
    ],
  };
};
