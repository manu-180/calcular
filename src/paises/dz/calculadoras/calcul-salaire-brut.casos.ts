import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-salaire-brut";

const LF2022 = "https://www.joradp.dz/FTP/jo-francais/2021/F2021100.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "47 558 DA net",
    origen: { tipo: "recalculado", url: LF2022, detalle: "Inverse du calcul du salaire net : 60 000 brut − 5 400 de cotisation − 7 042 d'IRG = 47 558." },
    fecha: "2026-10-27",
    entrada: { net: 47558, special: false },
    esperado: { brut: 60000, cnas: 5400, irg: 7042, net: 47558 },
  },
  {
    nombre: "21 840 DA net, sans IRG",
    origen: { tipo: "recalculado", url: LF2022, detalle: "Sous le seuil d'exonération, brut = net ÷ 0,91 = 24 000." },
    fecha: "2026-10-27",
    entrada: { net: 21840, special: false },
    esperado: { brut: 24000, irg: 0 },
  },
  {
    nombre: "105 650 DA net",
    origen: { tipo: "recalculado", url: LF2022, detalle: "Inverse du cas 150 000 brut : cotisation 13 500, IRG 30 850." },
    fecha: "2026-10-27",
    entrada: { net: 105650, special: false },
    esperado: { brut: 150000 },
  },
  {
    nombre: "Net nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { net: 0, special: false },
    esperaError: true,
  },
]);
