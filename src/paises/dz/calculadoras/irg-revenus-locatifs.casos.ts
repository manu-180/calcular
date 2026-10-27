import { definirCasos } from "@/motor/calculo";
import calculadora from "./irg-revenus-locatifs";

const LF2023 = "https://www.joradp.dz/FTP/jo-francais/2022/F2022089.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Appartement loué 40 000 DA par mois",
    origen: { tipo: "recalculado", url: LF2023, detalle: "480 000 par an, sous 1 800 000 : 7 % libératoire = 33 600, soit 2 800 par mois." },
    fecha: "2026-10-27",
    entrada: { loyer: 40000, mois: 12, usage: "habitation" },
    esperado: { annuel: 480000, irg: 33600, mensuel: 2800, taux: 7 },
  },
  {
    nombre: "Local commercial non meublé, 100 000 DA par mois",
    origen: { tipo: "recalculado", url: LF2023, detalle: "1 200 000 par an, sous 1 800 000 : 15 % = 180 000." },
    fecha: "2026-10-27",
    entrada: { loyer: 100000, mois: 12, usage: "professionnel" },
    esperado: { irg: 180000, annuel: 1200000 },
  },
  {
    nombre: "Villa louée 200 000 DA par mois",
    origen: { tipo: "recalculado", url: LF2023, detalle: "2 400 000 par an, au-dessus de 1 800 000 : retenue provisoire de 7 % = 168 000." },
    fecha: "2026-10-27",
    entrada: { loyer: 200000, mois: 12, usage: "habitation" },
    esperado: { irg: 168000, taux: 7 },
  },
  {
    nombre: "Terrain agricole, 30 000 DA par mois",
    origen: { tipo: "recalculado", url: LF2023, detalle: "360 000 par an : 10 % = 36 000." },
    fecha: "2026-10-27",
    entrada: { loyer: 30000, mois: 12, usage: "agricole" },
    esperado: { irg: 36000 },
  },
]);
