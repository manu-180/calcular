import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { libras } from "../lib/impuestos";

// Se cuenta hacia atrás desde la fecha del despido: el año i (1 = el más reciente) es un año completo
// con la edad que la persona tenía al empezarlo (edad actual − i). Así 20 años desde los 41 dan el
// máximo oficial de 30 semanas.
function semanasDeIndemnizacion(edad: number, anios: number): number {
  let semanas = 0;
  for (let i = 1; i <= anios; i++) {
    const edadEseAnio = edad - i;
    semanas += edadEseAnio >= 41 ? 1.5 : edadEseAnio >= 22 ? 1 : 0.5;
  }
  return semanas;
}

export default definirCalculadora({
  id: "gb.redundancy-pay",
  mercado: "gb",
  concepto: "indemnizacion-despido",
  slug: "redundancy-pay",
  estado: "publicado",
  requiere: {
    "gb.redundancy-weekly-pay-cap": "numero",
    "gb.redundancy-max-years": "numero",
  },
  campos: [
    { id: "edad", tipo: "entero", etiqueta: "Your age on the date you are made redundant", min: 16, max: 100, porDefecto: 40 },
    { id: "anios", tipo: "entero", etiqueta: "Full years you have worked for this employer", min: 0, max: 80, porDefecto: 10 },
    { id: "semanal", tipo: "moneda", etiqueta: "Weekly pay before tax", min: 0, porDefecto: 600 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.anios > entrada.edad - 15) throw new ErrorEntrada("Your years of service do not fit with your age. Check both figures.", "anios");
    const tope = v["gb.redundancy-weekly-pay-cap"];
    const observaciones: string[] = [];
    if (entrada.anios < 2) {
      observaciones.push("You need at least 2 full years with your employer to get statutory redundancy pay.");
      return { total: 0, semanas: 0, aniosContados: entrada.anios, pagaSemanal: Math.min(entrada.semanal, tope), observaciones };
    }
    const aniosContados = Math.min(entrada.anios, v["gb.redundancy-max-years"]);
    const semanas = semanasDeIndemnizacion(entrada.edad, aniosContados);
    const pagaSemanal = Math.min(entrada.semanal, tope);
    if (entrada.semanal > tope) observaciones.push(`Weekly pay is capped at ${libras(tope)} for statutory redundancy pay.`);
    if (entrada.anios > aniosContados) observaciones.push(`Only your most recent ${aniosContados} years count.`);
    observaciones.push("Statutory redundancy pay under £30,000 is not taxable. Your contract may give you more than the legal minimum.");
    return { total: redondear(semanas * pagaSemanal), semanas, aniosContados, pagaSemanal, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Statutory redundancy pay", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "Weeks of pay", formato: "numero", decimales: 1 },
    { clave: "aniosContados", etiqueta: "Years counted", formato: "anios" },
    { clave: "pagaSemanal", etiqueta: "Weekly pay used", formato: "moneda" },
  ],
});
