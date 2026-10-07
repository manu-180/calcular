import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { corteBono14, DIAS_ANIO, MES_INICIO_BONO_14, periodoTrabajado } from "../prestaciones";

export default definirCalculadora({
  id: "gt.bono-14",
  mercado: "gt",
  concepto: "decimo-cuarto",
  slug: "bono-14",
  estado: "publicado",
  requiere: {
    "gt.bono-14": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario ordinario mensual promedio",
      min: 0,
      ayuda: "El promedio de lo que ganó cada mes del período, sin la bonificación incentivo ni horas extra.",
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha en que empezó a trabajar" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Qué quiere calcular",
      opciones: [
        { valor: "julio", etiqueta: "El Bono 14 que se paga en julio" },
        { valor: "salida", etiqueta: "La parte que le toca porque dejó de trabajar" },
      ],
      porDefecto: "julio",
    },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", requerido: false, ayuda: "Solo si dejó de trabajar." },
  ],
  calcular(entrada, valores, { fecha, redondear }) {
    let corte: typeof entrada.fechaIngreso;
    if (entrada.motivo === "salida") {
      if (entrada.fechaSalida === null) throw new ErrorEntrada("Indique su último día de trabajo.", "fechaSalida");
      corte = entrada.fechaSalida;
    } else corte = corteBono14(fecha);
    if (entrada.fechaIngreso > corte) throw new ErrorEntrada("La fecha de ingreso no puede ser posterior al cierre del período.", "fechaIngreso");
    const periodo = periodoTrabajado(entrada.fechaIngreso, corte, MES_INICIO_BONO_14);
    const anual = porcentaje(entrada.salario, valores["gt.bono-14"]);
    const bono = redondear((anual * periodo.dias) / DIAS_ANIO);
    const observaciones: string[] = [];
    if (periodo.dias < DIAS_ANIO) observaciones.push("No completó el año entre el 1 de julio y el 30 de junio, así que le corresponde la parte proporcional a los días trabajados.");
    if (entrada.motivo === "salida") observaciones.push("Al terminar la relación laboral, el patrono tiene que pagarle esta parte junto con su liquidación.");
    else observaciones.push("Se paga en la primera quincena de julio.");
    return { desde: periodo.desde, hasta: corte, dias: periodo.dias, bono, observaciones };
  },
  resultado: [
    { clave: "desde", etiqueta: "Se cuenta desde", formato: "fecha" },
    { clave: "hasta", etiqueta: "Hasta", formato: "fecha" },
    { clave: "dias", etiqueta: "Días que cuentan", formato: "dias" },
    { clave: "bono", etiqueta: "Bono 14", formato: "moneda", destacada: true },
  ],
});
