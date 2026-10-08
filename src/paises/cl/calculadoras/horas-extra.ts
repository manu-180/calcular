import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.horas-extra",
  mercado: "cl",
  concepto: "horas-extra",
  slug: "horas-extra",
  estado: "publicado",
  requiere: {
    "cl.jornada-maxima": "numero",
    "cl.recargo-hora-extra": "numero",
    "cl.imm": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo base mensual", min: 0 },
    {
      id: "jornada",
      tipo: "entero",
      etiqueta: "Horas semanales de tu contrato",
      ayuda: "Si tu contrato dice la jornada máxima legal, escribe ese número.",
      min: 1,
      max: 45,
      porDefecto: 42,
    },
    { id: "horas", tipo: "numero", etiqueta: "Horas extra del mes", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const maxima = valores["cl.jornada-maxima"];
    if (entrada.jornada > maxima) throw new ErrorEntrada(`La jornada máxima legal hoy es de ${maxima} horas semanales. Revisa el número de tu contrato.`, "jornada");
    const minimoProporcional = (valores["cl.imm"] * entrada.jornada) / maxima;
    const base = Math.max(entrada.sueldo, minimoProporcional);
    const horaOrdinaria = (base / 30) * 28 / (4 * entrada.jornada);
    const horaExtraExacta = horaOrdinaria + porcentaje(horaOrdinaria, valores["cl.recargo-hora-extra"]);
    return {
      base: redondear(base),
      horaOrdinaria: redondear(horaOrdinaria),
      horaExtra: redondear(horaExtraExacta),
      total: redondear(horaExtraExacta * entrada.horas),
      observaciones: entrada.sueldo < minimoProporcional ? ["Tu sueldo base está bajo el ingreso mínimo para tu jornada, así que las horas extra se calculan sobre el mínimo."] : [],
    };
  },
  resultado: [
    { clave: "base", etiqueta: "Sueldo que se usa para el cálculo", formato: "moneda" },
    { clave: "horaOrdinaria", etiqueta: "Valor de la hora normal", formato: "moneda" },
    { clave: "horaExtra", etiqueta: "Valor de la hora extra", formato: "moneda" },
    { clave: "total", etiqueta: "Total por horas extra", formato: "moneda", destacada: true },
  ],
});
