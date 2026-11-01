import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { iuranBpjs, REQUIERE_BPJS } from "../lib/bpjs";

export default definirCalculadora({
  id: "id.kalkulator-biaya-karyawan",
  mercado: "id",
  concepto: "costo-empleador",
  slug: "kalkulator-biaya-karyawan",
  estado: "publicado",
  requiere: { ...REQUIERE_BPJS, "id.thr-masa-kerja-penuh": "numero" },
  campos: [
    { id: "gaji", tipo: "moneda", etiqueta: "Gaji bruto per bulan (gaji pokok + tunjangan tetap)", min: 0, porDefecto: 10000000 },
    { id: "risiko", tipo: "opcion-dato", etiqueta: "Tingkat risiko JKK", dato: "id.jkk", porDefecto: "sangat-rendah" },
    { id: "jp", tipo: "si-no", etiqueta: "Ikut Jaminan Pensiun (JP)", porDefecto: true },
    { id: "batasJp", tipo: "moneda", etiqueta: "Batas upah JP (opsional)", min: 0, requerido: false, visibleSi: { jp: [true] }, ayuda: "Isi jika gaji di atas batas upah JP yang diumumkan BPJS Ketenagakerjaan." },
    { id: "kesehatan", tipo: "si-no", etiqueta: "Didaftarkan ke BPJS Kesehatan", porDefecto: true },
    { id: "thr", tipo: "si-no", etiqueta: "Sisihkan THR setiap bulan", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.gaji <= 0) throw new ErrorEntrada("Masukkan gaji bruto per bulan.", "gaji");
    const b = iuranBpjs({ upah: entrada.gaji, risiko: entrada.risiko, jp: entrada.jp, batasJp: entrada.batasJp, kesehatan: entrada.kesehatan }, v, redondear);
    const bpjsTk = b.jhtPemberi + b.jpPemberi + b.jkk + b.jkm;
    const thr = entrada.thr ? redondear(entrada.gaji / v["id.thr-masa-kerja-penuh"]) : 0;
    const total = entrada.gaji + bpjsTk + b.kesPemberi + thr;
    return {
      total,
      bpjsTk,
      kes: b.kesPemberi,
      thr,
      setahun: total * 12,
      tambahan: ((total - entrada.gaji) / entrada.gaji) * 100,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Biaya karyawan per bulan", formato: "moneda", destacada: true },
    { clave: "bpjsTk", etiqueta: "BPJS Ketenagakerjaan bagian perusahaan", formato: "moneda" },
    { clave: "kes", etiqueta: "BPJS Kesehatan bagian perusahaan", formato: "moneda", ocultarSiCero: true },
    { clave: "thr", etiqueta: "Cadangan THR per bulan", formato: "moneda", ocultarSiCero: true },
    { clave: "setahun", etiqueta: "Biaya karyawan setahun", formato: "moneda" },
    { clave: "tambahan", etiqueta: "Tambahan di atas gaji", formato: "porcentaje", decimales: 1 },
  ],
});
