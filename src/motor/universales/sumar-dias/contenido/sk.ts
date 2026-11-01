import { GRAMATICA } from "../../../i18n/gramatica";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Pripočítanie dní k dátumu",
    title: tituloQueEntre(
      `Pripočítanie dní k dátumu: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      "Pripočítanie a odpočítanie dní od dátumu: kalkulačka",
      "Pripočítanie dní k dátumu",
    ),
    description: "Pripočítajte alebo odpočítajte kalendárne či pracovné dni od dátumu a zistite, na ktorý deň výsledok pripadne. Hodí sa na lehoty a dni splatnosti.",
    intro: [
      "Vyberte dátum, počet dní a či ich chcete pripočítať, alebo odpočítať. Uvidíte výsledný dátum aj deň v týždni.",
      "Pri pracovných dňoch kalkulačka vynecháva soboty a nedele.",
    ],
    comoSeCalcula: [
      "Pri kalendárnych dňoch sa za každý zadaný deň posunie o jeden deň v kalendári.",
      "Pri pracovných dňoch sa počíta len pondelok až piatok. Východiskový dátum sa nezapočítava.",
      "Štátne sviatky sa neodpočítavajú, pretože sa líšia podľa krajiny aj regiónu.",
    ],
    ejemplo: [
      `Keď k dátumu ${f(inicio)} pripočítate 90 kalendárnych dní, vyjde ${f(mas90)}.`,
      `Keď k dátumu ${f(inicio)} pripočítate 15 pracovných dní, vyjde ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "Počíta sa východiskový dátum ako prvý deň?",
        respuesta: "Nie. Keď k pondelku pripočítate 1 deň, vyjde utorok. Tak sa počíta väčšina lehôt.",
      },
      {
        pregunta: "Čo ak pripočítavam pracovné dni od soboty?",
        respuesta: "Prvým pracovným dňom je nasledujúci pondelok. Keď k sobote pripočítate 1 pracovný deň, vyjde pondelok.",
      },
      {
        pregunta: "Počíta kalkulačka s prestupnými rokmi?",
        respuesta: "Áno. Ak obdobie zahŕňa 29. február, počíta sa ako deň navyše.",
      },
    ],
    glosario: [
      { termino: "Kalendárne dni", definicion: "Všetky dni v kalendári, žiadny sa nevynecháva." },
      { termino: "Pracovné dni", definicion: "V tejto kalkulačke pondelok až piatok." },
    ],
  };
};
