import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Osoba, która waży 160 lb i ma 5 ft 9 in wzrostu, ma BMI ${n((160 * KG_POR_LB) / (m * m))}. To waga prawidłowa.`,
        `Przy tym wzroście prawidłowa masa ciała mieści się między ${n((18.5 * m * m) / KG_POR_LB)} a ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Osoba, która waży 70 kg i ma ${n(1.75, 2)} m wzrostu, ma BMI ${n(70 / (1.75 * 1.75))}. To waga prawidłowa.`,
        `Przy tym wzroście prawidłowa masa ciała mieści się między ${n(18.5 * 1.75 * 1.75)} a ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "Kalkulator BMI",
    title: tituloQueEntre(
      `Kalkulator BMI: wskaźnik masy ciała | ${ctx.nombrePais}`,
      `Kalkulator BMI | ${ctx.nombrePais}`,
      "Kalkulator BMI",
    ),
    description: "Oblicz swoje BMI na podstawie masy ciała i wzrostu. Z kategorią według WHO i zakresem prawidłowej masy ciała dla twojego wzrostu.",
    intro: [
      "Wpisz masę ciała i wzrost. Zobaczysz swoje BMI, kategorię według Światowej Organizacji Zdrowia (WHO) i zakres prawidłowej masy ciała dla twojego wzrostu.",
      "BMI to orientacyjny wskaźnik dla dorosłych. Nie zastępuje konsultacji z lekarzem.",
    ],
    comoSeCalcula: [
      imperial
        ? "BMI = masa ciała w funtach × 703 ÷ (wzrost w calach × wzrost w calach)."
        : "BMI = masa ciała w kilogramach ÷ (wzrost w metrach × wzrost w metrach).",
      `Poniżej ${n(18.5)} to niedowaga, od ${n(18.5)} do ${n(24.9)} waga prawidłowa, od 25 do ${n(29.9)} nadwaga. Od 30 mówi się o otyłości.`,
      `Prawidłowa masa ciała to zakres, który przy twoim wzroście daje BMI między ${n(18.5)} a ${n(24.9)}.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Jakie BMI jest prawidłowe?",
        respuesta: `Według WHO u dorosłych prawidłowe jest BMI między ${n(18.5)} a ${n(24.9)}. Granice są takie same dla kobiet i mężczyzn.`,
      },
      {
        pregunta: "Czy BMI jest miarodajne dla każdego?",
        respuesta: "Nie. Nie odróżnia mięśni od tkanki tłuszczowej, więc osoby bardzo umięśnione mogą mieć wysoki wynik. U dzieci, nastolatków i w ciąży ocenia się je inaczej.",
      },
      {
        pregunta: "Czy wiek ma znaczenie przy BMI?",
        respuesta: "Kategorie WHO są takie same dla wszystkich dorosłych. U osób starszych część specjalistów uznaje za bezpieczny nieco wyższy wynik. Najlepiej omówić to z lekarzem.",
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Wskaźnik masy ciała (z angielskiego body mass index). Porównuje masę ciała ze wzrostem." },
      { termino: "WHO", definicion: "Światowa Organizacja Zdrowia. Określa kategorie BMI dla dorosłych." },
      { termino: "Otyłość", definicion: "Nadmierna masa ciała, od BMI równego 30." },
    ],
  };
};
