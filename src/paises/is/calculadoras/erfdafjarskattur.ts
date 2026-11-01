import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.erfdafjarskattur",
  mercado: "is",
  concepto: "propio",
  slug: "erfdafjarskattur",
  estado: "publicado",
  requiere: { "is.erfdafjarskattur": "numero", "is.erfdafjarskattur-fritekjumark": "numero" },
  campos: [{ id: "bu", tipo: "moneda", etiqueta: "Skattskyld fjárhæð dánarbús", min: 0, porDefecto: 20000000 }],
  calcular(e, v, { redondear }) {
    if (e.bu <= 0) throw new ErrorEntrada("Sláðu inn fjárhæð hærri en núll.", "bu");
    const frjals = Math.min(e.bu, v["is.erfdafjarskattur-fritekjumark"]);
    const stofn = e.bu - frjals;
    const skattur = redondear(porcentaje(stofn, v["is.erfdafjarskattur"]));
    return { frjals, stofn, skattur, eftir: e.bu - skattur };
  },
  resultado: [
    { clave: "frjals", etiqueta: "Skattfrjáls hluti", formato: "moneda" },
    { clave: "stofn", etiqueta: "Skattstofn", formato: "moneda" },
    { clave: "skattur", etiqueta: "Erfðafjárskattur", formato: "moneda", destacada: true },
    { clave: "eftir", etiqueta: "Eftir skatt", formato: "moneda" },
  ],
});
