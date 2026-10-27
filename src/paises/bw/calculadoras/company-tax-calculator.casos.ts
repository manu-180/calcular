import { definirCasos } from "@/motor/calculo";
import calculadora from "./company-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "P1 000 000 taxable income, general rate",
    origen: { tipo: "recalculado", detalle: "Schedule 1, paragraph 3 (d) of the Income Tax Act, 2026: 24.5% × 1 000 000 = 245 000." },
    fecha: "2026-10-27",
    entrada: { gravable: 1000000, tipo: "general", reparto: 0 },
    esperado: { impuesto: 245000, despues: 755000, tasa: 24.5 },
  },
  {
    nombre: "Half the profit paid out to resident shareholders",
    origen: { tipo: "recalculado", detalle: "Tax 245 000, after tax 755 000. Dividends 377 500, withholding 10% = 37 750, net 339 750." },
    fecha: "2026-10-27",
    entrada: { gravable: 1000000, tipo: "general", reparto: 50 },
    esperado: { dividendos: 377500, retencion: 37750, netoAccionistas: 339750 },
  },
  {
    nombre: "IFSC company on approved financial operations",
    origen: { tipo: "recalculado", detalle: "Paragraph 3 (b) (i): 15% × 2 000 000 = 300 000." },
    fecha: "2026-10-27",
    entrada: { gravable: 2000000, tipo: "ifsc", reparto: 0 },
    esperado: { impuesto: 300000 },
  },
  {
    nombre: "Mutual association",
    origen: { tipo: "recalculado", detalle: "Paragraph 3 (c): 5% × 400 000 = 20 000." },
    fecha: "2026-10-27",
    entrada: { gravable: 400000, tipo: "mutual", reparto: 0 },
    esperado: { impuesto: 20000 },
  },
  {
    nombre: "Zero income",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { gravable: 0, tipo: "general", reparto: 0 },
    esperaError: true,
  },
]);
