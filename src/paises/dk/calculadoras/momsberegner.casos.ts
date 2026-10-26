import { definirCasos } from "@/motor/calculo";
import momsberegner from "./momsberegner";

const MOMS = "https://svmn.dk/tal-og-metode/satser/satser-og-beloebsgraenser-i-lovgivningen/momsloven";

export default definirCasos(momsberegner, [
  {
    nombre: "Læg 25 % moms til 1.000 kr.",
    origen: { tipo: "recalculado", url: MOMS, detalle: "Momslovens § 33: 25 % af 1.000 = 250; pris med moms 1.250." },
    fecha: "2026-10-24",
    entrada: { retning: "laeg-til", beloeb: 1000 },
    esperado: { moms: 250, medMoms: 1250, udenMoms: 1000, andel: 20 },
  },
  {
    nombre: "Træk momsen ud af 1.250 kr.",
    origen: { tipo: "recalculado", url: MOMS, detalle: "1.250 / 1,25 = 1.000; moms 250 (20 % af prisen med moms)." },
    fecha: "2026-10-24",
    entrada: { retning: "traek-fra", beloeb: 1250 },
    esperado: { moms: 250, udenMoms: 1000 },
  },
  {
    nombre: "Træk momsen ud af 99,95 kr.",
    origen: { tipo: "recalculado", url: MOMS, detalle: "99,95 / 1,25 = 79,96; moms 19,99." },
    fecha: "2026-10-24",
    entrada: { retning: "traek-fra", beloeb: 99.95 },
    esperado: { udenMoms: 79.96, moms: 19.99 },
  },
]);
