import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.sick-leave-calculator",
  mercado: "rw",
  concepto: "propio",
  slug: "sick-leave-calculator",
  estado: "publicado",
  requiere: {
    "rw.sick-short-days": "numero",
    "rw.sick-long-months": "numero",
    "rw.sick-full-pay-months": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Length of the sickness",
      opciones: [
        { valor: "short", etiqueta: "Up to 15 days (short-term)" },
        { valor: "long", etiqueta: "Longer, confirmed by a medical committee" },
      ],
      porDefecto: "long",
    },
    { id: "meses", tipo: "numero", etiqueta: "Months off work", min: 0, porDefecto: 4, visibleSi: { tipo: ["long"] } },
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 300000, visibleSi: { tipo: ["long"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.tipo === "short") {
      return {
        diasPagados: v["rw.sick-short-days"],
        mesesPagados: null,
        mesesSinPago: null,
        salarioPagado: null,
        observaciones: ["Short-term sick leave is paid. Give your employer a medical certificate signed by a recognised doctor."],
      };
    }
    const meses = e.meses ?? 0;
    const salario = e.salario ?? 0;
    if (meses <= 0) throw new ErrorEntrada("Enter how many months you are off work.", "meses");
    const tope = v["rw.sick-long-months"];
    const pagados = Math.min(meses, v["rw.sick-full-pay-months"]);
    const sinPago = Math.max(0, Math.min(meses, tope) - pagados);
    const observaciones = ["Long-term sick leave needs a medical committee of three recognised doctors."];
    if (meses > tope) observaciones.push(`Sick leave stops at ${tope} months. If you still cannot work after that, the employer may end the contract and owes terminal benefits.`);
    return { diasPagados: null, mesesPagados: pagados, mesesSinPago: sinPago, salarioPagado: redondear(salario * pagados), observaciones };
  },
  resultado: [
    { clave: "diasPagados", etiqueta: "Most days of paid short-term sick leave", formato: "dias", destacada: true },
    { clave: "mesesPagados", etiqueta: "Months on full salary", formato: "meses", destacada: true },
    { clave: "mesesSinPago", etiqueta: "Months of unpaid suspension", formato: "meses" },
    { clave: "salarioPagado", etiqueta: "Salary paid during sick leave", formato: "moneda" },
  ],
});
