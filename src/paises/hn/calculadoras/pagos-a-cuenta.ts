import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.pagos-a-cuenta",
  mercado: "hn",
  concepto: "propio",
  slug: "pagos-a-cuenta",
  estado: "publicado",
  requiere: {
    "hn.pagos-a-cuenta-cuotas": "numero",
  },
  campos: [
    { id: "isrAnterior", tipo: "moneda", etiqueta: "ISR del año anterior según su declaración", min: 0 },
    { id: "isrEstimado", tipo: "moneda", etiqueta: "ISR que estima para este año (opcional)", min: 0, requerido: false, ayuda: "Para ver el saldo que pagaría en abril." },
  ],
  calcular(entrada, valores, { redondear }) {
    const cuotas = valores["hn.pagos-a-cuenta-cuotas"];
    const cuota = redondear(entrada.isrAnterior / cuotas);
    const anticipado = redondear(cuota * (cuotas - 1));
    const saldo = entrada.isrEstimado === null ? null : redondear(entrada.isrEstimado - anticipado);
    const observaciones = ["Las tres primeras cuotas vencen el 30 de junio, el 30 de septiembre y el 31 de diciembre. Si cae en un día inhábil, se paga el siguiente día hábil."];
    if (saldo !== null && saldo < 0) observaciones.push("Pagó de más con las cuotas: el saldo negativo es un crédito a su favor.");
    observaciones.push("No están en pagos a cuenta quienes solo tienen salario con retención mensual.");
    return { cuota, anticipado, saldo, observaciones };
  },
  resultado: [
    { clave: "cuota", etiqueta: "Cada cuota trimestral", formato: "moneda", destacada: true },
    { clave: "anticipado", etiqueta: "Lo que paga durante el año (tres cuotas)", formato: "moneda" },
    { clave: "saldo", etiqueta: "Cuarta cuota: saldo a pagar en abril", formato: "moneda" },
  ],
});
