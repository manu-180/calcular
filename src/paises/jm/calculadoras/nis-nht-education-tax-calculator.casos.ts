import { definirCasos } from "@/motor/calculo";
import calculadora from "./nis-nht-education-tax-calculator";

const TAJ_PAYROLL =
  "https://www.jamaicatax.gov.jm/documents/10194/105112/Pay+Roll+Taxes+and+Contribution+Rates-Employer+and+Employees_Dec2025.pdf/1d5554a1-b0e6-13bd-d16b-073c8216b753";

export default definirCasos(calculadora, [
  {
    nombre: "TAJ scenario 2: J$480,000 with a J$19,200 pension contribution",
    origen: { tipo: "oficial", url: TAJ_PAYROLL, detalle: "NIS 12,500 (ceiling), statutory income 448,300, Education Tax 10,086.75, NHT 9,600." },
    fecha: "2026-10-24",
    entrada: { bruto: 480000, pension: 19200 },
    esperado: { nisEmpleado: 12500, nhtEmpleado: 9600, edEmpleado: 10086.75, ingresoEstatutario: 448300 },
  },
  {
    nombre: "J$250,000 a month",
    origen: {
      tipo: "recalculado",
      detalle: "Employee: NIS 7,500, NHT 5,000, Education Tax 2.25% of 242,500 = 5,456.25. Employer: NIS 7,500, NHT 7,500, Education Tax 3.5% of 242,500 = 8,487.50.",
    },
    fecha: "2026-10-24",
    entrada: { bruto: 250000, pension: 0 },
    esperado: { totalEmpleado: 17956.25, totalEmpleador: 23487.5, edEmpleador: 8487.5, total: 41443.75 },
  },
  {
    nombre: "Pension larger than pay",
    origen: { tipo: "recalculado", detalle: "Rejected." },
    fecha: "2026-10-24",
    entrada: { bruto: 100000, pension: 150000 },
    esperaError: true,
  },
]);
