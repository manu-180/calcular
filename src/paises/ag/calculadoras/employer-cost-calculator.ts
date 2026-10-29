import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.employer-cost-calculator",
  mercado: "ag",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "ag.ss-employer-rate": "mapa",
    "ag.ss-ceiling-monthly": "numero",
    "ag.mbs-employer-rate": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 4000 },
    { id: "sector", tipo: "opcion-dato", etiqueta: "Sector", dato: "ag.ss-employer-rate", porDefecto: "private" },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the gross pay for the month.", "bruto");
    const base = Math.min(e.bruto, v["ag.ss-ceiling-monthly"]);
    const socialSecurity = redondear(porcentaje(base, enMapa(v["ag.ss-employer-rate"], e.sector)));
    const medical = redondear(porcentaje(e.bruto, v["ag.mbs-employer-rate"]));
    const extras = redondear(socialSecurity + medical);
    const costoMensual = redondear(e.bruto + extras);
    return { socialSecurity, medical, extras, costoMensual, costoAnual: redondear(costoMensual * 12) };
  },
  resultado: [
    { clave: "costoMensual", etiqueta: "Monthly cost to the employer", formato: "moneda", destacada: true },
    { clave: "socialSecurity", etiqueta: "Employer Social Security", formato: "moneda" },
    { clave: "medical", etiqueta: "Employer Medical Benefits", formato: "moneda" },
    { clave: "extras", etiqueta: "Contributions on top of pay", formato: "moneda" },
    { clave: "costoAnual", etiqueta: "Cost over 12 months", formato: "moneda" },
  ],
});
