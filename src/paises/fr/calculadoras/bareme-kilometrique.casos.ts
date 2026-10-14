import { definirCasos } from "@/motor/calculo";
import bk from "./bareme-kilometrique";

const NOTICE = "https://www.impots.gouv.fr/sites/default/files/formulaires/2042/2026/2042_5477.pdf";

export default definirCasos(bk, [
  {
    nombre: "5 CV, 8 000 km",
    origen: { tipo: "oficial", url: NOTICE, detalle: "Barème 2025, 5 CV de 5 001 à 20 000 km : (d × 0,357) + 1 395 = 2 856 + 1 395 = 4 251 €." },
    fecha: "2026-10-14",
    entrada: { puissance: "cv5", distance: 8000, electrique: false },
    esperado: { bareme: 4251, total: 4251 },
  },
  {
    nombre: "3 CV, 4 000 km",
    origen: { tipo: "oficial", url: NOTICE, detalle: "3 CV et moins jusqu'à 5 000 km : d × 0,529 = 2 116 €." },
    fecha: "2026-10-14",
    entrada: { puissance: "cv3", distance: 4000, electrique: false },
    esperado: { total: 2116, parKm: 0.53 },
  },
  {
    nombre: "7 CV, 25 000 km",
    origen: { tipo: "oficial", url: NOTICE, detalle: "7 CV et plus au-delà de 20 000 km : d × 0,470 = 11 750 €." },
    fecha: "2026-10-14",
    entrada: { puissance: "cv7", distance: 25000, electrique: false },
    esperado: { total: 11750 },
  },
  {
    nombre: "Électrique 4 CV, 5 000 km : majoration de 20 %",
    origen: {
      tipo: "oficial",
      url: "https://bofip.impots.gouv.fr/bofip/2185-PGP.html/identifiant=BOI-BAREME-000001-20230720",
      detalle: "5 000 × 0,606 = 3 030 € ; majoration de 20 % pour un véhicule électrique : 606 € ; total 3 636 €.",
    },
    fecha: "2026-10-14",
    entrada: { puissance: "cv4", distance: 5000, electrique: true },
    esperado: { bareme: 3030, majoration: 606, total: 3636 },
  },
  {
    nombre: "Distance nulle",
    origen: { tipo: "recalculado", detalle: "Sans kilomètres, pas de frais." },
    fecha: "2026-10-14",
    entrada: { puissance: "cv4", distance: 0, electrique: false },
    esperaError: true,
  },
]);
