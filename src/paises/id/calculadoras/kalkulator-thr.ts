import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "id.kalkulator-thr",
  mercado: "id",
  concepto: "bono-semestral",
  slug: "kalkulator-thr",
  estado: "publicado",
  requiere: {
    "id.thr-masa-kerja-penuh": "numero",
    "id.thr-masa-kerja-minimal": "numero",
  },
  campos: [
    { id: "upah", tipo: "moneda", etiqueta: "Upah sebulan (gaji pokok + tunjangan tetap)", min: 0, porDefecto: 6000000, ayuda: "Untuk pekerja harian lepas, isi rata-rata upah sebulan." },
    { id: "masaKerja", tipo: "entero", etiqueta: "Masa kerja sampai hari raya (bulan penuh)", min: 0, max: 600, porDefecto: 7 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.upah <= 0) throw new ErrorEntrada("Masukkan upah sebulan.", "upah");
    const penuh = v["id.thr-masa-kerja-penuh"];
    const minimal = v["id.thr-masa-kerja-minimal"];
    const observaciones: string[] = [];
    let bagian = 0;
    if (entrada.masaKerja < minimal) observaciones.push("Masa kerja di bawah 1 bulan belum berhak THR.");
    else bagian = Math.min(entrada.masaKerja, penuh) / penuh;
    if (entrada.masaKerja >= minimal && entrada.masaKerja < penuh) observaciones.push("Masa kerja di bawah 12 bulan mendapat THR proporsional.");
    return {
      thr: redondear(entrada.upah * bagian),
      bagian: bagian * 100,
      bulanDihitung: Math.min(entrada.masaKerja, penuh),
      observaciones,
    };
  },
  resultado: [
    { clave: "thr", etiqueta: "THR yang Anda terima", formato: "moneda", destacada: true },
    { clave: "bagian", etiqueta: "Bagian dari satu bulan upah", formato: "porcentaje", decimales: 1 },
    { clave: "bulanDihitung", etiqueta: "Masa kerja yang dihitung", formato: "meses" },
  ],
});
