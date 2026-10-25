import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosNb: TextosUi<UiPrestamo> = {
  slug: "lanekalkulator",
  ui: () => ({
    monto: "Lånebeløp",
    tasa: "Nominell rente per år (%)",
    tasaAyuda: "Den nominelle renten i tilbudet. Gebyrer er ikke med.",
    meses: "Nedbetalingstid i måneder",
    extra: "Ekstra avdrag per måned (valgfritt)",
    extraAyuda: "Det du vil betale ekstra hver måned for å bli ferdig raskere. Alt går til å redusere gjelden.",
    cuota: "Terminbeløp per måned",
    intereses: "Renter totalt",
    total: "Totalt å betale tilbake",
    mesesReales: "Måneder til lånet er nedbetalt med ekstra avdrag",
    ahorro: "Renter du sparer",
    tabla: "Nedbetalingsplan",
    colMes: "Måned",
    colPago: "Terminbeløp",
    colInteres: "Renter",
    colCapital: "Avdrag",
    colSaldo: "Restgjeld",
    errorMonto: "Skriv inn et beløp som er større enn null.",
    observacionCostos: "Terminbeløpet tar ikke med forsikringer, gebyrer eller avgifter som långiveren kan legge til. Be om effektiv rente og totalkostnad før du signerer.",
    observacionExtra: (meses, ahorro) => `Med det ekstra avdraget er lånet nedbetalt etter ${meses} måneder, og du sparer ${ahorro} i renter.`,
  }),
};
