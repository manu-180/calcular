import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre } from "@/motor/vigencia";

export default definirCalculadora({
  id: "np.notice-period-calculator",
  mercado: "np",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: { "np.notice-days": "mapa" },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "First day of work", porDefecto: "2024-01-15" },
    { id: "fin", tipo: "fecha", etiqueta: "Day your employment ends", porDefecto: "hoy" },
    { id: "basico", tipo: "moneda", etiqueta: "Basic pay for the month (optional, to value the notice)", min: 0, requerido: false },
    { id: "diasMes", tipo: "entero", etiqueta: "Paid days in a month", min: 20, max: 31, porDefecto: 30, ayuda: "The Labour Act does not fix this number. Use the one in your contract." },
  ],
  calcular(e, v, { redondear }) {
    const servicio = diasEntre(e.inicio, e.fin);
    if (servicio < 0) throw new ErrorEntrada("The last day cannot be before the first day.", "fin");
    const m = v["np.notice-days"];
    const [tramo, dias] = servicio <= 28 ? (["Up to 4 weeks", m["under-4-weeks"]] as const) : servicio <= 365 ? (["4 weeks to 1 year", m["4-weeks-to-1-year"]] as const) : (["More than 1 year", m["over-1-year"]] as const);
    return {
      servicio,
      tramo,
      dias,
      pago: e.basico === null ? null : redondear((e.basico / e.diasMes) * dias),
      observaciones: ["Notice is not needed when employment ends after action for misconduct."],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Notice to give or receive", formato: "dias", destacada: true },
    { clave: "servicio", etiqueta: "Days of service", formato: "dias" },
    { clave: "tramo", etiqueta: "Length of service band", formato: "texto" },
    { clave: "pago", etiqueta: "Pay for the notice period", formato: "moneda" },
  ],
});
