import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { delAnio, etiquetaAnio, impuestoSalarios, tope, totalAsignaciones } from "../lib/impuestos";

export default definirCalculadora({
  id: "hk.salaries-tax-calculator",
  mercado: "hk",
  concepto: "impuesto-renta",
  slug: "salaries-tax-calculator",
  estado: "publicado",
  requiere: {
    "hk.salaries-tax-rates": "escala",
    "hk.standard-rates": "escala",
    "hk.basic-allowance": "mapa",
    "hk.married-allowance": "mapa",
    "hk.child-allowance": "mapa",
    "hk.single-parent-allowance": "mapa",
    "hk.dependent-parent-60": "mapa",
    "hk.dependent-parent-55": "mapa",
    "hk.elderly-care-limit": "mapa",
    "hk.deduction-limits": "mapa",
    "hk.tax-reduction-cap": "mapa",
  },
  campos: [
    { id: "anio", tipo: "opcion-dato", etiqueta: "Year of assessment", dato: "hk.basic-allowance", porDefecto: "2026-27" },
    { id: "ingreso", tipo: "moneda", etiqueta: "Total income for the year", ayuda: "Salary, bonus, commission and allowances before MPF.", min: 0, porDefecto: 480000 },
    {
      id: "estado",
      tipo: "opcion",
      etiqueta: "Marital status",
      opciones: [
        { valor: "single", etiqueta: "Single, or married and taxed separately" },
        { valor: "married", etiqueta: "Married: joint assessment, or your spouse has no income" },
      ],
      porDefecto: "single",
    },
    { id: "monoparental", tipo: "si-no", etiqueta: "You have the sole or predominant care of a child", porDefecto: false, visibleSi: { estado: ["single"] } },
    { id: "hijos", tipo: "entero", etiqueta: "Children you maintain", min: 0, max: 9, porDefecto: 0 },
    {
      id: "hijosRecientes",
      tipo: "entero",
      etiqueta: "Of them, children born in the year (or, from 2026/27, in the year before)",
      min: 0,
      max: 9,
      porDefecto: 0,
    },
    { id: "padres60", tipo: "entero", etiqueta: "Parents or grandparents you maintain aged 60 or above", min: 0, max: 8, porDefecto: 0 },
    { id: "padres60Conviven", tipo: "entero", etiqueta: "Of them, living with you all year", min: 0, max: 8, porDefecto: 0 },
    { id: "padres55", tipo: "entero", etiqueta: "Parents or grandparents you maintain aged 55 to 59", min: 0, max: 8, porDefecto: 0 },
    { id: "padres55Conviven", tipo: "entero", etiqueta: "Of them, living with you all year", min: 0, max: 8, porDefecto: 0 },
    { id: "mpf", tipo: "moneda", etiqueta: "MPF mandatory contributions you paid", min: 0, porDefecto: 18000 },
    { id: "tvc", tipo: "moneda", etiqueta: "Tax deductible MPF voluntary contributions and qualifying annuity premiums", min: 0, porDefecto: 0 },
    { id: "alquiler", tipo: "moneda", etiqueta: "Domestic rent you paid", min: 0, porDefecto: 0 },
    { id: "educacion", tipo: "moneda", etiqueta: "Self-education expenses", min: 0, porDefecto: 0 },
    { id: "residencia", tipo: "moneda", etiqueta: "Elderly residential care expenses", min: 0, porDefecto: 0 },
    {
      id: "otras",
      tipo: "moneda",
      etiqueta: "Other deductions you can claim",
      ayuda: "For example approved charitable donations, home loan interest or VHIS premiums, each within its own limit.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("Enter your income for the year.", "ingreso");
    if (entrada.hijosRecientes > entrada.hijos) throw new ErrorEntrada("This can't be more than the number of children.", "hijosRecientes");
    const anio = entrada.anio;
    const limites = v["hk.deduction-limits"];
    const deducciones =
      tope(entrada.mpf, enMapa(limites, "mpf")) +
      tope(entrada.tvc, enMapa(limites, "tvc-annuity")) +
      tope(entrada.alquiler, enMapa(limites, "domestic-rent")) +
      tope(entrada.educacion, enMapa(limites, "self-education")) +
      tope(entrada.residencia, delAnio(v["hk.elderly-care-limit"], anio)) +
      Math.max(0, entrada.otras);
    const asignaciones = totalAsignaciones(
      {
        basica: v["hk.basic-allowance"],
        casado: v["hk.married-allowance"],
        hijo: v["hk.child-allowance"],
        monoparental: v["hk.single-parent-allowance"],
        padres60: v["hk.dependent-parent-60"],
        padres55: v["hk.dependent-parent-55"],
      },
      {
        casado: entrada.estado === "married",
        monoparental: entrada.monoparental === true,
        hijos: entrada.hijos,
        hijosRecientes: entrada.hijosRecientes,
        padres60: entrada.padres60,
        padres60Conviven: entrada.padres60Conviven,
        padres55: entrada.padres55,
        padres55Conviven: entrada.padres55Conviven,
      },
      anio,
    );
    const r = impuestoSalarios(entrada.ingreso - deducciones, asignaciones, v["hk.salaries-tax-rates"], v["hk.standard-rates"]);
    const impuesto = redondear(r.impuesto);
    const topeReduccion = v["hk.tax-reduction-cap"][anio] ?? 0;
    const reduccion = Math.min(impuesto, topeReduccion);
    const aPagar = redondear(impuesto - reduccion);
    const observaciones: string[] = [];
    if (r.metodo === "standard") observaciones.push("The standard rate gives you a lower bill than the progressive rates, so that's what you pay.");
    if (topeReduccion > 0) observaciones.push(`The ${etiquetaAnio(anio)} final tax is reduced by 100%, up to a cap per case. The reduction doesn't apply to provisional tax.`);
    if (entrada.estado === "married") observaciones.push("For joint assessment, enter the income and deductions of both spouses together.");
    return {
      deducciones: redondear(deducciones),
      ingresoNeto: redondear(r.ingresoNeto),
      asignaciones: redondear(r.asignaciones),
      baseImponible: redondear(r.baseImponible),
      progresivo: redondear(r.progresivo),
      estandar: redondear(r.estandar),
      impuesto,
      reduccion,
      aPagar,
      tasaEfectiva: (aPagar / entrada.ingreso) * 100,
      mensual: redondear(aPagar / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "aPagar", etiqueta: "Salaries tax payable", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Tax charged before any reduction", formato: "moneda" },
    { clave: "reduccion", etiqueta: "One-off tax reduction", formato: "moneda", ocultarSiCero: true },
    { clave: "deducciones", etiqueta: "Deductions", formato: "moneda" },
    { clave: "ingresoNeto", etiqueta: "Net income", formato: "moneda" },
    { clave: "asignaciones", etiqueta: "Allowances", formato: "moneda" },
    { clave: "baseImponible", etiqueta: "Net chargeable income", formato: "moneda" },
    { clave: "progresivo", etiqueta: "Tax at progressive rates", formato: "moneda" },
    { clave: "estandar", etiqueta: "Tax at standard rate", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Share of your income", formato: "porcentaje", decimales: 2 },
    { clave: "mensual", etiqueta: "To set aside each month", formato: "moneda" },
  ],
});
