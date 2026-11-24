import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

const URL = "https://www.mlvt.gov.kh/index.php/%E1%9E%AF%E1%9E%80%E1%9E%9F%E1%9E%B6%E1%9E%9A%E1%9E%95%E1%9F%92%E1%9E%9B%E1%9E%BC%E1%9E%9C%E1%9E%80%E1%9E%B6%E1%9E%9A/%E1%9E%94%E1%9F%92%E1%9E%9A%E1%9E%80%E1%9E%B6%E1%9E%9F/43-%E1%9E%94%E1%9F%92%E1%9E%9A%E1%9E%80%E1%9E%B6%E1%9E%9F/3340.html";

export default definirCasos(calculadora, [
  {
    nombre: "ពេញសិទ្ធិ ឆ្នាំ2026",
    origen: { tipo: "oficial", url: URL, detalle: "ប្រកាសលេខ 214/25 ប្រការ 1: 210 ដុល្លារ" },
    fecha: "2026-06-01",
    entrada: { etapa: "completo", sueldo: 205, diasMes: 26 },
    esperado: { minimo: 210, falta: 5 },
  },
  {
    nombre: "សាកល្បង ឆ្នាំ2026",
    origen: { tipo: "oficial", url: URL, detalle: "ប្រកាសលេខ 214/25 ប្រការ 2: 208 ដុល្លារ" },
    fecha: "2026-01-01",
    entrada: { etapa: "prueba", sueldo: 208, diasMes: 26 },
    esperado: { minimo: 208, falta: 0, diario: 8 },
  },
]);
