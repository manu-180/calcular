import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosPl: TextosUi<UiImc> = {
  slug: "kalkulator-bmi",
  ui: () => ({
    peso: (u) => `Masa ciała (${u})`,
    altura: (u) => `Wzrost (${u})`,
    pies: "Wzrost: stopy (ft)",
    pulgadas: "Wzrost: cale (in)",
    imc: "Wskaźnik masy ciała (BMI)",
    categoria: "Kategoria (WHO)",
    pesoMin: (u) => `Prawidłowa masa ciała od (${u})`,
    pesoMax: (u) => `Prawidłowa masa ciała do (${u})`,
    rangoAyuda: "Zakres masy ciała, który przy tym wzroście daje BMI w normie.",
    bajo: "Niedowaga",
    normal: "Waga prawidłowa",
    sobrepeso: "Nadwaga",
    obesidad1: "Otyłość I stopnia",
    obesidad2: "Otyłość II stopnia",
    obesidad3: "Otyłość III stopnia",
    errorPeso: "Masa ciała musi być większa od 0.",
    errorAltura: "Wzrost musi być większy od 0.",
    aviso:
      "BMI to orientacyjny wskaźnik dla dorosłych. Nie odróżnia mięśni od tkanki tłuszczowej, a u dzieci i w ciąży ocenia się go inaczej. Nie zastępuje konsultacji z lekarzem.",
  }),
};
