import { definirCasos } from "@/motor/calculo";
import uvr from "./uvr";

export default definirCasos(uvr, [
  {
    nombre: "100.000 UVR el 7 de octubre de 2026",
    origen: {
      tipo: "oficial",
      url: "https://totoro.banrep.gov.co/nsi-jax-ws/rest/data/ESTAT,DF_UVR_DAILY_HIST,1.0/all/ALL?detail=dataonly&dimensionAtObservation=TIME_PERIOD&lastNObservations=20",
      detalle: "UVR del 7/10/2026 según el Banco de la República: 419,2333. 100.000 × 419,2333 = 41.923.330.",
    },
    fecha: "2026-10-07",
    entrada: { direccion: "uvr-a-pesos", cantidad: 100000 },
    esperado: { uvr: 419.2333, fecha: "2026-10-07", pesos: 41923330 },
  },
  {
    nombre: "Un millón de pesos en UVR el 15 de octubre (valor publicado por adelantado)",
    origen: { tipo: "recalculado", detalle: "UVR del 15/10/2026: 419,6686. 1.000.000 / 419,6686 = 2.382,8325." },
    fecha: "2026-10-15",
    entrada: { direccion: "pesos-a-uvr", cantidad: 1000000 },
    esperado: { uvr: 419.6686, uvrs: 2382.8325 },
  },
]);
