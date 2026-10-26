import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

export default definirCalculadora({
  id: "id.kalkulator-inflasi",
  mercado: "id",
  concepto: "inflacion",
  slug: "kalkulator-inflasi",
  estado: "publicado",
  requiere: { "id.inflasi-tahunan": "serie" },
  campos: [
    { id: "jumlah", tipo: "moneda", etiqueta: "Jumlah uang hari ini", min: 0, porDefecto: 10000000 },
    { id: "tahun", tipo: "entero", etiqueta: "Berapa tahun ke depan", min: 1, max: 50, porDefecto: 5 },
    { id: "inflasi", tipo: "porcentaje", etiqueta: "Inflasi per tahun (opsional)", min: -20, max: 100, requerido: false, ayuda: "Jika kosong, dipakai inflasi tahunan terbaru dari BPS." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.jumlah <= 0) throw new ErrorEntrada("Masukkan jumlah uang.", "jumlah");
    const resmi = v["id.inflasi-tahunan"];
    const tasa = entrada.inflasi ?? resmi.valor;
    if (tasa <= -100) throw new ErrorEntrada("Inflasi harus di atas -100%.", "inflasi");
    const faktor = Math.pow(1 + tasa / 100, entrada.tahun);
    const mes = Number(resmi.fecha.slice(5, 7)) - 1;
    return {
      dibutuhkan: redondear(entrada.jumlah * faktor),
      dayaBeli: redondear(entrada.jumlah / faktor),
      setahunLalu: redondear(entrada.jumlah / (1 + resmi.valor / 100)),
      tasa,
      resmi: resmi.valor,
      periode: `${BULAN[mes]} ${resmi.fecha.slice(0, 4)}`,
    };
  },
  resultado: [
    { clave: "dibutuhkan", etiqueta: "Uang yang dibutuhkan nanti untuk daya beli yang sama", formato: "moneda", destacada: true },
    { clave: "dayaBeli", etiqueta: "Daya beli jumlah ini nanti, dalam rupiah hari ini", formato: "moneda" },
    { clave: "setahunLalu", etiqueta: "Setara nilai setahun lalu", formato: "moneda" },
    { clave: "tasa", etiqueta: "Inflasi per tahun yang dipakai", formato: "porcentaje", decimales: 2 },
    { clave: "resmi", etiqueta: "Inflasi tahunan terbaru (BPS)", formato: "porcentaje", decimales: 2 },
    { clave: "periode", etiqueta: "Bulan data inflasi", formato: "texto" },
  ],
});
