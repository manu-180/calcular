import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "no.grunnbelopet",
  mercado: "no",
  concepto: "conversor-unidad",
  slug: "grunnbelopet",
  estado: "publicado",
  requiere: { "no.grunnbelop": "numero" },
  campos: [
    {
      id: "retning",
      tipo: "opcion",
      etiqueta: "Regn om",
      opciones: [
        { valor: "g-til-kr", etiqueta: "Fra G til kroner" },
        { valor: "kr-til-g", etiqueta: "Fra kroner til G" },
      ],
      porDefecto: "g-til-kr",
    },
    { id: "verdi", tipo: "numero", etiqueta: "Antall G eller kroner", min: 0, porDefecto: 6 },
  ],
  calcular(e, v, { redondear }) {
    if (e.verdi <= 0) throw new ErrorEntrada("Skriv inn et tall over null.", "verdi");
    const g = v["no.grunnbelop"];
    const tilKr = e.retning === "g-til-kr";
    return {
      kroner: tilKr ? redondear(e.verdi * g) : null,
      antallG: tilKr ? null : e.verdi / g,
      g,
      perManed: redondear(g / 12),
    };
  },
  resultado: [
    { clave: "kroner", etiqueta: "Kroner", formato: "moneda", destacada: true },
    { clave: "antallG", etiqueta: "Antall G", formato: "numero", decimales: 3, destacada: true },
    { clave: "g", etiqueta: "Grunnbeløpet (1 G)", formato: "moneda" },
    { clave: "perManed", etiqueta: "1 G per måned", formato: "moneda" },
  ],
});
