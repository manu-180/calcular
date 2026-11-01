import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Výpočet marže a prirážky",
    title: tituloQueEntre(`Výpočet marže ${GRAMATICA.sk.para(ctx.nombrePais)}`, "Výpočet marže a prirážky", "Výpočet marže"),
    description: "Vypočítajte maržu a prirážku z nákladov a predajnej ceny alebo predajnú cenu, s ktorou dosiahnete požadovanú maržu.",
    intro: [
      "Marža a prirážka sa často zamieňajú a ten rozdiel vás môže stáť peniaze. Obe merajú rovnaký zisk, len voči inému základu.",
      "Zadajte náklady a predajnú cenu a uvidíte oboje. Alebo zvoľte maržu a kalkulačka vám povie, za koľko predávať.",
    ],
    comoSeCalcula: [
      "Zisk = predajná cena − náklady.",
      "Marža = zisk ÷ predajná cena × 100.",
      "Prirážka = zisk ÷ náklady × 100.",
      "Cena pre požadovanú maržu = náklady ÷ (1 − marža ÷ 100).",
    ],
    ejemplo: [
      `Výrobok s nákladmi ${m(costo)} predávaný za ${m(precio)} prinesie zisk ${m(precio - costo)}: marža je ${p(((precio - costo) / precio) * 100)} a prirážka ${p(((precio - costo) / costo) * 100)}.`,
      `Pre maržu 50 % pri rovnakých nákladoch musíte predávať za ${m(precioConMargen(costo, 50))}. Keď k nákladom len pripočítate 50 %, marža bude iba ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Aký je rozdiel medzi maržou a prirážkou?",
        respuesta: "Marža je zisk vztiahnutý na predajnú cenu. Prirážka je zisk vztiahnutý na náklady. Pri rovnakom zisku je prirážka vždy vyššie číslo.",
      },
      {
        pregunta: "Ako nastaviť cenu pre požadovanú maržu?",
        respuesta: `Vydeľte náklady výrazom (1 − marža). Pre maržu 30 % vydeľte náklady číslom ${formatearNumero(ctx, 0.7, 2)}. Nepripočítavajte k nákladom 30 %: zarobili by ste menej, ako čakáte.`,
      },
      {
        pregunta: "Majú náklady zahŕňať dane?",
        respuesta: "Počítajte s nákladmi aj cenou bez daní, ktoré prenášate na zákazníka, napríklad bez DPH. Inak marža vyjde vyššia, než v skutočnosti je.",
      },
    ],
    glosario: [
      { termino: "Marža", definicion: "Zisk v percentách z predajnej ceny." },
      { termino: "Prirážka", definicion: "Zisk v percentách z nákladov." },
    ],
  };
};
