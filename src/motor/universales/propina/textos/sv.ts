import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosSv: TextosUi<UiPropina> = {
  slug: "dricksraknare",
  ui: () => ({
    cuenta: "Notans belopp",
    porcentaje: "Dricks (%)",
    porcentajeAyuda: "Seden skiljer sig mellan länder och ställen. Välj det som känns rimligt för dig.",
    personas: "Antal personer som betalar",
    redondear: "Avrunda varje andel uppåt",
    redondearAyuda: "Så att alla betalar ett jämnt belopp. Det som blir över går till dricksen.",
    propina: "Dricks",
    total: "Totalt med dricks",
    porPersona: "Var och en betalar",
    propinaEfectiva: "Dricks efter avrundning",
    errorPersonas: "Minst en person måste betala.",
    observacionRedondeo: (efectiva) => `Efter avrundningen uppåt är dricksen ${efectiva} % av notan.`,
  }),
};
