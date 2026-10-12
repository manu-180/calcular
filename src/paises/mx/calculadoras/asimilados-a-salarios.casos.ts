import { definirCasos } from "@/motor/calculo";
import asimilados from "./asimilados-a-salarios";

export default definirCasos(asimilados, [
  {
    nombre: "Quincena de 10,000",
    origen: { tipo: "recalculado", detalle: "Tarifa quincenal 2026 (Anexo 8): 916.20 + (10000 − 8651.41) × 21.36 % = 1204.26. Neto 8795.74." },
    fecha: "2026-10-15",
    entrada: { monto: 10000, periodo: "quincenal" },
    esperado: { isr: 1204.26, neto: 8795.74 },
  },
  {
    nombre: "Mes de 10,000 sin subsidio",
    origen: { tipo: "recalculado", detalle: "Tarifa mensual 2026: 420.95 + (10000 − 7168.52) × 10.88 % = 729.02. Un asalariado restaría 535.65 de subsidio; el asimilado no (decreto DOF 1/05/2024, artículo primero: solo art. 94 primer párrafo y fracción I)." },
    fecha: "2026-10-15",
    entrada: { monto: 10000, periodo: "mensual" },
    esperado: { isr: 729.02, neto: 9270.98 },
  },
  {
    nombre: "Primer renglón de la tarifa mensual",
    origen: { tipo: "recalculado", detalle: "500 × 1.92 % = 9.60." },
    fecha: "2026-10-15",
    entrada: { monto: 500, periodo: "mensual" },
    esperado: { isr: 9.6, neto: 490.4 },
  },
]);
