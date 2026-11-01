import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.iin-kalkulators",
  mercado: "lv",
  concepto: "impuesto-renta",
  slug: "iin-kalkulators",
  estado: "publicado",
  requiere: {
    "lv.iin-gada": "escala",
    "lv.iin-alga": "numero",
    "lv.neapliekamais-minimums": "numero",
    "lv.apgadajamais": "numero",
  },
  campos: [
    { id: "ienakums", tipo: "moneda", etiqueta: "Gada ienākums pēc VSAOI", min: 0, porDefecto: 30000, ayuda: "Bruto ienākums gadā, no kura jau atņemtas sociālās iemaksas." },
    { id: "minimums", tipo: "si-no", etiqueta: "Piemērot neapliekamo minimumu visam gadam", porDefecto: true },
    { id: "apgadajamie", tipo: "entero", etiqueta: "Apgādājamo skaits", min: 0, max: 15, porDefecto: 0 },
    { id: "ieturets", tipo: "moneda", etiqueta: "Gadā jau ieturētais IIN", min: 0, requerido: false, ayuda: "Ja vēlaties redzēt, cik būtu jāpiemaksā vai jāatgūst deklarācijā." },
  ],
  calcular(e, v, { redondear }) {
    if (e.ienakums <= 0) throw new ErrorEntrada("Ievadiet gada ienākumu, kas lielāks par nulli.", "ienakums");
    const atbrivots = (e.minimums ? v["lv.neapliekamais-minimums"] * 12 : 0) + e.apgadajamie * v["lv.apgadajamais"] * 12;
    const apliekams = Math.max(0, e.ienakums - atbrivots);
    const nodoklis = redondear(aplicarEscalaMarginal(v["lv.iin-gada"], apliekams));
    return {
      nodoklis,
      apliekams: redondear(apliekams),
      atbrivots,
      videjaLikme: e.ienakums > 0 ? (nodoklis / e.ienakums) * 100 : 0,
      starpiba: e.ieturets === null ? null : redondear(nodoklis - e.ieturets),
    };
  },
  resultado: [
    { clave: "nodoklis", etiqueta: "IIN par gadu", formato: "moneda", destacada: true },
    { clave: "apliekams", etiqueta: "Apliekamais ienākums", formato: "moneda" },
    { clave: "atbrivots", etiqueta: "Minimums un atvieglojumi gadā", formato: "moneda", ocultarSiCero: true },
    { clave: "videjaLikme", etiqueta: "Vidējā likme no ienākuma", formato: "porcentaje", decimales: 1 },
    { clave: "starpiba", etiqueta: "Starpība ar ieturēto (plus: jāpiemaksā, mīnus: jāatgūst)", formato: "moneda" },
  ],
});
