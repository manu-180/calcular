import { definirCasos } from "@/motor/calculo";
import retencionDeRenta from "./retencion-de-renta";

export default definirCasos(retencionDeRenta, [
  {
    nombre: "Salario de $800 en el tramo II",
    origen: {
      tipo: "recalculado",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/2020-2029/2025/04/10A052.PDF",
      detalle: "Decreto Ejecutivo 10 de 2025, tabla mensual. AFP 7,25 % de 800 = 58. Gravado 800 − 58 − 24 = 718. (718 − 550) × 10 % + 17,67 = 34,47. Líquido 683,53.",
    },
    fecha: "2026-10-07",
    entrada: { periodo: "mensual", salario: 800, isss: 24 },
    esperado: { afp: 58, gravado: 718, renta: 34.47, liquido: 683.53 },
  },
  {
    nombre: "Gravado de $550 exactos: sin retención",
    origen: { tipo: "recalculado", detalle: "600 − 43,50 − 6,50 = 550,00: último centavo del tramo I." },
    fecha: "2026-10-07",
    entrada: { periodo: "mensual", salario: 600, isss: 6.5 },
    esperado: { gravado: 550, renta: 0, tramo: "Tramo I (sin retención)" },
  },
  {
    nombre: "Un centavo más: entra al tramo II con su cuota fija",
    origen: { tipo: "recalculado", detalle: "600 − 43,50 − 6,49 = 550,01. (550,01 − 550) × 10 % + 17,67 = 17,67." },
    fecha: "2026-10-07",
    entrada: { periodo: "mensual", salario: 600, isss: 6.49 },
    esperado: { gravado: 550.01, renta: 17.67, tramo: "Tramo II" },
  },
  {
    nombre: "Tramo III con $1,500",
    origen: { tipo: "recalculado", detalle: "AFP 108,75. Gravado 1.500 − 108,75 − 30 = 1.361,25. (1.361,25 − 895,24) × 20 % + 60 = 153,20." },
    fecha: "2026-10-07",
    entrada: { periodo: "mensual", salario: 1500, isss: 30 },
    esperado: { afp: 108.75, gravado: 1361.25, renta: 153.2, liquido: 1208.05 },
  },
  {
    nombre: "Tramo IV con $3,000",
    origen: { tipo: "recalculado", detalle: "AFP 217,50. Gravado 3.000 − 217,50 − 30 = 2.752,50. (2.752,50 − 2.038,10) × 30 % + 288,57 = 502,89." },
    fecha: "2026-10-07",
    entrada: { periodo: "mensual", salario: 3000, isss: 30 },
    esperado: { gravado: 2752.5, renta: 502.89 },
  },
  {
    nombre: "Quincena de $500 en el tramo III quincenal",
    origen: { tipo: "recalculado", detalle: "AFP 36,25. Gravado 500 − 36,25 − 15 = 448,75. (448,75 − 447,62) × 20 % + 30 = 30,23." },
    fecha: "2026-10-07",
    entrada: { periodo: "quincenal", salario: 500, isss: 15 },
    esperado: { gravado: 448.75, renta: 30.23 },
  },
  {
    nombre: "ISSS mayor que el salario",
    origen: { tipo: "recalculado", detalle: "Entrada imposible: tiene que dar error." },
    fecha: "2026-10-07",
    entrada: { periodo: "mensual", salario: 100, isss: 200 },
    esperaError: true,
  },
]);
