import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "id.kalkulator-pajak-pesangon",
  mercado: "id",
  concepto: "propio",
  slug: "kalkulator-pajak-pesangon",
  estado: "publicado",
  requiere: {
    "id.tarif-pph-pesangon": "escala",
    "id.tarif-pph-jht-sekaligus": "escala",
  },
  campos: [
    {
      id: "jenis",
      tipo: "opcion",
      etiqueta: "Jenis pembayaran",
      opciones: [
        { valor: "pesangon", etiqueta: "Uang pesangon, uang penghargaan masa kerja dan uang penggantian hak" },
        { valor: "jht", etiqueta: "JHT, tunjangan hari tua atau manfaat pensiun yang dibayar sekaligus" },
      ],
      porDefecto: "pesangon",
    },
    { id: "jumlah", tipo: "moneda", etiqueta: "Jumlah bruto yang diterima", min: 0, porDefecto: 150000000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.jumlah <= 0) throw new ErrorEntrada("Masukkan jumlah bruto yang diterima.", "jumlah");
    const escala = entrada.jenis === "jht" ? v["id.tarif-pph-jht-sekaligus"] : v["id.tarif-pph-pesangon"];
    const pph = redondear(aplicarEscalaMarginal(escala, entrada.jumlah));
    return {
      pph,
      diterima: redondear(entrada.jumlah - pph),
      tarifEfektif: (pph / entrada.jumlah) * 100,
    };
  },
  resultado: [
    { clave: "pph", etiqueta: "PPh 21 final", formato: "moneda", destacada: true },
    { clave: "diterima", etiqueta: "Jumlah bersih yang diterima", formato: "moneda" },
    { clave: "tarifEfektif", etiqueta: "Tarif efektif", formato: "porcentaje", decimales: 2 },
  ],
});
