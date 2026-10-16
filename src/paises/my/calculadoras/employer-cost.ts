import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesPerkeso, OPCIONES_CATEGORIA_SOCSO, REQUIERE_PERKESO, tablas } from "../lib/perkeso";

export default definirCalculadora({
  id: "my.employer-cost",
  mercado: "my",
  concepto: "costo-empleador",
  slug: "employer-cost",
  estado: "publicado",
  requiere: REQUIERE_PERKESO,
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly wages", min: 0, porDefecto: 4000 },
    { id: "epf", tipo: "moneda", etiqueta: "Employer EPF contribution a month", min: 0, porDefecto: 520, ayuda: "The employer share from your EPF contribution schedule." },
    { id: "otros", tipo: "moneda", etiqueta: "Other monthly costs (HRD levy, allowances, insurance)", min: 0, porDefecto: 0 },
    { id: "categoriaSocso", tipo: "opcion", etiqueta: "SOCSO category", opciones: OPCIONES_CATEGORIA_SOCSO, porDefecto: "first" },
    { id: "eis", tipo: "si-no", etiqueta: "Employee covered by EIS", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter the monthly wages.", "sueldo");
    const a = aportesPerkeso(tablas(v), entrada.sueldo, entrada.categoriaSocso, false, entrada.eis);
    const mensual = redondear(entrada.sueldo + entrada.epf + a.socsoEmpleador + a.eisEmpleador + entrada.otros);
    return {
      mensual,
      anual: redondear(mensual * 12),
      epf: entrada.epf,
      socso: a.socsoEmpleador,
      eis: a.eisEmpleador,
      cargas: redondear(mensual - entrada.sueldo),
      porcentaje: ((mensual - entrada.sueldo) / entrada.sueldo) * 100,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Cost to the employer a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Cost a year", formato: "moneda" },
    { clave: "epf", etiqueta: "Employer EPF", formato: "moneda", ocultarSiCero: true },
    { clave: "socso", etiqueta: "Employer SOCSO", formato: "moneda" },
    { clave: "eis", etiqueta: "Employer EIS", formato: "moneda", ocultarSiCero: true },
    { clave: "cargas", etiqueta: "Cost on top of wages", formato: "moneda" },
    { clave: "porcentaje", etiqueta: "On top of wages", formato: "porcentaje", decimales: 1 },
  ],
});
