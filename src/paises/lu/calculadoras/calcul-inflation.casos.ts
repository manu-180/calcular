import { definirCasos } from "@/motor/calculo";
import calculInflation from "./calcul-inflation";

const STATEC = "https://lustat.statec.lu/rest/data/LU1,DSD_PRIX_CONSO@DF_E5100,1.0/all?startPeriod=2000-01";

export default definirCasos(calculInflation, [
  {
    nombre: "1000 euros de janvier 2020 à aujourd'hui",
    origen: {
      tipo: "recalculado",
      url: STATEC,
      detalle: "IPCN janvier 2020 = 871,50 ; septembre 2026 = 1069,77 (dernier mois publié le 16.10.2026). Facteur 1,227504 : 1227,50 euros, inflation 22,75 %. Sur un an : 1069,77 / 1039,97 - 1 = 2,87 %.",
    },
    fecha: "2026-10-16",
    entrada: { montant: 1000, de: "2020-01-10", a: "2026-10-16" },
    esperado: { ajuste: 1227.5, difference: 227.5, total: 22.75043029, annuelle: 2.86546727, moisDepart: "janvier 2020", moisFin: "septembre 2026" },
    tolerancia: 0.005,
  },
  {
    nombre: "Mois de départ pas encore publié",
    origen: { tipo: "recalculado", detalle: "Novembre 2026 n'est pas publié le 16.10.2026." },
    fecha: "2026-10-16",
    entrada: { montant: 1000, de: "2026-11-01", a: "2026-11-30" },
    esperaError: true,
  },
]);
