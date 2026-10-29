import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fj.paye-penalty-calculator",
  mercado: "fj",
  concepto: "propio",
  slug: "paye-penalty-calculator",
  estado: "publicado",
  requiere: { "fj.paye-late-lodgment-penalty": "numero", "fj.paye-late-payment-penalty": "numero" },
  campos: [
    { id: "paye", tipo: "moneda", etiqueta: "PAYE owed for the month", min: 0, porDefecto: 10000 },
    { id: "tardeFiling", tipo: "si-no", etiqueta: "The payday filing was lodged late", porDefecto: true },
    { id: "tardePago", tipo: "si-no", etiqueta: "The payment was made after the due date", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.paye <= 0) throw new ErrorEntrada("Enter the PAYE owed.", "paye");
    const filing = e.tardeFiling ? redondear(porcentaje(e.paye, v["fj.paye-late-lodgment-penalty"])) : 0;
    const pago = e.tardePago ? redondear(porcentaje(e.paye, v["fj.paye-late-payment-penalty"])) : 0;
    return {
      filing,
      pago,
      penalidades: redondear(filing + pago),
      total: redondear(e.paye + filing + pago),
      observaciones: ["Employers on six-monthly filing pay a different late lodgment penalty, set out in the Employer Guide."],
    };
  },
  resultado: [
    { clave: "penalidades", etiqueta: "Total penalties", formato: "moneda", destacada: true },
    { clave: "filing", etiqueta: "Late lodgment penalty", formato: "moneda" },
    { clave: "pago", etiqueta: "Late payment penalty", formato: "moneda" },
    { clave: "total", etiqueta: "PAYE plus penalties", formato: "moneda" },
  ],
});
