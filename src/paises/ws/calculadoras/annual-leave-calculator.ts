import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ws.annual-leave-calculator",
  mercado: "ws",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "ws.annual-leave-days": "numero",
    "ws.leave-carry-forward-days": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Months of continuous service with this employer", min: 0, max: 600, porDefecto: 18, ayuda: "Count any probation period." },
    { id: "tomados", tipo: "numero", etiqueta: "Annual leave days already taken", min: 0, porDefecto: 0 },
    { id: "pagoMensual", tipo: "moneda", etiqueta: "Monthly pay", min: 0, porDefecto: 3000 },
    { id: "diasSemana", tipo: "entero", etiqueta: "Days you work in a week", min: 1, max: 7, porDefecto: 5 },
  ],
  calcular(e, v, { redondear }) {
    if (e.tomados < 0) throw new ErrorEntrada("Days taken cannot be negative.", "tomados");
    const anual = v["ws.annual-leave-days"];
    const acumulados = (anual * e.meses) / 12;
    const saldo = Math.max(0, acumulados - e.tomados);
    const pagoDia = (e.pagoMensual * 12) / (52 * e.diasSemana);
    const tope = v["ws.leave-carry-forward-days"];
    const observaciones: string[] = [];
    if (e.meses < 12) observaciones.push("The Act gives the full entitlement after 12 months of continuous service. Before that you can take leave pro rata as it builds up.");
    if (saldo > tope) observaciones.push(`Your balance is above the ${tope} days you can carry forward, unless you and your employer agree to extend it.`);
    observaciones.push("Instead of taking leave, you can ask to be paid for it, but your employer has to approve. When you leave, all annual leave owing is paid out.");
    return {
      acumulados: Number(acumulados.toFixed(2)),
      saldo: Number(saldo.toFixed(2)),
      pagoDia: redondear(pagoDia),
      valorSaldo: redondear(saldo * pagoDia),
      observaciones,
    };
  },
  resultado: [
    { clave: "acumulados", etiqueta: "Annual leave built up", formato: "dias", decimales: 2 },
    { clave: "saldo", etiqueta: "Leave days left", formato: "dias", decimales: 2, destacada: true },
    { clave: "pagoDia", etiqueta: "Pay for one working day", formato: "moneda" },
    { clave: "valorSaldo", etiqueta: "Value of the days left", formato: "moneda", destacada: true },
  ],
});
