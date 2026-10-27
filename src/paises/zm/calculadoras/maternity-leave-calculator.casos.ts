import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

const LEY = "https://www.mlss.gov.zm/wp-content/uploads/2023/07/The-Employment-Code-Act-No.-3-of-2019.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Baby due 15 December 2026, leave from 4 weeks before",
    origen: { tipo: "recalculado", url: LEY, detalle: "Section 41(1): 14 weeks. Start 17 November 2026, 98 days to 22 February 2027." },
    fecha: "2026-10-26",
    entrada: { parto: "2026-12-15", antes: 4, multiple: false, antiguedad: true },
    esperado: { total: 14, inicio: "2026-11-17", ultimo: "2027-02-22", regreso: "2027-02-23", despues: 10 },
  },
  {
    nombre: "Twins, all leave after the birth",
    origen: { tipo: "recalculado", url: LEY, detalle: "Section 41(2): 14 + 4 = 18 weeks from 15 December 2026, 126 days to 19 April 2027." },
    fecha: "2026-10-26",
    entrada: { parto: "2026-12-15", antes: 0, multiple: true, antiguedad: false },
    esperado: { total: 18, ultimo: "2027-04-19", despues: 18 },
  },
  {
    nombre: "Too many weeks before the birth",
    origen: { tipo: "recalculado", url: LEY, detalle: "At least 6 weeks must follow the birth: 14 − 6 = 8 weeks before at most." },
    fecha: "2026-10-26",
    entrada: { parto: "2026-12-15", antes: 9, multiple: false, antiguedad: true },
    esperaError: true,
  },
]);
