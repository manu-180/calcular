import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { impuestoRenta, libras, niPorTramos, sobreUmbral, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "gb.take-home-pay",
  mercado: "gb",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    "gb.personal-allowance": "numero",
    "gb.personal-allowance-taper": "numero",
    "gb.additional-rate-threshold": "numero",
    "gb.income-tax-bands": "escala-por-region",
    "gb.ni-primary-threshold": "numero",
    "gb.ni-upper-earnings-limit": "numero",
    "gb.ni-employee-main-rate": "numero",
    "gb.ni-employee-upper-rate": "numero",
    "gb.student-loan-thresholds": "mapa",
    "gb.student-loan-rate": "numero",
    "gb.postgraduate-loan-rate": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Annual salary before tax", min: 0, porDefecto: 35000 },
    { id: "region", tipo: "region", etiqueta: "Where you live", porDefecto: "england-wales-ni" },
    {
      id: "plan",
      tipo: "opcion",
      etiqueta: "Student loan",
      opciones: [
        { valor: "none", etiqueta: "No student loan" },
        { valor: "plan-1", etiqueta: "Plan 1" },
        { valor: "plan-2", etiqueta: "Plan 2" },
        { valor: "plan-4", etiqueta: "Plan 4 (Scotland)" },
        { valor: "plan-5", etiqueta: "Plan 5" },
      ],
      porDefecto: "none",
    },
    { id: "posgrado", tipo: "si-no", etiqueta: "You also repay a Postgraduate Loan", porDefecto: false },
    { id: "pension", tipo: "porcentaje", etiqueta: "Your pension contribution (% of salary)", min: 0, max: 100, porDefecto: 0 },
    {
      id: "tipoPension",
      tipo: "opcion",
      etiqueta: "How your pension is paid",
      opciones: [
        { valor: "net-pay", etiqueta: "Taken before tax (net pay arrangement)" },
        { valor: "salary-sacrifice", etiqueta: "Salary sacrifice" },
        { valor: "relief-at-source", etiqueta: "Taken after tax (relief at source)" },
      ],
      porDefecto: "net-pay",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter a salary above zero.", "salario");
    const aporte = (entrada.salario * entrada.pension) / 100;
    const escala = porRegion(v["gb.income-tax-bands"], entrada.region);
    const sacrificio = entrada.tipoPension === "salary-sacrifice";
    const basePaga = sacrificio ? entrada.salario - aporte : entrada.salario;
    const baseImpuesto = entrada.tipoPension === "relief-at-source" ? entrada.salario : entrada.salario - aporte;
    const renta = impuestoRenta(baseImpuesto, escala, v["gb.personal-allowance"], v["gb.personal-allowance-taper"]);
    const impuesto = redondear(renta.impuesto);
    const ni = redondear(
      niPorTramos(basePaga, {
        umbral: v["gb.ni-primary-threshold"],
        limite: v["gb.ni-upper-earnings-limit"],
        tasa: v["gb.ni-employee-main-rate"],
        tasaAlta: v["gb.ni-employee-upper-rate"],
      }),
    );
    const umbrales = v["gb.student-loan-thresholds"];
    const prestamo = entrada.plan === "none" ? 0 : redondear(sobreUmbral(basePaga, umbrales[entrada.plan], v["gb.student-loan-rate"]));
    const posgrado = entrada.posgrado ? redondear(sobreUmbral(basePaga, umbrales.postgraduate, v["gb.postgraduate-loan-rate"])) : 0;
    const basica = porRegion(v["gb.income-tax-bands"], "england-wales-ni")[0].tasa;
    const pagoPension = redondear(entrada.tipoPension === "relief-at-source" ? aporte * (1 - basica / 100) : sacrificio ? 0 : aporte);
    const anual = redondear(basePaga - impuesto - ni - prestamo - posgrado - pagoPension);
    const observaciones: string[] = [];
    if (renta.allowance < v["gb.personal-allowance"]) {
      observaciones.push(`Your income is over ${libras(v["gb.personal-allowance-taper"])}, so your Personal Allowance is reduced by £1 for every £2 above that limit.`);
    }
    if (sacrificio && aporte > 0) observaciones.push("With salary sacrifice your pension comes out of your pay before tax and National Insurance, so it does not appear as a deduction.");
    if (entrada.tipoPension === "relief-at-source" && aporte > 0) {
      observaciones.push("Your provider adds basic rate tax relief to what you pay. Higher rate taxpayers can claim the rest through Self Assessment.");
    }
    return {
      anual,
      mensual: redondear(anual / 12),
      semanal: redondear(anual / 52),
      impuesto,
      ni,
      prestamo,
      posgrado,
      pagoPension,
      allowance: renta.allowance,
      marginal: tasaMarginal(escala, renta.gravable),
      observaciones,
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "Take-home pay a year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Take-home pay a month", formato: "moneda" },
    { clave: "semanal", etiqueta: "Take-home pay a week", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Income Tax", formato: "moneda" },
    { clave: "ni", etiqueta: "National Insurance", formato: "moneda" },
    { clave: "prestamo", etiqueta: "Student loan repayment", formato: "moneda", ocultarSiCero: true },
    { clave: "posgrado", etiqueta: "Postgraduate Loan repayment", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoPension", etiqueta: "Your pension contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "allowance", etiqueta: "Personal Allowance used", formato: "moneda" },
    { clave: "marginal", etiqueta: "Your top Income Tax rate", formato: "porcentaje", decimales: 0 },
  ],
});
