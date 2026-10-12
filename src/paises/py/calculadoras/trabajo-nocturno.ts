import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.trabajo-nocturno",
  mercado: "py",
  concepto: "propio",
  slug: "trabajo-nocturno",
  estado: "publicado",
  requiere: {
    "py.recargo-nocturno": "numero",
    "py.divisor-salario-diario": "numero",
    "py.horas-jornada-nocturna": "numero",
    "py.minimos": "mapa",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual por el mismo trabajo de día",
      ayuda: "Si cobrás el mínimo, poné el salario mínimo diurno.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const recargo = redondear(porcentaje(entrada.salario, valores["py.recargo-nocturno"]));
    const nocturno = redondear(entrada.salario + recargo);
    // Res. MTESS 670/2026: el diario es el mensual dividido 30 y la hora nocturna, el diario dividido 7.
    const diario = nocturno / valores["py.divisor-salario-diario"];
    const minimo = enMapa(valores["py.minimos"], "mensual-nocturno");
    const observaciones = ["La jornada nocturna va de las 20 a las 6 y dura como máximo 7 horas por día (42 por semana)."];
    if (nocturno < minimo) observaciones.push("Queda debajo del salario mínimo nocturno. Tu empleador te tiene que pagar al menos ese mínimo.");
    observaciones.push("Si una parte de tu jornada es de día y otra de noche, es jornada mixta: cada hora se paga según su horario.");
    return {
      recargo,
      nocturno,
      diario: redondear(diario),
      hora: redondear(diario / valores["py.horas-jornada-nocturna"]),
      minimo,
      observaciones,
    };
  },
  resultado: [
    { clave: "nocturno", etiqueta: "Salario mensual nocturno", formato: "moneda", destacada: true },
    { clave: "recargo", etiqueta: "Recargo nocturno por mes", formato: "moneda" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "hora", etiqueta: "Hora nocturna", formato: "moneda" },
    { clave: "minimo", etiqueta: "Salario mínimo nocturno", formato: "moneda" },
  ],
});
