import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosSq: TextosUi<UiTarifaFreelance> = {
  slug: "tarife-freelance",
  ui: () => ({
    ingreso: "Sa dëshironi t'ju mbeten në vit",
    ingresoAyuda: "Pas tatimeve dhe shpenzimeve. Kjo është paga juaj si freelancer.",
    gastos: "Shpenzimet e veprimtarisë në vit",
    gastosAyuda: "Pajisje, programe, internet, kurse, kontabilist, sigurime shëndetësore dhe kursime për pension.",
    impuestos: "Tatime dhe kontribute të përllogaritura (%)",
    impuestosAyuda: "Sa shkon për tatime dhe kontribute nga ajo që faturoni minus shpenzimet. Nëse nuk jeni të sigurt, pyesni një kontabilist. 25% është një pikënisje.",
    diasLibres: "Ditë të lira në vit",
    diasLibresAyuda: "Pushime, festa zyrtare dhe ditë sëmundjeje. Askush nuk jua paguan, ndaj tarifa duhet t'i mbulojë.",
    diasSemana: "Ditë pune në javë",
    horasSemana: "Orë të faturueshme në javë",
    horasSemanaAyuda: "Vetëm orët që faturoni. Kërkimi i klientëve, puna administrative dhe mësimi nuk faturohen. Zakonisht janë 20 deri në 30 nga 40.",
    tarifaHora: "Tarifa për orë",
    tarifaDia: "Tarifa për ditë",
    facturacionMensual: "Faturimi i nevojshëm në muaj",
    facturacionAnual: "Faturimi i nevojshëm në vit",
    horasAnio: "Orë të faturueshme në vit",
    errorIngreso: "Vendosni sa dëshironi të fitoni në vit.",
    errorImpuestos: "Tatimet duhet të jenë nën 100%.",
    errorDias: "Me kaq ditë të lira nuk mbeten ditë pune në vit.",
    errorHoras: "Vendosni sa orë në javë mund të faturoni.",
    observacionFacturables: "Nëse kërkoni më pak se kaq, do të fitoni më pak se sa keni planifikuar ose do të punoni më shumë orë.",
  }),
};
