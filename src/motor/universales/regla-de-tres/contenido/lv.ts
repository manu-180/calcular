import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Proporcijas kalkulators",
    title: tituloQueEntre(`Proporcijas kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`, "Kā aprēķināt proporciju: kalkulators", "Proporcijas kalkulators"),
    description: "Atrisiniet tiešu un apgrieztu proporcionalitāti vienā mirklī. Ievadiet trīs vērtības un iegūsiet ceturto kopā ar aprēķina gaitu.",
    intro: [
      "Proporcija noder tad, kad divi lielumi mainās kopā un ir zināmas trīs no četrām vērtībām.",
      "Izvēlieties tiešu vai apgrieztu proporcionalitāti, ievadiet A, B un C, un kalkulators aprēķinās X.",
    ],
    comoSeCalcula: [
      "Tieša proporcionalitāte: X = B × C ÷ A. Izmantojiet, ja abi lielumi pieaug kopā (vairāk kilogramu, lielāka cena).",
      "Apgriezta proporcionalitāte: X = A × B ÷ C. Izmantojiet, ja viens lielums pieaug, bet otrs samazinās (vairāk cilvēku, mazāk dienu).",
    ],
    ejemplo: [
      `Ja 3 kilogrami maksā ${m(precio3)}, tad 5 kilogrami maksā ${m((precio3 * 5) / 3)}.`,
      "Ja māju krāso 4 cilvēki, darba ilgums ir 12 dienas. Ja krāso 6 cilvēki, ilgums ir 8 dienas.",
    ],
    faq: [
      {
        pregunta: "Kā atšķirt tiešu proporcionalitāti no apgrieztas?",
        respuesta: "Ja viens lielums pieaug kopā ar otru, proporcionalitāte ir tieša. Ja viens samazinās, bet otrs pieaug, tā ir apgriezta.",
      },
      {
        pregunta: "Kā aprēķināt tiešu proporciju ar roku?",
        respuesta: `Divas zināmās vērtības sareiziniet krusteniski un izdaliet ar atlikušo. Ja 3 atbilst 600, tad 5 atbilst 600 × 5 ÷ 3 = ${formatearNumero(ctx, (600 * 5) / 3)}.`,
      },
      {
        pregunta: "Vai proporciju var izmantot procentiem?",
        respuesta: "Jā. Ja 200 ir 100%, tad 50 ir 25%: tā ir tieša proporcionalitāte, kur A = 200, B = 100 un C = 50.",
      },
    ],
    glosario: [
      { termino: "Tieša proporcionalitāte", definicion: "Abi lielumi kopā pieaug vai samazinās." },
      { termino: "Apgriezta proporcionalitāte", definicion: "Vienam lielumam pieaugot, otrs samazinās." },
    ],
  };
};
