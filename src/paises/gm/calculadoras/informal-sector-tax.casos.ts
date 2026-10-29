import { definirCasos } from "@/motor/calculo";
import calculadora from "./informal-sector-tax";

const FOLLETO = "https://www.gra.gm/download-file/8d0cb474-d217-11ed-9b31-029254d29bb1";

export default definirCasos(calculadora, [
  {
    nombre: "Barber",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "Barbers: D2,000 a year." },
    fecha: "2026-10-27",
    entrada: { oficio: "barbers", cuotas: 1 },
    esperado: { anual: 2000, cuota: 2000 },
  },
  {
    nombre: "Foreign exchange bureau in four instalments",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "Foreign exchange bureaus: D30,000 a year, 7,500 in each of four instalments." },
    fecha: "2026-10-27",
    entrada: { oficio: "forex-bureaus", cuotas: 4 },
    esperado: { anual: 30000, cuota: 7500 },
  },
  {
    nombre: "Tailor with two machines",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "Tailors, 2 machines: D2,500 a year." },
    fecha: "2026-10-27",
    entrada: { oficio: "tailors-2", cuotas: 1 },
    esperado: { anual: 2500, mensual: 208.33 },
  },
]);
