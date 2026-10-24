import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.net-salary-calculator",
  mercado: "ug",
  concepto: "sueldo-neto",
  slug: "net-salary-calculator",
  estado: "publicado",
  requiere: {
    "ug.paye-bands": "escala",
    "ug.paye-bands-non-resident": "escala",
    "ug.nssf-employee": "numero",
    "ug.nssf-employer": "numero",
  },
  campos: [
    { id: "mensual", tipo: "moneda", etiqueta: "Monthly gross pay", min: 0, porDefecto: 1500000, ayuda: "Salary plus allowances and other payments for the month." },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "Tax residence",
      opciones: [
        { valor: "resident", etiqueta: "Resident in Uganda" },
        { valor: "non-resident", etiqueta: "Non-resident" },
      ],
      porDefecto: "resident",
    },
    { id: "nssf", tipo: "si-no", etiqueta: "You contribute to NSSF", porDefecto: true, ayuda: "Most private sector employees do. Government pensionable staff do not." },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual <= 0) throw new ErrorEntrada("Enter your monthly gross pay.", "mensual");
    const escala = e.residencia === "resident" ? v["ug.paye-bands"] : v["ug.paye-bands-non-resident"];
    const paye = redondear(aplicarEscalaMarginal(escala, e.mensual));
    const nssf = e.nssf ? redondear(porcentaje(e.mensual, v["ug.nssf-employee"])) : 0;
    const empleador = e.nssf ? redondear(porcentaje(e.mensual, v["ug.nssf-employer"])) : 0;
    const neto = redondear(e.mensual - paye - nssf);
    return {
      neto,
      paye,
      nssf,
      anual: redondear(neto * 12),
      deducciones: redondear(paye + nssf),
      empleador,
      observaciones: ["Local service tax is not included. Employers deduct it in four instalments from July to October."],
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay a month", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE", formato: "moneda" },
    { clave: "nssf", etiqueta: "NSSF deducted from you", formato: "moneda" },
    { clave: "deducciones", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "anual", etiqueta: "Take-home pay a year", formato: "moneda" },
    { clave: "empleador", etiqueta: "NSSF your employer adds on top", formato: "moneda", ocultarSiCero: true },
  ],
});
