import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.unincorporated-business-tax-calculator",
  mercado: "ag",
  concepto: "propio",
  slug: "unincorporated-business-tax-calculator",
  estado: "publicado",
  requiere: {
    "ag.ubt-sole-trader-bands": "escala",
    "ag.ubt-partner-step": "numero",
    "ag.ubt-late-filing-minimum": "numero",
    "ag.ubt-late-filing-rate": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Chargeable income for the year", min: 0, porDefecto: 120000 },
    { id: "socios", tipo: "entero", etiqueta: "Owners of the business", min: 1, max: 5, porDefecto: 1, ayuda: "1 for a sole trader. Up to 5 for a partnership." },
    { id: "tarde", tipo: "si-no", etiqueta: "Add the penalty for filing late", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.ingreso < 0) throw new ErrorEntrada("Chargeable income cannot be negative.", "ingreso");
    const salto = (e.socios - 1) * v["ag.ubt-partner-step"];
    const escala = v["ag.ubt-sole-trader-bands"].map((f, i) => ({
      ...f,
      desde: i === 0 ? 0 : f.desde + salto,
      hasta: f.hasta === null ? null : f.hasta + salto,
    }));
    const impuesto = redondear(aplicarEscalaMarginal(escala, e.ingreso));
    const recargo = e.tarde ? redondear(Math.max(porcentaje(impuesto, v["ag.ubt-late-filing-rate"]), v["ag.ubt-late-filing-minimum"])) : 0;
    return {
      impuesto,
      recargo,
      total: redondear(impuesto + recargo),
      exento: escala[0].hasta ?? 0,
      efectiva: e.ingreso > 0 ? impuesto / e.ingreso * 100 : 0,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Amount to pay", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Unincorporated Business Tax", formato: "moneda" },
    { clave: "recargo", etiqueta: "Late filing penalty", formato: "moneda", ocultarSiCero: true },
    { clave: "exento", etiqueta: "Income taxed at 0%", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Average rate on your income", formato: "porcentaje", decimales: 2 },
  ],
});
