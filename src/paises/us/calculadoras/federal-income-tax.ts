import { definirCalculadora } from "@/motor/calculo";
import {
  deduccionEstandar,
  deduccionSenior,
  escalaDe,
  ESCALAS,
  estadoValido,
  impuestoFederal,
  OPCIONES_ESTADO_CIVIL,
  personasValidas,
  tasaMarginal,
} from "../lib/impuestos";

export default definirCalculadora({
  id: "us.federal-income-tax",
  mercado: "us",
  concepto: "impuesto-renta",
  slug: "federal-income-tax",
  estado: "publicado",
  requiere: {
    ...ESCALAS,
    "us.standard-deduction": "mapa",
    "us.additional-standard-deduction": "mapa",
    "us.senior-deduction": "numero",
    "us.senior-deduction-threshold": "mapa",
    "us.senior-deduction-phaseout-rate": "numero",
  },
  campos: [
    { id: "estado", tipo: "opcion", etiqueta: "Filing status", opciones: OPCIONES_ESTADO_CIVIL, porDefecto: "single" },
    {
      id: "ingreso",
      tipo: "moneda",
      etiqueta: "Adjusted gross income (AGI)",
      min: 0,
      porDefecto: 75000,
      ayuda: "All taxable income for the year minus pre-tax 401(k) contributions and other adjustments.",
    },
    {
      id: "itemizadas",
      tipo: "moneda",
      etiqueta: "Itemized deductions",
      min: 0,
      requerido: false,
      ayuda: "Leave it blank to use the standard deduction. If you enter an amount, the larger of the two is used.",
    },
    { id: "mayores", tipo: "entero", etiqueta: "People on the return who are 65 or older", min: 0, max: 2, porDefecto: 0 },
    { id: "ciegos", tipo: "entero", etiqueta: "People on the return who are blind", min: 0, max: 2, porDefecto: 0 },
    { id: "retenido", tipo: "moneda", etiqueta: "Federal income tax withheld this year", min: 0, requerido: false, ayuda: "Box 2 of your W-2 forms plus any estimated payments." },
  ],
  calcular(entrada, valores, { redondear }) {
    const estado = estadoValido(entrada.estado);
    const mayores = personasValidas(entrada.mayores, estado, "mayores");
    const ciegos = personasValidas(entrada.ciegos, estado, "ciegos");
    const estandar = deduccionEstandar(valores["us.standard-deduction"], valores["us.additional-standard-deduction"], estado, mayores + ciegos);
    const itemizadas = entrada.itemizadas ?? 0;
    const usaItemizadas = itemizadas > estandar;
    const deduccion = usaItemizadas ? itemizadas : estandar;
    const senior = deduccionSenior(
      valores["us.senior-deduction"],
      valores["us.senior-deduction-threshold"],
      valores["us.senior-deduction-phaseout-rate"],
      estado,
      entrada.ingreso,
      mayores,
    );
    const seniorTotal = redondear(senior.total);
    const gravable = redondear(Math.max(0, entrada.ingreso - deduccion - seniorTotal));
    const escala = escalaDe(valores, estado);
    const impuesto = redondear(impuestoFederal(escala, gravable));
    const observaciones = ["This is the tax before credits such as the child tax credit. State and local income taxes are not included."];
    if (estado === "mfs" && mayores > 0) observaciones.push("The senior deduction is not available when married people file separately.");
    const retenido = entrada.retenido;
    return {
      deduccion: redondear(deduccion),
      tipoDeduccion: usaItemizadas ? "Itemized" : "Standard",
      senior: seniorTotal,
      gravable,
      impuesto,
      marginal: gravable > 0 ? tasaMarginal(escala, gravable) : 0,
      efectiva: entrada.ingreso > 0 ? redondear((impuesto / entrada.ingreso) * 100) : 0,
      reembolso: retenido === null ? null : redondear(Math.max(0, retenido - impuesto)),
      aPagar: retenido === null ? null : redondear(Math.max(0, impuesto - retenido)),
      observaciones,
    };
  },
  resultado: [
    { clave: "deduccion", etiqueta: "Deduction used", formato: "moneda" },
    { clave: "tipoDeduccion", etiqueta: "Type of deduction", formato: "texto" },
    { clave: "senior", etiqueta: "Senior deduction", formato: "moneda", ocultarSiCero: true },
    { clave: "gravable", etiqueta: "Taxable income", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Federal income tax", formato: "moneda", destacada: true },
    { clave: "marginal", etiqueta: "Marginal tax rate (your top bracket)", formato: "porcentaje" },
    { clave: "efectiva", etiqueta: "Effective tax rate on your AGI", formato: "porcentaje" },
    { clave: "reembolso", etiqueta: "Estimated refund", formato: "moneda", ocultarSiCero: true },
    { clave: "aPagar", etiqueta: "Estimated amount you owe", formato: "moneda", ocultarSiCero: true },
  ],
});
