import { definirCasos } from "@/motor/calculo";
import calculadora from "./hatzmada-lamadad";

export default definirCasos(calculadora, [
  {
    nombre: "10.000 de enero de 2020 a septiembre de 2026",
    origen: { tipo: "recalculado", detalle: "Serie CP_1951 del BOI: 40.769.000,6 / 34.074.871,95 = 1,196454. 10.000 x 1,196454 = 11.964,54." },
    fecha: "2026-10-24",
    entrada: { schum: 10000, me: "2020-01-15", ad: "2026-09-30" },
    esperado: { metuam: 11964.54, hefresh: 1964.54 },
    tolerancia: 0.01,
  },
  {
    nombre: "Pedido hasta hoy: corta en el último índice publicado",
    origen: { tipo: "recalculado", detalle: "Octubre de 2026 todavía no se publicó: se usa septiembre. 40.769.000,6 / 40.110.811,61 = 1,016409." },
    fecha: "2026-10-24",
    entrada: { schum: 10000, me: "2025-09-01", ad: "2026-10-24" },
    esperado: { metuam: 10164.09, chodeshAd: "ספטמבר 2026" },
    tolerancia: 0.01,
  },
  {
    nombre: "Un año: enero de 2024 a enero de 2025",
    origen: { tipo: "recalculado", detalle: "39.297.754,61 / 37.851.815,27 = 1,0382: 3,82 %." },
    fecha: "2026-10-24",
    entrada: { schum: 10000, me: "2024-01-01", ad: "2025-01-01" },
    esperado: { metuam: 10382, shinui: 3.82 },
    tolerancia: 0.01,
  },
  {
    nombre: "Mes base sin publicar",
    origen: { tipo: "recalculado", detalle: "Noviembre de 2026 no tiene índice al 24/10/2026." },
    fecha: "2026-10-24",
    entrada: { schum: 10000, me: "2026-11-01", ad: "2026-11-01" },
    esperaError: true,
  },
]);
