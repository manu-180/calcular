import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosLv: TextosUi<UiIva> = {
  slug: "pvn-kalkulators",
  ui: () => ({
    operacion: "Ko vēlaties aprēķināt?",
    agregar: "Pieskaitīt PVN cenai bez PVN",
    quitar: "Atskaitīt PVN no cenas ar PVN",
    monto: "Cena",
    montoAyuda: "Bez PVN, ja nodokli pieskaitāt. Ar PVN, ja to atskaitāt.",
    otraTasa: "Cita PVN likme (%)",
    otraTasaAyuda: "Nav obligāti. Ja precei vai pakalpojumam piemēro samazināto likmi, ievadiet to šeit. Citādi piemēro standarta likmi.",
    neto: "Cena bez PVN",
    impuesto: "PVN",
    total: "Cena ar PVN",
    tasaUsada: "Piemērotā likme",
    errorTasa: "PVN likme nav derīga.",
  }),
};
