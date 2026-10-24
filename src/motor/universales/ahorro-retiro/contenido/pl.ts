import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  const zrodlo = ctx.pais === "PL" ? "z ZUS" : "z systemu publicznego";
  return {
    h1: "Kalkulator emerytalny",
    title: tituloQueEntre(
      `Kalkulator emerytalny: ile odłożysz na emeryturę | ${ctx.nombrePais}`,
      `Kalkulator emerytalny | ${ctx.nombrePais}`,
      "Kalkulator emerytalny",
    ),
    description: "Sprawdź, ile zgromadzisz na emeryturę dzięki regularnym wpłatom i jaką miesięczną kwotę dadzą ci te oszczędności w dzisiejszych pieniądzach.",
    intro: [
      `Sama emerytura ${zrodlo} często nie wystarcza, żeby utrzymać poziom życia. Własne oszczędności, nawet niewielkie, robią dużą różnicę, jeśli zaczniesz wcześnie.`,
      "Wpisz swój wiek, wiek przejścia na emeryturę, to, co już masz, i kwotę, którą możesz odkładać co miesiąc. Pokażemy kapitał na start emerytury i ile możesz z niego wypłacać miesięcznie.",
    ],
    comoSeCalcula: [
      "Oszczędności rosną co miesiąc według realnej stopy zwrotu, czyli zysku pomniejszonego o inflację. Dzięki temu wynik jest w dzisiejszych pieniądzach.",
      "Od dnia przejścia na emeryturę kapitał jest wypłacany w równych miesięcznych kwotach przez wybraną liczbę lat. To, co zostaje, dalej pracuje.",
      `Kalkulator nie uwzględnia emerytury ${zrodlo}, podatków ani opłat za zarządzanie inwestycją.`,
    ],
    ejemplo: [
      `Masz 30 lat, ${m(actual)} oszczędności i wpłacasz ${m(aporte)} miesięcznie przy realnej stopie zwrotu 4%. W wieku 65 lat zgromadzisz ${m(capital30)}. To ${m(rentaMensual(capital30, 4, 25))} miesięcznie przez 25 lat.`,
      `Jeśli zaczniesz w wieku 40 lat z tymi samymi kwotami, zgromadzisz ${m(capital40)}. Dziesięć lat robi ogromną różnicę.`,
    ],
    faq: [
      {
        pregunta: "Co to jest realna stopa zwrotu?",
        respuesta: "To zysk z inwestycji po odjęciu inflacji. Jeśli inwestycja daje 7%, a inflacja wynosi 3%, realna stopa zwrotu to około 4%.",
      },
      {
        pregunta: `Czy to zastępuje emeryturę ${zrodlo}?`,
        respuesta:
          ctx.pais === "PL"
            ? "Nie. To twoje własne oszczędności, na przykład w IKE, IKZE albo PPK, ponad emeryturę z ZUS. Prognozę emerytury z ZUS znajdziesz na swoim koncie w PUE ZUS."
            : "Nie. To twoje własne oszczędności ponad emeryturę z systemu publicznego. Jej wysokość sprawdzisz w instytucji, która ją wypłaca.",
      },
      {
        pregunta: "Ile odkładać na emeryturę?",
        respuesta: "Nie ma jednej kwoty. Często mówi się o 10% do 15% dochodu. Najważniejsze to zacząć jak najwcześniej.",
      },
    ],
    glosario: [
      { termino: "Realna stopa zwrotu", definicion: "Zysk z inwestycji ponad inflację." },
      { termino: "Dzisiejsze pieniądze", definicion: "Kwota z przyszłości wyrażona tym, co można by za nią kupić dziś." },
    ],
  };
};
