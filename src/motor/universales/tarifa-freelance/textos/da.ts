import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosDa: TextosUi<UiTarifaFreelance> = {
  slug: "beregn-timepris",
  ui: () => ({
    ingreso: "Det, du vil have tilbage om året",
    ingresoAyuda: "Efter skat og udgifter. Det er din løn som selvstændig eller freelancer.",
    gastos: "Udgifter i virksomheden om året",
    gastosAyuda: "Udstyr, software, internet, kurser, regnskab, forsikringer og pensionsopsparing.",
    impuestos: "Anslået skat og bidrag (%)",
    impuestosAyuda: "Det, der går til skat og bidrag af det, du fakturerer, minus udgifterne. Er du i tvivl, så spørg en revisor. 25 % er et udgangspunkt.",
    diasLibres: "Fridage om året",
    diasLibresAyuda: "Ferie, helligdage og sygedage. Ingen betaler for dem, så din timepris skal dække dem.",
    diasSemana: "Arbejdsdage om ugen",
    horasSemana: "Fakturerbare timer om ugen",
    horasSemanaAyuda: "Kun timer, du tager betaling for. Kundejagt, administration og efteruddannelse kan ikke faktureres. 20 til 30 ud af 40 er almindeligt.",
    tarifaHora: "Timepris",
    tarifaDia: "Dagspris",
    facturacionMensual: "Nødvendig fakturering om måneden",
    facturacionAnual: "Nødvendig fakturering om året",
    horasAnio: "Fakturerbare timer om året",
    errorIngreso: "Skriv, hvor meget du vil tjene om året.",
    errorImpuestos: "Skatten skal være under 100 %.",
    errorDias: "Med så mange fridage er der ingen arbejdsdage tilbage i året.",
    errorHoras: "Skriv, hvor mange timer om ugen du kan fakturere.",
    observacionFacturables: "Tager du mindre end det, tjener du mindre, end du har planlagt, eller du må arbejde flere timer.",
  }),
};
