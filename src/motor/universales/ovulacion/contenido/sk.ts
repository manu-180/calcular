import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Kalkulačka ovulácie a plodných dní",
    title: tituloQueEntre("Kalkulačka ovulácie a plodných dní", "Kalkulačka ovulácie"),
    description: "Vypočítajte deň ovulácie, plodné dni a termín ďalšej menštruácie vrátane troch nasledujúcich cyklov.",
    intro: [
      "Zadajte prvý deň poslednej menštruácie a dĺžku cyklu. Uvidíte odhadovaný deň ovulácie, plodné dni a ďalšiu menštruáciu.",
      "Ide o odhad pre pravidelný cyklus. Nie je to antikoncepčná metóda a nenahrádza konzultáciu s lekárom alebo gynekológom.",
    ],
    comoSeCalcula: [
      `Ovulácia zvyčajne nastáva ${FASE_LUTEA} dní pred ďalšou menštruáciou: prvý deň poslednej menštruácie + dĺžka cyklu − ${FASE_LUTEA}.`,
      "Plodné dni trvajú od 5 dní pred ovuláciou do dňa po nej, pretože spermie môžu prežiť až 5 dní.",
      "Ďalšia menštruácia sa očakáva jeden cyklus po tej poslednej.",
    ],
    ejemplo: [
      `Pri poslednej menštruácii ${f(fum)} a cykle 28 dní vychádza odhadovaná ovulácia na ${f(aFecha(v.ovulacion))}.`,
      `Plodné dni trvajú od ${f(aFecha(v.desde))} do ${f(aFecha(v.hasta))} a ďalšia menštruácia sa očakáva ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Ktoré dni sú najplodnejšie?",
        respuesta: "Dva až tri dni pred ovuláciou a deň ovulácie. Celé plodné obdobie trvá približne 6 dní.",
      },
      {
        pregunta: "Funguje výpočet aj pri nepravidelnom cykle?",
        respuesta: "Dá vám predstavu, ale menej presnú. Pri nepravidelnom cykle sa ovulácia môže z mesiaca na mesiac posunúť o niekoľko dní.",
      },
      {
        pregunta: "Môžem podľa toho predchádzať otehotneniu?",
        respuesta: "Nie. Odhad je približný a ovulácia môže prísť skôr aj neskôr. Na ochranu pred otehotnením používajte antikoncepciu a poraďte sa s lekárom.",
      },
    ],
    glosario: [
      { termino: "Ovulácia", definicion: "Uvoľnenie vajíčka z vaječníka." },
      { termino: "Plodné dni", definicion: "Dni cyklu, keď je možné otehotnieť." },
    ],
  };
};
