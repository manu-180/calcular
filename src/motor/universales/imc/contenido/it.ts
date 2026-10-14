import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperiale = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperiale
    ? [
        `Una persona che pesa 160 libbre ed è alta 5 piedi e 9 pollici ha un BMI di ${n((160 * KG_POR_LB) / (m * m))}: è normopeso.`,
        `A quell'altezza, il peso nella norma va da ${n((18.5 * m * m) / KG_POR_LB)} a ${n((24.9 * m * m) / KG_POR_LB)} libbre.`,
      ]
    : [
        `Una persona che pesa 70 kg ed è alta ${n(1.75, 2)} m ha un BMI di ${n(70 / (1.75 * 1.75))}: è normopeso.`,
        `A quell'altezza, il peso nella norma va da ${n(18.5 * 1.75 * 1.75)} a ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "Calcolo BMI",
    title: tituloQueEntre(`Calcolo BMI, indice di massa corporea | ${ctx.nombrePais}`, `Calcolo BMI | ${ctx.nombrePais}`, "Calcolo BMI"),
    description: "Calcola il tuo indice di massa corporea da peso e altezza, scopri la categoria secondo l'OMS e il peso nella norma per la tua altezza.",
    intro: [
      "Inserisci peso e altezza. Vedi il tuo BMI, la categoria secondo l'Organizzazione Mondiale della Sanità e l'intervallo di peso nella norma per la tua altezza.",
      "È un'indicazione generale per gli adulti e non sostituisce il parere del medico.",
    ],
    comoSeCalcula: [
      imperiale ? "BMI = peso in libbre × 703 ÷ (altezza in pollici × altezza in pollici)." : "BMI = peso in chili ÷ (altezza in metri × altezza in metri).",
      `Sotto ${n(18.5)} si parla di sottopeso. Da ${n(18.5)} a ${n(24.9)} di normopeso. Da 25 a ${n(29.9)} di sovrappeso. Da 30 in su di obesità.`,
      `Il peso nella norma è quello che, alla tua altezza, dà un BMI tra ${n(18.5)} e ${n(24.9)}.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Qual è un BMI normale?",
        respuesta: `Per l'OMS, negli adulti, un BMI tra ${n(18.5)} e ${n(24.9)}. L'intervallo è lo stesso per donne e uomini.`,
      },
      {
        pregunta: "BMI e IMC sono la stessa cosa?",
        respuesta: "Sì. BMI è la sigla inglese (body mass index), IMC quella italiana (indice di massa corporea). Il calcolo è identico.",
      },
      {
        pregunta: "Il BMI vale per tutti?",
        respuesta: "No. Non distingue i muscoli dal grasso, quindi chi è molto muscoloso può avere un valore alto. In gravidanza e per bambini e ragazzi si usano altri riferimenti.",
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Indice di massa corporea: mette in rapporto il peso con l'altezza." },
      { termino: "OMS", definicion: "Organizzazione Mondiale della Sanità, che stabilisce le categorie di BMI per gli adulti." },
    ],
  };
};
