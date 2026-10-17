import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "in.gratuity-calculator",
  mercado: "in",
  concepto: "propio",
  slug: "gratuity-calculator",
  estado: "publicado",
  requiere: {
    "in.gratuity-days": "numero",
    "in.gratuity-divisor": "numero",
    "in.gratuity-min-years": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Last monthly wages (basic plus DA)", min: 0, porDefecto: 60000 },
    { id: "anios", tipo: "entero", etiqueta: "Completed years of service", min: 0, max: 60, porDefecto: 8 },
    { id: "meses", tipo: "entero", etiqueta: "Extra months", min: 0, max: 11, porDefecto: 0 },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Why the job ends",
      opciones: [
        { valor: "resignation", etiqueta: "Resignation, retirement or termination" },
        { valor: "death", etiqueta: "Death or disablement" },
        { valor: "fixed-term", etiqueta: "End of a fixed-term contract" },
      ],
      porDefecto: "resignation",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your last monthly wages.", "salario");
    const exactos = entrada.anios + entrada.meses / 12;
    const minimo = v["in.gratuity-min-years"];
    const observaciones: string[] = [];
    let anios: number;
    if (entrada.motivo === "fixed-term") {
      anios = exactos;
      observaciones.push("Fixed-term employees get gratuity in proportion to the time worked.");
    } else {
      anios = entrada.anios + (entrada.meses > 6 ? 1 : 0);
      if (entrada.meses > 6) observaciones.push("More than six months in your last year counts as a full year.");
    }
    const elegible = entrada.motivo !== "resignation" || exactos >= minimo;
    if (!elegible) observaciones.push(`On resignation or retirement you need at least ${minimo} years of continuous service.`);
    const diario = entrada.salario / v["in.gratuity-divisor"];
    const gratuity = elegible ? redondear(diario * v["in.gratuity-days"] * anios) : 0;
    return {
      gratuity,
      anios: redondear(anios),
      porAnio: redondear(diario * v["in.gratuity-days"]),
      elegible: elegible ? "Yes" : "Not yet",
      observaciones,
    };
  },
  resultado: [
    { clave: "gratuity", etiqueta: "Gratuity payable", formato: "moneda", destacada: true },
    { clave: "elegible", etiqueta: "Eligible", formato: "texto" },
    { clave: "anios", etiqueta: "Years counted", formato: "numero", decimales: 2 },
    { clave: "porAnio", etiqueta: "Gratuity for each year", formato: "moneda" },
  ],
});
