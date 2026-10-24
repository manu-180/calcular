import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosNb: TextosUi<UiTarjetaDeCredito> = {
  slug: "nedbetale-kredittkort",
  ui: () => ({
    saldo: "Gjeld på kortet",
    tasa: "Nominell rente per år (%)",
    tasaAyuda: "Renten på kjøp med kortet. Den står på fakturaen eller i avtalen.",
    modo: "Hvordan vil du betale?",
    modoFijo: "Et fast beløp hver måned",
    modoMinimo: "Minstebeløp",
    pagoFijo: "Fast beløp per måned",
    minimoPorcentaje: "Minstebeløp (% av gjelden)",
    minimoPorcentajeAyuda: "Det kortutstederen krever hver måned. Er du usikker, er 5 % vanlig.",
    minimoPiso: "Minstebeløpet aldri lavere enn",
    meses: "Måneder til gjelden er nedbetalt",
    intereses: "Renter du betaler",
    total: "Betalt totalt",
    primerPago: "Første minstebeløp",
    tabla: "Plan måned for måned",
    colMes: "Måned",
    colPago: "Innbetaling",
    colInteres: "Renter",
    colCapital: "Avdrag",
    colSaldo: "Restgjeld",
    errorSaldo: "Skriv inn hvor mye du skylder på kortet.",
    errorFaltaPago: "Skriv inn hvor mye du betaler hver måned.",
    errorNoCubre: (interes) => `Med den innbetalingen går gjelden aldri ned. Bare renten den første måneden er ${interes}. Øk innbetalingen.`,
    errorMuyLargo: "Med den innbetalingen ville det tatt mer enn 50 år å betale ned gjelden. Øk innbetalingen.",
    observacionAnios: (anios, meses) => {
      const a = `${anios} år`;
      const m = meses === "0" ? "" : meses === "1" ? " og 1 måned" : ` og ${meses} måneder`;
      return `Det er ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Betaler du alltid ${pago}, det samme som det første minstebeløpet, er gjelden nedbetalt etter ${meses} måneder, og du sparer ${ahorro} i renter.`,
    observacionNoGastar: "Kalkulatoren går ut fra at du ikke handler mer med kortet mens du betaler ned gjelden.",
  }),
};
