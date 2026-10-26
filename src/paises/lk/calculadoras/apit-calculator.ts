import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { apitMensual, tasaMarginal } from "../lib/nomina";

export default definirCalculadora({
  id: "lk.apit-calculator",
  mercado: "lk",
  concepto: "impuesto-renta",
  slug: "apit-calculator",
  estado: "publicado",
  requiere: {
    "lk.apit-table-1": "escala",
    "lk.apit-table-4": "escala",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly regular profits from employment", min: 0, porDefecto: 250000, ayuda: "Salary, allowances, overtime and the value of benefits such as a company car or housing." },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "Who are you?",
      opciones: [
        { valor: "residente", etiqueta: "Resident, or a Sri Lankan citizen living abroad (Table 1)" },
        { valor: "extranjero", etiqueta: "Non-resident and not a Sri Lankan citizen (Table 4)" },
      ],
      porDefecto: "residente",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo < 0) throw new ErrorEntrada("The salary cannot be negative.", "sueldo");
    const tabla = e.residencia === "residente" ? v["lk.apit-table-1"] : v["lk.apit-table-4"];
    const apit = redondear(apitMensual(e.sueldo, tabla));
    const observaciones: string[] = [];
    if (e.sueldo > 0 && apit === 0) observaciones.push("No APIT is deducted at this salary, as long as your total for the year stays within the tax free amount.");
    if (e.residencia === "extranjero") observaciones.push("Table 4 has no tax free amount: tax starts with the first rupee.");
    return {
      apit,
      apitAnual: redondear(apit * 12),
      tasaMarginal: tasaMarginal(e.sueldo, tabla),
      tasaEfectiva: e.sueldo > 0 ? (apit / e.sueldo) * 100 : 0,
      despues: redondear(e.sueldo - apit),
      observaciones,
    };
  },
  resultado: [
    { clave: "apit", etiqueta: "APIT deducted this month", formato: "moneda", destacada: true },
    { clave: "apitAnual", etiqueta: "APIT over 12 months", formato: "moneda" },
    { clave: "tasaMarginal", etiqueta: "Rate on your top slice of pay", formato: "porcentaje", decimales: 0 },
    { clave: "tasaEfectiva", etiqueta: "Effective rate", formato: "porcentaje", decimales: 2 },
    { clave: "despues", etiqueta: "Salary after APIT (before EPF)", formato: "moneda" },
  ],
});
