import type { TextosUi } from "../../tipos";
import { duracionId } from "../../dias-entre-fechas/textos/id";
import type { UiEdad } from "../definicion";

export const textosId: TextosUi<UiEdad> = {
  slug: "kalkulator-umur",
  ui: () => ({
    nacimiento: "Tanggal lahir",
    referencia: "Umur pada tanggal",
    referenciaAyuda: "Bawaannya hari ini. Ubah untuk melihat umur pada tanggal lain.",
    edad: "Umur",
    anios: "Umur dalam tahun",
    totalMeses: "Dalam bulan",
    totalSemanas: "Dalam minggu",
    totalDias: "Dalam hari",
    proximo: "Ulang tahun berikutnya",
    faltan: "Hari tersisa",
    cumplira: "Akan berumur",
    duracion: duracionId,
    errorFutura: "Tanggal lahir tidak boleh setelah tanggal yang Anda periksa.",
    cumpleHoy: (anios) => `Hari ini ulang tahun: genap ${anios} tahun.`,
    nota29: "Bagi yang lahir pada 29 Februari, ulang tahunnya dihitung pada 28 Februari di tahun yang bukan tahun kabisat.",
  }),
};
