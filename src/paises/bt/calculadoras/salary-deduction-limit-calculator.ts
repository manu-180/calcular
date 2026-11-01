import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.salary-deduction-limit-calculator",
  mercado: "bt",
  concepto: "propio",
  slug: "salary-deduction-limit-calculator",
  estado: "publicado",
  requiere: {
    "bt.deduction-floor-share": "numero",
    "bt.overpayment-recovery-months": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Total wage for the pay period", min: 0, porDefecto: 30000 },
    { id: "descuentos", tipo: "moneda", etiqueta: "Deductions the employer plans to make", min: 0, porDefecto: 18000, ayuda: "Loan repayments, advances, damage to tools, mistaken overpayments and similar." },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter the total wage for the pay period.", "salario");
    const minimo = redondear(e.salario * (v["bt.deduction-floor-share"] / 100));
    const maximo = redondear(e.salario - minimo);
    const permitido = Math.min(e.descuentos, maximo);
    return {
      maximo,
      minimo,
      permitido: redondear(permitido),
      exceso: redondear(Math.max(0, e.descuentos - maximo)),
      neto: redondear(e.salario - permitido),
      meses: v["bt.overpayment-recovery-months"],
    };
  },
  resultado: [
    { clave: "maximo", etiqueta: "Most that can be deducted", formato: "moneda", destacada: true },
    { clave: "minimo", etiqueta: "Least you must be paid", formato: "moneda" },
    { clave: "permitido", etiqueta: "Deductions that fit the limit", formato: "moneda" },
    { clave: "exceso", etiqueta: "Part of the planned deductions over the limit", formato: "moneda", ocultarSiCero: true },
    { clave: "neto", etiqueta: "Pay you take home", formato: "moneda" },
    { clave: "meses", etiqueta: "Months back a mistaken overpayment can be recovered", formato: "meses" },
  ],
});
