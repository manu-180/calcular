import { GRAMATICA } from "../../../i18n/gramatica";
import { formaCs } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  const horas = Math.round(r.horas);
  return {
    h1: "Kalkulačka hodinové sazby na volné noze",
    title: tituloQueEntre(
      `Hodinová sazba na volné noze: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      "Kolik si účtovat za hodinu: kalkulačka sazby",
      "Kalkulačka hodinové sazby",
    ),
    description:
      "Spočítejte si hodinovou a denní sazbu na volné noze podle toho, kolik chcete vydělat, a podle výdajů, daní, volna a fakturovatelných hodin.",
    intro: [
      "Nejčastější chyba na volné noze je vzít mzdu, jakou byste chtěli jako zaměstnanci, a vydělit ji 160 hodinami. Chybí v tom daně, výdaje, dovolená a všechny hodiny, které nemůžete vyfakturovat.",
      "Tato kalkulačka vychází z toho, kolik chcete mít čistého, a řekne vám, kolik si musíte účtovat.",
    ],
    comoSeCalcula: [
      "Potřebná fakturace = čistý příjem ÷ (1 − sazba daní) + výdaje na podnikání.",
      "Pracovní dny = 52 týdnů × dny v týdnu − dny volna.",
      "Fakturovatelné hodiny za rok = pracovní dny × fakturovatelné hodiny za den.",
      "Hodinová sazba = potřebná fakturace ÷ fakturovatelné hodiny za rok.",
    ],
    ejemplo: [
      `Abyste měli čistého ${m(ingreso)} za rok, při výdajích ${m(gastos)} a daních 25 % potřebujete vyfakturovat ${m(r.facturado)}.`,
      `Při 30 dnech volna a 25 fakturovatelných hodinách týdně je to ${formatearNumero(ctx, horas)} ${formaCs(horas, "hodina", "hodiny", "hodin")} za rok: sazba ${m(r.hora)} za hodinu nebo ${m(r.dia)} za den.`,
    ],
    faq: [
      {
        pregunta: "Kolik hodin týdně mohu fakturovat?",
        respuesta:
          "Méně, než odpracujete. Shánění klientů, e-maily, fakturace a vzdělávání zaberou čas, který vám nikdo nezaplatí. Obvykle je to 20 až 30 fakturovatelných hodin ze 40.",
      },
      {
        pregunta: "Mám si účtovat za hodinu, nebo za projekt?",
        respuesta: "Obojí funguje. I když naceňujete celý projekt, odhadněte počet hodin a vynásobte ho touto sazbou, ať nepřijdete zkrátka.",
      },
      {
        pregunta: "Jakou sazbu daní mám použít?",
        respuesta:
          "Záleží na zemi a na formě podnikání. Sečtěte daň z příjmů a sociální a zdravotní pojištění. Pokud si nejste jistí, zeptejte se účetní.",
      },
    ],
    glosario: [
      { termino: "Fakturovatelné hodiny", definicion: "Pracovní hodiny, které účtujete klientovi." },
      { termino: "Čistý příjem", definicion: "Co vám zůstane po daních a výdajích na podnikání." },
    ],
  };
};
