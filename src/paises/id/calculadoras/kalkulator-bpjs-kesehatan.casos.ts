import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-bpjs-kesehatan";

export default definirCasos(calculadora, [
  {
    nombre: "Pekerja dengan gaji Rp8 juta",
    origen: { tipo: "recalculado", detalle: "Perpres 64/2020 Pasal 30: 1% x 8.000.000 = 80.000 pekerja; 4% = 320.000 pemberi kerja; total 400.000." },
    fecha: "2026-10-24",
    entrada: { jenis: "ppu", gaji: 8000000, kelas: null, anggota: null },
    esperado: { anda: 80000, pemberi: 320000, total: 400000, dasar: 8000000 },
  },
  {
    nombre: "Pekerja dengan gaji di atas batas upah",
    origen: { tipo: "recalculado", detalle: "Gaji 15.000.000 dibatasi 12.000.000 (Pasal 32): 1% = 120.000 dan 4% = 480.000." },
    fecha: "2026-10-24",
    entrada: { jenis: "ppu", gaji: 15000000, kelas: null, anggota: null },
    esperado: { anda: 120000, pemberi: 480000, dasar: 12000000 },
  },
  {
    nombre: "Mandiri kelas I, tiga orang",
    origen: { tipo: "recalculado", detalle: "Perpres 64/2020 Pasal 34 ayat (3): 150.000 x 3 = 450.000." },
    fecha: "2026-10-24",
    entrada: { jenis: "mandiri", gaji: null, kelas: "kelas-1", anggota: 3 },
    esperado: { anda: 450000, setahun: 5400000 },
  },
  {
    nombre: "Mandiri kelas III, dua orang",
    origen: { tipo: "recalculado", detalle: "Pasal 34 ayat (1) huruf b: peserta 35.000 x 2 = 70.000; bantuan pemerintah 7.000 x 2 = 14.000." },
    fecha: "2026-10-24",
    entrada: { jenis: "mandiri", gaji: null, kelas: "kelas-3", anggota: 2 },
    esperado: { anda: 70000, bantuan: 14000 },
  },
]);
