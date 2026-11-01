import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x, 0);
  return {
    h1: "Procentu kalkulators",
    title: tituloQueEntre(`Procentu kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`, "Procentu kalkulators: kā aprēķināt", "Procentu kalkulators"),
    description: "Aprēķiniet procentus no skaitļa, cik procentu viens skaitlis veido no cita un rezultātu, pieskaitot vai atņemot procentus.",
    intro: [
      "Izvēlieties, ko vēlaties uzzināt, ievadiet abus skaitļus, un rezultātu redzēsiet uzreiz.",
      "Kalkulators aptver četrus parastos aprēķinus ar procentiem: daļu, attiecību, palielinājumu un samazinājumu.",
    ],
    comoSeCalcula: [
      "X% no Y = X × Y ÷ 100.",
      "Cik procentu no Y veido X = X ÷ Y × 100.",
      "Y plus X% = Y × (1 + X ÷ 100). Y mīnus X% = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15% no 200 ir ${n((15 * 200) / 100)}.`,
      `30 ir ${n((30 / 120) * 100)}% no 120.`,
      `Sadārdzinoties par 10%, cena ${m(precio)} kļūst ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Kā aprēķināt procentus no skaitļa?",
        respuesta: `Reiziniet skaitli ar procentiem un daliet ar 100. 20% no 350 ir 350 × 20 ÷ 100 = ${n((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Kā uzzināt, cik procentu viens skaitlis veido no cita?",
        respuesta: `Daliet daļu ar veselumu un reiziniet ar 100. Ja no 60 testa jautājumiem pareizi ir 45, tad 45 ÷ 60 × 100 = ${n((45 / 60) * 100)}%.`,
      },
      {
        pregunta: "Kā cenai pieskaitīt procentus?",
        respuesta: `Reiziniet to ar vieninieka un decimālskaitlī izteiktu procentu summu. Lai pieskaitītu 10%, reiziniet ar ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Ja cenu palielināšu par 10% un pēc tam samazināšu par 10%, vai atgriezīšos sākumā?",
        respuesta: `Nē. 100 plus 10% ir ${n(110)}, bet ${n(110)} mīnus 10% ir ${n(99)}. Samazinājumu rēķina no lielāka skaitļa.`,
      },
    ],
    glosario: [
      { termino: "Procents", definicion: "Veseluma daļa, izteikta simtdaļās." },
      { termino: "Bāze", definicion: "Skaitlis, no kura rēķina procentus (šajā kalkulatorā Y)." },
    ],
  };
};
