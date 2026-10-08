import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "ve.salario-minimo",
  mercado: "ve",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "ve.salario-minimo": "numero",
    "ve.salario-minimo-aprendiz": "numero",
    "ve.dias-mes-salario": "numero",
    "ve.tasa-bcv-usd": "serie",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Para quién",
      opciones: [
        { valor: "general", etiqueta: "Trabajadores en general (sector público y privado)" },
        { valor: "aprendiz", etiqueta: "Adolescentes aprendices" },
      ],
      porDefecto: "general",
    },
    { id: "meses", tipo: "entero", etiqueta: "Meses a calcular", min: 1, max: 12, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const mensual = entrada.tipo === "general" ? valores["ve.salario-minimo"] : valores["ve.salario-minimo-aprendiz"];
    const { fecha, valor: tasa } = valores["ve.tasa-bcv-usd"];
    const total = redondear(mensual * entrada.meses);
    return {
      mensual,
      diario: redondear(mensual / valores["ve.dias-mes-salario"]),
      total,
      tasa,
      fechaTasa: fecha,
      enDolares: redondear(total / tasa),
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Salario mínimo mensual", formato: "moneda", moneda: "VES" },
    { clave: "diario", etiqueta: "Salario mínimo diario (mensual entre 30)", formato: "moneda", moneda: "VES" },
    { clave: "total", etiqueta: "Salario mínimo de los meses elegidos", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "tasa", etiqueta: "Tasa oficial BCV usada", formato: "moneda", moneda: "VES", decimales: 4 },
    { clave: "fechaTasa", etiqueta: "Tasa vigente desde", formato: "fecha" },
    { clave: "enDolares", etiqueta: "Equivalente en dólares a tasa BCV", formato: "moneda", moneda: "USD" },
  ],
});
