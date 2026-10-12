import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { aFecha, aniosMesesDias, mayor, mesesCalendarioYDias, partes } from "../fechas";
import { OPCIONES_REGIMEN } from "../lib/regimen";

export default definirCalculadora({
  id: "pe.cts-trunca",
  mercado: "pe",
  concepto: "propio",
  slug: "cts-trunca",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
    "pe.cts-por-regimen": "mapa",
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
      ayuda: "Sin la bonificación extraordinaria. Se suma un sexto a la remuneración.",
      min: 0,
      requerido: false,
    },
    { id: "regimen", tipo: "opcion", etiqueta: "Régimen laboral de tu empleador", opciones: OPCIONES_REGIMEN, porDefecto: "general" },
  ],
  calcular(entrada, valores, { redondear }) {
    const { fechaIngreso, fechaCese } = entrada;
    if (fechaCese < fechaIngreso) throw new ErrorEntrada("El último día de trabajo tiene que ser posterior a la fecha de ingreso.", "fechaCese");
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const sextoGratificacion = redondear((entrada.ultimaGratificacion ?? 0) / 6);
    const remuneracion = redondear(entrada.sueldo + asignacion + (entrada.variable ?? 0) + sextoGratificacion);
    const c = partes(fechaCese);
    // La CTS se deposita en mayo (periodo noviembre a abril) y en noviembre (mayo a octubre): la trunca
    // cuenta desde el inicio del periodo que todavía no se depositó.
    const inicio = c.mes >= 11 ? aFecha(c.anio, 11, 1) : c.mes >= 5 ? aFecha(c.anio, 5, 1) : aFecha(c.anio - 1, 11, 1);
    const periodo = mesesCalendarioYDias(mayor(fechaIngreso, inicio), fechaCese);
    const servicio = aniosMesesDias(fechaIngreso, fechaCese);
    const unMes = servicio.anios > 0 || servicio.meses > 0;
    const observaciones: string[] = [];
    if (entrada.regimen === "micro") {
      observaciones.push("En la microempresa del régimen especial no hay CTS, tampoco trunca.");
      return { remuneracion, sextoGratificacion, meses: periodo.meses, dias: periodo.dias, cts: 0, observaciones };
    }
    if (!unMes) {
      observaciones.push("Con menos de un mes de trabajo no se genera CTS.");
      return { remuneracion, sextoGratificacion, meses: periodo.meses, dias: periodo.dias, cts: 0, observaciones };
    }
    const factor = enMapa(valores["pe.cts-por-regimen"], entrada.regimen);
    const cts = redondear(((remuneracion * factor) / 12) * periodo.meses + ((remuneracion * factor) / 360) * periodo.dias);
    if (entrada.regimen === "pequena") observaciones.push("En la pequeña empresa la CTS es la mitad: 15 remuneraciones diarias por año.");
    if (entrada.ultimaGratificacion === null) observaciones.push("Si cobraste gratificación en julio o diciembre, escríbela: un sexto se suma a la CTS.");
    observaciones.push("La CTS trunca te la paga directamente tu empleador, dentro de las 48 horas de tu cese.");
    return { remuneracion, sextoGratificacion, meses: periodo.meses, dias: periodo.dias, cts, observaciones };
  },
  resultado: [
    { clave: "remuneracion", etiqueta: "Remuneración computable", formato: "moneda" },
    { clave: "sextoGratificacion", etiqueta: "Sexto de gratificación incluido", formato: "moneda", ocultarSiCero: true },
    { clave: "meses", etiqueta: "Meses que cuentan", formato: "meses" },
    { clave: "dias", etiqueta: "Días sueltos que cuentan", formato: "dias", ocultarSiCero: true },
    { clave: "cts", etiqueta: "CTS trunca", formato: "moneda", destacada: true },
  ],
});
