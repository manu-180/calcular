import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { JURISDICCIONES, mesesDeServicio, semanasPorAntiguedad } from "../lib/laboral";

export default definirCalculadora({
  id: "ca.termination-pay",
  mercado: "ca",
  concepto: "preaviso",
  slug: "termination-pay",
  estado: "publicado",
  requiere: {
    "ca.notice-on": "mapa",
    "ca.notice-bc": "mapa",
    "ca.notice-ab": "mapa",
    "ca.notice-federal": "mapa",
  },
  campos: [
    { id: "jurisdiccion", tipo: "opcion", etiqueta: "Rules that cover your job", opciones: JURISDICCIONES, porDefecto: "on" },
    { id: "anios", tipo: "entero", etiqueta: "Completed years with this employer", min: 0, max: 60, porDefecto: 4 },
    { id: "meses", tipo: "entero", etiqueta: "Extra months", min: 0, max: 11, porDefecto: 0 },
    { id: "semanal", tipo: "moneda", etiqueta: "Regular wages for a normal work week", min: 0, porDefecto: 1200 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.semanal <= 0) throw new ErrorEntrada("Enter your regular weekly wages.", "semanal");
    const meses = mesesDeServicio(entrada.anios, entrada.meses);
    const semanas = semanasPorAntiguedad(v[`ca.notice-${entrada.jurisdiccion}`], meses);
    const observaciones: string[] = [];
    if (semanas === 0) observaciones.push("At this length of service the minimum standards do not require notice or pay instead of notice.");
    observaciones.push("This is the legal minimum. Your employment contract can give you more, and notice is not owed if you quit or are dismissed for just cause.");
    return {
      pago: redondear(semanas * entrada.semanal),
      semanas,
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Termination pay instead of notice", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "Weeks of notice", formato: "numero", decimales: 0 },
  ],
});
