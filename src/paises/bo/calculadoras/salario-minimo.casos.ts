import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

export default definirCasos(salarioMinimo, [
  {
    nombre: "Salario mínimo 2026 con el TCO del 7/10/2026",
    origen: {
      tipo: "oficial",
      url: "https://www.impuestos.gob.bo/wp-content/uploads/2026/02/DS-5516.pdf",
      detalle: "D.S. 5516, art. 23: Bs 3.300. Diario 3.300 / 30 = 110; hora 110 / 8 = 13,75. TCO del BCB del 7/10/2026: 11,97; 3.300 / 11,97 = 275,69 dólares.",
    },
    fecha: "2026-10-07",
    entrada: { haberBasico: null },
    esperado: { mensual: 3300, diario: 110, hora: 13.75, enDolares: 275.69, faltante: null },
  },
  {
    nombre: "Haber básico por debajo del mínimo",
    origen: { tipo: "recalculado", detalle: "3.300 menos un haber básico de 3.000 = 300 que el empleador tiene que nivelar." },
    fecha: "2026-10-07",
    entrada: { haberBasico: 3000 },
    esperado: { faltante: 300 },
  },
  {
    nombre: "Haber básico igual al mínimo",
    origen: { tipo: "recalculado", detalle: "3.300 menos 3.300 = 0: alcanza el mínimo." },
    fecha: "2026-10-07",
    entrada: { haberBasico: 3300 },
    esperado: { faltante: 0 },
  },
  {
    nombre: "Último día del tramo 2025",
    origen: {
      tipo: "oficial",
      url: "https://www.impuestos.gob.bo/wp-content/uploads/2025/09/DS-5383.pdf",
      detalle: "D.S. 5383, art. 7: Bs 2.750. Diario 91,67; hora 11,46. Con el tipo de cambio fijo de 6,86 que publicaba el BCB antes de la flexibilización (tabla del 25/6/2026): 400,87 dólares.",
    },
    fecha: "2025-12-31",
    entrada: { haberBasico: null },
    valores: { "bo.salario-minimo": 2750, "bo.dolar": { fecha: "2025-12-31", valor: 6.86 } },
    esperado: { mensual: 2750, diario: 91.67, hora: 11.46, enDolares: 400.87 },
  },
]);
