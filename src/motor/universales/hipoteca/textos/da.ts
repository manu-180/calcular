import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosDa: TextosUi<UiHipoteca> = {
  slug: "boliglaansberegner",
  ui: () => ({
    precio: "Boligens pris",
    entradaPorcentaje: "Udbetaling (% af prisen)",
    entradaMonto: "Udbetaling som beløb (valgfrit)",
    entradaMontoAyuda: "Skriver du den, bruges den i stedet for procentsatsen.",
    tasa: "Årlig rente (%)",
    anios: "Løbetid i år",
    gastos: "Faste boligudgifter pr. måned (valgfrit)",
    gastosAyuda: "Fællesudgifter, ejendomsskat, husforsikring eller andet, du betaler ud over lånet.",
    cuota: "Månedlig ydelse på lånet",
    cuotaTotal: "Månedlig udgift med boligudgifter",
    entrada: "Udbetaling",
    prestado: "Lånebeløb",
    intereses: "Renter i alt",
    total: "Samlede betalinger på lånet",
    tabla: "År for år",
    colAnio: "År",
    colIntereses: "Betalte renter",
    colCapital: "Afdrag",
    colSaldo: "Restgæld ved årets udgang",
    errorPrecio: "Skriv boligens pris.",
    errorEntrada: "Udbetalingen dækker hele prisen, så der er intet lån at regne på. Sænk udbetalingen.",
    observacionPrestado: (porcentaje) => `Du låner ${porcentaje} % af boligens værdi. Jo større en andel, jo mere vil banken som regel kræve af dig.`,
    observacionCostos: "Omkostninger ved købet (tinglysning, gebyrer, advokat og vurdering) er ikke med. Regn med dem ud over udbetalingen.",
  }),
};
