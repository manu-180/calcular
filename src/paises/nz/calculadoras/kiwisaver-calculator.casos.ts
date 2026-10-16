import { definirCasos } from "@/motor/calculo";
import calculadora from "./kiwisaver-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "$60,000 at 3.5%",
    origen: {
      tipo: "recalculado",
      detalle: "You 2,100. Employer 3.5% = 2,100; ESCT on 60,000 + 2,100 = 62,100 is 17.5% = 367.50, net 1,732.50. Government 25% of 2,100 = 525, capped at 260.72. Total 4,093.22.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 60000, tasa: "3.5", edad: 30 },
    esperado: { empleado: 2100, empleadorBruto: 2100, tasaEsct: 17.5, esct: 367.5, empleadorNeto: 1732.5, gobierno: 260.72, total: 4093.22 },
  },
  {
    nombre: "$200,000 at 4% gets no government contribution",
    origen: { tipo: "recalculado", detalle: "You 8,000. Employer 7,000; ESCT on 207,000 is 33% = 2,310, net 4,690. Over 180,000: no government contribution. Total 12,690." },
    fecha: "2026-10-14",
    entrada: { salario: 200000, tasa: "4", edad: 45 },
    esperado: { empleado: 8000, tasaEsct: 33, esct: 2310, gobierno: 0, total: 12690 },
  },
  {
    nombre: "$20,000 on the 3% temporary rate reduction",
    origen: { tipo: "recalculado", detalle: "You 600. Employer 3% = 600; ESCT on 20,600 is 17.5% = 105, net 495. Government 25% × 600 = 150. Total 1,245." },
    fecha: "2026-10-14",
    entrada: { salario: 20000, tasa: "3", edad: 22 },
    esperado: { empleadorBruto: 600, esct: 105, gobierno: 150, total: 1245 },
  },
  {
    nombre: "Aged 66: no government contribution",
    origen: { tipo: "recalculado", detalle: "Same as the first case without the 260.72: 2,100 + 1,732.50 = 3,832.50." },
    fecha: "2026-10-14",
    entrada: { salario: 60000, tasa: "3.5", edad: 66 },
    esperado: { gobierno: 0, total: 3832.5 },
  },
  {
    nombre: "Employer rate rises to 4% from 1 April 2028",
    origen: { tipo: "recalculado", detalle: "April 2028: employer 4% of 60,000 = 2,400; ESCT on 62,400 is 17.5% = 420; net 1,980." },
    fecha: "2028-04-15",
    entrada: { salario: 60000, tasa: "4", edad: 30 },
    esperado: { empleadorBruto: 2400, esct: 420, empleadorNeto: 1980 },
  },
  {
    nombre: "No salary",
    origen: { tipo: "recalculado", detalle: "Salary of 0 is not valid." },
    fecha: "2026-10-14",
    entrada: { salario: 0, tasa: "3.5", edad: 30 },
    esperaError: true,
  },
]);
