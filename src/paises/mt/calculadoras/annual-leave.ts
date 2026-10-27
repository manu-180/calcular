import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { anioDe } from "../lib/fechas";
import { feriadosEnFinDeSemana } from "../lib/malta";

export default definirCalculadora({
  id: "mt.annual-leave",
  mercado: "mt",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "publicado",
  requiere: { "mt.annual-leave-hours": "numero" },
  campos: [
    { id: "horas", tipo: "numero", etiqueta: "Normal hours you work a week", min: 0, max: 48, porDefecto: 40 },
    { id: "dias", tipo: "entero", etiqueta: "Days you work a week", min: 1, max: 7, porDefecto: 5 },
    { id: "meses", tipo: "entero", etiqueta: "Months you are employed this year", min: 1, max: 12, porDefecto: 12 },
    { id: "completo", tipo: "si-no", etiqueta: "You are a whole-time employee", porDefecto: true },
  ],
  calcular(entrada, v, { redondear, fecha }) {
    if (entrada.horas <= 0) throw new ErrorEntrada("Enter the hours you work each week.", "horas");
    if (entrada.meses < 1 || entrada.meses > 12) throw new ErrorEntrada("Enter between 1 and 12 months.", "meses");
    const anio = anioDe(fecha);
    const finde = feriadosEnFinDeSemana(anio);
    const diaNormal = entrada.horas / entrada.dias;
    const base = (v["mt.annual-leave-hours"] * entrada.horas) / 40;
    const extra = entrada.completo ? finde.length * diaNormal : 0;
    const proporcion = entrada.meses / 12;
    const total = redondear((base + extra) * proporcion);
    const observaciones: string[] = [];
    if (entrada.completo && finde.length > 0) {
      observaciones.push(`In ${anio}, ${finde.map((f) => f.nombre).join(", ")} fall on a weekend, so whole-time employees get ${finde.length} extra day${finde.length === 1 ? "" : "s"} of leave.`);
    }
    if (entrada.meses < 12) observaciones.push("If you are employed for only part of the year, your leave is in proportion to the months you work.");
    return {
      total,
      diasLibres: redondear(total / diaNormal),
      base: redondear(base * proporcion),
      extra: redondear(extra * proporcion),
      feriados: finde.length,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Paid annual leave this year", formato: "horas", decimales: 2, destacada: true },
    { clave: "diasLibres", etiqueta: "In working days", formato: "dias", decimales: 1 },
    { clave: "base", etiqueta: "Minimum leave", formato: "horas", decimales: 2 },
    { clave: "extra", etiqueta: "Extra leave for public holidays on a weekend", formato: "horas", decimales: 2, ocultarSiCero: true },
    { clave: "feriados", etiqueta: "Public holidays on a weekend this year", formato: "numero", decimales: 0 },
  ],
});
