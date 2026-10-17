import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";
import { impuestoRenta, rupias, tasaMarginal, type Edad } from "../lib/impuestos";

export default definirCalculadora({
  id: "in.income-tax-calculator",
  mercado: "in",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "in.new-regime-slabs": "escala",
    "in.old-regime-slabs": "escala",
    "in.old-regime-slabs-senior": "escala",
    "in.old-regime-slabs-super-senior": "escala",
    "in.surcharge-new": "escala",
    "in.surcharge-old": "escala",
    "in.standard-deduction-new": "numero",
    "in.standard-deduction-old": "numero",
    "in.rebate-new-limit": "numero",
    "in.rebate-new-max": "numero",
    "in.rebate-old-limit": "numero",
    "in.rebate-old-max": "numero",
    "in.cess": "numero",
    "in.section-123-limit": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salary for the year (gross, before tax)", min: 0, porDefecto: 1500000, ayuda: "Taxable salary after exempt allowances. Leave 0 if you are not salaried." },
    { id: "otros", tipo: "moneda", etiqueta: "Other income (interest, rent, freelance)", min: 0, porDefecto: 0 },
    {
      id: "edad",
      tipo: "opcion",
      etiqueta: "Your age during the tax year",
      opciones: [
        { valor: "below60", etiqueta: "Below 60" },
        { valor: "60to79", etiqueta: "60 to 79" },
        { valor: "80plus", etiqueta: "80 or more" },
      ],
      porDefecto: "below60",
    },
    { id: "seccion123", tipo: "moneda", etiqueta: "Old regime: section 123 investments (formerly 80C)", min: 0, porDefecto: 150000, ayuda: "EPF, PPF, ELSS, life insurance, home loan principal and similar. Capped by law." },
    { id: "otrasDeducciones", tipo: "moneda", etiqueta: "Old regime: other deductions and exemptions", min: 0, porDefecto: 0, ayuda: "HRA exemption, health insurance, home loan interest, professional tax and the like." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario < 0 || entrada.otros < 0) throw new ErrorEntrada("Income cannot be negative.", "salario");
    const edad = entrada.edad as Edad;
    const bruto = entrada.salario + entrada.otros;

    const stdNew = Math.min(entrada.salario, v["in.standard-deduction-new"]);
    const gravableNew = Math.max(0, bruto - stdNew);
    const nuevo = impuestoRenta("new", gravableNew, {
      slabs: v["in.new-regime-slabs"],
      surcharge: v["in.surcharge-new"],
      rebateLimit: v["in.rebate-new-limit"],
      rebateMax: v["in.rebate-new-max"],
      cess: v["in.cess"],
    });

    const slabsOld: readonly FilaEscala[] =
      edad === "80plus" ? v["in.old-regime-slabs-super-senior"] : edad === "60to79" ? v["in.old-regime-slabs-senior"] : v["in.old-regime-slabs"];
    const stdOld = Math.min(entrada.salario, v["in.standard-deduction-old"]);
    const s123 = Math.min(entrada.seccion123, v["in.section-123-limit"]);
    const gravableOld = Math.max(0, bruto - stdOld - s123 - entrada.otrasDeducciones);
    const viejo = impuestoRenta("old", gravableOld, {
      slabs: slabsOld,
      surcharge: v["in.surcharge-old"],
      rebateLimit: v["in.rebate-old-limit"],
      rebateMax: v["in.rebate-old-max"],
      cess: v["in.cess"],
    });

    const impNew = redondear(nuevo.total);
    const impOld = redondear(viejo.total);
    const observaciones: string[] = [];
    if (nuevo.rebate > 0) observaciones.push(`New regime: the section 156 rebate takes ${rupias(redondear(nuevo.rebate))} off your tax.`);
    if (nuevo.surcharge > 0 || viejo.surcharge > 0) observaciones.push("Surcharge is included because your income is above ₹50 lakh.");
    if (entrada.seccion123 > s123) observaciones.push(`Section 123 investments are capped at ${rupias(v["in.section-123-limit"])}.`);
    observaciones.push(
      impNew <= impOld
        ? `The new regime saves you ${rupias(redondear(impOld - impNew))} a year.`
        : `The old regime saves you ${rupias(redondear(impNew - impOld))} a year with these deductions.`,
    );

    return {
      impuestoNuevo: impNew,
      gravableNuevo: redondear(gravableNew),
      mensualNuevo: redondear(impNew / 12),
      marginalNuevo: tasaMarginal(v["in.new-regime-slabs"], gravableNew),
      impuestoViejo: impOld,
      gravableViejo: redondear(gravableOld),
      mensualViejo: redondear(impOld / 12),
      mejor: impNew <= impOld ? "New regime" : "Old regime",
      ahorro: redondear(Math.abs(impOld - impNew)),
      cessNuevo: redondear(nuevo.cess),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuestoNuevo", etiqueta: "Tax under the new regime", formato: "moneda", destacada: true },
    { clave: "impuestoViejo", etiqueta: "Tax under the old regime", formato: "moneda", destacada: true },
    { clave: "mejor", etiqueta: "Better for you", formato: "texto" },
    { clave: "ahorro", etiqueta: "Difference a year", formato: "moneda" },
    { clave: "gravableNuevo", etiqueta: "Taxable income, new regime", formato: "moneda" },
    { clave: "gravableViejo", etiqueta: "Taxable income, old regime", formato: "moneda" },
    { clave: "mensualNuevo", etiqueta: "Monthly TDS, new regime", formato: "moneda" },
    { clave: "mensualViejo", etiqueta: "Monthly TDS, old regime", formato: "moneda" },
    { clave: "cessNuevo", etiqueta: "Health and Education Cess, new regime", formato: "moneda", ocultarSiCero: true },
    { clave: "marginalNuevo", etiqueta: "Top slab rate, new regime", formato: "porcentaje", decimales: 0 },
  ],
});
