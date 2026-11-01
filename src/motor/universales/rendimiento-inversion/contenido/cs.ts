import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Kalkulačka návratnosti investice (ROI)",
    title: tituloQueEntre(
      `Návratnost investice ROI a CAGR: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      "Návratnost investice: kalkulačka ROI a CAGR",
      "Kalkulačka ROI a CAGR",
    ),
    description: "Spočítejte celkovou návratnost investice (ROI) a roční výnos (CAGR) z vložené částky, současné hodnoty a počtu let.",
    intro: [
      "Zisk 50 % zní dobře, ale za 2 roky je to něco jiného než za 10 let. Pro srovnání investic potřebujete výnos za rok.",
      "Zadejte, kolik jste investovali, kolik má investice dnes a kolik let uplynulo. Ukážeme celkovou návratnost i průměrný roční výnos se složeným úročením.",
    ],
    comoSeCalcula: [
      "ROI = (konečná hodnota + vyplacené výnosy − investovaná částka) ÷ investovaná částka × 100.",
      "CAGR = ((konečná hodnota + vyplacené výnosy) ÷ investovaná částka) na (1 ÷ počet let), minus 1.",
      "CAGR je složená roční míra růstu: ta, která dá stejný výsledek, když se opakuje každý rok.",
    ],
    ejemplo: [
      `Když investujete ${m(inicial)} a na konci máte ${m(final)}, vyděláte ${m(final - inicial)}: ROI je ${p(roi(inicial, final))}.`,
      `Pokud to trvalo 5 let, roční výnos je ${p(cagr(inicial, final, 5))}. Pokud 2 roky, je to ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Jaký je rozdíl mezi ROI a CAGR?",
        respuesta: "ROI je celkový zisk z vložené částky bez ohledu na čas. CAGR ho rozpočítá na rok, takže můžete porovnat investice s různou délkou.",
      },
      {
        pregunta: "Proč roční výnos není jen celkový výnos vydělený počtem let?",
        respuesta: `Protože zisky každého roku se připisují k zůstatku a dál vydělávají. Zisk 50 % za 5 let odpovídá ročnímu výnosu ${p(cagr(1, 1.5, 5))} se složeným úročením, ne 10 %.`,
      },
      {
        pregunta: "Jak započítat vyplacené dividendy nebo úroky?",
        respuesta: "Pokud jste je vybrali, zadejte je do vyplacených výnosů. Pokud jste je znovu investovali, jsou už v konečné hodnotě.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Návratnost investice: celkový zisk v procentech z vložené částky." },
      { termino: "CAGR", definicion: "Složená roční míra růstu: průměrný roční výnos se započtením složeného úročení." },
    ],
  };
};
