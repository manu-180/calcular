import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.dagpeningar",
  mercado: "is",
  concepto: "propio",
  slug: "dagpeningar",
  estado: "publicado",
  requiere: { "is.dagpeningar": "mapa" },
  campos: [
    { id: "tegund", tipo: "opcion-dato", dato: "is.dagpeningar", etiqueta: "Tegund", porDefecto: "gisting-faedi" },
    { id: "fjoldi", tipo: "entero", etiqueta: "Fjöldi daga eða nátta", min: 1, max: 365, porDefecto: 2 },
  ],
  calcular(e, v) {
    if (e.fjoldi < 1) throw new ErrorEntrada("Sláðu inn að minnsta kosti einn dag.", "fjoldi");
    const a = enMapa(v["is.dagpeningar"], e.tegund);
    return { a, samtals: a * e.fjoldi };
  },
  resultado: [
    { clave: "a", etiqueta: "Á dag eða nótt", formato: "moneda" },
    { clave: "samtals", etiqueta: "Dagpeningar samtals", formato: "moneda", destacada: true },
  ],
});
