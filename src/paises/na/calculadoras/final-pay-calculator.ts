import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { noNegativo, valorDia } from "../lib/nomina";
import { ANTIGUEDADES, MOTIVOS, preaviso, tieneIndemnizacion } from "../lib/terminacion";

export default definirCalculadora({
  id: "na.final-pay-calculator",
  mercado: "na",
  concepto: "liquidacion-final",
  slug: "final-pay-calculator",
  estado: "publicado",
  requiere: {
    "na.weeks-per-month": "numero",
    "na.severance-weeks-per-year": "numero",
    "na.notice-period": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly remuneration", min: 0, porDefecto: 12000 },
    { id: "dias", tipo: "entero", etiqueta: "Days you work in a normal week", min: 1, max: 6, porDefecto: 5 },
    { id: "trabajados", tipo: "numero", etiqueta: "Days worked in the last month and not yet paid", min: 0, max: 31, porDefecto: 0 },
    { id: "licencia", tipo: "numero", etiqueta: "Annual leave days due and not taken", min: 0, porDefecto: 0 },
    { id: "motivo", tipo: "opcion", etiqueta: "How the job ended", opciones: MOTIVOS, porDefecto: "dismissed" },
    { id: "anios", tipo: "entero", etiqueta: "Completed years of continuous service", min: 0, max: 60, porDefecto: 3 },
    { id: "sinPreaviso", tipo: "si-no", etiqueta: "Your employer pays you instead of letting you work the notice", porDefecto: false },
    { id: "antiguedad", tipo: "opcion", etiqueta: "Time with your employer", opciones: ANTIGUEDADES, porDefecto: "over-1-year", visibleSi: { sinPreaviso: [true] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter your monthly remuneration.", "salario");
    noNegativo(e.trabajados, "trabajados", "Days cannot be negative.");
    noNegativo(e.licencia, "licencia", "Days cannot be negative.");
    const semanasMes = v["na.weeks-per-month"];
    const diaria = redondear(valorDia(e.salario, semanasMes, e.dias));
    const sueldo = redondear(diaria * e.trabajados);
    const vacaciones = redondear(diaria * e.licencia);
    const semanal = redondear(e.salario / semanasMes);
    const indemnizacion = tieneIndemnizacion(e.motivo, e.anios) ? redondear(semanal * e.anios * v["na.severance-weeks-per-year"]) : 0;
    const aviso =
      e.sinPreaviso && e.antiguedad !== null ? redondear(preaviso(e.antiguedad, v["na.notice-period"], e.salario, semanasMes, e.dias).pago) : 0;
    return {
      total: redondear(sueldo + vacaciones + indemnizacion + aviso),
      sueldo,
      vacaciones,
      indemnizacion,
      aviso,
      diaria,
      observaciones: [
        "If you were dismissed in your first year away from the place where you were recruited, your employer must also pay for transport back.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Final pay before tax", formato: "moneda", destacada: true },
    { clave: "sueldo", etiqueta: "Unpaid days worked", formato: "moneda", ocultarSiCero: true },
    { clave: "vacaciones", etiqueta: "Annual leave pay", formato: "moneda", ocultarSiCero: true },
    { clave: "indemnizacion", etiqueta: "Severance pay", formato: "moneda", ocultarSiCero: true },
    { clave: "aviso", etiqueta: "Pay instead of notice", formato: "moneda", ocultarSiCero: true },
    { clave: "diaria", etiqueta: "Your daily pay", formato: "moneda" },
  ],
});
