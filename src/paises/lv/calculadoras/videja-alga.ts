import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.videja-alga",
  mercado: "lv",
  concepto: "propio",
  slug: "videja-alga",
  estado: "publicado",
  requiere: { "lv.videja-alga": "serie" },
  campos: [{ id: "alga", tipo: "moneda", etiqueta: "Jūsu bruto alga mēnesī", min: 0, porDefecto: 1500 }],
  calcular(e, v, { redondear }) {
    if (e.alga <= 0) throw new ErrorEntrada("Ievadiet bruto algu, kas lielāka par nulli.", "alga");
    const videja = v["lv.videja-alga"].valor;
    return { videja, starpiba: redondear(e.alga - videja), attieciba: (e.alga / videja) * 100, menesis: v["lv.videja-alga"].fecha };
  },
  resultado: [
    { clave: "attieciba", etiqueta: "Jūsu alga pret vidējo algu", formato: "porcentaje", decimales: 0, destacada: true },
    { clave: "videja", etiqueta: "Vidējā bruto alga", formato: "moneda" },
    { clave: "starpiba", etiqueta: "Starpība ar vidējo", formato: "moneda" },
    { clave: "menesis", etiqueta: "Datu mēnesis", formato: "fecha" },
  ],
});
