import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-cuti-tahunan";

export default definirCasos(calculadora, [
  {
    nombre: "18 bulan, sudah ambil 4 hari, 6 hari kerja",
    origen: { tipo: "recalculado", detalle: "UU 6/2023 (Pasal 79 UU Ketenagakerjaan): 12 hari setelah 12 bulan. Sisa 8 hari. Upah sehari 6.300.000 / 25 = 252.000; 8 x 252.000 = 2.016.000." },
    fecha: "2026-10-24",
    entrada: { masaKerja: 18, terpakai: 4, upah: 6300000, pola: "6-hari" },
    esperado: { sisa: 8, hak: 12, upahSehari: 252000, uangPengganti: 2016000 },
  },
  {
    nombre: "Belum 12 bulan",
    origen: { tipo: "recalculado", detalle: "Masa kerja 11 bulan: belum berhak cuti tahunan." },
    fecha: "2026-10-24",
    entrada: { masaKerja: 11, terpakai: 0, upah: 6300000, pola: "5-hari" },
    esperado: { sisa: 0, hak: 0, upahSehari: 300000 },
  },
]);
