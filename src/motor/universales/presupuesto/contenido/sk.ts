import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Rodinný rozpočet podľa pravidla 50/30/20",
    title: tituloQueEntre(
      `Rodinný rozpočet 50/30/20 ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      "Rodinný rozpočet podľa pravidla 50/30/20",
      "Rodinný rozpočet 50/30/20",
    ),
    description: "Rozdeľte čistý mesačný príjem podľa pravidla 50/30/20: koľko na nevyhnutné výdavky, koľko na radosti a koľko na sporenie. Percentá môžete upraviť.",
    intro: [
      "Pravidlo 50/30/20 je jednoduchý spôsob, ako si naplánovať mesiac. Polovica ide na nevyhnutnosti, 30 % na veci pre radosť a 20 % na sporenie.",
      "Zadajte čistý príjem a uvidíte, koľko pripadá na každú časť. Ak je vaša situácia iná, napríklad pre vysoký nájom, percentá upravte.",
    ],
    comoSeCalcula: [
      "Nevyhnutné výdavky = príjem × 50 %.",
      "Radosti a želania = príjem × 30 %.",
      "Sporenie = príjem × 20 %. Všetky tri percentá musia dať spolu 100 %.",
    ],
    ejemplo: [
      `Pri príjme ${m(ingreso)} mesačne: ${m(ingreso * 0.5)} na nevyhnutné výdavky, ${m(ingreso * 0.3)} na radosti a želania a ${m(ingreso * 0.2)} na sporenie.`,
      `Za rok dá tých 20 % spolu ${m(ingreso * 0.2 * 12)} úspor.`,
    ],
    faq: [
      {
        pregunta: "Čo patrí medzi nevyhnutné výdavky a čo medzi radosti?",
        respuesta:
          "Nevyhnutné sú výdavky, ktoré zaplatiť musíte: bývanie, základné potraviny, energie, doprava, zdravie a povinné splátky. Radosti a želania sú veci, bez ktorých by ste sa v núdzi zaobišli.",
      },
      {
        pregunta: "Čo ak mi nevyhnutné výdavky zaberú viac ako 50 %?",
        respuesta: "To je časté, najmä pri vysokom nájme. Skúste rozdelenie 60/20/20 alebo 70/20/10 a sporenie neznižujte na nulu.",
      },
      {
        pregunta: "Počítajú sa splátky dlhov ako sporenie?",
        respuesta: "Povinné splátky patria medzi nevyhnutné výdavky. To, čo splácate navyše, aby ste boli bez dlhov skôr, sa počíta ako sporenie, pretože to zlepšuje vašu finančnú situáciu rovnako ako úspory.",
      },
    ],
    glosario: [
      { termino: "Čistý príjem", definicion: "Koľko dostanete po odpočítaní daní a odvodov." },
      { termino: "Pravidlo 50/30/20", definicion: "Spôsob, ako rozdeliť príjem medzi nevyhnutné výdavky, radosti a sporenie." },
    ],
  };
};
