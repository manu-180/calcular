import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { nomina, REQUIERE_NOMINA } from "../lib/nomina";

export default definirCalculadora({
  id: "rw.net-salary-calculator",
  mercado: "rw",
  concepto: "sueldo-neto",
  slug: "net-salary-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_NOMINA, "rw.medical-employer": "numero" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross salary for the month", min: 0, porDefecto: 300000, ayuda: "Basic salary plus transport, housing and other allowances." },
    { id: "rama", tipo: "si-no", etiqueta: "You are on the RSSB medical scheme (RAMA)", porDefecto: false },
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary for the month", min: 0, porDefecto: 0, visibleSi: { rama: [true] }, ayuda: "RAMA is worked out on basic salary, without allowances." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross salary for the month.", "bruto");
    const basico = e.rama ? (e.basico ?? 0) : 0;
    if (basico > e.bruto) throw new ErrorEntrada("Basic salary cannot be more than gross salary.", "basico");
    const n = nomina(e.bruto, basico, v, redondear);
    const totalDeducido = redondear(e.bruto - n.neto);
    const observaciones: string[] = [];
    if (e.rama && basico === 0) observaciones.push("Enter your basic salary to include the RAMA contribution.");
    return {
      neto: n.neto,
      paye: n.paye,
      pension: n.pension,
      maternidad: n.maternidad,
      medico: n.medico,
      cbhi: n.cbhi,
      totalDeducido,
      netoAnual: n.neto * 12,
      porcentajeNeto: (n.neto / e.bruto) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Net pay for the month", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE", formato: "moneda" },
    { clave: "pension", etiqueta: "RSSB pension", formato: "moneda" },
    { clave: "maternidad", etiqueta: "Maternity leave contribution", formato: "moneda" },
    { clave: "medico", etiqueta: "RAMA medical scheme", formato: "moneda", ocultarSiCero: true },
    { clave: "cbhi", etiqueta: "CBHI (Mutuelle de santé)", formato: "moneda" },
    { clave: "totalDeducido", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Net pay over 12 months", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you take home", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { rama: false } },
});
