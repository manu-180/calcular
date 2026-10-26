import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosId: TextosUi<UiRitmo> = {
  slug: "kalkulator-pace-lari",
  ui: () => ({
    calcular: "Apa yang ingin Anda hitung?",
    calcRitmo: "Pace (dari jarak dan waktu)",
    calcTiempo: "Waktu (dari jarak dan pace)",
    calcDistancia: "Jarak (dari waktu dan pace)",
    distancia: "Jarak",
    distanciaAyuda: "Pilih jarak lomba, atau «Jarak lain» untuk mengetik sendiri.",
    otra: "Jarak lain",
    cincoK: "5K",
    diezK: "10K",
    media: "Half marathon",
    maraton: "Maraton",
    distanciaOtra: (u) => `Jarak lain (${u})`,
    horas: "Waktu: jam",
    minutos: "Waktu: menit",
    segundos: "Waktu: detik",
    ritmoMin: (u) => `Pace: menit per ${u}`,
    ritmoSeg: "Pace: detik",
    ritmo: (u) => `Pace (menit/${u})`,
    tiempo: "Waktu tempuh",
    distanciaRes: (u) => `Jarak (${u})`,
    velocidad: (u) => `Kecepatan rata-rata (${u})`,
    errorDistancia: "Masukkan jarak lebih dari 0.",
    errorTiempo: "Masukkan waktunya: jam, menit, atau detik.",
    errorRitmo: "Masukkan pace: menit dan detik per satuan jarak.",
  }),
};
