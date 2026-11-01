import { formaSk } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Kalkulačka počtu dní medzi dátumami",
    title: tituloQueEntre(`Počet dní medzi dátumami: kalkulačka (${ctx.nombrePais})`, "Počet dní medzi dátumami: kalkulačka", "Počet dní medzi dátumami"),
    description: "Vypočítajte, koľko dní je medzi dvoma dátumami: kalendárne dni, týždne, mesiace a pracovné dni od pondelka do piatka.",
    intro: [
      "Vyberte počiatočný a koncový dátum. Uvidíte počet kalendárnych dní, to isté obdobie v týždňoch a mesiacoch a tiež počet pracovných dní.",
      "Hodí sa na lehoty, termíny, dovolenku, tehotenstvo alebo odpočítavanie do dôležitého dňa.",
    ],
    comoSeCalcula: [
      "Kalendárne dni zahŕňajú každý deň medzi oboma dátumami. Prvý deň sa počíta, posledný nie, ak nezačiarknete príslušnú možnosť.",
      "Pracovné dni zahŕňajú pondelky, utorky, stredy, štvrtky a piatky v tom istom období. Štátne sviatky sa neodpočítavajú.",
      "Prestupné roky sa počítajú vrátane 29. februára.",
    ],
    ejemplo: [
      `Od ${f(desde)} do ${f(hasta)} ${formaSk(dias, "uplynie", "uplynú", "uplynie")} ${n(dias)} ${formaSk(dias, "kalendárny deň", "kalendárne dni", "kalendárnych dní")}.`,
      `Z toho ${n(habiles)} ${formaSk(habiles, "pripadá", "pripadajú", "pripadá")} na dni od pondelka do piatka.`,
    ],
    faq: [
      {
        pregunta: "Počíta sa prvý, alebo posledný deň?",
        respuesta: "Predvolene sa počíta prvý deň a posledný nie, rovnako ako pri odčítaní dvoch dátumov. Ak potrebujete oba, začiarknite „Započítať aj posledný deň“.",
      },
      {
        pregunta: "Odpočítavajú sa štátne sviatky z pracovných dní?",
        respuesta: "Nie. Počítajú sa dni od pondelka do piatka. Sviatky sa líšia podľa krajiny, regiónu a roka, preto ich odpočítajte osobitne.",
      },
      {
        pregunta: "Koľko dní má rok?",
        respuesta: "365, prestupný rok 366. Preto medzi rovnakými dátumami v rôznych rokoch môže vyjsť iný počet dní.",
      },
    ],
    glosario: [
      { termino: "Kalendárne dni", definicion: "Všetky dni v kalendári vrátane víkendov a sviatkov." },
      { termino: "Pracovné dni", definicion: "V tejto kalkulačke dni od pondelka do piatka." },
    ],
  };
};
