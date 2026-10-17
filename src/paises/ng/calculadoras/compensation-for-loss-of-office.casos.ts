import { definirCasos } from "@/motor/calculo";
import calculadora from "./compensation-for-loss-of-office";

export default definirCasos(calculadora, [
  {
    nombre: "₦60 million compensation",
    origen: { tipo: "recalculado", detalle: "First 50,000,000 is not a chargeable gain; the 10,000,000 excess is." },
    fecha: "2026-10-16",
    entrada: { monto: 60000000 },
    esperado: { exento: 50000000, gravable: 10000000 },
  },
  {
    nombre: "₦12 million compensation",
    origen: { tipo: "recalculado", detalle: "Below 50,000,000, so all of it is free of tax." },
    fecha: "2026-10-16",
    entrada: { monto: 12000000 },
    esperado: { exento: 12000000, gravable: 0 },
  },
]);
