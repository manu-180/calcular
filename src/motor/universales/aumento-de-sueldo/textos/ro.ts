import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosRo: TextosUi<UiAumentoDeSueldo> = {
  slug: "calculator-marire-salariu",
  ui: () => ({
    sueldo: "Salariul lunar actual",
    sueldoAyuda: "Brut sau net, cum preferați. Rezultatul folosește aceeași bază.",
    aumentoPorcentaje: "Mărire (%)",
    aumentoMonto: "Mărire ca sumă (opțional)",
    aumentoMontoAyuda: "Dacă mărirea este o sumă fixă, introduceți-o aici. Se folosește în locul procentului.",
    inflacion: "Inflația din perioadă (%, opțional)",
    inflacionAyuda: "Inflația de la ultima mărire, ca să vedeți dacă salariul cumpără mai mult sau mai puțin decât înainte.",
    sueldosAnio: "Salarii pe an",
    sueldosAnioAyuda: "12 pentru salariul lunar. 13 sau 14 dacă primiți și un salariu în plus pe an.",
    nuevo: "Salariul lunar nou",
    diferenciaMensual: "Diferența pe lună",
    diferenciaAnual: "Diferența pe an",
    porcentaje: "Mărirea în procente",
    real: "Mărirea reală (după inflație)",
    realAyuda: "Cât mai mult puteți cumpăra cu salariul nou față de cel vechi.",
    errorSueldo: "Introduceți salariul actual.",
    errorSinAumento: "Introduceți mărirea în procente sau ca sumă.",
    observacionGana: (puntos) => `Mărirea bate inflația: salariul cumpără cu ${puntos}% mai mult decât înainte.`,
    observacionPierde: (puntos) => `Mărirea rămâne sub inflație: salariul cumpără cu ${puntos}% mai puțin decât înainte.`,
    observacionIgual: "Mărirea este egală cu inflația: salariul cumpără la fel ca înainte.",
  }),
};
