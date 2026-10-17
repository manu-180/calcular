import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { naira, paye, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "ng.paye-calculator",
  mercado: "ng",
  concepto: "impuesto-renta",
  slug: "paye-calculator",
  estado: "publicado",
  requiere: {
    "ng.paye-bands": "escala",
    "ng.rent-relief-rate": "numero",
    "ng.rent-relief-cap": "numero",
    "ng.minimum-wage": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Gross income for the year", min: 0, porDefecto: 6000000 },
    { id: "pension", tipo: "moneda", etiqueta: "Your pension contribution for the year", min: 0, porDefecto: 360000, ayuda: "Usually 8% of basic, housing and transport." },
    { id: "nhf", tipo: "moneda", etiqueta: "National Housing Fund for the year", min: 0, porDefecto: 0 },
    { id: "nhis", tipo: "moneda", etiqueta: "National Health Insurance for the year", min: 0, porDefecto: 0 },
    { id: "otras", tipo: "moneda", etiqueta: "Life insurance premiums and home loan interest", min: 0, porDefecto: 0 },
    { id: "alquiler", tipo: "moneda", etiqueta: "Rent you paid for the year", min: 0, porDefecto: 1200000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso < 0) throw new ErrorEntrada("Income cannot be negative.", "ingreso");
    const deducciones = entrada.pension + entrada.nhf + entrada.nhis + entrada.otras;
    const r = paye(
      entrada.ingreso,
      deducciones,
      entrada.alquiler,
      v["ng.paye-bands"],
      v["ng.rent-relief-rate"],
      v["ng.rent-relief-cap"],
      v["ng.minimum-wage"] * 12,
    );
    const impuesto = redondear(r.impuesto);
    const observaciones: string[] = [];
    if (r.exento) observaciones.push(`Income of ${naira(v["ng.minimum-wage"] * 12)} a year or less (the national minimum wage) is not taxed.`);
    if (r.rentRelief >= v["ng.rent-relief-cap"]) observaciones.push(`Rent relief is capped at ${naira(v["ng.rent-relief-cap"])}.`);
    return {
      impuesto,
      mensual: redondear(impuesto / 12),
      gravable: redondear(r.gravable),
      rentRelief: redondear(r.rentRelief),
      deducciones: redondear(r.deducciones),
      efectiva: entrada.ingreso > 0 ? (impuesto / entrada.ingreso) * 100 : 0,
      marginal: r.exento ? 0 : tasaMarginal(v["ng.paye-bands"], r.gravable),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "PAYE a month", formato: "moneda" },
    { clave: "gravable", etiqueta: "Chargeable income", formato: "moneda" },
    { clave: "rentRelief", etiqueta: "Rent relief", formato: "moneda" },
    { clave: "deducciones", etiqueta: "Total deductions and relief", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Top band you reach", formato: "porcentaje", decimales: 0 },
  ],
});
