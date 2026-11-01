import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { nomina, REQUIERE_NOMINA } from "../lib/nomina";

export default definirCalculadora({
  id: "rw.rssb-contribution-calculator",
  mercado: "rw",
  concepto: "aportes-seguridad-social",
  slug: "rssb-contribution-calculator",
  estado: "publicado",
  requiere: {
    ...REQUIERE_NOMINA,
    "rw.pension-employer": "numero",
    "rw.maternity-employer": "numero",
    "rw.medical-employer": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross salary for the month", min: 0, porDefecto: 300000, ayuda: "Basic salary plus allowances." },
    { id: "rama", tipo: "si-no", etiqueta: "The employee is on the RSSB medical scheme (RAMA)", porDefecto: false },
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary for the month", min: 0, porDefecto: 0, visibleSi: { rama: [true] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the gross salary for the month.", "bruto");
    const basico = e.rama ? (e.basico ?? 0) : 0;
    if (basico > e.bruto) throw new ErrorEntrada("Basic salary cannot be more than gross salary.", "basico");
    const n = nomina(e.bruto, basico, v, redondear);
    const pensionEmpleador = redondear(porcentaje(e.bruto, v["rw.pension-employer"]));
    const maternidadEmpleador = redondear(porcentaje(e.bruto, v["rw.maternity-employer"]));
    const medicoEmpleador = redondear(porcentaje(basico, v["rw.medical-employer"]));
    const empleado = n.pension + n.maternidad + n.medico + n.cbhi;
    const empleador = pensionEmpleador + maternidadEmpleador + medicoEmpleador;
    return {
      total: empleado + empleador,
      empleado,
      pension: n.pension,
      maternidad: n.maternidad,
      medico: n.medico,
      cbhi: n.cbhi,
      empleador,
      pensionEmpleador,
      maternidadEmpleador,
      medicoEmpleador,
      observaciones: ["The occupational hazards contribution is not included here."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total to declare to RSSB", formato: "moneda", destacada: true },
    { clave: "empleado", etiqueta: "Deducted from the employee", formato: "moneda" },
    { clave: "pension", etiqueta: "Pension, employee share", formato: "moneda" },
    { clave: "maternidad", etiqueta: "Maternity leave, employee share", formato: "moneda" },
    { clave: "medico", etiqueta: "RAMA, employee share", formato: "moneda", ocultarSiCero: true },
    { clave: "cbhi", etiqueta: "CBHI", formato: "moneda" },
    { clave: "empleador", etiqueta: "Paid by the employer", formato: "moneda" },
    { clave: "pensionEmpleador", etiqueta: "Pension, employer share", formato: "moneda" },
    { clave: "maternidadEmpleador", etiqueta: "Maternity leave, employer share", formato: "moneda" },
    { clave: "medicoEmpleador", etiqueta: "RAMA, employer share", formato: "moneda", ocultarSiCero: true },
  ],
});
