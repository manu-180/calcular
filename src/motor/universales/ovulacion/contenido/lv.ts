import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  // Intl da la fecha en nominativo: va tras dos puntos, nunca tras una preposición.
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Ovulācijas un auglīgo dienu kalkulators",
    title: tituloQueEntre("Ovulācijas un auglīgo dienu kalkulators", "Ovulācijas kalkulators"),
    description: "Aprēķiniet ovulācijas dienu, auglīgās dienas un nākamo mēnešreižu datumu, kā arī trīs tālākos ciklus.",
    intro: [
      "Ievadiet pēdējo mēnešreižu pirmo dienu un cikla ilgumu. Redzēsiet paredzamo ovulācijas dienu, auglīgās dienas un nākamās mēnešreizes.",
      "Tas ir aptuvens aprēķins regulāram ciklam. Tā nav kontracepcijas metode, un tas neaizstāj ārsta vai ginekologa konsultāciju.",
    ],
    comoSeCalcula: [
      `Ovulācija parasti notiek ${FASE_LUTEA} dienas pirms nākamajām mēnešreizēm: pēdējo mēnešreižu pirmā diena + cikla ilgums − ${FASE_LUTEA}.`,
      "Auglīgās dienas ilgst no piektās dienas pirms ovulācijas līdz nākamajai dienai pēc tās, jo spermatozoīdi var izdzīvot līdz 5 dienām.",
      "Nākamās mēnešreizes sagaidāmas vienu ciklu pēc pēdējām.",
    ],
    ejemplo: [
      `Pēdējo mēnešreižu sākums: ${f(fum)}. Cikla ilgums: 28 dienas. Paredzamā ovulācija: ${f(aFecha(v.ovulacion))}.`,
      `Auglīgo dienu sākums: ${f(aFecha(v.desde))}. Auglīgo dienu beigas: ${f(aFecha(v.hasta))}. Nākamās mēnešreizes: ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Kuras dienas ir visauglīgākās?",
        respuesta: "Divas vai trīs dienas pirms ovulācijas un pati ovulācijas diena. Viss auglīgais periods ir apmēram 6 dienas.",
      },
      {
        pregunta: "Vai aprēķins der neregulāram ciklam?",
        respuesta: "Tas dos aptuvenu priekšstatu, bet ne tik precīzu. Ja cikls ir neregulārs, ovulācija katru mēnesi var nobīdīties par vairākām dienām.",
      },
      {
        pregunta: "Vai uz to var paļauties, lai izvairītos no grūtniecības?",
        respuesta: "Nē. Aprēķins ir aptuvens, un ovulācija var notikt agrāk vai vēlāk. Lai izvairītos no grūtniecības, lietojiet kontracepciju un konsultējieties ar ārstu.",
      },
    ],
    glosario: [
      { termino: "Ovulācija", definicion: "Olšūnas atbrīvošanās no olnīcas." },
      { termino: "Auglīgās dienas", definicion: "Cikla dienas, kad var iestāties grūtniecība." },
    ],
  };
};
