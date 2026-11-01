import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-pph-21-bukan-pegawai";

export default definirCasos(calculadora, [
  {
    nombre: "Contoh Tuan V di PMK 168/2023 (jasa perawatan AC)",
    origen: {
      tipo: "oficial",
      url: "https://jdih.kemenkeu.go.id/api/download/e60a82e0-b218-40f5-9d18-b924aa1e11ce/2023pmkeuangan168.pdf",
      detalle: "Lampiran PMK 168/2023, contoh V.4: 50% x (10.000.000 - (4.500.000 + 1.000.000)) = 2.250.000; 5% x 2.250.000 = 112.500.",
    },
    fecha: "2026-10-24",
    entrada: { imbalan: 10000000, pengurang: 5500000 },
    esperado: { pph: 112500, dasar: 2250000, bruto: 4500000 },
  },
  {
    nombre: "Imbalan besar yang melewati lapisan pertama",
    origen: { tipo: "recalculado", detalle: "Imbalan 200.000.000: dasar 50% = 100.000.000; 5% x 60.000.000 + 15% x 40.000.000 = 3.000.000 + 6.000.000 = 9.000.000." },
    fecha: "2026-10-24",
    entrada: { imbalan: 200000000, pengurang: 0 },
    esperado: { pph: 9000000, dasar: 100000000, diterima: 191000000 },
  },
  {
    nombre: "Pengurang sama dengan imbalan",
    origen: { tipo: "recalculado", detalle: "Pengurang tidak boleh menghabiskan seluruh imbalan." },
    fecha: "2026-10-24",
    entrada: { imbalan: 5000000, pengurang: 5000000 },
    esperaError: true,
  },
]);
