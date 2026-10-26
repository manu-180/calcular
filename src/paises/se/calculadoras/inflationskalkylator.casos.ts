import { definirCasos } from "@/motor/calculo";
import inflationskalkylator from "./inflationskalkylator";

const SCB = "https://statistikdatabasen.scb.se/api/v2/tables/TAB6792/data?lang=sv&valueCodes[ContentsCode]=000007MM&valueCodes[Tid]=*&outputFormat=json-stat2";

export default definirCasos(inflationskalkylator, [
  {
    nombre: "1 000 kr i januari 2000 till september 2026",
    origen: { tipo: "recalculado", url: SCB, detalle: "KPI januari 2000 = 257,5 och september 2026 = 423,06. 1 000 × 423,06 / 257,5 = 1 642,95 kr." },
    fecha: "2026-10-24",
    entrada: { belopp: 1000, fran: "2000-01-01", till: "2026-09-15" },
    esperado: { motsvarar: 1642.95, indexFran: 257.5, indexTill: 423.06 },
  },
  {
    nombre: "Inflationen på ett år, september 2025 till september 2026",
    origen: { tipo: "recalculado", url: SCB, detalle: "423,06 / 418,26 = 1,01148, alltså 1,15 %." },
    fecha: "2026-10-24",
    entrada: { belopp: 10000, fran: "2025-09-01", till: "2026-09-01" },
    esperado: { motsvarar: 10114.76, forandring: 1.1476 },
    tolerancia: 0.01,
  },
  {
    nombre: "Slutmånad som SCB inte har publicerat",
    origen: { tipo: "recalculado", url: SCB, detalle: "Senaste KPI är september 2026. December 2026 räknas som september." },
    fecha: "2026-10-24",
    entrada: { belopp: 1000, fran: "2020-01-01", till: "2026-12-01" },
    esperado: { indexFran: 332.82, indexTill: 423.06, manadTill: "september 2026" },
  },
  {
    nombre: "Startmånad efter slutmånad",
    origen: { tipo: "recalculado", url: SCB, detalle: "Startmånaden måste komma först." },
    fecha: "2026-10-24",
    entrada: { belopp: 1000, fran: "2026-05-01", till: "2020-01-01" },
    esperaError: true,
  },
]);
