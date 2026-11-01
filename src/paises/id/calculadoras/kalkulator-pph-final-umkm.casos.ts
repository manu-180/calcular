import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-pph-final-umkm";

export default definirCasos(calculadora, [
  {
    nombre: "Orang pribadi melewati Rp500 juta bulan ini",
    origen: { tipo: "recalculado", detalle: "PP 55/2022 Pasal 60 ayat (2) dan (3): sisa bebas 500.000.000 - 450.000.000 = 50.000.000. Dasar 100.000.000 - 50.000.000 = 50.000.000 x 0,5% = 250.000." },
    fecha: "2026-10-24",
    entrada: { wp: "orang-pribadi", omzet: 100000000, kumulatif: 450000000 },
    esperado: { pph: 250000, dasar: 50000000, bebasBulanIni: 50000000, sisaBebas: 0 },
  },
  {
    nombre: "Orang pribadi masih di bawah Rp500 juta",
    origen: { tipo: "recalculado", detalle: "Kumulatif 100.000.000 + 80.000.000 masih di bawah 500.000.000: PPh 0, sisa bebas 320.000.000." },
    fecha: "2026-10-24",
    entrada: { wp: "orang-pribadi", omzet: 80000000, kumulatif: 100000000 },
    esperado: { pph: 0, sisaBebas: 320000000 },
  },
  {
    nombre: "Koperasi atau perseroan perorangan",
    origen: { tipo: "recalculado", detalle: "PP 20/2026 Pasal 56 ayat (2): 0,5% x 100.000.000 = 500.000, tanpa bagian bebas." },
    fecha: "2026-10-24",
    entrada: { wp: "badan", omzet: 100000000, kumulatif: null },
    esperado: { pph: 500000, dasar: 100000000 },
  },
]);
