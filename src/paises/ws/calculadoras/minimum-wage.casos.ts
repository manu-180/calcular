import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

const URL = "https://www.mcil.gov.ws/services/employment";

export default definirCasos(calculadora, [
  {
    nombre: "Full-time week from 1 July 2026",
    origen: { tipo: "recalculado", url: URL, detalle: "5.24 × 40 = 209.60 a week, 419.20 a fortnight, 209.60 × 52 / 12 = 908.27 a month, 10,899.20 a year." },
    fecha: "2026-10-29",
    entrada: { horas: 40, pagaHora: null },
    esperado: { hora: 5.24, semanal: 209.6, quincenal: 419.2, mensual: 908.27, anual: 10899.2 },
  },
  {
    nombre: "Pay of WST 5.00 an hour",
    origen: { tipo: "recalculado", url: URL, detalle: "5.00 − 5.24 = −0.24." },
    fecha: "2026-10-29",
    entrada: { horas: 40, pagaHora: 5 },
    esperado: { diferencia: -0.24 },
  },
  {
    nombre: "Rate from 1 July 2027",
    origen: { tipo: "recalculado", url: URL, detalle: "The notice sets WST 5.65 an hour from 1 July 2027. 5.65 × 40 = 226." },
    fecha: "2027-07-01",
    entrada: { horas: 40, pagaHora: null },
    esperado: { hora: 5.65, semanal: 226 },
  },
]);
