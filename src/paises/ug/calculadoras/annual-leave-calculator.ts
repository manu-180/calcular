import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.annual-leave-calculator",
  mercado: "ug",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "ug.leave-days-per-4-months": "numero",
    "ug.leave-min-months": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Months worked this calendar year", min: 0, max: 12, porDefecto: 12 },
    { id: "antiguedad", tipo: "entero", etiqueta: "Months you have worked for this employer in total", min: 0, max: 600, porDefecto: 24 },
    { id: "mensual", tipo: "moneda", etiqueta: "Monthly pay", min: 0, porDefecto: 1000000 },
    {
      id: "semana",
      tipo: "opcion",
      etiqueta: "Working days a week",
      opciones: [
        { valor: "5", etiqueta: "5 days" },
        { valor: "6", etiqueta: "6 days" },
      ],
      porDefecto: "5",
    },
    { id: "tomados", tipo: "numero", etiqueta: "Leave days already taken this year", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual < 0) throw new ErrorEntrada("Pay cannot be negative.", "mensual");
    const porPeriodo = v["ug.leave-days-per-4-months"];
    const observaciones: string[] = [];
    if (e.antiguedad < v["ug.leave-min-months"]) {
      observaciones.push("The Act gives annual leave once you have six months of continuous service with the employer.");
      return { dias: 0, proporcional: 0, pendientes: 0, valorDia: 0, valor: 0, observaciones };
    }
    const dias = porPeriodo * Math.floor(e.meses / 4);
    const proporcional = (porPeriodo * e.meses) / 4;
    const pendientes = Math.max(0, proporcional - e.tomados);
    const valorDia = redondear((e.mensual * 12) / (52 * Number(e.semana)));
    observaciones.push("The daily rate assumes your monthly pay covers 52 weeks a year. Your contract may set another rate.");
    return { dias, proporcional, pendientes, valorDia, valor: redondear(pendientes * valorDia), observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Leave earned for full four-month periods", formato: "dias", destacada: true },
    { clave: "proporcional", etiqueta: "Leave earned in proportion to months worked", formato: "dias", decimales: 2 },
    { clave: "pendientes", etiqueta: "Days not yet taken", formato: "dias", decimales: 2 },
    { clave: "valorDia", etiqueta: "Pay for one day", formato: "moneda" },
    { clave: "valor", etiqueta: "Pay in lieu of the days not taken", formato: "moneda" },
  ],
});
