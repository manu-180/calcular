import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `O persoană care cântărește 160 lb și are 5 ft 9 in are un IMC de ${n((160 * KG_POR_LB) / (m * m))}: greutate normală.`,
        `La această înălțime, greutatea sănătoasă este între ${n((18.5 * m * m) / KG_POR_LB)} și ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `O persoană care cântărește 70 kg și are ${n(1.75, 2)} m are un IMC de ${n(70 / (1.75 * 1.75))}: greutate normală.`,
        `La această înălțime, greutatea sănătoasă este între ${n(18.5 * 1.75 * 1.75)} și ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "Calculator IMC",
    title: tituloQueEntre(`Calculator IMC (indice de masă corporală): ${ctx.nombrePais}`, "Calculator IMC: indicele de masă corporală", "Calculator IMC"),
    description: "Calculați indicele de masă corporală după greutate și înălțime, vedeți categoria OMS și intervalul de greutate sănătoasă pentru înălțimea dumneavoastră.",
    intro: [
      "Introduceți greutatea și înălțimea. Vedeți IMC-ul, categoria lui după Organizația Mondială a Sănătății și intervalul de greutate sănătoasă pentru înălțimea dumneavoastră.",
      "Este un reper general pentru adulți, cu rol informativ. Nu înlocuiește consultul la medic.",
    ],
    comoSeCalcula: [
      imperial ? "IMC = greutatea în livre × 703 ÷ (înălțimea în inci × înălțimea în inci)." : "IMC = greutatea în kilograme ÷ (înălțimea în metri × înălțimea în metri).",
      `Sub ${n(18.5)} înseamnă subponderal. Între ${n(18.5)} și ${n(24.9)}, greutate normală. Între 25 și ${n(29.9)}, supraponderal. De la 30 în sus, obezitate.`,
      `Intervalul de greutate sănătoasă este cel care dă un IMC între ${n(18.5)} și ${n(24.9)} la înălțimea dumneavoastră.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Care este IMC-ul normal?",
        respuesta: `După OMS, un IMC între ${n(18.5)} și ${n(24.9)} la adulți. Intervalul este același pentru femei și bărbați.`,
      },
      {
        pregunta: "IMC-ul este valabil pentru toată lumea?",
        respuesta: "Nu. Nu deosebește mușchii de grăsime, așa că persoanele foarte musculoase pot avea un IMC mare. Se folosește diferit și în sarcină, la copii și la adolescenți. Pentru o evaluare, discutați cu medicul.",
      },
      {
        pregunta: "Cum se calculează IMC-ul?",
        respuesta: "Împărțiți greutatea în kilograme la pătratul înălțimii în metri. La 1,75 m, pătratul înălțimii este 1,75 × 1,75.",
      },
    ],
    glosario: [
      { termino: "IMC", definicion: "Indicele de masă corporală: raportul dintre greutate și înălțime." },
      { termino: "OMS", definicion: "Organizația Mondială a Sănătății, care stabilește categoriile de IMC pentru adulți." },
    ],
  };
};
