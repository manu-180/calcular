import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

function sumarMeses(fecha: string, meses: number): string {
  const d = new Date(`${fecha}T00:00:00Z`);
  const dia = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + meses);
  const ultimo = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(dia, ultimo));
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

export default definirCalculadora({
  id: "bt.maternity-leave-calculator",
  mercado: "bt",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "bt.maternity-months": "numero",
    "bt.maternity-service-months": "numero",
    "bt.paternity-working-days": "numero",
    "bt.parental-leave-periods": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Date your leave starts", min: "2022-01-01", porDefecto: "hoy" },
    { id: "servicio", tipo: "entero", etiqueta: "Months with this employer", min: 0, max: 600, porDefecto: 24 },
    { id: "basico", tipo: "moneda", etiqueta: "Your last basic pay for a month", min: 0, porDefecto: 25000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico < 0) throw new ErrorEntrada("Pay cannot be negative.", "basico");
    const meses = v["bt.maternity-months"];
    const aplica = e.servicio >= v["bt.maternity-service-months"];
    const observaciones: string[] = [];
    if (!aplica) observaciones.push("You need 12 months of continuous work with this employer for paid leave. Your contract may be better, so check it.");
    return {
      fin: aplica ? sumarMeses(e.inicio, meses) : null,
      meses: aplica ? meses : 0,
      pago: aplica ? redondear(e.basico * meses) : 0,
      paternidad: v["bt.paternity-working-days"],
      periodos: v["bt.parental-leave-periods"],
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Paid during the leave", formato: "moneda", destacada: true },
    { clave: "fin", etiqueta: "Last day of the minimum leave", formato: "fecha" },
    { clave: "meses", etiqueta: "Minimum paid leave", formato: "meses" },
    { clave: "paternidad", etiqueta: "Paternity leave for the other parent", formato: "dias" },
    { clave: "periodos", etiqueta: "Most periods of leave with one employer", formato: "numero" },
  ],
});
