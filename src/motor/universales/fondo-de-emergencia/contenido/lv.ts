import { GRAMATICA } from "../../../i18n/gramatica";
import { formaLv } from "../../../i18n/plural";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const meses = Math.ceil((gastos * 6) / aporte);
  return {
    h1: "Finanšu drošības spilvena kalkulators",
    title: tituloQueEntre(
      `Finanšu drošības spilvens ${GRAMATICA.lv.en(ctx.nombrePais)}: kalkulators`,
      "Finanšu drošības spilvena kalkulators",
      "Drošības spilvena kalkulators",
    ),
    description: "Aprēķiniet, cik liels finanšu drošības spilvens vajadzīgs pēc nepieciešamajiem izdevumiem un cik mēnešos to uzkrāsiet.",
    intro: [
      "Finanšu drošības spilvens ir naudas rezerve tam, ko nevar paredzēt: darba zaudēšanai, veselības problēmām vai negaidītam remontam mājās.",
      "Ar to nav jāaizņemas vai jādzīvo uz kredītkartes rēķina pašā grūtākajā brīdī. Ievadiet nepieciešamos izdevumus un mēnešu skaitu, ko vēlaties segt.",
    ],
    comoSeCalcula: [
      "Ieteicamais spilvens = nepieciešamie mēneša izdevumi × mēnešu skaits.",
      "Vēl jāuzkrāj = ieteicamais spilvens − tas, kas jums jau ir.",
      "Mēneši līdz mērķim = atlikusī summa ÷ mēnesī atliktā summa, noapaļota uz augšu.",
    ],
    ejemplo: [
      `Ja nepieciešamie izdevumi ir ${m(gastos)} mēnesī, 6 mēnešu spilvens ir ${m(gastos * 6)}.`,
      `Ja katru mēnesi atliekat ${m(aporte)}, uzkrāšanas laiks ir ${meses} ${formaLv(meses, "mēnesis", "mēneši", "mēnešu")}.`,
    ],
    faq: [
      {
        pregunta: "Cik mēnešu izdevumiem vajadzētu pietikt drošības spilvenam?",
        respuesta:
          "Parasti iesaka spilvenu, kas sedz nepieciešamos izdevumus 3 līdz 6 mēnešus. Ja ienākumi ir neregulāri, strādājat sev vai mājsaimniecībai ir tikai viens ienākumu avots, labāk plānojiet 6 līdz 12 mēnešus.",
      },
      {
        pregunta: "Kur glabāt drošības spilvenu?",
        respuesta: "Drošā vietā, no kuras naudu var saņemt tajā pašā dienā, atsevišķi no ikdienas izdevumu kartes. Tā nav nauda riskantiem ieguldījumiem: tai jābūt pa rokai, kad tā būs vajadzīga.",
      },
      {
        pregunta: "Kas vispirms: spilvens vai parādu atmaksa?",
        respuesta: "Bieži vispirms atliek viena mēneša izdevumu summu, tad atmaksā dārgos parādus, piemēram, kredītkarti, un visbeidzot papildina spilvenu līdz pilnai summai.",
      },
    ],
    glosario: [
      { termino: "Nepieciešamie izdevumi", definicion: "Maksājumi, kas jāveic arī tad, ja ienākumu vairs nav: mājoklis, pārtika, komunālie maksājumi, veselība." },
      { termino: "Likviditāte", definicion: "Cik ātri naudu var izmantot, lai tā nezaudētu vērtību." },
    ],
  };
};
