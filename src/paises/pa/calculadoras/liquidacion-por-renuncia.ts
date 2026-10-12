import { definirCalculadora } from "@/motor/calculo";
import { mesesConFraccion, mesesEnPeriodoDecimo, semanalDeMensual, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "pa.liquidacion-por-renuncia",
  mercado: "pa",
  concepto: "propio",
  slug: "liquidacion-por-renuncia",
  estado: "publicado",
  requiere: {
    "pa.prima-antiguedad-semanas": "numero",
    "pa.vacaciones-meses": "numero",
    "pa.decimo-divisor": "numero",
    "pa.penalidad-sin-preaviso-semanas": "numero",
    "pa.preaviso-renuncia-dias": "numero",
    "pa.preaviso-renuncia-tecnico-meses": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      ayuda: "Tu salario promedio, con horas extra y comisiones.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
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
      min: 0,
      porDefecto: 0,
    },
    {
      id: "conAviso",
      tipo: "si-no",
      etiqueta: "Diste el aviso de renuncia a tiempo",
      porDefecto: true,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { salario, fechaIngreso, fechaSalida, indefinido } = entrada;
    validarFechas(fechaIngreso, fechaSalida);
    const t = tiempoTrabajado(fechaIngreso, fechaSalida);
    const semanal = semanalDeMensual(salario);
    const prima = indefinido ? redondear(semanal * (mesesConFraccion(t) / 12) * valores["pa.prima-antiguedad-semanas"]) : 0;
    const vacaciones = redondear((salario * entrada.mesesVacaciones) / valores["pa.vacaciones-meses"]);
    const decimo = redondear((salario * mesesEnPeriodoDecimo(fechaIngreso, fechaSalida) + vacaciones) / valores["pa.decimo-divisor"]);
    const descuento = entrada.conAviso ? 0 : redondear(semanal * valores["pa.penalidad-sin-preaviso-semanas"]);

    const observaciones = ["Al renunciar no te toca indemnización, salvo que sea una renuncia por causa justificada que reconozca la autoridad de trabajo."];
    if (!entrada.conAviso) observaciones.push(`Sin el aviso de ${valores["pa.preaviso-renuncia-dias"]} días, el empleador puede descontarte una semana de salario.`);
    if (!indefinido) observaciones.push("En un contrato por obra o por tiempo definido no hay prima de antigüedad.");

    return {
      tiempo: textoTiempo(t),
      prima,
      vacaciones,
      decimo,
      descuento,
      total: redondear(prima + vacaciones + decimo - descuento),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "prima", etiqueta: "Prima de antigüedad", formato: "moneda", ocultarSiCero: true },
    { clave: "vacaciones", etiqueta: "Vacaciones proporcionales", formato: "moneda" },
    { clave: "decimo", etiqueta: "Décimo tercer mes proporcional", formato: "moneda" },
    { clave: "descuento", etiqueta: "Descuento por no dar el aviso", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total a cobrar (bruto)", formato: "moneda", destacada: true },
  ],
});
