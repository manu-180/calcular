import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { antiguedad, DIAS_ANIO, DIAS_MES, mesesIndemnizacion, periodoAguinaldo } from "../prestaciones";

export default definirCalculadora({
  id: "ni.liquidacion",
  mercado: "ni",
  concepto: "liquidacion-final",
  slug: "liquidacion",
  estado: "publicado",
  requiere: {
    "ni.indemnizacion-meses-por-anio": "numero",
    "ni.indemnizacion-dias-desde-cuarto-anio": "numero",
    "ni.indemnizacion-minimo-meses": "numero",
    "ni.indemnizacion-tope-meses": "numero",
    "ni.aguinaldo-meses": "numero",
    "ni.vacaciones-dias-por-semestre": "numero",
    "ni.preaviso-renuncia": "numero",
  },
  campos: [
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo terminó el contrato",
      opciones: [
        { valor: "despido", etiqueta: "Te despidieron sin causa justificada" },
        { valor: "renuncia", etiqueta: "Renunciaste o lo terminaron de mutuo acuerdo" },
        { valor: "despido-justificado", etiqueta: "Te despidieron por una causa del artículo 48" },
      ],
      porDefecto: "despido",
    },
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      min: 0,
      ayuda: "El último salario ordinario. Si varía, el promedio de los últimos seis meses.",
    },
    {
      id: "vacacionesPendientes",
      tipo: "numero",
      etiqueta: "Días de vacaciones que no gozaste",
      min: 0,
      requerido: false,
      ayuda: "Si lo dejás vacío, calculamos los del último año, desde tu último aniversario.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fechaIngreso > entrada.fechaSalida) throw new ErrorEntrada("La fecha de ingreso no puede ser posterior a la de salida.", "fechaIngreso");
    const a = antiguedad(entrada.fechaIngreso, entrada.fechaSalida);
    const regla = {
      mesesPorAnio: valores["ni.indemnizacion-meses-por-anio"],
      diasDesdeCuarto: valores["ni.indemnizacion-dias-desde-cuarto-anio"],
      minimoMeses: valores["ni.indemnizacion-minimo-meses"],
      topeMeses: valores["ni.indemnizacion-tope-meses"],
    };
    const meses = entrada.motivo === "despido-justificado" ? 0 : mesesIndemnizacion(a.anios, regla, entrada.motivo === "despido");
    const indemnizacion = redondear(entrada.salario * meses);

    const periodo = periodoAguinaldo(entrada.fechaIngreso, entrada.fechaSalida);
    const aguinaldo = redondear((entrada.salario * valores["ni.aguinaldo-meses"] * periodo.dias) / DIAS_ANIO);

    const diasDelAnio = a.diasDelAnioEnCurso === 0 && a.completos > 0 ? DIAS_ANIO : a.diasDelAnioEnCurso;
    const porAnio = valores["ni.vacaciones-dias-por-semestre"] * 2;
    const diasVacaciones = redondear(entrada.vacacionesPendientes ?? (porAnio * diasDelAnio) / DIAS_ANIO);
    const vacaciones = redondear((entrada.salario / DIAS_MES) * diasVacaciones);

    const observaciones: string[] = [];
    if (entrada.motivo === "renuncia") observaciones.push("Al renunciar conservás lo ganado por antigüedad (artículo 43). Lo calculamos por el tiempo trabajado, sin el mínimo de un mes.");
    if (entrada.motivo === "despido-justificado") observaciones.push("Con un despido por causa justificada no hay indemnización por antigüedad.");
    if (entrada.vacacionesPendientes === null) observaciones.push("Supusimos que ya gozaste las vacaciones de los años anteriores. Si no, poné el total de días pendientes.");
    observaciones.push("Las vacaciones se pagan con el salario diario (mensual dividido entre 30).");
    observaciones.push("Te lo tienen que pagar todo junto, con el salario de los días trabajados que te deban.");
    return {
      anios: redondear(a.anios),
      meses: redondear(meses),
      indemnizacion,
      diasAguinaldo: periodo.dias,
      aguinaldo,
      diasVacaciones,
      vacaciones,
      total: redondear(indemnizacion + aguinaldo + vacaciones),
      observaciones,
    };
  },
  resultado: [
    { clave: "anios", etiqueta: "Antigüedad", formato: "anios", decimales: 2 },
    { clave: "meses", etiqueta: "Meses de salario por antigüedad", formato: "numero", decimales: 2, ocultarSiCero: true },
    { clave: "indemnizacion", etiqueta: "Indemnización por antigüedad", formato: "moneda", ocultarSiCero: true },
    { clave: "diasAguinaldo", etiqueta: "Días para el aguinaldo", formato: "dias" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo proporcional", formato: "moneda" },
    { clave: "diasVacaciones", etiqueta: "Días de vacaciones a pagar", formato: "numero", decimales: 2 },
    { clave: "vacaciones", etiqueta: "Vacaciones", formato: "moneda" },
    { clave: "total", etiqueta: "Total de la liquidación", formato: "moneda", destacada: true },
  ],
});
