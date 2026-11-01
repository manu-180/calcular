import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-bpjs-ketenagakerjaan";

export default definirCasos(calculadora, [
  {
    nombre: "Upah Rp10 juta, risiko sangat rendah",
    origen: { tipo: "recalculado", detalle: "JHT 2% 200.000 + JP 1% 100.000 = 300.000. Pemberi kerja: JHT 3,7% 370.000 + JP 2% 200.000 + JKK 0,24% 24.000 + JKM 0,3% 30.000 = 624.000." },
    fecha: "2026-10-24",
    entrada: { upah: 10000000, risiko: "sangat-rendah", jp: true, batasJp: null },
    esperado: { pekerja: 300000, pemberi: 624000, total: 924000, tahunanJht: 6840000 },
  },
  {
    nombre: "Upah Rp20 juta dengan batas upah JP",
    origen: { tipo: "recalculado", detalle: "JHT 400.000; JP 1% x 11.086.300 = 110.863. Pemberi kerja: JHT 740.000 + JP 221.726 + JKK 1,27% 254.000 + JKM 60.000 = 1.275.726." },
    fecha: "2026-10-24",
    entrada: { upah: 20000000, risiko: "tinggi", jp: true, batasJp: 11086300 },
    esperado: { pekerja: 510863, pemberi: 1275726, jpPemberi: 221726, jkk: 254000 },
  },
  {
    nombre: "Tanpa Jaminan Pensiun",
    origen: { tipo: "recalculado", detalle: "Upah 6.000.000: JHT 120.000; pemberi kerja JHT 222.000 + JKK 0,54% 32.400 + JKM 18.000 = 272.400." },
    fecha: "2026-10-24",
    entrada: { upah: 6000000, risiko: "rendah", jp: false, batasJp: null },
    esperado: { pekerja: 120000, pemberi: 272400 },
  },
]);
