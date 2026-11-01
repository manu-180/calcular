import { aplicarEscalaMarginal, definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// Tablas de PP 35/2021 Pasal 40: la clave es el primer año de cada tramo de masa kerja.
function bulanMenurutMasaKerja(tabla: Readonly<Record<string, number>>, tahun: number): number {
  let bulan = 0;
  let mejor = -1;
  for (const [clave, valor] of Object.entries(tabla)) {
    const desde = Number(clave);
    if (tahun >= desde && desde > mejor) {
      mejor = desde;
      bulan = valor;
    }
  }
  return bulan;
}

export default definirCalculadora({
  id: "id.kalkulator-pesangon",
  mercado: "id",
  concepto: "indemnizacion-despido",
  slug: "kalkulator-pesangon",
  estado: "publicado",
  requiere: {
    "id.uang-pesangon": "mapa",
    "id.uang-penghargaan-masa-kerja": "mapa",
    "id.pesangon-pengali": "mapa",
    "id.upmk-pengali": "mapa",
    "id.tarif-pph-pesangon": "escala",
  },
  campos: [
    { id: "upah", tipo: "moneda", etiqueta: "Upah sebulan (gaji pokok + tunjangan tetap)", min: 0, porDefecto: 8000000 },
    { id: "tahun", tipo: "entero", etiqueta: "Masa kerja (tahun penuh)", min: 0, max: 60, porDefecto: 5 },
    { id: "alasan", tipo: "opcion-dato", etiqueta: "Alasan PHK", dato: "id.pesangon-pengali", porDefecto: "efisiensi-mencegah-rugi" },
    { id: "penggantianHak", tipo: "moneda", etiqueta: "Uang penggantian hak (opsional)", min: 0, porDefecto: 0, ayuda: "Misalnya cuti tahunan yang belum diambil dan ongkos pulang. Hitung cuti dengan kalkulator cuti tahunan." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.upah <= 0) throw new ErrorEntrada("Masukkan upah sebulan.", "upah");
    const pengaliUp = enMapa(v["id.pesangon-pengali"], entrada.alasan);
    const pengaliUpmk = enMapa(v["id.upmk-pengali"], entrada.alasan);
    const bulanUp = bulanMenurutMasaKerja(v["id.uang-pesangon"], entrada.tahun);
    const bulanUpmk = bulanMenurutMasaKerja(v["id.uang-penghargaan-masa-kerja"], entrada.tahun);
    const pesangon = redondear(pengaliUp * bulanUp * entrada.upah);
    const penghargaan = redondear(pengaliUpmk * bulanUpmk * entrada.upah);
    const total = pesangon + penghargaan + entrada.penggantianHak;
    const pph = redondear(aplicarEscalaMarginal(v["id.tarif-pph-pesangon"], total));
    const observaciones: string[] = [];
    if (pengaliUp === 0) observaciones.push("Pekerja yang mengundurkan diri berhak atas uang penggantian hak dan uang pisah. Besar uang pisah diatur di perjanjian kerja, peraturan perusahaan atau perjanjian kerja bersama.");
    return {
      total,
      pesangon,
      penghargaan,
      penggantianHak: entrada.penggantianHak,
      bulanPesangon: pengaliUp * bulanUp,
      bulanPenghargaan: pengaliUpmk * bulanUpmk,
      pph,
      bersih: total - pph,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total pesangon dan hak lain", formato: "moneda", destacada: true },
    { clave: "pesangon", etiqueta: "Uang pesangon", formato: "moneda" },
    { clave: "penghargaan", etiqueta: "Uang penghargaan masa kerja", formato: "moneda" },
    { clave: "penggantianHak", etiqueta: "Uang penggantian hak", formato: "moneda", ocultarSiCero: true },
    { clave: "bulanPesangon", etiqueta: "Uang pesangon dalam bulan upah", formato: "numero", decimales: 2 },
    { clave: "bulanPenghargaan", etiqueta: "Uang penghargaan masa kerja dalam bulan upah", formato: "numero", decimales: 2 },
    { clave: "pph", etiqueta: "Perkiraan PPh 21 final", formato: "moneda" },
    { clave: "bersih", etiqueta: "Perkiraan yang diterima setelah pajak", formato: "moneda" },
  ],
});
