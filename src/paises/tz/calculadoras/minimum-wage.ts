import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { tzs } from "../lib/nomina";

export default definirCalculadora({
  id: "tz.minimum-wage",
  mercado: "tz",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "tz.minimum-wage-monthly": "mapa",
    "tz.minimum-wage-daily": "mapa",
    "tz.minimum-wage-hourly": "mapa",
  },
  campos: [
    { id: "sector", tipo: "opcion-dato", etiqueta: "Your sector", dato: "tz.minimum-wage-monthly", porDefecto: "other" },
    { id: "sueldo", tipo: "moneda", etiqueta: "Your monthly wage (optional, to compare)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    const mensual = enMapa(v["tz.minimum-wage-monthly"], e.sector);
    if (e.sueldo !== null && e.sueldo < 0) throw new ErrorEntrada("Wage cannot be negative.", "sueldo");
    let diferencia: number | null = null;
    const observaciones: string[] = [];
    if (e.sueldo !== null) {
      diferencia = redondear(e.sueldo - mensual);
      observaciones.push(diferencia >= 0 ? `Your wage is ${tzs(diferencia)} above the minimum.` : `Your wage is ${tzs(-diferencia)} below the minimum for this sector.`);
    }
    return {
      mensual,
      diario: enMapa(v["tz.minimum-wage-daily"], e.sector),
      hora: enMapa(v["tz.minimum-wage-hourly"], e.sector),
      diferencia,
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Minimum monthly wage", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "Minimum daily wage", formato: "moneda" },
    { clave: "hora", etiqueta: "Minimum hourly wage", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your wage compared with the minimum", formato: "moneda" },
  ],
});
