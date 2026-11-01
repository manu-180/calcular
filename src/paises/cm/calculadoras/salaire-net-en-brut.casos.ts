import { definirCasos } from "@/motor/calculo";
import calculadora from "./salaire-net-en-brut";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "Net de 423 550 F : retour au brut de 500 000 F",
    origen: { tipo: "recalculado", detalle: "Le calcul du salaire net donne 423 550 F pour 500 000 F bruts ; l'inverse retrouve ce brut à quelques francs près (le Crédit foncier se calcule au millier)." },
    fecha: F,
    entrada: { net: 423550 },
    esperado: { brut: 500000, netObtenu: 423550 },
    tolerancia: 20,
  },
  {
    nombre: "Net de 56 130 F : SMIG des autres secteurs",
    origen: { tipo: "recalculado", detalle: "60 000 F bruts donnent 56 130 F nets (sans IRPP sous le seuil de retenue)." },
    fecha: F,
    entrada: { net: 56130 },
    esperado: { brut: 60000, irpp: 0 },
    tolerancia: 20,
  },
  {
    nombre: "Net nul",
    origen: { tipo: "recalculado", detalle: "Saisie impossible." },
    fecha: F,
    entrada: { net: 0 },
    esperaError: true,
  },
]);
