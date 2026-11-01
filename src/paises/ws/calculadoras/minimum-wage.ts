import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { wst } from "../lib/nomina";

export default definirCalculadora({
  id: "ws.minimum-wage",
  mercado: "ws",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "ws.min-wage-hourly": "numero",
    "ws.standard-week-hours": "numero",
  },
  campos: [
    { id: "horas", tipo: "numero", etiqueta: "Hours you work in a week", min: 1, max: 80, porDefecto: 40, ayuda: "Ordinary hours, not overtime." },
    { id: "pagaHora", tipo: "moneda", etiqueta: "Your pay per hour (optional, to compare)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.pagaHora !== null && e.pagaHora < 0) throw new ErrorEntrada("Pay cannot be negative.", "pagaHora");
    const hora = v["ws.min-wage-hourly"];
    const semanal = redondear(hora * e.horas);
    const observaciones = [
      "The minimum wage covers the private sector and state-owned enterprises. Workers and employers under the Public Service Act 2004 are not covered.",
    ];
    let diferencia: number | null = null;
    if (e.pagaHora !== null) {
      diferencia = redondear(e.pagaHora - hora);
      observaciones.push(diferencia >= 0 ? `Your hourly pay is ${wst(diferencia)} above the minimum.` : `Your hourly pay is ${wst(-diferencia)} below the minimum.`);
    }
    return {
      hora,
      semanal,
      quincenal: redondear(hora * e.horas * 2),
      mensual: redondear((hora * e.horas * 52) / 12),
      anual: redondear(hora * e.horas * 52),
      diferencia,
      observaciones,
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Minimum wage per hour", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "Per week", formato: "moneda" },
    { clave: "quincenal", etiqueta: "Per fortnight", formato: "moneda" },
    { clave: "mensual", etiqueta: "Per month", formato: "moneda" },
    { clave: "anual", etiqueta: "Per year", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your hourly pay compared with the minimum", formato: "moneda" },
  ],
});
