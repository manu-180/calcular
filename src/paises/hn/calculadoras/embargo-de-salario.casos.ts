import { definirCasos } from "@/motor/calculo";
import embargoDeSalario from "./embargo-de-salario";

export default definirCasos(embargoDeSalario, [
  {
    nombre: "Pensión alimenticia sobre L20,000",
    origen: { tipo: "recalculado", detalle: "CT art. 371.1: hasta el 50 % para pensiones alimenticias. 20000 × 50 % = 10000." },
    fecha: "2026-10-12",
    entrada: { salario: 20000, deuda: "pension-alimenticia", rama: "comercio-1-10" },
    esperado: { tasa: 50, maximo: 10000, queda: 10000 },
  },
  {
    nombre: "Alquiler de la vivienda sobre L20,000",
    origen: { tipo: "recalculado", detalle: "Art. 371.2: hasta el 40 %. 20000 × 40 % = 8000." },
    fecha: "2026-10-12",
    entrada: { salario: 20000, deuda: "vivienda-alimentos", rama: "comercio-1-10" },
    esperado: { maximo: 8000 },
  },
  {
    nombre: "Deuda común sobre L20,000 en comercio de 1 a 10",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 371: una cuarta parte del excedente de L100: (20000 − 100) × 25 % = 4975. Sin tocar el mínimo de 13292.06: 20000 − 13292.06 = 6707.94. Máximo 4975.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 20000, deuda: "general", rama: "comercio-1-10" },
    esperado: { tasa: 25, maximo: 4975, queda: 15025 },
  },
  {
    nombre: "Deuda común con un salario apenas sobre el mínimo",
    origen: { tipo: "recalculado", detalle: "(14000 − 100) × 25 % = 3475, pero el mínimo de 13292.06 no se embarga: 14000 − 13292.06 = 707.94." },
    fecha: "2026-10-12",
    entrada: { salario: 14000, deuda: "general", rama: "comercio-1-10" },
    esperado: { maximo: 707.94 },
  },
  {
    nombre: "Deuda común con el salario mínimo",
    origen: { tipo: "recalculado", detalle: "El salario mínimo no es embargable: 0." },
    fecha: "2026-10-12",
    entrada: { salario: 13292.06, deuda: "general", rama: "comercio-1-10" },
    esperado: { maximo: 0 },
  },
]);
