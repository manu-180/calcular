import { definirCasos } from "@/motor/calculo";
import iva from "./iva";

export default definirCasos(iva, [
  {
    nombre: "Sumar el 16 % a 100",
    origen: { tipo: "recalculado", detalle: "Ley del IVA, art. 63 (Gaceta 6.507): 16 % de 100 = 16; total 116." },
    fecha: "2026-10-08",
    entrada: { operacion: "sumar", alicuota: "general", monto: 100 },
    esperado: { tasa: 16, base: 100, iva: 16, total: 116 },
  },
  {
    nombre: "Quitar el 16 % de 1.160",
    origen: { tipo: "recalculado", detalle: "1.160 / 1,16 = 1.000; IVA 160." },
    fecha: "2026-10-08",
    entrada: { operacion: "quitar", alicuota: "general", monto: 1160 },
    esperado: { base: 1000, iva: 160, total: 1160 },
  },
  {
    nombre: "Alícuota reducida del 8 %",
    origen: { tipo: "recalculado", detalle: "Art. 64: 8 % de 250 = 20; total 270." },
    fecha: "2026-10-08",
    entrada: { operacion: "sumar", alicuota: "reducida", monto: 250 },
    esperado: { tasa: 8, iva: 20, total: 270 },
  },
]);
