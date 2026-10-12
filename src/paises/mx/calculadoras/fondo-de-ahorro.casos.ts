import { definirCasos } from "@/motor/calculo";
import fondo from "./fondo-de-ahorro";

export default definirCasos(fondo, [
  {
    nombre: "13 % de 20,000 al mes",
    origen: { tipo: "recalculado", detalle: "LISR art. 27 fr. XI: hasta 13 % del salario y 1.3 UMA anuales (1.3 × 3566.22 × 12 = 55633.03). 2600 × 12 = 31200, debajo de los dos topes." },
    fecha: "2026-10-15",
    entrada: { sueldo: 20000, porcentaje: 13 },
    esperado: { aportacionMensual: 2600, anualEmpresa: 31200, ahorroAnual: 62400, tope: 31200, exento: 31200, gravado: 0 },
  },
  {
    nombre: "Sueldo alto: manda el tope en UMA",
    origen: { tipo: "recalculado", detalle: "6500 × 12 = 78000; tope 55633.03; gravado 22366.97." },
    fecha: "2026-10-15",
    entrada: { sueldo: 50000, porcentaje: 13 },
    esperado: { anualEmpresa: 78000, tope: 55633.03, exento: 55633.03, gravado: 22366.97 },
  },
  {
    nombre: "Aportación arriba del 13 %",
    origen: { tipo: "recalculado", detalle: "15 % de 10000 = 1500 × 12 = 18000; tope 13 % = 15600; gravado 2400." },
    fecha: "2026-10-15",
    entrada: { sueldo: 10000, porcentaje: 15 },
    esperado: { tope: 15600, exento: 15600, gravado: 2400 },
  },
]);
