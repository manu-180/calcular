import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Kalkulačka zvýšenia mzdy",
    title: tituloQueEntre(
      `Kalkulačka zvýšenia mzdy ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      `Zvýšenie mzdy ${GRAMATICA.sk.en(ctx.nombrePais)}`,
      "Kalkulačka zvýšenia mzdy",
    ),
    description: "Vypočítajte novú mzdu po zvýšení, rozdiel za mesiac aj za rok a zistite, či vaše reálne zvýšenie predbieha infláciu.",
    intro: [
      "Ponúkli vám vyššiu mzdu alebo sa o zvýšenie platu chystáte požiadať. Zadajte mzdu a zvýšenie v percentách alebo ako sumu a uvidíte, o koľko sa zmení každý mesiac aj za celý rok.",
      "Pridajte infláciu za dané obdobie a ukážeme vám, či vaša kúpna sila naozaj rastie, alebo mzda len dobieha ceny.",
    ],
    comoSeCalcula: [
      "Nová mzda = súčasná mzda × (1 + zvýšenie ÷ 100).",
      "Rozdiel za rok = rozdiel za mesiac × počet výplat za rok.",
      "Reálne zvýšenie = (1 + zvýšenie) ÷ (1 + inflácia) − 1.",
    ],
    ejemplo: [
      `Mzda ${m(sueldo)} mesačne sa po zvýšení o 5 % zmení na ${m(sueldo * 1.05)}: o ${m(sueldo * 0.05)} viac každý mesiac a o ${m(sueldo * 0.05 * 12)} viac za rok.`,
      `Ak bola inflácia za dané obdobie 3 %, reálne zvýšenie je ${p(aumentoReal(5, 3))}. Pri inflácii 6 % vychádza ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Čo je reálne zvýšenie mzdy?",
        respuesta: "Je to zvýšenie po zohľadnení inflácie. Ukazuje, či si za novú mzdu kúpite viac, alebo menej ako predtým.",
      },
      {
        pregunta: "Prečo nestačí odpočítať infláciu od zvýšenia?",
        respuesta: `Pretože percentá sa násobia, neodpočítavajú sa. Pri zvýšení o 5 % a inflácii 3 % je reálne zvýšenie ${p(aumentoReal(5, 3))}, nie 2 %. Pri vysokej inflácii je rozdiel oveľa väčší.`,
      },
      {
        pregunta: "O koľko požiadať?",
        respuesta: "Aspoň o infláciu od posledného zvýšenia, aby ste neprichádzali o kúpnu silu. Nad to sa riaďte tým, koľko za rovnakú pozíciu platia iní zamestnávatelia a o koľko vzrástla vaša zodpovednosť.",
      },
    ],
    glosario: [
      { termino: "Nominálne zvýšenie", definicion: "Zvýšenie tak, ako je uvedené na výplatnej páske, bez zohľadnenia inflácie." },
      { termino: "Kúpna sila", definicion: "Čo si za svoju mzdu môžete kúpiť." },
    ],
  };
};
