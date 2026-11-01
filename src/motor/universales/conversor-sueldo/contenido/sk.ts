import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSk } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  const tyzdnov = 52 / 12;
  return {
    h1: "Prepočet hodinovej mzdy",
    title: tituloQueEntre(
      `Hodinová, mesačná a ročná mzda: prepočet ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      `Prepočet hodinovej mzdy ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      "Prepočet hodinovej mzdy",
    ),
    description: "Prepočítajte mzdu medzi hodinou, dňom, týždňom, polmesiacom, mesiacom a rokom podľa vašich hodín a platených týždňov.",
    intro: [
      "Koľko zarábate za hodinu? Koľko za rok dá ponuka s hodinovou mzdou? Zadajte sumu, vyberte obdobie a ukážeme vám všetky ostatné.",
      "Pomôže vám to porovnať pracovné ponuky, odhadnúť nadčasy alebo zistiť, akú hodnotu má váš čas.",
    ],
    comoSeCalcula: [
      "Najprv sa všetko prepočíta na ročnú sumu.",
      "Za hodinu = ročná suma ÷ (hodiny týždenne × platené týždne).",
      "Za deň = ročná suma ÷ (dni v týždni × platené týždne). Za týždeň = ročná suma ÷ platené týždne.",
      "Za mesiac = ročná suma ÷ 12. Za pol mesiaca = ročná suma ÷ 24.",
    ],
    ejemplo: [
      `Mzda ${m(anual)} ročne pri 40 hodinách týždenne zodpovedá ${m(anual / 2080)} za hodinu a ${m(anual / 12)} mesačne.`,
      `Ponuka ${m(hora)} za hodinu na plný úväzok dá ${m(hora * 2080)} za rok.`,
    ],
    faq: [
      {
        pregunta: "Koľko pracovných hodín má rok?",
        respuesta: `Pri 40 hodinách týždenne a 52 platených týždňoch vychádza ${formatearNumero(ctx, 2080)} hodín. Na rýchly odhad sa preto hodinová sadzba násobí zhruba číslom ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Prečo týždenná mzda krát 4 nedáva mesačnú?",
        respuesta: `Pretože mesiac má v priemere ${formatearNumero(ctx, tyzdnov, 2)} ${formaSk(tyzdnov, "týždeň", "týždne", "týždňov", "týždňa")}, nie 4. Z týždennej mzdy na mesačnú sa dostanete, keď ju vynásobíte 52 a vydelíte 12.`,
      },
      {
        pregunta: "Počíta sa s prémiami alebo daňami?",
        respuesta: "Nie. Kalkulačka prepočítava tú istú sumu medzi obdobiami. Ak dostávate prémie, pripočítajte ich zvlášť, keď porovnávate ponuky.",
      },
    ],
    glosario: [
      { termino: "Hrubá mzda", definicion: "Mzda pred odpočítaním dane z príjmov a sociálneho a zdravotného poistenia." },
      { termino: "Výplata dvakrát mesačne", definicion: "Mzda vyplácaná v dvoch častiach každý mesiac, teda 24-krát ročne." },
    ],
  };
};
