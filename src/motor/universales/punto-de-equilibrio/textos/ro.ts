import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosRo: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "prag-de-rentabilitate",
  ui: () => ({
    fijos: "Costuri fixe pe lună",
    fijosAyuda: "Ce plătiți chiar dacă nu vindeți nimic: chirie, salarii fixe, utilități, programe.",
    precio: "Prețul de vânzare pe unitate",
    variable: "Costul variabil pe unitate",
    variableAyuda: "Cât vă costă fiecare unitate vândută: materiale, marfă, comisioane, transport.",
    objetivo: "Profitul dorit pe lună (opțional)",
    objetivoAyuda: "Ca să vedeți cât trebuie să vindeți peste acoperirea costurilor.",
    unidades: "Unități până la pragul de rentabilitate",
    facturacion: "Vânzări până la pragul de rentabilitate",
    contribucion: "Marja de contribuție pe unitate",
    contribucionAyuda: "Ce lasă fiecare vânzare pentru acoperirea costurilor fixe: prețul minus costul variabil.",
    contribucionPct: "Marja de contribuție (%)",
    unidadesObjetivo: "Unități pentru profitul dorit",
    facturacionObjetivo: "Vânzări pentru profitul dorit",
    errorPrecio: "Introduceți prețul de vânzare al unei unități.",
    errorMargen: "Costul variabil este egal sau mai mare decât prețul: fiecare vânzare aduce pierdere și pragul de rentabilitate nu se atinge niciodată. Verificați prețul sau costul.",
    observacionRedondeo: "Unitățile se rotunjesc în sus, pentru că nu se poate vinde o parte dintr-o unitate.",
  }),
};
