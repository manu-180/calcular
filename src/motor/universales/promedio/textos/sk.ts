import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosSk: TextosUi<UiPromedio> = {
  slug: "vazeny-priemer",
  ui: () => ({
    nota: (n) => `Známka ${n}`,
    notaAyuda: "Zadajte každú známku alebo hodnotu s jej váhou. Nepoužité riadky nechajte prázdne.",
    peso: (n) => `Váha ${n}`,
    pesoAyuda: "Môže to byť percento, počet kreditov alebo koľkokrát sa hodnota započítava. Bez váh majú všetky hodnoty rovnakú váhu.",
    ponderado: "Vážený priemer",
    simple: "Jednoduchý priemer",
    cantidad: "Počet hodnôt",
    sumaPesos: "Súčet váh",
    errorSinNotas: "Zadajte aspoň jednu hodnotu.",
    errorFaltaPeso: "Pri tejto hodnote chýba váha. Ak váhy používate, vyplňte ich pri všetkých hodnotách.",
    errorFaltaNota: "Pri tejto váhe chýba hodnota. Doplňte hodnotu alebo váhu vymažte.",
    errorPesosCero: "Súčet váh je 0: aspoň jedna váha musí byť väčšia ako nula.",
    sinPesos: "Bez váh vychádza vážený priemer rovnako ako jednoduchý.",
  }),
};
