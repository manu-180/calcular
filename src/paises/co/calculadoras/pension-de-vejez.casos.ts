import { definirCasos } from "@/motor/calculo";
import pension from "./pension-de-vejez";

export default definirCasos(pension, [
  {
    nombre: "Hombre con 1.500 semanas e IBL de 3 millones",
    origen: {
      tipo: "recalculado",
      detalle:
        "Ley 100 art. 34: s = 3.000.000 / 1.750.905 = 1,7134; r = 65,5 − 0,5 × 1,7134 = 64,643 %. 200 semanas sobre 1.300 = 4 bloques × 1,5 % = 6 %. Total 70,643 % de 3.000.000 = 2.119.299.",
    },
    fecha: "2026-10-15",
    entrada: { sexo: "hombres", edad: 62, semanas: 1500, ibl: 3000000 },
    esperado: { requisitos: "Sí, cumples edad y semanas", semanasMinimas: 1300, pension: 2119299 },
  },
  {
    nombre: "Mujer en 2026 con 1.260 semanas",
    origen: {
      tipo: "recalculado",
      detalle: "Sentencia C-197 de 2023: en 2026 las mujeres necesitan 1.250 semanas. r = 64,93 % de 2.000.000 = 1.298.577, menos que el mínimo: pensión 1.750.905.",
    },
    fecha: "2026-10-15",
    entrada: { sexo: "mujeres", edad: 57, semanas: 1260, ibl: 2000000 },
    esperado: { requisitos: "Sí, cumples edad y semanas", semanasMinimas: 1250, pension: 1750905 },
  },
  {
    nombre: "La misma mujer en 2025 no cumplía",
    origen: { tipo: "recalculado", detalle: "Hasta 2025 se exigían 1.300 semanas (Ley 100 art. 33): le faltan 40." },
    fecha: "2025-10-15",
    entrada: { sexo: "mujeres", edad: 57, semanas: 1260, ibl: 2000000 },
    esperado: { requisitos: "Todavía no", semanasMinimas: 1300, faltanSemanas: 40 },
  },
  {
    nombre: "IBL alto: piso de r y tope del monto",
    origen: { tipo: "recalculado", detalle: "s = 22,85: r = 53,6 sube al piso de 55 %. 10 bloques (+15 %) dan 70 %, que es el tope para ese ingreso. 70 % de 40.000.000 = 28.000.000." },
    fecha: "2026-10-15",
    entrada: { sexo: "hombres", edad: 65, semanas: 1800, ibl: 40000000 },
    esperado: { tasa: 70, pension: 28000000 },
  },
]);
