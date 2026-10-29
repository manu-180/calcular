import { definirCasos } from "@/motor/calculo";
import calculadora from "./thirteenth-month-pay-calculator";

const ORIGEN = "https://www.employment.gov.sc/e-library/acts-and-regulations/employment-acts-and-regulations/employment-amendment-act-2016-act-24-of-2016-on-13th-month-pay/download";

export default definirCasos(calculadora, [
  {
    nombre: "Full year on SCR 25,000",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Section 46C(4): equal to the monthly salary excluding allowances. The full year gives 25,000." },
    fecha: "2026-10-29",
    entrada: { basico: 25000, meses: 12, seychellois: true },
    esperado: { pago: 25000, limite: 45450 },
  },
  {
    nombre: "Six months of service",
    origen: { tipo: "oficial", url: "https://www.employment.gov.sc/e-library/acts-and-regulations/employment-acts-and-regulations/1-1-7-act-19-2023-employment-amendment-act-2023/download", detalle: "Section 46C(6) as amended in 2023: pro rata to the period of service. 25,000 × 6 ÷ 12 = 12,500." },
    fecha: "2026-10-29",
    entrada: { basico: 25000, meses: 6, seychellois: true },
    esperado: { pago: 12500 },
  },
  {
    nombre: "Basic salary above SCR 45,450",
    origen: { tipo: "oficial", url: "https://www.employment.gov.sc/e-library/acts-and-regulations/employment-acts-and-regulations/si-3-of-2017-employment-thirteenth-month-pay-fixing-of-eligibility-limit-regulations-2017/download", detalle: "S.I. 3 of 2017: a basic salary above SCR 45,450 is not eligible." },
    fecha: "2026-10-29",
    entrada: { basico: 50000, meses: 12, seychellois: true },
    esperado: { pago: 0 },
  },
  {
    nombre: "Non-Seychellois worker",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Section 46C(8)(a) excludes non-Seychellois workers." },
    fecha: "2026-10-29",
    entrada: { basico: 20000, meses: 12, seychellois: false },
    esperado: { pago: 0 },
  },
]);
