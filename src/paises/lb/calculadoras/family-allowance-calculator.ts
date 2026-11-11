import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lb.family-allowance-calculator",
  mercado: "lb",
  concepto: "propio",
  slug: "family-allowance-calculator",
  estado: "publicado",
  requiere: { "lb.family-allowance": "mapa", "lb.family-allowance-children": "numero", "lb.nssf-ceiling-family": "numero" },
  campos: [
    { id: "conyuge", tipo: "si-no", etiqueta: "يحق لك التقديم عن الزوج أو الزوجة", porDefecto: true },
    { id: "hijos", tipo: "entero", etiqueta: "عدد الأولاد", min: 0, max: 20, porDefecto: 2 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.hijos < 0) throw new ErrorEntrada("أدخل عدد الأولاد.", "hijos");
    const m = v["lb.family-allowance"];
    const hijos = Math.min(entrada.hijos, v["lb.family-allowance-children"]);
    const porConyuge = entrada.conyuge ? enMapa(m, "spouse") : 0;
    const porHijos = hijos * enMapa(m, "child");
    return {
      total: redondear(Math.min(porConyuge + porHijos, enMapa(m, "max"))),
      porConyuge,
      porHijos,
      contados: hijos,
      tope: v["lb.nssf-ceiling-family"],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "التقديمات في الشهر", formato: "moneda", destacada: true },
    { clave: "porConyuge", etiqueta: "عن الزوج أو الزوجة", formato: "moneda" },
    { clave: "porHijos", etiqueta: "عن الأولاد", formato: "moneda" },
    { clave: "contados", etiqueta: "الأولاد المحتسبون", formato: "numero", decimales: 0 },
    { clave: "tope", etiqueta: "الحد الأقصى للكسب الخاضع لحسومات الفرع", formato: "moneda" },
  ],
});
