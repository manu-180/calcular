import { definirCasos } from "@/motor/calculo";
import gastosPersonales from "./gastos-personales";

const sinGastos = { vivienda: 0, alimentacion: 0, educacion: 0, salud: 0, vestimenta: 0, turismo: 0 };

export default definirCasos(gastosPersonales, [
  {
    nombre: "Sin cargas, gastos por encima del tope",
    origen: {
      tipo: "oficial",
      url: "https://www.sri.gob.ec/o/sri-portlet-biblioteca-alfresco-internet/descargar/ea002a89-17d8-4cdf-be42-affedbe3f8d8/BOLET%C3%8DN%20006%20-%20SRI%20HABILITA%20LA%20PROYECCI%C3%93N%20DE%20GASTOS%20PERSONALES%202026%20PARA%20REDUCIR%20EL%20IMPUESTO%20A%20LA%20RENTA.pdf",
      detalle: "Boletín NAC-COM-26-006 del SRI: canasta de enero 2026 de 821,80. Sin cargas, 7 canastas = 5.752,60; rebaja 18 % = 1.035,47.",
    },
    fecha: "2026-10-07",
    entrada: { ...sinGastos, vivienda: 3600, alimentacion: 2400, salud: 500, cargas: "0", catastrofica: false },
    esperado: { gastos: 6500, canastas: 7, tope: 5752.6, deducibles: 5752.6, rebaja: 1035.47, rebajaMaxima: 1035.47 },
  },
  {
    nombre: "Dos cargas, gastos por debajo del tope",
    origen: { tipo: "recalculado", detalle: "11 canastas × 821,80 = 9.039,80. Gastos 4.000 por debajo: 18 % × 4.000 = 720." },
    fecha: "2026-10-07",
    entrada: { ...sinGastos, alimentacion: 2000, educacion: 1500, vestimenta: 500, cargas: "2", catastrofica: false },
    esperado: { canastas: 11, tope: 9039.8, rebaja: 720 },
  },
  {
    nombre: "Enfermedad catastrófica: 100 canastas",
    origen: { tipo: "recalculado", detalle: "100 × 821,80 = 82.180. Gastos 20.000: 18 % = 3.600." },
    fecha: "2026-10-07",
    entrada: { ...sinGastos, salud: 20000, cargas: "0", catastrofica: true },
    esperado: { canastas: 100, tope: 82180, rebaja: 3600 },
  },
]);
