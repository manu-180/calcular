import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { biayaJabatanSetahun, bulatkanRibuan, OPCIONES_STATUS, pph17, ptkpSetahun, REQUIERE_PTKP } from "../lib/pajak";

export default definirCalculadora({
  id: "id.kalkulator-pph-21",
  mercado: "id",
  concepto: "impuesto-renta",
  slug: "kalkulator-pph-21",
  estado: "publicado",
  requiere: {
    ...REQUIERE_PTKP,
    "id.tarif-pasal-17": "escala",
    "id.biaya-jabatan-tarif": "numero",
    "id.biaya-jabatan-maks-tahun": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Penghasilan bruto setahun", min: 0, porDefecto: 150000000, ayuda: "Gaji, tunjangan, THR, bonus, lembur, ditambah iuran JKK, JKM dan BPJS Kesehatan yang dibayar kantor." },
    { id: "status", tipo: "opcion", etiqueta: "Status PTKP", opciones: OPCIONES_STATUS, porDefecto: "tk0" },
    { id: "iuran", tipo: "moneda", etiqueta: "Iuran JHT dan pensiun yang Anda bayar setahun", min: 0, porDefecto: 0 },
    { id: "zakat", tipo: "moneda", etiqueta: "Zakat atau sumbangan keagamaan wajib lewat kantor setahun", min: 0, porDefecto: 0 },
    { id: "dipotong", tipo: "moneda", etiqueta: "PPh 21 yang sudah dipotong Januari sampai November (opsional)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bruto <= 0) throw new ErrorEntrada("Masukkan penghasilan bruto setahun.", "bruto");
    const biayaJabatan = biayaJabatanSetahun(entrada.bruto, v["id.biaya-jabatan-tarif"], v["id.biaya-jabatan-maks-tahun"]);
    const neto = entrada.bruto - biayaJabatan - entrada.iuran - entrada.zakat;
    const ptkp = ptkpSetahun(entrada.status, v);
    const pkp = bulatkanRibuan(neto - ptkp);
    const pph = redondear(pph17(v["id.tarif-pasal-17"], pkp));
    const selisih = entrada.dipotong === null ? null : redondear(pph - entrada.dipotong);
    const observaciones: string[] = [];
    if (selisih !== null && selisih < 0) observaciones.push("Potongan Januari sampai November lebih besar dari pajak setahun. Kelebihannya dikembalikan pemberi kerja.");
    return {
      pph,
      selisih,
      biayaJabatan: redondear(biayaJabatan),
      neto: redondear(neto),
      ptkp,
      pkp,
      tarifEfektif: (pph / entrada.bruto) * 100,
      perBulan: redondear(pph / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "pph", etiqueta: "PPh 21 terutang setahun", formato: "moneda", destacada: true },
    { clave: "selisih", etiqueta: "PPh 21 yang dipotong di bulan Desember", formato: "moneda", ayuda: "Angka negatif berarti kelebihan potong yang dikembalikan." },
    { clave: "biayaJabatan", etiqueta: "Biaya jabatan", formato: "moneda" },
    { clave: "neto", etiqueta: "Penghasilan neto setahun", formato: "moneda" },
    { clave: "ptkp", etiqueta: "PTKP setahun", formato: "moneda" },
    { clave: "pkp", etiqueta: "Penghasilan kena pajak (dibulatkan ke ribuan)", formato: "moneda" },
    { clave: "tarifEfektif", etiqueta: "Tarif efektif dari penghasilan bruto", formato: "porcentaje", decimales: 2 },
    { clave: "perBulan", etiqueta: "Rata-rata PPh 21 per bulan", formato: "moneda" },
  ],
});
