import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosId: TextosUi<UiImc> = {
  slug: "kalkulator-bmi",
  ui: () => ({
    peso: (u) => `Berat badan (${u})`,
    altura: (u) => `Tinggi badan (${u})`,
    pies: "Tinggi badan: kaki (ft)",
    pulgadas: "Tinggi badan: inci (in)",
    imc: "Indeks massa tubuh (BMI)",
    categoria: "Kategori (WHO)",
    pesoMin: (u) => `Berat badan ideal mulai dari (${u})`,
    pesoMax: (u) => `Berat badan ideal sampai (${u})`,
    rangoAyuda: "Rentang berat badan yang menghasilkan BMI normal untuk tinggi badan ini.",
    bajo: "Berat badan kurang",
    normal: "Berat badan normal",
    sobrepeso: "Berat badan berlebih",
    obesidad1: "Obesitas kelas 1",
    obesidad2: "Obesitas kelas 2",
    obesidad3: "Obesitas kelas 3",
    errorPeso: "Berat badan harus lebih dari 0.",
    errorAltura: "Tinggi badan harus lebih dari 0.",
    aviso:
      "BMI adalah panduan umum untuk orang dewasa. BMI tidak membedakan otot dan lemak, dan tidak berlaku sama untuk ibu hamil atau anak. Hasil ini tidak menggantikan konsultasi dengan dokter atau tenaga kesehatan.",
  }),
};
