import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import {
  CAMPO_MONEDA,
  diasDePrestaciones,
  diasDeVacaciones,
  enMoneda,
  mesesCompletos,
  salarioIntegralDiario,
  textoTiempo,
  tiempoTrabajado,
  validarFechas,
} from "../reglas";

export default definirCalculadora({
  id: "ve.liquidacion",
  mercado: "ve",
  concepto: "liquidacion-final",
  slug: "liquidacion",
  estado: "publicado",
  requiere: {
    "ve.dias-mes-salario": "numero",
    "ve.prestaciones-garantia-dias": "numero",
    "ve.prestaciones-dias-adicionales": "numero",
    "ve.prestaciones-dias-adicionales-tope": "numero",
    "ve.prestaciones-retroactivo-dias": "numero",
    "ve.prestaciones-dias-por-mes-menos-3-meses": "numero",
    "ve.utilidades-dias-minimo": "numero",
    "ve.utilidades-dias-maximo": "numero",
    "ve.vacaciones-dias-base": "numero",
    "ve.vacaciones-dias-adicionales-tope": "numero",
    "ve.bono-vacacional-dias-base": "numero",
    "ve.bono-vacacional-dias-tope": "numero",
  },
  campos: [
    CAMPO_MONEDA,
    {
      id: "salario",
      tipo: "numero",
      etiqueta: "Último salario mensual",
      ayuda: "Solo la parte salarial. El cestaticket y el bono de guerra económica no cuentan.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo terminó la relación de trabajo",
      opciones: [
        { valor: "despido-injustificado", etiqueta: "Despido sin causa justificada (y no pides el reenganche)" },
        { valor: "renuncia", etiqueta: "Renuncia" },
        { valor: "despido-justificado", etiqueta: "Despido con causa justificada" },
      ],
      porDefecto: "despido-injustificado",
    },
    {
      id: "diasUtilidades",
      tipo: "entero",
      etiqueta: "Días de utilidades que paga tu empresa al año",
      ayuda: "Si no lo sabes, deja el mínimo de ley.",
      min: 30,
      max: 120,
      porDefecto: 30,
    },
    {
      id: "periodosPendientes",
      tipo: "entero",
      etiqueta: "Años de vacaciones vencidas que no disfrutaste ni te pagaron",
      min: 0,
      max: 10,
      porDefecto: 0,
    },
    {
      id: "garantia",
      tipo: "numero",
      etiqueta: "Garantía de prestaciones depositada, sin intereses (opcional)",
      ayuda: "Si lo dejas vacío, la estimamos con tu último salario.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    const minU = valores["ve.utilidades-dias-minimo"];
    const maxU = valores["ve.utilidades-dias-maximo"];
    if (entrada.diasUtilidades < minU || entrada.diasUtilidades > maxU) {
      throw new ErrorEntrada(`Las utilidades van de ${minU} a ${maxU} días por año.`, "diasUtilidades");
    }
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaSalida);
    if (entrada.periodosPendientes > t.anios) {
      throw new ErrorEntrada("No puedes tener más años de vacaciones vencidas que años trabajados.", "periodosPendientes");
    }
    const diasMes = valores["ve.dias-mes-salario"];
    const diario = entrada.salario / diasMes;
    const reglasVac = {
      base: valores["ve.vacaciones-dias-base"],
      topeAdicionales: valores["ve.vacaciones-dias-adicionales-tope"],
      bonoBase: valores["ve.bono-vacacional-dias-base"],
      bonoTope: valores["ve.bono-vacacional-dias-tope"],
    };
    const enCurso = diasDeVacaciones(t.anios + 1, reglasVac);
    const integral = salarioIntegralDiario(diario, entrada.diasUtilidades, enCurso.bono, diasMes);

    const p = diasDePrestaciones(t, {
      garantiaDias: valores["ve.prestaciones-garantia-dias"],
      adicionalesDias: valores["ve.prestaciones-dias-adicionales"],
      adicionalesTope: valores["ve.prestaciones-dias-adicionales-tope"],
      retroactivoDias: valores["ve.prestaciones-retroactivo-dias"],
      diasPorMesCorto: valores["ve.prestaciones-dias-por-mes-menos-3-meses"],
    });
    const integralR = redondear(integral);
    const retroactivo = redondear(p.diasRetroactivo * integralR);
    const garantia = p.corta ? 0 : (entrada.garantia ?? redondear(p.diasGarantia * integralR));
    const prestaciones = Math.max(garantia, retroactivo);
    const indemnizacion = entrada.motivo === "despido-injustificado" ? prestaciones : 0;

    // Art. 196: vacaciones y bono del año en curso, proporcionales a los meses completos.
    const diasFraccion = ((enCurso.vacaciones + enCurso.bono) * t.meses) / 12;
    let diasVencidos = 0;
    for (let k = 0; k < entrada.periodosPendientes; k++) {
      const d = diasDeVacaciones(t.anios - k, reglasVac);
      diasVencidos += d.vacaciones + d.bono;
    }
    const vacaciones = redondear((diasFraccion + diasVencidos) * diario);

    // Art. 131: utilidades del ejercicio en curso (se toma el año calendario) por meses completos.
    const inicioEjercicio = `${entrada.fechaSalida.slice(0, 4)}-01-01` as FechaISO;
    const desde = entrada.fechaIngreso > inicioEjercicio ? entrada.fechaIngreso : inicioEjercicio;
    const mesesUtil = Math.min(12, mesesCompletos(desde, entrada.fechaSalida));
    const utilidades = redondear((entrada.diasUtilidades * mesesUtil * diario) / 12);

    const total = redondear(prestaciones + indemnizacion + vacaciones + utilidades);
    const observaciones: string[] = [];
    if (!p.corta && entrada.garantia === null) {
      observaciones.push("La garantía de prestaciones es una estimación con tu último salario. Si tu salario subió, la real es menor.");
    }
    if (entrada.motivo === "despido-injustificado") observaciones.push("La indemnización por despido es igual a tus prestaciones sociales (art. 92 de la LOTTT).");
    observaciones.push("Las utilidades se toman del año calendario. Si tu empresa cierra su ejercicio en otra fecha, el monto cambia.");
    observaciones.push("No incluye intereses de prestaciones ni salarios pendientes.");

    const m = entrada.moneda;
    const fila = (v: number) => enMoneda(v, m);
    const [pr, ind, vac, ut, tot] = [prestaciones, indemnizacion, vacaciones, utilidades, total].map(fila);
    return {
      tiempo: textoTiempo(t),
      prestacionesBs: pr.bs,
      prestacionesUsd: pr.usd,
      indemnizacionBs: ind.bs,
      indemnizacionUsd: ind.usd,
      vacacionesBs: vac.bs,
      vacacionesUsd: vac.usd,
      mesesUtilidades: mesesUtil,
      utilidadesBs: ut.bs,
      utilidadesUsd: ut.usd,
      totalBs: tot.bs,
      totalUsd: tot.usd,
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo de servicio", formato: "texto" },
    { clave: "prestacionesBs", etiqueta: "Prestaciones sociales", formato: "moneda", moneda: "VES" },
    { clave: "prestacionesUsd", etiqueta: "Prestaciones sociales", formato: "moneda", moneda: "USD" },
    { clave: "indemnizacionBs", etiqueta: "Indemnización por despido", formato: "moneda", moneda: "VES", ocultarSiCero: true },
    { clave: "indemnizacionUsd", etiqueta: "Indemnización por despido", formato: "moneda", moneda: "USD", ocultarSiCero: true },
    { clave: "vacacionesBs", etiqueta: "Vacaciones y bono vacacional", formato: "moneda", moneda: "VES" },
    { clave: "vacacionesUsd", etiqueta: "Vacaciones y bono vacacional", formato: "moneda", moneda: "USD" },
    { clave: "mesesUtilidades", etiqueta: "Meses para las utilidades fraccionadas", formato: "meses" },
    { clave: "utilidadesBs", etiqueta: "Utilidades fraccionadas", formato: "moneda", moneda: "VES" },
    { clave: "utilidadesUsd", etiqueta: "Utilidades fraccionadas", formato: "moneda", moneda: "USD" },
    { clave: "totalBs", etiqueta: "Total de la liquidación", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "totalUsd", etiqueta: "Total de la liquidación", formato: "moneda", moneda: "USD", destacada: true },
  ],
});
