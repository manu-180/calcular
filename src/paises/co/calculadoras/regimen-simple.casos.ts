import { definirCasos } from "@/motor/calculo";
import regimenSimple from "./regimen-simple";

export default definirCasos(regimenSimple, [
  {
    nombre: "Comercio con 300 millones al año",
    origen: {
      tipo: "recalculado",
      detalle: "UVT 2026 = 52.374. 300.000.000 / 52.374 = 5.728 UVT, menos de 6.000: tarifa 1,6 % (ET art. 908, num. 2). Impuesto 4.800.000; por bimestre 800.000.",
    },
    fecha: "2026-10-08",
    entrada: { ingresos: 300000000, actividad: "comercio" },
    esperado: { tarifa: 1.6, impuesto: 4800000, total: 4800000, porBimestre: 800000 },
  },
  {
    nombre: "Tienda justo en 6.000 UVT: cambia de tramo",
    origen: { tipo: "recalculado", detalle: "6.000 × 52.374 = 314.244.000. Desde 6.000 UVT (igual o superior) la tarifa es 2,8 %: 8.798.832." },
    fecha: "2026-10-08",
    entrada: { ingresos: 314244000, actividad: "tiendas" },
    esperado: { tarifa: 2.8, impuesto: 8798832 },
  },
  {
    nombre: "Restaurante con 500 millones: SIMPLE más impuesto al consumo",
    origen: {
      tipo: "recalculado",
      detalle: "500.000.000 = 9.546,7 UVT: tarifa 3,4 % (num. 3) = 17.000.000, más 8 % de impuesto al consumo (parágrafo 1) = 40.000.000. Total 57.000.000.",
    },
    fecha: "2026-10-08",
    entrada: { ingresos: 500000000, actividad: "comidas" },
    esperado: { tarifa: 3.4, impuesto: 17000000, impoconsumo: 40000000, total: 57000000 },
  },
  {
    nombre: "Ingresos sobre el límite de 100.000 UVT",
    origen: { tipo: "recalculado", detalle: "100.000 × 52.374 = 5.237.400.000 (ET art. 905). Con 6.000 millones no se puede estar en el SIMPLE." },
    fecha: "2026-10-08",
    entrada: { ingresos: 6000000000, actividad: "comercio" },
    esperado: { tarifa: null, total: null },
  },
]);
