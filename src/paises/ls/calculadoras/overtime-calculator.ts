import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { horaNormal, OPCIONES_PERIODO } from "../lib/comun";

export default definirCalculadora({
  id: "ls.overtime-calculator",
  mercado: "ls",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "ls.pay-multipliers": "mapa",
    "ls.hours-divisor": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Your basic wage", min: 0, porDefecto: 6000 },
    { id: "periodo", tipo: "opcion", etiqueta: "The wage is paid", opciones: OPCIONES_PERIODO, porDefecto: "monthly" },
    { id: "sereno", tipo: "si-no", etiqueta: "I work as a watchman or security guard", porDefecto: false },
    { id: "extra", tipo: "numero", etiqueta: "Overtime hours on normal working days", min: 0, max: 400, porDefecto: 10 },
    { id: "descanso", tipo: "numero", etiqueta: "Hours worked on your weekly rest day", min: 0, max: 400, porDefecto: 0 },
    { id: "feriado", tipo: "numero", etiqueta: "Hours worked on public holidays", min: 0, max: 400, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your basic wage.", "salario");
    const m = v["ls.pay-multipliers"];
    const hora = redondear(horaNormal(v["ls.hours-divisor"], entrada.salario, entrada.periodo, entrada.sereno));
    const pagoExtra = redondear(entrada.extra * hora * m["overtime"]);
    const pagoDescanso = redondear(entrada.descanso * hora * m["rest-day"]);
    const pagoFeriado = redondear(entrada.feriado * hora * m["public-holiday"]);
    return {
      total: redondear(pagoExtra + pagoDescanso + pagoFeriado),
      hora,
      horaExtra: redondear(hora * m["overtime"]),
      pagoExtra,
      pagoDescanso,
      pagoFeriado,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Minimum extra pay", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Your normal hourly rate", formato: "moneda" },
    { clave: "horaExtra", etiqueta: "Overtime rate an hour", formato: "moneda" },
    { clave: "pagoExtra", etiqueta: "Overtime pay", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoDescanso", etiqueta: "Pay for the rest day", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoFeriado", etiqueta: "Pay for public holidays", formato: "moneda", ocultarSiCero: true },
  ],
});
