import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { philhealth, REQUIERE_PHILHEALTH } from "../lib/nomina";

export default definirCalculadora({
  id: "ph.philhealth-contribution",
  mercado: "ph",
  concepto: "propio",
  slug: "philhealth-contribution",
  estado: "publicado",
  requiere: REQUIERE_PHILHEALTH,
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly basic salary or income", min: 0, porDefecto: 30000 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "You are",
      opciones: [
        { valor: "employed", etiqueta: "Employed (premium shared with employer)" },
        { valor: "self-paying", etiqueta: "Self-employed, professional, OFW or voluntary" },
      ],
      porDefecto: "employed",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter your monthly salary or income.", "sueldo");
    const p = philhealth(entrada.sueldo, v, redondear);
    const solo = entrada.tipo === "self-paying";
    return {
      tuParte: solo ? p.prima : p.empleado,
      empleador: solo ? 0 : p.empleador,
      prima: p.prima,
      base: p.base,
      anual: redondear(p.prima * 12),
      trimestral: redondear(p.prima * 3),
    };
  },
  resultado: [
    { clave: "tuParte", etiqueta: "You pay a month", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Your employer pays a month", formato: "moneda", ocultarSiCero: true },
    { clave: "prima", etiqueta: "Total monthly premium", formato: "moneda" },
    { clave: "base", etiqueta: "Income used for the premium", formato: "moneda" },
    { clave: "trimestral", etiqueta: "Premium for a quarter", formato: "moneda" },
    { clave: "anual", etiqueta: "Premium for a year", formato: "moneda" },
  ],
});
