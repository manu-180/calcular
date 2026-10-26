import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-lembur";

export default definirCasos(calculadora, [
  {
    nombre: "3 jam di hari kerja",
    origen: { tipo: "recalculado", detalle: "PP 35/2021 Pasal 31 ayat (1) dan Pasal 32: sejam 5.190.000 / 173 = 30.000. 1 x 1,5 x 30.000 + 2 x 2 x 30.000 = 165.000." },
    fecha: "2026-10-24",
    entrada: { upah: 5190000, hari: "kerja", jam: 3, kali: 1 },
    esperado: { total: 165000, sejam: 30000, jamTertimbang: 5.5 },
  },
  {
    nombre: "9 jam di hari libur, 6 hari kerja",
    origen: { tipo: "recalculado", detalle: "Pasal 31 ayat (2) huruf a: 7 x 2 + 1 x 3 + 1 x 4 = 21 jam tertimbang x 30.000 = 630.000." },
    fecha: "2026-10-24",
    entrada: { upah: 5190000, hari: "libur-6", jam: 9, kali: 1 },
    esperado: { perHari: 630000, jamTertimbang: 21 },
  },
  {
    nombre: "10 jam di hari libur, 5 hari kerja, dua kali sebulan",
    origen: { tipo: "recalculado", detalle: "Pasal 31 ayat (3): 8 x 2 + 1 x 3 + 1 x 4 = 23 x 30.000 = 690.000 per hari; dua hari 1.380.000." },
    fecha: "2026-10-24",
    entrada: { upah: 5190000, hari: "libur-5", jam: 10, kali: 2 },
    esperado: { total: 1380000, perHari: 690000 },
  },
  {
    nombre: "Hari libur pada hari kerja terpendek",
    origen: { tipo: "recalculado", detalle: "Pasal 31 ayat (2) huruf b: 5 x 2 + 1 x 3 = 13 x 30.000 = 390.000." },
    fecha: "2026-10-24",
    entrada: { upah: 5190000, hari: "libur-pendek", jam: 6, kali: 1 },
    esperado: { perHari: 390000 },
  },
  {
    nombre: "Jam melebihi tabel hari libur",
    origen: { tipo: "recalculado", detalle: "Tabel 6 hari kerja hanya sampai jam kesebelas." },
    fecha: "2026-10-24",
    entrada: { upah: 5190000, hari: "libur-6", jam: 12, kali: 1 },
    esperaError: true,
  },
]);
