import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "id.kalkulator-bphtb",
  mercado: "id",
  concepto: "propio",
  slug: "kalkulator-bphtb",
  estado: "publicado",
  requiere: {
    "id.bphtb-tarif-maks": "numero",
    "id.npoptkp-minimal": "numero",
    "id.npoptkp-waris-minimal": "numero",
  },
  campos: [
    { id: "harga", tipo: "moneda", etiqueta: "Harga transaksi (nilai perolehan)", min: 0, porDefecto: 500000000 },
    { id: "njop", tipo: "moneda", etiqueta: "NJOP PBB tahun ini", min: 0, porDefecto: 450000000, ayuda: "Lihat di SPPT PBB. Jika harga transaksi lebih rendah dari NJOP, yang dipakai NJOP." },
    {
      id: "perolehan",
      tipo: "opcion",
      etiqueta: "Cara memperoleh",
      opciones: [
        { valor: "jual-beli", etiqueta: "Jual beli atau perolehan lain" },
        { valor: "waris", etiqueta: "Waris atau hibah wasiat dari orang tua, anak atau suami/istri" },
      ],
      porDefecto: "jual-beli",
    },
    { id: "npoptkp", tipo: "moneda", etiqueta: "NPOPTKP daerah Anda (opsional)", min: 0, requerido: false, ayuda: "Ditetapkan Perda kabupaten atau kota. Jika kosong, dipakai batas paling rendah undang-undang." },
    { id: "tarif", tipo: "porcentaje", etiqueta: "Tarif BPHTB daerah Anda (opsional)", min: 0, max: 100, requerido: false, ayuda: "Jika kosong, dipakai tarif paling tinggi undang-undang." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.harga <= 0 && entrada.njop <= 0) throw new ErrorEntrada("Masukkan harga transaksi atau NJOP.", "harga");
    if (entrada.tarif !== null && entrada.tarif > v["id.bphtb-tarif-maks"]) throw new ErrorEntrada("Tarif BPHTB tidak boleh melebihi batas undang-undang.", "tarif");
    const minimal = entrada.perolehan === "waris" ? v["id.npoptkp-waris-minimal"] : v["id.npoptkp-minimal"];
    const npoptkp = entrada.npoptkp ?? minimal;
    const tarif = entrada.tarif ?? v["id.bphtb-tarif-maks"];
    const npop = Math.max(entrada.harga, entrada.njop);
    const npopkp = Math.max(0, npop - npoptkp);
    const observaciones: string[] = [];
    if (entrada.npoptkp !== null && entrada.npoptkp < minimal) observaciones.push("NPOPTKP yang Anda isi di bawah batas paling rendah undang-undang. Periksa lagi Perda daerah Anda.");
    return {
      bphtb: redondear(porcentaje(npopkp, tarif)),
      npop,
      npoptkp,
      npopkp,
      tarif,
      observaciones,
    };
  },
  resultado: [
    { clave: "bphtb", etiqueta: "BPHTB yang harus dibayar", formato: "moneda", destacada: true },
    { clave: "npop", etiqueta: "Nilai perolehan objek pajak (NPOP)", formato: "moneda" },
    { clave: "npoptkp", etiqueta: "NPOPTKP", formato: "moneda" },
    { clave: "npopkp", etiqueta: "NPOP kena pajak", formato: "moneda" },
    { clave: "tarif", etiqueta: "Tarif yang dipakai", formato: "porcentaje", decimales: 2 },
  ],
});
