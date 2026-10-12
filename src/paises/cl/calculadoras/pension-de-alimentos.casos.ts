import { definirCasos } from "@/motor/calculo";
import pensionDeAlimentos from "./pension-de-alimentos";

export default definirCasos(pensionDeAlimentos, [
  {
    nombre: "Un hijo, alimentante de 30 años",
    origen: { tipo: "recalculado", detalle: "Ley 14.908 art. 3: 40 % del ingreso mínimo. 553.553 × 40 % = 221.421,2 → 221.421. Máximo art. 7: 50 % de 1.000.000 = 500.000." },
    fecha: "2026-10-07",
    entrada: { hijos: 1, edad: "general", rentas: 1000000 },
    esperado: { porHijo: 221421, minimoTotal: 221421, maximo: 500000 },
  },
  {
    nombre: "Tres hijos",
    origen: { tipo: "recalculado", detalle: "Dos o más: 30 % por cada uno. 553.553 × 30 % = 166.065,9 → 166.066. × 3 = 498.198." },
    fecha: "2026-10-07",
    entrada: { hijos: 3, edad: "general", rentas: 0 },
    esperado: { porHijo: 166066, minimoTotal: 498198, maximo: null },
  },
  {
    nombre: "Alimentante mayor de 65",
    origen: { tipo: "recalculado", detalle: "Se usa el mínimo de su edad: 412.938 × 40 % = 165.175,2 → 165.175." },
    fecha: "2026-10-07",
    entrada: { hijos: 1, edad: "especial", rentas: 0 },
    esperado: { imm: 412938, porHijo: 165175 },
  },
  {
    nombre: "Con el ingreso mínimo de abril de 2026",
    origen: { tipo: "recalculado", detalle: "30/4/2026: IMM 539.000 (Ley 21.751). 40 % = 215.600." },
    fecha: "2026-04-30",
    entrada: { hijos: 1, edad: "general", rentas: 0 },
    esperado: { porHijo: 215600 },
  },
]);
