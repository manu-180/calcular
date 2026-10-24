import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosId: TextosUi<UiFechaDeParto> = {
  slug: "kalkulator-hpl",
  ui: () => ({
    metodo: "Tanggal mana yang Anda ketahui?",
    fum: "Hari pertama haid terakhir (HPHT)",
    concepcion: "Tanggal pembuahan",
    fecha: "Tanggal",
    fechaAyuda: "Jika memilih HPHT, masukkan hari pertama keluarnya darah haid.",
    ciclo: "Panjang siklus haid (hari)",
    cicloAyuda: "Hanya dipakai dengan HPHT. Jika tidak tahu, biarkan 28.",
    fpp: "Hari perkiraan lahir (HPL)",
    edadGestacional: "Usia kehamilan hari ini",
    trimestre: "Trimester",
    faltan: "Sisa hari",
    fechaConcepcion: "Perkiraan tanggal pembuahan",
    semanasYDias: (s, d) => `${s} minggu${d ? ` ${d} hari` : ""}`,
    trimestres: ["Trimester pertama", "Trimester kedua", "Trimester ketiga"],
    errorFutura: "Tanggal tidak boleh melewati hari ini.",
    errorCiclo: "Panjang siklus harus antara 20 dan 45 hari.",
    notaPasada: "Sudah lebih dari 42 minggu sejak tanggal itu, jadi usia kehamilan tidak ditampilkan.",
    aviso: "Ini hanya perkiraan: sedikit bayi lahir tepat pada HPL. USG dan pemeriksaan rutin dengan dokter atau bidan memberi tanggal yang paling akurat.",
  }),
};
