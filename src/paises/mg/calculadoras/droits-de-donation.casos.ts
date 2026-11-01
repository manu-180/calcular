import { definirCasos } from "@/motor/calculo";
import calculadora from "./droits-de-donation";

const F = "2026-10-27";
const CDI = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Donation à deux enfants",
    origen: { tipo: "recalculado", url: CDI, detalle: "Article 02.03.25, II : droit fixe de 40 000 par donataire en ligne directe descendante, soit 80 000." },
    fecha: F,
    entrada: { lien: "descendant", valeur: 50000000, donataires: 2 },
    esperado: { total: 80000, parDonataire: 40000 },
  },
  {
    nombre: "Donation de 20 000 000 Ar à un neveu",
    origen: { tipo: "recalculado", url: CDI, detalle: "5 % × 20 000 000 = 1 000 000." },
    fecha: F,
    entrada: { lien: "autre", valeur: 20000000, donataires: 1 },
    esperado: { total: 1000000 },
  },
]);
