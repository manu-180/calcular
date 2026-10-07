import { definirCasos } from "@/motor/calculo";
import valorUi from "./valor-ui";

export default definirCasos(valorUi, [
  {
    nombre: "1.000 UI a pesos el 7/10/2026",
    origen: {
      tipo: "oficial",
      url: "https://www.bcu.gub.uy/Estadisticas-e-Indicadores/Paginas/Cotizaciones.aspx",
      detalle: "UI del 7/10/2026 según el BCU (y el INE): 6,6560. 1.000 × 6,656 = 6.656.",
    },
    fecha: "2026-10-07",
    entrada: { unidad: "ui", sentido: "a-pesos", monto: 1000 },
    esperado: { valorUnidad: 6.656, fechaUi: "2026-10-07", pesos: 6656, enUnidad: null },
  },
  {
    nombre: "$ 100.000 a UI",
    origen: { tipo: "recalculado", detalle: "100.000 / 6,656 = 15.024,0385 UI." },
    fecha: "2026-10-07",
    entrada: { unidad: "ui", sentido: "desde-pesos", monto: 100000 },
    esperado: { enUnidad: 15024.0385, pesos: null },
    tolerancia: 0.0001,
  },
  {
    nombre: "3 BPC a pesos en 2026",
    origen: { tipo: "oficial", url: "https://www.impo.com.uy/bases/decretos/11-2026", detalle: "Decreto 11/026: BPC $ 6.864. 3 × 6.864 = 20.592." },
    fecha: "2026-10-07",
    entrada: { unidad: "bpc", sentido: "a-pesos", monto: 3 },
    esperado: { valorUnidad: 6864, pesos: 20592, fechaUi: null },
  },
  {
    nombre: "UI del primer día del mes",
    origen: { tipo: "oficial", url: "https://www.bcu.gub.uy/Estadisticas-e-Indicadores/Paginas/Cotizaciones.aspx", detalle: "UI del 1/10/2026: 6,6516." },
    fecha: "2026-10-01",
    entrada: { unidad: "ui", sentido: "a-pesos", monto: 1 },
    esperado: { valorUnidad: 6.6516, pesos: 6.65 },
  },
]);
