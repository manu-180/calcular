import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { rm } from "../lib/impuestos";
import { aportesPerkeso, OPCIONES_CATEGORIA_SOCSO, REQUIERE_PERKESO, tablas } from "../lib/perkeso";

export default definirCalculadora({
  id: "my.socso-calculator",
  mercado: "my",
  concepto: "aportes-seguridad-social",
  slug: "socso-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_PERKESO, "my.socso-wage-ceiling": "numero" },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly wages", min: 0, porDefecto: 3000 },
    { id: "categoriaSocso", tipo: "opcion", etiqueta: "SOCSO category", opciones: OPCIONES_CATEGORIA_SOCSO, porDefecto: "first" },
    { id: "skbbk", tipo: "si-no", etiqueta: "Covered by LINDUNG 24 Jam (SKBBK)", porDefecto: true },
    { id: "eis", tipo: "si-no", etiqueta: "Include EIS", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter the monthly wages.", "sueldo");
    const a = aportesPerkeso(tablas(v), entrada.sueldo, entrada.categoriaSocso, entrada.skbbk, entrada.eis);
    const empleado = redondear(a.socsoEmpleado + a.skbbk + a.eisEmpleado);
    const empleador = redondear(a.socsoEmpleador + a.eisEmpleador);
    const techo = v["my.socso-wage-ceiling"];
    return {
      empleado,
      empleador,
      total: redondear(empleado + empleador),
      invalidez: a.socsoEmpleado,
      skbbk: a.skbbk,
      eisEmpleado: a.eisEmpleado,
      socsoEmpleador: a.socsoEmpleador,
      eisEmpleador: a.eisEmpleador,
      observaciones: entrada.sueldo > techo ? [`Wages above ${rm(techo)} pay the same as ${rm(techo)}.`] : ([] as string[]),
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Deducted from your wages", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Paid by your employer", formato: "moneda" },
    { clave: "total", etiqueta: "Total contribution a month", formato: "moneda" },
    { clave: "invalidez", etiqueta: "Invalidity Scheme (you)", formato: "moneda", ocultarSiCero: true },
    { clave: "skbbk", etiqueta: "LINDUNG 24 Jam (you)", formato: "moneda", ocultarSiCero: true },
    { clave: "eisEmpleado", etiqueta: "EIS (you)", formato: "moneda", ocultarSiCero: true },
    { clave: "socsoEmpleador", etiqueta: "SOCSO (employer)", formato: "moneda" },
    { clave: "eisEmpleador", etiqueta: "EIS (employer)", formato: "moneda", ocultarSiCero: true },
  ],
});
