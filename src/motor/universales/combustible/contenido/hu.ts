import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Egy 150 mérföldes oda-vissza úthoz egy olyan autónak, amely gallononként 30 mérföldet tesz meg, ${formatearNumero(ctx, galones)} gallon üzemanyag kell.`,
          `Gallononként ${m(precio)} árral ez összesen ${m(galones * precio)}. Ha ketten osztoznak a költségen, fejenként ${m((galones * precio) / 2)} jut.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Egy 300 kilométeres oda-vissza úthoz egy 100 km-en 8 litert fogyasztó autónak ${formatearNumero(ctx, litros)} liter üzemanyag kell.`,
          `Literenként ${m(precio)} árral ez összesen ${m(litros * precio)}. Ha ketten osztoznak a költségen, fejenként ${m((litros * precio) / 2)} jut.`,
        ];
      })();
  const prevod = Math.round((235.215 / 30) * 10) / 10;
  return {
    h1: "Üzemanyagköltség kalkulátor",
    title: tituloQueEntre(`Üzemanyagköltség kalkulátor (${ctx.nombrePais})`, "Üzemanyagköltség kalkulátor: mennyibe kerül az út", "Üzemanyagköltség kalkulátor"),
    description: "Számold ki, mennyi üzemanyag kell az utadhoz és mennyibe kerül, a távolság, az autó fogyasztása és az üzemanyagár alapján.",
    intro: [
      `Add meg a távolságot, az autód fogyasztását és az üzemanyag árát ${imperial ? "gallononként" : "literenként"}. Látod, mennyi üzemanyag kell, és mennyibe kerül az út.`,
      imperial ? "A fogyasztást mérföld per gallonban (mpg) adod meg." : "A fogyasztást megadhatod liter/100 km-ben vagy kilométer/literben.",
    ],
    comoSeCalcula: imperial
      ? ["Gallon = távolság ÷ mérföld per gallon.", "Költség = gallon × gallononkénti ár. Ha az „Oda-vissza” lehetőséget választod, a távolság a duplájára nő."]
      : [
          "Liter/100 km esetén: liter = távolság × fogyasztás ÷ 100.",
          "Kilométer/liter esetén: liter = távolság ÷ fogyasztás.",
          "Költség = liter × literenkénti ár. Ha az „Oda-vissza” lehetőséget választod, a távolság a duplájára nő.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Hogyan váltom át a mérföld per gallont liter/100 km-re?",
        respuesta: `Oszd el ezt a számot: ${formatearNumero(ctx, 235.215, 1)}, az mpg értékkel (amerikai gallon). Egy autó, amely gallononként 30 mérföldet tesz meg, nagyjából ${formatearNumero(ctx, prevod, 1)} litert fogyaszt 100 km-en.`,
      },
      {
        pregunta: "Benne van az útdíj és az autópálya-matrica?",
        respuesta: "Nincs. Csak az üzemanyaggal számolunk. Az útdíjat, a matricát és a parkolást külön add hozzá.",
      },
      {
        pregunta: "Miért fogyaszt többet az autó városban?",
        respuesta: "A sok megállás és indulás több energiát igényel, mint az egyenletes sebességű autópályás haladás. Ezért városban általában nagyobb a fogyasztás.",
      },
    ],
    glosario: [
      { termino: "Fogyasztás", definicion: "Mennyi üzemanyagot használ az autó egy adott távon, vagy mekkora utat tesz meg egy adott mennyiséggel." },
      { termino: "mpg", definicion: "Mérföld per gallon. Minél nagyobb az érték, annál takarékosabb az autó." },
    ],
  };
};
