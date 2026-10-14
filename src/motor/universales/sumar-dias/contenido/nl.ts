import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Dagen optellen bij een datum",
    title: tituloQueEntre(`Dagen optellen bij een datum in ${ctx.nombrePais}`, `Dagen optellen in ${ctx.nombrePais}`, "Dagen optellen bij een datum"),
    description: "Tel kalenderdagen of werkdagen op bij een datum of trek ze ervan af, en zie op welke dag je uitkomt. Handig voor deadlines en termijnen.",
    intro: [
      "Kies een datum, een aantal dagen en of je wilt optellen of aftrekken. Je ziet de nieuwe datum en welke dag van de week het is.",
      "Kies je werkdagen, dan slaat de rekenhulp zaterdag en zondag over.",
    ],
    comoSeCalcula: [
      "Bij kalenderdagen schuift de datum één dag op voor elke dag die je invult.",
      "Bij werkdagen tellen alleen maandag tot en met vrijdag. De begindatum zelf telt niet mee.",
      "Feestdagen gaan er niet af, want die verschillen per land en regio.",
    ],
    ejemplo: [`90 kalenderdagen na ${f(inicio)} is het ${f(mas90)}.`, `15 werkdagen na ${f(inicio)} is het ${f(aFecha(habil))}.`],
    faq: [
      {
        pregunta: "Telt de begindatum als dag één?",
        respuesta: "Nee. Tel je 1 dag op bij een maandag, dan kom je op dinsdag uit. Zo worden de meeste termijnen geteld.",
      },
      {
        pregunta: "Wat als ik werkdagen optel vanaf een zaterdag?",
        respuesta: "De eerste werkdag is dan de maandag erna. Eén werkdag na een zaterdag is dus maandag.",
      },
      {
        pregunta: "Houdt de rekenhulp rekening met schrikkeljaren?",
        respuesta: "Ja. Valt 29 februari in de periode, dan telt die als een extra dag.",
      },
    ],
    glosario: [
      { termino: "Kalenderdagen", definicion: "Alle dagen op de kalender, zonder er een over te slaan." },
      { termino: "Werkdagen", definicion: "In deze rekenhulp: maandag tot en met vrijdag." },
    ],
  };
};
