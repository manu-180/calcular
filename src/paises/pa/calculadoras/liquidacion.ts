import { definirCalculadora, enMapa } from "@/motor/calculo";
import {
  mesesConFraccion,
  mesesEnPeriodoDecimo,
  semanalDeMensual,
  semanasIndemnizacion,
  textoTiempo,
  tiempoTrabajado,
  validarFechas,
  validarIngresoLey44,
} from "../reglas";

export default definirCalculadora({
  id: "pa.liquidacion",
  mercado: "pa",
  concepto: "liquidacion-final",
  slug: "liquidacion",
  estado: "publicado",
  requiere: {
    "pa.prima-antiguedad-semanas": "numero",
    "pa.indemnizacion-semanas": "mapa",
    "pa.vacaciones-meses": "numero",
    "pa.decimo-divisor": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      ayuda: "Tu salario de los últimos meses, con horas extra y comisiones.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo terminó la relación de trabajo",
      opciones: [
        { valor: "despido-injustificado", etiqueta: "Despido injustificado" },
        { valor: "renuncia", etiqueta: "Renuncia" },
        { valor: "despido-justificado", etiqueta: "Despido con causa justificada" },
        { valor: "mutuo-acuerdo", etiqueta: "Mutuo acuerdo" },
      ],
      porDefecto: "despido-injustificado",
    },
    {
      id: "indefinido",
      tipo: "si-no",
      etiqueta: "Tu contrato era por tiempo indefinido",
      ayuda: "Si era por obra o por un plazo fijo, marca que no.",
      porDefecto: true,
    },
    {
      id: "mesesVacaciones",
      tipo: "numero",
      etiqueta: "Meses trabajados desde tus últimas vacaciones",
      ayuda: "Si no tomaste vacaciones en un período completo, súmalo también.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { salario, fechaIngreso, fechaSalida, motivo, indefinido } = entrada;
    validarFechas(fechaIngreso, fechaSalida);
    const injustificado = indefinido && motivo === "despido-injustificado";
    if (injustificado) validarIngresoLey44(fechaIngreso);
    const t = tiempoTrabajado(fechaIngreso, fechaSalida);
    const anios = mesesConFraccion(t) / 12;
    const semanal = semanalDeMensual(salario);

    const prima = indefinido ? redondear(semanal * anios * valores["pa.prima-antiguedad-semanas"]) : 0;
    const semanasInd = injustificado
      ? semanasIndemnizacion(
          anios,
          enMapa(valores["pa.indemnizacion-semanas"], "primeros-10-anios"),
          enMapa(valores["pa.indemnizacion-semanas"], "desde-anio-11"),
        )
      : 0;
    const indemnizacion = redondear(semanal * semanasInd);
    const vacaciones = redondear((salario * entrada.mesesVacaciones) / valores["pa.vacaciones-meses"]);
    const baseDecimo = salario * mesesEnPeriodoDecimo(fechaIngreso, fechaSalida) + vacaciones;
    const decimo = redondear(baseDecimo / valores["pa.decimo-divisor"]);

    const observaciones: string[] = [];
    if (!indefinido) observaciones.push("En un contrato por obra o por tiempo definido no hay prima de antigüedad. Si te despidieron antes del plazo sin causa, te deben los salarios hasta el final del contrato (artículo 227).");
    if (indefinido && motivo === "despido-injustificado") observaciones.push("La indemnización corresponde si el despido fue injustificado. Si hay disputa, la decide la autoridad de trabajo.");
    observaciones.push("El décimo proporcional incluye las vacaciones que te pagan al salir, como en el ejemplo del MITRADEL. Las vacaciones y el décimo llevan descuentos de Seguro Social.");

    return {
      tiempo: textoTiempo(t),
      prima,
      indemnizacion,
      vacaciones,
      decimo,
      total: redondear(prima + indemnizacion + vacaciones + decimo),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "prima", etiqueta: "Prima de antigüedad", formato: "moneda", ocultarSiCero: true },
    { clave: "indemnizacion", etiqueta: "Indemnización por despido injustificado", formato: "moneda", ocultarSiCero: true },
    { clave: "vacaciones", etiqueta: "Vacaciones proporcionales", formato: "moneda" },
    { clave: "decimo", etiqueta: "Décimo tercer mes proporcional", formato: "moneda" },
    { clave: "total", etiqueta: "Total de la liquidación (bruto)", formato: "moneda", destacada: true },
  ],
});
