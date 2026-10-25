import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator rabatu",
    title: tituloQueEntre(
      `Kalkulator rabatu: cena po obniżce i oszczędność | ${ctx.nombrePais}`,
      `Kalkulator rabatu | ${ctx.nombrePais}`,
      "Kalkulator rabatu",
    ),
    description: "Oblicz cenę po rabacie i to, ile oszczędzasz, także przy dwóch rabatach po kolei, na przykład 30% i dodatkowe 10%.",
    intro: [
      "Wpisz cenę i rabat, a od razu zobaczysz, ile zapłacisz i ile oszczędzasz.",
      "Jeśli promocja ma jeszcze dodatkowy rabat, też go wpisz. Dwa rabaty po kolei nigdy nie dają po prostu sumy.",
    ],
    comoSeCalcula: [
      "Cena po rabacie = cena przed rabatem × (1 − rabat ÷ 100).",
      "Dodatkowy rabat liczy się od ceny, która jest już obniżona.",
      "Oszczędność to cena przed rabatem minus cena po rabacie.",
    ],
    ejemplo: [
      `Produkt za ${m(precio)} z rabatem 25% kosztuje ${m(precio * 0.75)}.`,
      `Z rabatem 30% i dodatkowym 10% kosztuje ${m(precio * 0.7 * 0.9)}. To łącznie 37% taniej, a nie 40%.`,
    ],
    faq: [
      {
        pregunta: "Jak obliczyć rabat?",
        respuesta: "Pomnóż cenę przez procent i podziel przez 100. To twoja oszczędność. Odejmij ją od ceny, a dostaniesz kwotę do zapłaty.",
      },
      {
        pregunta: "Czy 30% plus 10% rabatu to 40%?",
        respuesta: "Nie. Drugi rabat liczy się od ceny już obniżonej, więc łącznie oszczędzasz 37%.",
      },
      {
        pregunta: "Jak obliczyć cenę przed rabatem z ceny po obniżce?",
        respuesta: `Podziel cenę po rabacie przez (1 − rabat ÷ 100). Przy rabacie 25% dzielisz przez ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Rabat", definicion: "Procent odejmowany od ceny wyjściowej." },
      { termino: "Rabat łączny", definicion: "O ile procent łącznie spada cena, gdy działa więcej niż jeden rabat." },
    ],
  };
};
