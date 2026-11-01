import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { sumarMeses } from "../lib/fechas";

export default definirCalculadora({
  id: "gm.sshfc-late-penalty",
  mercado: "gm",
  concepto: "propio",
  slug: "sshfc-late-penalty",
  estado: "publicado",
  requiere: {
    "gm.npf-late-penalty-rate": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Contributions not paid on time", min: 0, porDefecto: 15000 },
    { id: "vencimiento", tipo: "fecha", etiqueta: "Due date (the 15th of the month after the salary)", min: "2000-01-01", porDefecto: "2026-09-15" },
    { id: "pago", tipo: "fecha", etiqueta: "Date of payment", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the unpaid contributions.", "monto");
    if (entrada.pago < entrada.vencimiento) throw new ErrorEntrada("The payment date cannot be before the due date.", "pago");
    let meses = 0;
    while (sumarMeses(entrada.vencimiento, meses) < entrada.pago) meses++;
    const recargo = redondear(porcentaje(entrada.monto, v["gm.npf-late-penalty-rate"]) * meses);
    return { recargo, meses, total: redondear(entrada.monto + recargo) };
  },
  resultado: [
    { clave: "recargo", etiqueta: "Late payment penalty", formato: "moneda", destacada: true },
    { clave: "meses", etiqueta: "Months or part months late", formato: "meses" },
    { clave: "total", etiqueta: "Total to pay", formato: "moneda" },
  ],
});
