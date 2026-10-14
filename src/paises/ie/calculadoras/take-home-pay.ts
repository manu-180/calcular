import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { creditoAlquiler, euros, impuestoRenta, prsiSemanal, usc } from "../lib/impuestos";

export default definirCalculadora({
  id: "ie.take-home-pay",
  mercado: "ie",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    "ie.income-tax-rates": "mapa",
    "ie.rate-bands": "mapa",
    "ie.tax-credits": "mapa",
    "ie.employee-credit-full-income": "numero",
    "ie.rent-tax-credit": "mapa",
    "ie.rent-tax-credit-rate": "numero",
    "ie.usc-bands": "escala",
    "ie.usc-reduced-bands": "escala",
    "ie.usc-reduced-income-limit": "numero",
    "ie.usc-exemption": "numero",
    "ie.prsi-employee-rate": "numero",
    "ie.prsi-weekly-thresholds": "mapa",
    "ie.prsi-credit-max": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross yearly salary", min: 0, porDefecto: 45000 },
    {
      id: "estado",
      tipo: "opcion",
      etiqueta: "Your tax status",
      opciones: [
        { valor: "single", etiqueta: "Single" },
        { valor: "single-parent", etiqueta: "Single parent (Single Person Child Carer Credit)" },
        { valor: "married-one-income", etiqueta: "Married or civil partners, only you earn" },
      ],
      porDefecto: "single",
    },
    { id: "alquiler", tipo: "moneda", etiqueta: "Rent you pay in the year (for the Rent Tax Credit)", min: 0, porDefecto: 0 },
    { id: "reducida", tipo: "si-no", etiqueta: "You are 70 or over, or have a full medical card", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter a salary above zero.", "salario");
    const renta = impuestoRenta(entrada.estado, [entrada.salario], {
      tasas: v["ie.income-tax-rates"],
      bandas: v["ie.rate-bands"],
      creditos: v["ie.tax-credits"],
      ingresoCreditoCompleto: v["ie.employee-credit-full-income"],
    });
    const topeAlquiler = enMapa(v["ie.rent-tax-credit"], entrada.estado === "married-one-income" ? "couple" : "single");
    const alquiler = redondear(creditoAlquiler(entrada.alquiler, topeAlquiler, v["ie.rent-tax-credit-rate"], renta.impuesto));
    const impuesto = redondear(renta.impuesto - alquiler);
    const cargoUsc = usc(entrada.salario, entrada.reducida, {
      escala: v["ie.usc-bands"],
      escalaReducida: v["ie.usc-reduced-bands"],
      exencion: v["ie.usc-exemption"],
      limiteReducida: v["ie.usc-reduced-income-limit"],
    });
    const uscAnual = redondear(cargoUsc.usc);
    const umbrales = v["ie.prsi-weekly-thresholds"];
    const semana = prsiSemanal(
      entrada.salario / 52,
      { tasa: v["ie.prsi-employee-rate"], desde: umbrales["employee-starts"], finCredito: umbrales["credit-ends"], creditoMaximo: v["ie.prsi-credit-max"] },
      redondear,
    );
    const prsi = redondear(semana.prsi * 52);
    const anual = redondear(entrada.salario - impuesto - uscAnual - prsi);
    const observaciones: string[] = [];
    if (cargoUsc.exento) observaciones.push(`Your income is ${euros(v["ie.usc-exemption"])} or less, so you pay no USC.`);
    if (entrada.reducida && !cargoUsc.reducida && !cargoUsc.exento) {
      observaciones.push(`Reduced USC rates only apply if your income is ${euros(v["ie.usc-reduced-income-limit"])} or less, so the standard rates are used.`);
    }
    if (entrada.alquiler > 0 && alquiler < Math.min((entrada.alquiler * v["ie.rent-tax-credit-rate"]) / 100, topeAlquiler)) {
      observaciones.push("Your Rent Tax Credit is limited to the Income Tax you pay, so you cannot use all of it.");
    }
    return {
      anual,
      mensual: redondear(anual / 12),
      semanal: redondear(anual / 52),
      impuesto,
      usc: uscAnual,
      prsi,
      creditos: redondear(Math.min(renta.creditos, renta.bruto) + alquiler),
      marginal: renta.tasaMarginal,
      observaciones,
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "Take-home pay a year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Take-home pay a month", formato: "moneda" },
    { clave: "semanal", etiqueta: "Take-home pay a week", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Income Tax (PAYE)", formato: "moneda" },
    { clave: "usc", etiqueta: "Universal Social Charge", formato: "moneda" },
    { clave: "prsi", etiqueta: "PRSI", formato: "moneda" },
    { clave: "creditos", etiqueta: "Tax credits used", formato: "moneda" },
    { clave: "marginal", etiqueta: "Your top Income Tax rate", formato: "porcentaje", decimales: 0 },
  ],
});
