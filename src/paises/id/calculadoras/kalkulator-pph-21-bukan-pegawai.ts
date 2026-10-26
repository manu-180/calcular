import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { pph17 } from "../lib/pajak";

export default definirCalculadora({
  id: "id.kalkulator-pph-21-bukan-pegawai",
  mercado: "id",
  concepto: "retencion-honorarios",
  slug: "kalkulator-pph-21-bukan-pegawai",
  estado: "publicado",
  requiere: {
    "id.tarif-pasal-17": "escala",
    "id.dpp-bukan-pegawai": "numero",
  },
  campos: [
    { id: "imbalan", tipo: "moneda", etiqueta: "Imbalan bruto yang dibayar", min: 0, porDefecto: 10000000 },
    { id: "pengurang", tipo: "moneda", etiqueta: "Upah tenaga kerja, material atau jasa pihak ketiga yang ditagihkan terpisah", min: 0, porDefecto: 0, ayuda: "Hanya jika tercantum di kontrak dan ada bukti tagihan atau faktur." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.imbalan <= 0) throw new ErrorEntrada("Masukkan imbalan bruto.", "imbalan");
    if (entrada.pengurang >= entrada.imbalan) throw new ErrorEntrada("Pengurang harus lebih kecil dari imbalan bruto.", "pengurang");
    const bruto = entrada.imbalan - entrada.pengurang;
    const dasar = redondear(porcentaje(bruto, v["id.dpp-bukan-pegawai"]));
    const pph = redondear(pph17(v["id.tarif-pasal-17"], dasar));
    return {
      pph,
      dasar,
      bruto,
      diterima: redondear(entrada.imbalan - pph),
      tarifEfektif: (pph / entrada.imbalan) * 100,
    };
  },
  resultado: [
    { clave: "pph", etiqueta: "PPh 21 dipotong", formato: "moneda", destacada: true },
    { clave: "dasar", etiqueta: "Dasar pemotongan", formato: "moneda" },
    { clave: "bruto", etiqueta: "Penghasilan bruto untuk pajak", formato: "moneda" },
    { clave: "diterima", etiqueta: "Yang Anda terima setelah PPh 21", formato: "moneda" },
    { clave: "tarifEfektif", etiqueta: "Tarif efektif dari imbalan", formato: "porcentaje", decimales: 2 },
  ],
});
