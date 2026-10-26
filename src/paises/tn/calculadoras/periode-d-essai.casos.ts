import { definirCasos } from "@/motor/calculo";
import calculadora from "./periode-d-essai";

export default definirCasos(calculadora, [
  {
    nombre: "Essai de six mois non renouvelé",
    origen: { tipo: "recalculado", detalle: "Article 6-3 (loi n° 2025-9) : du 1er février au 1er août, prévenir quinze jours avant, le 17 juillet." },
    fecha: "2026-10-24",
    entrada: { debut: "2026-02-01", duree: 6, renouvele: false },
    esperado: { fin: "2026-08-01", finInitiale: "2026-08-01", prevenirAvant: "2026-07-17", dureeTotale: 6 },
  },
  {
    nombre: "Essai de trois mois renouvelé une fois",
    origen: { tipo: "recalculado", detalle: "3 + 3 mois à partir du 15 mars : fin le 15 septembre, prévenir le 31 août." },
    fecha: "2026-10-24",
    entrada: { debut: "2026-03-15", duree: 3, renouvele: true },
    esperado: { fin: "2026-09-15", finInitiale: "2026-06-15", prevenirAvant: "2026-08-31", dureeTotale: 6 },
  },
  {
    nombre: "Durée supérieure au maximum légal",
    origen: { tipo: "recalculado", detalle: "Plus de six mois : refusé." },
    fecha: "2026-10-24",
    entrada: { debut: "2026-03-15", duree: 7, renouvele: false },
    esperaError: true,
  },
]);
