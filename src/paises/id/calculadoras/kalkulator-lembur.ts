import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// PP 35/2021 Pasal 31: horas de cada escalón en un día de descanso o feriado, según la jornada.
const TRAMOS_LIBUR: Readonly<Record<string, readonly [number, number, number]>> = {
  "libur-6": [7, 1, 3],
  "libur-5": [8, 1, 3],
  "libur-pendek": [5, 1, 3],
};

export default definirCalculadora({
  id: "id.kalkulator-lembur",
  mercado: "id",
  concepto: "horas-extra",
  slug: "kalkulator-lembur",
  estado: "publicado",
  requiere: {
    "id.lembur-pembagi": "numero",
    "id.lembur-pengali": "mapa",
    "id.lembur-maks-hari": "numero",
    "id.lembur-maks-minggu": "numero",
    "id.upah-sebulan-pengali-harian": "mapa",
  },
  campos: [
    { id: "upah", tipo: "moneda", etiqueta: "Upah sebulan (gaji pokok + tunjangan tetap)", min: 0, porDefecto: 5190000 },
    {
      id: "hari",
      tipo: "opcion",
      etiqueta: "Kapan lembur dilakukan",
      opciones: [
        { valor: "kerja", etiqueta: "Hari kerja biasa" },
        { valor: "libur-6", etiqueta: "Hari libur atau istirahat mingguan (6 hari kerja seminggu)" },
        { valor: "libur-5", etiqueta: "Hari libur atau istirahat mingguan (5 hari kerja seminggu)" },
        { valor: "libur-pendek", etiqueta: "Hari libur resmi yang jatuh pada hari kerja terpendek (6 hari kerja)" },
      ],
      porDefecto: "kerja",
    },
    { id: "jam", tipo: "numero", etiqueta: "Jam lembur dalam sehari", min: 0, max: 24, porDefecto: 3 },
    { id: "kali", tipo: "entero", etiqueta: "Berapa hari lembur seperti ini dalam sebulan", min: 1, max: 31, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.upah <= 0) throw new ErrorEntrada("Masukkan upah sebulan.", "upah");
    if (entrada.jam <= 0) throw new ErrorEntrada("Masukkan jam lembur.", "jam");
    const p = v["id.lembur-pengali"];
    const sejam = entrada.upah / v["id.lembur-pembagi"];
    const observaciones: string[] = [];
    let jamTertimbang: number;
    if (entrada.hari === "kerja") {
      const pertama = Math.min(entrada.jam, 1);
      jamTertimbang = pertama * enMapa(p, "hari-kerja-jam-pertama") + (entrada.jam - pertama) * enMapa(p, "hari-kerja-jam-berikutnya");
      if (entrada.jam > v["id.lembur-maks-hari"]) observaciones.push(`Lembur di hari kerja paling lama ${v["id.lembur-maks-hari"]} jam sehari dan ${v["id.lembur-maks-minggu"]} jam seminggu.`);
    } else {
      const [a, b, c] = TRAMOS_LIBUR[entrada.hari];
      if (entrada.jam > a + b + c) throw new ErrorEntrada("Jam lembur melebihi tabel hari libur di PP 35/2021.", "jam");
      const j1 = Math.min(entrada.jam, a);
      const j2 = Math.min(Math.max(entrada.jam - a, 0), b);
      const j3 = Math.max(entrada.jam - a - b, 0);
      jamTertimbang = j1 * enMapa(p, "libur-awal") + j2 * enMapa(p, "libur-jam-berikut") + j3 * enMapa(p, "libur-akhir");
    }
    const perHari = redondear(sejam * jamTertimbang);
    return {
      total: perHari * entrada.kali,
      perHari,
      sejam: redondear(sejam),
      jamTertimbang,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Upah lembur sebulan", formato: "moneda", destacada: true },
    { clave: "perHari", etiqueta: "Upah lembur per hari", formato: "moneda" },
    { clave: "sejam", etiqueta: "Upah sejam (1/173 upah sebulan)", formato: "moneda" },
    { clave: "jamTertimbang", etiqueta: "Jam lembur setelah dikali pengali", formato: "numero", decimales: 2 },
  ],
});
