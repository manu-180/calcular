import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "al.tatimi-mbi-fitimin",
  mercado: "al",
  concepto: "propio",
  slug: "tatimi-mbi-fitimin",
  estado: "publicado",
  requiere: { "al.tatim-korporate": "numero", "al.kufi-zero": "numero" },
  campos: [
    { id: "teArdhura", tipo: "moneda", etiqueta: "Të ardhurat bruto të shoqërisë në vit", min: 0, porDefecto: 20000000 },
    { id: "fitimi", tipo: "moneda", etiqueta: "Fitimi i tatueshëm në vit", min: 0, porDefecto: 5000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.teArdhura <= 0) throw new ErrorEntrada("Vendosni të ardhurat e shoqërisë.", "teArdhura");
    if (e.fitimi > e.teArdhura) throw new ErrorEntrada("Fitimi nuk mund të jetë më i madh se të ardhurat.", "fitimi");
    const zero = e.teArdhura <= v["al.kufi-zero"];
    const norma = zero ? 0 : v["al.tatim-korporate"];
    const tatimi = redondear((e.fitimi * norma) / 100);
    return { tatimi, norma, fitimiPasTatimit: redondear(e.fitimi - tatimi) };
  },
  resultado: [
    { clave: "tatimi", etiqueta: "Tatimi mbi fitimin", formato: "moneda", destacada: true },
    { clave: "norma", etiqueta: "Norma e zbatuar", formato: "porcentaje" },
    { clave: "fitimiPasTatimit", etiqueta: "Fitimi pas tatimit", formato: "moneda" },
  ],
});
