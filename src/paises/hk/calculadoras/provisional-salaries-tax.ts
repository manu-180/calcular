import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { etiquetaAnio, impuestoSalarios, tope, totalAsignaciones } from "../lib/impuestos";

export default definirCalculadora({
  id: "hk.provisional-salaries-tax",
  mercado: "hk",
  concepto: "propio",
  slug: "provisional-salaries-tax",
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
    "hk.deduction-limits": "mapa",
  },
  campos: [
    { id: "anio", tipo: "opcion-dato", etiqueta: "Year of the provisional tax", dato: "hk.basic-allowance", porDefecto: "2026-27" },
    { id: "ingreso", tipo: "moneda", etiqueta: "Income in the previous year", min: 0, porDefecto: 480000 },
    {
      id: "meses",
      tipo: "entero",
      etiqueta: "Months you worked in the previous year",
      ayuda: "If you started part way through the year, the IRD grosses the income up to 12 months.",
      min: 1,
      max: 12,
      porDefecto: 12,
    },
    { id: "mpf", tipo: "moneda", etiqueta: "MPF mandatory contributions in the previous year", min: 0, porDefecto: 18000 },
    { id: "otras", tipo: "moneda", etiqueta: "Other deductions in the previous year", min: 0, porDefecto: 0 },
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
    { id: "hijosRecientes", tipo: "entero", etiqueta: "Of them, born in the last two years", min: 0, max: 9, porDefecto: 0 },
    { id: "padres60", tipo: "entero", etiqueta: "Parents or grandparents you maintain aged 60 or above", min: 0, max: 8, porDefecto: 0 },
    { id: "padres60Conviven", tipo: "entero", etiqueta: "Of them, living with you all year", min: 0, max: 8, porDefecto: 0 },
    { id: "padres55", tipo: "entero", etiqueta: "Parents or grandparents you maintain aged 55 to 59", min: 0, max: 8, porDefecto: 0 },
    { id: "padres55Conviven", tipo: "entero", etiqueta: "Of them, living with you all year", min: 0, max: 8, porDefecto: 0 },
    { id: "finalAnterior", tipo: "moneda", etiqueta: "Final tax still to pay for the previous year (if any)", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("Enter your income for the previous year.", "ingreso");
    if (entrada.hijosRecientes > entrada.hijos) throw new ErrorEntrada("This can't be more than the number of children.", "hijosRecientes");
    const anual = 12 / entrada.meses;
    const ingreso = entrada.ingreso * anual;
    const mpf = tope(entrada.mpf * anual, enMapa(v["hk.deduction-limits"], "mpf"));
    const r = impuestoSalarios(
      ingreso - mpf - Math.max(0, entrada.otras),
      totalAsignaciones(
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
        entrada.anio,
      ),
      v["hk.salaries-tax-rates"],
      v["hk.standard-rates"],
    );
    const provisional = redondear(r.impuesto);
    // PAM 39: 75 % de 35.890 da 26.917,50 y el IRD cobra 26.917 en la primera cuota y 8.973 en la
    // segunda; los centavos pasan a la segunda.
    const tresCuartos = Math.floor(provisional * 0.75);
    const primera = redondear(entrada.finalAnterior + tresCuartos);
    const segunda = redondear(provisional - tresCuartos);
    const observaciones = [
      `Provisional tax for ${etiquetaAnio(entrada.anio)} uses the previous year's income with the allowances of ${etiquetaAnio(entrada.anio)}. It is credited against your final tax when the year is assessed.`,
      "If your income this year is likely to be less than 90% of last year's, you can apply to hold over part of it.",
    ];
    if (entrada.meses < 12) observaciones.push("Your income and MPF contributions were grossed up to 12 months.");
    return {
      ingresoAnual: redondear(ingreso),
      ingresoNeto: redondear(r.ingresoNeto),
      asignaciones: redondear(r.asignaciones),
      baseImponible: redondear(r.baseImponible),
      provisional,
      primera,
      segunda,
      total: redondear(primera + segunda),
      observaciones,
    };
  },
  resultado: [
    { clave: "provisional", etiqueta: "Provisional salaries tax", formato: "moneda", destacada: true },
    { clave: "primera", etiqueta: "First instalment (around January)", formato: "moneda" },
    { clave: "segunda", etiqueta: "Second instalment (around April)", formato: "moneda" },
    { clave: "total", etiqueta: "Total on the demand note", formato: "moneda" },
    { clave: "ingresoAnual", etiqueta: "Income used (12 months)", formato: "moneda" },
    { clave: "ingresoNeto", etiqueta: "Net income", formato: "moneda" },
    { clave: "asignaciones", etiqueta: "Allowances", formato: "moneda" },
    { clave: "baseImponible", etiqueta: "Net chargeable income", formato: "moneda" },
  ],
});
