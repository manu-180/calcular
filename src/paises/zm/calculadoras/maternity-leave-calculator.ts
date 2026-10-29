import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "zm.maternity-leave-calculator",
  mercado: "zm",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "zm.maternity-weeks": "numero",
    "zm.maternity-multiple-weeks": "numero",
    "zm.maternity-after-birth-weeks": "numero",
    "zm.paternity-days": "numero",
  },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "Expected date of delivery", porDefecto: "hoy" },
    { id: "antes", tipo: "entero", etiqueta: "Weeks of leave before the delivery date", min: 0, max: 20, porDefecto: 4 },
    { id: "multiple", tipo: "si-no", etiqueta: "Twins or more", porDefecto: false },
    { id: "antiguedad", tipo: "si-no", etiqueta: "You have worked for the same employer for the last 24 months in a row", porDefecto: true },
  ],
  calcular(e, v) {
    const total = v["zm.maternity-weeks"] + (e.multiple ? v["zm.maternity-multiple-weeks"] : 0);
    const despuesMinimo = v["zm.maternity-after-birth-weeks"];
    if (e.antes > total - despuesMinimo) {
      throw new ErrorEntrada(`At least ${despuesMinimo} weeks have to be taken after the birth, so you can start at most ${total - despuesMinimo} weeks before it.`, "antes");
    }
    const inicio = sumarDias(e.parto, -7 * e.antes);
    const ultimo = sumarDias(inicio, 7 * total - 1);
    const observaciones = e.antiguedad
      ? ["With 24 months of continuous service the leave is on full pay, unless maternity benefits are paid under another law."]
      : ["You still get the leave, but the Code only guarantees full pay after 24 months of continuous service with the same employer."];
    return { total, inicio, ultimo, regreso: sumarDias(ultimo, 1), despues: total - e.antes, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Maternity leave", formato: "semanas", destacada: true },
    { clave: "inicio", etiqueta: "First day of leave", formato: "fecha" },
    { clave: "ultimo", etiqueta: "Last day of leave", formato: "fecha" },
    { clave: "regreso", etiqueta: "Back at work on", formato: "fecha" },
    { clave: "despues", etiqueta: "Leave after the delivery date", formato: "semanas" },
  ],
});
