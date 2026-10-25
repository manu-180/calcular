import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  // Osztályzatok, mint az iskolában: hármas 20, négyes 30, ötös 50 százalékos súllyal.
  const ponderado = (3 * 20 + 4 * 30 + 5 * 50) / (20 + 30 + 50);
  const simple = (3 + 4 + 5) / 3;
  return {
    h1: "Átlag kalkulátor",
    title: tituloQueEntre(
      `Átlag kalkulátor: jegyátlag és súlyozott átlag (${ctx.nombrePais})`,
      "Átlag kalkulátor: jegyátlag és súlyozott átlag",
      "Átlag kalkulátor",
    ),
    description:
      "Számold ki a jegyátlagot egyszerű és súlyozott átlagként, legfeljebb 10 értékkel és mindegyik súlyával: százalékban, kreditben vagy darabszámban.",
    intro: [
      "Írd be az összes jegyet és azt, hogy mennyit számít. Látod a súlyozott átlagot és mellette az egyszerű átlagot.",
      "Jó az általános iskolai, a középiskolai és az egyetemi jegyekhez, és minden olyan átlaghoz, ahol egyes értékek többet számítanak, mint mások.",
    ],
    comoSeCalcula: [
      "Egyszerű átlag = az értékek összege ÷ az értékek száma.",
      "Súlyozott átlag = (érték × súly) összege ÷ a súlyok összege.",
      "A súlyoknak nem kell kiadniuk a százat: a számítás az összegükkel oszt.",
    ],
    ejemplo: [
      `Ha a jegyek 3, 4 és 5, a súlyuk pedig 20, 30 és 50 százalék, a súlyozott átlag ${n(ponderado)}.`,
      `Ugyanennek a három jegynek az egyszerű átlaga ${n(simple, 0)}: a legjobb jegy számít a legtöbbet, ezért felhúzza a súlyozott átlagot.`,
    ],
    faq: [
      {
        pregunta: "Hogyan számolom ki a súlyozott átlagot?",
        respuesta: "Szorozd meg mindegyik értéket a súlyával, add össze a szorzatokat, és oszd el a súlyok összegével.",
      },
      {
        pregunta: "Mi van, ha a súlyok nem adják ki a 100 százalékot?",
        respuesta: "Nem baj. Ha az egyik tárgy 6 kredites, a másik 4 kredites, írd be a hatot és a négyet. A számítás a súlyok összegével oszt.",
      },
      {
        pregunta: "Mi a különbség az egyszerű és a súlyozott átlag között?",
        respuesta: "Az egyszerű átlagban minden érték ugyanannyit számít. A súlyozott átlagban mindegyik a saját súlya szerint számít.",
      },
    ],
    glosario: [
      { termino: "Súly", definicion: "Mennyire befolyásolja egy érték a végső átlagot." },
      { termino: "Súlyozott átlag", definicion: "Olyan átlag, amelyben minden értéket a súlyával szorzunk meg." },
    ],
  };
};
