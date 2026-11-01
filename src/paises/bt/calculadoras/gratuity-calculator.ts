import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.gratuity-calculator",
  mercado: "bt",
  concepto: "propio",
  slug: "gratuity-calculator",
  estado: "publicado",
  requiere: {
    "bt.gratuity-min-years": "numero",
    "bt.gratuity-payment-working-days": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Last basic pay for a month", min: 0, porDefecto: 30000 },
    { id: "anios", tipo: "entero", etiqueta: "Completed years of continuous service", min: 0, max: 60, porDefecto: 12, ayuda: "Including probation. Counted from 20 February 2007 onwards." },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "How the job ended",
      opciones: [
        { valor: "normal", etiqueta: "Resignation, retirement, redundancy or end of contract" },
        { valor: "death", etiqueta: "Death of the employee" },
        { valor: "misconduct", etiqueta: "Dismissal for serious misconduct" },
      ],
      porDefecto: "normal",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico < 0) throw new ErrorEntrada("Pay cannot be negative.", "basico");
    const observaciones: string[] = [];
    let gratuity = redondear(e.basico * e.anios);
    if (e.motivo === "misconduct") {
      gratuity = 0;
      observaciones.push("No gratuity after a dismissal for serious misconduct, once the procedures of section 87 of the Act are met.");
    } else if (e.anios < v["bt.gratuity-min-years"]) {
      gratuity = 0;
      observaciones.push("Under 10 years the law does not require gratuity, but your employer, contract or service rules can give it.");
    } else if (e.motivo === "death") {
      observaciones.push("The employee's nominee receives it.");
    }
    return { gratuity, dias: v["bt.gratuity-payment-working-days"], minimo: v["bt.gratuity-min-years"], observaciones };
  },
  resultado: [
    { clave: "gratuity", etiqueta: "Gratuity", formato: "moneda", destacada: true },
    { clave: "minimo", etiqueta: "Years of service needed", formato: "anios" },
    { clave: "dias", etiqueta: "Working days to pay it after you leave", formato: "dias" },
  ],
});
