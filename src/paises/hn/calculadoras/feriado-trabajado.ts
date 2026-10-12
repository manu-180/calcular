import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { salarioDiario } from "../reglas";

export default definirCalculadora({
  id: "hn.feriado-trabajado",
  mercado: "hn",
  concepto: "propio",
  slug: "feriado-trabajado",
  estado: "publicado",
  requiere: {
    "hn.feriado-trabajado-factor": "numero",
    "hn.jornada-horas": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario ordinario mensual", min: 0 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Su jornada",
      opciones: [
        { valor: "diurna", etiqueta: "De día" },
        { valor: "mixta", etiqueta: "Mixta" },
        { valor: "nocturna", etiqueta: "De noche" },
      ],
      porDefecto: "diurna",
    },
    { id: "horas", tipo: "numero", etiqueta: "Horas que trabajó el feriado o día de descanso", min: 0, porDefecto: 8 },
  ],
  calcular(entrada, valores, { redondear }) {
    const horasJornada = enMapa(valores["hn.jornada-horas"], entrada.jornada);
    if (entrada.horas > horasJornada)
      throw new ErrorEntrada(`Su jornada es de ${horasJornada} horas. Las horas de más son horas extra y se calculan aparte.`, "horas");
    const diario = salarioDiario(entrada.salario);
    const factor = valores["hn.feriado-trabajado-factor"];
    const pago = redondear((diario * factor * entrada.horas) / horasJornada);
    return {
      salarioDiario: redondear(diario),
      factor,
      pago,
      observaciones: [
        "Este pago va aparte de su salario del mes, que ya incluye el feriado como día pagado.",
        "Además tiene derecho a su día de descanso en la semana.",
      ],
    };
  },
  resultado: [
    { clave: "salarioDiario", etiqueta: "Salario de un día", formato: "moneda" },
    { clave: "factor", etiqueta: "Veces el salario de la jornada", formato: "numero" },
    { clave: "pago", etiqueta: "Pago por trabajar ese día", formato: "moneda", destacada: true },
  ],
});
