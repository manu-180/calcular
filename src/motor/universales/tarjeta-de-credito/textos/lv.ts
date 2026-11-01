import { pluralLv } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

const menesi = (n: string) => pluralLv(n, "mēnesis", "mēneši", "mēnešu");

export const textosLv: TextosUi<UiTarjetaDeCredito> = {
  slug: "kreditkartes-kalkulators",
  ui: () => ({
    saldo: "Kredītkartes parāds",
    tasa: "Gada procentu likme (%)",
    tasaAyuda: "Pirkumiem piemērotā procentu likme pēc bezprocentu perioda beigām. To atradīsiet konta izrakstā vai līgumā.",
    modo: "Kā atmaksāsiet?",
    modoFijo: "Katru mēnesi vienādu summu",
    modoMinimo: "Ar minimālo maksājumu",
    pagoFijo: "Fiksēts ikmēneša maksājums",
    minimoPorcentaje: "Minimālais maksājums (% no parāda)",
    minimoPorcentajeAyuda: "Cik katru mēnesi prasa kartes izdevējs. Ja šaubāties, bieži piemēro 5%.",
    minimoPiso: "Minimālais maksājums ne mazāks par",
    meses: "Mēnešu skaits līdz atmaksai",
    intereses: "Samaksātie procenti",
    total: "Kopā samaksāts",
    primerPago: "Pirmais minimālais maksājums",
    tabla: "Atmaksas plāns pa mēnešiem",
    colMes: "Mēnesis",
    colPago: "Maksājums",
    colInteres: "Procenti",
    colCapital: "Parāda daļa",
    colSaldo: "Atlikums",
    errorSaldo: "Ievadiet kredītkartes parāda summu.",
    errorFaltaPago: "Ievadiet, cik maksāsiet katru mēnesi.",
    errorNoCubre: (interes) => `Ar tādu maksājumu parāds nekad nesamazināsies: pirmā mēneša procenti vien ir ${interes}. Palieliniet maksājumu.`,
    errorMuyLargo: "Ar tādu maksājumu atmaksa ilgtu vairāk nekā 50 gadus. Palieliniet maksājumu.",
    observacionAnios: (anios, meses) => {
      const a = pluralLv(anios, "gads", "gadi", "gadu");
      return meses === "0" ? `Kopā tas ir: ${a}.` : `Kopā tas ir: ${a} un ${menesi(meses)}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Ja vienmēr maksāsiet ${pago}, tas ir tikpat, cik pirmais minimālais maksājums, atmaksas ilgums būs ${menesi(meses)}, un procentos ietaupīsiet ${ahorro}.`,
    observacionNoGastar: "Aprēķins pieņem, ka atmaksas laikā ar karti neko vairs nepirksiet.",
  }),
};
