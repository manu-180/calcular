import { definirCasos } from "@/motor/calculo";
import calculadora from "./long-service-payment";

const GUIA = "https://www.labour.gov.hk/eng/public/wcp/ConciseGuide/EO_guide_full.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Labour Department appendix 2, example 2: 8 years across 1 May 2025",
    origen: {
      tipo: "oficial",
      url: GUIA,
      detalle: "Pre-transition 15,000 x 2/3 x 3 = 30,000; post-transition 18,000 x 2/3 x 5 = 60,000. MPF 80,000 offsets 30,000. Employee's aggregate benefits 90,000 + 50,000 = 140,000.",
    },
    fecha: "2026-10-16",
    entrada: { pago: "monthly", salarioFinal: 18000, aniosDespues: 5, aniosAntes: 3, salarioTransicion: 15000, mpfEmpleador: 80000, otrosCompensables: 0 },
    esperado: { bruto: 90000, aPagar: 60000, mpfRetenido: 50000 },
  },
  {
    nombre: "Gratuity offsets both parts",
    origen: {
      tipo: "recalculado",
      detalle: "Pre 20,000 x 2/3 x 4 = 53,333.33; post 21,000 x 2/3 x 2 = 28,000. MPF 40,000 offsets pre; gratuity 20,000 offsets the remaining 13,333.33 of pre and 6,666.67 of post. Pays 21,333.33.",
    },
    fecha: "2026-10-16",
    entrada: { pago: "monthly", salarioFinal: 21000, aniosDespues: 2, aniosAntes: 4, salarioTransicion: 20000, mpfEmpleador: 40000, otrosCompensables: 20000 },
    esperado: { antes: 53333.33, despues: 28000, compensado: 60000, aPagar: 21333.33, mpfRetenido: 0 },
  },
  {
    nombre: "Less than 5 years: not eligible",
    origen: { tipo: "oficial", url: GUIA, detalle: "Qualifying period: not less than 5 years." },
    fecha: "2026-10-16",
    entrada: { pago: "monthly", salarioFinal: 18000, aniosDespues: 1.5, aniosAntes: 3, salarioTransicion: 15000, mpfEmpleador: 0, otrosCompensables: 0 },
    esperado: { aPagar: 0 },
  },
  {
    nombre: "Missing wages before 1 May 2025 is not valid",
    origen: { tipo: "recalculado", detalle: "Years before the transition date need the wages before it." },
    fecha: "2026-10-16",
    entrada: { pago: "monthly", salarioFinal: 18000, aniosDespues: 2, aniosAntes: 4, salarioTransicion: 0, mpfEmpleador: 0, otrosCompensables: 0 },
    esperaError: true,
  },
]);
