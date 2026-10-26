import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosId: TextosUi<UiMetrosCuadrados> = {
  slug: "kalkulator-meter-persegi",
  ui: () => ({
    forma: (n) => `Bidang ${n}: bentuk`,
    formaAyuda: "Jika ruangan berbentuk L atau tidak beraturan, bagi menjadi beberapa bagian lalu jumlahkan.",
    ninguna: "Tidak dipakai",
    rectangulo: "Persegi panjang atau persegi",
    triangulo: "Segitiga",
    circulo: "Lingkaran",
    medidaA: (n, u) => `Bidang ${n}: panjang, alas, atau diameter (${u})`,
    medidaAAyuda: "Persegi panjang: panjang dan lebar. Segitiga: alas dan tinggi. Lingkaran: cukup diameternya.",
    medidaB: (n, u) => `Bidang ${n}: lebar atau tinggi (${u})`,
    total: (u) => `Luas total (${u})`,
    equivale: (u) => `Setara dalam ${u}`,
    parcial: (n, u) => `Bidang ${n} (${u})`,
    errorMedida: "Ukuran ini belum diisi atau bernilai 0.",
  }),
};
