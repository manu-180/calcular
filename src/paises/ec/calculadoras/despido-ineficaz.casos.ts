import { definirCasos } from "@/motor/calculo";
import despidoIneficaz from "./despido-ineficaz";

export default definirCasos(despidoIneficaz, [
  {
    nombre: "Trabajadora embarazada con 2 años y 8 meses",
    origen: {
      tipo: "recalculado",
      detalle:
        "Art. 188, 185 y 195.3 del Código del Trabajo. Del 15/1/2024 al 30/9/2026: hasta tres años, 3 × 800 = 2.400. Desahucio 200 × 2 = 400. Un año de remuneración 12 × 800 = 9.600. Total 12.400. Si vuelve: 2 meses × 800 = 1.600 + 10 % = 1.760.",
    },
    fecha: "2026-10-07",
    entrada: { motivo: "embarazo", inicio: "2024-01-15", salida: "2026-09-30", remuneracion: 800, mesesPendientes: 2 },
    esperado: { despido: 2400, desahucio: 400, adicional: 9600, total: 12400, reintegro: 1760 },
  },
  {
    nombre: "Despido discriminatorio con 11 años y 9 meses",
    origen: {
      tipo: "recalculado",
      detalle: "Del 1/1/2015 al 30/9/2026: 11 años + fracción = 12 meses × 1.000 = 12.000. Desahucio 250 × 11 = 2.750. Adicional 12.000. Total 26.750. Sin reintegro.",
    },
    fecha: "2026-10-07",
    entrada: { motivo: "discriminacion", inicio: "2015-01-01", salida: "2026-09-30", remuneracion: 1000, mesesPendientes: 0 },
    esperado: { despido: 12000, desahucio: 2750, adicional: 12000, total: 26750, reintegro: null },
  },
  {
    nombre: "Despido anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible: tiene que dar error." },
    fecha: "2026-10-07",
    entrada: { motivo: "dirigente", inicio: "2026-05-01", salida: "2026-04-30", remuneracion: 800, mesesPendientes: 0 },
    esperaError: true,
  },
]);
