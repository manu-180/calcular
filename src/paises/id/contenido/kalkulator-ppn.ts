import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-ppn",
  h1: "Kalkulator PPN {{id.ppn-tarif}}",
  title: "Kalkulator PPN {{id.ppn-tarif}} {{anio}}: DPP nilai lain dan barang mewah",
  description: "Tambahkan atau pisahkan PPN dari harga. Barang dan jasa umum memakai DPP nilai lain {{id.ppn-dpp-pembilang}}/{{id.ppn-dpp-penyebut}}, barang mewah memakai harga jual. Sesuai PMK 131/2024.",
  intro: [
    "Tarif PPN sejak {{id.ppn-tarif#desde}} adalah {{id.ppn-tarif}}, tetapi untuk sebagian besar barang dan jasa dasar pengenaannya hanya {{id.ppn-dpp-pembilang}}/{{id.ppn-dpp-penyebut}} dari harga jual. Kolom tarif efektif di hasil menunjukkan beban PPN yang sebenarnya.",
    "Untuk barang mewah yang dikenai PPnBM, tarif {{id.ppn-tarif}} dikalikan langsung ke harga jual.",
  ],
  comoSeCalcula: [
    "Barang dan jasa umum: DPP nilai lain = {{id.ppn-dpp-pembilang}}/{{id.ppn-dpp-penyebut}} x harga jual, lalu PPN = {{id.ppn-tarif}} x DPP.",
    "Barang mewah: PPN = {{id.ppn-tarif}} x harga jual.",
    "Untuk memisahkan PPN dari harga yang sudah termasuk pajak, harga dibagi 1 ditambah tarif efektif.",
  ],
  ejemplo: ["Barang umum seharga Rp1.000.000: DPP Rp916.667, PPN Rp110.000, harga termasuk PPN Rp1.110.000."],
  faq: [
    {
      pregunta: "Berapa tarif PPN yang sebenarnya dibayar?",
      respuesta: "Tarifnya {{id.ppn-tarif}}. Untuk barang dan jasa selain barang mewah, DPP-nya {{id.ppn-dpp-pembilang}}/{{id.ppn-dpp-penyebut}} dari harga jual, jadi bebannya lebih rendah dari tarif. Kalkulator menampilkan tarif efektif itu.",
    },
    {
      pregunta: "Apa itu DPP nilai lain?",
      respuesta: "Dasar pengenaan pajak yang bukan harga jual penuh. PMK 131/2024 menetapkan nilai lain sebesar {{id.ppn-dpp-pembilang}}/{{id.ppn-dpp-penyebut}} dari harga jual, penggantian atau nilai impor.",
    },
    {
      pregunta: "Barang apa yang memakai harga jual penuh?",
      respuesta: "Barang mewah berupa kendaraan bermotor dan barang lain yang dikenai pajak penjualan atas barang mewah (PPnBM).",
    },
  ],
  glosario: [
    { termino: "PPN", definicion: "Pajak pertambahan nilai atas penyerahan barang dan jasa kena pajak." },
    { termino: "DPP", definicion: "Dasar pengenaan pajak, angka yang dikalikan dengan tarif PPN." },
    { termino: "PPnBM", definicion: "Pajak penjualan atas barang mewah." },
  ],
});
