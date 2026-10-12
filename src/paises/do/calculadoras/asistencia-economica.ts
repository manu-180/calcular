import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { antiguedad, textoAntiguedad } from "../lib/fechas";
import { diasAsistencia } from "../lib/terminacion";

export default definirCalculadora({
  id: "do.asistencia-economica",
  mercado: "do",
  concepto: "propio",
  slug: "asistencia-economica",
  estado: "publicado",
  requiere: {
    "do.asistencia-economica-dias": "mapa",
    "do.divisor-salario-diario": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezó el trabajo" },
    { id: "termino", tipo: "fecha", etiqueta: "Fecha en que terminó el contrato", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "Salario promedio mensual del último año", ayuda: "Sin horas extra ni regalía.", min: 0 },
    {
      id: "causa",
      tipo: "opcion",
      etiqueta: "Por qué terminó",
      opciones: [
        { valor: "muerte-trabajador", etiqueta: "Muerte o incapacidad del trabajador" },
        { valor: "enfermedad", etiqueta: "Enfermedad o ausencia justificada de un año" },
        { valor: "empleador", etiqueta: "Muerte o incapacidad del empleador, con cierre del negocio" },
        { valor: "cierre", etiqueta: "Quiebra, cierre o reducción de personal aprobada por Trabajo" },
      ],
      porDefecto: "muerte-trabajador",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.termino < entrada.inicio) throw new ErrorEntrada("La fecha en que terminó tiene que ser posterior a la de inicio.", "termino");
    const a = antiguedad(entrada.inicio, entrada.termino);
    const dias = diasAsistencia(a, valores["do.asistencia-economica-dias"]);
    const diario = redondear(entrada.salario / valores["do.divisor-salario-diario"]);
    const observaciones: string[] = [];
    if (dias === 0) observaciones.push("Con menos de 3 meses de trabajo no corresponde asistencia económica.");
    if (entrada.causa === "muerte-trabajador") observaciones.push("Si el trabajador murió, se paga a quien él designó. Si no designó a nadie, va al cónyuge y a los hijos menores en partes iguales.");
    observaciones.push("La asistencia económica no paga ISR. Las vacaciones y la regalía pendientes se pagan aparte.");
    return { antiguedad: textoAntiguedad(a), diario, dias, asistencia: redondear(diario * dias), observaciones };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "dias", etiqueta: "Días de asistencia económica", formato: "dias" },
    { clave: "asistencia", etiqueta: "Asistencia económica", formato: "moneda", destacada: true },
  ],
});
