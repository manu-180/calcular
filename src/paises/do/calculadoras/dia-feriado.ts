import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.dia-feriado",
  mercado: "do",
  concepto: "propio",
  slug: "dia-feriado",
  estado: "publicado",
  requiere: {
    "do.divisor-salario-diario": "numero",
    "do.recargo-feriado": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "dias", tipo: "entero", etiqueta: "Días feriados o de descanso que trabajaste", min: 0, porDefecto: 1 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Qué día trabajaste",
      opciones: [
        { valor: "feriado", etiqueta: "Un día feriado" },
        { valor: "descanso", etiqueta: "Mi día de descanso semanal" },
      ],
      porDefecto: "feriado",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = redondear(entrada.salario / valores["do.divisor-salario-diario"]);
    const recargo = redondear(porcentaje(diario, valores["do.recargo-feriado"]));
    const observaciones: string[] = [];
    if (entrada.tipo === "descanso") observaciones.push("En vez del pago extra puedes elegir un descanso igual la semana siguiente (art. 164).");
    else observaciones.push("Ese día ya está pagado en tu salario del mes. El recargo es lo que se suma por trabajarlo.");
    return {
      diario,
      recargo,
      porDia: redondear(diario + recargo),
      total: redondear(recargo * entrada.dias),
      observaciones,
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "recargo", etiqueta: "Recargo por cada día trabajado", formato: "moneda" },
    { clave: "porDia", etiqueta: "Lo que vale cada día trabajado", formato: "moneda" },
    { clave: "total", etiqueta: "Pago extra a cobrar", formato: "moneda", destacada: true },
  ],
});
