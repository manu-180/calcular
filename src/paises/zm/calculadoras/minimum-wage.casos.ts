import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "General worker with every allowance",
    origen: {
      tipo: "recalculado",
      url: "https://www.mlss.gov.zm/wp-content/uploads/2023/12/IS-NO.48.pdf",
      detalle: "Category I K1,487 + housing 30% = 446.10 + transport 200 + lunch 180 = 2,313.10.",
    },
    fecha: "2026-10-26",
    entrada: { categoria: "cat1", vivienda: false, lejos: true, comidas: false, sueldo: null },
    esperado: { basico: 1487, hora: 7.15, vivienda: 446.1, transporte: 200, almuerzo: 180, total: 2313.1 },
  },
  {
    nombre: "Qualified clerk housed, fed and near work",
    origen: { tipo: "recalculado", detalle: "Category VII K2,861.36 with no allowances due." },
    fecha: "2026-10-26",
    entrada: { categoria: "cat7", vivienda: true, lejos: false, comidas: true, sueldo: 3000 },
    esperado: { basico: 2861.36, hora: 13.76, total: 2861.36, diferencia: 138.64 },
  },
  {
    nombre: "Driver below the minimum",
    origen: { tipo: "recalculado", detalle: "Category IV K2,119.23; pay of 2,000 is 119.23 short." },
    fecha: "2026-10-26",
    entrada: { categoria: "cat4", vivienda: false, lejos: false, comidas: false, sueldo: 2000 },
    esperado: { basico: 2119.23, vivienda: 635.77, diferencia: -119.23 },
  },
]);
