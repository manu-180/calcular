import { definirCasos } from "@/motor/calculo";
import calculadora from "./emirati-minimum-wage";

const URL = "https://u.ae/en/information-and-services/jobs/Sector-of-employment/employment-in-the-private-sector/emiratis-employment-in-private-sector";

export default definirCasos(calculadora, [
  {
    nombre: "AED 5,500 is AED 500 short",
    origen: { tipo: "oficial", url: URL, detalle: "Minimum monthly wage for Emiratis in the private sector: AED 6,000 from 1 January 2026." },
    fecha: "2026-10-18",
    entrada: { salario: 5500 },
    esperado: { minimo: 6000, faltante: 500, anual: 6000 },
  },
  {
    nombre: "AED 7,000 meets it",
    origen: { tipo: "recalculado", detalle: "7,000 above 6,000." },
    fecha: "2026-10-18",
    entrada: { salario: 7000 },
    esperado: { faltante: 0 },
  },
]);
