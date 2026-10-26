import { definirCasos } from "@/motor/calculo";
import politaDeAsigurareMedicala from "./polita-de-asigurare-medicala";

const LEGE = "https://monitorul.gov.md/ro/monitorul/view/pdf/3204/part/1";

export default definirCasos(politaDeAsigurareMedicala, [
  {
    nombre: "O persoană, suma fixă generală",
    origen: { tipo: "oficial", url: LEGE, detalle: "Legea nr. 321/2025, art. 4 alin. (2): prima în sumă fixă este 12.636 de lei. Pe lună: 1.053." },
    fecha: "2026-10-26",
    entrada: { categorie: "generala", persoane: 1 },
    esperado: { total: 12636, peLuna: 1053 },
  },
  {
    nombre: "Două persoane din categoriile cu suma redusă",
    origen: { tipo: "oficial", url: LEGE, detalle: "Legea nr. 321/2025, art. 4 alin. (3): 2.527 de lei. 2 × 2.527 = 5.054." },
    fecha: "2026-10-26",
    entrada: { categorie: "redusa", persoane: 2 },
    esperado: { total: 5054, suma: 2527 },
  },
  {
    nombre: "Zero persoane",
    origen: { tipo: "recalculado", url: LEGE, detalle: "Polița se cumpără pentru cel puțin o persoană." },
    fecha: "2026-10-26",
    entrada: { categorie: "generala", persoane: 0 },
    esperaError: true,
  },
]);
