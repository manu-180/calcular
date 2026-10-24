import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.net-salary-calculator",
  mercado: "ug",
  concepto: "sueldo-neto",
  slug: "net-salary-calculator",
  estado: "borrador",
  requiere: {
    "ug.paye-bands": "escala",
    "ug.nssf-employee": "numero",
  },
  campos: [{ id: "mensual", tipo: "moneda", etiqueta: "Monthly gross pay", min: 0, porDefecto: 1500000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.mensual <= 0) throw new ErrorEntrada("Enter your monthly pay.", "mensual");
    const paye = redondear(aplicarEscalaMarginal(v["ug.paye-bands"], entrada.mensual * 12) / 12);
    const nssf = redondear(porcentaje(entrada.mensual, v["ug.nssf-employee"]));
    return { neto: redondear(entrada.mensual - paye - nssf), paye, nssf };
  },
  resultado: [
    { clave: "neto", etiqueta: "Net pay a month", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE", formato: "moneda" },
    { clave: "nssf", etiqueta: "NSSF (your 5%)", formato: "moneda" },
  ],
});
