import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "id.kalkulator-cuti-tahunan",
  mercado: "id",
  concepto: "vacaciones",
  slug: "kalkulator-cuti-tahunan",
  estado: "publicado",
  requiere: {
    "id.cuti-tahunan": "numero",
    "id.cuti-tahunan-masa-kerja": "numero",
    "id.upah-sebulan-pengali-harian": "mapa",
  },
  campos: [
    { id: "masaKerja", tipo: "entero", etiqueta: "Masa kerja terus-menerus (bulan)", min: 0, max: 600, porDefecto: 18 },
    { id: "terpakai", tipo: "entero", etiqueta: "Cuti tahunan yang sudah diambil periode ini (hari)", min: 0, max: 365, porDefecto: 4 },
    { id: "upah", tipo: "moneda", etiqueta: "Upah sebulan (gaji pokok + tunjangan tetap)", min: 0, porDefecto: 6300000 },
    { id: "pola", tipo: "opcion-dato", etiqueta: "Pola hari kerja", dato: "id.upah-sebulan-pengali-harian", porDefecto: "6-hari" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.upah <= 0) throw new ErrorEntrada("Masukkan upah sebulan.", "upah");
    const berhak = entrada.masaKerja >= v["id.cuti-tahunan-masa-kerja"];
    const hak = berhak ? v["id.cuti-tahunan"] : 0;
    const sisa = Math.max(0, hak - entrada.terpakai);
    const upahSehari = entrada.upah / enMapa(v["id.upah-sebulan-pengali-harian"], entrada.pola);
    const observaciones: string[] = [];
    if (!berhak) observaciones.push("Hak cuti tahunan muncul setelah bekerja 12 bulan terus-menerus.");
    if (entrada.terpakai > hak) observaciones.push("Cuti yang diambil melebihi hak minimal. Perusahaan bisa memberi cuti lebih banyak lewat perjanjian kerja atau peraturan perusahaan.");
    return {
      sisa,
      hak,
      upahSehari: redondear(upahSehari),
      uangPengganti: redondear(sisa * upahSehari),
      observaciones,
    };
  },
  resultado: [
    { clave: "sisa", etiqueta: "Sisa cuti tahunan", formato: "dias", destacada: true },
    { clave: "hak", etiqueta: "Hak cuti tahunan minimal", formato: "dias" },
    { clave: "upahSehari", etiqueta: "Upah sehari", formato: "moneda" },
    { clave: "uangPengganti", etiqueta: "Uang pengganti sisa cuti jika terjadi PHK", formato: "moneda" },
  ],
});
