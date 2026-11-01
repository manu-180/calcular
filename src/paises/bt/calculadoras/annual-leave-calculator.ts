import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.annual-leave-calculator",
  mercado: "bt",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "bt.annual-leave-per-month": "numero",
    "bt.annual-leave-days": "numero",
    "bt.sick-leave-days": "numero",
    "bt.casual-leave-days": "numero",
    "bt.annual-leave-notice-days": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Full months worked after probation", min: 0, max: 600, porDefecto: 12 },
    { id: "usados", tipo: "numero", etiqueta: "Annual leave days you already took", min: 0, porDefecto: 0 },
    { id: "pagoDiario", tipo: "moneda", etiqueta: "Your normal pay for one day (optional)", min: 0, requerido: false, ayuda: "To see what unused days are worth if paid out." },
  ],
  calcular(e, v, { redondear }) {
    if (e.meses < 0 || e.usados < 0) throw new ErrorEntrada("Enter zero or more.", "meses");
    const ganados = e.meses * v["bt.annual-leave-per-month"];
    if (e.usados > ganados) throw new ErrorEntrada("You cannot have taken more days than you earned.", "usados");
    const restantes = ganados - e.usados;
    return {
      ganados,
      restantes,
      valor: e.pagoDiario === null ? null : redondear(restantes * e.pagoDiario),
      anual: v["bt.annual-leave-days"],
      enfermedad: v["bt.sick-leave-days"],
      casual: v["bt.casual-leave-days"],
      aviso: v["bt.annual-leave-notice-days"],
    };
  },
  resultado: [
    { clave: "restantes", etiqueta: "Annual leave days left", formato: "dias", destacada: true },
    { clave: "ganados", etiqueta: "Annual leave days earned", formato: "dias" },
    { clave: "valor", etiqueta: "Value of the days left", formato: "moneda" },
    { clave: "anual", etiqueta: "Minimum annual leave per year", formato: "dias" },
    { clave: "enfermedad", etiqueta: "Sick leave per year", formato: "dias" },
    { clave: "casual", etiqueta: "Casual leave per year", formato: "dias" },
    { clave: "aviso", etiqueta: "Written notice before taking annual leave", formato: "dias" },
  ],
});
