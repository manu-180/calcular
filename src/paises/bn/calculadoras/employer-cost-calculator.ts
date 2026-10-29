import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { empleadorSpk, REQUIERE_SPK } from "../lib/spk";

export default definirCalculadora({
  id: "bn.employer-cost-calculator",
  mercado: "bn",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_SPK, "bn.spk-payment-day": "numero" },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly salary you pay", min: 0, porDefecto: 2000 },
    { id: "ciudadano", tipo: "si-no", etiqueta: "The employee is a citizen or permanent resident", porDefecto: true },
    { id: "empleados", tipo: "entero", etiqueta: "Number of employees on this salary", min: 1, max: 1000, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter the monthly salary.", "sueldo");
    const spk = e.ciudadano
      ? redondear(empleadorSpk(e.sueldo, { tasaEmpleado: v["bn.spk-employee-rate"], bandas: v["bn.spk-employer-bands"], minimoEmpleador: v["bn.spk-employer-minimum"] }))
      : 0;
    const porPersona = redondear(e.sueldo + spk);
    const observaciones: string[] = [];
    if (!e.ciudadano) observaciones.push("No SPK is due for foreign employees. Other costs such as housing or flights depend on the contract and are not included.");
    return {
      spk,
      porPersona,
      mensual: redondear(porPersona * e.empleados),
      anual: redondear(porPersona * e.empleados * 12),
      recargo: (spk / e.sueldo) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "spk", etiqueta: "Employer's SPK contribution per person", formato: "moneda" },
    { clave: "porPersona", etiqueta: "Monthly cost per person", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Monthly cost for all employees", formato: "moneda" },
    { clave: "anual", etiqueta: "Cost over 12 months", formato: "moneda" },
    { clave: "recargo", etiqueta: "SPK on top of salary", formato: "porcentaje", decimales: 1 },
  ],
});
