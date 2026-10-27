import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { paye, redondearImpuesto, tasaMarginal } from "../lib/nomina";

export default definirCalculadora({
  id: "rw.paye-calculator",
  mercado: "rw",
  concepto: "impuesto-renta",
  slug: "paye-calculator",
  estado: "publicado",
  requiere: {
    "rw.paye-bands": "escala",
    "rw.paye-secondary-rate": "numero",
    "rw.casual-rate": "numero",
    "rw.casual-threshold": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 300000, ayuda: "Basic salary plus allowances and benefits in kind." },
    {
      id: "empleo",
      tipo: "opcion",
      etiqueta: "Type of job",
      opciones: [
        { valor: "primary", etiqueta: "Main job (first employer)" },
        { valor: "secondary", etiqueta: "Second job (not the first employer)" },
        { valor: "casual", etiqueta: "Casual labour" },
      ],
      porDefecto: "primary",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    let impuesto: number;
    let marginal: number;
    if (e.empleo === "secondary") {
      impuesto = redondearImpuesto(porcentaje(e.bruto, v["rw.paye-secondary-rate"]));
      marginal = v["rw.paye-secondary-rate"];
    } else if (e.empleo === "casual") {
      const gravado = Math.max(0, e.bruto - v["rw.casual-threshold"]);
      impuesto = redondearImpuesto(porcentaje(gravado, v["rw.casual-rate"]));
      marginal = gravado > 0 ? v["rw.casual-rate"] : 0;
    } else {
      impuesto = paye(e.bruto, v["rw.paye-bands"]);
      marginal = tasaMarginal(v["rw.paye-bands"], e.bruto);
    }
    const observaciones: string[] = [];
    if (e.empleo === "casual") observaciones.push("Casual labour means unskilled work for 30 days or fewer in any 12 months. Longer jobs pay the normal PAYE bands.");
    if (e.empleo === "secondary") observaciones.push("A second employer withholds a flat rate with no tax-free band. Your main employer applies the bands.");
    return {
      paye: impuesto,
      despuesImpuesto: redondear(e.bruto - impuesto),
      efectiva: (impuesto / e.bruto) * 100,
      marginal,
      anual: impuesto * 12,
      observaciones,
    };
  },
  resultado: [
    { clave: "paye", etiqueta: "PAYE for the month", formato: "moneda", destacada: true },
    { clave: "despuesImpuesto", etiqueta: "Pay after PAYE", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Share of your pay that goes in PAYE", formato: "porcentaje", decimales: 1 },
    { clave: "marginal", etiqueta: "Rate on your last franc", formato: "porcentaje", decimales: 0 },
    { clave: "anual", etiqueta: "PAYE over 12 months", formato: "moneda" },
  ],
});
