import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosNl: TextosUi<UiInteresCompuesto> = {
  slug: "rente-op-rente-berekenen",
  ui: () => ({
    capital: "Startbedrag",
    aporte: "Inleg per maand (niet verplicht)",
    aporteAyuda: "Wat je elke maand erbij zet. Het komt aan het eind van elke maand op de rekening.",
    tasa: "Rente per jaar (%)",
    anios: "Aantal jaar",
    capitalizacion: "Rentebijschrijving",
    anual: "Per jaar",
    semestral: "Per halfjaar",
    trimestral: "Per kwartaal",
    mensual: "Per maand",
    diaria: "Per dag",
    saldo: "Eindbedrag",
    aportado: "Totaal ingelegd",
    intereses: "Ontvangen rente",
    tabla: "Groei per jaar",
    colAnio: "Jaar",
    colAportado: "Inleg",
    colIntereses: "Rente",
    colSaldo: "Saldo eind van het jaar",
    errorSinDinero: "Vul een startbedrag of een inleg per maand in.",
    observacionIntereses: (porcentaje) => `${porcentaje}% van het eindbedrag is rente.`,
  }),
};
