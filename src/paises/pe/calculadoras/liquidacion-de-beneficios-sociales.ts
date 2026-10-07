import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { aFecha, aniosMesesDias, mayor, mesesCalendarioCompletos, mesesCalendarioYDias, partes } from "../fechas";

const OPCIONES_REGIMEN = [
  { valor: "general", etiqueta: "Régimen general" },
  { valor: "pequena", etiqueta: "Pequeña empresa (REMYPE)" },
  { valor: "micro", etiqueta: "Microempresa (REMYPE)" },
] as const;

export default definirCalculadora({
  id: "pe.liquidacion",
  mercado: "pe",
  concepto: "liquidacion-final",
  slug: "liquidacion-de-beneficios-sociales",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
    "pe.bonificacion-extraordinaria": "mapa",
    "pe.gratificacion-por-regimen": "mapa",
    "pe.cts-por-regimen": "mapa",
    "pe.vacaciones-por-regimen": "mapa",
  },
  campos: [
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaCese", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    { id: "sueldo", tipo: "moneda", etiqueta: "Último sueldo mensual", min: 0 },
    { id: "asignacionFamiliar", tipo: "si-no", etiqueta: "Cobras asignación familiar", porDefecto: false },
    {
      id: "variable",
      tipo: "moneda",
      etiqueta: "Promedio mensual de pagos variables",
      ayuda: "Comisiones, horas extras u otros pagos regulares. Déjalo vacío si no tienes.",
      min: 0,
      requerido: false,
    },
    {
      id: "ultimaGratificacion",
      tipo: "moneda",
      etiqueta: "Última gratificación que cobraste",
      ayuda: "Sin la bonificación extraordinaria. Un sexto se suma a la CTS trunca.",
      min: 0,
      requerido: false,
    },
    { id: "diasPendientes", tipo: "entero", etiqueta: "Días de vacaciones ganadas que no tomaste", min: 0, max: 120, porDefecto: 0 },
    { id: "regimen", tipo: "opcion", etiqueta: "Régimen laboral de tu empleador", opciones: OPCIONES_REGIMEN, porDefecto: "general" },
    { id: "seguro", tipo: "opcion-dato", etiqueta: "Tu seguro de salud", dato: "pe.bonificacion-extraordinaria", porDefecto: "essalud" },
  ],
  calcular(entrada, valores, { redondear }) {
    const { fechaIngreso, fechaCese } = entrada;
    if (fechaCese < fechaIngreso) throw new ErrorEntrada("El último día de trabajo tiene que ser posterior a la fecha de ingreso.", "fechaCese");
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const remuneracion = redondear(entrada.sueldo + asignacion + (entrada.variable ?? 0));
    const servicio = aniosMesesDias(fechaIngreso, fechaCese);
    const unMes = servicio.anios > 0 || servicio.meses > 0;
    const esMicro = entrada.regimen === "micro";
    const observaciones: string[] = [];

    const c = partes(fechaCese);
    const inicioCts = c.mes >= 11 ? aFecha(c.anio, 11, 1) : c.mes >= 5 ? aFecha(c.anio, 5, 1) : aFecha(c.anio - 1, 11, 1);
    const periodoCts = mesesCalendarioYDias(mayor(fechaIngreso, inicioCts), fechaCese);
    let ctsTrunca = 0;
    if (!esMicro && unMes) {
      const factor = enMapa(valores["pe.cts-por-regimen"], entrada.regimen);
      const rc = remuneracion + redondear((entrada.ultimaGratificacion ?? 0) / 6);
      ctsTrunca = redondear(((rc * factor) / 12) * periodoCts.meses + ((rc * factor) / 360) * periodoCts.dias);
    }

    const inicioSemestre = aFecha(c.anio, c.mes <= 6 ? 1 : 7, 1);
    const mesesGrati = mesesCalendarioCompletos(mayor(fechaIngreso, inicioSemestre), fechaCese);
    let gratificacion = 0;
    let bonificacion = 0;
    if (!esMicro) {
      const factor = enMapa(valores["pe.gratificacion-por-regimen"], entrada.regimen);
      gratificacion = redondear((remuneracion * factor * mesesGrati) / 6);
      bonificacion = redondear(porcentaje(gratificacion, enMapa(valores["pe.bonificacion-extraordinaria"], entrada.seguro)));
    }
    if ((c.mes === 7 || c.mes === 12) && c.dia >= 15 && mesesGrati === 6) {
      observaciones.push("Si ya te pagaron la gratificación de este semestre, réstala: no se cobra dos veces.");
    }

    const diasVacaciones = enMapa(valores["pe.vacaciones-por-regimen"], entrada.regimen);
    const remuneracionVacacional = (remuneracion * diasVacaciones) / 30;
    const vacacionesTruncas = unMes ? redondear((remuneracionVacacional / 12) * servicio.meses + (remuneracionVacacional / 360) * servicio.dias) : 0;
    const vacacionesPendientes = redondear((remuneracion / 30) * entrada.diasPendientes);

    if (esMicro) observaciones.push("En la microempresa del régimen especial no se pagan CTS ni gratificación: solo las vacaciones.");
    if (!unMes) observaciones.push("Con menos de un mes de trabajo no se generan CTS ni vacaciones truncas.");
    if (entrada.ultimaGratificacion === null && !esMicro) observaciones.push("Si cobraste gratificación en julio o diciembre, escríbela: un sexto se suma a la CTS.");
    observaciones.push("No incluye la indemnización por despido arbitrario ni la indemnización por vacaciones vencidas: usa sus calculadoras si te corresponden.");

    return {
      remuneracion,
      mesesCts: periodoCts.meses,
      diasCts: periodoCts.dias,
      ctsTrunca,
      mesesGrati,
      gratificacion,
      bonificacion,
      vacacionesTruncas,
      vacacionesPendientes,
      total: redondear(ctsTrunca + gratificacion + bonificacion + vacacionesTruncas + vacacionesPendientes),
      observaciones,
    };
  },
  resultado: [
    { clave: "remuneracion", etiqueta: "Remuneración computable", formato: "moneda" },
    { clave: "ctsTrunca", etiqueta: "CTS trunca", formato: "moneda" },
    { clave: "gratificacion", etiqueta: "Gratificación trunca", formato: "moneda" },
    { clave: "bonificacion", etiqueta: "Bonificación extraordinaria", formato: "moneda", ocultarSiCero: true },
    { clave: "vacacionesTruncas", etiqueta: "Vacaciones truncas", formato: "moneda" },
    { clave: "vacacionesPendientes", etiqueta: "Vacaciones ganadas no tomadas", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total de la liquidación", formato: "moneda", destacada: true },
    { clave: "mesesCts", etiqueta: "Meses que cuenta la CTS trunca", formato: "meses" },
    { clave: "diasCts", etiqueta: "Días sueltos de la CTS trunca", formato: "dias", ocultarSiCero: true },
    { clave: "mesesGrati", etiqueta: "Meses que cuenta la gratificación trunca", formato: "meses" },
  ],
});
