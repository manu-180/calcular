import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty-calculator";

const TASAS = "https://www.ird.gov.tt/news/stamp-duty-rates";
const FAQ = "https://www.ird.gov.tt/stamp-duty/FAQs";

export default definirCasos(calculadora, [
  {
    nombre: "House for TT$1,500,000",
    origen: { tipo: "oficial", url: TASAS, detalle: "First 850,000 exempt. 3% of the next 400,000 = 12,000. 5% of the remaining 250,000 = 12,500. Total 24,500." },
    fecha: "2026-10-27",
    entrada: { valor: 1500000, tipo: "house", primeraVivienda: false },
    esperado: { duty: 24500, exento: 850000 },
  },
  {
    nombre: "First home for TT$1,500,000",
    origen: { tipo: "oficial", url: FAQ, detalle: "First-time homeowners are exempt up to a maximum of $1,500,000." },
    fecha: "2026-10-27",
    entrada: { valor: 1500000, tipo: "house", primeraVivienda: true },
    esperado: { duty: 0, exento: 1500000 },
  },
  {
    nombre: "First home for TT$2,000,000",
    origen: { tipo: "recalculado", detalle: "Value above 1,500,000 pays the rate of its band: 250,000 at 5% = 12,500 and 250,000 at 7.5% = 18,750. Total 31,250." },
    fecha: "2026-10-27",
    entrada: { valor: 2000000, tipo: "house", primeraVivienda: true },
    esperado: { duty: 31250 },
  },
  {
    nombre: "House for TT$2,000,000",
    origen: { tipo: "oficial", url: TASAS, detalle: "12,000 + 25,000 + 7.5% of 250,000 (18,750) = 55,750." },
    fecha: "2026-10-27",
    entrada: { valor: 2000000, tipo: "house", primeraVivienda: false },
    esperado: { duty: 55750 },
  },
  {
    nombre: "Residential land for TT$900,000",
    origen: { tipo: "oficial", url: TASAS, detalle: "450,000 exempt. 2% of 200,000 = 4,000. 5% of 200,000 = 10,000. 7% of 50,000 = 3,500. Total 17,500." },
    fecha: "2026-10-27",
    entrada: { valor: 900000, tipo: "land", primeraVivienda: null },
    esperado: { duty: 17500, exento: 450000 },
  },
  {
    nombre: "House for TT$800,000",
    origen: { tipo: "oficial", url: TASAS, detalle: "Residential property valued at $850,000 or less is exempt." },
    fecha: "2026-10-27",
    entrada: { valor: 800000, tipo: "house", primeraVivienda: false },
    esperado: { duty: 0, exento: 800000 },
  },
]);
