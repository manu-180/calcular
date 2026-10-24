import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "id.kalkulator-pajak-sewa",
  mercado: "id",
  concepto: "propio",
  slug: "kalkulator-pajak-sewa",
  estado: "publicado",
  requiere: { "id.pph-sewa": "numero" },
  campos: [
    { id: "sewa", tipo: "moneda", etiqueta: "Nilai sewa bruto", min: 0, porDefecto: 60000000, ayuda: "Termasuk biaya layanan, perawatan atau fasilitas yang dibayar terkait sewa." },
    {
      id: "arah",
      tipo: "opcion",
      etiqueta: "Nilai yang Anda punya",
      opciones: [
        { valor: "bruto", etiqueta: "Nilai sewa sebelum dipotong pajak" },
        { valor: "bersih", etiqueta: "Nilai bersih yang ingin diterima pemilik" },
      ],
      porDefecto: "bruto",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.sewa <= 0) throw new ErrorEntrada("Masukkan nilai sewa.", "sewa");
    const tarif = v["id.pph-sewa"];
    const bruto = entrada.arah === "bruto" ? entrada.sewa : entrada.sewa / (1 - tarif / 100);
    const pph = redondear(porcentaje(bruto, tarif));
    return {
      pph,
      bruto: redondear(bruto),
      diterima: redondear(bruto - pph),
    };
  },
  resultado: [
    { clave: "pph", etiqueta: "PPh final sewa", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Nilai sewa bruto", formato: "moneda" },
    { clave: "diterima", etiqueta: "Diterima pemilik setelah PPh", formato: "moneda" },
  ],
});
