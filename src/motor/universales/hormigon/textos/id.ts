import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosId: TextosUi<UiHormigon> = {
  slug: "kalkulator-beton",
  ui: () => ({
    largo: (u) => `Panjang (${u})`,
    ancho: (u) => `Lebar (${u})`,
    espesor: (u) => `Tebal (${u})`,
    espesorAyuda: "Lantai kerja atau jalan setapak biasanya 10 cm (4 in). Carport atau jalan masuk mobil, 12 sampai 15 cm.",
    margen: "Cadangan tambahan (%)",
    margenAyuda: "Untuk permukaan yang tidak rata dan adukan yang tumpah. Umumnya 5% sampai 10%.",
    bolsa: (u) => `Berat semen per sak (${u})`,
    volumen: (u) => `Volume pas (${u})`,
    volumenTotal: (u) => `Beton yang dibutuhkan (${u})`,
    volumenPies: "Beton yang dibutuhkan (ft³)",
    cemento: (u) => `Semen (${u})`,
    bolsas: "Jumlah sak semen",
    arena: (u) => `Pasir (${u})`,
    piedra: (u) => `Kerikil atau split (${u})`,
    agua: (u) => (u === "L" ? "Air (liter)" : "Air (galon)"),
    errorMedida: "Ukuran ini harus lebih dari 0.",
    aviso: "Kebutuhan material ini adalah patokan untuk campuran umum 1:2:3 (sekitar 350 kg semen per m³). Angkanya berubah sesuai mutu beton, jenis pekerjaan, dan material setempat. Pastikan kembali dengan mandor atau pelaksana proyek.",
  }),
};
