import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosRo: TextosUi<UiIva> = {
  slug: "calculator-tva",
  ui: () => ({
    operacion: "Ce doriți să calculați?",
    agregar: "Adăugați TVA la un preț fără TVA",
    quitar: "Scoateți TVA dintr-un preț cu TVA",
    monto: "Preț",
    montoAyuda: "Fără TVA dacă adăugați taxa; cu TVA inclus dacă o scoateți.",
    otraTasa: "Altă cotă de TVA (%)",
    otraTasaAyuda: "Opțional. Dacă produsul are o cotă redusă, introduceți-o aici. Altfel se aplică cota standard.",
    neto: "Preț fără TVA",
    impuesto: "TVA",
    total: "Preț cu TVA",
    tasaUsada: "Cota aplicată",
    errorTasa: "Cota de TVA nu este validă.",
  }),
};
