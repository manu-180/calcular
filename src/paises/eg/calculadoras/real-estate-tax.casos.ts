import { definirCasos } from "@/motor/calculo";
import calculadora from "./real-estate-tax";

export default definirCasos(calculadora, [
  {
    nombre: "شقة بثلاثة ملايين جنيه",
    origen: { tipo: "recalculado", detalle: "2.5% × 3,000,000 = 75,000." },
    fecha: "2026-10-24",
    entrada: { precio: 3000000, parte: 100 },
    esperado: { impuesto: 75000, neto: 2925000 },
  },
  {
    nombre: "نصف عقار بمليوني جنيه",
    origen: { tipo: "recalculado", detalle: "حصة البائع 50% من 2,000,000 = 1,000,000. الضريبة 2.5% = 25,000." },
    fecha: "2026-10-24",
    entrada: { precio: 2000000, parte: 50 },
    esperado: { impuesto: 25000, base: 1000000 },
  },
]);
