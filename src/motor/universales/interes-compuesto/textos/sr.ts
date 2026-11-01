import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosSr: TextosUi<UiInteresCompuesto> = {
  slug: "slozena-kamata",
  ui: () => ({
    capital: "Početni ulog",
    aporte: "Mesečna uplata (nije obavezno)",
    aporteAyuda: "Koliko ćete dodavati svakog meseca. Uplata se dodaje na kraju svakog meseca.",
    tasa: "Godišnja kamatna stopa (%)",
    anios: "Broj godina",
    capitalizacion: "Pripisivanje kamate",
    anual: "Godišnje",
    semestral: "Polugodišnje",
    trimestral: "Tromesečno",
    mensual: "Mesečno",
    diaria: "Dnevno",
    saldo: "Konačan iznos",
    aportado: "Ukupno uloženo",
    intereses: "Zarađena kamata",
    tabla: "Rast po godinama",
    colAnio: "Godina",
    colAportado: "Uplate",
    colIntereses: "Kamata",
    colSaldo: "Iznos na kraju godine",
    errorSinDinero: "Unesite početni ulog ili mesečnu uplatu.",
    observacionIntereses: (porcentaje) => `${porcentaje}% konačnog iznosa čini kamata.`,
  }),
};
