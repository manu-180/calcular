import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { dolares, leerLito, rentaResidente, type Medicare } from "../lib/impuestos";

export default definirCalculadora({
  id: "au.salary-sacrifice-calculator",
  mercado: "au",
  concepto: "propio",
  slug: "salary-sacrifice-calculator",
  estado: "publicado",
  requiere: {
    "au.escala-renta-2026-27": "escala",
    "au.lito": "mapa",
    "au.lito-tasas": "mapa",
    "au.medicare-levy": "numero",
    "au.medicare-umbrales": "mapa",
    "au.medicare-tasa-reduccion": "numero",
    "au.super-guarantee": "numero",
    "au.super-base-maxima": "numero",
    "au.tope-concesional": "numero",
    "au.impuesto-aportes": "numero",
    "au.div293-umbral": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Your salary a year (excluding super)", min: 0, porDefecto: 100000 },
    { id: "sacrificio", tipo: "moneda", etiqueta: "Amount you salary sacrifice into super a year", min: 0, porDefecto: 10000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your salary.", "salario");
    if (entrada.sacrificio < 0 || entrada.sacrificio > entrada.salario) throw new ErrorEntrada("The amount you sacrifice has to be between zero and your salary.", "sacrificio");
    const u = v["au.medicare-umbrales"];
    const m: Medicare = { tasa: v["au.medicare-levy"], umbral: u.umbral, limite: u.limite, tasaReduccion: v["au.medicare-tasa-reduccion"] };
    const l = leerLito(v["au.lito"], v["au.lito-tasas"]);
    const escala = v["au.escala-renta-2026-27"];
    const antes = rentaResidente(entrada.salario, escala, l, m);
    const despues = rentaResidente(entrada.salario - entrada.sacrificio, escala, l, m);
    const ahorroImpuesto = redondear(antes.total - despues.total);
    const impuestoFondo = redondear(porcentaje(entrada.sacrificio, v["au.impuesto-aportes"]));
    const aporteEmpleador = redondear(porcentaje(Math.min(entrada.salario, v["au.super-base-maxima"]), v["au.super-guarantee"]));
    const tope = v["au.tope-concesional"];
    const total = aporteEmpleador + entrada.sacrificio;
    const observaciones: string[] = [];
    if (total > tope) observaciones.push(`Your concessional contributions would be ${dolares(redondear(total))}, above the ${dolares(tope)} cap. The excess is added to your taxable income and taxed at your marginal rate.`);
    if (entrada.salario > v["au.div293-umbral"] - total) {
      observaciones.push(`Your income plus concessional contributions may be over ${dolares(v["au.div293-umbral"])}, so Division 293 tax could apply to your contributions.`);
    }
    return {
      ahorroImpuesto,
      impuestoFondo,
      beneficio: redondear(ahorroImpuesto - impuestoFondo),
      menosEnMano: redondear(entrada.sacrificio - ahorroImpuesto),
      alFondo: redondear(entrada.sacrificio - impuestoFondo),
      aporteEmpleador,
      espacio: redondear(Math.max(0, tope - aporteEmpleador)),
      exceso: redondear(Math.max(0, total - tope)),
      observaciones,
    };
  },
  resultado: [
    { clave: "beneficio", etiqueta: "Tax you save overall", formato: "moneda", destacada: true },
    { clave: "ahorroImpuesto", etiqueta: "Less income tax and Medicare levy", formato: "moneda" },
    { clave: "impuestoFondo", etiqueta: "Contributions tax paid by your fund", formato: "moneda" },
    { clave: "alFondo", etiqueta: "Added to your super after contributions tax", formato: "moneda" },
    { clave: "menosEnMano", etiqueta: "Reduction in your take-home pay", formato: "moneda" },
    { clave: "aporteEmpleador", etiqueta: "Employer super guarantee", formato: "moneda" },
    { clave: "espacio", etiqueta: "Room under the concessional cap after employer super", formato: "moneda" },
    { clave: "exceso", etiqueta: "Amount over the cap", formato: "moneda", ocultarSiCero: true },
  ],
});
