import { definirCasos } from "@/motor/calculo";
import valorIas from "./valor-ias";

const PORTARIA = "https://www.madeira.gov.pt//Portals/35/Users/116/72/372/10.%20Portaria%20n.%20480-A_2025_1%2C%20de%2030%20de%20dezembro.pdf";

export default definirCasos(valorIas, [
  {
    nombre: "Um IAS em 2026",
    origen: { tipo: "oficial", url: PORTARIA, detalle: "Artigo 2.º da Portaria n.º 480-A/2025/1: o IAS de 2026 é 537,13 €." },
    fecha: "2026-10-14",
    entrada: { multiplo: 1 },
    esperado: { mensal: 537.13, anual12: 6445.56, anual14: 7519.82 },
  },
  {
    nombre: "2,5 IAS",
    origen: { tipo: "recalculado", url: PORTARIA, detalle: "2,5 × 537,13 = 1342,825 → 1342,83." },
    fecha: "2026-10-14",
    entrada: { multiplo: 2.5 },
    esperado: { mensal: 1342.83 },
  },
]);
