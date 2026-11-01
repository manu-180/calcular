import { definirCasos } from "@/motor/calculo";
import calculadora from "./local-service-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "KCCA example: Ushs 420,000 on gross pay",
    origen: {
      tipo: "oficial",
      url: "https://kcca.go.ug/uDocs/Local_Service_Tax_FAQs.pdf",
      detalle: "KCCA Table 2: monthly salary 420,000, LST payable 30,000 (band above 400,000 up to 500,000).",
    },
    fecha: "2026-10-24",
    entrada: { mensual: 420000, base: "gross" },
    esperado: { anual: 30000, cuota: 7500, base: 420000 },
  },
  {
    nombre: "Ushs 420,000 after PAYE",
    origen: { tipo: "recalculado", detalle: "PAYE 15,000 + 25% × 10,000 = 17,500. Take-home 402,500, band above 400,000: 30,000." },
    fecha: "2026-10-24",
    entrada: { mensual: 420000, base: "after-paye" },
    esperado: { anual: 30000, base: 402500 },
  },
  {
    nombre: "Ushs 410,000: the band depends on the base",
    origen: { tipo: "recalculado", detalle: "After PAYE of 15,000 the pay is 395,000, band above 300,000 up to 400,000: 20,000. On gross 410,000 the band is 30,000." },
    fecha: "2026-10-24",
    entrada: { mensual: 410000, base: "after-paye" },
    esperado: { anual: 20000, cuota: 5000 },
  },
  {
    nombre: "Ushs 410,000 on gross pay",
    origen: { tipo: "recalculado", detalle: "410,000 is above 400,000 and not above 500,000: 30,000." },
    fecha: "2026-10-24",
    entrada: { mensual: 410000, base: "gross" },
    esperado: { anual: 30000 },
  },
  {
    nombre: "Ushs 1,500,000",
    origen: { tipo: "recalculado", detalle: "After PAYE 1,161,750, above 1,000,000: 100,000; 25,000 per instalment." },
    fecha: "2026-10-24",
    entrada: { mensual: 1500000, base: "after-paye" },
    esperado: { anual: 100000, cuota: 25000 },
  },
  {
    nombre: "Exactly Ushs 100,000",
    origen: { tipo: "recalculado", detalle: "The first band starts above 100,000, so nothing is due." },
    fecha: "2026-10-24",
    entrada: { mensual: 100000, base: "gross" },
    esperado: { anual: 0 },
  },
]);
