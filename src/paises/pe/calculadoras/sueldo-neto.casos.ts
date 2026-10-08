import { definirCasos } from "@/motor/calculo";
import sueldoNeto from "./sueldo-neto";

const base = { asignacionFamiliar: false, gratificaciones: "completas", seguro: "essalud" } as const;

export default definirCasos(sueldoNeto, [
  {
    nombre: "S/ 5,000 en AFP con comisión sobre el saldo",
    origen: {
      tipo: "recalculado",
      detalle:
        "SBS, devengue 2026-10: aporte 10 % = 500; prima 1.37 % = 68.50; comisión mixta 0 % sobre el sueldo. Quinta: (5,000 × 14 + 900 − 38,500) = 32,400; impuesto 2,886; por mes 240.50. Neto 5,000 − 568.50 − 240.50 = 4,191.",
      url: "https://www.sbs.gob.pe/app/spp/empleadores/comisiones_spp/Paginas/comision_prima.aspx",
    },
    fecha: "2026-10-07",
    entrada: { ...base, sueldo: 5000, sistema: "afp", afp: "habitat", esquema: "saldo" },
    esperado: { aporteAfp: 500, primaSeguro: 68.5, comision: 0, pension: 568.5, quinta: 240.5, neto: 4191 },
  },
  {
    nombre: "Mismo sueldo en AFP Integra con comisión por flujo",
    origen: { tipo: "recalculado", detalle: "Comisión por flujo de Integra 1.55 % = 77.50. Pensión 646; neto 5,000 − 646 − 240.50 = 4,113.50." },
    fecha: "2026-10-07",
    entrada: { ...base, sueldo: 5000, sistema: "afp", afp: "integra", esquema: "flujo" },
    esperado: { comision: 77.5, pension: 646, neto: 4113.5 },
  },
  {
    nombre: "RMV con asignación familiar en la ONP",
    origen: { tipo: "recalculado", detalle: "1,230 + 123 = 1,353; ONP 13 % = 175.89. Ingreso anual 18,942 + 2,706 × 9 % no llega a 7 UIT: sin quinta. Neto 1,177.11." },
    fecha: "2026-10-01",
    entrada: { ...base, asignacionFamiliar: true, sueldo: 1230, sistema: "onp", afp: "habitat", esquema: "saldo" },
    esperado: { bruto: 1353, onp: 175.89, quinta: 0, neto: 1177.11 },
  },
  {
    nombre: "Sueldo por encima de la remuneración máxima asegurable",
    origen: {
      tipo: "recalculado",
      detalle:
        "Prima sobre el tope de 12,732.70: 1.37 % = 174.44. Aporte 2,000. Quinta: 283,600 − 38,500 = 245,100; impuesto 2,200 + 11,550 + 14,025 + 52,600 × 20 % = 38,295; por mes 3,191.25. Neto 20,000 − 2,174.44 − 3,191.25 = 14,634.31.",
    },
    fecha: "2026-10-07",
    entrada: { ...base, sueldo: 20000, sistema: "afp", afp: "prima", esquema: "saldo" },
    esperado: { primaSeguro: 174.44, pension: 2174.44, quinta: 3191.25, neto: 14634.31 },
  },
]);
