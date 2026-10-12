import { definirCasos } from "@/motor/calculo";
import impuestoBienesInmuebles from "./impuesto-bienes-inmuebles";

export default definirCasos(impuestoBienesInmuebles, [
  {
    nombre: "Inmueble de ₡50.000.000",
    origen: { tipo: "recalculado", detalle: "Ley 7509, art. 23: 0,25 % de 50.000.000 = 125.000 al año; 31.250 por trimestre." },
    fecha: "2026-10-12",
    entrada: { valor: 50000000, exento: null },
    esperado: { anual: 125000, trimestral: 31250 },
  },
  {
    nombre: "Bien único con monto exento",
    origen: { tipo: "recalculado", detalle: "Art. 4 e: se paga sobre el exceso. 30.000.000 − 20.000.000 = 10.000.000 × 0,25 % = 25.000." },
    fecha: "2026-10-12",
    entrada: { valor: 30000000, exento: 20000000 },
    esperado: { base: 10000000, anual: 25000, trimestral: 6250 },
  },
]);
