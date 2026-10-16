import { definirCasos } from "@/motor/calculo";
import calculadora from "./loonkost-berekenen";

const RSZ = "https://www.socialsecurity.be/employer/instructions/dmfa/nl/latest/instructions/socialsecuritycontributions/contributions/ordinarycontributions.html" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Bediende, € 3.000 bruto",
    origen: { tipo: "recalculado", url: RSZ, detalle: "Werkgeversbijdragen 19,88 % + 5,12 % = 25 % × 3.000 = 750. Per maand 3.750. Per jaar 12 × 3.750 + dubbel vakantiegeld 92 % × 3.000 = 2.760, samen 47.760." },
    fecha: "2026-10-14",
    entrada: { bruto: 3000, statuut: "bediende" },
    esperado: { rsz: 750, tarief: 25, vakantie: 0, perMaand: 3750, dubbel: 2760, perJaar: 47760 },
  },
  {
    nombre: "Arbeider, € 2.500 bruto",
    origen: { tipo: "recalculado", url: RSZ, detalle: "Op 108 % = 2.700: 25 % = 675 en 15,84 % vakantie = 427,68. Per maand 2.500 + 675 + 427,68 = 3.602,68. Per jaar × 12 = 43.232,16." },
    fecha: "2026-10-14",
    entrada: { bruto: 2500, statuut: "arbeider" },
    esperado: { rsz: 675, vakantie: 427.68, perMaand: 3602.68, dubbel: 0, perJaar: 43232.16 },
  },
  {
    nombre: "Nul bruto is geen geldige invoer",
    origen: { tipo: "recalculado", detalle: "Zonder brutoloon valt er niets te berekenen." },
    fecha: "2026-10-14",
    entrada: { bruto: 0, statuut: "bediende" },
    esperaError: true,
  },
]);
