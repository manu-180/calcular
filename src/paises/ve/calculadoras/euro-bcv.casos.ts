import { definirCasos } from "@/motor/calculo";
import euroBcv from "./euro-bcv";

const BCV = "https://www.bcv.org.ve/estadisticas/tipo-cambio-de-referencia-smc";

export default definirCasos(euroBcv, [
  {
    nombre: "€100 a bolívares con la tasa del 8 de octubre de 2026",
    origen: { tipo: "oficial", url: BCV, detalle: "Euro BCV fecha valor 08/10/2026: 979,0788922. 100 × 979,0788922 = 97.907,89." },
    fecha: "2026-10-08",
    entrada: { direccion: "eur-a-bs", monto: 100 },
    esperado: { tasaEuro: 979.0788922, tasaDolar: 874.7321, bolivares: 97907.89, euros: null, dolares: null },
  },
  {
    nombre: "Bs 100.000 a euros",
    origen: { tipo: "recalculado", detalle: "100.000 / 979,0788922 = 102,14." },
    fecha: "2026-10-08",
    entrada: { direccion: "bs-a-eur", monto: 100000 },
    esperado: { euros: 102.14, bolivares: null },
  },
  {
    nombre: "Cruce euro dólar del BCV",
    origen: { tipo: "recalculado", detalle: "979,0788922 / 874,7321 = 1,1193 dólares por euro. €100 = $111,93." },
    fecha: "2026-10-08",
    entrada: { direccion: "eur-a-usd", monto: 100 },
    esperado: { cruce: 1.1193, dolares: 111.93 },
    tolerancia: 0.0001,
  },
]);
