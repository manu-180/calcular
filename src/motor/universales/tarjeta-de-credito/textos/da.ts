import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosDa: TextosUi<UiTarjetaDeCredito> = {
  slug: "afbetal-kreditkortgaeld",
  ui: () => ({
    saldo: "Gæld på kortet",
    tasa: "Årlig rente (nominel, %)",
    tasaAyuda: "Renten på køb med kortet. Den står på din opgørelse eller i aftalen.",
    modo: "Hvordan vil du betale?",
    modoFijo: "Et fast beløb hver måned",
    modoMinimo: "Minimumsbetaling",
    pagoFijo: "Fast beløb pr. måned",
    minimoPorcentaje: "Minimumsbetaling (% af gælden)",
    minimoPorcentajeAyuda: "Det, kortudstederen kræver hver måned. Er du i tvivl, er 5 % almindeligt.",
    minimoPiso: "Minimumsbetaling aldrig under",
    meses: "Måneder, til gælden er betalt",
    intereses: "Renter, du betaler",
    total: "Betalt i alt",
    primerPago: "Første minimumsbetaling",
    tabla: "Plan måned for måned",
    colMes: "Måned",
    colPago: "Betaling",
    colInteres: "Rente",
    colCapital: "Afdrag",
    colSaldo: "Restgæld",
    errorSaldo: "Skriv, hvor meget du skylder på kortet.",
    errorFaltaPago: "Skriv, hvor meget du betaler hver måned.",
    errorNoCubre: (interes) => `Med den betaling falder gælden aldrig. Alene renten den første måned er ${interes}. Hæv betalingen.`,
    errorMuyLargo: "Med den betaling ville det tage mere end 50 år at betale gælden af. Hæv betalingen.",
    observacionAnios: (anios, meses) => {
      const a = `${anios} år`;
      const m = meses === "0" ? "" : meses === "1" ? " og 1 måned" : ` og ${meses} måneder`;
      return `Det er ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Betaler du altid ${pago}, det samme som den første minimumsbetaling, er gælden betalt efter ${meses} måneder, og du sparer ${ahorro} i renter.`,
    observacionNoGastar: "Beregningen går ud fra, at du ikke køber mere med kortet, mens du betaler gælden af.",
  }),
};
