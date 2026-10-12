import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.salario-diario",
  mercado: "do",
  concepto: "propio",
  slug: "salario-diario",
  estado: "publicado",
  requiere: {
    "do.divisor-salario-diario": "numero",
    "do.divisor-salario-quincenal": "numero",
    "do.divisor-salario-semanal": "numero",
    "do.jornada-diaria": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario", ayuda: "Sin horas extra ni comisiones.", min: 0 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "Cada cuánto te pagan ese monto",
      opciones: [
        { valor: "mensual", etiqueta: "Por mes" },
        { valor: "quincenal", etiqueta: "Por quincena" },
        { valor: "semanal", etiqueta: "Por semana" },
      ],
      porDefecto: "mensual",
    },
    { id: "jornada", tipo: "numero", etiqueta: "Horas de tu jornada por día", min: 1, max: 8, porDefecto: 8 },
  ],
  calcular(entrada, valores, { redondear }) {
    const divisor =
      entrada.periodo === "quincenal"
        ? valores["do.divisor-salario-quincenal"]
        : entrada.periodo === "semanal"
          ? valores["do.divisor-salario-semanal"]
          : valores["do.divisor-salario-diario"];
    const maxima = valores["do.jornada-diaria"];
    if (entrada.jornada > maxima) throw new ErrorEntrada(`La jornada normal no puede pasar de ${maxima} horas por día.`, "jornada");
    const jornada = entrada.jornada;
    return {
      divisor,
      diario: redondear(entrada.salario / divisor),
      hora: redondear(entrada.salario / divisor / jornada),
      observaciones: ["Es el salario diario que se usa para vacaciones, preaviso, cesantía, bonificación y horas extra."],
    };
  },
  resultado: [
    { clave: "divisor", etiqueta: "Divisor que manda el reglamento", formato: "numero", decimales: 2 },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Valor de la hora normal", formato: "moneda" },
  ],
});
