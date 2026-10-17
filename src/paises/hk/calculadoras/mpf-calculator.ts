import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aporteMensual } from "../lib/mpf";

export default definirCalculadora({
  id: "hk.mpf-calculator",
  mercado: "hk",
  concepto: "aportes-seguridad-social",
  slug: "mpf-calculator",
  estado: "publicado",
  requiere: {
    "hk.mpf-rate": "numero",
    "hk.mpf-min-relevant-income": "numero",
    "hk.mpf-max-relevant-income": "numero",
    "hk.deduction-limits": "mapa",
  },
  campos: [
    {
      id: "ingreso",
      tipo: "moneda",
      etiqueta: "Monthly relevant income",
      ayuda: "Wages, salary, leave pay, commission, bonus and allowances paid in the month.",
      min: 0,
      porDefecto: 25000,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("Enter the relevant income for the month.", "ingreso");
    const reglas = { tasa: v["hk.mpf-rate"], minimo: v["hk.mpf-min-relevant-income"], maximo: v["hk.mpf-max-relevant-income"] };
    const a = aporteMensual(entrada.ingreso, reglas);
    const empleado = redondear(a.empleado);
    const empleador = redondear(a.empleador);
    const observaciones: string[] = [];
    if (entrada.ingreso < reglas.minimo) observaciones.push("Your income is below the minimum level, so you don't contribute. Your employer still has to.");
    if (entrada.ingreso > reglas.maximo) observaciones.push("Your income is above the maximum level, so both contributions stop at the cap.");
    return {
      empleado,
      empleador,
      total: redondear(empleado + empleador),
      anualEmpleado: redondear(empleado * 12),
      neto: redondear(entrada.ingreso - empleado),
      observaciones,
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your mandatory contribution", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Employer's mandatory contribution", formato: "moneda" },
    { clave: "total", etiqueta: "Total into your MPF account", formato: "moneda" },
    { clave: "neto", etiqueta: "Income after your contribution", formato: "moneda" },
    { clave: "anualEmpleado", etiqueta: "Your contributions over 12 months", formato: "moneda" },
  ],
});
