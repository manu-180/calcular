import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-inflasi";

export default definirCasos(calculadora, [
  {
    nombre: "Rp10 juta, 5 tahun, inflasi September 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Inflasi tahunan September 2026 3,28% (Bank Indonesia, data BPS). 1,0328^5 = 1,175117; 10.000.000 x 1,175117 = 11.751.171; 10.000.000 / 1,175117 = 8.509.790; setahun lalu 10.000.000 / 1,0328 = 9.682.417.",
    },
    fecha: "2026-10-24",
    entrada: { jumlah: 10000000, tahun: 5, inflasi: null },
    esperado: { dibutuhkan: 11751171, dayaBeli: 8509790, setahunLalu: 9682417, tasa: 3.28, periode: "September 2026" },
  },
  {
    nombre: "Inflasi pilihan sendiri 5% selama 10 tahun",
    origen: { tipo: "recalculado", detalle: "1,05^10 = 1,628895; 5.000.000 x 1,628895 = 8.144.473; 5.000.000 / 1,628895 = 3.069.566." },
    fecha: "2026-10-24",
    entrada: { jumlah: 5000000, tahun: 10, inflasi: 5 },
    esperado: { dibutuhkan: 8144473, dayaBeli: 3069566 },
  },
]);
