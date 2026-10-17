import { definirCasos } from "@/motor/calculo";
import impotSurLeRevenu from "./impot-sur-le-revenu";

const ACD = "https://impotsdirects.public.lu/dam-assets/fr/baremes/bareme-2025-format-excel.xlsx";

export default definirCasos(impotSurLeRevenu, [
  {
    nombre: "60 000 euros, classe 1",
    origen: { tipo: "recalculado", url: ACD, detalle: "0,39 x 60 000 - 12 235,5 = 11 164,5 → 11 164 ; x 1,07 = 11 945,48 → 11 945." },
    fecha: "2026-10-16",
    entrada: { revenu: 60000, classe: "1" },
    esperado: { impot: 11164, total: 11945, fonds: 781 },
  },
  {
    nombre: "100 000 euros, classe 2",
    origen: { tipo: "recalculado", url: ACD, detalle: "0,36 x 100 000 - 21 317,4 = 14 682,6 → 14 682 ; x 1,07 = 15 709,74 → 15 709." },
    fecha: "2026-10-16",
    entrada: { revenu: 100000, classe: "2" },
    esperado: { impot: 14682, total: 15709 },
  },
  {
    nombre: "200 000 euros, classe 1, au-delà de 150 000",
    origen: { tipo: "recalculado", url: ACD, detalle: "0,41 x 200 000 - 15 171,6 = 66 828,4 → 66 828 ; x 1,09 - 931,8 = 71 910,72 → 71 910." },
    fecha: "2026-10-16",
    entrada: { revenu: 200000, classe: "1" },
    esperado: { impot: 66828, total: 71910 },
  },
  {
    nombre: "40 020 euros, classe 1a, arrondi aux 50 euros",
    origen: { tipo: "recalculado", url: ACD, detalle: "R = 40 000. 0,225 x 40 000 - 6973,2 = 2026,8 → 2026 ; x 1,07 = 2167,82 → 2167." },
    fecha: "2026-10-16",
    entrada: { revenu: 40020, classe: "1a" },
    esperado: { base: 40000, impot: 2026, total: 2167 },
  },
  {
    nombre: "Revenu sous le seuil d'imposition",
    origen: { tipo: "recalculado", url: ACD, detalle: "Classe 1 : jusqu'à 13 200 euros, impôt nul." },
    fecha: "2026-10-16",
    entrada: { revenu: 13000, classe: "1" },
    esperado: { total: 0 },
  },
]);
