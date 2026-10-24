import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Przejazd 150 mil w jedną stronę i z powrotem autem, które robi 30 mpg, wymaga ${formatearNumero(ctx, galones)} galonów paliwa.`,
          `Przy cenie ${m(precio)} za galon kosztuje ${m(galones * precio)}. Przy podziale na 2 osoby wychodzi ${m((galones * precio) / 2)} na osobę.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Przejazd 300 km w jedną stronę i z powrotem autem, które pali 8 litrów na 100 km, wymaga ${formatearNumero(ctx, litros)} litrów paliwa.`,
          `Przy cenie ${m(precio)} za litr kosztuje ${m(litros * precio)}. Przy podziale na 2 osoby wychodzi ${m((litros * precio) / 2)} na osobę.`,
        ];
      })();
  return {
    h1: "Kalkulator kosztów przejazdu",
    title: tituloQueEntre(
      `Kalkulator kosztów przejazdu: ile za paliwo | ${ctx.nombrePais}`,
      `Kalkulator kosztów przejazdu | ${ctx.nombrePais}`,
      "Kalkulator kosztów przejazdu",
    ),
    description: "Policz, ile kosztuje paliwo na trasę, na podstawie odległości, spalania auta i ceny paliwa. Zobacz też, ile płaci każda osoba.",
    intro: [
      `Wpisz długość trasy, spalanie auta i cenę za ${imperial ? "galon" : "litr"}. Zobaczysz, ile paliwa potrzebujesz i ile kosztuje przejazd.`,
      imperial ? "Spalanie podajesz w milach na galon, tak jak w danych technicznych auta." : "Spalanie możesz podać w litrach na 100 km albo w kilometrach na litr.",
    ],
    comoSeCalcula: imperial
      ? ["Galony = odległość ÷ mile na galon.", "Koszt = galony × cena za galon. Trasa tam i z powrotem to podwójna odległość."]
      : [
          "Przy litrach na 100 km: litry = odległość × spalanie ÷ 100.",
          "Przy kilometrach na litr: litry = odległość ÷ spalanie.",
          "Koszt = litry × cena za litr. Trasa tam i z powrotem to podwójna odległość.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Jak przeliczyć mpg na litry na 100 km?",
        respuesta: `Podziel ${formatearNumero(ctx, 235.215, 1)} przez wartość w mpg (galony amerykańskie). Auto, które robi 30 mpg, pali około ${formatearNumero(ctx, 235.215 / 30, 1)} litra na 100 km.`,
      },
      {
        pregunta: "Czy kalkulator uwzględnia opłaty za autostrady?",
        respuesta: "Nie. Liczy tylko paliwo. Opłaty za autostrady i parkingi dolicz osobno.",
      },
      {
        pregunta: "Dlaczego w mieście auto pali więcej?",
        respuesta: "Ciągłe hamowanie i ruszanie zużywa więcej energii niż równa jazda w trasie, więc spalanie w mieście jest zwykle wyższe.",
      },
    ],
    glosario: [
      { termino: "Spalanie", definicion: "Ile paliwa zużywa auto na określonym dystansie, zwykle w litrach na 100 km." },
      { termino: "mpg", definicion: "Mile na galon. Im wyższa wartość, tym mniejsze spalanie." },
    ],
  };
};
