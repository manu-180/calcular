import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ng.pension-calculator",
  mercado: "ng",
  concepto: "aportes-seguridad-social",
  slug: "pension-calculator",
  estado: "publicado",
  requiere: {
    "ng.pension-employee": "numero",
    "ng.pension-employer": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary a month", min: 0, porDefecto: 250000 },
    { id: "vivienda", tipo: "moneda", etiqueta: "Housing allowance a month", min: 0, porDefecto: 125000 },
    { id: "transporte", tipo: "moneda", etiqueta: "Transport allowance a month", min: 0, porDefecto: 75000 },
  ],
  calcular(entrada, v, { redondear }) {
    const base = entrada.basico + entrada.vivienda + entrada.transporte;
    if (base <= 0) throw new ErrorEntrada("Enter your basic salary and allowances.", "basico");
    const tuyo = redondear(porcentaje(base, v["ng.pension-employee"]));
    const empleador = redondear(porcentaje(base, v["ng.pension-employer"]));
    return {
      total: redondear(tuyo + empleador),
      tuyo,
      empleador,
      anual: redondear((tuyo + empleador) * 12),
      base: redondear(base),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total into your RSA a month", formato: "moneda", destacada: true },
    { clave: "tuyo", etiqueta: "Your contribution", formato: "moneda" },
    { clave: "empleador", etiqueta: "Employer's contribution", formato: "moneda" },
    { clave: "anual", etiqueta: "Total a year", formato: "moneda" },
    { clave: "base", etiqueta: "Monthly emoluments used", formato: "moneda" },
  ],
});
