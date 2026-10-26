import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kz.posobie-na-rozhdenie",
  mercado: "kz",
  concepto: "propio",
  slug: "posobie-na-rozhdenie",
  estado: "publicado",
  requiere: {
    "kz.mrp": "numero",
    "kz.posobie-na-rozhdenie-mrp": "mapa",
  },
  campos: [
    { id: "ocherednost", tipo: "opcion-dato", dato: "kz.posobie-na-rozhdenie-mrp", etiqueta: "Какой по счету ребенок", porDefecto: "1-3" },
    { id: "deti", tipo: "entero", etiqueta: "Сколько детей родилось", min: 1, max: 6, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.deti < 1) throw new ErrorEntrada("Укажите хотя бы одного ребенка.", "deti");
    const mrpKolichestvo = enMapa(v["kz.posobie-na-rozhdenie-mrp"], e.ocherednost);
    const naRebenka = redondear(mrpKolichestvo * v["kz.mrp"]);
    return { vsego: redondear(naRebenka * e.deti), naRebenka, mrpKolichestvo };
  },
  resultado: [
    { clave: "vsego", etiqueta: "Единовременное пособие на рождение", formato: "moneda", destacada: true },
    { clave: "naRebenka", etiqueta: "На одного ребенка", formato: "moneda" },
    { clave: "mrpKolichestvo", etiqueta: "Размер в МРП", formato: "numero" },
  ],
});
