import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

const TABLA = "https://www.cpf.gov.sg/service/sfc/servlet.shepherd/document/download/069IW00000DuRCiYAN";

export default definirCasos(calculadora, [
  {
    nombre: "$5,000 at age 30",
    origen: { tipo: "recalculado", url: TABLA, detalle: "Table 1 from 1 Jan 2026: total 37% of 5,000 = 1,850, employee 20% = 1,000, employer 850. Take-home 4,000." },
    fecha: "2026-10-14",
    entrada: { salario: 5000, residencia: "ciudadano-pr", edad: "55-y-menos" },
    esperado: { neto: 4000, cpfEmpleado: 1000, cpfEmpleador: 850, cpfTotal: 1850, costoEmpresa: 5850 },
  },
  {
    nombre: "$10,000 is capped at the $8,000 ceiling",
    origen: { tipo: "recalculado", url: TABLA, detalle: "OW ceiling 8,000. Employee max 1,600, total max 2,960, employer 1,360. Take-home 8,400." },
    fecha: "2026-10-14",
    entrada: { salario: 10000, residencia: "ciudadano-pr", edad: "55-y-menos" },
    esperado: { neto: 8400, cpfEmpleado: 1600, cpfEmpleador: 1360 },
  },
  {
    nombre: "$6,000 at age 58",
    origen: { tipo: "recalculado", url: TABLA, detalle: "Above 55 to 60: total 34% of 6,000 = 2,040, employee 18% = 1,080, employer 960." },
    fecha: "2026-10-14",
    entrada: { salario: 6000, residencia: "ciudadano-pr", edad: "55-60" },
    esperado: { neto: 4920, cpfEmpleado: 1080, cpfEmpleador: 960 },
  },
  {
    nombre: "$600 in the phase-in band",
    origen: { tipo: "recalculado", url: TABLA, detalle: "Total 17% × 600 + 0.6 × (600 − 500) = 102 + 60 = 162. Employee 0.6 × 100 = 60. Employer 102." },
    fecha: "2026-10-14",
    entrada: { salario: 600, residencia: "ciudadano-pr", edad: "55-y-menos" },
    esperado: { neto: 540, cpfEmpleado: 60, cpfEmpleador: 102 },
  },
  {
    nombre: "Foreigner without CPF",
    origen: { tipo: "recalculado", detalle: "No CPF for foreigners, so take-home equals gross." },
    fecha: "2026-10-14",
    entrada: { salario: 7000, residencia: "extranjero", edad: "55-y-menos" },
    esperado: { neto: 7000, cpfEmpleado: 0, cpfEmpleador: 0 },
  },
]);
