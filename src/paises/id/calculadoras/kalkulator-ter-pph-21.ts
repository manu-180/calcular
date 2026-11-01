import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { kategoriTer, OPCIONES_STATUS, REQUIERE_TER, tarifTer } from "../lib/pajak";

export default definirCalculadora({
  id: "id.kalkulator-ter-pph-21",
  mercado: "id",
  concepto: "propio",
  slug: "kalkulator-ter-pph-21",
  estado: "publicado",
  requiere: { ...REQUIERE_TER },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Penghasilan bruto bulan ini", min: 0, porDefecto: 15500000, ayuda: "Semua yang diterima bulan itu: gaji, tunjangan, lembur, bonus atau THR, ditambah iuran JKK, JKM dan BPJS Kesehatan yang dibayar kantor." },
    { id: "status", tipo: "opcion", etiqueta: "Status PTKP awal tahun", opciones: OPCIONES_STATUS, porDefecto: "tk0" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bruto <= 0) throw new ErrorEntrada("Masukkan penghasilan bruto bulan ini.", "bruto");
    const tarif = tarifTer(entrada.status, entrada.bruto, v);
    const pph = redondear(porcentaje(entrada.bruto, tarif));
    return {
      pph,
      tarif,
      kategori: `Kategori ${kategoriTer(entrada.status)}`,
      setelahPajak: redondear(entrada.bruto - pph),
    };
  },
  resultado: [
    { clave: "pph", etiqueta: "PPh 21 dipotong bulan ini", formato: "moneda", destacada: true },
    { clave: "tarif", etiqueta: "Tarif efektif rata-rata (TER)", formato: "porcentaje", decimales: 2 },
    { clave: "kategori", etiqueta: "Kategori TER", formato: "texto" },
    { clave: "setelahPajak", etiqueta: "Penghasilan bruto setelah PPh 21", formato: "moneda" },
  ],
});
