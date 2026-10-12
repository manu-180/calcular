import { definirCasos } from "@/motor/calculo";
import dividendos from "./impuesto-a-los-dividendos";

export default definirCasos(dividendos, [
  {
    nombre: "Dividendo de S/ 10,000",
    origen: { tipo: "recalculado", detalle: "LIR, art. 52-A (texto del DL 1261): 5 % de 10,000 = 500; recibes 9,500." },
    fecha: "2026-10-12",
    entrada: { dividendo: 10000 },
    esperado: { retencion: 500, neto: 9500 },
  },
  {
    nombre: "Dividendo con céntimos",
    origen: { tipo: "recalculado", detalle: "5 % de 1,234.57 = 61.7285, redondeado 61.73; neto 1,172.84." },
    fecha: "2026-10-12",
    entrada: { dividendo: 1234.57 },
    esperado: { retencion: 61.73, neto: 1172.84 },
  },
]);
