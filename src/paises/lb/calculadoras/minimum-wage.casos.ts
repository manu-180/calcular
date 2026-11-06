import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "Salario de 30 millones",
    origen: { tipo: "oficial", url: "https://drive.google.com/file/d/1O5iJmz9fbXKtl-3zCSTziPqMp5kDKU4K/view?usp=sharing", detalle: "Memoria CNSS 801: 28.000.000 por mes y 1.300.000 por día desde 1/8/2025. Hora: 28.000.000 × 12 / (48 × 52) = 134.615." },
    fecha: "2026-11-01",
    entrada: { salario: 30000000 },
    esperado: { minimo: 28000000, diario: 1300000, diferencia: 2000000, horario: 134615, anual: 336000000, tope: 120000000 },
  },
  {
    nombre: "Salario por debajo del mínimo",
    origen: { tipo: "recalculado", detalle: "20.000.000 − 28.000.000 = −8.000.000." },
    fecha: "2026-11-01",
    entrada: { salario: 20000000 },
    esperado: { diferencia: -8000000, cumple: "لا، أجرك دون الحد الأدنى" },
  },
]);
