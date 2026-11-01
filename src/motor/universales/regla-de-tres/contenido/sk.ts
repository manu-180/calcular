import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulačka trojčlenky",
    title: tituloQueEntre(`Trojčlenka: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`, "Trojčlenka: výpočet online", "Kalkulačka trojčlenky"),
    description: "Vyriešte priamu aj nepriamu úmernosť za sekundu. Zadajte tri hodnoty a dostanete štvrtú aj s postupom výpočtu.",
    intro: [
      "Trojčlenka funguje, keď sa dve veličiny menia spolu a poznáte tri zo štyroch hodnôt.",
      "Zvoľte priamu alebo nepriamu úmernosť, vyplňte A, B a C a kalkulačka vám dopočíta X.",
    ],
    comoSeCalcula: [
      "Priama úmernosť: X = B × C ÷ A. Použite ju, keď obe veličiny rastú spolu (viac kilogramov, vyššia cena).",
      "Nepriama úmernosť: X = A × B ÷ C. Použite ju, keď jedna rastie a druhá klesá (viac ľudí, menej dní).",
    ],
    ejemplo: [
      `Keď 3 kilogramy stoja ${m(precio3)}, 5 kilogramov stojí ${m((precio3 * 5) / 3)}.`,
      "Keď 4 ľudia vymaľujú dom za 12 dní, 6 ľudí ho vymaľuje za 8 dní.",
    ],
    faq: [
      {
        pregunta: "Ako spoznám, či ide o priamu, alebo nepriamu úmernosť?",
        respuesta: "Keď jedna veličina rastie spolu s druhou, ide o priamu úmernosť. Keď jedna klesá, zatiaľ čo druhá rastie, ide o nepriamu.",
      },
      {
        pregunta: "Ako vypočítať priamu úmernosť ručne?",
        respuesta: `Vynásobte dve známe hodnoty krížom a vydeľte tou zostávajúcou. Keď 3 zodpovedá 600, potom 5 zodpovedá 600 × 5 ÷ 3 = ${formatearNumero(ctx, (600 * 5) / 3)}.`,
      },
      {
        pregunta: "Dá sa trojčlenka použiť aj na percentá?",
        respuesta: "Áno. Keď 200 je 100 %, potom 50 je 25 %: ide o priamu úmernosť s A = 200, B = 100 a C = 50.",
      },
    ],
    glosario: [
      { termino: "Priama úmernosť", definicion: "Obe veličiny spolu rastú alebo klesajú." },
      { termino: "Nepriama úmernosť", definicion: "Jedna veličina rastie, keď druhá klesá." },
    ],
  };
};
