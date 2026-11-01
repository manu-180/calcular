import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Izračun marže in pribitka",
    title: tituloQueEntre(`Izračun marže ${GRAMATICA.sl.para(ctx.nombrePais)}`, "Izračun marže in pribitka", "Izračun marže"),
    description: "Izračunajte maržo in pribitek iz stroška in prodajne cene ali prodajno ceno, s katero dosežete želeno maržo.",
    intro: [
      "Maržo in pribitek pogosto zamenjujemo, ta razlika pa vas lahko drago stane. Oba merita isti dobiček, le glede na drugo osnovo.",
      "Vnesite strošek in prodajno ceno in videli boste obe številki. Lahko pa določite maržo in kalkulator vam pove, po kateri ceni morate prodajati.",
    ],
    comoSeCalcula: [
      "Dobiček = prodajna cena − strošek.",
      "Marža = dobiček ÷ prodajna cena × 100.",
      "Pribitek = dobiček ÷ strošek × 100.",
      "Cena za želeno maržo = strošek ÷ (1 − marža ÷ 100).",
    ],
    ejemplo: [
      `Izdelek s stroškom ${m(costo)}, ki ga prodajate po ${m(precio)}, prinese ${m(precio - costo)} dobička: marža je ${p(((precio - costo) / precio) * 100)}, pribitek pa ${p(((precio - costo) / costo) * 100)}.`,
      `Za maržo 50 % pri istem strošku morate prodajati po ${m(precioConMargen(costo, 50))}. Če strošku samo dodate 50 %, bo marža le ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Kakšna je razlika med maržo in pribitkom?",
        respuesta: "Marža je dobiček glede na prodajno ceno. Pribitek je dobiček glede na strošek. Pri istem dobičku je pribitek vedno večja številka.",
      },
      {
        pregunta: "Kako določim ceno za želeno maržo?",
        respuesta: `Strošek delite z (1 − marža). Za maržo 30 % strošek delite z ${formatearNumero(ctx, 0.7, 2)}. Ne dodajte strošku samo 30 %: zaslužili boste manj, kot pričakujete.`,
      },
      {
        pregunta: "Ali mora strošek vsebovati davke?",
        respuesta: "Strošek in ceno računajte brez davkov, ki jih prenesete na kupca, na primer brez DDV. Sicer je marža videti večja, kot je v resnici.",
      },
    ],
    glosario: [
      { termino: "Marža", definicion: "Dobiček kot odstotek prodajne cene." },
      { termino: "Pribitek", definicion: "Dobiček kot odstotek stroška, torej to, kar se doda nabavni ceni." },
    ],
  };
};
