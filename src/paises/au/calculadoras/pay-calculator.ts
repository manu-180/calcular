import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { leerHelp, leerLito, rentaResidente, repagoHelp } from "../lib/impuestos";

const PERIODOS = { anual: 1, mensual: 12, quincenal: 26, semanal: 52 } as const;

export default definirCalculadora({
  id: "au.pay-calculator",
  mercado: "au",
  concepto: "sueldo-neto",
  slug: "pay-calculator",
  estado: "publicado",
  requiere: {
    "au.escala-renta-2026-27": "escala",
    "au.lito": "mapa",
    "au.lito-tasas": "mapa",
    "au.medicare-levy": "numero",
    "au.medicare-umbrales": "mapa",
    "au.medicare-tasa-reduccion": "numero",
    "au.help-2026-27": "mapa",
    "au.help-tasas": "mapa",
    "au.super-guarantee": "numero",
    "au.super-base-maxima": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Your pay before tax", min: 0, porDefecto: 85000 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "That amount is per",
      opciones: [
        { valor: "anual", etiqueta: "Year" },
        { valor: "mensual", etiqueta: "Month" },
        { valor: "quincenal", etiqueta: "Fortnight" },
        { valor: "semanal", etiqueta: "Week" },
      ],
      porDefecto: "anual",
    },
    { id: "incluyeSuper", tipo: "si-no", etiqueta: "The amount includes super (salary package)", porDefecto: false },
    { id: "help", tipo: "si-no", etiqueta: "You have a HELP, VSL or other study loan", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your pay before tax.", "salario");
    const sg = v["au.super-guarantee"];
    const baseMaxima = v["au.super-base-maxima"];
    const total = entrada.salario * PERIODOS[entrada.periodo];
    let salario = total;
    if (entrada.incluyeSuper) {
      salario = total / (1 + sg / 100);
      if (salario > baseMaxima) salario = total - porcentaje(baseMaxima, sg);
    }
    salario = redondear(salario);
    const superAnual = redondear(porcentaje(Math.min(salario, baseMaxima), sg));
    const umbrales = v["au.medicare-umbrales"];
    const r = rentaResidente(salario, v["au.escala-renta-2026-27"], leerLito(v["au.lito"], v["au.lito-tasas"]), {
      tasa: v["au.medicare-levy"],
      umbral: umbrales.umbral,
      limite: umbrales.limite,
      tasaReduccion: v["au.medicare-tasa-reduccion"],
    });
    const impuesto = redondear(r.impuesto);
    const medicareLevy = redondear(r.medicare);
    const help = entrada.help ? redondear(repagoHelp(salario, leerHelp(v["au.help-2026-27"], v["au.help-tasas"]))) : 0;
    const neto = redondear(salario - impuesto - medicareLevy - help);
    const observaciones = [
      "Your employer withholds tax each payday with the ATO tax tables, so a payslip can differ by a few dollars. The exact amount is settled when you lodge your tax return.",
    ];
    if (salario > baseMaxima) observaciones.push("Your salary is above the maximum super contribution base, so the super guarantee is worked out on that base only.");
    return {
      neto,
      mensual: redondear(neto / 12),
      quincenal: redondear(neto / 26),
      semanal: redondear(neto / 52),
      salario,
      impuesto,
      medicareLevy,
      help,
      superAnual,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay a year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Take-home pay a month", formato: "moneda" },
    { clave: "quincenal", etiqueta: "Take-home pay a fortnight", formato: "moneda" },
    { clave: "semanal", etiqueta: "Take-home pay a week", formato: "moneda" },
    { clave: "salario", etiqueta: "Salary before tax (excluding super)", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Income tax", formato: "moneda" },
    { clave: "medicareLevy", etiqueta: "Medicare levy", formato: "moneda" },
    { clave: "help", etiqueta: "Study loan repayment", formato: "moneda", ocultarSiCero: true },
    { clave: "superAnual", etiqueta: "Super paid by your employer (a year)", formato: "moneda" },
  ],
});
