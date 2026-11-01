import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

const NOT = "https://www.drc.gov.bt/wp-content/uploads/2025/12/Public-Notification-on-new-Income-Tax-Act.docx-1.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Service fee to a resident",
    origen: { tipo: "recalculado", url: NOT, detalle: "Part 2: 2% for residents." },
    fecha: "2026-10-31",
    entrada: { tipo: "contract-resident", monto: 100000 },
    esperado: { retenido: 2000, tasa: 2, neto: 98000 },
  },
  {
    nombre: "Service fee to a non-resident",
    origen: { tipo: "recalculado", url: NOT, detalle: "Part 2: 5% for non-residents." },
    fecha: "2026-10-31",
    entrada: { tipo: "contract-non-resident", monto: 100000 },
    esperado: { retenido: 5000, tasa: 5 },
  },
  {
    nombre: "Rent of Nu. 20,000",
    origen: { tipo: "recalculado", url: NOT, detalle: "Part 2: 5%." },
    fecha: "2026-10-31",
    entrada: { tipo: "rent", monto: 20000 },
    esperado: { retenido: 1000, neto: 19000 },
  },
  {
    nombre: "Lottery win of Nu. 50,000",
    origen: { tipo: "recalculado", url: NOT, detalle: "Part 2: 20%." },
    fecha: "2026-10-31",
    entrada: { tipo: "lottery", monto: 50000 },
    esperado: { retenido: 10000, tasa: 20 },
  },
]);
