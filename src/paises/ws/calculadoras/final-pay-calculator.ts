import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ws.final-pay-calculator",
  mercado: "ws",
  concepto: "liquidacion-final",
  slug: "final-pay-calculator",
  estado: "publicado",
  requiere: {
    "ws.final-pay-deadline-days": "numero",
  },
  campos: [
    { id: "pagoMensual", tipo: "moneda", etiqueta: "Monthly pay (full rate)", min: 0, porDefecto: 3000 },
    { id: "diasSemana", tipo: "entero", etiqueta: "Days you work in a week", min: 1, max: 7, porDefecto: 5 },
    { id: "diasVacaciones", tipo: "numero", etiqueta: "Annual leave days owing", min: 0, porDefecto: 7, ayuda: "Use the annual leave calculator to find this." },
    { id: "semanasAviso", tipo: "numero", etiqueta: "Weeks of notice paid instead of worked", min: 0, max: 52, porDefecto: 3, ayuda: "Use the notice period calculator. Enter 0 if you work the notice." },
    { id: "salarioPendiente", tipo: "moneda", etiqueta: "Wages already earned but not yet paid", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.pagoMensual <= 0) throw new ErrorEntrada("Enter the monthly pay.", "pagoMensual");
    const semanal = (e.pagoMensual * 12) / 52;
    const vacaciones = redondear((semanal / e.diasSemana) * e.diasVacaciones);
    const aviso = redondear(semanal * e.semanasAviso);
    const pendiente = redondear(e.salarioPendiente);
    return {
      vacaciones,
      aviso,
      pendiente,
      total: redondear(vacaciones + aviso + pendiente),
      plazo: `Before the end of the ${v["ws.final-pay-deadline-days"]}th day after the last day of the wage period`,
      observaciones: [
        "The Act sets no redundancy payment formula in the sections we read, so none is added. Check your contract or collective agreement for severance.",
        "PAYE and NPF still come off these payments. Use the net pay calculator to estimate the take-home amount.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Final pay before PAYE and NPF", formato: "moneda", destacada: true },
    { clave: "vacaciones", etiqueta: "Annual leave owing", formato: "moneda" },
    { clave: "aviso", etiqueta: "Pay instead of notice", formato: "moneda" },
    { clave: "pendiente", etiqueta: "Unpaid wages", formato: "moneda" },
    { clave: "plazo", etiqueta: "Payment of notice pay due", formato: "texto" },
  ],
});
