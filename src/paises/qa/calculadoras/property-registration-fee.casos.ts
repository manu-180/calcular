import { definirCasos } from "@/motor/calculo";
import calculadora from "./property-registration-fee";

export default definirCasos(calculadora, [
  {
    nombre: "Sale of a QAR 2.5 million property",
    origen: { tipo: "recalculado", detalle: "Decision 5/2026, table 2, item 1: 0.25% × 2,500,000 = 6,250." },
    fecha: "2026-10-26",
    entrada: { operacion: "venta", valor: 2500000, inmuebles: null },
    esperado: { tasaRegistro: 6250, tasa: 0.25 },
  },
  {
    nombre: "Mortgage of QAR 1.6 million",
    origen: { tipo: "recalculado", detalle: "Item 16: a quarter per thousand of the secured debt. 0.025% × 1,600,000 = 400." },
    fecha: "2026-10-26",
    entrada: { operacion: "hipoteca", valor: 1600000, inmuebles: null },
    esperado: { tasaRegistro: 400 },
  },
  {
    nombre: "Gift to a son",
    origen: { tipo: "recalculado", detalle: "Item 4: QAR 500 for parents, children or spouse." },
    fecha: "2026-10-26",
    entrada: { operacion: "donacionFamilia", valor: null, inmuebles: null },
    esperado: { tasaRegistro: 500, tasa: 0 },
  },
  {
    nombre: "Inheritance of three properties",
    origen: { tipo: "recalculado", detalle: "Item 5: QAR 500 per property × 3 = 1,500." },
    fecha: "2026-10-26",
    entrada: { operacion: "herencia", valor: null, inmuebles: 3 },
    esperado: { tasaRegistro: 1500 },
  },
  {
    nombre: "Gift to a friend",
    origen: { tipo: "recalculado", detalle: "Item 4: 0.25% × 800,000 = 2,000." },
    fecha: "2026-10-26",
    entrada: { operacion: "donacionOtros", valor: 800000, inmuebles: null },
    esperado: { tasaRegistro: 2000 },
  },
]);
