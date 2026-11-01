import { definirCasos } from "@/motor/calculo";
import calculadora from "./dollar-to-ngultrum";

const RMA = "https://www.rma.org.bt/media/Publication/Macro-economic%20Data/Monthly%20Statistical%20Bulletin%20October%202026.xlsx" as const;

export default definirCasos(calculadora, [
  {
    nombre: "US$100 at the end of August 2026",
    origen: { tipo: "recalculado", url: RMA, detalle: "Table Exchange Rates, holding rate: 95.38. 100 × 95.38 = 9,538." },
    fecha: "2026-10-31",
    entrada: { monto: 100, sentido: "usd" },
    esperado: { ngultrum: 9538, tasa: 95.38, fecha: "2026-08-31" },
  },
  {
    nombre: "Nu. 10,000 to dollars",
    origen: { tipo: "recalculado", detalle: "10,000 / 95.38 = 104.84." },
    fecha: "2026-10-31",
    entrada: { monto: 10000, sentido: "btn" },
    esperado: { dolares: 104.84 },
  },
]);
