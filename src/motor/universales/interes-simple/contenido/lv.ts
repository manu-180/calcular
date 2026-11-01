import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Vienkāršo procentu kalkulators",
    title: tituloQueEntre(`Vienkāršo procentu kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`, "Vienkāršo procentu kalkulators", "Vienkāršie procenti"),
    description: "Aprēķiniet vienkāršos procentus no sākuma summas pēc gada likmes par dienām, mēnešiem vai gadiem. Izvēlieties gadu ar 365 vai 360 dienām.",
    intro: [
      "Vienkāršos procentus vienmēr rēķina no sākuma summas: perioda laikā procenti tai netiek pieskaitīti.",
      "Tos piemēro īstermiņa noguldījumiem, aizdevumiem starp paziņām un daudzos skolas uzdevumos.",
    ],
    comoSeCalcula: [
      "Procenti = sākuma summa × gada likme × periods gados.",
      "Ja periods ir mēnešos, dala ar 12. Ja periods ir dienās, dala ar 365 vai 360 atkarībā no bankas izmantotā gada.",
      "Kopā = sākuma summa + procenti.",
    ],
    ejemplo: [
      `Ja sākuma summa ir ${m(capital)} un gada likme 10%, procenti par 6 mēnešiem ir ${m(capital * 0.1 * 0.5)}.`,
      `Tās pašas summas procenti par 90 dienām ir ${m((capital * 0.1 * 90) / 365)}, ja gadā ir 365 dienas, un ${m((capital * 0.1 * 90) / 360)}, ja rēķina bankas gadu.`,
    ],
    faq: [
      {
        pregunta: "Kāda ir vienkāršo procentu formula?",
        respuesta: `P = S × i × t. S ir sākuma summa, i ir gada likme decimālskaitlī (10% ir ${formatearNumero(ctx, 0.1, 2)}), t ir periods gados.`,
      },
      {
        pregunta: "Kāda ir atšķirība starp vienkāršajiem un saliktajiem procentiem?",
        respuesta: "Vienkāršos procentus vienmēr rēķina no tās pašas sākuma summas. Saliktos procentus piemērojot, tos pieskaita summai, un arī tie turpina pelnīt.",
      },
      {
        pregunta: "Kāpēc dažas bankas gadu rēķina kā 360 dienas?",
        respuesta: "Tā ir banku prakse, kas atvieglo aprēķinus. Ja gadā rēķina 360 dienas, procenti ir nedaudz lielāki. Pārbaudiet, kādu gadu piemēro jūsu banka.",
      },
    ],
    glosario: [
      { termino: "Sākuma summa", definicion: "Aizdotā vai noguldītā nauda bez procentiem." },
      { termino: "Bankas gads", definicion: "Gads, ko rēķina kā 360 dienas, ja katrā mēnesī ir 30 dienas." },
    ],
  };
};
