import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Člověk s hmotností 160 lb a výškou 5 ft 9 in má BMI ${n((160 * KG_POR_LB) / (m * m))}. To je normální hmotnost.`,
        `Zdravá hmotnost při této výšce je od ${n((18.5 * m * m) / KG_POR_LB)} lb do ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Člověk s hmotností 70 kg a výškou ${n(1.75, 2)} m má BMI ${n(70 / (1.75 * 1.75))}. To je normální hmotnost.`,
        `Zdravá hmotnost při této výšce je od ${n(18.5 * 1.75 * 1.75)} kg do ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "Kalkulačka BMI",
    title: tituloQueEntre(`Kalkulačka BMI: ${ctx.nombrePais}`, "Kalkulačka BMI (index tělesné hmotnosti)", "Kalkulačka BMI"),
    description: "Spočítejte si index tělesné hmotnosti (BMI) podle hmotnosti a výšky. Zjistěte svou kategorii podle WHO a rozmezí zdravé hmotnosti pro vaši výšku.",
    intro: [
      "Zadejte hmotnost a výšku. Uvidíte své BMI, kategorii podle klasifikace Světové zdravotnické organizace a rozmezí zdravé hmotnosti pro vaši výšku.",
      "Jde o obecný ukazatel pro dospělé. Nenahrazuje konzultaci s lékařem.",
    ],
    comoSeCalcula: [
      imperial ? "BMI = hmotnost v librách × 703 ÷ (výška v palcích × výška v palcích)." : "BMI = hmotnost v kilogramech ÷ (výška v metrech × výška v metrech).",
      `Pod ${n(18.5)} znamená podváhu, ${n(18.5)} až ${n(24.9)} normální hmotnost, 25 až ${n(29.9)} nadváhu. Od 30 výše jde o obezitu.`,
      `Zdravá hmotnost zahrnuje hodnoty, při kterých BMI pro vaši výšku zůstává mezi ${n(18.5)} a ${n(24.9)}.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Jaké BMI je normální?",
        respuesta: `Podle WHO je to u dospělých ${n(18.5)} až ${n(24.9)}. Hranice jsou stejné pro ženy i muže.`,
      },
      {
        pregunta: "Hodí se BMI pro každého?",
        respuesta: "Ne. Nerozlišuje svaly a tuk, takže u lidí s velkým podílem svalové hmoty může vycházet nadsazené. U těhotných žen, dětí a dospívajících se hodnotí jinak.",
      },
      {
        pregunta: "Co dělat, když mám vysoké BMI?",
        respuesta: "Proberte výsledek s lékařem nebo nutričním terapeutem. Vyplatí se ho posuzovat spolu s dalšími ukazateli: obvodem pasu, stravováním a pohybovou aktivitou.",
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Index tělesné hmotnosti: poměr vaší hmotnosti k druhé mocnině výšky." },
      { termino: "WHO", definicion: "Světová zdravotnická organizace. Stanovuje kategorie BMI pro dospělé." },
    ],
  };
};
