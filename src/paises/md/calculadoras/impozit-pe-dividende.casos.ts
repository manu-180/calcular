import { definirCasos } from "@/motor/calculo";
import impozitPeDividende from "./impozit-pe-dividende";

const MF = "https://particip.gov.md/ro/download_attachment/34715";

export default definirCasos(impozitPeDividende, [
  {
    nombre: "Dividend brut de 10.000 de lei",
    origen: { tipo: "recalculado", url: MF, detalle: "Ministerul Finanțelor: regimul general, 12 % + 6 % pe dividende. 10.000 × 6 % = 600; net 9.400." },
    fecha: "2026-10-26",
    entrada: { tip: "brut", suma: 10000 },
    esperado: { impozit: 600, net: 9400, cota: 6 },
  },
  {
    nombre: "Net de 9.400 de lei",
    origen: { tipo: "recalculado", url: MF, detalle: "9.400 / 0,94 = 10.000; impozit 600." },
    fecha: "2026-10-26",
    entrada: { tip: "net", suma: 9400 },
    esperado: { brut: 10000, impozit: 600 },
  },
  {
    nombre: "Sumă zero",
    origen: { tipo: "recalculado", url: MF, detalle: "Fără dividend nu există impozit." },
    fecha: "2026-10-26",
    entrada: { tip: "brut", suma: 0 },
    esperaError: true,
  },
]);
