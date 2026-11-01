import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosEt: TextosUi<UiTarjetaDeCredito> = {
  slug: "krediitkaardi-volg",
  ui: () => ({
    saldo: "Krediitkaardi võlg",
    tasa: "Aastaintress (nominaalne, %)",
    tasaAyuda: "Kaardiostude intress. See on kirjas sinu arvel või lepingus.",
    modo: "Kuidas soovid maksta?",
    modoFijo: "Iga kuu sama summa",
    modoMinimo: "Miinimummakse",
    pagoFijo: "Kindel summa kuus",
    minimoPorcentaje: "Miinimummakse (% võlast)",
    minimoPorcentajeAyuda: "Summa, mida kaardi väljastaja iga kuu nõuab. Kui sa pole kindel, on tavaline 5%.",
    minimoPiso: "Miinimummakse vähemalt",
    meses: "Kuude arv võla tagasimaksmiseni",
    intereses: "Intressi maksad",
    total: "Maksad kokku",
    primerPago: "Esimene miinimummakse",
    tabla: "Graafik kuu kuult",
    colMes: "Kuu",
    colPago: "Makse",
    colInteres: "Intress",
    colCapital: "Põhiosa",
    colSaldo: "Võlajääk",
    errorSaldo: "Sisesta, kui palju oled kaardiga võlgu.",
    errorFaltaPago: "Sisesta, kui palju iga kuu maksad.",
    errorNoCubre: (interes) => `Selle maksega ei vähene võlg kunagi. Juba esimese kuu intress on ${interes}. Suurenda makset.`,
    errorMuyLargo: "Selle maksega kuluks võla tagasimaksmiseks üle 50 aasta. Suurenda makset.",
    observacionAnios: (anios, meses) => {
      const a = anios === "1" ? "1 aasta" : `${anios} aastat`;
      const m = meses === "0" ? "" : meses === "1" ? " ja 1 kuu" : ` ja ${meses} kuud`;
      return `See on ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Kui maksad alati sama summa, ${pago}, nagu esimene miinimummakse, on võlg tasutud ${meses} kuu jooksul ja intressidelt säästad ${ahorro}.`,
    observacionNoGastar: "Arvutus eeldab, et sa ei osta kaardiga midagi lisaks, kuni võlga tagasi maksad.",
  }),
};
