import { definirCasos } from "@/motor/calculo";
import indemnizatieUnicaLaNastere from "./indemnizatie-unica-la-nastere";

const CNAS = "https://cnas.gov.md/ro/servicii/servicii/indemnizatii/indemnizatii-adresate-familiilor-cu-copii";

export default definirCasos(indemnizatieUnicaLaNastere, [
  {
    nombre: "Un copil născut în 2026",
    origen: { tipo: "oficial", url: CNAS, detalle: "CNAS: pentru copiii născuți începând cu 1 ianuarie 2026, 21.886 de lei pentru fiecare copil; îngrijirea până la 2 ani, 1.000 de lei pe lună." },
    fecha: "2026-10-26",
    entrada: { copii: 1 },
    esperado: { total: 21886, ingrijireLunar: 1000, ingrijire24: 24000 },
  },
  {
    nombre: "Gemeni",
    origen: { tipo: "recalculado", url: CNAS, detalle: "2 × 21.886 = 43.772; îngrijire 2 × 1.000 = 2.000 pe lună." },
    fecha: "2026-10-26",
    entrada: { copii: 2 },
    esperado: { total: 43772, ingrijireLunar: 2000 },
  },
  {
    nombre: "Zero copii",
    origen: { tipo: "recalculado", url: CNAS, detalle: "Indemnizația se acordă pentru fiecare copil născut viu." },
    fecha: "2026-10-26",
    entrada: { copii: 0 },
    esperaError: true,
  },
]);
