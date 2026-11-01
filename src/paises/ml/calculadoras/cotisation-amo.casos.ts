import { definirCasos } from "@/motor/calculo";
import calculadora from "./cotisation-amo";

export default definirCasos(calculadora, [
  {
    nombre: "Salarié du privé à 200 000 F",
    origen: { tipo: "recalculado", detalle: "3,06 % = 6 120 ; 3,50 % = 7 000 ; total 13 120." },
    fecha: "2026-10-27",
    entrada: {"salaire": 200000, "employeur": "prive"},
    esperado: {"salarie": 6120, "employeur": 7000, "total": 13120},
  },
  {
    nombre: "Agent d'une collectivité à 200 000 F",
    origen: { tipo: "recalculado", detalle: "Part de l'employeur public 4,48 % = 8 960." },
    fecha: "2026-10-27",
    entrada: {"salaire": 200000, "employeur": "public"},
    esperado: {"salarie": 6120, "employeur": 8960},
  },
  {
    nombre: "Salaire sous le SMIG",
    origen: { tipo: "recalculado", detalle: "Assiette portée à 40 000 : 1 224 + 1 400." },
    fecha: "2026-10-27",
    entrada: {"salaire": 30000, "employeur": "prive"},
    esperado: {"assiette": 40000, "salarie": 1224, "employeur": 1400},
  },
]);
