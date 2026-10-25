import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosSv: TextosUi<UiTarjetaDeCredito> = {
  slug: "betala-av-kreditkort",
  ui: () => ({
    saldo: "Skuld på kortet",
    tasa: "Årsränta (nominell, %)",
    tasaAyuda: "Räntan på köp med kortet. Den står på din faktura eller i avtalet.",
    modo: "Hur vill du betala?",
    modoFijo: "Ett fast belopp varje månad",
    modoMinimo: "Lägsta belopp att betala",
    pagoFijo: "Fast belopp per månad",
    minimoPorcentaje: "Lägsta belopp (% av skulden)",
    minimoPorcentajeAyuda: "Det kortutgivaren kräver varje månad. Är du osäker är 5 % vanligt.",
    minimoPiso: "Lägsta belopp aldrig under",
    meses: "Månader tills skulden är betald",
    intereses: "Ränta du betalar",
    total: "Totalt betalt",
    primerPago: "Första lägsta belopp",
    tabla: "Plan månad för månad",
    colMes: "Månad",
    colPago: "Betalning",
    colInteres: "Ränta",
    colCapital: "Amortering",
    colSaldo: "Kvar att betala",
    errorSaldo: "Fyll i hur mycket du är skyldig på kortet.",
    errorFaltaPago: "Fyll i hur mycket du betalar varje månad.",
    errorNoCubre: (interes) => `Med den betalningen minskar skulden aldrig. Bara räntan första månaden är ${interes}. Höj betalningen.`,
    errorMuyLargo: "Med den betalningen skulle det ta mer än 50 år att betala av skulden. Höj betalningen.",
    observacionAnios: (anios, meses) => {
      const a = `${anios} år`;
      const m = meses === "0" ? "" : meses === "1" ? " och 1 månad" : ` och ${meses} månader`;
      return `Det är ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Betalar du alltid ${pago}, samma som första lägsta belopp, är skulden betald efter ${meses} månader och du sparar ${ahorro} i ränta.`,
    observacionNoGastar: "Kalkylen förutsätter att du inte handlar mer med kortet medan du betalar av skulden.",
  }),
};
