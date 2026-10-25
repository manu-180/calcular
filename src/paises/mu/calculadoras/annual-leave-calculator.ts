import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mu.annual-leave-calculator",
  mercado: "mu",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "mu.annual-leave-days": "numero",
    "mu.extra-leave-days": "numero",
    "mu.worker-wage-ceiling": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Months of continuous employment with your employer", min: 0, porDefecto: 24 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "You work",
      opciones: [
        { valor: "full", etiqueta: "Full time" },
        { valor: "part", etiqueta: "Part time" },
      ],
      porDefecto: "full",
    },
    { id: "diasSemana", tipo: "entero", etiqueta: "Days you work in a week", min: 1, max: 6, porDefecto: 3, visibleSi: { jornada: ["part"] } },
    {
      id: "diasCompleto",
      tipo: "opcion",
      etiqueta: "A full-time worker in your job works",
      opciones: [
        { valor: "5", etiqueta: "5 days a week" },
        { valor: "6", etiqueta: "6 days a week" },
      ],
      porDefecto: "5",
      visibleSi: { jornada: ["part"] },
    },
    { id: "tomados", tipo: "numero", etiqueta: "Days of leave already taken in this 12-month period", min: 0, porDefecto: 0 },
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly basic wage (optional)", min: 0, requerido: false, ayuda: "Only used to check that the Act covers you." },
  ],
  calcular(e, v, { redondear }) {
    if (e.meses < 0) throw new ErrorEntrada("Months cannot be negative.", "meses");
    const anual = v["mu.annual-leave-days"];
    const extra = v["mu.extra-leave-days"];
    const observaciones: string[] = [];
    let base = 0;
    let adicional = 0;
    if (e.meses >= 12) {
      const proporcion = e.jornada === "part" ? (e.diasSemana ?? 0) / Number(e.diasCompleto ?? "5") : 1;
      base = redondear(anual * proporcion);
      adicional = extra;
    } else if (e.meses > 6 && e.jornada === "full") {
      base = Math.min(e.meses - 6, 6);
      observaciones.push("In your first year you earn one day a month from the seventh month, if you were present on every working day in the first six months.");
    } else {
      observaciones.push(e.jornada === "full" ? "Leave starts after 6 months of continuous employment." : "A part-time worker earns annual leave after 12 months of continuous employment.");
    }
    const total = redondear(base + adicional);
    if (e.sueldo !== null && e.sueldo * 12 > v["mu.worker-wage-ceiling"]) {
      observaciones.push(`With a basic wage above Rs ${v["mu.worker-wage-ceiling"].toLocaleString("en-MU")} a year, section 45 does not apply to you. Your contract decides.`);
    }
    if (total > 0) observaciones.push("Days left at the end of the 12 months are paid at a normal day's wage, or you can choose in writing to carry them over.");
    return {
      total,
      base,
      adicional,
      restantes: redondear(Math.max(0, total - e.tomados)),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Annual leave for this 12-month period", formato: "dias", destacada: true },
    { clave: "base", etiqueta: "Annual leave under section 45", formato: "dias" },
    { clave: "adicional", etiqueta: "Extra days every worker gets", formato: "dias", ocultarSiCero: true },
    { clave: "restantes", etiqueta: "Days you still have", formato: "dias" },
  ],
});
