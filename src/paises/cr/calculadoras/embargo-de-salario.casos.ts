import { definirCasos } from "@/motor/calculo";
import embargoDeSalario from "./embargo-de-salario";

export default definirCasos(embargoDeSalario, [
  {
    nombre: "Salario líquido de ₡1.000.000, deuda común",
    origen: {
      tipo: "recalculado",
      detalle:
        "Menor salario mensual del Decreto 45303-MTSS: trabajo doméstico, 268.731,31 (menor que 12.436,41 × 26). Tres veces: 806.193,93. Primera porción 537.462,62 / 8 = 67.182,83. Resto 193.806,07 / 4 = 48.451,52. Embargo 115.634,35.",
    },
    fecha: "2026-10-12",
    entrada: { salarioLiquido: 1000000, tipo: "comun" },
    esperado: { minimoInembargable: 268731.31, embargable: 115634.35, libre: 884365.65 },
  },
  {
    nombre: "Salario por debajo del mínimo inembargable",
    origen: { tipo: "recalculado", detalle: "250.000 no supera 268.731,31: no se embarga nada." },
    fecha: "2026-10-12",
    entrada: { salarioLiquido: 250000, tipo: "comun" },
    esperado: { embargable: 0, libre: 250000 },
  },
  {
    nombre: "Salario entre uno y tres mínimos",
    origen: { tipo: "recalculado", detalle: "500.000 − 268.731,31 = 231.268,69; un octavo: 28.908,59." },
    fecha: "2026-10-12",
    entrada: { salarioLiquido: 500000, tipo: "comun" },
    esperado: { embargable: 28908.59 },
  },
  {
    nombre: "Pensión alimentaria",
    origen: { tipo: "recalculado", detalle: "Art. 172: hasta el 50 % del salario por pensión alimentaria. 800.000 × 50 % = 400.000." },
    fecha: "2026-10-12",
    entrada: { salarioLiquido: 800000, tipo: "pension-alimentaria" },
    esperado: { embargable: 400000, libre: 400000 },
  },
]);
