import { definirCasos } from "@/motor/calculo";
import creditoHipotecario from "./credito-hipotecario";

export default definirCasos(creditoHipotecario, [
  {
    nombre: "Departamento de 3.000 UF, 20 % de pie, 4,5 % a 25 años",
    origen: {
      tipo: "recalculado",
      detalle:
        "Crédito 2.400 UF. i = 4,5 % / 12 = 0,375 %. Cuota = 2.400 × 0,00375 / (1 − 1,00375^−300) = 13,34 UF. Con UF 41.114,54 (7/10/2026): 548.467. Total 4.001,99 UF; intereses 1.601,99 UF. Renta para 25 %: 2.193.868.",
    },
    fecha: "2026-10-07",
    entrada: { valor: 3000, pie: 20, tasa: 4.5, plazo: 25 },
    esperado: { creditoUf: 2400, pieUf: 600, dividendoUf: 13.34, dividendo: 548467, totalUf: 4001.99, interesesUf: 1601.99, rentaSugerida: 2193868 },
  },
  {
    nombre: "1.000 UF de crédito a 10 años con 5 %",
    origen: { tipo: "recalculado", detalle: "Valor 1.250 UF y 20 % de pie: 1.000 UF. i = 5 % / 12. Cuota = 10,61 UF = 436.083 con UF 41.114,54." },
    fecha: "2026-10-07",
    entrada: { valor: 1250, pie: 20, tasa: 5, plazo: 10 },
    esperado: { dividendoUf: 10.61, dividendo: 436083 },
  },
  {
    nombre: "Pie de 100 %",
    origen: { tipo: "recalculado", detalle: "Sin monto que financiar." },
    fecha: "2026-10-07",
    entrada: { valor: 1000, pie: 100, tasa: 4, plazo: 20 },
    esperaError: true,
  },
]);
