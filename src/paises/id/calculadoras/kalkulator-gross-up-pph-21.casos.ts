import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-gross-up-pph-21";

export default definirCasos(calculadora, [
  {
    nombre: "Gaji Rp10 juta, TK/0",
    origen: {
      tipo: "recalculado",
      detalle: "Bruto tanpa tunjangan 10.454.000 (gaji + JKK 24.000 + JKM 30.000 + BPJS Kesehatan 400.000). Dengan tunjangan, bruto masuk TER A 3% (10.700.000 sampai 11.050.000): T = 3% x (10.454.000 + T), T = 323.319,6 dibulatkan 323.320. Bruto 10.777.320.",
    },
    fecha: "2026-10-24",
    entrada: { gaji: 10000000, status: "tk0", risiko: "sangat-rendah", kesehatan: true },
    esperado: { tunjangan: 323320, bruto: 10777320, pph: 323320, tarif: 3 },
  },
  {
    nombre: "Gaji di bawah batas TER kategori B",
    origen: { tipo: "recalculado", detalle: "Gaji 5.000.000, K/1: bruto 5.227.000, TER B 0%. Tunjangan 0." },
    fecha: "2026-10-24",
    entrada: { gaji: 5000000, status: "k1", risiko: "sangat-rendah", kesehatan: true },
    esperado: { tunjangan: 0, bruto: 5227000 },
  },
]);
