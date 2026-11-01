import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Procentuālo izmaiņu kalkulators",
    title: tituloQueEntre(
      `Procentuālo izmaiņu kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      "Kā aprēķināt procentuālās izmaiņas",
      "Procentuālo izmaiņu kalkulators",
    ),
    description: "Aprēķiniet, par cik procentiem vērtība pieaugusi vai samazinājusies: cenas, algas, ienākumi vai jebkurš skaitlis, kas laika gaitā mainījies.",
    intro: [
      "Ievadiet sākuma un jauno vērtību. Redzēsiet procentuālo pieaugumu vai samazinājumu un starpību.",
      "Kalkulators parāda arī to, cik vērtībai būtu jāmainās, lai tā atgrieztos pie sākuma vērtības. Tas gandrīz nekad nav tas pats procents.",
    ],
    comoSeCalcula: [
      "Procentuālās izmaiņas = (jaunā vērtība − sākuma vērtība) ÷ sākuma vērtība × 100.",
      "Pozitīvs rezultāts nozīmē pieaugumu, negatīvs samazinājumu.",
      "Ja sākuma vērtība ir negatīva, dala ar tās absolūto vērtību, lai zīme arī turpmāk rādītu, vai stāvoklis uzlabojies.",
    ],
    ejemplo: [
      `Tas, kas maksāja ${m(antes)}, bet tagad maksā ${m(despues)}, kļuvis dārgāks par 25%.`,
      "Lai cena atgrieztos pie sākuma vērtības, tai būtu jāsamazinās par 20%, nevis par 25%.",
    ],
    faq: [
      {
        pregunta: "Kā aprēķināt procentuālo pieaugumu?",
        respuesta: "No jaunās vērtības atņemiet sākuma vērtību, rezultātu izdaliet ar sākuma vērtību un sareiziniet ar 100. No 80 līdz 100: 20 ÷ 80 × 100 = 25%.",
      },
      {
        pregunta: "Kā aprēķināt procentuālo samazinājumu?",
        respuesta: "Rēķina tāpat. No 100 līdz 80: −20 ÷ 100 × 100 = −20%, tātad vērtība samazinājusies par 20%.",
      },
      {
        pregunta: "Kāpēc 25% pieaugums un 25% samazinājums viens otru neatceļ?",
        respuesta: "Katru procentu rēķina no citas bāzes. 80 plus 25% ir 100, bet 100 mīnus 25% ir 75.",
      },
      {
        pregunta: "Ar ko atšķiras procents un procentpunkts?",
        respuesta: "Ja likme pieaug no 10% līdz 12%, starpība ir 2 procentpunkti. Procentuālās izmaiņas ir 20%.",
      },
    ],
    glosario: [
      { termino: "Procentuālās izmaiņas", definicion: "Cik vērtība mainījusies, izteikts procentos no sākuma vērtības." },
      { termino: "Procentpunkts", definicion: "Vienkārša divu procentu starpība." },
    ],
  };
};
