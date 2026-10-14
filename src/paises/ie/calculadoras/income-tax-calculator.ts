import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { creditoAlquiler, euros, impuestoRenta } from "../lib/impuestos";

export default definirCalculadora({
  id: "ie.income-tax-calculator",
  mercado: "ie",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "ie.income-tax-rates": "mapa",
    "ie.rate-bands": "mapa",
    "ie.tax-credits": "mapa",
    "ie.employee-credit-full-income": "numero",
    "ie.rent-tax-credit": "mapa",
    "ie.rent-tax-credit-rate": "numero",
  },
  campos: [
    {
      id: "estado",
      tipo: "opcion",
      etiqueta: "Your tax status",
      opciones: [
        { valor: "single", etiqueta: "Single" },
        { valor: "single-parent", etiqueta: "Single parent (Single Person Child Carer Credit)" },
        { valor: "married-one-income", etiqueta: "Married or civil partners, one income" },
        { valor: "married-two-incomes", etiqueta: "Married or civil partners, two incomes" },
      ],
      porDefecto: "single",
    },
    { id: "ingreso", tipo: "moneda", etiqueta: "Your yearly employment income", min: 0, porDefecto: 45000 },
    {
      id: "ingresoPareja",
      tipo: "moneda",
      etiqueta: "Your spouse's or partner's yearly employment income",
      min: 0,
      porDefecto: 0,
      ayuda: "Only used for married couples or civil partners with two incomes, taxed under joint assessment.",
    },
    { id: "alquiler", tipo: "moneda", etiqueta: "Rent paid in the year (for the Rent Tax Credit)", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    const dos = entrada.estado === "married-two-incomes";
    if (dos && entrada.ingresoPareja <= 0) throw new ErrorEntrada("Enter your spouse's or partner's income, or choose one income.", "ingresoPareja");
    const ingresos = dos ? [entrada.ingreso, entrada.ingresoPareja] : [entrada.ingreso];
    const total = ingresos.reduce((a, b) => a + b, 0);
    if (total <= 0) throw new ErrorEntrada("Enter an income above zero.", "ingreso");
    const renta = impuestoRenta(entrada.estado, ingresos, {
      tasas: v["ie.income-tax-rates"],
      bandas: v["ie.rate-bands"],
      creditos: v["ie.tax-credits"],
      ingresoCreditoCompleto: v["ie.employee-credit-full-income"],
    });
    const pareja = entrada.estado === "married-one-income" || dos;
    const alquiler = redondear(creditoAlquiler(entrada.alquiler, enMapa(v["ie.rent-tax-credit"], pareja ? "couple" : "single"), v["ie.rent-tax-credit-rate"], renta.impuesto));
    const impuesto = redondear(renta.impuesto - alquiler);
    const observaciones: string[] = [];
    if (renta.creditos > renta.bruto) observaciones.push("Your tax credits are more than your tax, so you pay no Income Tax. Unused credits are not paid out.");
    if (dos) {
      observaciones.push(
        `The band goes up by the lower income, up to ${euros(v["ie.rate-bands"]["married-increase-max"])}. That increase cannot be moved from one spouse to the other.`,
      );
    }
    observaciones.push("USC and PRSI are charged on top. The take-home pay calculator includes them.");
    return {
      impuesto,
      mensual: redondear(impuesto / 12),
      bruto: redondear(renta.bruto),
      creditos: redondear(renta.creditos),
      alquiler,
      banda: renta.banda,
      efectiva: total > 0 ? (impuesto / total) * 100 : 0,
      marginal: renta.tasaMarginal,
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income Tax for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Income Tax a month", formato: "moneda" },
    { clave: "bruto", etiqueta: "Tax before credits", formato: "moneda" },
    { clave: "creditos", etiqueta: "Tax credits", formato: "moneda" },
    { clave: "alquiler", etiqueta: "Rent Tax Credit used", formato: "moneda", ocultarSiCero: true },
    { clave: "banda", etiqueta: "Standard rate band", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Share of your income paid in Income Tax", formato: "porcentaje", decimales: 1 },
    { clave: "marginal", etiqueta: "Top rate on your income", formato: "porcentaje", decimales: 0 },
  ],
});
