import { definirCasos } from "@/motor/calculo";
import calculadora from "./taxe-sur-les-assurances";

const F = "2026-10-27";
const CDI = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Assurance automobile de 500 000 Ar",
    origen: { tipo: "recalculado", url: CDI, detalle: "Article 02.06.02, 5° : 4,5 % × 500 000 = 22 500." },
    fecha: F,
    entrada: { contrat: "autres", prime: 500000 },
    esperado: { taxe: 22500, total: 522500 },
  },
  {
    nombre: "Assurance incendie d'une maison",
    origen: { tipo: "recalculado", url: CDI, detalle: "Incendie, autres cas : 20 % × 300 000 = 60 000." },
    fecha: F,
    entrada: { contrat: "incendie-autres", prime: 300000 },
    esperado: { taxe: 60000 },
  },
  {
    nombre: "Assurance vie",
    origen: { tipo: "recalculado", url: CDI, detalle: "3 % × 1 000 000 = 30 000." },
    fecha: F,
    entrada: { contrat: "vie", prime: 1000000 },
    esperado: { taxe: 30000, taux: 3 },
  },
]);
