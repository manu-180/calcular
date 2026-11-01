import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Uzkrājumu mērķa kalkulators",
    title: tituloQueEntre(`Uzkrājumu mērķa kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`, "Uzkrājumu mērķa kalkulators", "Uzkrājumu mērķis"),
    description: "Uzziniet, cik atlikt mēnesī, lai vajadzīgo summu uzkrātu laikā, ņemot vērā to, kas jums jau ir, un uzkrājumu procentus.",
    intro: [
      "Atvaļinājums, automašīna, pirmā iemaksa mājokļa kredītam vai rezerve negaidītiem izdevumiem. Mērķi ar konkrētu summu un datumu sasniegt ir daudz vieglāk.",
      "Ievadiet, cik vēlaties uzkrāt un cik mēnešos. Kalkulators parādīs, cik atlikt mēnesī un cik nedēļā.",
    ],
    comoSeCalcula: [
      "Vispirms aprēķina, cik līdz perioda beigām pieaugs jau esošie uzkrājumi.",
      "To, kas vēl trūkst, sadala vienādās ikmēneša iemaksās.",
      "Ja uzkrājumi nes procentus, pelna arī katra iemaksa, tāpēc pietiek atlikt nedaudz mazāk.",
    ],
    ejemplo: [
      `Lai 24 mēnešos bez procentiem uzkrātu ${m(meta)}, mēnesī jāatliek ${m(meta / 24)}.`,
      `Ja jums jau ir ${m(actual)} un uzkrājumu ienesīgums gadā ir 5%, mēnesī pietiek ar summu: ${m(aporteNecesario(meta, actual, 24, 5))}.`,
    ],
    faq: [
      {
        pregunta: "Kā noturēties pie uzkrājumu mērķa?",
        respuesta: "Atlieciet naudu uzreiz pēc algas, vēl pirms sākat to tērēt. Ja varat, iestatiet regulāro maksājumu uz atsevišķu krājkontu.",
      },
      {
        pregunta: "Ko darīt, ja mēneša summa ir par lielu?",
        respuesta: "Paredziet vairāk laika vai samaziniet mērķi. Varat arī sākt ar to, ko spējat, un palielināt iemaksu, kad augs ienākumi.",
      },
      {
        pregunta: "Vai jāņem vērā inflācija?",
        respuesta: "Ja līdz mērķim ir vairāki gadi, pieskaitiet summai paredzamo inflāciju. Tas, kas šodien maksā 100, pēc dažiem gadiem var maksāt manāmi vairāk.",
      },
    ],
    glosario: [
      { termino: "Iemaksa", definicion: "Nauda, ko mērķim atliekat katru mēnesi." },
      { termino: "Ienesīgums", definicion: "Cik uzkrājumi nopelna kontā vai ieguldījumā." },
    ],
  };
};
