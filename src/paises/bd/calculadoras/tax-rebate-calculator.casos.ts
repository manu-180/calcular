import { definirCasos } from "@/motor/calculo";
import calculadora from "./tax-rebate-calculator";

const NIRDESHIKA = "https://nbr.gov.bd/uploads/news-scroller/Aykor_Nirdashikha_2026-2027_BG_Press_Modify_Copy.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Nirdeshika 2026-27, ejemplo ১৮",
    origen: { tipo: "oficial", url: NIRDESHIKA, detalle: "Página 62: 9,80,000 × 0.03 = 29,400; 3,17,000 × 0.10 = 31,700; tope 7,50,000. Rebaja 29,400." },
    fecha: "2026-10-24",
    entrada: { ingreso: 980000, inversion: 317000 },
    esperado: { rebaja: 29400, porIngreso: 29400, porInversion: 31700, tope: 750000, necesaria: 294000, faltante: 0 },
  },
  {
    nombre: "Nirdeshika 2026-27, ejemplo ক",
    origen: { tipo: "oficial", url: NIRDESHIKA, detalle: "Página 92: 11,62,000 × 0.03 = 34,860; 3,10,000 × 0.10 = 31,000. Rebaja 31,000." },
    fecha: "2026-10-24",
    entrada: { ingreso: 1162000, inversion: 310000 },
    esperado: { rebaja: 31000, necesaria: 348600, faltante: 38600 },
  },
  {
    nombre: "Ingreso muy alto llega al tope",
    origen: { tipo: "recalculado", detalle: "3 % de 3,00,00,000 = 9,00,000, más que el tope de 7,50,000; para llegar al tope hacen falta 75,00,000 de inversión." },
    fecha: "2026-10-24",
    entrada: { ingreso: 30000000, inversion: 10000000 },
    esperado: { rebaja: 750000, necesaria: 7500000, faltante: 0 },
  },
]);
