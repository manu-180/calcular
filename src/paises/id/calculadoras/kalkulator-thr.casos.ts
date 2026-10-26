import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-thr";

const PERMENAKER = "https://jdih.kemnaker.go.id/asset/data_puu/permenaker_6_2016.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Masa kerja 7 bulan",
    origen: { tipo: "oficial", url: PERMENAKER, detalle: "Permenaker 6/2016 Pasal 3 ayat (1) huruf b: masa kerja / 12 x 1 bulan upah = 7/12 x 6.000.000 = 3.500.000." },
    fecha: "2026-10-24",
    entrada: { upah: 6000000, masaKerja: 7 },
    esperado: { thr: 3500000, bulanDihitung: 7 },
  },
  {
    nombre: "Masa kerja lebih dari 12 bulan",
    origen: { tipo: "oficial", url: PERMENAKER, detalle: "Pasal 3 ayat (1) huruf a: 12 bulan atau lebih, 1 bulan upah." },
    fecha: "2026-10-24",
    entrada: { upah: 6000000, masaKerja: 40 },
    esperado: { thr: 6000000, bagian: 100, bulanDihitung: 12 },
  },
  {
    nombre: "Belum 1 bulan",
    origen: { tipo: "oficial", url: PERMENAKER, detalle: "Pasal 2 ayat (1): THR wajib untuk masa kerja 1 bulan terus-menerus atau lebih." },
    fecha: "2026-10-24",
    entrada: { upah: 6000000, masaKerja: 0 },
    esperado: { thr: 0 },
  },
]);
