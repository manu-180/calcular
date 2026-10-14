import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosNl: TextosUi<UiAhorroRetiro> = {
  slug: "sparen-voor-je-pensioen",
  ui: () => ({
    edadActual: "Je leeftijd nu",
    edadRetiro: "Leeftijd waarop je wilt stoppen met werken",
    actual: "Wat je al gespaard hebt",
    aporte: "Inleg per maand",
    rendimiento: "Reëel rendement per jaar (%)",
    rendimientoAyuda: "Wat de belegging oplevert boven de inflatie. Op lange termijn is 2% tot 5% een voorzichtige aanname.",
    aniosRenta: "Aantal jaar dat je ervan wilt leven",
    aniosRentaAyuda: "Hoeveel jaar je dit spaargeld wilt opnemen.",
    capital: "Spaargeld bij je pensioen",
    renta: "Inkomen per maand uit dat spaargeld",
    aportado: "Totaal ingelegd",
    intereses: "Totale groei",
    tabla: "Groei per leeftijd",
    colEdad: "Leeftijd",
    colAportado: "Ingelegd tot nu toe",
    colSaldo: "Spaargeld",
    errorEdades: "De leeftijd waarop je stopt, moet hoger zijn dan je leeftijd nu.",
    errorSinAhorro: "Vul je huidige spaargeld of een inleg per maand in.",
    observacionDineroDeHoy: "De bedragen zijn in geld van vandaag, want het rendement is al zonder inflatie.",
    observacionPublica: "Dit is alleen je eigen spaargeld. Een pensioen van de overheid of via je werkgever zit er niet in.",
  }),
};
