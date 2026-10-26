import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosSv: TextosUi<UiTarifaFreelance> = {
  slug: "rakna-ut-timpris",
  ui: () => ({
    ingreso: "Det du vill ha kvar per år",
    ingresoAyuda: "Efter skatt och kostnader. Det är din lön som egenföretagare eller frilansare.",
    gastos: "Kostnader i verksamheten per år",
    gastosAyuda: "Utrustning, program, internet, kurser, redovisning, försäkringar och pensionssparande.",
    impuestos: "Uppskattad skatt och avgifter (%)",
    impuestosAyuda: "Det som går till skatt och sociala avgifter på det du fakturerar minus kostnaderna. Är du osäker, fråga en redovisningskonsult. 25 % är en startpunkt.",
    diasLibres: "Lediga dagar per år",
    diasLibresAyuda: "Semester, helgdagar och sjukdagar. Ingen betalar för dem, så ditt timpris måste täcka dem.",
    diasSemana: "Arbetsdagar per vecka",
    horasSemana: "Debiterbara timmar per vecka",
    horasSemanaAyuda: "Bara timmar som du tar betalt för. Kundjakt, administration och fortbildning går inte att debitera. 20 till 30 av 40 är vanligt.",
    tarifaHora: "Timpris",
    tarifaDia: "Dagpris",
    facturacionMensual: "Fakturering som behövs per månad",
    facturacionAnual: "Fakturering som behövs per år",
    horasAnio: "Debiterbara timmar per år",
    errorIngreso: "Fyll i hur mycket du vill tjäna per år.",
    errorImpuestos: "Skatten måste vara under 100 %.",
    errorDias: "Med så många lediga dagar blir det inga arbetsdagar kvar på året.",
    errorHoras: "Fyll i hur många timmar i veckan du kan debitera.",
    observacionFacturables: "Tar du betalt mindre än så tjänar du mindre än du har planerat eller får jobba fler timmar.",
  }),
};
