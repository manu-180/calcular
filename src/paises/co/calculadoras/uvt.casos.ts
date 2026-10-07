import { definirCasos } from "@/motor/calculo";
import uvt from "./uvt";

export default definirCasos(uvt, [
  {
    nombre: "100 UVT de 2026",
    origen: { tipo: "recalculado", detalle: "Resolución DIAN 000238 de 2025: 100 × 52.374 = 5.237.400; art. 868: al múltiplo de mil = 5.237.000." },
    fecha: "2026-10-15",
    entrada: { direccion: "uvt-a-pesos", cantidad: 100 },
    esperado: { uvt: 52374, pesos: 5237400, aproximado: 5237000, uvts: null },
  },
  {
    nombre: "Resultado entre 100 y 10.000 pesos: a la centena",
    origen: { tipo: "recalculado", detalle: "0,1 × 52.374 = 5.237,4 → 5.200." },
    fecha: "2026-10-15",
    entrada: { direccion: "uvt-a-pesos", cantidad: 0.1 },
    esperado: { pesos: 5237, aproximado: 5200 },
  },
  {
    nombre: "Resultado de 100 pesos o menos: al peso",
    origen: { tipo: "recalculado", detalle: "0,001 × 52.374 = 52,374 → 52." },
    fecha: "2026-10-15",
    entrada: { direccion: "uvt-a-pesos", cantidad: 0.001 },
    esperado: { aproximado: 52 },
  },
  {
    nombre: "Un millón de pesos en UVT",
    origen: { tipo: "recalculado", detalle: "1.000.000 / 52.374 = 19,09." },
    fecha: "2026-10-15",
    entrada: { direccion: "pesos-a-uvt", cantidad: 1000000 },
    esperado: { uvts: 19.09, pesos: null },
  },
]);
