import { definirCalculadora, enMapa, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.salario-minimo",
  mercado: "gt",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "gt.salario-minimo-diario": "mapa-por-region",
    "gt.salario-minimo-mensual": "mapa-por-region",
    "gt.jornada-horas": "mapa",
  },
  campos: [
    { id: "region", tipo: "region", etiqueta: "Dónde está su centro de trabajo", porDefecto: "ce1" },
    {
      id: "actividad",
      tipo: "opcion",
      etiqueta: "Actividad",
      opciones: [
        { valor: "no-agricola", etiqueta: "No agrícola (comercio, servicios, industria y demás)" },
        { valor: "agricola", etiqueta: "Agrícola" },
        { valor: "exportadora-maquila", etiqueta: "Exportadora y de maquila" },
      ],
      porDefecto: "no-agricola",
    },
    { id: "sueldo", tipo: "moneda", etiqueta: "Su salario mensual (opcional, para compararlo)", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = enMapa(porRegion(valores["gt.salario-minimo-diario"], entrada.region), entrada.actividad);
    const mensual = enMapa(porRegion(valores["gt.salario-minimo-mensual"], entrada.region), entrada.actividad);
    const hora = redondear(diario / enMapa(valores["gt.jornada-horas"], "diurna"));
    const observaciones = ["Además del salario mínimo, el patrono tiene que pagar la bonificación incentivo, completa y sin dividirla."];
    let diferencia: number | null = null;
    if (entrada.sueldo !== null) {
      diferencia = redondear(entrada.sueldo - mensual);
      observaciones.push(
        diferencia < 0
          ? "Su salario está por debajo del mínimo. Por una jornada completa no le pueden pagar menos."
          : "Su salario está en el mínimo o por encima.",
      );
    }
    return { diario, mensual, hora, diferencia, observaciones };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Salario mínimo mensual", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "Salario mínimo diario", formato: "moneda" },
    { clave: "hora", etiqueta: "Por hora en jornada diurna", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Diferencia entre su salario y el mínimo", formato: "moneda" },
  ],
});
