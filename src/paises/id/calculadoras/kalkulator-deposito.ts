import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "id.kalkulator-deposito",
  mercado: "id",
  concepto: "plazo-fijo",
  slug: "kalkulator-deposito",
  estado: "publicado",
  requiere: {
    "id.pph-bunga-deposito": "numero",
    "id.deposito-batas-tidak-dipotong": "numero",
  },
  campos: [
    { id: "nominal", tipo: "moneda", etiqueta: "Nominal deposito", min: 0, porDefecto: 100000000 },
    { id: "bunga", tipo: "porcentaje", etiqueta: "Suku bunga per tahun", min: 0, max: 30, porDefecto: 4.5 },
    { id: "tenor", tipo: "entero", etiqueta: "Tenor (bulan)", min: 1, max: 120, porDefecto: 12 },
    { id: "aro", tipo: "si-no", etiqueta: "Bunga ikut diperpanjang (ARO plus) setiap jatuh tempo bulanan", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.nominal <= 0) throw new ErrorEntrada("Masukkan nominal deposito.", "nominal");
    const kenaPajak = entrada.nominal > v["id.deposito-batas-tidak-dipotong"];
    const tarifPajak = kenaPajak ? v["id.pph-bunga-deposito"] : 0;
    let pokok = entrada.nominal;
    let bungaBruto = 0;
    let pajak = 0;
    if (entrada.aro) {
      for (let i = 0; i < entrada.tenor; i++) {
        const b = redondear(porcentaje(pokok, entrada.bunga) / 12);
        const p = redondear(porcentaje(b, tarifPajak));
        bungaBruto += b;
        pajak += p;
        pokok += b - p;
      }
    } else {
      bungaBruto = redondear((porcentaje(entrada.nominal, entrada.bunga) * entrada.tenor) / 12);
      pajak = redondear(porcentaje(bungaBruto, tarifPajak));
    }
    const bersih = bungaBruto - pajak;
    return {
      bersih,
      bungaBruto,
      pajak,
      total: entrada.nominal + bersih,
      efektif: (bersih / entrada.nominal) * (12 / entrada.tenor) * 100,
    };
  },
  resultado: [
    { clave: "bersih", etiqueta: "Bunga bersih setelah pajak", formato: "moneda", destacada: true },
    { clave: "bungaBruto", etiqueta: "Bunga sebelum pajak", formato: "moneda" },
    { clave: "pajak", etiqueta: "PPh final bunga", formato: "moneda" },
    { clave: "total", etiqueta: "Dana saat jatuh tempo", formato: "moneda" },
    { clave: "efektif", etiqueta: "Imbal hasil bersih per tahun", formato: "porcentaje", decimales: 2 },
  ],
});
