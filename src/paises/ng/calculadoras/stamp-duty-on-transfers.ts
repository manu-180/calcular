import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ng.stamp-duty-on-transfers",
  mercado: "ng",
  concepto: "propio",
  slug: "stamp-duty-on-transfers",
  estado: "publicado",
  requiere: {
    "ng.stamp-duty-transfer": "numero",
    "ng.stamp-duty-transfer-threshold": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount of each transfer", min: 0, porDefecto: 50000 },
    { id: "cantidad", tipo: "entero", etiqueta: "Number of such transfers a month", min: 0, max: 100000, porDefecto: 20 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of transfer",
      opciones: [
        { valor: "regular", etiqueta: "Payment to someone else" },
        { valor: "salary", etiqueta: "Salary payment" },
        { valor: "self", etiqueta: "To my own account in the same bank" },
      ],
      porDefecto: "regular",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const exenta = entrada.tipo !== "regular" || entrada.monto < v["ng.stamp-duty-transfer-threshold"];
    const porTransferencia = exenta ? 0 : v["ng.stamp-duty-transfer"];
    const mensual = redondear(porTransferencia * entrada.cantidad);
    return {
      porTransferencia,
      mensual,
      anual: redondear(mensual * 12),
      estado: exenta ? "Exempt" : "Stamp duty applies",
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Stamp duty a month", formato: "moneda", destacada: true },
    { clave: "estado", etiqueta: "This transfer", formato: "texto" },
    { clave: "porTransferencia", etiqueta: "Duty on each transfer", formato: "moneda" },
    { clave: "anual", etiqueta: "Stamp duty a year", formato: "moneda" },
  ],
});
