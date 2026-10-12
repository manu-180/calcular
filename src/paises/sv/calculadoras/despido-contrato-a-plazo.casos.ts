import { definirCasos } from "@/motor/calculo";
import despido from "./despido-contrato-a-plazo";

export default definirCasos(despido, [
  {
    nombre: "Contrato de un año cortado a los ocho meses",
    origen: {
      tipo: "recalculado",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/1970-1979/1972/07/886E0.PDF",
      detalle:
        "Art. 59. Del 1/1 al 31/8/2026 (243 días); vencía el 31/12: faltaban 122 días × 20 = 2.440. Máximo del art. 58: 30 × 243 / 365 = 19,97 días × 20 = 399,45. Le corresponden 399,45.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 600, inicio: "2026-01-01", fin: "2026-08-31", vencimiento: "2026-12-31", region: "comercio-servicios" },
    esperado: { diasFaltantes: 122, porPlazo: 2440, maximo: 399.45, indemnizacion: 399.45 },
  },
  {
    nombre: "Faltaban diez días de un contrato largo",
    origen: { tipo: "recalculado", detalle: "Del 1/1/2025 al 21/12/2026, vencía el 31/12/2026: 10 días × 20 = 200, menos que el máximo del art. 58." },
    fecha: "2026-10-12",
    entrada: { salario: 600, inicio: "2025-01-01", fin: "2026-12-21", vencimiento: "2026-12-31", region: "comercio-servicios" },
    esperado: { diasFaltantes: 10, porPlazo: 200, indemnizacion: 200 },
  },
  {
    nombre: "Vencimiento anterior al despido",
    origen: { tipo: "recalculado", detalle: "Entrada imposible: tiene que dar error." },
    fecha: "2026-10-12",
    entrada: { salario: 600, inicio: "2026-01-01", fin: "2026-08-31", vencimiento: "2026-08-01", region: "comercio-servicios" },
    esperaError: true,
  },
]);
