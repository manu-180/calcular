import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosSr: TextosUi<UiImc> = {
  slug: "bmi-kalkulator",
  ui: () => ({
    peso: (u) => `Telesna masa (${u})`,
    altura: (u) => `Visina (${u})`,
    pies: "Visina: stope (ft)",
    pulgadas: "Visina: inči (in)",
    imc: "Indeks telesne mase (BMI)",
    categoria: "Kategorija (SZO)",
    pesoMin: (u) => `Donja granica zdrave telesne mase (${u})`,
    pesoMax: (u) => `Gornja granica zdrave telesne mase (${u})`,
    rangoAyuda: "Raspon telesne mase u kojem BMI za vašu visinu ostaje u normalnim granicama.",
    bajo: "Pothranjenost",
    normal: "Normalna telesna masa",
    sobrepeso: "Prekomerna telesna masa",
    obesidad1: "Gojaznost I stepena",
    obesidad2: "Gojaznost II stepena",
    obesidad3: "Gojaznost III stepena",
    errorPeso: "Telesna masa mora biti veća od nule.",
    errorAltura: "Visina mora biti veća od nule.",
    aviso:
      "BMI je opšti pokazatelj za odrasle: ne razlikuje mišiće od masnog tkiva, a kod trudnica i dece se tumači drugačije. Ne zamenjuje pregled kod lekara.",
  }),
};
