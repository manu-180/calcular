import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.sueldo-minimo",
  mercado: "pe",
  concepto: "salario-minimo",
  slug: "sueldo-minimo",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
  },
  campos: [
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Tu sueldo mensual por jornada completa",
      ayuda: "Opcional. Para saber si cobras menos del mínimo.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const rmv = valores["pe.rmv"];
    const asignacion = redondear(porcentaje(rmv, valores["pe.asignacion-familiar"]));
    const diferencia = entrada.sueldo === null ? null : redondear(Math.max(0, rmv - entrada.sueldo));
    const observaciones: string[] = [];
    if (diferencia !== null && diferencia > 0) observaciones.push("Tu sueldo está por debajo de la remuneración mínima para una jornada completa de 8 horas.");
    return {
      rmv,
      asignacion,
      conAsignacion: redondear(rmv + asignacion),
      porDia: redondear(rmv / 30),
      porHora: redondear(rmv / 30 / 8),
      diferencia,
      observaciones,
    };
  },
  resultado: [
    { clave: "rmv", etiqueta: "Remuneración mínima vital", formato: "moneda", destacada: true },
    { clave: "asignacion", etiqueta: "Asignación familiar (10 % de la RMV)", formato: "moneda" },
    { clave: "conAsignacion", etiqueta: "Mínimo con asignación familiar", formato: "moneda" },
    { clave: "porDia", etiqueta: "Por día", formato: "moneda" },
    { clave: "porHora", etiqueta: "Por hora (jornada de 8 horas)", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Lo que te falta para llegar al mínimo", formato: "moneda", ocultarSiCero: true },
  ],
});
