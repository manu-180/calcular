import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.overtime-calculator",
  mercado: "ug",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "ug.weekly-hours": "numero",
    "ug.overtime-normal": "numero",
    "ug.overtime-holiday": "numero",
  },
  campos: [
    { id: "mensual", tipo: "moneda", etiqueta: "Monthly pay", min: 0, porDefecto: 1000000 },
    { id: "semanales", tipo: "numero", etiqueta: "Normal working hours a week", min: 1, max: 56, porDefecto: 48, ayuda: "48 unless your contract sets fewer." },
    { id: "extra", tipo: "numero", etiqueta: "Overtime hours on normal working days", min: 0, porDefecto: 10 },
    { id: "feriado", tipo: "numero", etiqueta: "Overtime hours on public holidays", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual <= 0) throw new ErrorEntrada("Enter your monthly pay.", "mensual");
    const hora = redondear((e.mensual * 12) / (52 * e.semanales));
    const normal = redondear(e.extra * hora * v["ug.overtime-normal"]);
    const feriado = redondear(e.feriado * hora * v["ug.overtime-holiday"]);
    const observaciones: string[] = [];
    if (e.semanales > v["ug.weekly-hours"]) observaciones.push("Normal hours above 48 a week need an agreement with your employer, and never more than 10 a day or 56 a week.");
    observaciones.push("The hourly rate assumes your monthly pay covers 52 weeks a year.");
    return { total: redondear(normal + feriado), normal, feriado, hora, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "normal", etiqueta: "On normal working days (1.5 times)", formato: "moneda" },
    { clave: "feriado", etiqueta: "On public holidays (2 times)", formato: "moneda", ocultarSiCero: true },
    { clave: "hora", etiqueta: "Your normal hourly rate", formato: "moneda" },
  ],
});
