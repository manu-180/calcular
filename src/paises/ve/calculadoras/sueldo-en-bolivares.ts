import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "ve.sueldo-en-bolivares",
  mercado: "ve",
  concepto: "propio",
  slug: "sueldo-en-bolivares",
  estado: "publicado",
  requiere: {
    "ve.tasa-bcv-usd": "serie",
    "ve.dias-mes-salario": "numero",
  },
  campos: [{ id: "usd", tipo: "moneda", etiqueta: "Sueldo mensual en dólares", min: 0, porDefecto: 240, moneda: "USD" }],
  calcular(entrada, valores, { redondear }) {
    const { fecha, valor: tasa } = valores["ve.tasa-bcv-usd"];
    const mensual = entrada.usd * tasa;
    return {
      tasa,
      fechaTasa: fecha,
      mensual: redondear(mensual),
      quincena: redondear(mensual / 2),
      diario: redondear(mensual / valores["ve.dias-mes-salario"]),
      observaciones: [
        "La tasa del BCV cambia cada día hábil, así que el monto en bolívares también.",
        "Si tu empresa te paga en bolívares a la tasa del día de pago, el monto puede ser distinto al de hoy.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tasa oficial BCV usada", formato: "moneda", moneda: "VES", decimales: 4 },
    { clave: "fechaTasa", etiqueta: "Tasa vigente desde", formato: "fecha" },
    { clave: "mensual", etiqueta: "Sueldo mensual en bolívares", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "quincena", etiqueta: "Quincena en bolívares", formato: "moneda", moneda: "VES" },
    { clave: "diario", etiqueta: "Salario diario en bolívares", formato: "moneda", moneda: "VES" },
  ],
});
