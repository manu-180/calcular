import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "au.minimum-wage",
  mercado: "au",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "au.salario-minimo-semanal": "numero",
    "au.salario-minimo-hora": "numero",
    "au.recargo-casual": "numero",
  },
  campos: [
    { id: "horas", tipo: "numero", etiqueta: "Hours you work a week", min: 1, max: 80, porDefecto: 38 },
    { id: "casual", tipo: "si-no", etiqueta: "You are a casual employee", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horas <= 0 || entrada.horas > 80) throw new ErrorEntrada("Enter between 1 and 80 hours a week.", "horas");
    const hora = v["au.salario-minimo-hora"];
    const porHora = entrada.casual ? redondear(hora + porcentaje(hora, v["au.recargo-casual"])) : hora;
    const semanal = entrada.casual ? redondear(porHora * entrada.horas) : redondear((v["au.salario-minimo-semanal"] * entrada.horas) / 38);
    return {
      porHora,
      semanal,
      quincenal: redondear(semanal * 2),
      anual: redondear(semanal * 52),
      observaciones: [
        "This is the National Minimum Wage for adults who are not covered by an award or registered agreement. Most employees are covered by an award, which can set a higher rate.",
      ],
    };
  },
  resultado: [
    { clave: "porHora", etiqueta: "Minimum pay an hour", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "Minimum pay a week", formato: "moneda" },
    { clave: "quincenal", etiqueta: "Minimum pay a fortnight", formato: "moneda" },
    { clave: "anual", etiqueta: "Minimum pay a year (52 weeks)", formato: "moneda" },
  ],
});
