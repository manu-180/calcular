import { definirCasos } from "@/motor/calculo";
import jubilacionIess from "./jubilacion-iess";

// Los mínimos y máximos todavía no están verificados: estos casos prueban la fórmula con valores fijos
// (el motor exige todos los valores cuando un caso los pisa).
const coeficientes: Record<string, number> = { "36": 0.8325, "37": 0.8605, "38": 0.897, "39": 0.943, "40": 1 };
for (let a = 5; a <= 35; a++) coeficientes[String(a)] = 0.4375 + (a - 5) * 0.0125;

const limites = {
  "ec.sbu": 482,
  "ec.jubilacion-coeficientes": coeficientes,
  "ec.jubilacion-requisitos": { "60": 30, "65": 15, "70": 10, "0": 40 },
  "ec.pension-vejez-minima": { "10": 50, "20": 60, "30": 70, "35": 80, "39": 90, "40": 100 },
  "ec.pension-vejez-maxima": { "14": 250, "19": 300, "24": 350, "29": 400, "34": 450, "39": 500, "40": 550 },
};

export default definirCasos(jubilacionIess, [
  {
    nombre: "60 años y 30 de aportes con promedio de 1.000",
    origen: {
      tipo: "recalculado",
      detalle: "C.D. 100: coeficiente de 30 años 0,75. 1.000 × 0,75 = 750. Mínimo 70 % de 482 = 337,40; máximo 450 % = 2.169. Pensión 750.",
    },
    fecha: "2026-10-07",
    entrada: { edad: 60, anios: 30, promedio: 1000 },
    valores: limites,
    esperado: { cumple: "Sí", coeficiente: 0.75, calculada: 750, minima: 337.4, maxima: 2169, pension: 750 },
  },
  {
    nombre: "Sueldo bajo: sube al mínimo",
    origen: { tipo: "recalculado", detalle: "65 años y 15 de aportes: coeficiente 0,5625. 482 × 0,5625 = 271,13, por debajo del mínimo del 60 % (289,20)." },
    fecha: "2026-10-07",
    entrada: { edad: 65, anios: 15, promedio: 482 },
    valores: limites,
    esperado: { cumple: "Sí", calculada: 271.13, minima: 289.2, pension: 289.2 },
  },
  {
    nombre: "42 años de aportes: el coeficiente pasa de 1",
    origen: { tipo: "recalculado", detalle: "1 + 2 × 0,0125 = 1,025. Cualquier edad con 40 años o más." },
    fecha: "2026-10-07",
    entrada: { edad: 58, anios: 42, promedio: 2000 },
    valores: limites,
    esperado: { cumple: "Sí", coeficiente: 1.025, calculada: 2050 },
  },
]);
