import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "nz.acc-weekly-compensation",
  mercado: "nz",
  concepto: "propio",
  slug: "acc-weekly-compensation",
  estado: "borrador",
  requiere: {
    "nz.acc-weekly-compensation-rate": "numero",
    "nz.acc-weekly-compensation-max": "numero",
  },
  campos: [{ id: "semanal", tipo: "moneda", etiqueta: "Your weekly earnings before the injury", min: 0, porDefecto: 1200 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.semanal <= 0) throw new ErrorEntrada("Enter your weekly earnings.", "semanal");
    const sinTope = (entrada.semanal * v["nz.acc-weekly-compensation-rate"]) / 100;
    const compensacion = redondear(Math.min(sinTope, v["nz.acc-weekly-compensation-max"]));
    return {
      compensacion,
      quincenal: redondear(compensacion * 2),
      tope: v["nz.acc-weekly-compensation-max"],
    };
  },
  resultado: [
    { clave: "compensacion", etiqueta: "Weekly compensation before tax", formato: "moneda", destacada: true },
    { clave: "quincenal", etiqueta: "A fortnight before tax", formato: "moneda" },
    { clave: "tope", etiqueta: "Maximum a week", formato: "moneda" },
  ],
});
