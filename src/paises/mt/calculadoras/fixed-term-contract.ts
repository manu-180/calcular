import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { esFechaISO } from "@/motor/vigencia";
import { diasEntre } from "../lib/fechas";

export default definirCalculadora({
  id: "mt.fixed-term-contract",
  mercado: "mt",
  concepto: "indemnizacion-despido",
  slug: "fixed-term-contract",
  estado: "publicado",
  requiere: {},
  campos: [
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "Who ends the contract early",
      opciones: [
        { valor: "employer", etiqueta: "The employer" },
        { valor: "employee", etiqueta: "The employee" },
      ],
      porDefecto: "employer",
    },
    { id: "semanal", tipo: "moneda", etiqueta: "Basic weekly wage", min: 0, porDefecto: 500 },
    { id: "termina", tipo: "fecha", etiqueta: "Last day of employment", porDefecto: "hoy" },
    { id: "fin", tipo: "fecha", etiqueta: "End date in the contract", porDefecto: "2027-06-30" },
  ],
  calcular(entrada, _v, { redondear }) {
    if (entrada.semanal <= 0) throw new ErrorEntrada("Enter the weekly wage.", "semanal");
    if (!esFechaISO(entrada.termina)) throw new ErrorEntrada("Enter the last day of employment.", "termina");
    if (!esFechaISO(entrada.fin)) throw new ErrorEntrada("Enter the end date in the contract.", "fin");
    if (entrada.fin <= entrada.termina) throw new ErrorEntrada("The contract end date has to be after the last day of employment.", "fin");
    const dias = diasEntre(entrada.termina, entrada.fin);
    const salarios = redondear((entrada.semanal * dias) / 7);
    const monto = redondear(salarios / 2);
    return {
      monto,
      dias,
      semanas: redondear(dias / 7),
      salarios,
      quien: entrada.quien === "employer" ? "The employer pays the employee" : "The employee pays the employer",
    };
  },
  resultado: [
    { clave: "monto", etiqueta: "Compensation due", formato: "moneda", destacada: true },
    { clave: "quien", etiqueta: "Who pays", formato: "texto" },
    { clave: "dias", etiqueta: "Days left on the contract", formato: "dias" },
    { clave: "semanas", etiqueta: "In weeks", formato: "semanas", decimales: 1 },
    { clave: "salarios", etiqueta: "Full wages for the time left", formato: "moneda" },
  ],
});
