import { definirCasos } from "@/motor/calculo";
import preavisLicenciement from "./preavis-licenciement";

const CT = "https://legilux.public.lu/eli/etat/leg/code/travail/20260310";

export default definirCasos(preavisLicenciement, [
  {
    nombre: "Licenciement notifié le 10, ancienneté de 6 ans",
    origen: { tipo: "recalculado", url: CT, detalle: "6 ans : 4 mois (art. L. 124-3). Notification avant le 15 : début le 15 octobre 2026, fin le 14 février 2027." },
    fecha: "2026-10-16",
    entrada: { initiative: "employeur", entree: "2020-03-01", notification: "2026-10-10" },
    esperado: { anciennete: 6, mois: 4, debut: "2026-10-15", fin: "2027-02-14" },
  },
  {
    nombre: "Licenciement notifié le 20, moins de 5 ans",
    origen: { tipo: "recalculado", url: CT, detalle: "2 mois. Notification après le 14 : début le 1er novembre, fin le 31 décembre 2026." },
    fecha: "2026-10-16",
    entrada: { initiative: "employeur", entree: "2024-01-01", notification: "2026-10-20" },
    esperado: { mois: 2, debut: "2026-11-01", fin: "2026-12-31" },
  },
  {
    nombre: "Démission après 12 ans",
    origen: { tipo: "recalculado", url: CT, detalle: "La moitié de 6 mois : 3 mois (art. L. 124-4). Début le 15 octobre, fin le 14 janvier 2027." },
    fecha: "2026-10-16",
    entrada: { initiative: "salarie", entree: "2014-05-01", notification: "2026-10-05" },
    esperado: { mois: 3, fin: "2027-01-14" },
  },
  {
    nombre: "Notification avant l'entrée",
    origen: { tipo: "recalculado", detalle: "Dates incohérentes." },
    fecha: "2026-10-16",
    entrada: { initiative: "employeur", entree: "2026-11-01", notification: "2026-10-01" },
    esperaError: true,
  },
]);
