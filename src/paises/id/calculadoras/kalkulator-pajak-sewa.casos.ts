import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-pajak-sewa";

export default definirCasos(calculadora, [
  {
    nombre: "Contoh penjelasan PP 34/2017 (sewa dan service charge)",
    origen: {
      tipo: "oficial",
      url: "https://jdih.kemenkeu.go.id/api/download/fulltext/2017/34TAHUN2017PP.pdf",
      detalle: "Contoh di penjelasan PP 34/2017: 10% x (200.000.000 + 15.000.000) = 21.500.000.",
    },
    fecha: "2026-10-24",
    entrada: { sewa: 215000000, arah: "bruto" },
    esperado: { pph: 21500000, diterima: 193500000 },
  },
  {
    nombre: "Gross-up dari nilai bersih",
    origen: { tipo: "recalculado", detalle: "Bersih 54.000.000 / 0,9 = 60.000.000; PPh 6.000.000." },
    fecha: "2026-10-24",
    entrada: { sewa: 54000000, arah: "bersih" },
    esperado: { pph: 6000000, bruto: 60000000 },
  },
]);
