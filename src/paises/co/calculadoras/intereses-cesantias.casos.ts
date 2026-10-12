import { definirCasos } from "@/motor/calculo";
import interesesCesantias from "./intereses-cesantias";

export default definirCasos(interesesCesantias, [
  {
    nombre: "Año completo con cesantías de 2.000.000",
    origen: { tipo: "recalculado", detalle: "Ley 52 de 1975 y Ley 50 de 1990, art. 99: 12 % anual. 2.000.000 × 12 % × 360 / 360 = 240.000." },
    fecha: "2026-10-15",
    entrada: { cesantias: 2000000, dias: 360 },
    esperado: { tasaProporcional: 12, intereses: 240000 },
  },
  {
    nombre: "Medio año trabajado",
    origen: { tipo: "recalculado", detalle: "Cesantías de 1.000.000 por 180 días: tasa 12 % × 180 / 360 = 6 %. Intereses 60.000." },
    fecha: "2026-10-15",
    entrada: { cesantias: 1000000, dias: 180 },
    esperado: { tasaProporcional: 6, intereses: 60000 },
  },
  {
    nombre: "Un solo día",
    origen: { tipo: "recalculado", detalle: "Cesantías de 5.000 por un día: 5.000 × 12 % / 360 = 1,67, que redondea a 2 pesos." },
    fecha: "2026-10-15",
    entrada: { cesantias: 5000, dias: 1 },
    esperado: { intereses: 2 },
  },
  {
    nombre: "Más de 360 días",
    origen: { tipo: "recalculado", detalle: "El año comercial tiene 360 días: 400 es un error." },
    fecha: "2026-10-15",
    entrada: { cesantias: 1000000, dias: 400 },
    esperaError: true,
  },
]);
