import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Egy 150 ft² felületre 12 × 12 in méretű lapokkal (egy lap 1 ft²) és 10% ráhagyással ${piezas} darab lap kell.`,
          `Ha egy dobozban 10 lap van, vegyél ${Math.ceil(piezas / 10)} dobozt.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Egy 20 m² felületre 60 × 60 cm méretű lapokkal (egy lap ${n(pieza)} m²) és 10% ráhagyással ${piezas} darab lap kell.`,
          `Ha egy dobozban 4 lap van, vegyél ${Math.ceil(piezas / 4)} dobozt.`,
        ];
      })();
  return {
    h1: "Csempe kalkulátor: burkolólap szükséglet",
    title: tituloQueEntre(`Csempe kalkulátor (${ctx.nombrePais})`, "Csempe kalkulátor: hány doboz burkolólap kell", "Csempe kalkulátor"),
    description: "Számold ki, hány csempe vagy járólap kell a falra vagy a padlóra, vágási ráhagyással együtt, és hány dobozt kell venned.",
    intro: [
      "Add meg a felületet, egy lap méretét és azt, hány lap van egy dobozban. Látod, hány lapot és hány dobozt kell venned.",
      "A vágási ráhagyás fedezi a szélek vágását és a munka közben eltört darabokat.",
    ],
    comoSeCalcula: [
      `Egy lap területe = hossz × szélesség, ${imperial ? "négyzetlábban" : "négyzetméterben"}.`,
      "Lapok száma = felület × (1 + ráhagyás ÷ 100) ÷ egy lap területe, felfelé kerekítve.",
      "Dobozok = lapok száma ÷ lapok egy dobozban, felfelé kerekítve.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Mekkora vágási ráhagyással számoljak?",
        respuesta: "Egyenes rakásnál 10% elég. Átlós vagy halszálkás rakásnál, illetve sok vágást igénylő helyiségben 15% és 20% között.",
      },
      {
        pregunta: "Számoljak a fugákkal is?",
        respuesta: "Nem kell. A fuga csak néhány milliméter, és ezt a különbséget a vágási ráhagyás fedezi.",
      },
      {
        pregunta: "Érdemes kicsit többet venni?",
        respuesta: "Igen, tarts meg néhány lapot ugyanabból a gyártási tételből. Ha később eltörik egy, ugyanazt az árnyalatot nehéz lehet beszerezni.",
      },
    ],
    glosario: [
      { termino: "Vágási ráhagyás", definicion: "Az a százalék, amennyivel több lapot veszel a vágásokra és a törött darabokra." },
      { termino: "Gyártási tétel", definicion: "Egy gyártási sorozat. A különböző tételekből származó lapok árnyalata kicsit eltérhet." },
    ],
  };
};
