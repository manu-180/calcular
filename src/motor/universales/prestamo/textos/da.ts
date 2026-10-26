import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosDa: TextosUi<UiPrestamo> = {
  slug: "laaneberegner",
  ui: () => ({
    monto: "Lånebeløb",
    tasa: "Årlig rente (%)",
    tasaAyuda: "Den nominelle rente pr. år i tilbuddet. Gebyrer er ikke med.",
    meses: "Løbetid i måneder",
    extra: "Ekstra afdrag pr. måned (valgfrit)",
    extraAyuda: "Det, du vil betale ekstra hver måned for at blive færdig hurtigere. Det hele går til at nedbringe gælden.",
    cuota: "Månedlig ydelse",
    intereses: "Renter i alt",
    total: "Samlet tilbagebetaling",
    mesesReales: "Måneder, til lånet er betalt med ekstra afdrag",
    ahorro: "Renter, du sparer",
    tabla: "Afdragsplan",
    colMes: "Måned",
    colPago: "Ydelse",
    colInteres: "Rente",
    colCapital: "Afdrag",
    colSaldo: "Restgæld",
    errorMonto: "Skriv et beløb, der er større end nul.",
    observacionCostos: "Ydelsen tager ikke højde for forsikringer, gebyrer eller afgifter, som långiveren kan lægge oven i. Spørg efter ÅOP og de samlede omkostninger, før du skriver under.",
    observacionExtra: (meses, ahorro) => `Med det ekstra afdrag er lånet betalt efter ${meses} måneder, og du sparer ${ahorro} i renter.`,
  }),
};
