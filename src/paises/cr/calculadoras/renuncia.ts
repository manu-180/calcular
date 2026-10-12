import { definirCalculadora } from "@/motor/calculo";
import { cumpleUnMes, diasPreaviso, mesesEnPeriodo, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "cr.renuncia",
  mercado: "cr",
  concepto: "propio",
  slug: "renuncia",
  estado: "publicado",
  requiere: {
    "cr.dias-mes-planilla": "numero",
    "cr.preaviso-dias": "mapa",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario promedio mensual de los últimos seis meses",
      ayuda: "Bruto, con horas extra y comisiones incluidas.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "preavisoDado",
      tipo: "si-no",
      etiqueta: "Avisó la renuncia con la anticipación de ley",
      ayuda: "Una semana, quince días o un mes, según su antigüedad.",
      porDefecto: true,
    },
    {
      id: "vacaciones",
      tipo: "numero",
      etiqueta: "Días de vacaciones que no disfrutó",
      ayuda: "Si no lo sabe, cuente un día por cada mes trabajado desde sus últimas vacaciones.",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "salariosAguinaldo",
      tipo: "moneda",
      etiqueta: "Salarios ganados desde el 1 de diciembre",
      ayuda: "Si lo deja vacío, lo estimamos con su salario promedio.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { salario, fechaIngreso, fechaSalida } = entrada;
    validarFechas(fechaIngreso, fechaSalida);
    const t = tiempoTrabajado(fechaIngreso, fechaSalida);
    const diario = salario / valores["cr.dias-mes-planilla"];
    const vacaciones = redondear(diario * entrada.vacaciones);
    const baseAguinaldo = entrada.salariosAguinaldo ?? salario * mesesEnPeriodo(fechaIngreso, fechaSalida);
    const aguinaldo = cumpleUnMes(t) ? redondear(baseAguinaldo / 12) : 0;
    const dPreaviso = diasPreaviso(t, valores["cr.preaviso-dias"]);
    const montoPreaviso = entrada.preavisoDado ? 0 : redondear(diario * dPreaviso);

    const observaciones = [
      "Al renunciar no se paga cesantía ni preaviso a su favor. Sí le pagan las vacaciones pendientes y el aguinaldo proporcional.",
      "El Fondo de Capitalización Laboral (FCL) se retira aparte, en la operadora de pensiones.",
    ];
    if (montoPreaviso > 0) {
      observaciones.push("Si no dio el preaviso, el patrono le puede cobrar ese monto. Si no lo reclama dentro de 30 días, pierde ese derecho.");
    }
    if (entrada.salariosAguinaldo === null) observaciones.push("El aguinaldo es una estimación con su salario promedio.");

    return {
      tiempo: textoTiempo(t),
      salarioDiario: redondear(diario),
      vacaciones,
      aguinaldo,
      total: redondear(vacaciones + aguinaldo),
      diasPreaviso: dPreaviso,
      montoPreaviso,
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "salarioDiario", etiqueta: "Salario diario (promedio entre 30)", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "Vacaciones no disfrutadas", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo proporcional", formato: "moneda" },
    { clave: "total", etiqueta: "Total a recibir", formato: "moneda", destacada: true },
    { clave: "diasPreaviso", etiqueta: "Días de preaviso que debía dar", formato: "dias" },
    { clave: "montoPreaviso", etiqueta: "Preaviso que el patrono le puede cobrar", formato: "moneda", ocultarSiCero: true },
  ],
});
