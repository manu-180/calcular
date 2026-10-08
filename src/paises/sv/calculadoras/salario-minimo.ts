import { definirCalculadora, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "sv.salario-minimo",
  mercado: "sv",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "sv.salario-minimo": "numero-por-region",
    "sv.salario-minimo-diario": "numero-por-region",
    "sv.jornada-diurna": "numero",
  },
  campos: [{ id: "region", tipo: "region", etiqueta: "Sector", porDefecto: "comercio-servicios" }],
  calcular(entrada, valores, { redondear }) {
    const mensual = porRegion(valores["sv.salario-minimo"], entrada.region);
    const diario = porRegion(valores["sv.salario-minimo-diario"], entrada.region);
    return {
      mensual,
      quincenal: redondear(mensual / 2),
      diario,
      hora: diario / valores["sv.jornada-diurna"],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Salario mínimo mensual", formato: "moneda", destacada: true },
    { clave: "quincenal", etiqueta: "Por quincena", formato: "moneda" },
    { clave: "diario", etiqueta: "Por día (según el decreto)", formato: "moneda", decimales: 3 },
    { clave: "hora", etiqueta: "Por hora de jornada diurna", formato: "moneda", decimales: 3 },
  ],
});
