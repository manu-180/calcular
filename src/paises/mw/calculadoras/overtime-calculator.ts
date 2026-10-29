import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mw.overtime-calculator",
  mercado: "mw",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "mw.overtime-ordinary": "numero",
    "mw.overtime-day-off": "numero",
    "mw.overtime-holiday": "numero",
    "mw.weekly-hours-limit": "numero",
  },
  campos: [
    {
      id: "hora",
      tipo: "moneda",
      etiqueta: "Your wage for one hour",
      min: 0,
      porDefecto: 1000,
      ayuda: "If you are paid by the month, divide your monthly wage by the hours you normally work in a month.",
    },
    { id: "ordinarias", tipo: "numero", etiqueta: "Overtime hours on working days", min: 0, porDefecto: 10 },
    { id: "libres", tipo: "numero", etiqueta: "Hours worked on your days off", min: 0, porDefecto: 0 },
    { id: "feriados", tipo: "numero", etiqueta: "Hours worked on public holidays", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.hora <= 0) throw new ErrorEntrada("Enter your wage for one hour.", "hora");
    const ordinaria = redondear(e.ordinarias * e.hora * v["mw.overtime-ordinary"]);
    const libre = redondear(e.libres * e.hora * v["mw.overtime-day-off"]);
    const feriado = redondear(e.feriados * e.hora * v["mw.overtime-holiday"]);
    return {
      total: redondear(ordinaria + libre + feriado),
      ordinaria,
      libre,
      feriado,
      limite: v["mw.weekly-hours-limit"],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "ordinaria", etiqueta: "Ordinary overtime", formato: "moneda" },
    { clave: "libre", etiqueta: "Day-off overtime", formato: "moneda", ocultarSiCero: true },
    { clave: "feriado", etiqueta: "Public holiday overtime", formato: "moneda", ocultarSiCero: true },
    { clave: "limite", etiqueta: "Most normal hours your employer can ask for in a week", formato: "horas" },
  ],
});
