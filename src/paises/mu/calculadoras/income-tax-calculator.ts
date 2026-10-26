import { aplicarEscalaMarginal, definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { DEPENDIENTES, tasaMarginal } from "../lib/nomina";

export default definirCalculadora({
  id: "mu.income-tax-calculator",
  mercado: "mu",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "mu.income-tax-bands": "escala",
    "mu.dependent-deduction": "mapa",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Net income for the income year", min: 0, porDefecto: 900000, ayuda: "Salary and bonus, plus any business or rental profit, from July to June." },
    { id: "dependientes", tipo: "opcion", etiqueta: "Dependents", opciones: DEPENDIENTES, porDefecto: "0" },
    { id: "otrasDeducciones", tipo: "moneda", etiqueta: "Other reliefs and deductions", min: 0, porDefecto: 0 },
    { id: "payePagado", tipo: "moneda", etiqueta: "PAYE already withheld in the year (optional)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.ingreso <= 0) throw new ErrorEntrada("Enter your net income for the year.", "ingreso");
    const bandas = v["mu.income-tax-bands"];
    const deducciones = enMapa(v["mu.dependent-deduction"], e.dependientes) + e.otrasDeducciones;
    const gravable = Math.max(0, e.ingreso - deducciones);
    const impuesto = redondear(aplicarEscalaMarginal(bandas, gravable));
    const enBanda = (i: number) => {
      const f = bandas[i];
      if (!f || gravable <= f.desde) return 0;
      const tope = f.hasta === null ? gravable : Math.min(gravable, f.hasta);
      return redondear(((tope - f.desde) * f.tasa) / 100);
    };
    const saldo = e.payePagado === null ? null : redondear(impuesto - e.payePagado);
    return {
      impuesto,
      gravable: redondear(gravable),
      deducciones: redondear(deducciones),
      banda10: enBanda(1),
      banda20: enBanda(2),
      banda35: bandas.length > 3 ? enBanda(3) : null,
      marginal: tasaMarginal(bandas, gravable),
      efectiva: (impuesto / e.ingreso) * 100,
      mensual: redondear(impuesto / 12),
      saldo,
      observaciones: saldo !== null && saldo < 0 ? ["More PAYE was withheld than the tax due. MRA refunds the difference after you file your return."] : [],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "gravable", etiqueta: "Chargeable income", formato: "moneda" },
    { clave: "deducciones", etiqueta: "Deductions", formato: "moneda" },
    { clave: "banda10", etiqueta: "Tax in the 10% band", formato: "moneda" },
    { clave: "banda20", etiqueta: "Tax in the 20% band", formato: "moneda" },
    { clave: "banda35", etiqueta: "Tax in the 35% band", formato: "moneda", ocultarSiCero: true },
    { clave: "marginal", etiqueta: "Marginal rate", formato: "porcentaje", decimales: 0 },
    { clave: "efectiva", etiqueta: "Effective rate on your net income", formato: "porcentaje", decimales: 2 },
    { clave: "mensual", etiqueta: "Tax as a monthly average", formato: "moneda" },
    { clave: "saldo", etiqueta: "Left to pay (or refund if negative)", formato: "moneda" },
  ],
});
