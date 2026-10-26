import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// En borrador: el aporte por riesgos del trabajo (2 % según guías de nómina) no está en una fuente
// oficial que hoy se pueda abrir.
export default definirCalculadora({
  id: "rw.employer-cost-calculator",
  mercado: "rw",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "borrador",
  requiere: {
    "rw.pension-employer": "numero",
    "rw.maternity-employer": "numero",
    "rw.medical-employer": "numero",
    "rw.occupational-hazards": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross salary for the month", min: 0, porDefecto: 300000 },
    { id: "rama", tipo: "si-no", etiqueta: "The employee is on the RSSB medical scheme (RAMA)", porDefecto: false },
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary for the month", min: 0, porDefecto: 0, visibleSi: { rama: [true] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the gross salary for the month.", "bruto");
    const basico = e.rama ? (e.basico ?? 0) : 0;
    const pension = redondear(porcentaje(e.bruto, v["rw.pension-employer"]));
    const maternidad = redondear(porcentaje(e.bruto, v["rw.maternity-employer"]));
    const medico = redondear(porcentaje(basico, v["rw.medical-employer"]));
    const riesgos = redondear(porcentaje(e.bruto, v["rw.occupational-hazards"]));
    const cargas = pension + maternidad + medico + riesgos;
    const costo = e.bruto + cargas;
    return { costo, cargas, pension, maternidad, medico, riesgos, costoAnual: costo * 12, recargo: (cargas / e.bruto) * 100 };
  },
  resultado: [
    { clave: "costo", etiqueta: "Monthly cost to the employer", formato: "moneda", destacada: true },
    { clave: "cargas", etiqueta: "Employer contributions", formato: "moneda" },
    { clave: "pension", etiqueta: "Pension", formato: "moneda" },
    { clave: "maternidad", etiqueta: "Maternity leave", formato: "moneda" },
    { clave: "medico", etiqueta: "RAMA", formato: "moneda", ocultarSiCero: true },
    { clave: "riesgos", etiqueta: "Occupational hazards", formato: "moneda" },
    { clave: "costoAnual", etiqueta: "Cost over 12 months", formato: "moneda" },
    { clave: "recargo", etiqueta: "On top of gross salary", formato: "porcentaje", decimales: 1 },
  ],
});
