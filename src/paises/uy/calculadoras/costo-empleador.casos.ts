import { definirCasos } from "@/motor/calculo";
import costoEmpleador from "./costo-empleador";

export default definirCasos(costoEmpleador, [
  {
    nombre: "Sueldo de $ 50.000 sin provisiones",
    origen: {
      tipo: "recalculado",
      url: "https://www.bps.gub.uy/835/tasas.html",
      detalle: "Jubilatorio 7,5 % = 3.750; Fonasa 5 % = 2.500; FRL 0,1 % = 50; FGCL 0,025 % = 12,50. Cargas 6.312,50 (12,625 %). Costo 56.312,50.",
    },
    fecha: "2026-10-12",
    entrada: { nominal: 50000, provisiones: false, antiguedad: 1 },
    esperado: { jubilatorio: 3750, fonasa: 2500, frl: 50, fgcl: 12.5, cargasSueldo: 6312.5, aguinaldo: null, costo: 56312.5, sobreNominal: 12.625 },
  },
  {
    nombre: "Sueldo de $ 50.000 con aguinaldo y licencia",
    origen: {
      tipo: "recalculado",
      detalle: "Aguinaldo 50.000 / 12 = 4.166,67. Licencia 50.000 / 30 × 20 / 12 = 2.777,78. Cargas sobre 6.944,45 al 12,625 % = 876,74. Costo 50.000 + 6.312,50 + 4.166,67 + 2.777,78 + 876,74 = 64.133,69.",
    },
    fecha: "2026-10-12",
    entrada: { nominal: 50000, provisiones: true, antiguedad: 1 },
    esperado: { aguinaldo: 4166.67, licencia: 2777.78, cargasProvisiones: 876.74, costo: 64133.69 },
  },
  {
    nombre: "Sueldo sobre el tope de aportación",
    origen: {
      tipo: "recalculado",
      url: "https://www.impo.com.uy/bases/leyes/16713-1995/14",
      detalle: "Ley 16.713, art. 14 A: el patronal jubilatorio se paga hasta el tope (288.836): 21.662,70. Fonasa 15.000, FRL 300, FGCL 75. Cargas 37.037,70.",
    },
    fecha: "2026-10-12",
    entrada: { nominal: 300000, provisiones: false, antiguedad: 1 },
    esperado: { jubilatorio: 21662.7, cargasSueldo: 37037.7, costo: 337037.7 },
  },
]);
