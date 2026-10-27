import { definirCasos } from "@/motor/calculo";
import calculadora from "./heures-supplementaires";

const LOI = "https://www.joradp.dz/Jo8499/1990/017/FP491.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "8 heures avec 60 000 DA par mois",
    origen: {
      tipo: "recalculado",
      url: LOI,
      detalle: "Horaire 60 000 ÷ 173,33 = 346,16 ; 8 heures = 2 769,28 ; majoration 50 % = 1 384,64 ; total 4 153,92.",
    },
    fecha: "2026-10-27",
    entrada: { mensuel: 60000, heures: 8, majoration: null },
    esperado: { horaire: 346.16, base: 2769.28, majoration: 1384.64, total: 4153.92, taux: 50 },
  },
  {
    nombre: "Convention à 75 %, SNMG, 10 heures",
    origen: { tipo: "recalculado", url: LOI, detalle: "Horaire 24 000 ÷ 173,33 = 138,46 ; 10 heures = 1 384,60 ; 75 % = 1 038,45 ; total 2 423,05." },
    fecha: "2026-10-27",
    entrada: { mensuel: 24000, heures: 10, majoration: 75 },
    esperado: { horaire: 138.46, total: 2423.05 },
  },
  {
    nombre: "Majoration inférieure au minimum",
    origen: { tipo: "recalculado", url: LOI, detalle: "Article 32 : jamais moins de 50 %." },
    fecha: "2026-10-27",
    entrada: { mensuel: 60000, heures: 8, majoration: 25 },
    esperaError: true,
  },
]);
