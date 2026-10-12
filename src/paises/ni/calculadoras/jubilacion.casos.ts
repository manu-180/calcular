import { definirCasos } from "@/motor/calculo";
import jubilacion from "./jubilacion";

export default definirCasos(jubilacion, [
  {
    nombre: "Justo 750 semanas con C$20,000 de promedio",
    origen: {
      tipo: "recalculado",
      detalle: "Reglamento de la Ley de Seguridad Social, art. 85 reformado por el Decreto 06-2019: 0.20 + 0.01 por cada 52 semanas sobre las primeras 150. (750 − 150) / 52 = 11 bloques: tasa 0.31. 20000 × 0.31 = 6200.",
    },
    fecha: "2026-10-12",
    entrada: { semanas: 750, salario: 20000, edad: 60, conyuge: false, dependientes: 0 },
    esperado: { tasa: 31, pension: 6200, asignaciones: 0, total: 6200, faltan: 0 },
  },
  {
    nombre: "1,500 semanas con esposa inválida y un hijo",
    origen: {
      tipo: "recalculado",
      detalle: "(1500 − 150) / 52 = 25 bloques: tasa 0.45. 30000 × 0.45 = 13500. Asignaciones 13.5 % + 9 % = 22.5 %: 3037.50. Total 16537.50, debajo del tope.",
    },
    fecha: "2026-10-12",
    entrada: { semanas: 1500, salario: 30000, edad: 62, conyuge: true, dependientes: 1 },
    esperado: { tasa: 45, pension: 13500, asignaciones: 3037.5, total: 16537.5 },
  },
  {
    nombre: "Pensión alta topeada en 1,500 dólares",
    origen: {
      tipo: "recalculado",
      detalle: "2800 semanas: 50 bloques, tasa 0.70 (máximo). 100000 × 0.70 = 70000. Tope: 1500 × 36.6243 (tipo de cambio oficial del 12/10/2026) = 54936.45.",
    },
    fecha: "2026-10-12",
    entrada: { semanas: 2800, salario: 100000, edad: 65, conyuge: false, dependientes: 0 },
    esperado: { tasa: 70, pension: 70000, total: 54936.45 },
  },
  {
    nombre: "400 semanas: sin pensión completa",
    origen: { tipo: "recalculado", detalle: "Art. 55: hacen falta 750 semanas. Faltan 350; con 250 o más corresponde la pensión reducida del art. 56." },
    fecha: "2026-10-12",
    entrada: { semanas: 400, salario: 15000, edad: 60, conyuge: false, dependientes: 0 },
    esperado: { faltan: 350, total: 0 },
  },
]);
