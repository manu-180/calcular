import { definirCalculadora, enMapa, ErrorEntrada, porRegion } from "@/motor/calculo";
import { kes } from "../lib/nomina";
import { OCUPACIONES } from "../lib/ocupaciones";

export default definirCalculadora({
  id: "ke.minimum-wage",
  mercado: "ke",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "ke.minimum-wage-monthly": "mapa-por-region",
    "ke.minimum-wage-hourly": "mapa-por-region",
  },
  campos: [
    { id: "region", tipo: "region", etiqueta: "Where you work", porDefecto: "cities" },
    { id: "ocupacion", tipo: "opcion", etiqueta: "Your job", opciones: OCUPACIONES, porDefecto: "general" },
    { id: "sueldo", tipo: "moneda", etiqueta: "Your basic pay a month (optional, to compare)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    const mensual = enMapa(porRegion(v["ke.minimum-wage-monthly"], e.region), e.ocupacion);
    const hora = enMapa(porRegion(v["ke.minimum-wage-hourly"], e.region), e.ocupacion);
    if (e.sueldo !== null && e.sueldo < 0) throw new ErrorEntrada("Pay cannot be negative.", "sueldo");
    const observaciones = ["The monthly minimum does not include housing allowance."];
    let diferencia: number | null = null;
    if (e.sueldo !== null) {
      diferencia = redondear(e.sueldo - mensual);
      observaciones.push(
        diferencia >= 0 ? `Your basic pay is ${kes(diferencia)} above the minimum.` : `Your basic pay is ${kes(-diferencia)} below the minimum for this job and area.`,
      );
    }
    return { mensual, hora, anual: redondear(mensual * 12), diferencia, observaciones };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Minimum monthly wage", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Minimum hourly rate", formato: "moneda" },
    { clave: "anual", etiqueta: "Minimum over 12 months", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your pay compared with the minimum", formato: "moneda" },
  ],
});
