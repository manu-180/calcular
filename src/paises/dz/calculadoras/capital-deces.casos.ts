import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-deces";

const ORD9617 = "https://www.joradp.dz/FTP/jo-francais/1996/F1996042.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Salaire de 60 000 DA",
    origen: { tipo: "recalculado", url: ORD9617, detalle: "Article 48 : 12 × 60 000 = 720 000, au-dessus du minimum de 12 × 24 000 = 288 000." },
    fecha: "2026-10-27",
    entrada: { salaire: 60000 },
    esperado: { capital: 720000, calcule: 720000, minimum: 288000 },
  },
  {
    nombre: "Temps partiel à 15 000 DA",
    origen: { tipo: "recalculado", url: ORD9617, detalle: "12 × 15 000 = 180 000, porté au minimum de 288 000." },
    fecha: "2026-10-27",
    entrada: { salaire: 15000 },
    esperado: { capital: 288000, calcule: 180000 },
  },
]);
