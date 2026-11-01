import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.leigutekjur",
  mercado: "is",
  concepto: "propio",
  slug: "leigutekjur",
  estado: "publicado",
  requiere: { "is.fjarmagnstekjuskattur": "numero", "is.leigutekjur-stofn": "numero" },
  campos: [{ id: "leiga", tipo: "moneda", etiqueta: "Leigutekjur á ári", min: 0, porDefecto: 3000000 }],
  calcular(e, v, { redondear }) {
    if (e.leiga <= 0) throw new ErrorEntrada("Sláðu inn leigutekjur hærri en núll.", "leiga");
    const stofn = redondear(porcentaje(e.leiga, v["is.leigutekjur-stofn"]));
    const skattur = redondear(porcentaje(stofn, v["is.fjarmagnstekjuskattur"]));
    return { stofn, skattur, eftir: e.leiga - skattur, manadar: redondear((e.leiga - skattur) / 12) };
  },
  resultado: [
    { clave: "stofn", etiqueta: "Skattstofn", formato: "moneda" },
    { clave: "skattur", etiqueta: "Skattur af leigutekjum", formato: "moneda", destacada: true },
    { clave: "eftir", etiqueta: "Eftir skatt á ári", formato: "moneda" },
    { clave: "manadar", etiqueta: "Eftir skatt á mánuði", formato: "moneda" },
  ],
});
