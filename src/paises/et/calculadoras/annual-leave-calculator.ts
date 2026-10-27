import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "et.annual-leave-calculator",
  mercado: "et",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "et.annual-leave-base": "numero",
    "et.annual-leave-step": "numero",
    "et.days-in-month": "numero",
  },
  campos: [
    { id: "anios", tipo: "entero", etiqueta: "Completed years of service", min: 0, max: 60, porDefecto: 3 },
    { id: "meses", tipo: "entero", etiqueta: "Months of service, if you have not yet completed one year", min: 0, max: 11, porDefecto: 0 },
    { id: "tomados", tipo: "numero", etiqueta: "Leave days already taken for this year", min: 0, max: 60, porDefecto: 0 },
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 13000 },
    { id: "diasMes", tipo: "numero", etiqueta: "Working days in your month", min: 1, max: 31, porDefecto: 26, ayuda: "Article 77(3) counts 26 days of service as one month. Use another figure if your contract says so." },
  ],
  calcular(e, v, { redondear }) {
    const base = v["et.annual-leave-base"];
    let derecho: number;
    if (e.anios >= 1) {
      derecho = base + Math.floor((e.anios - 1) / v["et.annual-leave-step"]);
    } else {
      if (e.meses <= 0) throw new ErrorEntrada("Enter your months of service.", "meses");
      derecho = (base * e.meses) / 12;
    }
    const pendientes = Math.max(0, derecho - e.tomados);
    const diario = e.salario / e.diasMes;
    return {
      derecho,
      pendientes,
      diario: redondear(diario),
      valor: redondear(pendientes * diario),
    };
  },
  resultado: [
    { clave: "derecho", etiqueta: "Annual leave for this year of service", formato: "dias", decimales: 1, destacada: true },
    { clave: "pendientes", etiqueta: "Days still to take", formato: "dias", decimales: 1 },
    { clave: "diario", etiqueta: "Pay for one working day", formato: "moneda" },
    { clave: "valor", etiqueta: "Value of the days still to take", formato: "moneda" },
  ],
});
