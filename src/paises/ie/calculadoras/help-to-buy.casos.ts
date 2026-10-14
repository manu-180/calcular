import { definirCasos } from "@/motor/calculo";
import calculadora from "./help-to-buy";

export default definirCasos(calculadora, [
  {
    nombre: "€400,000 home after 7 October 2026",
    origen: { tipo: "recalculado", detalle: "Lesser of €35,000, 10% of 400,000 = 40,000 and tax paid 50,000: €35,000." },
    fecha: "2026-10-14",
    entrada: { precio: 400000, hipoteca: 320000, impuestos: 50000 },
    esperado: { reembolso: 35000, porcentaje: 40000, maximo: 35000 },
  },
  {
    nombre: "Same home before 7 October 2026",
    origen: { tipo: "recalculado", detalle: "Under the enhanced scheme the cap was €30,000." },
    fecha: "2026-06-15",
    entrada: { precio: 400000, hipoteca: 320000, impuestos: 50000 },
    esperado: { reembolso: 30000, maximo: 30000 },
  },
  {
    nombre: "Limited by tax paid",
    origen: { tipo: "recalculado", detalle: "Lesser of 35,000, 30,000 (10% of 300,000) and 18,500 of tax: €18,500." },
    fecha: "2026-10-14",
    entrada: { precio: 300000, hipoteca: 270000, impuestos: 18500 },
    esperado: { reembolso: 18500 },
  },
  {
    nombre: "Price over €500,000",
    origen: { tipo: "recalculado", detalle: "The purchase value must be €500,000 or less." },
    fecha: "2026-10-14",
    entrada: { precio: 520000, hipoteca: 450000, impuestos: 60000 },
    esperado: { reembolso: 0 },
  },
  {
    nombre: "Mortgage under 70%",
    origen: { tipo: "recalculado", detalle: "70% of 400,000 is 280,000; a 240,000 mortgage does not qualify." },
    fecha: "2026-10-14",
    entrada: { precio: 400000, hipoteca: 240000, impuestos: 50000 },
    esperado: { reembolso: 0, minimaHipoteca: 280000 },
  },
]);
