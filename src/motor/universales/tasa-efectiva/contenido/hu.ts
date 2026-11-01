import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "Névleges kamatláb átváltása effektív kamatlábra",
    title: tituloQueEntre(`Effektív kamatláb kalkulátor: ${ctx.nombrePais}`, "Effektív kamatláb: átváltás névlegesből", "Effektív kamatláb kalkulátor"),
    description: "Váltsd át a névleges éves kamatlábat effektív éves kamatlábra és vissza, havi, negyedéves, féléves vagy napi tőkésítéssel.",
    intro: [
      "Két ajánlat ugyanazzal a kamattal is lehet eltérően drága. A különbség abban van, milyen gyakran számolják fel vagy írják jóvá a kamatot.",
      "Az effektív éves kamatláb közös nevezőre hozza az ajánlatokat: megmutatja, mennyit fizetsz vagy keresel valójában egy év alatt. Válaszd ki, melyik kamatláb van meg neked, és kiszámoljuk a másikat.",
    ],
    comoSeCalcula: [
      "Effektív kamatláb = (1 + névleges kamatláb ÷ m) az m-ediken, mínusz 1. Az m a tőkésítések száma egy évben: havi tőkésítésnél 12, negyedévesnél 4.",
      "Névleges kamatláb = m × ((1 + effektív kamatláb) az (1 ÷ m)-ediken, mínusz 1).",
      "Az egy időszakra eső kamatláb a névleges kamatláb osztva m értékével.",
    ],
    ejemplo: [
      `Évi 12% névleges kamat havi tőkésítéssel ennyi effektív kamatnak felel meg: ${p(aEfectiva(12, 12))}.`,
      `A 10% effektív kamat havi tőkésítésnél ennyi névleges kamatnak felel meg: ${p(aNominal(10, 12))}.`,
    ],
    faq: [
      {
        pregunta: "Mi a különbség a névleges és az effektív kamatláb között?",
        respuesta:
          "A névleges kamatláb az éves kamat a tőkésítés hatása nélkül. Az effektív azt is figyelembe veszi, hogy a már jóváírt kamat is kamatozik. Ezért az effektív kamatláb mindig ugyanakkora vagy nagyobb, mint a névleges.",
      },
      {
        pregunta: "Melyik kamatlábat nézzem, ha ajánlatokat hasonlítok össze?",
        respuesta:
          "Megtakarításnál az effektív kamatlábat, mert az mutatja, mennyit keresel valójában. Hiteleknél a THM-et hasonlítsd össze, mert az a kamat mellett a díjakat is tartalmazza.",
      },
      {
        pregunta: "Miért növeli az effektív kamatot a gyakoribb tőkésítés?",
        respuesta:
          "A kamat hamarabb hozzáadódik az egyenleghez, és onnantól az is kamatozik. Éves tőkésítésnél a névleges és az effektív kamatláb ugyanakkora.",
      },
    ],
    glosario: [
      { termino: "Névleges kamatláb", definicion: "Éves kamatláb a tőkésítés hatása nélkül." },
      { termino: "Effektív kamatláb", definicion: "Éves kamatláb a kamatos kamattal együtt." },
      { termino: "Tőkésítés", definicion: "Az a pillanat, amikor a kamat hozzáadódik az egyenleghez." },
      { termino: "THM", definicion: "Teljes hiteldíj mutató: a hitel kamata és összes díja egyetlen számban." },
    ],
  };
};
