import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "id.kalkulator-pbb",
  mercado: "id",
  concepto: "propio",
  slug: "kalkulator-pbb",
  estado: "publicado",
  requiere: {
    "id.pbb-tarif-maks": "numero",
    "id.njoptkp-minimal": "numero",
    "id.pbb-persen-njop-min": "numero",
    "id.pbb-persen-njop-maks": "numero",
  },
  campos: [
    { id: "njopBumi", tipo: "moneda", etiqueta: "NJOP bumi (tanah)", min: 0, porDefecto: 300000000 },
    { id: "njopBangunan", tipo: "moneda", etiqueta: "NJOP bangunan", min: 0, porDefecto: 200000000 },
    { id: "njoptkp", tipo: "moneda", etiqueta: "NJOPTKP daerah Anda (opsional)", min: 0, requerido: false, ayuda: "Jika kosong, dipakai batas paling rendah undang-undang." },
    { id: "persen", tipo: "porcentaje", etiqueta: "Persentase NJOP yang dipakai daerah (opsional)", min: 0, max: 100, requerido: false, ayuda: "Sesuai Perda daerah Anda. Jika kosong, dipakai seluruh NJOP." },
    { id: "tarif", tipo: "porcentaje", etiqueta: "Tarif PBB daerah Anda (opsional)", min: 0, max: 100, requerido: false, ayuda: "Lihat di SPPT atau Perda. Jika kosong, dipakai tarif paling tinggi." },
  ],
  calcular(entrada, v, { redondear }) {
    const njop = entrada.njopBumi + entrada.njopBangunan;
    if (njop <= 0) throw new ErrorEntrada("Masukkan NJOP bumi atau bangunan.", "njopBumi");
    const persen = entrada.persen ?? v["id.pbb-persen-njop-maks"];
    if (persen < v["id.pbb-persen-njop-min"] || persen > v["id.pbb-persen-njop-maks"]) throw new ErrorEntrada(`Persentase NJOP harus antara ${v["id.pbb-persen-njop-min"]}% dan ${v["id.pbb-persen-njop-maks"]}%.`, "persen");
    const tarif = entrada.tarif ?? v["id.pbb-tarif-maks"];
    if (tarif > v["id.pbb-tarif-maks"]) throw new ErrorEntrada("Tarif PBB tidak boleh melebihi batas undang-undang.", "tarif");
    const njoptkp = entrada.njoptkp ?? v["id.njoptkp-minimal"];
    const dasar = porcentaje(Math.max(0, njop - njoptkp), persen);
    return {
      pbb: redondear(porcentaje(dasar, tarif)),
      njop,
      njoptkp,
      dasar: redondear(dasar),
      tarif,
    };
  },
  resultado: [
    { clave: "pbb", etiqueta: "PBB setahun", formato: "moneda", destacada: true },
    { clave: "njop", etiqueta: "NJOP total", formato: "moneda" },
    { clave: "njoptkp", etiqueta: "NJOP tidak kena pajak", formato: "moneda" },
    { clave: "dasar", etiqueta: "Dasar pengenaan PBB", formato: "moneda" },
    { clave: "tarif", etiqueta: "Tarif yang dipakai", formato: "porcentaje", decimales: 3 },
  ],
});
