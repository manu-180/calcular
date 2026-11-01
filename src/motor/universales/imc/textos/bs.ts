import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosBs: TextosUi<UiImc> = {
  slug: "bmi-kalkulator",
  ui: () => ({
    peso: (u) => `Tjelesna težina (${u})`,
    altura: (u) => `Visina (${u})`,
    pies: "Visina: stope (ft)",
    pulgadas: "Visina: inči (in)",
    imc: "Indeks tjelesne mase (BMI)",
    categoria: "Kategorija (SZO)",
    pesoMin: (u) => `Donja granica zdrave tjelesne težine (${u})`,
    pesoMax: (u) => `Gornja granica zdrave tjelesne težine (${u})`,
    rangoAyuda: "Raspon tjelesne težine u kojem BMI za vašu visinu ostaje u normalnim granicama.",
    bajo: "Pothranjenost",
    normal: "Normalna tjelesna težina",
    sobrepeso: "Prekomjerna tjelesna težina",
    obesidad1: "Gojaznost I. stepena",
    obesidad2: "Gojaznost II. stepena",
    obesidad3: "Gojaznost III. stepena",
    errorPeso: "Tjelesna težina mora biti veća od nule.",
    errorAltura: "Visina mora biti veća od nule.",
    aviso:
      "BMI je opći pokazatelj za odrasle: ne razlikuje mišiće od masnog tkiva, a kod trudnica i djece tumači se drukčije. Ne zamjenjuje pregled kod ljekara.",
  }),
};
