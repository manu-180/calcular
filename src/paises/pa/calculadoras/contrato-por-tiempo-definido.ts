import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { mesesConFraccion, mesesEnPeriodoDecimo, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "pa.contrato-por-tiempo-definido",
  mercado: "pa",
  concepto: "propio",
  slug: "contrato-por-tiempo-definido",
  estado: "publicado",
  requiere: {
    "pa.vacaciones-meses": "numero",
    "pa.decimo-divisor": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día que trabajaste", porDefecto: "hoy" },
    { id: "fechaFin", tipo: "fecha", etiqueta: "Fecha en que terminaba el contrato" },
    {
      id: "mesesVacaciones",
      tipo: "numero",
      etiqueta: "Meses trabajados desde tus últimas vacaciones",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { salario, fechaIngreso, fechaSalida, fechaFin } = entrada;
    validarFechas(fechaIngreso, fechaSalida);
    if (fechaFin <= fechaSalida) throw new ErrorEntrada("La fecha de fin del contrato tiene que ser posterior a tu último día de trabajo.", "fechaFin");
    const restante = tiempoTrabajado(sumarDias(fechaSalida, 1), fechaFin);
    const salariosRestantes = redondear(salario * mesesConFraccion(restante));
    const vacaciones = redondear((salario * entrada.mesesVacaciones) / valores["pa.vacaciones-meses"]);
    const decimo = redondear((salario * mesesEnPeriodoDecimo(fechaIngreso, fechaSalida) + vacaciones) / valores["pa.decimo-divisor"]);
    return {
      tiempoRestante: textoTiempo(restante),
      salariosRestantes,
      vacaciones,
      decimo,
      total: redondear(salariosRestantes + vacaciones + decimo),
      observaciones: [
        "Te deben los salarios hasta el final del contrato si el empleador lo terminó antes y sin causa justificada.",
        "En un contrato por tiempo definido no hay prima de antigüedad. Si te firmaron contratos seguidos o seguiste trabajando después del vencimiento, la relación puede ser por tiempo indefinido (artículo 77) y el cálculo cambia.",
      ],
    };
  },
  resultado: [
    { clave: "tiempoRestante", etiqueta: "Tiempo que faltaba del contrato", formato: "texto" },
    { clave: "salariosRestantes", etiqueta: "Salarios hasta el final del contrato", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "Vacaciones proporcionales", formato: "moneda" },
    { clave: "decimo", etiqueta: "Décimo tercer mes proporcional", formato: "moneda" },
    { clave: "total", etiqueta: "Total a cobrar (bruto)", formato: "moneda", destacada: true },
  ],
});
