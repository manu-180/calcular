import { formaLv } from "../../../i18n/plural";
import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionLv } from "../../dias-entre-fechas/textos/lv";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Vecuma kalkulators",
    title: tituloQueEntre(`Vecuma kalkulators pēc dzimšanas datuma (${ctx.nombrePais})`, "Vecuma kalkulators pēc dzimšanas datuma", "Vecuma kalkulators"),
    description: "Aprēķiniet precīzu vecumu gados, mēnešos un dienās, cik dienu jau nodzīvots un cik atlicis līdz nākamajai dzimšanas dienai.",
    intro: [
      "Ievadiet dzimšanas datumu un redzēsiet precīzu vecumu šodien, kā arī mēnešos, nedēļās un dienās.",
      "Mainiet otro datumu, ja vēlaties uzzināt, kāds bija vecums noteiktā dienā vai cik gadu apritēs.",
    ],
    comoSeCalcula: [
      "Kalkulators skaita pilnus mēnešus no dzimšanas līdz izvēlētajam datumam. 12 mēneši veido vienu gadu.",
      "Dienas, kas paliek pēc pēdējā pilnā mēneša, ir vecuma dienas.",
      "Garajos gados tiek skaitītas 366 dienas.",
    ],
    ejemplo: [
      `Dzimšanas datums: ${fechaLarga(ctx.locale, nac)}. Atskaites datums: ${fechaLarga(ctx.locale, ref)}. Vecums ir tieši ${duracionLv(Math.floor(meses / 12), meses % 12, dias)}.`,
      `Kopā tās ir ${formatearNumero(ctx, total)} ${formaLv(total, "diena", "dienas", "dienu")}.`,
    ],
    faq: [
      {
        pregunta: "Kā aprēķināt precīzu vecumu?",
        respuesta: "Vispirms skaita pilnus gadus, tad pilnus mēnešus kopš pēdējās dzimšanas dienas un visbeidzot atlikušās dienas.",
      },
      {
        pregunta: "Kā ir, ja dzimšanas datums ir 29. februāris?",
        respuesta: "Parastajos gados šis kalkulators par dzimšanas dienu uzskata 28. februāri. Daži noteikumi tā vietā izmanto 1. martu.",
      },
      {
        pregunta: "Cik dienu jau nodzīvots?",
        respuesta: "Skatiet rindu „Dienās“. Tā skaita katru dienu no dzimšanas līdz izvēlētajam datumam, bez pēdējās dienas.",
      },
    ],
    glosario: [
      { termino: "Vecums", definicion: "Pilnu gadu skaits kopš dzimšanas." },
      { termino: "Garais gads", definicion: "Gads, kurā ir 366 dienas un 29. februāris. Tie ir ik pēc četriem gadiem, izņemot dažus gadsimtu miju gadus." },
    ],
  };
};
