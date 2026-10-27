import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-dividendes";

const LF2026 = "https://www.joradp.dz/FTP/jo-francais/2025/F2025088.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "500 000 DA de dividendes",
    origen: { tipo: "recalculado", url: LF2026, detalle: "LF 2026, article 11 : retenue libératoire de 10 %, soit 50 000 ; net 450 000." },
    fecha: "2026-10-27",
    entrada: { dividendes: 500000 },
    esperado: { retenue: 50000, net: 450000, taux: 10 },
  },
  {
    nombre: "Montant nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { dividendes: 0 },
    esperaError: true,
  },
]);
