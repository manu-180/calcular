import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { corteAguinaldo, DIAS_ANIO, periodoAguinaldo } from "../prestaciones";

export default definirCalculadora({
  id: "ni.aguinaldo",
  mercado: "ni",
  concepto: "bono-semestral",
  slug: "aguinaldo",
  estado: "publicado",
  requiere: {
    "ni.aguinaldo-meses": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      min: 0,
      ayuda: "El último salario ordinario. Si ganás por comisión o a destajo, poné el más alto de los últimos seis meses.",
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Qué querés calcular",
      opciones: [
        { valor: "diciembre", etiqueta: "El aguinaldo de diciembre" },
        { valor: "salida", etiqueta: "La parte que te toca porque dejaste el trabajo" },
      ],
      porDefecto: "diciembre",
    },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", requerido: false, ayuda: "Solo si dejaste el trabajo." },
  ],
  calcular(entrada, valores, { fecha, redondear }) {
    let corte: typeof entrada.fechaIngreso;
    if (entrada.motivo === "salida") {
      if (entrada.fechaSalida === null) throw new ErrorEntrada("Poné tu último día de trabajo.", "fechaSalida");
      corte = entrada.fechaSalida;
    } else corte = corteAguinaldo(fecha);
    if (entrada.fechaIngreso > corte) throw new ErrorEntrada("La fecha de ingreso no puede ser posterior al cierre del período.", "fechaIngreso");
    const periodo = periodoAguinaldo(entrada.fechaIngreso, corte);
    const aguinaldo = redondear((entrada.salario * valores["ni.aguinaldo-meses"] * periodo.dias) / DIAS_ANIO);
    const observaciones: string[] = [];
    if (periodo.dias < DIAS_ANIO) observaciones.push("No completaste el año, así que te toca la parte proporcional a los días trabajados.");
    if (entrada.motivo === "salida") observaciones.push("Al terminar el contrato te lo tienen que pagar dentro de los diez días siguientes.");
    else observaciones.push("Te lo tienen que pagar dentro de los primeros diez días de diciembre.");
    observaciones.push("El aguinaldo no paga INSS ni IR, y no se puede embargar salvo por pensión de alimentos.");
    return { desde: periodo.desde, hasta: corte, dias: periodo.dias, aguinaldo, observaciones };
  },
  resultado: [
    { clave: "desde", etiqueta: "Se cuenta desde", formato: "fecha" },
    { clave: "hasta", etiqueta: "Hasta", formato: "fecha" },
    { clave: "dias", etiqueta: "Días que cuentan", formato: "dias" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo (décimo tercer mes)", formato: "moneda", destacada: true },
  ],
});
