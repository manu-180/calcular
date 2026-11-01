import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Algas pielikuma kalkulators",
    title: tituloQueEntre(
      `Algas pielikuma kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      `Algas pielikums ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      "Algas pielikuma kalkulators",
    ),
    description: "Aprēķiniet jauno algu pēc pielikuma, starpību mēnesī un gadā un uzziniet, vai reālais pielikums apsteidz inflāciju.",
    intro: [
      "Jums piedāvā lielāku algu vai plānojat to lūgt. Ievadiet algu un pielikumu procentos vai naudā, un redzēsiet, cik mainīsies katru mēnesi un visa gada laikā.",
      "Pievienojiet perioda inflāciju, un parādīsim, vai jūsu pirktspēja tiešām aug vai alga tikai panāk cenas.",
    ],
    comoSeCalcula: [
      "Jaunā alga = pašreizējā alga × (1 + pielikums ÷ 100).",
      "Starpība gadā = starpība mēnesī × algu skaits gadā.",
      "Reālais pielikums = (1 + pielikums) ÷ (1 + inflācija) − 1.",
    ],
    ejemplo: [
      `Ja mēneša algu ${m(sueldo)} palielina par 5%, jaunā alga ir ${m(sueldo * 1.05)}: par ${m(sueldo * 0.05)} vairāk katru mēnesi un par ${m(sueldo * 0.05 * 12)} vairāk gadā.`,
      `Ja perioda inflācija bija 3%, reālais pielikums ir ${p(aumentoReal(5, 3))}. Ja inflācija ir 6%, tas ir ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Kas ir reālais algas pielikums?",
        respuesta: "Tas ir pielikums, ņemot vērā inflāciju. Tas parāda, vai par jauno algu nopirksiet vairāk vai mazāk nekā agrāk.",
      },
      {
        pregunta: "Kāpēc nepietiek no pielikuma atņemt inflāciju?",
        respuesta: `Jo procentus reizina, nevis atņem. Ja pielikums ir 5%, bet inflācija 3%, reālais pielikums ir ${p(aumentoReal(5, 3))}, nevis 2%. Ja inflācija ir liela, starpība ir daudz lielāka.`,
      },
      {
        pregunta: "Cik lūgt?",
        respuesta: "Vismaz tik, cik sasniedz inflācija kopš pēdējā pielikuma, lai nezaudētu pirktspēju. Turklāt ņemiet vērā, cik par līdzīgu amatu maksā citi darba devēji un cik pieaugusi jūsu atbildība.",
      },
    ],
    glosario: [
      { termino: "Nominālais pielikums", definicion: "Pielikums, kas norādīts algas lapiņā, neņemot vērā inflāciju." },
      { termino: "Pirktspēja", definicion: "Tas, ko varat nopirkt par savu algu." },
    ],
  };
};
