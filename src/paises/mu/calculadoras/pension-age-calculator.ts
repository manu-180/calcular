import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { esFechaISO } from "@/motor/vigencia";
import { sumarMeses } from "../lib/fechas";

function mesesEntre(desde: FechaISO, hasta: FechaISO): number {
  const [a1, m1] = desde.split("-").map(Number);
  const [a2, m2] = hasta.split("-").map(Number);
  return (a2 - a1) * 12 + (m2 - m1);
}

// Décimo anexo de la National Pensions Act (reemplazado por la Finance Act 2026): la edad de
// pensión sube un año por cada cohorte que cumple 60 entre septiembre y agosto, de 61 a 65.
function edadDePension(sesenta: FechaISO): number {
  if (sesenta < "2025-09-01") return 60;
  if (sesenta >= "2029-09-01") return 65;
  const [a, m] = sesenta.split("-").map(Number);
  const cohorte = (m >= 9 ? a : a - 1) - 2025;
  return 61 + cohorte;
}

export default definirCalculadora({
  id: "mu.pension-age-calculator",
  mercado: "mu",
  concepto: "jubilacion",
  slug: "pension-age-calculator",
  estado: "publicado",
  requiere: {
    "mu.basic-pension": "numero",
    "mu.state-age-pension-3a": "numero",
    "mu.state-age-pension-3b": "numero",
    "mu.pension-early-reduction": "numero",
    "mu.pension-deferral-before-65": "numero",
    "mu.pension-deferral-after-65": "numero",
  },
  campos: [
    { id: "nacimiento", tipo: "fecha", etiqueta: "Date of birth", porDefecto: "1967-03-15" },
    { id: "inicio", tipo: "fecha", etiqueta: "Month you want the pension to start (optional)", requerido: false, ayuda: "Leave it empty to see the pension at pension age." },
  ],
  calcular(e, v, { redondear }) {
    if (!esFechaISO(e.nacimiento)) throw new ErrorEntrada("Enter your date of birth.", "nacimiento");
    const sesenta = sumarMeses(e.nacimiento, 720);
    const edad = edadDePension(sesenta);
    const fechaPension = sumarMeses(sesenta, (edad - 60) * 12);
    const sesentaYCinco = sumarMeses(e.nacimiento, 780);
    const setenta = sumarMeses(e.nacimiento, 840);
    const grupo = sesenta < "2026-01-01" ? "brp" : sesenta < "2029-09-01" ? "3a" : "3b";
    const base = grupo === "brp" ? v["mu.basic-pension"] : grupo === "3a" ? v["mu.state-age-pension-3a"] : v["mu.state-age-pension-3b"];
    let primera: FechaISO = fechaPension;
    if (grupo === "3a") primera = sesenta < "2027-01-01" ? "2027-01-01" : sesenta;
    if (grupo === "3b") primera = sesenta;
    const observaciones: string[] = [];
    let ajuste = 0;
    if (e.inicio !== null) {
      if (!esFechaISO(e.inicio)) throw new ErrorEntrada("Enter the month you want to start.", "inicio");
      if (mesesEntre(primera, e.inicio) < 0) throw new ErrorEntrada("That is before the earliest month you can claim.", "inicio");
      if (grupo === "brp") {
        observaciones.push("Your pension follows the earlier rules, so no reduction or increase applies to the month you start.");
      } else {
        const antes = Math.max(0, mesesEntre(e.inicio, fechaPension));
        const despues = Math.min(Math.max(0, mesesEntre(fechaPension, e.inicio)), mesesEntre(fechaPension, setenta));
        const hasta65 = Math.min(despues, Math.max(0, mesesEntre(fechaPension, sesentaYCinco)));
        ajuste =
          antes > 0
            ? -antes * v["mu.pension-early-reduction"]
            : hasta65 * v["mu.pension-deferral-before-65"] + (despues - hasta65) * v["mu.pension-deferral-after-65"];
        if (antes > 0) observaciones.push("Choosing to start early is final, and the lower amount stays for life.");
      }
    }
    observaciones.push("The Act adds fixed amounts at certain ages and a yearly cost of living increase, which are not included here.");
    return {
      mensual: redondear(base * (1 + ajuste / 100)),
      edad,
      fechaPension,
      primera,
      sesenta,
      base,
      ajuste,
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Monthly pension at the start month", formato: "moneda", destacada: true },
    { clave: "edad", etiqueta: "Your pension age", formato: "anios" },
    { clave: "fechaPension", etiqueta: "You reach pension age on", formato: "fecha" },
    { clave: "primera", etiqueta: "Earliest you can claim", formato: "fecha" },
    { clave: "sesenta", etiqueta: "You turn 60 on", formato: "fecha" },
    { clave: "base", etiqueta: "Monthly amount at pension age today", formato: "moneda" },
    { clave: "ajuste", etiqueta: "Reduction or increase for your start month", formato: "porcentaje", decimales: 2 },
  ],
});
