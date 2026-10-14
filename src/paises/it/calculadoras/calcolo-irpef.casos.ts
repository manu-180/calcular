import { definirCasos } from "@/motor/calculo";
import irpef from "./calcolo-irpef";

export default definirCasos(irpef, [
  {
    nombre: "Dipendente con 30.000 euro nel 2026",
    origen: {
      tipo: "recalculado",
      detalle: "6.440 + 2.000 × 33% = 7.100; detrazione 1.910 × 20.000 / 22.000 = 1.736,36 + 65 = 1.801,36; cuneo 1.000; netta 4.298,64; media 14,33%.",
    },
    fecha: "2026-05-01",
    entrada: { reddito: 30000, tipo: "dipendente" },
    esperado: { lorda: 7100, detrazione: 1801.36, ulteriore: 1000, netta: 4298.64, media: 14.33, marginale: 33 },
  },
  {
    nombre: "Stesso reddito nel 2025, con il 35%",
    origen: { tipo: "recalculado", detalle: "6.440 + 2.000 × 35% = 7.140; netta 7.140 − 1.801,36 − 1.000 = 4.338,64; media 14,46%." },
    fecha: "2025-12-31",
    entrada: { reddito: 30000, tipo: "dipendente" },
    esperado: { lorda: 7140, netta: 4338.64, media: 14.46, marginale: 35 },
  },
  {
    nombre: "Pensione di 20.000 euro",
    origen: { tipo: "recalculado", detalle: "Lorda 4.600; detrazione 700 + 1.255 × 8.000 / 19.500 = 1.214,87; netta 3.385,13." },
    fecha: "2026-05-01",
    entrada: { reddito: 20000, tipo: "pensione" },
    esperado: { lorda: 4600, detrazione: 1214.87, ulteriore: 0, netta: 3385.13, marginale: 23 },
  },
  {
    nombre: "Altri redditi per 60.000 euro, senza detrazioni",
    origen: { tipo: "recalculado", detalle: "6.440 + 22.000 × 33% + 10.000 × 43% = 18.000; media 30%." },
    fecha: "2026-05-01",
    entrada: { reddito: 60000, tipo: "altro" },
    esperado: { lorda: 18000, detrazione: 0, netta: 18000, media: 30, marginale: 43 },
  },
  {
    nombre: "Dipendente con 10.000 euro, detrazione piena",
    origen: { tipo: "recalculado", detalle: "Lorda 2.300; detrazione 1.955; netta 345." },
    fecha: "2026-05-01",
    entrada: { reddito: 10000, tipo: "dipendente" },
    esperado: { lorda: 2300, detrazione: 1955, netta: 345 },
  },
  {
    nombre: "Dipendente con 8.000 euro: no tax area",
    origen: { tipo: "recalculado", detalle: "Lorda 1.840 e detrazione 1.955: l'IRPEF netta è zero." },
    fecha: "2026-05-01",
    entrada: { reddito: 8000, tipo: "dipendente" },
    esperado: { lorda: 1840, netta: 0 },
  },
]);
