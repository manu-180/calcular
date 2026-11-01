import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuestoAnual, REQUIERE_IMPUESTO } from "../lib/nomina";

export default definirCalculadora({
  id: "np.income-tax-calculator",
  mercado: "np",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: REQUIERE_IMPUESTO,
  campos: [
    { id: "mensual", tipo: "moneda", etiqueta: "Pay for the month", min: 0, porDefecto: 100000, ayuda: "Basic pay plus allowances, before any deduction." },
    { id: "bonusAnual", tipo: "moneda", etiqueta: "Bonus and other pay for the year", min: 0, porDefecto: 0, ayuda: "Added to twelve months of pay." },
    { id: "ssf", tipo: "si-no", etiqueta: "You contribute to the Social Security Fund", porDefecto: true },
    { id: "basico", tipo: "moneda", etiqueta: "Basic pay for the month", min: 0, porDefecto: 50000, visibleSi: { ssf: [true] }, ayuda: "The Fund takes its contribution from basic pay only." },
    { id: "aporteRetiro", tipo: "moneda", etiqueta: "Contribution to an approved retirement fund for the year", min: 0, porDefecto: 0, visibleSi: { ssf: [false] } },
    {
      id: "remota",
      tipo: "opcion",
      etiqueta: "Remote area allowance category",
      opciones: [
        { valor: "none", etiqueta: "Not posted in a remote area" },
        { valor: "a", etiqueta: "Category A" },
        { valor: "b", etiqueta: "Category B" },
        { valor: "c", etiqueta: "Category C" },
        { valor: "d", etiqueta: "Category D" },
        { valor: "e", etiqueta: "Category E" },
      ],
      porDefecto: "none",
    },
    { id: "seguroVida", tipo: "moneda", etiqueta: "Life insurance premium paid in the year", min: 0, porDefecto: 0 },
    { id: "seguroSalud", tipo: "moneda", etiqueta: "Health insurance premium paid in the year", min: 0, porDefecto: 0 },
    { id: "seguroCasa", tipo: "moneda", etiqueta: "Premium on your own house paid in the year", min: 0, porDefecto: 0 },
    { id: "mujer", tipo: "si-no", etiqueta: "You are a woman and pay is your only income", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual <= 0) throw new ErrorEntrada("Enter your pay for the month.", "mensual");
    const ingresoAnual = redondear(e.mensual * 12 + e.bonusAnual);
    const basico = e.basico ?? 0;
    if (e.ssf && basico > e.mensual) throw new ErrorEntrada("Basic pay cannot be more than your pay for the month.", "basico");
    const r = impuestoAnual(
      {
        ingresoAnual,
        ssf: e.ssf,
        basicoMensual: basico,
        aporteRetiroAnual: e.aporteRetiro ?? 0,
        remota: e.remota,
        seguroVida: e.seguroVida,
        seguroSalud: e.seguroSalud,
        seguroCasa: e.seguroCasa,
        mujer: e.mujer,
      },
      v,
      redondear,
    );
    const observaciones: string[] = [];
    if (r.impuesto === 0) observaciones.push("Your taxable income falls in the band that carries no tax for you, so nothing is due.");
    if (e.ssf) observaciones.push("As a Fund contributor you do not pay the 1% on the first band. Your 10% provident fund share is deducted from taxable income.");
    return {
      impuestoAnual: r.impuesto,
      impuestoMensual: redondear(r.impuesto / 12),
      ingresoAnual,
      gravable: r.gravable,
      retiro: r.retiro,
      seguros: r.seguros,
      remota: r.remota,
      impuestoBruto: r.impuestoBruto,
      rebaja: r.rebaja,
      efectiva: (r.impuesto / ingresoAnual) * 100,
      marginal: r.marginal,
      aporteSsf: r.aporteSsfAnual,
      observaciones,
    };
  },
  resultado: [
    { clave: "impuestoMensual", etiqueta: "Income tax a month", formato: "moneda", destacada: true },
    { clave: "impuestoAnual", etiqueta: "Income tax for the year", formato: "moneda" },
    { clave: "ingresoAnual", etiqueta: "Income for the year", formato: "moneda" },
    { clave: "retiro", etiqueta: "Retirement contribution deducted", formato: "moneda", ocultarSiCero: true },
    { clave: "seguros", etiqueta: "Insurance premiums deducted", formato: "moneda", ocultarSiCero: true },
    { clave: "remota", etiqueta: "Remote area allowance deducted", formato: "moneda", ocultarSiCero: true },
    { clave: "gravable", etiqueta: "Taxable income", formato: "moneda" },
    { clave: "impuestoBruto", etiqueta: "Tax before the women's rebate", formato: "moneda" },
    { clave: "rebaja", etiqueta: "Rebate for a woman with pay only", formato: "moneda", ocultarSiCero: true },
    { clave: "efectiva", etiqueta: "Tax as a share of income", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Rate on your last rupee", formato: "porcentaje", decimales: 0 },
    { clave: "aporteSsf", etiqueta: "Your Fund contribution for the year", formato: "moneda", ocultarSiCero: true },
  ],
});
