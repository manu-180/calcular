import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { sumarDias, sumarMeses } from "../lib/fechas";

type Plazo = { cantidad: number; unidad: "dias" | "semanas" | "meses" };

export default definirCalculadora({
  id: "gm.notice-period",
  mercado: "gm",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: {
    "gm.notice-periods": "mapa",
    "gm.redundancy-notice-months": "numero",
  },
  campos: [
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "Who is ending the contract",
      opciones: [
        { valor: "empleador", etiqueta: "The employer" },
        { valor: "trabajador", etiqueta: "The employee" },
      ],
      porDefecto: "empleador",
    },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Reason",
      opciones: [
        { valor: "normal", etiqueta: "Ordinary termination" },
        { valor: "redundancia", etiqueta: "Redundancy or reorganisation" },
      ],
      porDefecto: "normal",
      visibleSi: { quien: ["empleador"] },
    },
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Contract",
      opciones: [
        { valor: "indefinido", etiqueta: "No end date" },
        { valor: "plazo", etiqueta: "Fixed term" },
      ],
      porDefecto: "indefinido",
    },
    {
      id: "pago",
      tipo: "opcion",
      etiqueta: "Wages are paid",
      opciones: [
        { valor: "mensual", etiqueta: "Monthly" },
        { valor: "quincenal", etiqueta: "Every two weeks" },
        { valor: "semanal", etiqueta: "Weekly" },
        { valor: "diario", etiqueta: "Daily or by the hour" },
      ],
      porDefecto: "mensual",
    },
    { id: "anios", tipo: "numero", etiqueta: "Years of continuous service", min: 0, max: 60, porDefecto: 3, ayuda: "Use decimals for part of a year: 1.5 is a year and a half." },
    { id: "aviso", tipo: "fecha", etiqueta: "Date notice is given", min: "2023-01-01", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary (for pay in lieu of notice)", min: 0, porDefecto: 10000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.anios < 0) throw new ErrorEntrada("Years of service cannot be negative.", "anios");
    const p = v["gm.notice-periods"];
    const a = entrada.anios;
    const observaciones: string[] = [];
    let plazo: Plazo;
    if (entrada.quien === "empleador" && entrada.motivo === "redundancia") {
      plazo = { cantidad: v["gm.redundancy-notice-months"], unidad: "meses" };
      observaciones.push("A redundancy must also follow the consultation and selection rules of section 141 of the Labour Act, 2023.");
    } else if (entrada.contrato === "plazo") {
      plazo = { cantidad: enMapa(p, "fixed-term-days"), unidad: "dias" };
    } else if (entrada.quien === "trabajador" && a >= 6) {
      plazo = { cantidad: enMapa(p, "employee-six-years-months"), unidad: "meses" };
    } else if (a >= 6) {
      plazo = { cantidad: enMapa(p, "six-years-months"), unidad: "meses" };
    } else if (entrada.pago === "mensual") {
      plazo = { cantidad: enMapa(p, "monthly-months"), unidad: "meses" };
    } else if (entrada.pago === "quincenal") {
      plazo = { cantidad: enMapa(p, "biweekly-short-weeks"), unidad: "semanas" };
    } else if (entrada.pago === "semanal") {
      plazo = a < 2 ? { cantidad: enMapa(p, "weekly-short-weeks"), unidad: "semanas" } : { cantidad: enMapa(p, "weekly-mid-weeks"), unidad: "semanas" };
    } else if (a < 0.5) {
      plazo = { cantidad: enMapa(p, "daily-short-days"), unidad: "dias" };
    } else {
      plazo = a < 2 ? { cantidad: enMapa(p, "daily-mid-weeks"), unidad: "semanas" } : { cantidad: enMapa(p, "daily-long-weeks"), unidad: "semanas" };
    }
    const fin = plazo.unidad === "meses" ? sumarMeses(entrada.aviso, plazo.cantidad) : sumarDias(entrada.aviso, plazo.unidad === "semanas" ? plazo.cantidad * 7 : plazo.cantidad);
    const meses = plazo.unidad === "meses" ? plazo.cantidad : plazo.unidad === "semanas" ? (plazo.cantidad * 12) / 52 : (plazo.cantidad * 12) / 365;
    if (plazo.unidad !== "meses") observaciones.push("Pay in lieu for weeks or days is worked out on calendar time (52 weeks or 365 days a year).");
    observaciones.push("Notice must be given in writing. A contract may give longer notice, never shorter.");
    return {
      meses: plazo.unidad === "meses" ? plazo.cantidad : null,
      semanas: plazo.unidad === "semanas" ? plazo.cantidad : null,
      dias: plazo.unidad === "dias" ? plazo.cantidad : null,
      fin,
      enLugar: redondear(entrada.salario * meses),
      observaciones,
    };
  },
  resultado: [
    { clave: "meses", etiqueta: "Minimum notice", formato: "meses", destacada: true },
    { clave: "semanas", etiqueta: "Minimum notice", formato: "semanas", destacada: true },
    { clave: "dias", etiqueta: "Minimum notice", formato: "dias", destacada: true },
    { clave: "fin", etiqueta: "Notice ends on", formato: "fecha" },
    { clave: "enLugar", etiqueta: "Pay in lieu of notice", formato: "moneda" },
  ],
});
