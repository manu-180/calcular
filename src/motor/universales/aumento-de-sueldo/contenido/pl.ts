import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Kalkulator podwyżki",
    title: tituloQueEntre(
      `Kalkulator podwyżki: nowa pensja i realna podwyżka | ${ctx.nombrePais}`,
      `Kalkulator podwyżki | ${ctx.nombrePais}`,
      "Kalkulator podwyżki",
    ),
    description: "Policz nowe wynagrodzenie po podwyżce, różnicę miesięcznie i rocznie oraz realną podwyżkę, czyli czy wygrywasz z inflacją.",
    intro: [
      "Dostajesz propozycję podwyżki albo chcesz o nią poprosić. Wpisz pensję i podwyżkę, w procentach albo kwotowo, i zobacz, ile zmienia się co miesiąc i co roku.",
      "Dodaj inflację z tego okresu, a powiemy ci, czy naprawdę zyskujesz siłę nabywczą, czy tylko nadrabiasz wzrost cen.",
    ],
    comoSeCalcula: [
      "Nowa pensja = obecna pensja × (1 + podwyżka ÷ 100).",
      "Różnica rocznie = różnica miesięcznie × liczba pensji w roku.",
      "Realna podwyżka = (1 + podwyżka) ÷ (1 + inflacja) − 1.",
    ],
    ejemplo: [
      `Pensja ${m(sueldo)} miesięcznie po podwyżce o 5% wynosi ${m(sueldo * 1.05)}. To ${m(sueldo * 0.05)} więcej miesięcznie i ${m(sueldo * 0.05 * 12)} więcej rocznie.`,
      `Jeśli inflacja w tym czasie wyniosła 3%, realna podwyżka to ${p(aumentoReal(5, 3))}. Przy inflacji 6% to ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Co to jest realna podwyżka?",
        respuesta: "To podwyżka po uwzględnieniu inflacji. Pokazuje, czy za nową pensję kupisz więcej, czy mniej niż wcześniej.",
      },
      {
        pregunta: "Dlaczego nie wystarczy odjąć inflacji od podwyżki?",
        respuesta: `Bo oba procenty się mnożą, a nie dodają. Przy podwyżce 5% i inflacji 3% realna podwyżka to ${p(aumentoReal(5, 3))}, a nie 2%. Przy wysokiej inflacji różnica jest dużo większa.`,
      },
      {
        pregunta: "O jaką podwyżkę prosić?",
        respuesta: "Co najmniej o inflację od ostatniej podwyżki, żeby nie tracić. Ponad to liczy się, ile inni pracodawcy płacą na podobnym stanowisku i jak urósł zakres twoich obowiązków.",
      },
    ],
    glosario: [
      { termino: "Podwyżka nominalna", definicion: "Podwyżka taka, jaką widać na pasku wynagrodzenia, przed uwzględnieniem inflacji." },
      { termino: "Siła nabywcza", definicion: "Ile możesz kupić za swoje wynagrodzenie." },
    ],
  };
};
