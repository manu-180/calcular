import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Ja svars ir 160 lb un augums 5 ft 9 in, ĶMI ir ${n((160 * KG_POR_LB) / (m * m))}. Tas ir normāls svars.`,
        `Veselīgs svars pie šāda auguma ir no ${n((18.5 * m * m) / KG_POR_LB)} lb līdz ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Ja svars ir 70 kg un augums ${n(1.75, 2)} m, ĶMI ir ${n(70 / (1.75 * 1.75))}. Tas ir normāls svars.`,
        `Veselīgs svars pie šāda auguma ir no ${n(18.5 * 1.75 * 1.75)} kg līdz ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "ĶMI kalkulators",
    title: tituloQueEntre(`ĶMI kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`, "ĶMI kalkulators (ķermeņa masas indekss)", "ĶMI kalkulators"),
    description: "Aprēķiniet ķermeņa masas indeksu (ĶMI) pēc svara un auguma. Uzziniet savu kategoriju pēc PVO un veselīga svara intervālu jūsu augumam.",
    intro: [
      "Ievadiet svaru un augumu. Redzēsiet savu ĶMI, kategoriju pēc Pasaules Veselības organizācijas klasifikācijas un veselīga svara intervālu jūsu augumam.",
      "Tas ir vispārīgs pieaugušo rādītājs. Tas neaizstāj ārsta konsultāciju.",
    ],
    comoSeCalcula: [
      imperial ? "ĶMI = svars mārciņās × 703 ÷ (augums collās × augums collās)." : "ĶMI = svars kilogramos ÷ (augums metros × augums metros).",
      `Mazāk par ${n(18.5)} nozīmē nepietiekamu svaru, no ${n(18.5)} līdz ${n(24.9)} normālu svaru, no 25 līdz ${n(29.9)} lieko svaru. No 30 sākas aptaukošanās.`,
      `Veselīgs svars aptver vērtības, pie kurām ĶMI jūsu augumam paliek starp ${n(18.5)} un ${n(24.9)}.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kāds ĶMI ir normāls?",
        respuesta: `Pēc PVO pieaugušajiem tas ir no ${n(18.5)} līdz ${n(24.9)}. Robežas ir vienādas sievietēm un vīriešiem.`,
      },
      {
        pregunta: "Vai ĶMI der visiem?",
        respuesta: "Nē. Tas neatšķir muskuļus no taukiem, tāpēc cilvēkiem ar lielu muskuļu masu tas var rādīt pārāk lielu vērtību. Grūtniecēm, bērniem un pusaudžiem to vērtē citādi.",
      },
      {
        pregunta: "Ko darīt, ja ĶMI ir liels?",
        respuesta: "Pārrunājiet rezultātu ar ārstu vai uztura speciālistu. Ir vērts to vērtēt kopā ar citiem rādītājiem: vidukļa apkārtmēru, uzturu un fizisko aktivitāti.",
      },
    ],
    glosario: [
      { termino: "ĶMI", definicion: "Ķermeņa masas indekss: svara un auguma kvadrāta attiecība." },
      { termino: "PVO", definicion: "Pasaules Veselības organizācija. Tā nosaka ĶMI kategorijas pieaugušajiem." },
    ],
  };
};
