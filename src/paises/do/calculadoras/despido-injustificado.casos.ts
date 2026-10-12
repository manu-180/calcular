import { definirCasos } from "@/motor/calculo";
import despidoInjustificado from "./despido-injustificado";

export default definirCasos(despidoInjustificado, [
  {
    nombre: "2 años y 7 meses con juicio de 8 meses",
    origen: { tipo: "recalculado", detalle: "Diario 50,000 ÷ 23.83 = 2,098.20. Preaviso 28 días = 58,749.60. Cesantía 55 días = 115,401. Art. 95 ordinal 3: salarios caídos con máximo de 6 meses = 300,000. Total 474,150.60." },
    fecha: "2026-10-12",
    entrada: { inicio: "2024-01-10", termino: "2026-08-20", salario: 50000, mesesJuicio: 8 },
    esperado: { diasPreaviso: 28, preaviso: 58749.6, diasCesantia: 55, cesantia: 115401, mesesCaidos: 6, salariosCaidos: 300000, total: 474150.6 },
  },
  {
    nombre: "3 meses justos y juicio de 2 meses",
    origen: { tipo: "recalculado", detalle: "Diario 1,258.92. Preaviso 7 días = 8,812.44. Cesantía 6 días = 7,553.52. Salarios caídos 2 × 30,000 = 60,000. Total 76,365.96." },
    fecha: "2026-10-12",
    entrada: { inicio: "2026-06-30", termino: "2026-09-30", salario: 30000, mesesJuicio: 2 },
    esperado: { preaviso: 8812.44, cesantia: 7553.52, salariosCaidos: 60000, total: 76365.96 },
  },
  {
    nombre: "Sin demanda",
    origen: { tipo: "recalculado", detalle: "Del 1/3/2021 al 30/9/2026: preaviso 28 días = 46,999.68 y cesantía 128 días = 214,855.68. Total 261,855.36." },
    fecha: "2026-10-12",
    entrada: { inicio: "2021-03-01", termino: "2026-09-30", salario: 40000, mesesJuicio: 0 },
    esperado: { salariosCaidos: 0, total: 261855.36 },
  },
]);
