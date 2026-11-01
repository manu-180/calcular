import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "al.tatimi-mbi-dividendin",
  mercado: "al",
  concepto: "propio",
  slug: "tatimi-mbi-dividendin",
  estado: "publicado",
  requiere: { "al.tatim-dividend": "numero", "al.tatim-korporate": "numero" },
  campos: [
    { id: "dividendi", tipo: "moneda", etiqueta: "Dividendi bruto", min: 0, porDefecto: 1000000 },
    { id: "ngaFitimi", tipo: "si-no", etiqueta: "Dua të shoh edhe tatimin mbi fitimin", porDefecto: false, ayuda: "Llogarit fitimin para tatimit që i përgjigjet këtij dividendi, me normën e korporatave." },
  ],
  calcular(e, v, { redondear }) {
    if (e.dividendi <= 0) throw new ErrorEntrada("Vendosni një dividend më të madh se zero.", "dividendi");
    const tatimi = redondear((e.dividendi * v["al.tatim-dividend"]) / 100);
    const neto = redondear(e.dividendi - tatimi);
    const fitimiPara = e.ngaFitimi ? redondear(e.dividendi / (1 - v["al.tatim-korporate"] / 100)) : null;
    return {
      tatimi,
      neto,
      fitimiPara,
      barraTotale: fitimiPara === null ? null : ((fitimiPara - neto) / fitimiPara) * 100,
    };
  },
  resultado: [
    { clave: "tatimi", etiqueta: "Tatimi mbi dividendin", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Dividendi neto", formato: "moneda" },
    { clave: "fitimiPara", etiqueta: "Fitimi para tatimit", formato: "moneda" },
    { clave: "barraTotale", etiqueta: "Barra totale tatimore", formato: "porcentaje", decimales: 1 },
  ],
});
