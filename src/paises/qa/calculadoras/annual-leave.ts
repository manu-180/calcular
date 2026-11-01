import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_SEMANAL, salarioSemanal } from "../lib/salarios";

export default definirCalculadora({
  id: "qa.annual-leave",
  mercado: "qa",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "publicado",
  requiere: {
    "qa.annual-leave": "mapa",
    "qa.annual-leave-threshold": "numero",
    "qa.annual-leave-min-service": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic salary", min: 0, porDefecto: 7000 },
    { id: "anios", tipo: "numero", etiqueta: "Total years of service with your employer", min: 0, max: 60, porDefecto: 3 },
    { id: "meses", tipo: "numero", etiqueta: "Months worked in this leave year", ayuda: "12 for a full year. Part of a year gives leave in proportion.", min: 0, max: 12, porDefecto: 12 },
    { id: "tomadas", tipo: "numero", etiqueta: "Weeks of leave already taken this year", min: 0, max: 8, porDefecto: 0 },
    CAMPO_SEMANAL,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.meses <= 0) throw new ErrorEntrada("Enter the months you worked this year.", "meses");
    const tabla = v["qa.annual-leave"];
    const semanal = salarioSemanal(entrada.basico, entrada.metodoSemanal);
    const observaciones: string[] = [];
    if (entrada.anios < v["qa.annual-leave-min-service"]) {
      observaciones.push("Annual leave is due after one full year of continuous service.");
      return { pendientes: 0, derecho: 0, porAnio: 0, pago: 0, semanal: redondear(semanal), observaciones };
    }
    const largo = entrada.anios >= v["qa.annual-leave-threshold"];
    const porAnio = enMapa(tabla, largo ? "from-threshold" : "under-threshold");
    const derecho = (porAnio * entrada.meses) / 12;
    const pendientes = Math.max(0, derecho - entrada.tomadas);
    if (entrada.tomadas > derecho) observaciones.push("You've taken more leave than you've earned so far this year.");
    observaciones.push("Leave is paid on your basic salary. If your contract ends before you take it, the employer pays the unused weeks in cash.");
    return { pendientes: redondear(pendientes), derecho: redondear(derecho), porAnio, pago: redondear(pendientes * semanal), semanal: redondear(semanal), observaciones };
  },
  resultado: [
    { clave: "pendientes", etiqueta: "Leave still due", formato: "semanas", decimales: 2, destacada: true },
    { clave: "pago", etiqueta: "Pay for the leave still due", formato: "moneda" },
    { clave: "derecho", etiqueta: "Leave earned this year", formato: "semanas", decimales: 2 },
    { clave: "porAnio", etiqueta: "Leave for a full year", formato: "semanas" },
    { clave: "semanal", etiqueta: "Weekly basic salary", formato: "moneda" },
  ],
});
