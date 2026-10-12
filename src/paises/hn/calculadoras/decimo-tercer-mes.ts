import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { corteDecimoTercero, DIAS_ANIO, MES_INICIO_DECIMO_TERCERO, periodoTrabajado } from "../reglas";

export default definirCalculadora({
  id: "hn.decimo-tercer-mes",
  mercado: "hn",
  concepto: "bono-semestral",
  slug: "decimo-tercer-mes",
  estado: "publicado",
  requiere: {
    "hn.decimo-tercero": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario ordinario mensual promedio del año",
      min: 0,
      ayuda: "El promedio de lo que ganó cada mes desde enero (o desde que entró), sin horas extra.",
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
    const observaciones: string[] = [];
    if (periodo.dias < DIAS_ANIO) observaciones.push("No completó el año entre el 1 de enero y el 31 de diciembre, así que le corresponde la parte proporcional a los días trabajados.");
    if (entrada.motivo === "salida") observaciones.push("Si renuncia o lo despiden, con causa o sin ella, el patrono tiene que pagarle esta parte proporcional.");
    else observaciones.push("Se paga en diciembre, salvo que usted y su patrono hayan acordado otra fecha.");
    observaciones.push("Si ya le adelantaron una parte, se descuenta del pago final.");
    return { desde: periodo.desde, hasta: corte, dias: periodo.dias, monto, observaciones };
  },
  resultado: [
    { clave: "desde", etiqueta: "Se cuenta desde", formato: "fecha" },
    { clave: "hasta", etiqueta: "Hasta", formato: "fecha" },
    { clave: "dias", etiqueta: "Días que cuentan", formato: "dias" },
    { clave: "monto", etiqueta: "Décimo tercer mes", formato: "moneda", destacada: true },
  ],
});
