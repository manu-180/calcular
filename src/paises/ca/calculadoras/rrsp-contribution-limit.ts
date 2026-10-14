import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { validarIngreso } from "../lib/impuestos";

export default definirCalculadora({
  id: "ca.rrsp-contribution-limit",
  mercado: "ca",
  concepto: "propio",
  slug: "rrsp-contribution-limit",
  estado: "publicado",
  requiere: {
    "ca.rrsp-dollar-limit": "numero",
    "ca.rrsp-earned-income-rate": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Earned income last year", min: 0, porDefecto: 80000, ayuda: "If you only had a job, this is usually your salary." },
    { id: "pa", tipo: "moneda", etiqueta: "Pension adjustment from last year", min: 0, porDefecto: 0 },
    { id: "noUsado", tipo: "moneda", etiqueta: "Unused room carried forward", min: 0, porDefecto: 0, ayuda: "Shown on your latest notice of assessment." },
    { id: "aportado", tipo: "moneda", etiqueta: "Contributions you already made toward this year", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    for (const campo of ["ingreso", "pa", "noUsado", "aportado"] as const) validarIngreso(entrada[campo], campo);
    const limite = v["ca.rrsp-dollar-limit"];
    const tasa = v["ca.rrsp-earned-income-rate"];
    const porIngreso = porcentaje(entrada.ingreso, tasa);
    const nuevo = Math.max(0, Math.min(porIngreso, limite) - entrada.pa);
    const total = redondear(nuevo + entrada.noUsado);
    const restante = redondear(total - entrada.aportado);
    const observaciones: string[] = [];
    if (porIngreso > limite) observaciones.push("Your income is high enough that the yearly dollar limit caps your new room.");
    if (restante < 0) observaciones.push("You are over your limit. Excess contributions above a $2,000 cushion are taxed at 1% a month until you withdraw them.");
    return {
      total,
      restante,
      nuevo: redondear(nuevo),
      limite,
      porIngreso: redondear(porIngreso),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Your RRSP deduction limit this year", formato: "moneda", destacada: true },
    { clave: "restante", etiqueta: "Room left after your contributions", formato: "moneda" },
    { clave: "nuevo", etiqueta: "New room earned from last year's income", formato: "moneda" },
    { clave: "porIngreso", etiqueta: "Room from last year's earned income before the cap", formato: "moneda" },
    { clave: "limite", etiqueta: "Dollar limit for this year", formato: "moneda" },
  ],
});
