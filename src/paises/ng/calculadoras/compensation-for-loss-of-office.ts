import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ng.compensation-for-loss-of-office",
  mercado: "ng",
  concepto: "propio",
  slug: "compensation-for-loss-of-office",
  estado: "publicado",
  requiere: {
    "ng.compensation-exemption": "numero",
  },
  campos: [{ id: "monto", tipo: "moneda", etiqueta: "Compensation received for loss of office or employment", min: 0, porDefecto: 60000000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const limite = v["ng.compensation-exemption"];
    return {
      exento: redondear(Math.min(entrada.monto, limite)),
      gravable: redondear(Math.max(0, entrada.monto - limite)),
    };
  },
  resultado: [
    { clave: "exento", etiqueta: "Not taxed", formato: "moneda", destacada: true },
    { clave: "gravable", etiqueta: "Chargeable gain (the excess)", formato: "moneda" },
  ],
});
