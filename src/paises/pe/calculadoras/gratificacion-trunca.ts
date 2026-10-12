import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { aFecha, mayor, mesesCalendarioCompletos, partes } from "../fechas";
import { OPCIONES_REGIMEN } from "../lib/regimen";

export default definirCalculadora({
  id: "pe.gratificacion-trunca",
  mercado: "pe",
  concepto: "propio",
  slug: "gratificacion-trunca",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
    "pe.bonificacion-extraordinaria": "mapa",
    "pe.gratificacion-por-regimen": "mapa",
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
    { id: "seguro", tipo: "opcion-dato", etiqueta: "Tu seguro de salud", dato: "pe.bonificacion-extraordinaria", porDefecto: "essalud" },
  ],
  calcular(entrada, valores, { redondear }) {
    const { fechaIngreso, fechaCese } = entrada;
    if (fechaCese < fechaIngreso) throw new ErrorEntrada("El último día de trabajo tiene que ser posterior a la fecha de ingreso.", "fechaCese");
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const remuneracion = redondear(entrada.sueldo + asignacion + (entrada.variable ?? 0));
    const c = partes(fechaCese);
    const inicioSemestre = aFecha(c.anio, c.mes <= 6 ? 1 : 7, 1);
    const meses = mesesCalendarioCompletos(mayor(fechaIngreso, inicioSemestre), fechaCese);
    const semestre = c.mes <= 6 ? `Gratificación de julio de ${c.anio}` : `Gratificación de diciembre de ${c.anio}`;
    const observaciones: string[] = [];
    if (entrada.regimen === "micro") {
      observaciones.push("En la microempresa del régimen especial no se paga gratificación, tampoco la trunca.");
      return { semestre, meses, remuneracion, gratificacion: 0, bonificacion: 0, total: 0, observaciones };
    }
    const factor = enMapa(valores["pe.gratificacion-por-regimen"], entrada.regimen);
    const gratificacion = redondear((remuneracion * factor * meses) / 6);
    const bonificacion = redondear(porcentaje(gratificacion, enMapa(valores["pe.bonificacion-extraordinaria"], entrada.seguro)));
    if (meses === 0) observaciones.push("Para la gratificación trunca necesitas al menos un mes calendario completo en el semestre en que dejas el trabajo.");
    if (meses === 6) observaciones.push("Trabajaste el semestre completo: te toca la gratificación entera, no la trunca.");
    observaciones.push("Los días sueltos del mes en que entraste o saliste no cuentan para la gratificación trunca.");
    return { semestre, meses, remuneracion, gratificacion, bonificacion, total: redondear(gratificacion + bonificacion), observaciones };
  },
  resultado: [
    { clave: "semestre", etiqueta: "Semestre que se calcula", formato: "texto" },
    { clave: "meses", etiqueta: "Meses completos que cuentan", formato: "meses" },
    { clave: "remuneracion", etiqueta: "Remuneración que se usa", formato: "moneda" },
    { clave: "gratificacion", etiqueta: "Gratificación trunca", formato: "moneda" },
    { clave: "bonificacion", etiqueta: "Bonificación extraordinaria", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total a cobrar", formato: "moneda", destacada: true },
  ],
});
