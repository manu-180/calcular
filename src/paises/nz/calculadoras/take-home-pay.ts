import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { accEarnersLevy, dolares, ietc, impuestoRenta, PERIODOS, sobreUmbral, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "nz.take-home-pay",
  mercado: "nz",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    "nz.income-tax-rates": "escala",
    "nz.acc-earners-levy-rate": "numero",
    "nz.acc-max-liable-earnings": "numero",
    "nz.ietc-annual": "numero",
    "nz.ietc-lower-threshold": "numero",
    "nz.ietc-abatement-threshold": "numero",
    "nz.ietc-upper-threshold": "numero",
    "nz.ietc-abatement-rate": "numero",
    "nz.student-loan-threshold": "numero",
    "nz.student-loan-rate": "numero",
    "nz.kiwisaver-employer-rate": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Your pay before tax", min: 0, porDefecto: 70000 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "That amount is per",
      opciones: [
        { valor: "year", etiqueta: "Year" },
        { valor: "month", etiqueta: "Month" },
        { valor: "fortnight", etiqueta: "Fortnight" },
        { valor: "week", etiqueta: "Week" },
      ],
      porDefecto: "year",
    },
    {
      id: "kiwisaver",
      tipo: "opcion",
      etiqueta: "Your KiwiSaver contribution",
      opciones: [
        { valor: "none", etiqueta: "Not in KiwiSaver" },
        { valor: "3", etiqueta: "3% (temporary rate reduction)" },
        { valor: "3.5", etiqueta: "3.5% (default)" },
        { valor: "4", etiqueta: "4%" },
        { valor: "6", etiqueta: "6%" },
        { valor: "8", etiqueta: "8%" },
        { valor: "10", etiqueta: "10%" },
      ],
      porDefecto: "3.5",
    },
    { id: "prestamo", tipo: "si-no", etiqueta: "You have a student loan", porDefecto: false },
    {
      id: "sinIetc",
      tipo: "si-no",
      etiqueta: "You or your partner get Working for Families, a main benefit or NZ Super",
      porDefecto: false,
      ayuda: "If so, you can't get the independent earner tax credit.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your pay before tax.", "salario");
    const anual = entrada.salario * PERIODOS[entrada.periodo];
    const escala = v["nz.income-tax-rates"];
    const impuesto = redondear(impuestoRenta(anual, escala));
    const acc = redondear(accEarnersLevy(anual, v["nz.acc-earners-levy-rate"], v["nz.acc-max-liable-earnings"]));
    const credito = entrada.sinIetc
      ? 0
      : redondear(
          ietc(anual, {
            anual: v["nz.ietc-annual"],
            minimo: v["nz.ietc-lower-threshold"],
            inicioReduccion: v["nz.ietc-abatement-threshold"],
            maximo: v["nz.ietc-upper-threshold"],
            tasaReduccion: v["nz.ietc-abatement-rate"],
          }),
        );
    const tasaKs = entrada.kiwisaver === "none" ? 0 : Number(entrada.kiwisaver);
    const kiwisaver = redondear((anual * tasaKs) / 100);
    const prestamo = entrada.prestamo ? redondear(sobreUmbral(anual, v["nz.student-loan-threshold"], v["nz.student-loan-rate"])) : 0;
    const neto = redondear(anual - impuesto - acc + credito - kiwisaver - prestamo);
    const empleador = entrada.kiwisaver === "none" ? 0 : redondear((anual * v["nz.kiwisaver-employer-rate"]) / 100);
    const observaciones: string[] = [];
    if (credito > 0) observaciones.push(`You get the independent earner tax credit of ${dolares(credito)} a year through the ME tax code.`);
    if (empleador > 0) observaciones.push(`Your employer also puts ${dolares(empleador)} a year into your KiwiSaver, before employer superannuation contribution tax.`);
    return {
      anual: neto,
      mensual: redondear(neto / 12),
      quincenal: redondear(neto / 26),
      semanal: redondear(neto / 52),
      bruto: redondear(anual),
      impuesto,
      acc,
      credito,
      kiwisaver,
      prestamo,
      marginal: tasaMarginal(escala, anual),
      observaciones,
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "Take-home pay a year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Take-home pay a month", formato: "moneda" },
    { clave: "quincenal", etiqueta: "Take-home pay a fortnight", formato: "moneda" },
    { clave: "semanal", etiqueta: "Take-home pay a week", formato: "moneda" },
    { clave: "bruto", etiqueta: "Gross pay a year", formato: "moneda" },
    { clave: "impuesto", etiqueta: "PAYE income tax", formato: "moneda" },
    { clave: "acc", etiqueta: "ACC earners' levy", formato: "moneda" },
    { clave: "credito", etiqueta: "Independent earner tax credit", formato: "moneda", ocultarSiCero: true },
    { clave: "kiwisaver", etiqueta: "Your KiwiSaver contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "prestamo", etiqueta: "Student loan repayment", formato: "moneda", ocultarSiCero: true },
    { clave: "marginal", etiqueta: "Your top income tax rate", formato: "porcentaje", decimales: 1 },
  ],
});
