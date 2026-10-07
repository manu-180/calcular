import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { corteAguinaldo, DIAS_ANIO, MES_INICIO_AGUINALDO, periodoTrabajado } from "../prestaciones";

export default definirCalculadora({
  id: "gt.aguinaldo",
  mercado: "gt",
  concepto: "bono-semestral",
  slug: "aguinaldo",
  estado: "publicado",
  requiere: {
    "gt.aguinaldo": "numero",
    "gt.aguinaldo-pago-diciembre": "numero",
    "gt.aguinaldo-jornadas-campo": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario ordinario mensual",
      min: 0,
      ayuda: "Sin la bonificación incentivo ni horas extra.",
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha en que empezó a trabajar" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Qué quiere calcular",
      opciones: [
        { valor: "diciembre", etiqueta: "El aguinaldo de diciembre y enero" },
        { valor: "salida", etiqueta: "La parte que le toca porque dejó de trabajar" },
      ],
      porDefecto: "diciembre",
    },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", requerido: false, ayuda: "Solo si dejó de trabajar." },
  ],
  calcular(entrada, valores, { fecha, redondear }) {
    let corte: typeof entrada.fechaIngreso;
    if (entrada.motivo === "salida") {
      if (entrada.fechaSalida === null) throw new ErrorEntrada("Indique su último día de trabajo.", "fechaSalida");
      corte = entrada.fechaSalida;
    } else corte = corteAguinaldo(fecha);
    if (entrada.fechaIngreso > corte) throw new ErrorEntrada("La fecha de ingreso no puede ser posterior al cierre del período.", "fechaIngreso");
    const periodo = periodoTrabajado(entrada.fechaIngreso, corte, MES_INICIO_AGUINALDO);
    const anual = porcentaje(entrada.salario, valores["gt.aguinaldo"]);
    const aguinaldo = redondear((anual * periodo.dias) / DIAS_ANIO);
    const enDiciembre = entrada.motivo === "diciembre" ? redondear(porcentaje(aguinaldo, valores["gt.aguinaldo-pago-diciembre"])) : null;
    const enEnero = enDiciembre === null ? null : redondear(aguinaldo - enDiciembre);
    const observaciones: string[] = [];
    if (periodo.dias < DIAS_ANIO) observaciones.push("No completó el año, así que le corresponde la parte proporcional a los días trabajados.");
    if (entrada.motivo === "salida") observaciones.push("Al terminar la relación laboral, esta parte se paga de inmediato.");
    else observaciones.push("Si la empresa paga todo en diciembre, no tiene que pagar nada más en enero.");
    observaciones.push(`Si trabaja en el campo o su contrato no le pide trabajar todos los días, necesita al menos ${valores["gt.aguinaldo-jornadas-campo"]} jornadas en el año para tener derecho.`);
    observaciones.push("El aguinaldo no paga impuestos ni cuotas del IGSS.");
    return { desde: periodo.desde, hasta: corte, dias: periodo.dias, aguinaldo, enDiciembre, enEnero, observaciones };
  },
  resultado: [
    { clave: "desde", etiqueta: "Se cuenta desde", formato: "fecha" },
    { clave: "hasta", etiqueta: "Hasta", formato: "fecha" },
    { clave: "dias", etiqueta: "Días que cuentan", formato: "dias" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo", formato: "moneda", destacada: true },
    { clave: "enDiciembre", etiqueta: "Primera quincena de diciembre", formato: "moneda" },
    { clave: "enEnero", etiqueta: "Segunda quincena de enero", formato: "moneda" },
  ],
});
