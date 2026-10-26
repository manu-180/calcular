import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosCs: TextosUi<UiPromedio> = {
  slug: "vazeny-prumer",
  ui: () => ({
    nota: (n) => `Známka ${n}`,
    notaAyuda: "Zadejte každou známku nebo hodnotu s její váhou. Nepoužité řádky nechte prázdné.",
    peso: (n) => `Váha ${n}`,
    pesoAyuda: "Může to být procento, počet kreditů nebo kolikrát se hodnota započítává. Bez vah mají všechny hodnoty stejnou váhu.",
    ponderado: "Vážený průměr",
    simple: "Prostý průměr",
    cantidad: "Počet hodnot",
    sumaPesos: "Součet vah",
    errorSinNotas: "Zadejte alespoň jednu hodnotu.",
    errorFaltaPeso: "U této hodnoty chybí váha. Pokud váhy používáte, vyplňte je u všech hodnot.",
    errorFaltaNota: "U této váhy chybí hodnota. Doplňte hodnotu, nebo váhu smažte.",
    errorPesosCero: "Součet vah je 0: alespoň jedna váha musí být větší než nula.",
    sinPesos: "Bez vah vychází vážený průměr stejně jako prostý.",
  }),
};
