import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mn.dood-tsalin",
  mercado: "mn",
  concepto: "salario-minimo",
  slug: "dood-tsalin",
  estado: "publicado",
  requiere: {
    "mn.hhdh-sar": "numero",
    "mn.hhdh-tsag": "numero",
    "mn.ndsh-dahin": "numero",
  },
  campos: [
    { id: "tsalin", tipo: "moneda", etiqueta: "Таны сарын цалин (харьцуулахад)", min: 0, requerido: false },
    { id: "tsag", tipo: "numero", etiqueta: "Сард ажилласан цаг", min: 0, porDefecto: 168, ayuda: "Хагас цагаар ажилладаг бол цагаа оруулна уу." },
  ],
  calcular(e, v, { redondear }) {
    if (e.tsag <= 0) throw new ErrorEntrada("Сард ажилласан цагаа оруулна уу.", "tsag");
    const sar = v["mn.hhdh-sar"];
    const hTsag = v["mn.hhdh-tsag"];
    const doodDun = redondear(Math.min(sar, hTsag * e.tsag));
    const zuruu = e.tsalin === null ? null : redondear(e.tsalin - doodDun);
    return {
      sar,
      tsagt: hTsag,
      doodDun,
      zuruu,
      tope: sar * v["mn.ndsh-dahin"],
      observaciones: zuruu !== null && zuruu < 0 ? ["Таны цалин доод хэмжээнээс бага байна. Хөдөлмөрийн гэрээгээ шалгана уу."] : [],
    };
  },
  resultado: [
    { clave: "sar", etiqueta: "Сарын доод хэмжээ", formato: "moneda", destacada: true },
    { clave: "tsagt", etiqueta: "Цагийн доод хэмжээ", formato: "moneda" },
    { clave: "doodDun", etiqueta: "Таны цагт ногдох доод дүн", formato: "moneda" },
    { clave: "zuruu", etiqueta: "Таны цалин, доод дүн хоёрын зөрүү", formato: "moneda" },
    { clave: "tope", etiqueta: "НДШ ногдох сарын дээд хэмжээ", formato: "moneda" },
  ],
});
