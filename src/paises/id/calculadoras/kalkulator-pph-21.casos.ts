import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-pph-21";

const PMK = "https://jdih.kemenkeu.go.id/api/download/e60a82e0-b218-40f5-9d18-b924aa1e11ce/2023pmkeuangan168.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Contoh Tuan A di PMK 168/2023 (K/0, setahun penuh)",
    origen: {
      tipo: "oficial",
      url: PMK,
      detalle: "Lampiran PMK 168/2023, contoh I.1: bruto 450.960.000, biaya jabatan 6.000.000, iuran pensiun 1.200.000, zakat 2.400.000, neto 441.360.000, PTKP K/0 58.500.000, PKP 382.860.000, PPh setahun 64.715.000, sudah dipotong 50.120.000, Desember 14.595.000.",
    },
    fecha: "2026-10-24",
    entrada: { bruto: 450960000, status: "k0", iuran: 1200000, zakat: 2400000, dipotong: 50120000 },
    esperado: { pph: 64715000, selisih: 14595000, biayaJabatan: 6000000, neto: 441360000, ptkp: 58500000, pkp: 382860000 },
  },
  {
    nombre: "Penghasilan di bawah PTKP",
    origen: { tipo: "recalculado", detalle: "Bruto 60.000.000, biaya jabatan 3.000.000, neto 57.000.000, PTKP K/1 63.000.000: PKP 0, PPh 0." },
    fecha: "2026-10-24",
    entrada: { bruto: 60000000, status: "k1", iuran: 0, zakat: 0, dipotong: null },
    esperado: { pph: 0, pkp: 0, ptkp: 63000000 },
  },
  {
    nombre: "PKP dibulatkan ke bawah hingga ribuan",
    origen: { tipo: "recalculado", detalle: "Bruto 120.000.500, biaya jabatan 6.000.000 (5% = 6.000.025 dibatasi), neto 114.000.500, PTKP TK/0 54.000.000, PKP 60.000.500 dibulatkan 60.000.000, PPh 5% = 3.000.000." },
    fecha: "2026-10-24",
    entrada: { bruto: 120000500, status: "tk0", iuran: 0, zakat: 0, dipotong: null },
    esperado: { pph: 3000000, pkp: 60000000 },
  },
  {
    nombre: "Tanpa penghasilan",
    origen: { tipo: "recalculado", detalle: "Penghasilan bruto nol tidak bisa dihitung." },
    fecha: "2026-10-24",
    entrada: { bruto: 0, status: "tk0", iuran: 0, zakat: 0, dipotong: null },
    esperaError: true,
  },
]);
