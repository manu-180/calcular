import { definirCasos } from "@/motor/calculo";
import calculadora from "./vignette-automobile";

const LF2016 = "https://www.joradp.dz/FTP/jo-francais/2015/F2015072.pdf" as const;
const LF2025 = "https://www.joradp.dz/FTP/jo-francais/2024/F2024084.pdf" as const;
const LF2026 = "https://www.joradp.dz/FTP/jo-francais/2025/F2025088.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "5 CV de moins de 3 ans",
    origen: { tipo: "oficial", url: LF2016, detalle: "Article 300 du code du timbre : jusqu'à 6 CV, moins de 3 ans, 2 000 DA." },
    fecha: "2026-10-27",
    entrada: { puissance: "6", age: "moins-3", energie: "thermique" },
    esperado: { montant: 2000 },
  },
  {
    nombre: "8 CV de plus de 10 ans",
    origen: { tipo: "oficial", url: LF2016, detalle: "De 7 à 9 CV, plus de 10 ans : 1 500 DA." },
    fecha: "2026-10-27",
    entrada: { puissance: "9", age: "plus-10", energie: "thermique" },
    esperado: { montant: 1500 },
  },
  {
    nombre: "12 CV de 4 ans",
    origen: { tipo: "oficial", url: LF2025, detalle: "LF 2025, article 55 : 10 CV et plus, de 3 à 6 ans, 20 000 DA." },
    fecha: "2026-10-27",
    entrada: { puissance: "10", age: "3-6", energie: "thermique" },
    esperado: { montant: 20000 },
  },
  {
    nombre: "Hybride de 10 CV, exemptée",
    origen: { tipo: "oficial", url: LF2026, detalle: "LF 2026, article 50 : véhicules électriques et hybrides exemptés." },
    fecha: "2026-10-27",
    entrada: { puissance: "10", age: "moins-3", energie: "electrique" },
    esperado: { montant: 0, tarif: 25000 },
  },
]);
