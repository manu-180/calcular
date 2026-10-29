import { aplicarEscalaMarginal, definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.take-home-pay-calculator",
  mercado: "ag",
  concepto: "sueldo-neto",
  slug: "take-home-pay-calculator",
  estado: "borrador",
  requiere: {
    "ag.ss-employee-rate": "mapa",
    "ag.ss-ceiling-monthly": "numero",
    "ag.mbs-employee-rate": "numero",
    "ag.mbs-employee-rate-60": "numero",
    "ag.education-levy-bands": "escala",
  },
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 4000 },
    { id: "sector", tipo: "opcion-dato", etiqueta: "Sector", dato: "ag.ss-employee-rate", porDefecto: "private" },
    {
      id: "edad",
      tipo: "opcion",
      etiqueta: "Your age",
      opciones: [
        { valor: "under60", etiqueta: "16 to 59" },
        { valor: "60to69", etiqueta: "60 to 69" },
      ],
      porDefecto: "under60",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    const base = Math.min(e.bruto, v["ag.ss-ceiling-monthly"]);
    const socialSecurity = redondear(porcentaje(base, enMapa(v["ag.ss-employee-rate"], e.sector)));
    const medical = redondear(porcentaje(e.bruto, e.edad === "under60" ? v["ag.mbs-employee-rate"] : v["ag.mbs-employee-rate-60"]));
    const educationLevy = redondear(aplicarEscalaMarginal(v["ag.education-levy-bands"], e.bruto * 12) / 12);
    const deducciones = redondear(socialSecurity + medical + educationLevy);
    return { neto: redondear(e.bruto - deducciones), socialSecurity, medical, educationLevy, deducciones };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay", formato: "moneda", destacada: true },
    { clave: "socialSecurity", etiqueta: "Social Security", formato: "moneda" },
    { clave: "medical", etiqueta: "Medical Benefits", formato: "moneda" },
    { clave: "educationLevy", etiqueta: "Education Levy", formato: "moneda" },
    { clave: "deducciones", etiqueta: "Total deductions", formato: "moneda" },
  ],
});
