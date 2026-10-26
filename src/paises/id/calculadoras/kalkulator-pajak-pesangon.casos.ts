import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-pajak-pesangon";

export default definirCasos(calculadora, [
  {
    nombre: "Pesangon Rp150 juta",
    origen: { tipo: "recalculado", detalle: "PP 68/2009 Pasal 4: 0% x 50.000.000 + 5% x 50.000.000 + 15% x 50.000.000 = 2.500.000 + 7.500.000 = 10.000.000." },
    fecha: "2026-10-24",
    entrada: { jenis: "pesangon", jumlah: 150000000 },
    esperado: { pph: 10000000, diterima: 140000000 },
  },
  {
    nombre: "Pesangon di atas Rp500 juta",
    origen: { tipo: "recalculado", detalle: "0 + 2.500.000 + 15% x 400.000.000 = 60.000.000 + 25% x 100.000.000 = 25.000.000. Total 87.500.000." },
    fecha: "2026-10-24",
    entrada: { jenis: "pesangon", jumlah: 600000000 },
    esperado: { pph: 87500000 },
  },
  {
    nombre: "JHT sekaligus Rp80 juta",
    origen: { tipo: "recalculado", detalle: "PP 68/2009 Pasal 5: 0% x 50.000.000 + 5% x 30.000.000 = 1.500.000." },
    fecha: "2026-10-24",
    entrada: { jenis: "jht", jumlah: 80000000 },
    esperado: { pph: 1500000, diterima: 78500000 },
  },
  {
    nombre: "Pesangon sampai Rp50 juta tidak dipotong",
    origen: { tipo: "recalculado", detalle: "Lapisan pertama sampai 50.000.000 bertarif 0%." },
    fecha: "2026-10-24",
    entrada: { jenis: "pesangon", jumlah: 50000000 },
    esperado: { pph: 0 },
  },
]);
