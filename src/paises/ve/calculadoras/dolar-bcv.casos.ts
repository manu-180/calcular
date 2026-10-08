import { definirCasos } from "@/motor/calculo";
import dolarBcv from "./dolar-bcv";

export default definirCasos(dolarBcv, [
  {
    nombre: "100 dólares con la tasa del 8 de octubre de 2026",
    origen: { tipo: "oficial", url: "https://www.bcv.org.ve/", detalle: "Portada del BCV, fecha valor jueves 8/10/2026: USD 874,73210000. 100 × 874,7321 = 87.473,21." },
    fecha: "2026-10-08",
    entrada: { direccion: "usd-a-bs", monto: 100 },
    esperado: { tasaDolar: 874.7321, fecha: "2026-10-08", bolivares: 87473.21, dolares: null, euros: null },
  },
  {
    nombre: "Un millón de bolívares a dólares el 7 de octubre",
    origen: { tipo: "recalculado", detalle: "Tasa fecha valor 7/10/2026: 873,867. 1.000.000 / 873,867 = 1.144,34." },
    fecha: "2026-10-07",
    entrada: { direccion: "bs-a-usd", monto: 1000000 },
    esperado: { tasaDolar: 873.867, dolares: 1144.34, bolivares: null },
  },
  {
    nombre: "Domingo sin tasa propia: rige la del viernes",
    origen: { tipo: "recalculado", detalle: "El 4/10/2026 rige la fecha valor 2/10/2026: 866,5612. 10 × 866,5612 = 8.665,61." },
    fecha: "2026-10-04",
    entrada: { direccion: "usd-a-bs", monto: 10 },
    esperado: { tasaDolar: 866.5612, fecha: "2026-10-02", bolivares: 8665.61 },
  },
  {
    nombre: "Euros a bolívares y bolívares a euros",
    origen: { tipo: "recalculado", detalle: "Euro fecha valor 7/10/2026: 984,26261811. 50 × 984,2626 = 49.213,13." },
    fecha: "2026-10-07",
    entrada: { direccion: "eur-a-bs", monto: 50 },
    esperado: { tasaEuro: 984.26261811, tasaDolar: null, bolivares: 49213.13 },
  },
  {
    nombre: "Bolívares a euros con la tasa del 8 de octubre",
    origen: { tipo: "recalculado", detalle: "Euro fecha valor 8/10/2026: 979,0788922. 10.000 / 979,0789 = 10,21." },
    fecha: "2026-10-08",
    entrada: { direccion: "bs-a-eur", monto: 10000 },
    esperado: { euros: 10.21 },
  },
]);
