import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.bruto-netodan",
  mercado: "ge",
  concepto: "propio",
  slug: "bruto-netodan",
  estado: "publicado",
  requiere: { "ge.sashemosavlo": "numero", "ge.pensia-dasaqmebuli": "numero" },
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "სასურველი ხელზე ასაღები თანხა თვეში (ნეტო)", min: 0, porDefecto: 2000 },
    { id: "monatsile", tipo: "si-no", etiqueta: "დასაქმებული საპენსიო სქემის მონაწილეა", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "neto");
    const dartchena = (1 - (e.monatsile ? v["ge.pensia-dasaqmebuli"] : 0) / 100) * (1 - v["ge.sashemosavlo"] / 100);
    const bruto = redondear(e.neto / dartchena);
    const pensia = e.monatsile ? redondear((bruto * v["ge.pensia-dasaqmebuli"]) / 100) : 0;
    return { bruto, pensia, gadasakhadi: redondear(bruto - pensia - e.neto), koeficienti: 1 / dartchena };
  },
  resultado: [
    { clave: "bruto", etiqueta: "საჭირო დარიცხული ხელფასი (ბრუტო)", formato: "moneda", destacada: true },
    { clave: "gadasakhadi", etiqueta: "საშემოსავლო გადასახადი", formato: "moneda" },
    { clave: "pensia", etiqueta: "დასაქმებულის საპენსიო შენატანი", formato: "moneda", ocultarSiCero: true },
    { clave: "koeficienti", etiqueta: "ნეტოს გამრავლების კოეფიციენტი", formato: "numero", decimales: 4 },
  ],
});
