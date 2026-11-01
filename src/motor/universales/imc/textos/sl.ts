import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosSl: TextosUi<UiImc> = {
  slug: "izracun-itm",
  ui: () => ({
    peso: (u) => `Telesna masa (${u})`,
    altura: (u) => `Višina (${u})`,
    pies: "Višina: čevlji (ft)",
    pulgadas: "Višina: palci (in)",
    imc: "Indeks telesne mase (ITM)",
    categoria: "Kategorija (SZO)",
    pesoMin: (u) => `Spodnja meja zdrave telesne mase (${u})`,
    pesoMax: (u) => `Zgornja meja zdrave telesne mase (${u})`,
    rangoAyuda: "Razpon telesne mase, pri katerem ITM za vašo višino ostane v normalnih mejah.",
    bajo: "Podhranjenost",
    normal: "Normalna telesna masa",
    sobrepeso: "Čezmerna telesna masa",
    obesidad1: "Debelost I. stopnje",
    obesidad2: "Debelost II. stopnje",
    obesidad3: "Debelost III. stopnje",
    errorPeso: "Telesna masa mora biti večja od nič.",
    errorAltura: "Višina mora biti večja od nič.",
    aviso:
      "ITM je splošen kazalnik za odrasle: ne razlikuje mišic od maščobnega tkiva, pri nosečnicah in otrocih pa se razlaga drugače. Ne nadomešča pregleda pri zdravniku.",
  }),
};
