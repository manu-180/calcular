import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Kalkulator oszczędności: ile odkładać na cel",
    title: tituloQueEntre(
      `Kalkulator oszczędności: ile odkładać miesięcznie | ${ctx.nombrePais}`,
      `Kalkulator oszczędności | ${ctx.nombrePais}`,
      "Kalkulator oszczędności",
    ),
    description: "Sprawdź, ile odkładać co miesiąc, żeby uzbierać potrzebną kwotę na czas, uwzględniając to, co już masz, i odsetki od oszczędności.",
    intro: [
      "Wyjazd, samochód, wkład własny na mieszkanie albo zapas na niespodzianki. Cel z kwotą i terminem dużo łatwiej osiągnąć.",
      "Wpisz, ile chcesz odłożyć i w ile miesięcy. Powiemy ci, ile odkładać co miesiąc i co tydzień.",
    ],
    comoSeCalcula: [
      "Najpierw liczymy, o ile urosną obecne oszczędności do końca okresu.",
      "To, czego jeszcze brakuje, dzielimy na równe miesięczne wpłaty.",
      "Jeśli oszczędności są oprocentowane, każda wpłata też zarabia, więc wystarczy wpłacać trochę mniej.",
    ],
    ejemplo: [
      `Żeby odłożyć ${m(meta)} w 24 miesiące bez odsetek, potrzebujesz ${m(meta / 24)} miesięcznie.`,
      `Jeśli masz już ${m(actual)}, a oszczędności dają 5% rocznie, wystarczy ${m(aporteNecesario(meta, actual, 24, 5))} miesięcznie.`,
    ],
    faq: [
      {
        pregunta: "Jak wytrwać w oszczędzaniu?",
        respuesta: "Przelewaj pieniądze od razu po wypłacie, zanim wydasz je na cokolwiek innego. Jeśli możesz, ustaw stałe zlecenie na osobne konto oszczędnościowe.",
      },
      {
        pregunta: "Co, jeśli miesięczna kwota jest za wysoka?",
        respuesta: "Daj sobie więcej czasu albo obniż cel. Możesz też zacząć od kwoty, na którą cię stać, i podnieść ją, gdy wzrośnie twój dochód.",
      },
      {
        pregunta: "Czy uwzględniać inflację?",
        respuesta: "Jeśli cel jest za kilka lat, powiększ kwotę o przewidywaną inflację. To, co dziś kosztuje 100, za kilka lat może kosztować sporo więcej.",
      },
    ],
    glosario: [
      { termino: "Wpłata", definicion: "Pieniądze, które co miesiąc odkładasz na cel." },
      { termino: "Oprocentowanie", definicion: "Ile zarabiają oszczędności na koncie albo w inwestycji." },
    ],
  };
};
