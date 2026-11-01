import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "id.kalkulator-pph-final-umkm",
  mercado: "id",
  concepto: "regimen-simplificado",
  slug: "kalkulator-pph-final-umkm",
  estado: "publicado",
  requiere: {
    "id.pph-final-umkm": "numero",
    "id.umkm-batas-omzet": "numero",
    "id.umkm-omzet-tidak-kena-pajak": "numero",
  },
  campos: [
    {
      id: "wp",
      tipo: "opcion",
      etiqueta: "Jenis wajib pajak",
      opciones: [
        { valor: "orang-pribadi", etiqueta: "Orang pribadi (usaha perorangan)" },
        { valor: "badan", etiqueta: "Perseroan perorangan atau koperasi" },
      ],
      porDefecto: "orang-pribadi",
    },
    { id: "omzet", tipo: "moneda", etiqueta: "Omzet (peredaran bruto) bulan ini", min: 0, porDefecto: 100000000 },
    { id: "kumulatif", tipo: "moneda", etiqueta: "Omzet sejak Januari sampai bulan lalu", min: 0, porDefecto: 0, visibleSi: { wp: ["orang-pribadi"] }, ayuda: "Dipakai untuk menghitung bagian omzet yang belum kena pajak." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.omzet <= 0) throw new ErrorEntrada("Masukkan omzet bulan ini.", "omzet");
    const sebelumnya = entrada.wp === "orang-pribadi" ? (entrada.kumulatif ?? 0) : 0;
    const bebas = entrada.wp === "orang-pribadi" ? v["id.umkm-omzet-tidak-kena-pajak"] : 0;
    const sisaBebasAwal = Math.max(0, bebas - sebelumnya);
    const bebasBulanIni = Math.min(entrada.omzet, sisaBebasAwal);
    const dasar = entrada.omzet - bebasBulanIni;
    const pph = redondear(porcentaje(dasar, v["id.pph-final-umkm"]));
    const observaciones: string[] = [];
    if (sebelumnya + entrada.omzet > v["id.umkm-batas-omzet"]) {
      observaciones.push("Omzet setahun sudah melewati batas PPh final UMKM. Mulai tahun pajak berikutnya Anda tidak bisa lagi memakai tarif final ini.");
    }
    return {
      pph,
      dasar,
      bebasBulanIni,
      sisaBebas: entrada.wp === "orang-pribadi" ? sisaBebasAwal - bebasBulanIni : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "pph", etiqueta: "PPh final bulan ini", formato: "moneda", destacada: true },
    { clave: "dasar", etiqueta: "Omzet yang dikenai pajak", formato: "moneda" },
    { clave: "bebasBulanIni", etiqueta: "Omzet bulan ini yang tidak kena pajak", formato: "moneda", ocultarSiCero: true },
    { clave: "sisaBebas", etiqueta: "Sisa omzet tidak kena pajak tahun ini", formato: "moneda" },
  ],
});
