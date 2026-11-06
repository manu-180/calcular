import { definirCasos } from "@/motor/calculo";
import calculadora from "./family-allowance-calculator";

const URL = "https://drive.google.com/file/d/1LXzz54n5z6hZ7fajiek3aZr6EadZqShk/view?usp=sharing";
export default definirCasos(calculadora, [
  { nombre: "Cónyuge y 3 hijos", origen: { tipo: "recalculado", detalle: "Memoria 831: 2.100.000 + 3 × 1.155.000 = 5.565.000." }, fecha: "2026-11-01", entrada: { conyuge: true, hijos: 3 }, esperado: { total: 5565000, porConyuge: 2100000, porHijos: 3465000, contados: 3 } },
  { nombre: "Tope con 7 hijos", origen: { tipo: "oficial", url: URL, detalle: "Memoria 831: máximo 7.875.000 con cinco hijos y cónyuge." }, fecha: "2026-11-01", entrada: { conyuge: true, hijos: 7 }, esperado: { total: 7875000, contados: 5, tope: 28000000 } },
  { nombre: "Solo un hijo", origen: { tipo: "recalculado", detalle: "1 × 1.155.000." }, fecha: "2026-11-01", entrada: { conyuge: false, hijos: 1 }, esperado: { total: 1155000 } },
]);
