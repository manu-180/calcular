import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "au.annual-leave-calculator",
  mercado: "au",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "au.vacaciones-semanas": "numero",
    "au.leave-loading": "numero",
  },
  campos: [
    { id: "horas", tipo: "numero", etiqueta: "Ordinary hours you work a week", min: 1, max: 60, porDefecto: 38 },
    { id: "semanas", tipo: "numero", etiqueta: "Weeks worked (52 for a full year)", min: 0, max: 520, porDefecto: 52 },
    { id: "tasa", tipo: "moneda", etiqueta: "Your base pay an hour (optional)", min: 0, requerido: false },
    {
      id: "loading",
      tipo: "opcion",
      etiqueta: "Annual leave loading in your award or agreement",
      opciones: [
        { valor: "no", etiqueta: "No leave loading" },
        { valor: "si", etiqueta: "17.5% leave loading" },
      ],
      porDefecto: "no",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horas <= 0) throw new ErrorEntrada("Enter your ordinary hours a week.", "horas");
    if (entrada.semanas < 0) throw new ErrorEntrada("Enter the weeks you worked.", "semanas");
    const semanasLicencia = v["au.vacaciones-semanas"];
    const anuales = redondear(entrada.horas * semanasLicencia);
    const acumuladas = redondear((entrada.horas * entrada.semanas * semanasLicencia) / 52);
    const base = entrada.tasa === null ? null : redondear(acumuladas * entrada.tasa);
    const recargo = base === null || entrada.loading === "no" ? 0 : redondear(porcentaje(base, v["au.leave-loading"]));
    return {
      anuales,
      acumuladas,
      dias: redondear((acumuladas / entrada.horas) * 5),
      base,
      recargo,
      total: base === null ? null : redondear(base + recargo),
    };
  },
  resultado: [
    { clave: "acumuladas", etiqueta: "Annual leave accrued", formato: "horas", destacada: true },
    { clave: "dias", etiqueta: "Same as working days (5-day week)", formato: "dias", decimales: 1 },
    { clave: "anuales", etiqueta: "Leave for a full year", formato: "horas" },
    { clave: "base", etiqueta: "Leave pay at your base rate", formato: "moneda" },
    { clave: "recargo", etiqueta: "Leave loading", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total leave pay", formato: "moneda" },
  ],
});
