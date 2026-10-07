import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.horas-extra",
  mercado: "do",
  concepto: "horas-extra",
  slug: "horas-extra",
  estado: "publicado",
  requiere: {
    "do.divisor-salario-diario": "numero",
    "do.jornada-diaria": "numero",
    "do.recargo-hora-extra": "numero",
    "do.recargo-hora-extra-68": "numero",
    "do.recargo-nocturno": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "jornada",
      tipo: "numero",
      etiqueta: "Horas de tu jornada normal por día",
      ayuda: "La que dice tu contrato. Si no lo dice, la máxima legal.",
      min: 1,
      max: 8,
      porDefecto: 8,
    },
    {
      id: "horasHasta68",
      tipo: "numero",
      etiqueta: "Horas extra mientras la semana no pasa de 68 horas",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "horasMas68",
      tipo: "numero",
      etiqueta: "Horas extra por encima de 68 horas en la semana",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "horasNocturnas",
      tipo: "numero",
      etiqueta: "Horas de tu jornada en horario nocturno",
      ayuda: "De 9 de la noche a 7 de la mañana. Llevan un recargo aparte.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const maxima = valores["do.jornada-diaria"];
    if (entrada.jornada > maxima) throw new ErrorEntrada(`La jornada normal no puede pasar de ${maxima} horas por día.`, "jornada");
    const hora = redondear(entrada.salario / valores["do.divisor-salario-diario"] / entrada.jornada);
    const valor35 = redondear(hora + porcentaje(hora, valores["do.recargo-hora-extra"]));
    const valor100 = redondear(hora + porcentaje(hora, valores["do.recargo-hora-extra-68"]));
    const pagoHasta68 = redondear(valor35 * entrada.horasHasta68);
    const pagoMas68 = redondear(valor100 * entrada.horasMas68);
    const recargoNocturno = redondear(porcentaje(hora, valores["do.recargo-nocturno"]) * entrada.horasNocturnas);
    return {
      hora,
      valor35,
      valor100,
      pagoHasta68,
      pagoMas68,
      recargoNocturno,
      total: redondear(pagoHasta68 + pagoMas68 + recargoNocturno),
      observaciones: ["Las horas extra no cuentan para la regalía pascual. Para el ISR sí cuentan: se suman a tu salario del mes."],
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Valor de tu hora normal", formato: "moneda" },
    { clave: "valor35", etiqueta: "Hora extra hasta 68 horas semanales", formato: "moneda" },
    { clave: "valor100", etiqueta: "Hora extra por encima de 68 horas", formato: "moneda" },
    { clave: "pagoHasta68", etiqueta: "Pago de horas extra hasta 68", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoMas68", etiqueta: "Pago de horas extra sobre 68", formato: "moneda", ocultarSiCero: true },
    { clave: "recargoNocturno", etiqueta: "Recargo nocturno", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total extra a cobrar", formato: "moneda", destacada: true },
  ],
});
