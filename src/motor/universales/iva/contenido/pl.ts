import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: "Kalkulator VAT: netto i brutto",
    title: tituloQueEntre(
      `Kalkulator VAT ${tasa}: netto brutto | ${ctx.nombrePais}`,
      `Kalkulator VAT ${tasa} | ${ctx.nombrePais}`,
      `Kalkulator VAT ${tasa}`,
    ),
    description: `Dolicz albo odlicz VAT ${tasa} od dowolnej kwoty: przelicz netto na brutto i brutto na netto, z kwotą podatku co do grosza.`,
    intro: [
      `Podstawowa stawka VAT, której używamy ${GRAMATICA.pl.en(ctx.nombrePais)}, wynosi ${tasa}.`,
      "Wybierz, czy doliczasz VAT do kwoty netto, czy wyliczasz go z kwoty brutto, i wpisz kwotę.",
    ],
    comoSeCalcula: [
      "Z netto na brutto: VAT = kwota netto × stawka ÷ 100. Brutto = netto + VAT.",
      "Z brutto na netto: netto = brutto ÷ (1 + stawka ÷ 100). VAT to różnica.",
      "Jeśli towar ma obniżoną stawkę, wpisz ją w polu „Inna stawka VAT”.",
    ],
    ejemplo: [
      `Żeby doliczyć VAT do ${precio} netto, pomnóż kwotę przez ${tasa} i dodaj wynik do kwoty netto.`,
      `Żeby sprawdzić, ile VAT jest w ${precio} brutto, podziel kwotę przez 1 plus stawka i odejmij wynik od brutto.`,
    ],
    faq: [
      {
        pregunta: "Jak odliczyć VAT od kwoty brutto?",
        respuesta: "Podziel kwotę brutto przez 1 plus stawka zapisana jako ułamek. Wynik to kwota netto, a różnica to VAT.",
      },
      {
        pregunta: "Dlaczego nie można po prostu odjąć procentu od brutto?",
        respuesta: "Bo VAT naliczono od mniejszej kwoty, czyli od netto. Odejmując procent od brutto, odliczasz za dużo.",
      },
      {
        pregunta: `Czy wszystko ma stawkę ${tasa}?`,
        respuesta: "Nie zawsze. Część żywności, leków albo usług ma stawkę obniżoną albo jest zwolniona z VAT. Wtedy użyj pola „Inna stawka VAT”.",
      },
    ],
    glosario: [
      { termino: "VAT", definicion: "Podatek od towarów i usług. Dolicza się go do ceny towarów i usług." },
      { termino: "Netto", definicion: "Kwota bez podatku VAT." },
      { termino: "Brutto", definicion: "Kwota razem z podatkiem VAT." },
    ],
  };
};
