import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "nz.minimum-wage",
  mercado: "nz",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "nz.minimum-wage": "mapa",
  },
  campos: [
    { id: "tipo", tipo: "opcion-dato", dato: "nz.minimum-wage", etiqueta: "Which minimum wage applies to you", porDefecto: "adult" },
    { id: "horas", tipo: "numero", etiqueta: "Hours you work a week", min: 0, max: 168, porDefecto: 40 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horas <= 0) throw new ErrorEntrada("Enter the hours you work each week.", "horas");
    const hora = enMapa(v["nz.minimum-wage"], entrada.tipo);
    const semanal = redondear(hora * entrada.horas);
    return {
      hora,
      dia: redondear(hora * 8),
      semanal,
      quincenal: redondear(semanal * 2),
      anual: redondear(semanal * 52),
      observaciones: ["These are before tax. There's no minimum wage for employees under 16."],
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Minimum an hour", formato: "moneda", destacada: true },
    { clave: "dia", etiqueta: "For an 8-hour day", formato: "moneda" },
    { clave: "semanal", etiqueta: "A week for your hours", formato: "moneda" },
    { clave: "quincenal", etiqueta: "A fortnight for your hours", formato: "moneda" },
    { clave: "anual", etiqueta: "A year (52 weeks)", formato: "moneda" },
  ],
});
