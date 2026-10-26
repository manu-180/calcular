import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "id.kurs-jisdor",
  mercado: "id",
  concepto: "tipo-de-cambio",
  slug: "kurs-jisdor",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  requiere: { "id.jisdor": "serie" },
  campos: [
    {
      id: "arah",
      tipo: "opcion",
      etiqueta: "Konversi",
      opciones: [
        { valor: "usd-idr", etiqueta: "Dolar AS ke rupiah" },
        { valor: "idr-usd", etiqueta: "Rupiah ke dolar AS" },
      ],
      porDefecto: "usd-idr",
    },
    { id: "jumlah", tipo: "numero", etiqueta: "Jumlah", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.jumlah <= 0) throw new ErrorEntrada("Masukkan jumlah di atas nol.", "jumlah");
    const { valor, fecha } = v["id.jisdor"];
    const keRupiah = entrada.arah === "usd-idr";
    return {
      hasil: redondear(keRupiah ? entrada.jumlah * valor : entrada.jumlah / valor),
      mataUang: keRupiah ? "Rupiah (IDR)" : "Dolar AS (USD)",
      kurs: valor,
      fecha,
      observaciones: ["JISDOR adalah kurs referensi Bank Indonesia. Bank dan money changer memakai kurs jual dan beli sendiri yang bisa berbeda."],
    };
  },
  resultado: [
    { clave: "hasil", etiqueta: "Hasil konversi", formato: "numero", decimales: 2, destacada: true },
    { clave: "mataUang", etiqueta: "Mata uang hasil", formato: "texto" },
    { clave: "kurs", etiqueta: "Kurs JISDOR (rupiah per 1 dolar AS)", formato: "numero", decimales: 2 },
    { clave: "fecha", etiqueta: "Tanggal kurs", formato: "fecha" },
  ],
});
