import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: el plazo sale del proyecto de la Employment and Labour Relations Act; falta el texto final.
export default definirCalculadora({
  id: "bw.notice-period",
  mercado: "bw",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "borrador",
  requiere: {
    "bw.notice-period-days": "numero",
  },
  campos: [
    {
      id: "pago",
      tipo: "opcion",
      etiqueta: "How are you paid?",
      opciones: [
        { valor: "monthly", etiqueta: "Monthly" },
        { valor: "weekly", etiqueta: "Daily or weekly" },
      ],
      porDefecto: "monthly",
    },
    { id: "salario", tipo: "moneda", etiqueta: "Basic pay for one pay period", min: 0, porDefecto: 6000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your basic pay.", "salario");
    const mensual = entrada.pago === "monthly";
    const dias = v["bw.notice-period-days"];
    return {
      aviso: mensual ? "One month" : `${dias} days`,
      pagoEnLugar: redondear(mensual ? entrada.salario : (entrada.salario * dias) / 7),
    };
  },
  resultado: [
    { clave: "aviso", etiqueta: "Minimum notice", formato: "texto", destacada: true },
    { clave: "pagoEnLugar", etiqueta: "Pay in lieu of notice", formato: "moneda" },
  ],
});
