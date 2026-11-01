import { definirCasos } from "@/motor/calculo";
import calculadora from "./zakat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Ejemplo del dinero de la guía de ZATCA",
    origen: {
      tipo: "oficial",
      url: "https://zatca.gov.sa/ar/HelpCenter/guidelines/Documents/Simplified-Zakat-Individual.pdf",
      detalle: "La guía: 7.500 riyales todo el año -> 7.500 / 40 = 187,5. Con plata a 5 el gramo el نصاب es 595 x 5 = 2.975.",
    },
    fecha: "2026-10-24",
    entrada: { efectivo: 7500, metales: 0, inversiones: 0, metal: "silver", precioGramo: 5 },
    esperado: { zakat: 187.5, nisab: 2975, gramos: 595 },
  },
  {
    nombre: "Debajo del نصاب del oro",
    origen: { tipo: "recalculado", detalle: "85 g x 400 = 34.000. Patrimonio 30.000 < 34.000: nada." },
    fecha: "2026-10-24",
    entrada: { efectivo: 20000, metales: 5000, inversiones: 5000, metal: "gold", precioGramo: 400 },
    esperado: { zakat: 0, nisab: 34000, patrimonio: 30000 },
  },
  {
    nombre: "Varios bienes sobre el نصاب",
    origen: { tipo: "recalculado", detalle: "50.000 + 10.000 + 40.000 = 100.000 x 2,5 % = 2.500." },
    fecha: "2026-10-24",
    entrada: { efectivo: 50000, metales: 10000, inversiones: 40000, metal: "silver", precioGramo: 6 },
    esperado: { zakat: 2500, patrimonio: 100000 },
  },
  {
    nombre: "Sin precio del gramo",
    origen: { tipo: "recalculado", detalle: "Precio 0." },
    fecha: "2026-10-24",
    entrada: { efectivo: 50000, metales: 0, inversiones: 0, metal: "silver", precioGramo: 0 },
    esperaError: true,
  },
]);
