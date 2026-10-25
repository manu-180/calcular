import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Egy 10 × 10 ft méretű, 4 in vastag teraszhoz ${n(ft3)} ft³ beton kell, ami ${n(ft3 / 27)} köbyard.`,
          `A mintakeverékkel ehhez nagyjából ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb cement szükséges.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Egy 4 × 3 m méretű, 10 cm vastag betonlaphoz ${n(volumen, 1)} m³ beton kell.`,
          `A mintakeverékkel ehhez nagyjából ${n(MEZCLA.cementoKg * volumen, 0)} kg cement, ${n(MEZCLA.arenaM3 * volumen)} m³ homok és ${n(MEZCLA.piedraM3 * volumen)} m³ kavics szükséges.`,
        ];
      })();
  return {
    h1: "Beton kalkulátor",
    title: tituloQueEntre(`Beton kalkulátor: ${ctx.nombrePais}`, "Beton és cement kalkulátor", "Beton kalkulátor"),
    description: `Számold ki, mennyi beton kell egy betonlaphoz ${imperial ? "köbyardban" : "köbméterben"}, és nagyjából mennyi cementet, homokot és kavicsot vegyél.`,
    intro: [
      "Add meg a hosszt, a szélességet és a vastagságot. Látod a beton térfogatát és a keverékhez szükséges anyagok közelítő mennyiségét.",
      "Az anyagmennyiség a keverési aránytól függ. A kalkulátor példaként egy szokásos, 1:2:3 arányú keverékkel számol.",
    ],
    comoSeCalcula: [
      imperial
        ? "Térfogat = hossz × szélesség × vastagság, a vastagságot lábban megadva. A köblábat elosztva huszonhéttel köbyardot kapsz."
        : "Térfogat = hossz × szélesség × vastagság, a vastagságot méterben megadva.",
      "A térfogathoz ráhagyást adunk az egyenetlen alapra és a kiömlő betonra.",
      `Egy köbméterhez nagyjából ${MEZCLA.cementoKg} kg cement, ${n(MEZCLA.arenaM3)} m³ homok, ${n(MEZCLA.piedraM3, 1)} m³ kavics és ${MEZCLA.aguaL} liter víz kell.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Mennyi cement kell egy köbméter betonhoz?",
        respuesta: `1:2:3 arányú keveréknél nagyjából ${MEZCLA.cementoKg} kg. Erősebb betonhoz több cement kell.`,
      },
      {
        pregunta: "Hány köbláb egy köbyard?",
        respuesta: "Huszonhét. A köbyard egy 3 ft × 3 ft × 3 ft méretű kocka.",
      },
      {
        pregunta: "Érdemes kész betont rendelni betonüzemből?",
        respuesta: "Nagyobb betonozásnál a mixerkocsis kész beton egyenletesebb, és gyorsabban halad a munka; köbméterre árulják. Kisebb munkáknál a betont általában a helyszínen keverik ilyen arányokban.",
      },
    ],
    glosario: [
      { termino: "Keverési arány", definicion: "A cement, a homok, a kavics és a víz aránya a keverékben." },
      { termino: "Köbméter (m³)", definicion: "Egy 1 méter élhosszúságú kocka térfogata, köznyelven köbméter vagy „köb”." },
    ],
  };
};
