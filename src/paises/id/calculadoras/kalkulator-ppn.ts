import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "id.kalkulator-ppn",
  mercado: "id",
  concepto: "iva",
  slug: "kalkulator-ppn",
  estado: "publicado",
  requiere: {
    "id.ppn-tarif": "numero",
    "id.ppn-dpp-pembilang": "numero",
    "id.ppn-dpp-penyebut": "numero",
  },
  campos: [
    {
      id: "arah",
      tipo: "opcion",
      etiqueta: "Harga yang Anda punya",
      opciones: [
        { valor: "tambah", etiqueta: "Harga sebelum PPN (tambahkan PPN)" },
        { valor: "keluarkan", etiqueta: "Harga sudah termasuk PPN (pisahkan PPN)" },
      ],
      porDefecto: "tambah",
    },
    { id: "harga", tipo: "moneda", etiqueta: "Harga", min: 0, porDefecto: 1000000 },
    {
      id: "jenis",
      tipo: "opcion",
      etiqueta: "Jenis barang atau jasa",
      opciones: [
        { valor: "umum", etiqueta: "Barang dan jasa umum (DPP nilai lain 11/12)" },
        { valor: "mewah", etiqueta: "Barang mewah yang kena PPnBM (DPP harga jual)" },
      ],
      porDefecto: "umum",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.harga <= 0) throw new ErrorEntrada("Masukkan harga.", "harga");
    const faktor = entrada.jenis === "umum" ? v["id.ppn-dpp-pembilang"] / v["id.ppn-dpp-penyebut"] : 1;
    const efektif = v["id.ppn-tarif"] * faktor;
    const hargaJual = entrada.arah === "tambah" ? entrada.harga : entrada.harga / (1 + efektif / 100);
    const dpp = hargaJual * faktor;
    const ppn = redondear(porcentaje(dpp, v["id.ppn-tarif"]));
    const dasar = entrada.arah === "tambah" ? entrada.harga : redondear(entrada.harga - ppn);
    return {
      ppn,
      hargaSebelum: dasar,
      total: entrada.arah === "tambah" ? redondear(entrada.harga + ppn) : entrada.harga,
      dpp: redondear(dpp),
      efektif,
    };
  },
  resultado: [
    { clave: "ppn", etiqueta: "PPN", formato: "moneda", destacada: true },
    { clave: "hargaSebelum", etiqueta: "Harga sebelum PPN", formato: "moneda" },
    { clave: "total", etiqueta: "Harga termasuk PPN", formato: "moneda" },
    { clave: "dpp", etiqueta: "Dasar pengenaan pajak (DPP)", formato: "moneda" },
    { clave: "efektif", etiqueta: "Tarif efektif dari harga jual", formato: "porcentaje", decimales: 2 },
  ],
});
