import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Kalkulator marży i narzutu",
    title: tituloQueEntre(
      `Kalkulator marży i narzutu: cena i zysk | ${ctx.nombrePais}`,
      `Kalkulator marży | ${ctx.nombrePais}`,
      "Kalkulator marży",
    ),
    description: "Oblicz marżę i narzut z kosztu i ceny albo cenę sprzedaży, która da ci marżę, jakiej potrzebujesz.",
    intro: [
      "Marża i narzut ciągle się mylą, a ta pomyłka może kosztować. Oba mierzą ten sam zysk, ale w odniesieniu do innej podstawy.",
      "Wpisz koszt i cenę, a pokażemy jedno i drugie. Albo wybierz marżę, a podpowiemy, jaką cenę ustalić.",
    ],
    comoSeCalcula: [
      "Zysk = cena − koszt.",
      "Marża = zysk ÷ cena × 100.",
      "Narzut = zysk ÷ koszt × 100.",
      "Cena dla docelowej marży = koszt ÷ (1 − marża ÷ 100).",
    ],
    ejemplo: [
      `Produkt, który kosztuje ${m(costo)} i sprzedaje się za ${m(precio)}, daje ${m(precio - costo)} zysku: marża wynosi ${p(((precio - costo) / precio) * 100)}, a narzut ${p(((precio - costo) / costo) * 100)}.`,
      `Żeby przy tym koszcie mieć marżę 50%, trzeba sprzedawać za ${m(precioConMargen(costo, 50))}. Doliczenie 50% do kosztu daje marżę tylko ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Czym różni się marża od narzutu?",
        respuesta: "Marża to zysk w stosunku do ceny sprzedaży. Narzut to zysk w stosunku do kosztu. Przy tym samym zysku narzut jest zawsze wyższy.",
      },
      {
        pregunta: "Jak ustalić cenę dla docelowej marży?",
        respuesta: `Podziel koszt przez (1 − marża). Przy marży 30% dzielisz koszt przez ${formatearNumero(ctx, 0.7, 2)}. Nie doliczaj 30% do kosztu: zarobisz mniej, niż myślisz.`,
      },
      {
        pregunta: "Czy koszt powinien zawierać VAT?",
        respuesta: "Licz koszt i cenę netto, bez VAT przerzucanego na klienta. Inaczej marża wygląda na wyższą, niż jest naprawdę.",
      },
    ],
    glosario: [
      { termino: "Marża", definicion: "Zysk jako procent ceny sprzedaży." },
      { termino: "Narzut", definicion: "Zysk jako procent kosztu zakupu albo wytworzenia." },
    ],
  };
};
