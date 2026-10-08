import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { corteDecimoTercero, DIAS_ANIO, MES_INICIO_DECIMO_TERCERO, periodoTrabajado } from "../reglas";

// Borrador hasta leer el Decreto 112-82 en fuente oficial: el período enero a diciembre y la base
// (promedio de salarios ordinarios) son los de la práctica y los del reglamento del décimo cuarto,
// que remite a las condiciones del décimo tercero.
export default definirCalculadora({
  id: "hn.decimo-tercer-mes",
  mercado: "hn",
  concepto: "bono-semestral",
  slug: "decimo-tercer-mes",
  estado: "borrador",
  requiere: {
    "hn.decimo-tercero": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario ordinario mensual promedio del año",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha en que empezó a trabajar" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Qué quiere calcular",
      opciones: [
        { valor: "diciembre", etiqueta: "El aguinaldo de diciembre" },
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
    } else corte = corteDecimoTercero(fecha);
    if (entrada.fechaIngreso > corte) throw new ErrorEntrada("La fecha de ingreso no puede ser posterior al cierre del período.", "fechaIngreso");
    const periodo = periodoTrabajado(entrada.fechaIngreso, corte, MES_INICIO_DECIMO_TERCERO);
    const monto = redondear((porcentaje(entrada.salario, valores["hn.decimo-tercero"]) * periodo.dias) / DIAS_ANIO);
    return { desde: periodo.desde, hasta: corte, dias: periodo.dias, monto };
  },
  resultado: [
    { clave: "desde", etiqueta: "Se cuenta desde", formato: "fecha" },
    { clave: "hasta", etiqueta: "Hasta", formato: "fecha" },
    { clave: "dias", etiqueta: "Días que cuentan", formato: "dias" },
    { clave: "monto", etiqueta: "Décimo tercer mes", formato: "moneda", destacada: true },
  ],
});
