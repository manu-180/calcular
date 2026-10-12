import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.recargo-nocturno",
  mercado: "do",
  concepto: "propio",
  slug: "recargo-nocturno",
  estado: "publicado",
  requiere: {
    "do.divisor-salario-diario": "numero",
    "do.jornada-diaria": "numero",
    "do.recargo-nocturno": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "jornada", tipo: "numero", etiqueta: "Horas de tu jornada normal por día", min: 1, max: 8, porDefecto: 8 },
    {
      id: "horas",
      tipo: "numero",
      etiqueta: "Horas trabajadas de noche en el mes",
      ayuda: "Las que caen entre las 9 de la noche y las 7 de la mañana.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const maxima = valores["do.jornada-diaria"];
    if (entrada.jornada > maxima) throw new ErrorEntrada(`La jornada normal no puede pasar de ${maxima} horas por día.`, "jornada");
    const hora = redondear(entrada.salario / valores["do.divisor-salario-diario"] / entrada.jornada);
    const recargoHora = porcentaje(hora, valores["do.recargo-nocturno"]);
    return {
      hora,
      recargoHora: redondear(recargoHora),
      horaNocturna: redondear(hora + recargoHora),
      total: redondear(recargoHora * entrada.horas),
      observaciones: ["El recargo se suma a tu salario. Si esas horas además son extra, también llevan el recargo de horas extra."],
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Valor de tu hora normal", formato: "moneda" },
    { clave: "recargoHora", etiqueta: "Recargo por cada hora nocturna", formato: "moneda" },
    { clave: "horaNocturna", etiqueta: "Valor de la hora nocturna", formato: "moneda" },
    { clave: "total", etiqueta: "Recargo nocturno del mes", formato: "moneda", destacada: true },
  ],
});
