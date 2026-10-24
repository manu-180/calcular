import { definirCalculadora, enMapa, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "id.upah-minimum-provinsi",
  mercado: "id",
  concepto: "salario-minimo",
  slug: "upah-minimum-provinsi",
  estado: "publicado",
  requiere: {
    "id.ump": "numero-por-region",
    "id.upah-sebulan-pengali-harian": "mapa",
    "id.lembur-pembagi": "numero",
  },
  campos: [
    { id: "provinsi", tipo: "region", etiqueta: "Provinsi", porDefecto: "dki-jakarta" },
    { id: "pola", tipo: "opcion-dato", etiqueta: "Pola hari kerja", dato: "id.upah-sebulan-pengali-harian", porDefecto: "5-hari" },
    { id: "gaji", tipo: "moneda", etiqueta: "Gaji Anda sebulan (opsional)", min: 0, requerido: false, ayuda: "Isi untuk membandingkan gaji Anda dengan UMP." },
  ],
  calcular(entrada, v, { redondear }) {
    const ump = porRegion(v["id.ump"], entrada.provinsi);
    const hari = enMapa(v["id.upah-sebulan-pengali-harian"], entrada.pola);
    const observaciones: string[] = [];
    let selisih: number | null = null;
    if (entrada.gaji !== null) {
      selisih = redondear(entrada.gaji - ump);
      if (selisih < 0) observaciones.push("Gaji Anda di bawah UMP provinsi ini.");
    }
    observaciones.push("Kabupaten dan kota juga bisa menetapkan upah minimum sendiri (UMK). Periksa UMK tempat Anda bekerja.");
    return {
      ump,
      harian: redondear(ump / hari),
      perJam: redondear(ump / v["id.lembur-pembagi"]),
      setahun: redondear(ump * 12),
      selisih,
      observaciones,
    };
  },
  resultado: [
    { clave: "ump", etiqueta: "UMP 2026 per bulan", formato: "moneda", destacada: true },
    { clave: "harian", etiqueta: "Setara upah sehari", formato: "moneda" },
    { clave: "perJam", etiqueta: "Setara upah sejam (1/173 upah sebulan)", formato: "moneda" },
    { clave: "setahun", etiqueta: "UMP setahun (12 bulan)", formato: "moneda" },
    { clave: "selisih", etiqueta: "Selisih gaji Anda dengan UMP", formato: "moneda" },
  ],
});
