import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosId: TextosUi<UiOvulacion> = {
  slug: "kalkulator-masa-subur",
  ui: () => ({
    fum: "Hari pertama haid terakhir (HPHT)",
    fumAyuda: "Hari pertama keluarnya darah haid, bukan hari terakhir.",
    ciclo: "Panjang siklus haid (hari)",
    cicloAyuda: "Dari hari pertama satu haid sampai sehari sebelum haid berikutnya. Jika berubah-ubah, pakai rata-ratanya.",
    ovulacion: "Perkiraan ovulasi",
    fertilDesde: "Masa subur mulai",
    fertilHasta: "Masa subur sampai",
    proxima: "Haid berikutnya",
    tabla: "Siklus berikutnya",
    colRegla: "Haid",
    colDesde: "Subur mulai",
    colHasta: "Subur sampai",
    colOvulacion: "Ovulasi",
    errorCiclo: "Panjang siklus harus antara 21 dan 45 hari.",
    aviso: "Ini perkiraan untuk siklus yang teratur. Kalkulator ini bukan metode kontrasepsi dan tidak menggantikan konsultasi dengan dokter atau bidan.",
  }),
};
