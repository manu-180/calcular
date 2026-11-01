import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "id.kalkulator-bpjs-kesehatan",
  mercado: "id",
  concepto: "propio",
  slug: "kalkulator-bpjs-kesehatan",
  estado: "publicado",
  requiere: {
    "id.bpjs-kes-pekerja": "numero",
    "id.bpjs-kes-pemberi-kerja": "numero",
    "id.bpjs-kes-batas-upah": "numero",
    "id.bpjs-kes-mandiri": "mapa",
    "id.bpjs-kes-bantuan-kelas-3": "numero",
  },
  campos: [
    {
      id: "jenis",
      tipo: "opcion",
      etiqueta: "Jenis peserta",
      opciones: [
        { valor: "ppu", etiqueta: "Pekerja penerima upah (didaftarkan kantor)" },
        { valor: "mandiri", etiqueta: "Peserta mandiri (bayar sendiri)" },
      ],
      porDefecto: "ppu",
    },
    { id: "gaji", tipo: "moneda", etiqueta: "Gaji atau upah sebulan", min: 0, porDefecto: 8000000, visibleSi: { jenis: ["ppu"] } },
    { id: "kelas", tipo: "opcion-dato", etiqueta: "Kelas perawatan", dato: "id.bpjs-kes-mandiri", porDefecto: "kelas-3", visibleSi: { jenis: ["mandiri"] } },
    { id: "anggota", tipo: "entero", etiqueta: "Jumlah anggota keluarga yang didaftarkan", min: 1, max: 20, porDefecto: 1, visibleSi: { jenis: ["mandiri"] } },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.jenis === "ppu") {
      const gaji = entrada.gaji ?? 0;
      if (gaji <= 0) throw new ErrorEntrada("Masukkan gaji sebulan.", "gaji");
      const dasar = Math.min(gaji, v["id.bpjs-kes-batas-upah"]);
      const pekerja = redondear(porcentaje(dasar, v["id.bpjs-kes-pekerja"]));
      const pemberi = redondear(porcentaje(dasar, v["id.bpjs-kes-pemberi-kerja"]));
      return { anda: pekerja, pemberi, total: pekerja + pemberi, dasar, bantuan: null, setahun: pekerja * 12 };
    }
    const anggota = entrada.anggota ?? 1;
    if (anggota < 1) throw new ErrorEntrada("Masukkan paling sedikit 1 anggota.", "anggota");
    const tarif = enMapa(v["id.bpjs-kes-mandiri"], entrada.kelas);
    const anda = tarif * anggota;
    const bantuan = entrada.kelas === "kelas-3" ? v["id.bpjs-kes-bantuan-kelas-3"] * anggota : null;
    return { anda, pemberi: null, total: anda, dasar: null, bantuan, setahun: anda * 12 };
  },
  resultado: [
    { clave: "anda", etiqueta: "Iuran yang Anda bayar per bulan", formato: "moneda", destacada: true },
    { clave: "pemberi", etiqueta: "Iuran yang dibayar pemberi kerja", formato: "moneda" },
    { clave: "total", etiqueta: "Total iuran per bulan", formato: "moneda" },
    { clave: "dasar", etiqueta: "Upah dasar perhitungan", formato: "moneda" },
    { clave: "bantuan", etiqueta: "Bantuan iuran pemerintah (kelas III)", formato: "moneda" },
    { clave: "setahun", etiqueta: "Iuran Anda setahun", formato: "moneda" },
  ],
});
