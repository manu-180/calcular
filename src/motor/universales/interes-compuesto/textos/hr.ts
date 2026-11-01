import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosHr: TextosUi<UiInteresCompuesto> = {
  slug: "slozena-kamata",
  ui: () => ({
    capital: "Početni ulog",
    aporte: "Mjesečna uplata (neobavezno)",
    aporteAyuda: "Koliko ćete dodavati svakog mjeseca. Uplata se dodaje na kraju svakog mjeseca.",
    tasa: "Godišnja kamatna stopa (%)",
    anios: "Broj godina",
    capitalizacion: "Pripis kamate",
    anual: "Godišnje",
    semestral: "Polugodišnje",
    trimestral: "Tromjesečno",
    mensual: "Mjesečno",
    diaria: "Dnevno",
    saldo: "Konačni iznos",
    aportado: "Ukupno uloženo",
    intereses: "Zarađena kamata",
    tabla: "Rast po godinama",
    colAnio: "Godina",
    colAportado: "Uplate",
    colIntereses: "Kamata",
    colSaldo: "Iznos na kraju godine",
    errorSinDinero: "Unesite početni ulog ili mjesečnu uplatu.",
    observacionIntereses: (porcentaje) => `Kamata čini ${porcentaje} % konačnog iznosa.`,
  }),
};
