import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "£295,000 at the standard rates",
    origen: {
      tipo: "oficial",
      url: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates",
      detalle: "HMRC example: 0% on £125,000, 2% on the next £125,000 = £2,500, 5% on the final £45,000 = £2,250. Total £4,750.",
    },
    fecha: "2026-10-14",
    entrada: { precio: 295000, comprador: "home-mover", noResidente: false },
    esperado: { total: 4750 },
  },
  {
    nombre: "First-time buyer at £500,000",
    origen: {
      tipo: "oficial",
      url: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates",
      detalle: "HMRC example: 0% on the first £300,000 and 5% on the remaining £200,000. Total £10,000.",
    },
    fecha: "2026-10-14",
    entrada: { precio: 500000, comprador: "first-time-buyer", noResidente: false },
    esperado: { total: 10000 },
  },
  {
    nombre: "First-time buyer over the price limit",
    origen: { tipo: "recalculado", detalle: "510,000 is over 500,000, so standard rates: 2,500 + (510,000 − 250,000) × 5% = 13,000. Total 15,500." },
    fecha: "2026-10-14",
    entrada: { precio: 510000, comprador: "first-time-buyer", noResidente: false },
    esperado: { total: 15500 },
  },
  {
    nombre: "Buy-to-let at £300,000",
    origen: { tipo: "recalculado", detalle: "Standard 2,500 + 50,000 × 5% = 2,500, so 5,000. Surcharge 300,000 × 5% = 15,000. Total 20,000." },
    fecha: "2026-10-14",
    entrada: { precio: 300000, comprador: "additional", noResidente: false },
    esperado: { base: 5000, recargoAdicional: 15000, total: 20000 },
  },
  {
    nombre: "Non-UK resident home mover at £400,000",
    origen: { tipo: "recalculado", detalle: "Standard 2,500 + 150,000 × 5% = 7,500, so 10,000. Non-resident 400,000 × 2% = 8,000. Total 18,000." },
    fecha: "2026-10-14",
    entrada: { precio: 400000, comprador: "home-mover", noResidente: true },
    esperado: { base: 10000, recargoNoResidente: 8000, total: 18000 },
  },
  {
    nombre: "£2,000,000 at the standard rates",
    origen: {
      tipo: "recalculado",
      detalle: "2,500 + 675,000 × 5% = 33,750 + 575,000 × 10% = 57,500 + 500,000 × 12% = 60,000. Total 153,750.",
    },
    fecha: "2026-10-14",
    entrada: { precio: 2000000, comprador: "home-mover", noResidente: false },
    esperado: { total: 153750 },
  },
]);
