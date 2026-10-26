import { definirCasos } from "@/motor/calculo";
import calculadora from "./gross-from-net";

export default definirCasos(calculadora, [
  {
    nombre: "صافي 8,307.50 جنيه",
    origen: { tipo: "recalculado", detalle: "عكس حاسبة صافي المرتب: إجمالي 10,000 يعطي صافيًا 8,307.50 (تأمينات 1,100 وضريبة 592.50)." },
    fecha: "2026-10-24",
    entrada: { neto: 8307.5 },
    esperado: { bruto: 10000, aporte: 1100, impuesto: 592.5, costoEmpleador: 11875 },
    // El ingreso anual se redondea a la decena inferior, así que varios brutos a centavos de distancia dan el mismo neto.
    tolerancia: 0.5,
  },
  {
    nombre: "صافي 23,472.27 جنيه",
    origen: { tipo: "recalculado", detalle: "إجمالي 30,000 يعطي صافيًا 23,472.27 (تأمينات 1,837 على الحد الأقصى وضريبة 4,690.73)." },
    fecha: "2026-10-24",
    entrada: { neto: 23472.27 },
    esperado: { bruto: 30000, netoObtenido: 23472.27 },
    tolerancia: 0.02,
  },
]);
