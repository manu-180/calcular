import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  // Con decimales el polaco usa el genitivo singular: «5,82 litra», «1,25 galonu».
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Pokój, w którym ściany mają razem 48 ft długości i 8 ft wysokości, a drzwi i okna zajmują 40 ft², ma ${n(neta, 0)} ft² do malowania.`,
          `Przy 2 warstwach i farbie o wydajności 350 ft² z galonu potrzebujesz ${n(gal, 2)} galonu. Z zapasem to ${n(gal * (1 + MARGEN), 2)} galonu.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Pokój, w którym ściany mają razem 14 m długości i ${n(2.6)} m wysokości, a drzwi i okna zajmują 4 m², ma ${n(neta)} m² do malowania.`,
          `Przy 2 warstwach i farbie o wydajności 10 m² z litra potrzebujesz ${n(litros, 2)} litra. Z zapasem to ${n(litros * (1 + MARGEN), 2)} litra.`,
        ];
      })();
  return {
    h1: "Kalkulator farby",
    title: tituloQueEntre(
      `Kalkulator farby: ile farby na ściany | ${ctx.nombrePais}`,
      `Kalkulator farby | ${ctx.nombrePais}`,
      "Kalkulator farby",
    ),
    description: "Policz, ile farby potrzebujesz na ściany, na podstawie ich wymiarów, drzwi i okien, liczby warstw i wydajności podanej na puszce.",
    intro: [
      "Wpisz długość i wysokość ścian (albo od razu powierzchnię), ile zajmują drzwi i okna i ile warstw nałożysz.",
      "Doliczamy 10% zapasu, żeby farby nie zabrakło w połowie pracy.",
    ],
    comoSeCalcula: [
      "Powierzchnia = łączna długość ścian × wysokość, minus drzwi i okna.",
      "Farba = powierzchnia × liczba warstw ÷ wydajność.",
      `Na koniec doliczamy ${MARGEN * 100}% zapasu.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Na ile metrów wystarczy litr farby?",
        respuesta: "Większość farb do ścian wewnętrznych ma wydajność od 8 do 12 m² z litra przy jednej warstwie (około 350 do 400 ft² z galonu). Dokładna wartość jest na puszce.",
      },
      {
        pregunta: "Ile warstw farby nałożyć?",
        respuesta: "Standardowo dwie. Na świeży tynk, bardzo chłonne ściany albo przy dużej zmianie koloru może być potrzebna trzecia.",
      },
      {
        pregunta: "Czy odejmować drzwi i okna?",
        respuesta: "Tak, jeśli są duże. Małych lepiej nie odejmować: nadwyżka pokryje krawędzie i narożniki.",
      },
    ],
    glosario: [
      { termino: "Wydajność", definicion: "Ile powierzchni pokrywa litr albo galon farby przy jednej warstwie." },
      { termino: "Warstwa", definicion: "Każde kolejne nałożenie farby na ścianę." },
    ],
  };
};
