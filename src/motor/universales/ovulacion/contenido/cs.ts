import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Kalkulačka ovulace a plodných dnů",
    title: tituloQueEntre("Kalkulačka ovulace a plodných dnů", "Kalkulačka ovulace"),
    description: "Spočítejte den ovulace, plodné dny a termín další menstruace, včetně tří následujících cyklů.",
    intro: [
      "Zadejte první den poslední menstruace a délku cyklu. Uvidíte odhadovaný den ovulace, plodné dny a další menstruaci.",
      "Jde o odhad pro pravidelný cyklus. Nejde o antikoncepční metodu a nenahrazuje konzultaci s lékařem nebo gynekologem.",
    ],
    comoSeCalcula: [
      `Ovulace obvykle nastává ${FASE_LUTEA} dní před další menstruací: první den poslední menstruace + délka cyklu − ${FASE_LUTEA}.`,
      "Plodné dny trvají od 5 dní před ovulací do dne po ní, protože spermie mohou přežít až 5 dní.",
      "Další menstruace se čeká jeden cyklus po té poslední.",
    ],
    ejemplo: [
      `Při poslední menstruaci ${f(fum)} a cyklu 28 dní vychází odhadovaná ovulace na ${f(aFecha(v.ovulacion))}.`,
      `Plodné dny trvají od ${f(aFecha(v.desde))} do ${f(aFecha(v.hasta))} a další menstruace se čeká ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Které dny jsou nejplodnější?",
        respuesta: "Dva až tři dny před ovulací a den ovulace. Celé plodné období trvá zhruba 6 dní.",
      },
      {
        pregunta: "Funguje výpočet i při nepravidelném cyklu?",
        respuesta: "Dá vám představu, ale méně přesnou. Při nepravidelném cyklu se ovulace může z měsíce na měsíc posunout o několik dní.",
      },
      {
        pregunta: "Můžu podle toho předcházet otěhotnění?",
        respuesta: "Ne. Odhad je přibližný a ovulace může přijít dřív i později. K ochraně před otěhotněním používejte antikoncepci a poraďte se s lékařem.",
      },
    ],
    glosario: [
      { termino: "Ovulace", definicion: "Uvolnění vajíčka z vaječníku." },
      { termino: "Plodné dny", definicion: "Dny cyklu, kdy je možné otěhotnět." },
    ],
  };
};
