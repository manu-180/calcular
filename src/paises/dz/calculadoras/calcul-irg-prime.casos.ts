import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-irg-prime";

const LF2022 = "https://www.joradp.dz/FTP/jo-francais/2021/F2021100.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Prime trimestrielle de 30 000 DA",
    origen: { tipo: "recalculado", url: LF2022, detalle: "Cotisation 9 % = 2 700 ; imposable 27 300 ; IRG 10 % = 2 730 ; net 24 570." },
    fecha: "2026-10-27",
    entrada: { prime: 30000, cotisable: true },
    esperado: { cnas: 2700, imposable: 27300, irg: 2730, net: 24570 },
  },
  {
    nombre: "Rappel non cotisable de 15 000 DA",
    origen: { tipo: "recalculado", url: LF2022, detalle: "IRG 10 % × 15 000 = 1 500 ; net 13 500." },
    fecha: "2026-10-27",
    entrada: { prime: 15000, cotisable: false },
    esperado: { irg: 1500, net: 13500 },
  },
  {
    nombre: "Prime nulle",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { prime: 0, cotisable: true },
    esperaError: true,
  },
]);
