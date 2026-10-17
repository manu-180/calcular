import { definirCasos } from "@/motor/calculo";
import calculadora from "./mileage-reimbursement";

export default definirCasos(calculadora, [
  {
    nombre: "Business trips in March 2026",
    origen: { tipo: "recalculado", url: "https://www.irs.gov/pub/irs-drop/n-26-10.pdf", detalle: "72.5 cents x 1000 miles = 725." },
    fecha: "2026-10-14",
    entrada: { millas: 1000, uso: "negocio", fecha: "2026-03-15" },
    esperado: { tarifa: 0.725, total: 725 },
  },
  {
    nombre: "Business trips on July 1, 2026",
    origen: { tipo: "recalculado", url: "https://www.irs.gov/pub/irs-irbs/irb26-29.pdf", detalle: "76 cents x 1000 miles = 760." },
    fecha: "2026-10-14",
    entrada: { millas: 1000, uso: "negocio", fecha: "2026-07-01" },
    esperado: { tarifa: 0.76, total: 760 },
  },
  {
    nombre: "Medical trips the day before the change",
    origen: { tipo: "recalculado", url: "https://www.irs.gov/pub/irs-drop/n-26-10.pdf", detalle: "20.5 cents x 250 = 51.25." },
    fecha: "2026-10-14",
    entrada: { millas: 250, uso: "medico", fecha: "2026-06-30" },
    esperado: { tarifa: 0.205, total: 51.25 },
  },
  {
    nombre: "Charity miles",
    origen: { tipo: "recalculado", url: "https://www.irs.gov/pub/irs-drop/n-26-10.pdf", detalle: "14 cents x 333 = 46.62." },
    fecha: "2026-10-14",
    entrada: { millas: 333, uso: "caridad", fecha: "2026-09-01" },
    esperado: { tarifa: 0.14, total: 46.62 },
  },
  {
    nombre: "A date with no loaded rate",
    origen: { tipo: "recalculado", detalle: "Business rates are loaded through December 31, 2026." },
    fecha: "2026-10-14",
    entrada: { millas: 100, uso: "negocio", fecha: "2027-02-01" },
    esperaError: true,
  },
]);
