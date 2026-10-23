import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { OPCIONES_DIA, REQUIERE_JORNADA, tarifas } from "../lib/jornada";

export default definirCalculadora({
  id: "ph.night-differential",
  mercado: "ph",
  concepto: "propio",
  slug: "night-differential",
  estado: "publicado",
  requiere: REQUIERE_JORNADA,
  campos: [
    { id: "diario", tipo: "moneda", etiqueta: "Your regular daily wage", min: 0, porDefecto: 755 },
    { id: "dia", tipo: "opcion", etiqueta: "Type of day", opciones: OPCIONES_DIA, porDefecto: "ordinary" },
    { id: "horas", tipo: "numero", etiqueta: "Hours worked between 10 pm and 6 am (within your 8 hours)", min: 0, max: 8, porDefecto: 8 },
    { id: "noches", tipo: "entero", etiqueta: "Number of nights", min: 1, max: 31, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.diario <= 0) throw new ErrorEntrada("Enter your daily wage.", "diario");
    if (entrada.horas > v["ph.normal-hours"]) throw new ErrorEntrada("Count only the hours within your normal 8-hour shift. Use the overtime calculator for the rest.", "horas");
    const t = tarifas(entrada.diario, entrada.dia, v);
    const porHora = redondear(t.horaDia * t.nocturno);
    const porNoche = redondear(t.horaDia * t.nocturno * entrada.horas);
    return {
      total: redondear(porNoche * entrada.noches),
      porNoche,
      porHora,
      horaDia: redondear(t.horaDia),
      tasa: v["ph.night-shift-differential"],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Night shift differential", formato: "moneda", destacada: true },
    { clave: "porNoche", etiqueta: "Per night", formato: "moneda" },
    { clave: "porHora", etiqueta: "Per night hour", formato: "moneda" },
    { clave: "horaDia", etiqueta: "Hourly rate for that day", formato: "moneda" },
    { clave: "tasa", etiqueta: "Night differential rate", formato: "porcentaje", decimales: 0 },
  ],
});
