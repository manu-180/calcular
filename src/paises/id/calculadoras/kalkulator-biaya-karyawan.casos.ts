import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-biaya-karyawan";

export default definirCasos(calculadora, [
  {
    nombre: "Gaji Rp10 juta dengan THR",
    origen: {
      tipo: "recalculado",
      detalle: "JHT 3,7% 370.000 + JP 2% 200.000 + JKK 0,24% 24.000 + JKM 0,3% 30.000 = 624.000; BPJS Kesehatan 4% 400.000; THR 10.000.000 / 12 = 833.333. Total 11.857.333.",
    },
    fecha: "2026-10-24",
    entrada: { gaji: 10000000, risiko: "sangat-rendah", jp: true, batasJp: null, kesehatan: true, thr: true },
    esperado: { total: 11857333, bpjsTk: 624000, kes: 400000, thr: 833333 },
  },
  {
    nombre: "Gaji Rp5 juta tanpa THR dan tanpa JP",
    origen: { tipo: "recalculado", detalle: "JHT 185.000 + JKK 0,89% 44.500 + JKM 15.000 = 244.500; BPJS Kesehatan 200.000. Total 5.444.500." },
    fecha: "2026-10-24",
    entrada: { gaji: 5000000, risiko: "sedang", jp: false, batasJp: null, kesehatan: true, thr: false },
    esperado: { total: 5444500, bpjsTk: 244500, thr: 0 },
  },
]);
