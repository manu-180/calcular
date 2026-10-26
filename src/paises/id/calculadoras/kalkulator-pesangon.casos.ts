import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-pesangon";

export default definirCasos(calculadora, [
  {
    nombre: "Efisiensi untuk mencegah kerugian, 5 tahun",
    origen: {
      tipo: "recalculado",
      detalle: "PP 35/2021 Pasal 43 ayat (2): 1 x pesangon + 1 x UPMK. Masa kerja 5 tahun: pesangon 6 bulan = 48.000.000; UPMK 3 sampai 6 tahun 2 bulan = 16.000.000. Total 64.000.000. PPh final 5% x 14.000.000 = 700.000.",
    },
    fecha: "2026-10-24",
    entrada: { upah: 8000000, tahun: 5, alasan: "efisiensi-mencegah-rugi", penggantianHak: 0 },
    esperado: { total: 64000000, pesangon: 48000000, penghargaan: 16000000, pph: 700000 },
  },
  {
    nombre: "Efisiensi karena rugi, 5 tahun",
    origen: { tipo: "recalculado", detalle: "Pasal 43 ayat (1): 0,5 x pesangon = 24.000.000 + 1 x UPMK 16.000.000 = 40.000.000." },
    fecha: "2026-10-24",
    entrada: { upah: 8000000, tahun: 5, alasan: "efisiensi-rugi", penggantianHak: 0 },
    esperado: { total: 40000000, pesangon: 24000000, bulanPesangon: 3, pph: 0 },
  },
  {
    nombre: "Pensiun setelah 25 tahun",
    origen: {
      tipo: "recalculado",
      detalle: "Pasal 56: 1,75 x 9 bulan x 10.000.000 = 157.500.000; UPMK 24 tahun atau lebih 10 bulan = 100.000.000. Total 257.500.000. PPh 2.500.000 + 15% x 157.500.000 = 26.125.000.",
    },
    fecha: "2026-10-24",
    entrada: { upah: 10000000, tahun: 25, alasan: "pensiun", penggantianHak: 0 },
    esperado: { total: 257500000, pesangon: 157500000, penghargaan: 100000000, pph: 26125000 },
  },
  {
    nombre: "Masa kerja kurang dari 1 tahun dengan uang penggantian hak",
    origen: { tipo: "recalculado", detalle: "Pasal 40 ayat (2) huruf a: 1 bulan upah 6.000.000; belum ada UPMK; ditambah penggantian hak 500.000." },
    fecha: "2026-10-24",
    entrada: { upah: 6000000, tahun: 0, alasan: "tutup-bukan-rugi", penggantianHak: 500000 },
    esperado: { total: 6500000, pesangon: 6000000, penghargaan: 0 },
  },
  {
    nombre: "Mengundurkan diri",
    origen: { tipo: "recalculado", detalle: "Pasal 50: hanya uang penggantian hak dan uang pisah; tanpa pesangon dan UPMK." },
    fecha: "2026-10-24",
    entrada: { upah: 6000000, tahun: 10, alasan: "mengundurkan-diri", penggantianHak: 1000000 },
    esperado: { total: 1000000, pesangon: 0, penghargaan: 0 },
  },
]);
