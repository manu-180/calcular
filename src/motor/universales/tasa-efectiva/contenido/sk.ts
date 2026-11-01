import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  return {
    h1: "Prevod nominálnej úrokovej sadzby na efektívnu",
    title: tituloQueEntre(
      `Efektívna úroková sadzba: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      "Efektívna úroková sadzba: prevod z nominálnej",
      "Efektívna úroková sadzba",
    ),
    description: "Preveďte nominálnu ročnú sadzbu (p. a.) na efektívnu ročnú sadzbu a späť, s mesačným, štvrťročným, polročným alebo denným pripisovaním úrokov.",
    intro: [
      "Dve ponuky s rovnakou sadzbou môžu vyjsť rôzne draho. Rozdiel je v tom, ako často sa úroky účtujú alebo pripisujú.",
      "Efektívna ročná sadzba stavia všetky ponuky na rovnakú úroveň: ukazuje, koľko za rok skutočne zaplatíte alebo zarobíte. Vyberte sadzbu, ktorú máte, a ukážeme vám tú druhú.",
    ],
    comoSeCalcula: [
      "Efektívna sadzba = (1 + nominálna sadzba ÷ m) na m-tú, mínus 1. Číslo m je počet pripísaní úrokov za rok: 12 pri mesačnom, 4 pri štvrťročnom.",
      "Nominálna sadzba = m × ((1 + efektívna sadzba) na (1 ÷ m), mínus 1).",
      "Sadzba za obdobie je nominálna sadzba vydelená m.",
    ],
    ejemplo: [
      `Nominálna sadzba 12 % p. a. s mesačným pripisovaním zodpovedá efektívnej sadzbe ${p(aEfectiva(12, 12))}.`,
      `Efektívna sadzba 10 % zodpovedá nominálnej sadzbe ${p(aNominal(10, 12))}, keď sa úroky pripisujú každý mesiac.`,
    ],
    faq: [
      {
        pregunta: "Aký je rozdiel medzi nominálnou a efektívnou úrokovou sadzbou?",
        respuesta:
          "Nominálna sadzba je ročná sadzba bez vplyvu pripisovania úrokov. Efektívna zahŕňa aj to, že sa úročia už pripísané úroky. Preto je efektívna sadzba vždy rovnaká alebo vyššia ako nominálna.",
      },
      {
        pregunta: "Ktorú sadzbu použiť pri porovnaní ponúk?",
        respuesta:
          "Pri sporení efektívnu sadzbu, pretože ukazuje, koľko skutočne zarobíte. Pri úveroch porovnávajte RPMN, ktorá okrem úrokov zahŕňa aj poplatky.",
      },
      {
        pregunta: "Prečo častejšie pripisovanie zvyšuje efektívnu sadzbu?",
        respuesta:
          "Úroky sa pripíšu k zostatku skôr a začnú samy zarábať úroky. Pri ročnom pripisovaní sú nominálna a efektívna sadzba rovnaké.",
      },
    ],
    glosario: [
      { termino: "Nominálna sadzba (p. a.)", definicion: "Ročná sadzba bez vplyvu pripisovania úrokov." },
      { termino: "Efektívna sadzba", definicion: "Ročná sadzba vrátane zloženého úročenia." },
      { termino: "Pripisovanie úrokov", definicion: "Okamih, keď sa úroky pridajú k zostatku." },
      { termino: "RPMN", definicion: "Ročná percentuálna miera nákladov: úroky aj všetky poplatky úveru v jednom čísle." },
    ],
  };
};
