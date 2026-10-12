import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { aniosMesesDias } from "../fechas";
import { OPCIONES_REGIMEN } from "../lib/regimen";

export default definirCalculadora({
  id: "pe.vacaciones-truncas",
  mercado: "pe",
  concepto: "propio",
  slug: "vacaciones-truncas",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
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
    { id: "regimen", tipo: "opcion", etiqueta: "Régimen laboral de tu empleador", opciones: OPCIONES_REGIMEN, porDefecto: "general" },
    {
      id: "diasPendientes",
      tipo: "entero",
      etiqueta: "Días de vacaciones ganadas que no tomaste",
      ayuda: "De años completos que ya cumpliste. Déjalo en 0 si tomaste todas.",
      min: 0,
      max: 120,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { fechaIngreso, fechaCese } = entrada;
    if (fechaCese < fechaIngreso) throw new ErrorEntrada("El último día de trabajo tiene que ser posterior a la fecha de ingreso.", "fechaCese");
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const remuneracion = redondear(entrada.sueldo + asignacion + (entrada.variable ?? 0));
    const diasPorAnio = enMapa(valores["pe.vacaciones-por-regimen"], entrada.regimen);
    const servicio = aniosMesesDias(fechaIngreso, fechaCese);
    const unMes = servicio.anios > 0 || servicio.meses > 0;
    const remuneracionVacacional = (remuneracion * diasPorAnio) / 30;
    // DL 713, art. 22: dozavos por mes y treintavos de dozavo por día desde el último aniversario.
    const truncas = unMes ? redondear((remuneracionVacacional / 12) * servicio.meses + (remuneracionVacacional / 360) * servicio.dias) : 0;
    const pendientes = redondear((remuneracion / 30) * entrada.diasPendientes);
    const observaciones: string[] = [];
    if (!unMes) observaciones.push("Con menos de un mes de trabajo no se generan vacaciones truncas.");
    if (servicio.anios > 0 && entrada.diasPendientes === 0) {
      observaciones.push("Si no tomaste las vacaciones de algún año completo, escribe esos días: se pagan enteros.");
    }
    observaciones.push("Si alguna vacación se venció sin tomarla, además te corresponde una indemnización: calcúlala en la calculadora de vacaciones.");
    return {
      diasPorAnio,
      aniosCompletos: servicio.anios,
      meses: servicio.meses,
      dias: servicio.dias,
      truncas,
      pendientes,
      total: redondear(truncas + pendientes),
      observaciones,
    };
  },
  resultado: [
    { clave: "diasPorAnio", etiqueta: "Días de vacaciones por año en tu régimen", formato: "dias" },
    { clave: "aniosCompletos", etiqueta: "Años completos trabajados", formato: "anios", ocultarSiCero: true },
    { clave: "meses", etiqueta: "Meses desde tu último aniversario", formato: "meses" },
    { clave: "dias", etiqueta: "Días sueltos", formato: "dias", ocultarSiCero: true },
    { clave: "truncas", etiqueta: "Vacaciones truncas", formato: "moneda" },
    { clave: "pendientes", etiqueta: "Vacaciones ganadas no tomadas", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total por vacaciones", formato: "moneda", destacada: true },
  ],
});
