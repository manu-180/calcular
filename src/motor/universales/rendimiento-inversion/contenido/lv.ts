import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Ieguldījumu ienesīguma (ROI) kalkulators",
    title: tituloQueEntre(
      `Ieguldījumu ienesīgums ROI un CAGR ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      "Ieguldījumu ienesīgums: ROI un CAGR kalkulators",
      "ROI un CAGR kalkulators",
    ),
    description: "Aprēķiniet ieguldījumu kopējo ienesīgumu (ROI) un gada ienesīgumu (CAGR) pēc ieguldītās summas, pašreizējās vērtības un gadu skaita.",
    intro: [
      "50% peļņa pāris gados un desmitgadē nozīmē pavisam dažādas lietas. Lai salīdzinātu ieguldījumus, vajadzīgs gada ienesīgums.",
      "Ievadiet, cik ieguldījāt, kāda ir ieguldījuma vērtība šodien un cik gadu pagājis. Parādīsim kopējo ienesīgumu un vidējo gada ienesīgumu ar saliktajiem procentiem.",
    ],
    comoSeCalcula: [
      "ROI = (galīgā vērtība + izmaksātie ienākumi − ieguldītā summa) ÷ ieguldītā summa × 100.",
      "CAGR = ((galīgā vērtība + izmaksātie ienākumi) ÷ ieguldītā summa) pakāpē (1 ÷ gadu skaits), mīnus 1.",
      "CAGR ir saliktais gada pieauguma temps: tāds, kas dod to pašu rezultātu, atkārtojoties katru gadu.",
    ],
    ejemplo: [
      `Ja ieguldāt ${m(inicial)} un beigās jums ir ${m(final)}, nopelnāt ${m(final - inicial)}: ROI ir ${p(roi(inicial, final))}.`,
      `Ja ilgums ir 5 gadi, gada ienesīgums ir ${p(cagr(inicial, final, 5))}. Ja ilgums ir 2 gadi, tas sasniedz ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Ar ko atšķiras ROI un CAGR?",
        respuesta: "ROI ir kopējā peļņa no ieguldītās summas, neņemot vērā laiku. CAGR to sadala pa gadiem, tāpēc varat salīdzināt dažāda ilguma ieguldījumus.",
      },
      {
        pregunta: "Kāpēc gada ienesīgums nav vienkārši kopējais ienesīgums, izdalīts ar gadu skaitu?",
        respuesta: `Jo katra gada peļņa pievienojas atlikumam un turpina pelnīt. Ja 50% peļņa sasniegta piecos gados, gada ienesīgums ar saliktajiem procentiem ir ${p(cagr(1, 1.5, 5))}, nevis 10%.`,
      },
      {
        pregunta: "Kā iekļaut izmaksātās dividendes vai procentus?",
        respuesta: "Ja tos izņēmāt, ievadiet izmaksātajos ienākumos. Ja tos atkārtoti ieguldījāt, tie jau ir galīgajā vērtībā.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Ieguldījumu ienesīgums: kopējā peļņa procentos no ieguldītās summas." },
      { termino: "CAGR", definicion: "Saliktais gada pieauguma temps: vidējais gada ienesīgums, ieskaitot saliktos procentus." },
    ],
  };
};
