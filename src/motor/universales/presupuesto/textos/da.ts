import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosDa: TextosUi<UiPresupuesto> = {
  slug: "budget-50-30-20",
  ui: () => ({
    ingreso: "Indkomst pr. måned efter skat",
    ingresoAyuda: "Det, der kommer ind på kontoen hver måned, efter skat og fradrag.",
    pctNecesidades: "Nødvendige udgifter (%)",
    pctNecesidadesAyuda: "Bolig, mad, el, transport, sundhed og minimumsbetalingerne på dine lån.",
    pctGustos: "Fornøjelser og andet (%)",
    pctGustosAyuda: "Restaurant, indkøb du kan undvære, abonnementer og rejser.",
    pctAhorro: "Opsparing (%)",
    pctAhorroAyuda: "Buffer, sparemål, pension og ekstra afdrag på gæld.",
    necesidades: "Til nødvendige udgifter",
    gustos: "Til fornøjelser og andet",
    ahorro: "Til opsparing",
    ahorroAnual: "Opsparing på et år",
    errorIngreso: "Skriv din indkomst pr. måned.",
    errorSuma: (suma) => `De tre procentsatser giver tilsammen ${suma} %. De skal give 100 %.`,
    observacionAhorroBajo: "Sparer du mindre end 10 % op, bliver der lidt plads til uventede udgifter. Skær ned på nogle fornøjelser, hvis du kan.",
  }),
};
