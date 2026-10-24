import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { DIVISORES, NOTA_DIVISOR } from "../lib/salario-diario";

export default definirCalculadora({
  id: "ke.annual-leave-calculator",
  mercado: "ke",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "ke.annual-leave-days": "numero",
    "ke.leave-days-per-month": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Completed months of service in this leave year", min: 0, max: 12, porDefecto: 12 },
    { id: "tomados", tipo: "numero", etiqueta: "Leave days already taken this year", min: 0, porDefecto: 0 },
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly basic pay (optional, to value the leave)", min: 0, requerido: false },
    { id: "divisor", tipo: "opcion", etiqueta: "How to work out a day's pay", opciones: DIVISORES, porDefecto: "26" },
  ],
  calcular(e, v, { redondear }) {
    if (e.meses > 12) throw new ErrorEntrada("A leave year has 12 months at most.", "meses");
    const ganados = e.meses >= 12 ? v["ke.annual-leave-days"] : e.meses >= 2 ? e.meses * v["ke.leave-days-per-month"] : 0;
    const pendientes = Math.max(0, ganados - e.tomados);
    const observaciones: string[] = [];
    if (e.meses < 2) observaciones.push("The pro rata rule starts after two completed months of service.");
    if (e.meses < 12 && e.meses >= 2) observaciones.push("The pro rata days apply when employment ends before the 12 months are complete.");
    let valor: number | null = null;
    if (e.sueldo !== null && e.sueldo > 0) {
      valor = redondear((e.sueldo / Number(e.divisor)) * pendientes);
      observaciones.push(NOTA_DIVISOR);
    }
    return { pendientes, ganados, valor, observaciones };
  },
  resultado: [
    { clave: "pendientes", etiqueta: "Leave days still due", formato: "dias", decimales: 2, destacada: true },
    { clave: "ganados", etiqueta: "Leave days earned", formato: "dias", decimales: 2 },
    { clave: "valor", etiqueta: "Value of the days still due", formato: "moneda" },
  ],
});
