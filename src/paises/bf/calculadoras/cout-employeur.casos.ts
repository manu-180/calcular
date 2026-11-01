import { definirCasos } from "@/motor/calculo";
import calculadora from "./cout-employeur";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "300 000 F, entreprise soumise à la TPA",
    origen: { tipo: "recalculado", detalle: "CNSS employeur 16 % = 48 000. TPA 3 % = 9 000. Coût 300 000 + 57 000 = 357 000." },
    fecha: F,
    entrada: { remuneration: 300000, tpa: true, cga: false },
    esperado: { cnss: 48000, tpa: 9000, charges: 57000, cout: 357000, tauxCharges: 19, coutAnnuel: 4284000 },
  },
  {
    nombre: "Même salaire, adhérent d'un centre de gestion agréé",
    origen: { tipo: "recalculado", detalle: "Abattement de 20 % sur la base de la TPA : 3 % × 240 000 = 7 200. Coût 355 200." },
    fecha: F,
    entrada: { remuneration: 300000, tpa: true, cga: true },
    esperado: { tpa: 7200, cout: 355200 },
  },
  {
    nombre: "Établissement exonéré de TPA",
    origen: { tipo: "recalculado", detalle: "Sans TPA : seulement la CNSS, 48 000. Coût 348 000." },
    fecha: F,
    entrada: { remuneration: 300000, tpa: false, cga: null },
    esperado: { tpa: 0, cout: 348000 },
  },
]);
