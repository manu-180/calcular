import { definirCasos } from "@/motor/calculo";
import iva from "./iva";

export default definirCasos(iva, [
  {
    nombre: "Agregar el IVA a Q100",
    origen: { tipo: "recalculado", detalle: "Ley del IVA art. 10 (Decreto 66-2002): 12 % de 100 = 12; precio con IVA 112." },
    fecha: "2026-10-12",
    entrada: { monto: 100, operacion: "agregar" },
    esperado: { tasa: 12, base: 100, iva: 12, total: 112 },
  },
  {
    nombre: "Quitar el IVA de Q1,000",
    origen: { tipo: "recalculado", detalle: "1000 / 1.12 = 892.857 → 892.86; IVA 1000 − 892.86 = 107.14." },
    fecha: "2026-10-12",
    entrada: { monto: 1000, operacion: "quitar" },
    esperado: { base: 892.86, iva: 107.14, total: 1000 },
  },
]);
