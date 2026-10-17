import { definirCasos } from "@/motor/calculo";
import calculadora from "./cpf-allocation";

const ASIGNACION = "https://www.cpf.gov.sg/service/sfc/servlet.shepherd/document/download/069IW000005qFrJYAU";

export default definirCasos(calculadora, [
  {
    nombre: "CPF Board example 1: $100 at age 30",
    origen: { tipo: "oficial", url: ASIGNACION, detalle: "MA 100 × 0.2162 = 21.62, SA 100 × 0.1621 = 16.21, OA 100 − 21.62 − 16.21 = 62.17." },
    fecha: "2026-10-14",
    entrada: { modo: "aporte", monto: 100, edad: "35-y-menos" },
    esperado: { medisave: 21.62, especial: 16.21, ordinaria: 62.17, retiro: null },
  },
  {
    nombre: "CPF Board example 2: $100 at age 57",
    origen: { tipo: "oficial", url: ASIGNACION, detalle: "MA 30.88, RA 33.82, OA 35.30." },
    fecha: "2026-10-14",
    entrada: { modo: "aporte", monto: 100, edad: "55-60" },
    esperado: { medisave: 30.88, retiro: 33.82, ordinaria: 35.3, especial: null },
  },
  {
    nombre: "$5,000 salary at age 40",
    origen: { tipo: "recalculado", detalle: "CPF total 37% × 5,000 = 1,850. MA 1,850 × 0.2432 = 449.92, SA 1,850 × 0.1891 = 349.835 → 349.84, OA 1,850 − 449.92 − 349.84 = 1,050.24." },
    fecha: "2026-10-14",
    entrada: { modo: "salario", monto: 5000, edad: "35-45" },
    esperado: { aporte: 1850, medisave: 449.92, especial: 349.84, ordinaria: 1050.24 },
  },
]);
