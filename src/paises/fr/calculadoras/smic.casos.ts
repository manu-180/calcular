import { definirCasos } from "@/motor/calculo";
import smic from "./smic";

export default definirCasos(smic, [
  {
    nombre: "Smic à 35 heures depuis le 1er juin 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2300",
      detalle: "Service-Public : 12,31 € brut de l'heure, 9,74 € net, 1 867,02 € brut et 1 477,93 € net par mois, 22 404,20 € brut par an.",
    },
    fecha: "2026-07-01",
    entrada: { heures: 35, mois: 12 },
    esperado: { horaire: 12.31, brutMensuel: 1867.02, netMensuel: 1477.93, netHoraire: 9.74, brutAnnuel: 22404.2 },
  },
  {
    nombre: "Mi-temps à 17,5 heures",
    origen: {
      tipo: "recalculado",
      detalle: "12,31 × 17,5 × 52 ÷ 12 = 933,51 € brut. Cotisations : 64,41 + 3,73 + 29,41 + 8,03 + CSG 62,37 + 22,01 + 4,59 = 194,55 ; net 738,96.",
    },
    fecha: "2026-07-01",
    entrada: { heures: 17.5, mois: 1 },
    esperado: { brutMensuel: 933.51, netMensuel: 738.96 },
  },
  {
    nombre: "Heures nulles",
    origen: { tipo: "recalculado", detalle: "Sans heures, pas de salaire." },
    fecha: "2026-07-01",
    entrada: { heures: 0, mois: 12 },
    esperaError: true,
  },
]);
