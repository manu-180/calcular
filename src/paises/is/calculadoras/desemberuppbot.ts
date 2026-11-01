import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.desemberuppbot",
  mercado: "is",
  concepto: "bono-semestral",
  slug: "desemberuppbot",
  estado: "borrador",
  requiere: { "is.desemberuppbot": "numero" },
  campos: [
    { id: "starfshlutfall", tipo: "porcentaje", etiqueta: "Starfshlutfall", min: 0, max: 100, porDefecto: 100 },
    { id: "vikur", tipo: "entero", etiqueta: "Unnar vikur á árinu, án orlofs", min: 0, max: 52, porDefecto: 45 },
  ],
  calcular(e, v, { redondear }) {
    if (e.starfshlutfall <= 0) throw new ErrorEntrada("Sláðu inn starfshlutfall hærra en núll.", "starfshlutfall");
    return { uppbot: redondear((v["is.desemberuppbot"] * e.starfshlutfall * Math.min(e.vikur, 45)) / 100 / 45) };
  },
  resultado: [{ clave: "uppbot", etiqueta: "Desemberuppbót fyrir skatt", formato: "moneda", destacada: true }],
});
