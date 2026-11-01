import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSk } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const kusy = (n: number) => `${formatearNumero(ctx, n)} ${formaSk(n, "kus", "kusy", "kusov")}`;
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Kalkulačka bodu zvratu",
    title: tituloQueEntre(`Bod zvratu: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`, "Bod zvratu: výpočet online", "Kalkulačka bodu zvratu"),
    description: "Zistite, koľko kusov musíte predať a aké tržby potrebujete každý mesiac, aby ste pokryli náklady a dosiahli cieľový zisk.",
    intro: [
      "Bod zvratu je objem predaja, pri ktorom firma ani nezarába, ani neprerába. Pod ním ste v strate, nad ním začínate zarábať.",
      "Zadajte fixné náklady, cenu a náklady na jeden kus. Ukážeme vám, koľko predať, aby ste pokryli náklady a splnili svoj cieľ.",
    ],
    comoSeCalcula: [
      "Príspevok na úhradu = cena − variabilné náklady na kus.",
      "Bod zvratu v kusoch = fixné náklady ÷ príspevok na úhradu, zaokrúhlené nahor.",
      "Bod zvratu v tržbách = fixné náklady ÷ (príspevok na úhradu ÷ cena).",
      "Pri cieľovom zisku ho pripočítajte k fixným nákladom a počítajte rovnako.",
    ],
    ejemplo: [
      `Pri fixných nákladoch ${m(fijos)}, cene ${m(precio)} a variabilných nákladoch ${m(variable)} vám každý predaj nechá ${m(precio - variable)}.`,
      `Aby ste pokryli náklady, musíte predať ${kusy(base.unidades)} (tržby ${m(base.facturacion)}) a na zisk ${m(objetivo)} mesačne ${kusy(meta.unidades)}.`,
    ],
    faq: [
      {
        pregunta: "Čo sú fixné a variabilné náklady?",
        respuesta:
          "Fixné náklady zostávajú rovnaké, aj keď nič nepredáte: nájom, pevné mzdy, energie. Variabilné náklady rastú s každým predajom: tovar, materiál, provízie, doprava.",
      },
      {
        pregunta: "Ako bod zvratu znížiť?",
        respuesta: "Máte tri páky: zvýšiť cenu, znížiť variabilné náklady na kus alebo osekať fixné náklady. Najviac zvyčajne urobí cena.",
      },
      {
        pregunta: "Funguje to aj pre služby?",
        respuesta: "Áno. Kusom môže byť hodina, konzultácia alebo klient za mesiac. Ako variabilný náklad zadajte, koľko vás stojí každý z nich.",
      },
    ],
    glosario: [
      { termino: "Bod zvratu", definicion: "Objem predaja, pri ktorom sa tržby rovnajú nákladom." },
      { termino: "Príspevok na úhradu", definicion: "Koľko každý predaj nechá na úhradu fixných nákladov." },
    ],
  };
};
