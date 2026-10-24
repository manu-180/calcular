import { deRo } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const placi = (k: number) => `${k} ${deRo(k)}${k === 1 ? "placă" : "plăci"}`;
  const cutii = (k: number) => `${k} ${deRo(k)}${k === 1 ? "cutie" : "cutii"}`;
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Pentru 150 ft² cu plăci de 12 × 12 in (1 ft² fiecare) și 10% pierderi, vă trebuie ${placi(piezas)}.`,
          `Dacă o cutie are 10 plăci, înseamnă ${cutii(Math.ceil(piezas / 10))}.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Pentru 20 m² cu plăci de 60 × 60 cm (${n(pieza)} m² fiecare) și 10% pierderi, vă trebuie ${placi(piezas)}.`,
          `Dacă o cutie are 4 plăci, înseamnă ${cutii(Math.ceil(piezas / 4))}.`,
        ];
      })();
  return {
    h1: "Calculator gresie și faianță",
    title: tituloQueEntre(`Calculator gresie și faianță: ${ctx.nombrePais}`, "Calculator gresie și faianță", "Calculator gresie"),
    description: "Calculați câte plăci de gresie sau faianță vă trebuie pentru o pardoseală sau un perete, cu pierderi incluse, și câte cutii să cumpărați.",
    intro: [
      "Introduceți suprafața, dimensiunile unei plăci și câte plăci are o cutie. Vedeți câte plăci și câte cutii trebuie cumpărate.",
      "Procentul de pierderi acoperă tăieturile de la margini și plăcile care se sparg.",
    ],
    comoSeCalcula: [
      `Suprafața unei plăci = lungimea × lățimea, transformată în ${imperial ? "picioare pătrate" : "metri pătrați"}.`,
      "Plăci = suprafața × (1 + pierderi ÷ 100) ÷ suprafața unei plăci, rotunjit în sus.",
      "Cutii = plăci ÷ plăci într-o cutie, rotunjit în sus.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Cât procent de pierderi să iau în calcul?",
        respuesta: "10% la montaj drept. La montaj în diagonală sau în spic ori în încăperi cu multe tăieturi, între 15% și 20%.",
      },
      {
        pregunta: "Trebuie să țin cont de rosturi?",
        respuesta: "Nu. Rosturile au câțiva milimetri, iar procentul de pierderi acoperă deja diferența.",
      },
      {
        pregunta: "Merită să cumpăr plăci în plus?",
        respuesta: "Da, câteva plăci de rezervă din același lot. Dacă una se sparge mai târziu, poate fi greu de găsit aceeași nuanță.",
      },
    ],
    glosario: [
      { termino: "Pierderi", definicion: "Procentul în plus care se cumpără pentru tăieturi și spargeri." },
      { termino: "Lot", definicion: "Seria de producție. Plăcile din loturi diferite pot avea nuanțe puțin diferite." },
    ],
  };
};
