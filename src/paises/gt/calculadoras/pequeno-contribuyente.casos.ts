import { definirCasos } from "@/motor/calculo";
import pequenoContribuyente from "./pequeno-contribuyente";

export default definirCasos(pequenoContribuyente, [
  {
    nombre: "Ventas de Q2,500 en el mes",
    origen: { tipo: "recalculado", detalle: "Ley del IVA art. 47 (Decreto 4-2012): 5 % de 2500 = 125." },
    fecha: "2026-10-12",
    entrada: { ventas: 2500 },
    esperado: { tasa: 5, impuesto: 125, neto: 2375 },
  },
  {
    nombre: "Ventas con centavos",
    origen: { tipo: "recalculado", detalle: "5 % de 12345.67 = 617.2835 → 617.28." },
    fecha: "2026-10-12",
    entrada: { ventas: 12345.67 },
    esperado: { impuesto: 617.28, neto: 11728.39 },
  },
]);
