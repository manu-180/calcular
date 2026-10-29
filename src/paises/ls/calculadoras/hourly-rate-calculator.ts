import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { horaNormal, OPCIONES_PERIODO, OPCIONES_SEMANA } from "../lib/comun";

export default definirCalculadora({
  id: "ls.hourly-rate-calculator",
  mercado: "ls",
  concepto: "propio",
  slug: "hourly-rate-calculator",
  estado: "publicado",
  requiere: {
    "ls.hours-divisor": "mapa",
    "ls.daily-hours": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Your wage", min: 0, porDefecto: 6000 },
    { id: "periodo", tipo: "opcion", etiqueta: "The wage is paid", opciones: OPCIONES_PERIODO, porDefecto: "monthly" },
    { id: "sereno", tipo: "si-no", etiqueta: "I work as a watchman or security guard", porDefecto: false },
    { id: "semana", tipo: "opcion", etiqueta: "You normally work", opciones: OPCIONES_SEMANA, porDefecto: "five-day" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your wage.", "salario");
    const hora = horaNormal(v["ls.hours-divisor"], entrada.salario, entrada.periodo, entrada.sereno);
    const horasDia = enMapa(v["ls.daily-hours"], entrada.semana);
    return {
      hora: redondear(hora),
      dia: entrada.sereno ? null : redondear(hora * horasDia),
      semana: entrada.sereno ? null : redondear(hora * v["ls.hours-divisor"]["weekly"]),
      divisor: v["ls.hours-divisor"][`${entrada.periodo}${entrada.sereno ? "-watchman" : ""}`],
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Normal hourly rate", formato: "moneda", destacada: true },
    { clave: "dia", etiqueta: "Pay for a full normal day", formato: "moneda" },
    { clave: "semana", etiqueta: "Pay for a normal week", formato: "moneda" },
    { clave: "divisor", etiqueta: "Hours the Labour Act divides by", formato: "horas" },
  ],
});
