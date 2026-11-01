import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.mogebis-gadasakhadi",
  mercado: "ge",
  concepto: "propio",
  slug: "mogebis-gadasakhadi",
  estado: "publicado",
  requiere: { "ge.mogeba": "numero", "ge.mogeba-gamqopi": "numero", "ge.mogeba-finansuri": "numero" },
  campos: [
    { id: "ganatsilebuli", tipo: "moneda", etiqueta: "განაწილებული მოგება (პარტნიორებზე გასაცემი თანხა)", min: 0, porDefecto: 8500 },
  ],
  calcular(e, v, { redondear }) {
    if (e.ganatsilebuli <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "ganatsilebuli");
    const dasabegri = redondear(e.ganatsilebuli / v["ge.mogeba-gamqopi"]);
    const gadasakhadi = redondear((dasabegri * v["ge.mogeba"]) / 100);
    return { gadasakhadi, dasabegri, sul: redondear(e.ganatsilebuli + gadasakhadi) };
  },
  resultado: [
    { clave: "gadasakhadi", etiqueta: "მოგების გადასახადი", formato: "moneda", destacada: true },
    { clave: "dasabegri", etiqueta: "დასაბეგრი თანხა", formato: "moneda" },
    { clave: "sul", etiqueta: "კომპანიიდან გასული თანხა სულ", formato: "moneda" },
  ],
});
