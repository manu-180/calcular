import { definirCasos } from "@/motor/calculo";
import af from "./allocations-familiales";

const F13213 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F13213";

export default definirCasos(af, [
  {
    nombre: "2 enfants sous le premier plafond",
    origen: { tipo: "oficial", url: F13213, detalle: "Barème Service-Public : 79 980 € ou moins, 152,25 € par mois." },
    fecha: "2026-10-14",
    entrada: { enfants: "e2", ressources: 60000, majorations: 0 },
    esperado: { base: 152.25, complement: 0, mensuel: 152.25, annuel: 1827 },
  },
  {
    nombre: "2 enfants dont le cadet majoré, entre les deux plafonds",
    origen: { tipo: "oficial", url: F13213, detalle: "Entre 79 980 € et 106 604 € : 76,13 € plus 38,07 € pour le 2e enfant majoré = 114,20 €." },
    fecha: "2026-10-14",
    entrada: { enfants: "e2", ressources: 95000, majorations: 1 },
    esperado: { base: 114.2, mensuel: 114.2 },
  },
  {
    nombre: "3 enfants, 87 000 € : complément dégressif",
    origen: {
      tipo: "oficial",
      url: F13213,
      detalle: "Exemple Service-Public : [86 644 + (12 × 347,32) − 87 000] ÷ 12 = 317,65 € par mois.",
    },
    fecha: "2026-10-14",
    entrada: { enfants: "e3", ressources: 87000, majorations: 0 },
    esperado: { base: 173.67, complement: 143.98, mensuel: 317.65 },
  },
  {
    nombre: "4 enfants au-dessus du second plafond",
    origen: { tipo: "oficial", url: F13213, detalle: "Plus de 119 932 € : 135,60 € par mois, plus 19,03 € par enfant majoré." },
    fecha: "2026-10-14",
    entrada: { enfants: "e4", ressources: 150000, majorations: 2 },
    esperado: { mensuel: 173.66 },
  },
  {
    nombre: "Deux majorations avec 2 enfants",
    origen: { tipo: "oficial", url: F13213, detalle: "Avec 2 enfants à charge, pas de majoration pour l'aîné." },
    fecha: "2026-10-14",
    entrada: { enfants: "e2", ressources: 50000, majorations: 2 },
    esperaError: true,
  },
]);
