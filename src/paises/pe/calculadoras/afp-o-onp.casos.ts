import { definirCasos } from "@/motor/calculo";
import afpOOnp from "./afp-o-onp";

export default definirCasos(afpOOnp, [
  {
    nombre: "S/ 3,000 con AFP Habitat en comisión mixta (octubre 2026)",
    origen: {
      tipo: "recalculado",
      detalle: "SBS, devengue 2026-10: aporte 10 % = 300; prima 1.37 % = 41.10; comisión de flujo 0 %. AFP 341.10. ONP 13 % = 390. Diferencia 48.90.",
    },
    fecha: "2026-10-12",
    entrada: { sueldo: 3000, afp: "habitat", esquema: "saldo" },
    esperado: { onp: 390, aporteFondo: 300, prima: 41.1, comision: 0, afp: 341.1, diferencia: 48.9, conviene: "Este mes la AFP te descuenta menos" },
  },
  {
    nombre: "Profuturo con comisión sobre el flujo",
    origen: { tipo: "recalculado", detalle: "2,000 × (10 % + 1.37 % + 1.69 %) = 200 + 27.40 + 33.80 = 261.20. ONP 260. Diferencia -1.20." },
    fecha: "2026-10-12",
    entrada: { sueldo: 2000, afp: "profuturo", esquema: "flujo" },
    esperado: { afp: 261.2, onp: 260, diferencia: -1.2, conviene: "Este mes la ONP te descuenta menos" },
  },
  {
    nombre: "Sueldo por encima de la remuneración máxima asegurable",
    origen: { tipo: "recalculado", detalle: "RMA de S/ 12,732.70 (SBS, octubre 2026): prima 12,732.70 × 1.37 % = 174.44 aunque el sueldo sea 20,000." },
    fecha: "2026-10-12",
    entrada: { sueldo: 20000, afp: "integra", esquema: "saldo" },
    esperado: { prima: 174.44, aporteFondo: 2000, onp: 2600 },
  },
]);
