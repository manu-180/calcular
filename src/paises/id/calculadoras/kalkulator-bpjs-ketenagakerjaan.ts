import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { iuranBpjs, REQUIERE_BPJS } from "../lib/bpjs";

export default definirCalculadora({
  id: "id.kalkulator-bpjs-ketenagakerjaan",
  mercado: "id",
  concepto: "aportes-seguridad-social",
  slug: "kalkulator-bpjs-ketenagakerjaan",
  estado: "publicado",
  requiere: { ...REQUIERE_BPJS },
  campos: [
    { id: "upah", tipo: "moneda", etiqueta: "Upah sebulan (gaji pokok + tunjangan tetap)", min: 0, porDefecto: 10000000 },
    { id: "risiko", tipo: "opcion-dato", etiqueta: "Tingkat risiko JKK", dato: "id.jkk", porDefecto: "sangat-rendah" },
    { id: "jp", tipo: "si-no", etiqueta: "Ikut Jaminan Pensiun (JP)", porDefecto: true },
    { id: "batasJp", tipo: "moneda", etiqueta: "Batas upah JP (opsional)", min: 0, requerido: false, visibleSi: { jp: [true] }, ayuda: "Batas upah JP diumumkan BPJS Ketenagakerjaan setiap Maret. Isi jika upah Anda di atas batas itu." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.upah <= 0) throw new ErrorEntrada("Masukkan upah sebulan.", "upah");
    const b = iuranBpjs({ upah: entrada.upah, risiko: entrada.risiko, jp: entrada.jp, batasJp: entrada.batasJp, kesehatan: false }, v, redondear);
    const pekerja = b.jhtPekerja + b.jpPekerja;
    const pemberi = b.jhtPemberi + b.jpPemberi + b.jkk + b.jkm;
    return {
      pekerja,
      pemberi,
      total: pekerja + pemberi,
      jhtPekerja: b.jhtPekerja,
      jpPekerja: b.jpPekerja,
      jhtPemberi: b.jhtPemberi,
      jpPemberi: b.jpPemberi,
      jkk: b.jkk,
      jkm: b.jkm,
      tahunanJht: 12 * (b.jhtPekerja + b.jhtPemberi),
    };
  },
  resultado: [
    { clave: "pekerja", etiqueta: "Dipotong dari gaji Anda per bulan", formato: "moneda", destacada: true },
    { clave: "pemberi", etiqueta: "Dibayar pemberi kerja per bulan", formato: "moneda" },
    { clave: "total", etiqueta: "Total iuran per bulan", formato: "moneda" },
    { clave: "jhtPekerja", etiqueta: "JHT bagian Anda", formato: "moneda" },
    { clave: "jpPekerja", etiqueta: "JP bagian Anda", formato: "moneda", ocultarSiCero: true },
    { clave: "jhtPemberi", etiqueta: "JHT bagian pemberi kerja", formato: "moneda" },
    { clave: "jpPemberi", etiqueta: "JP bagian pemberi kerja", formato: "moneda", ocultarSiCero: true },
    { clave: "jkk", etiqueta: "Jaminan Kecelakaan Kerja (JKK)", formato: "moneda" },
    { clave: "jkm", etiqueta: "Jaminan Kematian (JKM)", formato: "moneda" },
    { clave: "tahunanJht", etiqueta: "Tambahan saldo JHT setahun (tanpa hasil pengembangan)", formato: "moneda" },
  ],
});
