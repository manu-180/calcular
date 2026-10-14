import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosNl: TextosUi<UiTarjetaDeCredito> = {
  slug: "creditcardschuld-aflossen",
  ui: () => ({
    saldo: "Openstaand saldo op je kaart",
    tasa: "Rente per jaar (%)",
    tasaAyuda: "De jaarrente op aankopen. Die staat op je afschrift.",
    modo: "Hoe ga je aflossen?",
    modoFijo: "Elke maand een vast bedrag",
    modoMinimo: "Het minimumbedrag",
    pagoFijo: "Vast bedrag per maand",
    minimoPorcentaje: "Minimumbedrag (% van het saldo)",
    minimoPorcentajeAyuda: "Wat de kaartuitgever elke maand minstens vraagt. Weet je het niet zeker, 5% is gebruikelijk.",
    minimoPiso: "Minimumbedrag nooit lager dan",
    meses: "Maanden tot de schuld weg is",
    intereses: "Rente die je betaalt",
    total: "Totaal betaald",
    primerPago: "Eerste minimumbedrag",
    tabla: "Aflossingsplan per maand",
    colMes: "Maand",
    colPago: "Betaling",
    colInteres: "Rente",
    colCapital: "Aflossing",
    colSaldo: "Saldo",
    errorSaldo: "Vul het saldo in dat je nog op de kaart hebt staan.",
    errorFaltaPago: "Vul in hoeveel je elke maand gaat betalen.",
    errorNoCubre: (interes) => `Met dit bedrag daalt het saldo nooit: alleen de rente van de eerste maand is al ${interes}. Verhoog je betaling.`,
    errorMuyLargo: "Met dit bedrag ben je meer dan 50 jaar bezig met aflossen. Verhoog je betaling.",
    observacionAnios: (anios, meses) => {
      const j = `${anios} jaar`;
      const m = meses === "0" ? "" : meses === "1" ? " en 1 maand" : ` en ${meses} maanden`;
      return `Dat is ${j}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Betaal je altijd ${pago}, net zoveel als het eerste minimumbedrag, dan ben je in ${meses} maanden klaar en bespaar je ${ahorro} aan rente.`,
    observacionNoGastar: "Hierbij gaan we ervan uit dat je niets nieuws met de kaart betaalt terwijl je aflost.",
  }),
};
