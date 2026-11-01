import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosIs: TextosUi<UiIva> = {
  slug: "vsk-reiknivel",
  ui: () => ({
    operacion: "Hvað viltu reikna?",
    agregar: "Bæta VSK við verð án VSK",
    quitar: "Taka VSK út úr verði með VSK",
    monto: "Verð",
    montoAyuda: "Án VSK ef þú bætir honum við, með VSK ef þú tekur hann út.",
    otraTasa: "Annað VSK-hlutfall (%)",
    otraTasaAyuda: "Valfrjálst. Ef varan eða þjónustan ber lægra VSK-hlutfall skaltu slá það inn hér. Annars er almenna hlutfallið notað.",
    neto: "Verð án VSK",
    impuesto: "VSK",
    total: "Verð með VSK",
    tasaUsada: "VSK-hlutfall sem er notað",
    errorTasa: "VSK-hlutfallið er ekki gilt.",
  }),
};
