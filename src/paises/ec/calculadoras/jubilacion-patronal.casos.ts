import { definirCasos } from "@/motor/calculo";
import jubilacionPatronal from "./jubilacion-patronal";

export default definirCasos(jubilacionPatronal, [
  {
    nombre: "25 años con promedio anual de 12.000",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 216 del Código del Trabajo. Haber: 5 % × 12.000 × 25 = 15.000. Fondo global mínimo: 50 % × 482 × 25 = 6.025. Con doble jubilación, pensión mínima 20; máxima un salario básico, 482.",
    },
    fecha: "2026-10-07",
    entrada: { anios: 25, promedio: 12000, basicoPuesto: null, doble: true },
    esperado: { derecho: "Sí", haber: 15000, fondoGlobalMinimo: 6025, pensionMinima: 20, pensionMaxima: 482 },
  },
  {
    nombre: "22 años: todavía sin derecho pleno",
    origen: { tipo: "recalculado", detalle: "Haber 5 % × 8.000 × 22 = 8.800. Mínimo del fondo global 50 % × 600 × 22 = 6.600. Solo jubilación patronal: mínimo 30." },
    fecha: "2026-10-07",
    entrada: { anios: 22, promedio: 8000, basicoPuesto: 600, doble: false },
    esperado: { derecho: "Todavía no", haber: 8800, fondoGlobalMinimo: 6600, pensionMinima: 30 },
  },
]);
