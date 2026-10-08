import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { corteDecimoCuarto, DIAS_ANIO, MES_INICIO_DECIMO_CUARTO, periodoTrabajado } from "../reglas";

export default definirCalculadora({
  id: "hn.decimo-cuarto-mes",
  mercado: "hn",
  concepto: "decimo-cuarto",
  slug: "decimo-cuarto-mes",
  estado: "publicado",
  requiere: {
    "hn.decimo-cuarto": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario ordinario mensual promedio",
      min: 0,
      ayuda: "El promedio de lo que ganó cada mes desde el 1 de julio (o desde que entró), sin horas extra.",
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha en que empezó a trabajar" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Qué quiere calcular",
      opciones: [
        { valor: "junio", etiqueta: "El décimo cuarto mes que se paga en junio" },
        { valor: "salida", etiqueta: "La parte que le toca porque dejó de trabajar" },
      ],
      porDefecto: "junio",
    },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", requerido: false, ayuda: "Solo si dejó de trabajar." },
  ],
  calcular(entrada, valores, { fecha, redondear }) {
    let corte: typeof entrada.fechaIngreso;
    if (entrada.motivo === "salida") {
      if (entrada.fechaSalida === null) throw new ErrorEntrada("Indique su último día de trabajo.", "fechaSalida");
      corte = entrada.fechaSalida;
    } else corte = corteDecimoCuarto(fecha);
    if (entrada.fechaIngreso > corte) throw new ErrorEntrada("La fecha de ingreso no puede ser posterior al cierre del período.", "fechaIngreso");
    const periodo = periodoTrabajado(entrada.fechaIngreso, corte, MES_INICIO_DECIMO_CUARTO);
    const completo = porcentaje(entrada.salario, valores["hn.decimo-cuarto"]);
    const monto = redondear((completo * periodo.dias) / DIAS_ANIO);
    const observaciones: string[] = [];
    if (periodo.dias < DIAS_ANIO) observaciones.push("No completó el año entre el 1 de julio y el 30 de junio, así que le corresponde la parte proporcional a los días trabajados.");
    if (entrada.motivo === "salida") observaciones.push("Si renuncia o lo despiden, con causa o sin ella, el patrono tiene que pagarle esta parte proporcional.");
    else observaciones.push("Se paga en junio, salvo que usted y su patrono hayan acordado otra fecha.");
    return { desde: periodo.desde, hasta: corte, dias: periodo.dias, monto, observaciones };
  },
  resultado: [
    { clave: "desde", etiqueta: "Se cuenta desde", formato: "fecha" },
    { clave: "hasta", etiqueta: "Hasta", formato: "fecha" },
    { clave: "dias", etiqueta: "Días que cuentan", formato: "dias" },
    { clave: "monto", etiqueta: "Décimo cuarto mes", formato: "moneda", destacada: true },
  ],
});
