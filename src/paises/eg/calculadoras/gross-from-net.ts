import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { nomina, REQUIERE_NOMINA } from "../lib/nomina";

export default definirCalculadora({
  id: "eg.gross-from-net",
  mercado: "eg",
  concepto: "propio",
  slug: "gross-from-net",
  estado: "publicado",
  requiere: REQUIERE_NOMINA,
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "صافي المرتب الشهري الذي تريده", min: 0, porDefecto: 12000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("أدخل صافي المرتب المطلوب.", "neto");
    // El neto crece siempre con el bruto, así que una bisección encuentra el bruto exacto.
    let bajo = e.neto;
    let alto = e.neto * 3 + 10000;
    for (let i = 0; i < 200; i++) {
      const medio = (bajo + alto) / 2;
      if (nomina(medio, null, v).neto < e.neto) bajo = medio;
      else alto = medio;
    }
    const bruto = redondear(alto);
    const n = nomina(bruto, null, v);
    const aporte = redondear(n.empleado);
    const impuesto = redondear(n.impuestoMensual);
    return {
      bruto,
      aporte,
      impuesto,
      netoObtenido: redondear(bruto - aporte - impuesto),
      costoEmpleador: redondear(bruto + n.empleador),
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "إجمالي المرتب المطلوب", formato: "moneda", destacada: true },
    { clave: "aporte", etiqueta: "حصتك في التأمينات", formato: "moneda" },
    { clave: "impuesto", etiqueta: "ضريبة كسب العمل الشهرية", formato: "moneda" },
    { clave: "netoObtenido", etiqueta: "الصافي بهذا الإجمالي", formato: "moneda" },
    { clave: "costoEmpleador", etiqueta: "تكلفته على صاحب العمل", formato: "moneda" },
  ],
});
