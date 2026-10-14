import { definirCasos } from "@/motor/calculo";
import iprem from "./iprem";

const SEPE = "https://www.sepe.es/HomeSepe/prestaciones-desempleo/Cuantias-anuales.html";

export default definirCasos(iprem, [
  {
    nombre: "Un IPREM",
    origen: { tipo: "oficial", url: SEPE, detalle: "El SEPE publica un IPREM de 600 euros al mes y 7.200 al año." },
    fecha: "2026-10-14",
    entrada: { veces: 1 },
    esperado: { mensual: 600, anual12: 7200, anual14: 8400, diario: 20 },
  },
  {
    nombre: "1,5 veces el IPREM",
    origen: { tipo: "recalculado", detalle: "600 × 1,5 = 900 al mes; 10.800 al año en 12 pagas; 12.600 en 14." },
    fecha: "2026-10-14",
    entrada: { veces: 1.5 },
    esperado: { mensual: 900, anual12: 10800, anual14: 12600 },
  },
]);
