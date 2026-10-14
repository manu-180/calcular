import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { dolares } from "../lib/impuestos";

const PERIODOS = { anual: 1, mensual: 12, quincenal: 26, semanal: 52 } as const;

export default definirCalculadora({
  id: "au.super-guarantee-calculator",
  mercado: "au",
  concepto: "aportes-seguridad-social",
  slug: "super-guarantee-calculator",
  estado: "publicado",
  requiere: {
    "au.super-guarantee": "numero",
    "au.super-base-maxima": "numero",
  },
  campos: [
    { id: "ganancias", tipo: "moneda", etiqueta: "Your earnings before tax (ordinary pay)", min: 0, porDefecto: 85000 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "That amount is per",
      opciones: [
        { valor: "anual", etiqueta: "Year" },
        { valor: "mensual", etiqueta: "Month" },
        { valor: "quincenal", etiqueta: "Fortnight" },
        { valor: "semanal", etiqueta: "Week" },
      ],
      porDefecto: "anual",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ganancias <= 0) throw new ErrorEntrada("Enter your earnings before tax.", "ganancias");
    const n = PERIODOS[entrada.periodo];
    const anuales = entrada.ganancias * n;
    const base = v["au.super-base-maxima"];
    const tasa = v["au.super-guarantee"];
    const anual = redondear(porcentaje(Math.min(anuales, base), tasa));
    const observaciones: string[] = [];
    if (anuales > base) {
      observaciones.push(`Your employer only has to pay super guarantee on earnings up to ${dolares(base)} a year, the maximum contribution base.`);
    }
    return {
      porPeriodo: redondear(anual / n),
      anual,
      tasa,
      paquete: redondear(anuales + anual),
      observaciones,
    };
  },
  resultado: [
    { clave: "porPeriodo", etiqueta: "Super for each pay period", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Super a year", formato: "moneda" },
    { clave: "tasa", etiqueta: "Super guarantee rate", formato: "porcentaje", decimales: 1 },
    { clave: "paquete", etiqueta: "Salary plus super (a year)", formato: "moneda" },
  ],
});
