import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.maternitates-pabalsts",
  mercado: "lv",
  concepto: "propio",
  slug: "maternitates-pabalsts",
  estado: "borrador",
  requiere: { "lv.maternitates-pabalsts": "numero" },
  campos: [
    { id: "alga", tipo: "moneda", etiqueta: "Vidējā apdrošināšanas iemaksu alga mēnesī", min: 0, porDefecto: 1500 },
    { id: "dienas", tipo: "entero", etiqueta: "Pabalsta kalendāra dienas", min: 1, max: 140, porDefecto: 112 },
  ],
  calcular(e, v, { redondear }) {
    if (e.alga <= 0) throw new ErrorEntrada("Ievadiet algu, kas lielāka par nulli.", "alga");
    const diena = (e.alga * 12) / 365;
    return { pabalsts: redondear(porcentaje(diena * e.dienas, v["lv.maternitates-pabalsts"])) };
  },
  resultado: [
    { clave: "pabalsts", etiqueta: "Maternitātes pabalsts par periodu", formato: "moneda", destacada: true },
  ],
});
