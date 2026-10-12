import { definirCasos } from "@/motor/calculo";
import pensionIps from "./pension-ips";

const L2263 = "https://www.bacn.gov.py/leyes-paraguayas/4932/ley-n-2263-modifica-parcialmente-la-ley-n-98-92" as const;

export default definirCasos(pensionIps, [
  {
    nombre: "Jubilado con esposa y dos hijos",
    origen: { tipo: "recalculado", url: L2263, detalle: "Art. 62: 60 % de 5.000.000 = 3.000.000. Mitad para la esposa (1.500.000) y la otra mitad para los dos hijos por partes iguales (750.000 cada uno)." },
    fecha: "2026-10-12",
    entrada: { semanas: 1300, accidente: false, jubilacion: 5000000, conyuge: true, hijos: 2 },
    esperado: { pension: 3000000, parteConyuge: 1500000, partePorHijo: 750000, subsidio: null },
  },
  {
    nombre: "Solo hijos",
    origen: { tipo: "recalculado", url: L2263, detalle: "Art. 62 c: los hijos huérfanos se reparten toda la pensión. 60 % de 3.500.000 = 2.100.000; tres hijos, 700.000 cada uno." },
    fecha: "2026-10-12",
    entrada: { semanas: 800, accidente: false, jubilacion: 3500000, conyuge: false, hijos: 3 },
    esperado: { pension: 2100000, parteConyuge: null, partePorHijo: 700000 },
  },
  {
    nombre: "Menos de 750 semanas: subsidio único",
    origen: {
      tipo: "recalculado",
      url: "https://www.bacn.gov.py/leyes-paraguayas/4394/ley-n-98-establece-el-regimen-unificado-de-jubilaciones-y-pensiones",
      detalle: "Art. 65: con menos de 750 semanas, un salario mínimo por año de antigüedad. 420 semanas / 50 = 8 años; 8 × 3.044.000 = 24.352.000.",
    },
    fecha: "2026-10-12",
    entrada: { semanas: 420, accidente: false, jubilacion: null, conyuge: true, hijos: 1 },
    esperado: { pension: null, subsidio: 24352000 },
  },
  {
    nombre: "Falta la jubilación",
    origen: { tipo: "recalculado", detalle: "Con 900 semanas corresponde pensión y hace falta el monto de la jubilación." },
    fecha: "2026-10-12",
    entrada: { semanas: 900, accidente: false, jubilacion: null, conyuge: true, hijos: 0 },
    esperaError: true,
  },
]);
