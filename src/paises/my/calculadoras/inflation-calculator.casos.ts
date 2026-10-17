import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

const API = "https://api.data.gov.my/data-catalogue?id=cpi_headline&filter=overall@division";

export default definirCasos(calculadora, [
  {
    nombre: "RM1,000 from January 2015 to October 2026",
    origen: { tipo: "oficial", url: API, detalle: "DOSM CPI overall: January 2015 = 110.6, August 2026 (latest) = 137.5. 1,000 × 137.5 / 110.6 = 1,243.22." },
    fecha: "2026-10-16",
    entrada: { importe: 1000, desde: "2015-01-15", hasta: "2026-10-16" },
    esperado: { actualizado: 1243.22, diferencia: 243.22, indiceInicial: 110.6, indiceFinal: 137.5, periodo: "January 2015 to August 2026" },
  },
  {
    nombre: "RM1,000 from June 2020 to June 2025",
    origen: { tipo: "oficial", url: API, detalle: "June 2020 = 119.1, June 2025 = 134.5. 1,000 × 134.5 / 119.1 = 1,129.30." },
    fecha: "2026-10-16",
    entrada: { importe: 1000, desde: "2020-06-01", hasta: "2025-06-30" },
    esperado: { actualizado: 1129.3, diferencia: 129.3 },
  },
  {
    nombre: "Dates in the wrong order",
    origen: { tipo: "recalculado", detalle: "The second date has to come after the first." },
    fecha: "2026-10-16",
    entrada: { importe: 1000, desde: "2020-06-01", hasta: "2019-06-01" },
    esperaError: true,
  },
]);
