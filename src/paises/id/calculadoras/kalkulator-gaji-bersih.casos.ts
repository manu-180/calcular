import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-gaji-bersih";

const BASE = { risiko: "sangat-rendah", jp: true, batasJp: null, kesehatan: true } as const;

export default definirCasos(calculadora, [
  {
    nombre: "Gaji Rp10 juta, TK/0",
    origen: {
      tipo: "recalculado",
      detalle:
        "JHT 200.000, JP 100.000, BPJS Kesehatan 100.000 (kantor 400.000), JKK 0,24% 24.000, JKM 0,3% 30.000. Bruto pajak 10.454.000, TER A 2,5% = 261.350. Setahun: bruto 125.448.000, biaya jabatan 6.000.000, iuran 3.600.000, neto 115.848.000, PKP 61.848.000, PPh 3.277.200. Desember 3.277.200 - 11 x 261.350 = 402.350. Bersih 10.000.000 - 400.000 - 261.350 = 9.338.650; Desember 9.197.650; rata-rata 9.326.900.",
    },
    fecha: "2026-10-24",
    entrada: { ...BASE, gaji: 10000000, status: "tk0" },
    esperado: { bersih: 9338650, pphBulan: 261350, tarif: 2.5, pphTahun: 3277200, bersihDesember: 9197650, rataRata: 9326900, brutoPajak: 10454000 },
  },
  {
    nombre: "Gaji Rp5 juta, K/1: tanpa PPh 21",
    origen: {
      tipo: "recalculado",
      detalle: "Bruto pajak 5.000.000 + 12.000 + 15.000 + 200.000 = 5.227.000, TER B 0%. Setahun neto 57.787.800 di bawah PTKP K/1 63.000.000. Bersih 5.000.000 - 100.000 - 50.000 - 50.000 = 4.800.000.",
    },
    fecha: "2026-10-24",
    entrada: { ...BASE, gaji: 5000000, status: "k1" },
    esperado: { bersih: 4800000, pphBulan: 0, pphTahun: 0, rataRata: 4800000 },
  },
  {
    nombre: "Gaji Rp20 juta dengan batas upah JP dan batas BPJS Kesehatan",
    origen: {
      tipo: "recalculado",
      detalle:
        "JP 1% x 11.086.300 = 110.863; BPJS Kesehatan dari 12.000.000: 120.000 (kantor 480.000). Bruto pajak 20.588.000, TER A 9% = 1.852.920. Setahun PKP 180.925.000, PPh 3.000.000 + 15% x 120.925.000 = 21.138.750. Bersih 20.000.000 - 630.863 - 1.852.920 = 17.516.217.",
    },
    fecha: "2026-10-24",
    entrada: { ...BASE, gaji: 20000000, status: "tk0", batasJp: 11086300 },
    esperado: { bersih: 17516217, jpIuran: 110863, kes: 120000, pphBulan: 1852920, pphTahun: 21138750, bersihDesember: 18612507 },
  },
  {
    nombre: "Gaji nol",
    origen: { tipo: "recalculado", detalle: "Tanpa gaji tidak ada yang dihitung." },
    fecha: "2026-10-24",
    entrada: { ...BASE, gaji: 0, status: "tk0" },
    esperaError: true,
  },
]);
