import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.valor-hora",
  mercado: "co",
  concepto: "propio",
  slug: "valor-hora",
  estado: "publicado",
  requiere: {
    "co.jornada-semanal": "numero",
  },
  campos: [{ id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Sin auxilio de transporte.", min: 0 }],
  calcular(entrada, valores, { redondear }) {
    const jornada = valores["co.jornada-semanal"];
    // Mismo divisor que horas extras: la jornada semanal repartida en 6 días, por 30 días del mes.
    const horasMes = (jornada * 30) / 6;
    return {
      jornada,
      horasMes,
      valorDia: redondear(entrada.salario / 30),
      valorHora: redondear(entrada.salario / horasMes),
    };
  },
  resultado: [
    { clave: "jornada", etiqueta: "Jornada máxima semanal hoy", formato: "horas" },
    { clave: "horasMes", etiqueta: "Horas al mes para el cálculo", formato: "horas" },
    { clave: "valorDia", etiqueta: "Valor del día", formato: "moneda", decimales: 0 },
    { clave: "valorHora", etiqueta: "Valor de la hora ordinaria", formato: "moneda", decimales: 0, destacada: true },
  ],
});
