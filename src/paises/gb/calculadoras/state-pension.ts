import { definirCalculadora } from "@/motor/calculo";
import { libras } from "../lib/impuestos";

export default definirCalculadora({
  id: "gb.state-pension",
  mercado: "gb",
  concepto: "jubilacion",
  slug: "state-pension",
  estado: "publicado",
  requiere: {
    "gb.state-pension-full-weekly": "numero",
    "gb.state-pension-full-years": "numero",
    "gb.state-pension-min-years": "numero",
  },
  campos: [
    { id: "anios", tipo: "entero", etiqueta: "Qualifying years on your National Insurance record", min: 0, max: 60, porDefecto: 30, ayuda: "For a record that started on or after 6 April 2016. Your State Pension forecast shows your years." },
  ],
  calcular(entrada, v, { redondear }) {
    const completa = v["gb.state-pension-full-weekly"];
    const necesarios = v["gb.state-pension-full-years"];
    const minimo = v["gb.state-pension-min-years"];
    const observaciones: string[] = [];
    let semanal = 0;
    if (entrada.anios < minimo) {
      observaciones.push(`You need at least ${minimo} qualifying years to get any new State Pension.`);
    } else {
      semanal = redondear((completa * Math.min(entrada.anios, necesarios)) / necesarios);
    }
    const faltan = Math.max(0, necesarios - entrada.anios);
    if (faltan > 0) observaciones.push(`Each extra qualifying year adds about ${libras(redondear(completa / necesarios))} a week.`);
    observaciones.push("If you paid National Insurance before April 2016, your starting amount is worked out differently. Check your State Pension forecast.");
    return {
      semanal,
      cuatroSemanas: redondear(semanal * 4),
      anual: redondear(semanal * 52),
      faltan,
      observaciones,
    };
  },
  resultado: [
    { clave: "semanal", etiqueta: "New State Pension a week", formato: "moneda", destacada: true },
    { clave: "cuatroSemanas", etiqueta: "Every 4 weeks (how it is paid)", formato: "moneda" },
    { clave: "anual", etiqueta: "A year", formato: "moneda" },
    { clave: "faltan", etiqueta: "Years still needed for the full amount", formato: "anios" },
  ],
});
