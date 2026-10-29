import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-interets-epargne";

const LF2022 = "https://www.joradp.dz/FTP/jo-francais/2021/F2021100.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Livret d'épargne, 80 000 DA d'intérêts",
    origen: { tipo: "recalculado", url: LF2022, detalle: "1 % × 50 000 = 500 libératoire ; 10 % × 30 000 = 3 000 de crédit d'impôt ; retenue 3 500 ; net 76 500." },
    fecha: "2026-10-27",
    entrada: { interets: 80000, placement: "livret" },
    esperado: { retenue: 3500, liberatoire: 500, credit: 3000, net: 76500 },
  },
  {
    nombre: "Livret d'épargne, 20 000 DA d'intérêts",
    origen: { tipo: "recalculado", url: LF2022, detalle: "Sous le seuil de 50 000 DA : 1 % libératoire, soit 200." },
    fecha: "2026-10-27",
    entrada: { interets: 20000, placement: "livret" },
    esperado: { retenue: 200, liberatoire: 200, credit: 0, net: 19800, tauxMoyen: 1 },
  },
  {
    nombre: "Dépôt à terme, 100 000 DA d'intérêts",
    origen: { tipo: "recalculado", url: LF2022, detalle: "10 % × 100 000 = 10 000, crédit d'impôt." },
    fecha: "2026-10-27",
    entrada: { interets: 100000, placement: "depot" },
    esperado: { retenue: 10000, liberatoire: 0, credit: 10000, net: 90000 },
  },
  {
    nombre: "Intérêts nuls",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { interets: 0, placement: "livret" },
    esperaError: true,
  },
]);
