import { pluralPl } from "../../../i18n/plural";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const meses = Math.ceil((gastos * 6) / aporte);
  return {
    h1: "Kalkulator poduszki finansowej",
    title: tituloQueEntre(
      `Kalkulator poduszki finansowej: ile odłożyć | ${ctx.nombrePais}`,
      `Kalkulator poduszki finansowej | ${ctx.nombrePais}`,
      "Kalkulator poduszki finansowej",
    ),
    description: "Policz, jak duża powinna być twoja poduszka finansowa na podstawie niezbędnych wydatków i ile miesięcy zajmie jej uzbieranie.",
    intro: [
      "Poduszka finansowa to pieniądze odłożone na to, czego nie da się zaplanować: utratę pracy, chorobę albo pilną naprawę w domu.",
      "Dzięki niej nie musisz sięgać po kartę kredytową ani chwilówkę wtedy, gdy jest najtrudniej. Wpisz niezbędne wydatki i liczbę miesięcy, które chcesz pokryć.",
    ],
    comoSeCalcula: [
      "Zalecana poduszka = niezbędne wydatki miesięczne × liczba miesięcy.",
      "Zostało do odłożenia = zalecana poduszka − to, co już masz.",
      "Miesiące do celu = kwota do odłożenia ÷ miesięczna wpłata, w górę do pełnego miesiąca.",
    ],
    ejemplo: [
      `Przy niezbędnych wydatkach ${m(gastos)} miesięcznie poduszka na 6 miesięcy to ${m(gastos * 6)}.`,
      `Odkładając ${m(aporte)} miesięcznie, uzbierasz ją w ${pluralPl(meses, "miesiąc", "miesiące", "miesięcy")}.`,
    ],
    faq: [
      {
        pregunta: "Na ile miesięcy powinna wystarczyć poduszka finansowa?",
        respuesta:
          "Zwykle zaleca się od 3 do 6 miesięcy niezbędnych wydatków. Jeśli masz nieregularne dochody, prowadzisz działalność gospodarczą albo w domu zarabia jedna osoba, celuj w 6 do 12 miesięcy.",
      },
      {
        pregunta: "Gdzie trzymać poduszkę finansową?",
        respuesta: "W bezpiecznym miejscu, z którego wypłacisz pieniądze tego samego dnia, osobno od konta na bieżące wydatki. To nie są pieniądze na ryzykowne inwestycje: mają być pod ręką, kiedy będą potrzebne.",
      },
      {
        pregunta: "Najpierw poduszka czy spłata długów?",
        respuesta: "Często najpierw odkłada się wydatki na jeden miesiąc, potem spłaca drogie długi, takie jak karta kredytowa, a na końcu uzupełnia poduszkę.",
      },
    ],
    glosario: [
      { termino: "Niezbędne wydatki", definicion: "Rachunki, które trzeba płacić, nawet gdy dochód przestaje wpływać: mieszkanie, jedzenie, media, zdrowie." },
      { termino: "Płynność", definicion: "Jak szybko można użyć pieniędzy bez utraty ich wartości." },
    ],
  };
};
