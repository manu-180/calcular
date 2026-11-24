import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Un año con la tasa de septiembre de 2026",
    origen: { tipo: "oficial", url: "https://www.cas.gov.lb/new/consumer-prices-september-2026/", detalle: "IPC +17,53 % interanual. 1.000.000 × 1,1753 = 1.175.300; 1.000.000 / 1,1753 = 850.847." },
    fecha: "2026-10-25",
    entrada: { importe: 1000000, anios: 1 },
    esperado: { futuro: 1175300, poder: 850847, tasa: 17.53, mes: "2026-09-01" },
  },
]);
