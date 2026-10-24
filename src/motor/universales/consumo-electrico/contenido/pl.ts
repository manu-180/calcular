import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Kalkulator zużycia prądu",
    title: tituloQueEntre(
      `Kalkulator zużycia prądu: ile kosztuje urządzenie | ${ctx.nombrePais}`,
      `Kalkulator zużycia prądu | ${ctx.nombrePais}`,
      "Kalkulator zużycia prądu",
    ),
    description: "Policz, ile prądu zużywa urządzenie i ile to kosztuje dziennie, miesięcznie i rocznie, na podstawie mocy, czasu pracy i ceny za kWh.",
    intro: [
      "Wpisz moc urządzenia, ile godzin dziennie pracuje i cenę za kWh z rachunku. Zobaczysz zużycie energii i jej koszt.",
      "Sprawdzisz w ten sposób, które urządzenie najbardziej podnosi rachunek: klimatyzacja, grzejnik elektryczny, lodówka czy komputer.",
    ],
    comoSeCalcula: [
      "kWh dziennie = moc w watach × godziny pracy ÷ 1000.",
      "kWh miesięcznie = kWh dziennie × dni pracy. Rocznie to miesiąc razy 12.",
      "Koszt = kWh × cena za kWh.",
    ],
    ejemplo: [
      `Urządzenie o mocy 1000 W, które pracuje 4 godziny dziennie, zużywa 4 kWh dziennie i ${formatearNumero(ctx, kwhMes)} kWh miesięcznie.`,
      `Przy cenie ${m(precio)} za kWh kosztuje ${m(kwhMes * precio)} miesięcznie.`,
    ],
    faq: [
      {
        pregunta: "Co to jest kWh?",
        respuesta: "Kilowatogodzina to energia, którą zużywa urządzenie o mocy 1000 W pracujące przez godzinę. W tej jednostce rozlicza się rachunek za prąd.",
      },
      {
        pregunta: "Czy lodówka pracuje pełną mocą przez całą dobę?",
        respuesta: "Nie. Sprężarka włącza się i wyłącza. Przy takich urządzeniach przyjmij około 8 do 10 godzin dziennie zamiast 24.",
      },
      {
        pregunta: "Dlaczego wynik nie zgadza się dokładnie z rachunkiem?",
        respuesta: "Na rachunku są też opłaty stałe, opłata mocowa, podatki, a czasem różne ceny w zależności od taryfy. Kalkulator pokazuje tylko zużycie samego urządzenia.",
      },
    ],
    glosario: [
      { termino: "Wat (W)", definicion: "Jednostka mocy: ile energii urządzenie zużywa w każdej sekundzie." },
      { termino: "Kilowatogodzina (kWh)", definicion: "1000 W przez godzinę. Za tę jednostkę płacisz na rachunku." },
    ],
  };
};
