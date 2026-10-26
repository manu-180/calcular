import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosNb: TextosUi<UiInteresCompuesto> = {
  slug: "renters-rente",
  ui: () => ({
    capital: "Startbeløp",
    aporte: "Månedlig sparebeløp (valgfritt)",
    aporteAyuda: "Det du setter inn hver måned. Innskuddet regnes med på slutten av hver måned.",
    tasa: "Årlig avkastning eller rente (%)",
    anios: "Antall år",
    capitalizacion: "Hvor ofte renten legges til",
    anual: "Hvert år",
    semestral: "Hvert halvår",
    trimestral: "Hvert kvartal",
    mensual: "Hver måned",
    diaria: "Hver dag",
    saldo: "Sluttbeløp",
    aportado: "Satt inn totalt",
    intereses: "Renter og avkastning",
    tabla: "Utvikling år for år",
    colAnio: "År",
    colAportado: "Innskudd",
    colIntereses: "Renter",
    colSaldo: "Saldo ved årets slutt",
    errorSinDinero: "Skriv inn et startbeløp eller et månedlig sparebeløp.",
    observacionIntereses: (porcentaje) => `${porcentaje} % av sluttbeløpet er rentes rente og avkastning.`,
  }),
};
