import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoAnual, OPCIONES_PERIODO, PERIODOS_POR_ANIO, tasaMarginal } from "../lib/nomina";

export default definirCalculadora({
  id: "fj.paye-calculator",
  mercado: "fj",
  concepto: "impuesto-renta",
  slug: "paye-calculator",
  estado: "publicado",
  requiere: {
    "fj.paye-bands": "escala",
    "fj.paye-bands-non-resident": "escala",
    "fj.paye-no-declaration-rate": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay", min: 0, porDefecto: 5000, ayuda: "Wages before tax, with taxable allowances and bonuses." },
    { id: "periodo", tipo: "opcion", etiqueta: "Pay period", opciones: [...OPCIONES_PERIODO], porDefecto: "month" },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "Tax residence",
      opciones: [
        { valor: "resident", etiqueta: "Resident" },
        { valor: "non-resident", etiqueta: "Non-resident" },
      ],
      porDefecto: "resident",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the period.", "bruto");
    const n = PERIODOS_POR_ANIO[e.periodo];
    const escala = e.residencia === "resident" ? v["fj.paye-bands"] : v["fj.paye-bands-non-resident"];
    const brutoAnual = redondear(e.bruto * n);
    const anual = impuestoAnual(escala, brutoAnual, redondear);
    const periodo = redondear(anual / n);
    return {
      impuestoPeriodo: periodo,
      impuestoAnual: anual,
      brutoAnual,
      netoPeriodo: redondear(e.bruto - periodo),
      tasaEfectiva: (anual / brutoAnual) * 100,
      tasaMarginal: tasaMarginal(escala, brutoAnual),
    };
  },
  resultado: [
    { clave: "impuestoPeriodo", etiqueta: "PAYE for the pay period", formato: "moneda", destacada: true },
    { clave: "impuestoAnual", etiqueta: "Income tax over a full year", formato: "moneda" },
    { clave: "brutoAnual", etiqueta: "Gross pay over a full year", formato: "moneda" },
    { clave: "netoPeriodo", etiqueta: "Pay after PAYE, before FNPF", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Average tax rate", formato: "porcentaje", decimales: 1 },
    { clave: "tasaMarginal", etiqueta: "Tax rate on your next dollar", formato: "porcentaje", decimales: 0 },
  ],
});
