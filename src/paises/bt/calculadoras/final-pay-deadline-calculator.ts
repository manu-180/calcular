import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "../lib/fechas";

export default definirCalculadora({
  id: "bt.final-pay-deadline-calculator",
  mercado: "bt",
  concepto: "liquidacion-final",
  slug: "final-pay-deadline-calculator",
  estado: "publicado",
  requiere: {
    "bt.final-pay-days": "numero",
    "bt.notice-days-min": "numero",
    "bt.overpayment-recovery-months": "numero",
  },
  campos: [
    { id: "aviso", tipo: "fecha", etiqueta: "Date written notice is given (optional)", min: "2000-01-01", requerido: false },
    { id: "fin", tipo: "fecha", etiqueta: "Date the contract ends", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    return {
      limite: sumarDias(e.fin, v["bt.final-pay-days"]),
      dias: v["bt.final-pay-days"],
      ultimoDia: e.aviso ? sumarDias(e.aviso, v["bt.notice-days-min"]) : null,
      meses: v["bt.overpayment-recovery-months"],
      observaciones: ["Wages owing include pay up to the last day. The Act does not list leave pay or gratuity in this section, so check your contract and the Rules for them."],
    };
  },
  resultado: [
    { clave: "limite", etiqueta: "Last day for the employer to pay what is owed", formato: "fecha", destacada: true },
    { clave: "dias", etiqueta: "Days allowed after the contract ends", formato: "dias" },
    { clave: "ultimoDia", etiqueta: "Earliest end of a minimum notice period", formato: "fecha" },
    { clave: "meses", etiqueta: "Months back an overpayment can be recovered", formato: "meses" },
  ],
});
