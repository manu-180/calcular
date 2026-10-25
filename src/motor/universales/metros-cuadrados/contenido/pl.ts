import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Kalkulator stóp kwadratowych" : "Kalkulator metrów kwadratowych",
    title: imperial
      ? tituloQueEntre(`Kalkulator stóp kwadratowych | ${ctx.nombrePais}`, "Kalkulator stóp kwadratowych")
      : tituloQueEntre(
          `Kalkulator metrów kwadratowych: powierzchnia pokoju | ${ctx.nombrePais}`,
          `Kalkulator metrów kwadratowych | ${ctx.nombrePais}`,
          "Kalkulator metrów kwadratowych",
        ),
    description: "Oblicz powierzchnię pokoju, podłogi albo działki: prostokąty, trójkąty i koła, sumując do pięciu części naraz.",
    intro: [
      "Wybierz kształt i wpisz wymiary. Jeśli pomieszczenie nie jest zwykłym prostokątem, podziel je na części, a kalkulator je zsumuje.",
      imperial ? "Wynik pokazujemy też w metrach kwadratowych." : "Wynik pokazujemy też w stopach kwadratowych.",
    ],
    comoSeCalcula: [
      "Prostokąt: długość × szerokość.",
      "Trójkąt: podstawa × wysokość ÷ 2.",
      `Koło: π × promień × promień, gdzie promień to połowa średnicy. 1 m² to ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Salon w kształcie litery L można podzielić na prostokąt 16 × 12 ft i prostokąt 10 × 6 ft. Razem to ${n(enL, 0)} ft².`
        : `Salon w kształcie litery L można podzielić na prostokąt 5 × 4 m i prostokąt 3 × 2 m. Razem to ${n(enL, 0)} m².`,
      `Okrągły stół o średnicy 2 ${u} zajmuje ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: imperial ? "Jak obliczyć powierzchnię pokoju w stopach kwadratowych?" : "Jak obliczyć metraż pokoju?",
        respuesta: imperial
          ? "Zmierz długość i szerokość w stopach i pomnóż je przez siebie. Pokój 12 × 10 ft ma 120 ft²."
          : "Zmierz długość i szerokość w metrach i pomnóż je przez siebie. Pokój 4 × 3 m ma 12 m².",
      },
      {
        pregunta: "Co, jeśli mam wymiary w centymetrach?",
        respuesta: `Najpierw je przelicz: centymetry podziel przez 100, żeby dostać metry, a cale przez 12, żeby dostać stopy. 350 cm to ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Jak przeliczyć metry kwadratowe na stopy kwadratowe?",
        respuesta: `Pomnóż przez ${n(FT2_POR_M2)}. 20 m² to ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Metr kwadratowy (m²)", definicion: "Powierzchnia kwadratu o boku 1 metra." },
      { termino: "Stopa kwadratowa (ft²)", definicion: "Powierzchnia kwadratu o boku 1 stopy." },
    ],
  };
};
