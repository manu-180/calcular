import { definirCasos } from "@/motor/calculo";
import trabajadora from "./trabajadora-del-hogar";

export default definirCasos(trabajadora, [
  {
    nombre: "Remuneración de S/ 1500 a tiempo completo, EsSalud y ONP",
    origen: {
      tipo: "oficial",
      url: "https://cdn.www.gob.pe/uploads/document/file/6164481/5438449-derechos-de-las-personas-trabajadoras-del-hogar-guia-practica-para-personas-empleadoras.pdf",
      detalle:
        "Guía del MTPE: con el semestre completo la gratificación es una remuneración (S/ 1500) y la bonificación extraordinaria 9 % de la gratificación; la CTS se calcula con la remuneración computable (básica + 1/6 de la gratificación) × meses / 12; EsSalud 9 % de la remuneración. ONP 13 % = 195; neto 1305. BE = 135. CTS = (1500 + 250) × 6 / 12 = 875. EsSalud 135. Costo anual = 1500 × 12 + 135 × 12 + (1500 + 135) × 2 + 875 × 2 = 24 640; al mes 2053.33.",
    },
    fecha: "2026-10-08",
    entrada: { sueldo: 1500, jornada: "completo", seguro: "essalud", sistema: "onp", afp: "habitat", esquema: "saldo" },
    esperado: { pension: 195, neto: 1305, essalud: 135, gratificacion: 1500, bonificacion: 135, cts: 875, vacaciones: 30, costoAnual: 24640, costoMensual: 2053.33 },
  },
  {
    nombre: "Tiempo parcial con S/ 600 al mes",
    origen: {
      tipo: "recalculado",
      detalle:
        "Con menos de 24 horas por semana: sin CTS, 6 días de vacaciones y EsSalud sobre la RMV porque gana menos que ella (9 % de 1230 = 110.70, regla de la SUNAT para trabajadores del hogar). ONP 13 % de 600 = 78. Gratificación 600 y BE 54. Costo anual = 7200 + 1328.40 + 1308 = 9836.40.",
    },
    fecha: "2026-10-08",
    entrada: { sueldo: 600, jornada: "parcial", seguro: "essalud", sistema: "onp", afp: "habitat", esquema: "saldo" },
    esperado: { pension: 78, neto: 522, essalud: 110.7, bonificacion: 54, cts: 0, vacaciones: 6, costoAnual: 9836.4, costoMensual: 819.7 },
  },
  {
    nombre: "AFP Integra con comisión sobre el sueldo y EPS",
    origen: {
      tipo: "recalculado",
      detalle:
        "S/ 1230 (RMV desde octubre 2026). AFP: 10 % = 123; prima 1.37 % = 16.85; comisión flujo Integra 1.55 % = 19.07; total 158.92. Con EPS la bonificación es 6.75 % de 1230 = 83.03.",
    },
    fecha: "2026-10-08",
    entrada: { sueldo: 1230, jornada: "completo", seguro: "eps", sistema: "afp", afp: "integra", esquema: "flujo" },
    esperado: { pension: 158.92, neto: 1071.08, bonificacion: 83.03 },
  },
]);
