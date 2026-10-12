import { aplicarEscala, definirCalculadora } from "@/motor/calculo";

const MESES = 12;

export default definirCalculadora({
  id: "pa.gastos-de-representacion",
  mercado: "pa",
  concepto: "propio",
  slug: "gastos-de-representacion",
  estado: "publicado",
  requiere: {
    "pa.gastos-representacion": "escala",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Gastos de representación", min: 0 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "El monto es",
      opciones: [
        { valor: "mensual", etiqueta: "Por mes" },
        { valor: "anual", etiqueta: "Por año" },
      ],
      porDefecto: "mensual",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const anual = entrada.periodo === "mensual" ? entrada.monto * MESES : entrada.monto;
    const impuesto = aplicarEscala(valores["pa.gastos-representacion"], anual);
    return {
      anual: redondear(anual),
      impuestoAnual: redondear(impuesto),
      impuestoMensual: redondear(impuesto / MESES),
      netoMensual: redondear((anual - impuesto) / MESES),
      tasaEfectiva: anual > 0 ? redondear((impuesto / anual) * 100) : 0,
      observaciones: [
        "Los gastos de representación pagan su propio impuesto y no se suman al salario para la tarifa general.",
        "Si además tienes salario, puedes hacer la declaración de renta para usar tus deducciones y los aportes a fondos de pensiones.",
      ],
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "Gastos de representación al año", formato: "moneda" },
    { clave: "impuestoAnual", etiqueta: "Impuesto sobre la renta al año", formato: "moneda" },
    { clave: "impuestoMensual", etiqueta: "Retención por mes", formato: "moneda", destacada: true },
    { clave: "netoMensual", etiqueta: "Lo que recibes por mes", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Tasa efectiva", formato: "porcentaje" },
  ],
});
