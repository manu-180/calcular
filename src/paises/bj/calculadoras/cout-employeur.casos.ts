import { definirCasos } from "@/motor/calculo";
import calculadora from "./cout-employeur";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "300 000 F, risques professionnels 2 %, VPS au taux normal",
    origen: {
      tipo: "recalculado",
      detalle: "CNSS employeur 6,4 % + 9 % + 2 % = 52 200 ; VPS 4 % (art. 194 du CGI) = 12 000. Coût 300 000 + 52 200 + 12 000 = 364 200.",
    },
    fecha: F,
    entrada: { brut: 300000, tauxRisques: 2, vps: "general" },
    esperado: { cnss: 52200, vps: 12000, cout: 364200, charges: 64200, tauxCharges: 21.4, coutAnnuel: 4370400 },
  },
  {
    nombre: "École privée, 200 000 F sans taux risques",
    origen: { tipo: "recalculado", detalle: "CNSS 15,4 % = 30 800 ; VPS réduit à 2 % = 4 000. Coût 234 800." },
    fecha: F,
    entrada: { brut: 200000, tauxRisques: 0, vps: "enseignement-prive" },
    esperado: { cnss: 30800, vps: 4000, cout: 234800 },
  },
  {
    nombre: "Employeur exonéré de VPS",
    origen: { tipo: "recalculado", detalle: "Sans VPS : 100 000 + 15 400 = 115 400." },
    fecha: F,
    entrada: { brut: 100000, tauxRisques: 0, vps: "exonere" },
    esperado: { vps: 0, cout: 115400 },
  },
]);
