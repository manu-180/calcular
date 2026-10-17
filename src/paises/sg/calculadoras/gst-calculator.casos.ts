import { definirCasos } from "@/motor/calculo";
import calculadora from "./gst-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Remove GST from $109",
    origen: { tipo: "recalculado", detalle: "GST 9% since 1 Jan 2024 (IRAS). 109 × 100 / 109 = 100 before GST, so GST is 9." },
    fecha: "2026-10-14",
    entrada: { monto: 109, operacion: "quitar" },
    esperado: { sinGst: 100, gst: 9, conGst: 109 },
  },
  {
    nombre: "Add GST to $250",
    origen: { tipo: "recalculado", detalle: "250 × 1.09 = 272.50, so GST is 22.50." },
    fecha: "2026-10-14",
    entrada: { monto: 250, operacion: "sumar" },
    esperado: { sinGst: 250, gst: 22.5, conGst: 272.5 },
  },
  {
    nombre: "Add GST in 2023 at 8%",
    origen: { tipo: "recalculado", detalle: "IRAS: 8% from 1 Jan 2023 to 31 Dec 2023. 100 × 1.08 = 108." },
    fecha: "2023-06-30",
    entrada: { monto: 100, operacion: "sumar" },
    esperado: { gst: 8, conGst: 108, tasa: 8 },
  },
  {
    nombre: "Negative amount",
    origen: { tipo: "recalculado", detalle: "An amount below zero is not valid." },
    fecha: "2026-10-14",
    entrada: { monto: -5, operacion: "sumar" },
    esperaError: true,
  },
]);
