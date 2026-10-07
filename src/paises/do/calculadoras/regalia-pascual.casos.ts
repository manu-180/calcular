import { definirCasos } from "@/motor/calculo";
import regaliaPascual from "./regalia-pascual";

export default definirCasos(regaliaPascual, [
  {
    nombre: "Año completo con RD$30,000",
    origen: { tipo: "recalculado", detalle: "Art. 219: 30,000 × 12 = 360,000; 360,000 ÷ 12 = 30,000. Tope 5 × 29,988 = 149,940, no se alcanza." },
    fecha: "2026-12-15",
    entrada: { salario: 30000, ingreso: null, salida: null, tamano: "grande" },
    esperado: { meses: 12, devengado: 360000, tope: 149940, regalia: 30000 },
  },
  {
    nombre: "Ingreso el 16 de julio en empresa mediana",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 220, proporcional: del 16/7 al 31/12 son 5 meses y 16 días = 5.5333 meses. 25,000 × 5.5333 = 138,333.33; ÷ 12 = 11,527.78. Tope 5 × 27,489.60 = 137,448.",
    },
    fecha: "2026-12-15",
    entrada: { salario: 25000, ingreso: "2026-07-16", salida: null, tamano: "mediana" },
    esperado: { meses: 5.53, devengado: 138333.33, segunSalario: 11527.78, tope: 137448, regalia: 11527.78 },
  },
  {
    nombre: "Salida el 31 de marzo",
    origen: { tipo: "recalculado", detalle: "Del 1/1 al 31/3 son 3 meses. 20,000 × 3 = 60,000; ÷ 12 = 5,000." },
    fecha: "2026-10-07",
    entrada: { salario: 20000, ingreso: null, salida: "2026-03-31", tamano: "pequena" },
    esperado: { meses: 3, devengado: 60000, regalia: 5000 },
  },
  {
    nombre: "Salario alto en microempresa: llega al tope",
    origen: { tipo: "recalculado", detalle: "200,000 × 12 ÷ 12 = 200,000. Tope 5 × 16,993.20 = 84,966. Se paga el tope." },
    fecha: "2026-12-15",
    entrada: { salario: 200000, ingreso: null, salida: null, tamano: "micro" },
    esperado: { segunSalario: 200000, tope: 84966, regalia: 84966 },
  },
  {
    nombre: "Tope el 31 de enero de 2026, con el salario mínimo anterior",
    origen: { tipo: "recalculado", detalle: "Hasta el 31/1/2026 el mínimo de empresa grande es 27,988.80. Tope 5 × 27,988.80 = 139,944." },
    fecha: "2026-01-31",
    entrada: { salario: 150000, ingreso: null, salida: null, tamano: "grande" },
    esperado: { tope: 139944, regalia: 139944 },
  },
  {
    nombre: "Tope el 1 de febrero de 2026, con el aumento del 8 %",
    origen: { tipo: "recalculado", detalle: "Desde el 1/2/2026 el mínimo de empresa grande es 29,988. Tope 5 × 29,988 = 149,940." },
    fecha: "2026-02-01",
    entrada: { salario: 150000, ingreso: null, salida: null, tamano: "grande" },
    esperado: { tope: 149940, regalia: 149940 },
  },
  {
    nombre: "Salida anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-07",
    entrada: { salario: 20000, ingreso: "2026-06-01", salida: "2026-05-01", tamano: "grande" },
    esperaError: true,
  },
]);
