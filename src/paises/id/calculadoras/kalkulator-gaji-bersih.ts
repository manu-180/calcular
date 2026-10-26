import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { iuranBpjs, REQUIERE_BPJS } from "../lib/bpjs";
import { biayaJabatanSetahun, bulatkanRibuan, kategoriTer, OPCIONES_STATUS, pph17, ptkpSetahun, REQUIERE_PTKP, REQUIERE_TER, tarifTer } from "../lib/pajak";

export default definirCalculadora({
  id: "id.kalkulator-gaji-bersih",
  mercado: "id",
  concepto: "sueldo-neto",
  slug: "kalkulator-gaji-bersih",
  estado: "publicado",
  requiere: {
    ...REQUIERE_TER,
    ...REQUIERE_PTKP,
    ...REQUIERE_BPJS,
    "id.tarif-pasal-17": "escala",
    "id.biaya-jabatan-tarif": "numero",
    "id.biaya-jabatan-maks-tahun": "numero",
  },
  campos: [
    { id: "gaji", tipo: "moneda", etiqueta: "Gaji bruto per bulan (gaji pokok + tunjangan tetap)", min: 0, porDefecto: 10000000 },
    { id: "status", tipo: "opcion", etiqueta: "Status PTKP", opciones: OPCIONES_STATUS, porDefecto: "tk0", ayuda: "Status pada awal tahun pajak: kawin atau tidak, dan jumlah tanggungan (paling banyak 3)." },
    { id: "risiko", tipo: "opcion-dato", etiqueta: "Tingkat risiko JKK perusahaan", dato: "id.jkk", porDefecto: "sangat-rendah", ayuda: "Pekerjaan kantor umumnya masuk risiko sangat rendah." },
    { id: "jp", tipo: "si-no", etiqueta: "Ikut Jaminan Pensiun (JP)", porDefecto: true },
    { id: "batasJp", tipo: "moneda", etiqueta: "Batas upah JP (opsional)", min: 0, requerido: false, visibleSi: { jp: [true] }, ayuda: "Isi dengan batas upah JP terbaru dari BPJS Ketenagakerjaan jika gaji Anda di atas batas itu. Jika kosong, iuran JP dihitung dari seluruh gaji." },
    { id: "kesehatan", tipo: "si-no", etiqueta: "Ikut BPJS Kesehatan lewat kantor", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.gaji <= 0) throw new ErrorEntrada("Masukkan gaji bruto per bulan.", "gaji");
    const b = iuranBpjs({ upah: entrada.gaji, risiko: entrada.risiko, jp: entrada.jp, batasJp: entrada.batasJp, kesehatan: entrada.kesehatan }, v, redondear);
    // PMK 168/2023 Pasal 5 ayat (3): las primas de JKK, JKM y BPJS Kesehatan que paga el empleador
    // son penghasilan bruto del trabajador.
    const brutoPajak = entrada.gaji + b.jkk + b.jkm + b.kesPemberi;
    const tarif = tarifTer(entrada.status, brutoPajak, v);
    const pphBulan = redondear(porcentaje(brutoPajak, tarif));

    const brutoTahun = brutoPajak * 12;
    const biayaJabatan = biayaJabatanSetahun(brutoTahun, v["id.biaya-jabatan-tarif"], v["id.biaya-jabatan-maks-tahun"]);
    const iuranTahun = 12 * (b.jhtPekerja + b.jpPekerja);
    const neto = brutoTahun - biayaJabatan - iuranTahun;
    const pkp = bulatkanRibuan(neto - ptkpSetahun(entrada.status, v));
    const pphTahun = redondear(pph17(v["id.tarif-pasal-17"], pkp));
    const pphDesember = pphTahun - 11 * pphBulan;

    const iuranPekerja = b.jhtPekerja + b.jpPekerja + b.kesPekerja;
    const bersih = entrada.gaji - iuranPekerja - pphBulan;
    const bersihDesember = entrada.gaji - iuranPekerja - pphDesember;
    const observaciones: string[] = [
      "Januari sampai November PPh 21 dipotong dengan tarif efektif (TER). Di bulan Desember pajak setahun dihitung ulang dengan tarif Pasal 17, jadi potongan Desember bisa berbeda.",
    ];
    if (pphDesember < 0) observaciones.push("Potongan TER setahun lebih besar dari pajak terutang, jadi kelebihannya dikembalikan di gaji Desember.");
    return {
      bersih,
      rataRata: redondear((11 * bersih + bersihDesember) / 12),
      bersihDesember,
      pphBulan,
      tarif,
      kategori: `Kategori ${kategoriTer(entrada.status)}`,
      jht: b.jhtPekerja,
      jpIuran: b.jpPekerja,
      kes: b.kesPekerja,
      pphTahun,
      brutoPajak,
      observaciones,
    };
  },
  resultado: [
    { clave: "bersih", etiqueta: "Gaji bersih per bulan (Januari sampai November)", formato: "moneda", destacada: true },
    { clave: "rataRata", etiqueta: "Rata-rata gaji bersih per bulan dalam setahun", formato: "moneda" },
    { clave: "bersihDesember", etiqueta: "Gaji bersih bulan Desember", formato: "moneda" },
    { clave: "pphBulan", etiqueta: "PPh 21 per bulan (TER)", formato: "moneda" },
    { clave: "tarif", etiqueta: "Tarif efektif (TER)", formato: "porcentaje", decimales: 2 },
    { clave: "kategori", etiqueta: "Kategori TER", formato: "texto" },
    { clave: "jht", etiqueta: "Iuran JHT Anda", formato: "moneda" },
    { clave: "jpIuran", etiqueta: "Iuran JP Anda", formato: "moneda", ocultarSiCero: true },
    { clave: "kes", etiqueta: "Iuran BPJS Kesehatan Anda", formato: "moneda", ocultarSiCero: true },
    { clave: "pphTahun", etiqueta: "PPh 21 setahun (Pasal 17)", formato: "moneda" },
    { clave: "brutoPajak", etiqueta: "Penghasilan bruto untuk pajak per bulan", formato: "moneda", ayuda: "Gaji ditambah iuran JKK, JKM dan BPJS Kesehatan yang dibayar kantor." },
  ],
  mundo: { bruto: "gaji", periodoBruto: "mes", neto: "rataRata", periodoNeto: "mes", pagasAnuales: 13 },
});
