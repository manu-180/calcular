import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gh.employer-cost",
  mercado: "gh",
  concepto: "costo-empleador",
  slug: "employer-cost",
  estado: "publicado",
  requiere: {
    "gh.ssnit-employer-rate": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary a month", min: 0, porDefecto: 5000 },
    { id: "subsidios", tipo: "moneda", etiqueta: "Allowances a month", min: 0, porDefecto: 0 },
    { id: "empleados", tipo: "entero", etiqueta: "Number of workers on this pay", min: 1, max: 10000, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter the basic salary.", "basico");
    const ssnit = redondear(porcentaje(entrada.basico, v["gh.ssnit-employer-rate"]));
    const mensual = redondear(entrada.basico + entrada.subsidios + ssnit);
    return {
      mensual,
      ssnit,
      total: redondear(mensual * entrada.empleados),
      anual: redondear(mensual * entrada.empleados * 12),
      observaciones: ["The worker's own 5.5% SSNIT comes out of the salary, so it is not an extra cost for the employer."],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Monthly cost of one worker", formato: "moneda", destacada: true },
    { clave: "ssnit", etiqueta: "Employer SSNIT contribution", formato: "moneda" },
    { clave: "total", etiqueta: "Monthly cost of all workers", formato: "moneda" },
    { clave: "anual", etiqueta: "Yearly cost of all workers", formato: "moneda" },
  ],
});
