import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Kalkulačka jednoduchého úročenia",
    title: tituloQueEntre(`Jednoduché úročenie: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`, "Kalkulačka jednoduchého úročenia", "Jednoduché úročenie"),
    description: "Vypočítajte jednoduchý úrok z istiny pri ročnej sadzbe za dni, mesiace alebo roky. Zvoľte rok s 365 alebo 360 dňami a uvidíte celkovú sumu.",
    intro: [
      "Jednoduchý úrok sa počíta vždy z pôvodnej istiny: počas celej doby sa úroky k istine nepripisujú.",
      "Používa sa pri krátkodobých vkladoch, pôžičkách medzi známymi a v mnohých školských príkladoch.",
    ],
    comoSeCalcula: [
      "Úrok = istina × ročná sadzba × doba v rokoch.",
      "Pri dobe v mesiacoch sa delí 12. Pri dobe v dňoch sa delí 365 alebo 360 podľa toho, aký rok banka používa.",
      "Spolu = istina + úrok.",
    ],
    ejemplo: [
      `${m(capital)} pri sadzbe 10 % ročne vynesie za 6 mesiacov úrok ${m(capital * 0.1 * 0.5)}.`,
      `Rovnaká istina vynesie za 90 dní ${m((capital * 0.1 * 90) / 365)} pri roku s 365 dňami a ${m((capital * 0.1 * 90) / 360)} pri roku s 360 dňami.`,
    ],
    faq: [
      {
        pregunta: "Aký je vzorec pre jednoduché úročenie?",
        respuesta: `U = I × i × t. I je istina, i ročná sadzba ako desatinné číslo (10 % je ${formatearNumero(ctx, 0.1, 2)}) a t doba v rokoch.`,
      },
      {
        pregunta: "Čím sa líši jednoduché a zložené úročenie?",
        respuesta: "Jednoduchý úrok sa počíta stále z rovnakej istiny. Pri zloženom úročení sa úroky pripisujú k istine a samy ďalej prinášajú úrok.",
      },
      {
        pregunta: "Prečo niektoré banky počítajú rok ako 360 dní?",
        respuesta: "Je to bankový zvyk, ktorý zjednodušuje výpočty. Pri 360 dňoch vychádza úrok o niečo vyšší. Overte si, aký rok používa vaša banka.",
      },
    ],
    glosario: [
      { termino: "Istina", definicion: "Peniaze, ktoré sa požičiavajú alebo ukladajú, bez úrokov." },
      { termino: "Bankový rok", definicion: "Rok počítaný ako 360 dní, s mesiacmi po 30 dňoch." },
    ],
  };
};
