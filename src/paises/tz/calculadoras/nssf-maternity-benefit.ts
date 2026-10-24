import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// NSSF: AIDE = ingresos de los seis meses anteriores a la semana 20 / 180. Se paga en dos cuotas:
// 28 días antes del parto y 56 después (84 en total).
export default definirCalculadora({
  id: "tz.nssf-maternity-benefit",
  mercado: "tz",
  concepto: "propio",
  slug: "nssf-maternity-benefit",
  estado: "publicado",
  requiere: {
    "tz.nssf-maternity-days": "numero",
  },
  campos: [{ id: "ingresos", tipo: "moneda", etiqueta: "Total earnings in the six months before the 20th week of pregnancy", min: 0, porDefecto: 6000000 }],
  calcular(e, v, { redondear }) {
    if (e.ingresos <= 0) throw new ErrorEntrada("Enter your earnings for those six months.", "ingresos");
    const aide = e.ingresos / 180;
    const primera = redondear(aide * 28);
    const total = redondear(aide * v["tz.nssf-maternity-days"]);
    return {
      total,
      primera,
      segunda: redondear(total - primera),
      aide: redondear(aide),
      observaciones: ["You need at least 36 monthly contributions, 12 of them in the 36 months before the expected week of confinement."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Maternity cash benefit", formato: "moneda", destacada: true },
    { clave: "primera", etiqueta: "First instalment (39th week of pregnancy)", formato: "moneda" },
    { clave: "segunda", etiqueta: "Second instalment (after the birth)", formato: "moneda" },
    { clave: "aide", etiqueta: "Average insurable daily earnings", formato: "moneda" },
  ],
});
