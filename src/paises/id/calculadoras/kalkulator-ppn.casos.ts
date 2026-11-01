import { definirCasos } from "@/motor/calculo";
import calculadora from "./kalkulator-ppn";

export default definirCasos(calculadora, [
  {
    nombre: "Barang umum Rp1 juta, tambah PPN",
    origen: { tipo: "recalculado", detalle: "PMK 131/2024 Pasal 3: DPP 11/12 x 1.000.000 = 916.666,67; PPN 12% = 110.000; total 1.110.000." },
    fecha: "2026-10-24",
    entrada: { arah: "tambah", harga: 1000000, jenis: "umum" },
    esperado: { ppn: 110000, total: 1110000, dpp: 916667, efektif: 11 },
  },
  {
    nombre: "Barang mewah Rp1 juta",
    origen: { tipo: "recalculado", detalle: "PMK 131/2024 Pasal 2: PPN 12% x harga jual 1.000.000 = 120.000." },
    fecha: "2026-10-24",
    entrada: { arah: "tambah", harga: 1000000, jenis: "mewah" },
    esperado: { ppn: 120000, total: 1120000, efektif: 12 },
  },
  {
    nombre: "Pisahkan PPN dari harga Rp1.110.000",
    origen: { tipo: "recalculado", detalle: "1.110.000 / 1,11 = 1.000.000; PPN 110.000." },
    fecha: "2026-10-24",
    entrada: { arah: "keluarkan", harga: 1110000, jenis: "umum" },
    esperado: { ppn: 110000, hargaSebelum: 1000000 },
  },
]);
