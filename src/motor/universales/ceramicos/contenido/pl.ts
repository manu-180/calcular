import { pluralPl } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const plytki = (x: number) => pluralPl(x, "płytkę", "płytki", "płytek");
  const opakowania = (x: number) => pluralPl(x, "opakowanie", "opakowania", "opakowań");
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Na 150 ft² płytkami 12 × 12 in (1 ft² każda) z zapasem 10% potrzebujesz ${plytki(piezas)}.`,
          `Jeśli w opakowaniu jest 10 płytek, to ${opakowania(Math.ceil(piezas / 10))}.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Na 20 m² płytkami 60 × 60 cm (${n(pieza)} m² każda) z zapasem 10% potrzebujesz ${plytki(piezas)}.`,
          `Jeśli w opakowaniu są 4 płytki, to ${opakowania(Math.ceil(piezas / 4))}.`,
        ];
      })();
  return {
    h1: "Kalkulator płytek",
    title: tituloQueEntre(
      `Kalkulator płytek: ile płytek na podłogę i ścianę | ${ctx.nombrePais}`,
      `Kalkulator płytek | ${ctx.nombrePais}`,
      "Kalkulator płytek",
    ),
    description: "Policz, ile płytek potrzebujesz na podłogę albo ścianę, razem z zapasem na docinki, i ile opakowań kupić.",
    intro: [
      "Wpisz powierzchnię, wymiary jednej płytki i liczbę płytek w opakowaniu. Zobaczysz, ile płytek i opakowań kupić.",
      "Zapas pokrywa docinki przy krawędziach i płytki, które pękną przy cięciu.",
    ],
    comoSeCalcula: [
      `Powierzchnia jednej płytki = długość × szerokość, przeliczona na ${imperial ? "stopy kwadratowe" : "metry kwadratowe"}.`,
      "Liczba płytek = powierzchnia × (1 + zapas ÷ 100) ÷ powierzchnia jednej płytki, w górę do pełnej sztuki.",
      "Liczba opakowań = liczba płytek ÷ płytki w opakowaniu, w górę do pełnego opakowania.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Jaki zapas płytek przyjąć?",
        respuesta: "10% przy układaniu prostym. Przy układaniu po skosie, w jodełkę albo w pomieszczeniu z wieloma docinkami od 15% do 20%.",
      },
      {
        pregunta: "Czy trzeba doliczać fugi?",
        respuesta: "Nie. Fugi mają kilka milimetrów szerokości, a zapas na docinki pokrywa tę różnicę.",
      },
      {
        pregunta: "Czy warto kupić płytki na zapas?",
        respuesta: "Tak, kilka sztuk z tej samej partii. Jeśli któraś pęknie później, trudno będzie dobrać ten sam odcień.",
      },
    ],
    glosario: [
      { termino: "Zapas na docinki", definicion: "Dodatkowy procent płytek kupowany na cięcia i stłuczki." },
      { termino: "Partia", definicion: "Seria produkcyjna. Płytki z różnych partii mogą się nieco różnić odcieniem." },
    ],
  };
};
