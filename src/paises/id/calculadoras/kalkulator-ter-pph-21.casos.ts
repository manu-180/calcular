import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-ter-pph-21";

const PMK = "https://jdih.kemenkeu.go.id/api/download/e60a82e0-b218-40f5-9d18-b924aa1e11ce/2023pmkeuangan168.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Contoh Tuan B di PMK 168/2023 (TK/0, Rp15,5 juta)",
    origen: { tipo: "oficial", url: PMK, detalle: "Lampiran PMK 168/2023, contoh I.2.1.1: bruto 15.500.000, TER kategori A 7%, PPh 21 1.085.000." },
    fecha: "2026-10-24",
    entrada: { bruto: 15500000, status: "tk0" },
    esperado: { pph: 1085000, tarif: 7, kategori: "Kategori A" },
  },
  {
    nombre: "Contoh Tuan A di PMK 168/2023 (K/0, bulan dengan THR)",
    origen: { tipo: "oficial", url: PMK, detalle: "Lampiran PMK 168/2023, contoh I.1: bruto bulan Juni 50.080.000, TER kategori A 18%, PPh 21 9.014.400." },
    fecha: "2026-10-24",
    entrada: { bruto: 50080000, status: "k0" },
    esperado: { pph: 9014400, tarif: 18 },
  },
  {
    nombre: "Contoh Tuan A di PMK 168/2023 (bulan biasa)",
    origen: { tipo: "oficial", url: PMK, detalle: "Lampiran PMK 168/2023, contoh I.1: bruto 30.080.000, TER kategori A 13%, PPh 21 3.910.400." },
    fecha: "2026-10-24",
    entrada: { bruto: 30080000, status: "k0" },
    esperado: { pph: 3910400, tarif: 13 },
  },
  {
    nombre: "Batas atas baris TER kategori B",
    origen: { tipo: "recalculado", detalle: "Lampiran B PP 58/2023: sampai dengan 6.200.000 tarif 0%; di atasnya 0,25%. 6.200.000 x 0% = 0." },
    fecha: "2026-10-24",
    entrada: { bruto: 6200000, status: "k1" },
    esperado: { pph: 0, tarif: 0, kategori: "Kategori B" },
  },
  {
    nombre: "Kategori C (K/3)",
    origen: { tipo: "recalculado", detalle: "Lampiran C PP 58/2023: di atas 8.850.000 sampai 9.800.000 tarif 1,25%. 9.000.000 x 1,25% = 112.500." },
    fecha: "2026-10-24",
    entrada: { bruto: 9000000, status: "k3" },
    esperado: { pph: 112500, tarif: 1.25, kategori: "Kategori C" },
  },
]);
