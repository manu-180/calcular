import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala, TablaResultado } from "@/motor/tipos";
import { dilimOrani, vergi } from "../lib/bordro";

function dilimTablosu(tarife: readonly FilaEscala[], matrah: number, r: (n: number) => number): TablaResultado {
  const filas: (number | null)[][] = [];
  for (const f of tarife) {
    if (matrah <= f.desde) break;
    const tope = f.hasta === null ? matrah : Math.min(matrah, f.hasta);
    filas.push([f.desde, f.hasta, f.tasa, r(tope - f.desde), r(((tope - f.desde) * f.tasa) / 100)]);
  }
  return {
    tipo: "tabla",
    columnas: [
      { clave: "desde", etiqueta: "Dilim başı", formato: "moneda" },
      { clave: "hasta", etiqueta: "Dilim sonu", formato: "moneda" },
      { clave: "oran", etiqueta: "Oran", formato: "porcentaje" },
      { clave: "matrah", etiqueta: "Bu dilimdeki matrah", formato: "moneda" },
      { clave: "vergi", etiqueta: "Bu dilimin vergisi", formato: "moneda" },
    ],
    filas,
  };
}

export default definirCalculadora({
  id: "tr.gelir-vergisi-hesaplama",
  mercado: "tr",
  concepto: "impuesto-renta",
  slug: "gelir-vergisi-hesaplama",
  estado: "publicado",
  requiere: {
    "tr.gv-tarife-ucret": "escala",
    "tr.gv-tarife": "escala",
  },
  campos: [
    { id: "matrah", tipo: "moneda", etiqueta: "Yıllık gelir vergisi matrahı", min: 0, porDefecto: 600000 },
    {
      id: "tur",
      tipo: "opcion",
      etiqueta: "Gelirin türü",
      opciones: [
        { valor: "ucret", etiqueta: "Ücret geliri" },
        { valor: "diger", etiqueta: "Ücret dışı gelir (kira, serbest meslek, ticari kazanç)" },
      ],
      porDefecto: "ucret",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.matrah <= 0) throw new ErrorEntrada("Vergi matrahını girin.", "matrah");
    const tarife = entrada.tur === "ucret" ? valores["tr.gv-tarife-ucret"] : valores["tr.gv-tarife"];
    const gelirVergisi = redondear(vergi(tarife, entrada.matrah));
    return {
      gelirVergisi,
      ortalama: (gelirVergisi / entrada.matrah) * 100,
      marjinal: dilimOrani(tarife, entrada.matrah),
      kalan: redondear(entrada.matrah - gelirVergisi),
      dilimler: dilimTablosu(tarife, entrada.matrah, redondear),
    };
  },
  resultado: [
    { clave: "gelirVergisi", etiqueta: "Hesaplanan gelir vergisi", formato: "moneda", destacada: true },
    { clave: "ortalama", etiqueta: "Ortalama vergi oranı", formato: "porcentaje", decimales: 2 },
    { clave: "marjinal", etiqueta: "Girdiğiniz en yüksek dilim", formato: "porcentaje" },
    { clave: "kalan", etiqueta: "Matrahtan vergi sonrası kalan", formato: "moneda" },
  ],
  tablas: [{ clave: "dilimler", titulo: "Dilim dilim hesap", filasVisibles: 5 }],
});
