import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosNb: TextosUi<UiTarifaFreelance> = {
  slug: "beregn-timepris",
  ui: () => ({
    ingreso: "Det du vil sitte igjen med per år",
    ingresoAyuda: "Etter skatt og kostnader. Det er lønnen din som selvstendig eller frilanser.",
    gastos: "Kostnader i firmaet per år",
    gastosAyuda: "Utstyr, programvare, internett, kurs, regnskap, forsikringer og pensjonssparing.",
    impuestos: "Anslått skatt og avgifter (%)",
    impuestosAyuda: "Det som går til skatt og avgifter av det du fakturerer, minus kostnadene. Er du usikker, spør en regnskapsfører. 25 % er et utgangspunkt.",
    diasLibres: "Fridager per år",
    diasLibresAyuda: "Ferie, helligdager og sykedager. Ingen betaler for dem, så timeprisen din må dekke dem.",
    diasSemana: "Arbeidsdager per uke",
    horasSemana: "Fakturerbare timer per uke",
    horasSemanaAyuda: "Bare timer du tar betalt for. Kundejakt, administrasjon og etterutdanning kan ikke faktureres. 20 til 30 av 40 er vanlig.",
    tarifaHora: "Timepris",
    tarifaDia: "Dagspris",
    facturacionMensual: "Nødvendig fakturering per måned",
    facturacionAnual: "Nødvendig fakturering per år",
    horasAnio: "Fakturerbare timer per år",
    errorIngreso: "Fyll inn hvor mye du vil tjene per år.",
    errorImpuestos: "Skatten må være under 100 %.",
    errorDias: "Med så mange fridager er det ingen arbeidsdager igjen i året.",
    errorHoras: "Fyll inn hvor mange timer per uke du kan fakturere.",
    observacionFacturables: "Tar du mindre enn dette, tjener du mindre enn du har planlagt, eller du må jobbe flere timer.",
  }),
};
