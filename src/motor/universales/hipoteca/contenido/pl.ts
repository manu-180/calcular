import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Kalkulator kredytu hipotecznego",
    title: tituloQueEntre(
      `Kalkulator kredytu hipotecznego: rata i odsetki | ${ctx.nombrePais}`,
      `Kalkulator kredytu hipotecznego | ${ctx.nombrePais}`,
      "Kalkulator kredytu hipotecznego",
    ),
    description: "Oblicz miesięczną ratę kredytu hipotecznego na podstawie ceny, wkładu własnego, oprocentowania i okresu. Zobacz sumę odsetek i spłatę rok po roku.",
    intro: [
      "Kredyt hipoteczny to zwykle największy dług w życiu. Warto zobaczyć pełne liczby, zanim pójdziesz do banku albo do doradcy kredytowego.",
      "Wpisz cenę mieszkania, wkład własny, oprocentowanie i okres kredytowania. Jeśli razem z ratą płacisz ubezpieczenie albo czynsz, dodaj je, żeby zobaczyć realny miesięczny wydatek.",
    ],
    comoSeCalcula: [
      "Kwota kredytu = cena mieszkania − wkład własny.",
      "Rata jest równa (annuitetowa): liczymy ją z oprocentowania rocznego podzielonego przez 12 i okresu w miesiącach.",
      "Dla każdego roku sumujemy zapłacone odsetki i spłacony kapitał oraz pokazujemy, ile zostaje do spłaty.",
    ],
    ejemplo: [
      `Mieszkanie za ${m(precio)} z wkładem własnym 20% to kredyt na ${m(prestado)}. Przy oprocentowaniu 7% na 30 lat rata wynosi ${m(cuota30)}.`,
      `Przez 30 lat zapłacisz ${m(interesesTotales(prestado, 7, 360))} odsetek. Na 15 lat rata rośnie do ${m(cuota15)}, ale odsetki spadają do ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Jaki wkład własny jest potrzebny?",
        respuesta:
          ctx.pais === "PL"
            ? "Banki w Polsce zwykle wymagają co najmniej 10% do 20% ceny. Im większy wkład, tym mniej pożyczasz, tym niższa rata i mniej odsetek. Odłóż też pieniądze na koszty zakupu."
            : "To zależy od banku i kraju. Im większy wkład, tym mniej pożyczasz, tym niższa rata i mniej odsetek. Odłóż też pieniądze na koszty zakupu.",
      },
      {
        pregunta: "Dlaczego w pierwszych latach dług prawie nie maleje?",
        respuesta:
          "Odsetki liczy się od kwoty, która zostaje do spłaty. Na początku jest ona duża, więc większość raty to odsetki. Z czasem proporcja się odwraca.",
      },
      {
        pregunta: "Czy krótszy okres kredytowania jest lepszy?",
        respuesta:
          "Jeśli stać cię na wyższą ratę, tak: zapłacisz dużo mniej odsetek. Jeśli nie, dłuższy okres i nadpłaty, kiedy tylko możesz, też dają dobry wynik.",
      },
      {
        pregunta: "Czy rata może się zmienić?",
        respuesta:
          ctx.pais === "PL"
            ? "Przy stałym oprocentowaniu rata jest taka sama. Przy zmiennym zależy od wskaźnika referencyjnego (na przykład WIBOR albo WIRON) i może rosnąć lub spadać. Kalkulator zakłada, że oprocentowanie nie zmienia się przez cały okres."
            : "Przy stałym oprocentowaniu rata jest taka sama. Przy zmiennym może rosnąć lub spadać. Kalkulator zakłada, że oprocentowanie nie zmienia się przez cały okres.",
      },
    ],
    glosario: [
      { termino: "Wkład własny", definicion: "Część ceny, którą płacisz z własnych oszczędności." },
      { termino: "Rata równa", definicion: "Rata, która co miesiąc jest taka sama. Na początku składa się głównie z odsetek." },
      { termino: "Kapitał", definicion: "Pożyczona kwota, którą trzeba jeszcze oddać." },
    ],
  };
};
