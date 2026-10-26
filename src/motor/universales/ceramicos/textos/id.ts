import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosId: TextosUi<UiCeramicos> = {
  slug: "kalkulator-keramik",
  ui: () => ({
    superficie: (u) => `Luas yang akan dipasang keramik (${u})`,
    largo: (u) => `Panjang keramik (${u})`,
    ancho: (u) => `Lebar keramik (${u})`,
    desperdicio: "Cadangan potongan (%)",
    desperdicioAyuda: "Untuk potongan dan keramik pecah. Pakai 10% untuk pola lurus dan 15% untuk pola diagonal.",
    porCaja: "Isi keramik per dus",
    porCajaAyuda: "Opsional. Isi agar Anda tahu berapa dus yang perlu dibeli.",
    piezas: "Jumlah keramik",
    cajas: "Dus yang perlu dibeli",
    conDesperdicio: (u) => `Luas dengan cadangan (${u})`,
    cubre: (u) => `Luas yang tertutup dus tersebut (${u})`,
    errorSuperficie: "Luasnya harus lebih dari 0.",
    errorPieza: "Ukuran keramik harus lebih dari 0.",
  }),
};
