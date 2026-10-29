import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { kwacha } from "../lib/nomina";

export default definirCalculadora({
  id: "zm.minimum-wage",
  mercado: "zm",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "zm.minimum-wage-monthly": "mapa",
    "zm.minimum-wage-hourly": "mapa",
    "zm.housing-allowance-rate": "numero",
    "zm.transport-allowance": "numero",
    "zm.lunch-allowance": "numero",
  },
  campos: [
    { id: "categoria", tipo: "opcion-dato", dato: "zm.minimum-wage-monthly", etiqueta: "Your job", porDefecto: "cat1" },
    { id: "vivienda", tipo: "si-no", etiqueta: "Your employer gives you a place to live", porDefecto: false },
    {
      id: "lejos",
      tipo: "si-no",
      etiqueta: "You live more than 3 km from work and your employer does not provide transport",
      porDefecto: true,
    },
    { id: "comidas", tipo: "si-no", etiqueta: "Your employer provides free meals", porDefecto: false },
    { id: "sueldo", tipo: "moneda", etiqueta: "Your basic pay a month (optional, to compare)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo !== null && e.sueldo < 0) throw new ErrorEntrada("Pay cannot be negative.", "sueldo");
    const basico = enMapa(v["zm.minimum-wage-monthly"], e.categoria);
    const hora = enMapa(v["zm.minimum-wage-hourly"], e.categoria);
    const vivienda = e.vivienda ? 0 : redondear(porcentaje(basico, v["zm.housing-allowance-rate"]));
    const transporte = e.lejos ? v["zm.transport-allowance"] : 0;
    const almuerzo = e.comidas ? 0 : v["zm.lunch-allowance"];
    const total = redondear(basico + vivienda + transporte + almuerzo);
    const observaciones: string[] = [];
    let diferencia: number | null = null;
    if (e.sueldo !== null) {
      diferencia = redondear(e.sueldo - basico);
      observaciones.push(
        diferencia >= 0
          ? `Your basic pay is ${kwacha(diferencia)} above the minimum for this job.`
          : `Your basic pay is ${kwacha(-diferencia)} below the minimum for this job.`,
      );
    }
    return { basico, hora, vivienda, transporte, almuerzo, total, diferencia, observaciones };
  },
  resultado: [
    { clave: "basico", etiqueta: "Minimum basic pay a month", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Minimum basic pay an hour", formato: "moneda" },
    { clave: "vivienda", etiqueta: "Housing allowance", formato: "moneda", ocultarSiCero: true },
    { clave: "transporte", etiqueta: "Transport allowance", formato: "moneda", ocultarSiCero: true },
    { clave: "almuerzo", etiqueta: "Lunch allowance", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Minimum pay with allowances", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your basic pay compared with the minimum", formato: "moneda" },
  ],
});
