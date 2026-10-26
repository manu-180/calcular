import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosDa: TextosUi<UiInteresCompuesto> = {
  slug: "renters-rente",
  ui: () => ({
    capital: "Startbeløb",
    aporte: "Månedlig opsparing (valgfrit)",
    aporteAyuda: "Det, du sætter ind hver måned. Indbetalingen regnes med i slutningen af hver måned.",
    tasa: "Årligt afkast eller rente (%)",
    anios: "Antal år",
    capitalizacion: "Rentetilskrivning",
    anual: "Hvert år",
    semestral: "Hvert halve år",
    trimestral: "Hvert kvartal",
    mensual: "Hver måned",
    diaria: "Hver dag",
    saldo: "Slutbeløb",
    aportado: "Indbetalt i alt",
    intereses: "Renter og afkast",
    tabla: "Udvikling år for år",
    colAnio: "År",
    colAportado: "Indbetalinger",
    colIntereses: "Renter",
    colSaldo: "Saldo ved årets udgang",
    errorSinDinero: "Skriv et startbeløb eller en månedlig opsparing.",
    observacionIntereses: (porcentaje) => `${porcentaje} % af slutbeløbet er renters rente og afkast.`,
  }),
};
