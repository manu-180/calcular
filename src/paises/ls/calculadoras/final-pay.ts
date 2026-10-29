import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { OPCIONES_SEMANA } from "../lib/comun";

export default definirCalculadora({
  id: "ls.final-pay",
  mercado: "ls",
  concepto: "liquidacion-final",
  slug: "final-pay",
  estado: "publicado",
  requiere: {
    "ls.notice-weeks": "mapa",
    "ls.notice-months": "numero",
    "ls.severance-weeks": "numero",
    "ls.leave-pay-minimum-months": "numero",
    "ls.hours-divisor": "mapa",
    "ls.daily-hours": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Your monthly wage", min: 0, porDefecto: 6000 },
    { id: "semana", tipo: "opcion", etiqueta: "You normally work", opciones: OPCIONES_SEMANA, porDefecto: "five-day" },
    { id: "meses", tipo: "entero", etiqueta: "Completed months of continuous employment", min: 0, max: 720, porDefecto: 40 },
    { id: "vacaciones", tipo: "numero", etiqueta: "Leave days earned and not taken", min: 0, max: 400, porDefecto: 5 },
    {
      id: "preaviso",
      tipo: "opcion",
      etiqueta: "Notice period",
      opciones: [
        { valor: "lieu", etiqueta: "Paid instead of worked" },
        { valor: "worked", etiqueta: "Worked, or not due" },
      ],
      porDefecto: "lieu",
    },
    { id: "conducta", tipo: "si-no", etiqueta: "Fairly dismissed for misconduct", porDefecto: false },
    { id: "pendiente", tipo: "moneda", etiqueta: "Wages still owed for days worked (optional)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your monthly wage.", "salario");
    const horas = v["ls.hours-divisor"];
    const hora = entrada.salario / horas["monthly"];
    const semanal = hora * horas["weekly"];
    const diario = redondear(hora * enMapa(v["ls.daily-hours"], entrada.semana));
    let preaviso = 0;
    if (entrada.preaviso === "lieu") {
      preaviso =
        entrada.meses >= 12
          ? entrada.salario * v["ls.notice-months"]
          : semanal * enMapa(v["ls.notice-weeks"], entrada.meses >= 6 ? "6-to-12-months" : "under-6-months");
    }
    const anios = Math.floor(entrada.meses / 12);
    const indemnizacion = !entrada.conducta && entrada.meses >= 12 ? redondear(redondear(semanal) * v["ls.severance-weeks"] * anios) : 0;
    const vacaciones = entrada.meses >= v["ls.leave-pay-minimum-months"] ? redondear(entrada.vacaciones * diario) : 0;
    const pendiente = entrada.pendiente ?? 0;
    const observaciones: string[] = [];
    if (entrada.conducta) {
      observaciones.push("No severance pay after a fair dismissal for misconduct. For serious misconduct the employer may also end the contract without notice.");
    }
    if (vacaciones === 0 && entrada.vacaciones > 0) {
      observaciones.push(`Untaken leave is paid only after ${v["ls.leave-pay-minimum-months"]} months of continuous work.`);
    }
    return {
      total: redondear(redondear(preaviso) + indemnizacion + vacaciones + pendiente),
      preaviso: redondear(preaviso),
      indemnizacion,
      vacaciones,
      pendiente,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total final pay before tax", formato: "moneda", destacada: true },
    { clave: "preaviso", etiqueta: "Payment in lieu of notice", formato: "moneda", ocultarSiCero: true },
    { clave: "indemnizacion", etiqueta: "Severance pay", formato: "moneda", ocultarSiCero: true },
    { clave: "vacaciones", etiqueta: "Pay for untaken leave", formato: "moneda", ocultarSiCero: true },
    { clave: "pendiente", etiqueta: "Wages still owed", formato: "moneda", ocultarSiCero: true },
  ],
});
