import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.feriados",
  mercado: "cr",
  concepto: "propio",
  slug: "feriados",
  estado: "publicado",
  requiere: {
    "cr.dias-mes-planilla": "numero",
    "cr.feriado-factor-trabajado": "numero",
    "cr.feriado-factor-horas-extra": "numero",
    "cr.recargo-horas-extra": "numero",
  },
  campos: [
    {
      id: "modalidad",
      tipo: "opcion",
      etiqueta: "Cómo le pagan",
      opciones: [
        { valor: "mensual", etiqueta: "Por mes o por quincena" },
        { valor: "semanal-comercio", etiqueta: "Por semana, en un comercio" },
        { valor: "semanal", etiqueta: "Por semana, en otra actividad (solo los días trabajados)" },
      ],
      porDefecto: "mensual",
    },
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario",
      ayuda: "Si le pagan por mes o quincena, escriba el salario mensual. Si le pagan por semana, el salario de un día.",
      min: 0,
    },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Tipo de feriado",
      opciones: [
        { valor: "obligatorio", etiqueta: "De pago obligatorio (1 de enero, 11 de abril, Jueves y Viernes Santo, 1 de mayo, 25 de julio, 15 de agosto, 15 de setiembre, 25 de diciembre)" },
        { valor: "no-obligatorio", etiqueta: "De pago no obligatorio (2 de agosto, 31 de agosto, 1 de diciembre)" },
      ],
      porDefecto: "obligatorio",
    },
    { id: "trabajo", tipo: "si-no", etiqueta: "Trabajó ese feriado", porDefecto: true },
    { id: "horasExtra", tipo: "numero", etiqueta: "Horas extra trabajadas ese día", min: 0, max: 4, porDefecto: 0 },
    { id: "horasJornada", tipo: "numero", etiqueta: "Horas de su jornada ordinaria diaria", min: 1, max: 10, porDefecto: 8 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.horasExtra > 0 && !entrada.trabajo) throw new ErrorEntrada("Si no trabajó el feriado, no puede tener horas extra ese día.", "horasExtra");
    const diario = entrada.modalidad === "mensual" ? entrada.salario / valores["cr.dias-mes-planilla"] : entrada.salario;
    const hora = diario / entrada.horasJornada;
    const doble = valores["cr.feriado-factor-trabajado"];
    const obligatorio = entrada.tipo === "obligatorio";
    const incluido = entrada.modalidad !== "semanal";

    let pagoFeriado: number;
    let factorExtra = valores["cr.feriado-factor-horas-extra"];
    const observaciones: string[] = [];
    if (incluido) {
      // Con pago mensual o semanal en comercio, los doce feriados ya vienen en el salario: si se trabaja,
      // se suma un día sencillo para completar el pago doble (carta MTSS de feriados 2026).
      pagoFeriado = entrada.trabajo ? diario * (doble - 1) : 0;
      observaciones.push("Su salario ya incluye el pago de todos los feriados. Lo que ve arriba es lo que se suma por trabajarlo.");
    } else if (obligatorio) {
      pagoFeriado = entrada.trabajo ? diario * doble : diario;
      if (!entrada.trabajo) observaciones.push("Aunque no lo trabaje, el feriado de pago obligatorio se le paga como un día sencillo.");
    } else {
      pagoFeriado = entrada.trabajo ? diario : 0;
      factorExtra = 1 + valores["cr.recargo-horas-extra"] / 100;
      observaciones.push("Con pago semanal, un feriado de pago no obligatorio se paga solo si se trabaja, como un día normal.");
    }
    const horasExtra = redondear(hora * factorExtra * entrada.horasExtra);
    const feriado = redondear(pagoFeriado);
    return {
      salarioDiario: redondear(diario),
      valorHora: redondear(hora),
      pagoFeriado: feriado,
      horasExtra,
      total: redondear(feriado + horasExtra),
      observaciones,
    };
  },
  resultado: [
    { clave: "salarioDiario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "valorHora", etiqueta: "Valor de la hora ordinaria", formato: "moneda" },
    { clave: "pagoFeriado", etiqueta: "Pago adicional por el feriado", formato: "moneda" },
    { clave: "horasExtra", etiqueta: "Pago de las horas extra", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total adicional a su salario", formato: "moneda", destacada: true },
  ],
});
