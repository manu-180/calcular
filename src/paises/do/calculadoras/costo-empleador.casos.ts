import { definirCasos } from "@/motor/calculo";
import costoEmpleador from "./costo-empleador";

export default definirCasos(costoEmpleador, [
  {
    nombre: "Salario de RD$40,000 en empresa grande",
    origen: { tipo: "recalculado", detalle: "SFS 7.09 % = 2,836. AFP 7.10 % = 2,840. Riesgos 1 % + 0.10 % = 440. TSS 6,116. Regalía 40,000. Año: (40,000 + 6,116) × 12 + 40,000 = 593,392. Mes: 49,449.33." },
    fecha: "2026-10-12",
    entrada: { salario: 40000, riesgo: 0.1, tamano: "grande" },
    esperado: { sfs: 2836, afp: 2840, srl: 440, tss: 6116, regaliaMensual: 3333.33, anual: 593392, mensual: 49449.33 },
  },
  {
    nombre: "Salario de RD$300,000 con topes",
    origen: { tipo: "recalculado", detalle: "SFS sobre el tope 232,230 = 16,465.11. AFP 300,000 × 7.10 % = 21,300. Riesgos sobre 92,892 × 1.10 % = 1,021.81. TSS 38,786.92. Regalía con tope 5 × 29,988 = 149,940. Año 4,215,383.04." },
    fecha: "2026-10-12",
    entrada: { salario: 300000, riesgo: 0.1, tamano: "grande" },
    esperado: { sfs: 16465.11, afp: 21300, srl: 1021.81, tss: 38786.92, anual: 4215383.04, mensual: 351281.92 },
  },
  {
    nombre: "Riesgo máximo",
    origen: { tipo: "recalculado", detalle: "20,000 con 0.30 %: riesgos 1.30 % = 260. TSS 1,418 + 1,420 + 260 = 3,098. Año 297,176." },
    fecha: "2026-10-12",
    entrada: { salario: 20000, riesgo: 0.3, tamano: "micro" },
    esperado: { srl: 260, tss: 3098, anual: 297176 },
  },
  {
    nombre: "Riesgo fuera de rango",
    origen: { tipo: "recalculado", detalle: "El porcentaje variable va de 0.10 % a 0.30 %." },
    fecha: "2026-10-12",
    entrada: { salario: 20000, riesgo: 0.5, tamano: "micro" },
    esperaError: true,
  },
]);
