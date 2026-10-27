import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// First Schedule, párrafo 1(6) desde el 1/4/2025: estos ingresos pasan por la escala del 1(1D) pero
// ningún tramo puede superar la tasa máxima. Se toma la escala normal con cada tasa topeada.
export default definirCalculadora({
  id: "lk.freelancer-tax-calculator",
  mercado: "lk",
  concepto: "propio",
  slug: "freelancer-tax-calculator",
  estado: "publicado",
  requiere: {
    "lk.income-tax-bands": "escala",
    "lk.personal-relief": "numero",
    "lk.foreign-income-max-rate": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Foreign currency income remitted for the year", min: 0, porDefecto: 6000000, ayuda: "Profits from services to clients abroad, paid in foreign currency and brought in through a bank, from 1 April to 31 March." },
  ],
  calcular(e, v, { redondear }) {
    if (e.ingreso <= 0) throw new ErrorEntrada("Enter your income for the year.", "ingreso");
    const tope = v["lk.foreign-income-max-rate"];
    const bandas = v["lk.income-tax-bands"];
    const gravable = Math.max(0, e.ingreso - v["lk.personal-relief"]);
    const impuesto = redondear(aplicarEscalaMarginal(bandas.map((f) => ({ ...f, tasa: Math.min(f.tasa, tope) })), gravable));
    const sinTope = redondear(aplicarEscalaMarginal(bandas, gravable));
    return {
      impuesto,
      gravable,
      tasaEfectiva: (impuesto / e.ingreso) * 100,
      ahorro: redondear(sinTope - impuesto),
      porMes: redondear(impuesto / 12),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "gravable", etiqueta: "Taxable income after personal relief", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Effective rate", formato: "porcentaje", decimales: 2 },
    { clave: "porMes", etiqueta: "Average a month", formato: "moneda" },
    { clave: "ahorro", etiqueta: "Less than at the normal rates", formato: "moneda", ocultarSiCero: true },
  ],
});
