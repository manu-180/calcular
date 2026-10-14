import { definirCasos } from "@/motor/calculo";
import contributi from "./contributi-artigiani-commercianti";

const CIRCOLARE = "https://www.inps.it/content/dam/inps-site/it/scorporati/circolari-e-messaggi/2026/02/Circolare_15162/Allegati/16561_Circolare-numero-14-del-09-02-2026.pdf" as const;

export default definirCasos(contributi, [
  {
    nombre: "Artigiano sul minimale (esempio INPS)",
    origen: { tipo: "oficial", url: CIRCOLARE, detalle: "Circolare INPS 14/2026, par. 2: 4.521,36 euro (4.513,92 IVS + 7,44 maternità)." },
    fecha: "2026-10-14",
    entrada: { gestione: "artigiano", reddito: 10000, ante1996: false, forfettario: false },
    esperado: { totale: 4521.36, fisso: 4521.36, eccedenza: 0 },
  },
  {
    nombre: "Commerciante sul minimale (esempio INPS)",
    origen: { tipo: "oficial", url: CIRCOLARE, detalle: "Circolare INPS 14/2026, par. 2: 4.611,64 euro (4.604,20 IVS + 7,44 maternità)." },
    fecha: "2026-10-14",
    entrada: { gestione: "commerciante", reddito: 18808, ante1996: false, forfettario: false },
    esperado: { totale: 4611.64 },
  },
  {
    nombre: "Artigiano al massimale con anzianità prima del 1996 (esempio INPS)",
    origen: { tipo: "oficial", url: CIRCOLARE, detalle: "Circolare INPS 14/2026, par. 4: IVS massimo 22.864,51 (56.224 × 24% + 37.483 × 25%), più 7,44 di maternità." },
    fecha: "2026-10-14",
    entrada: { gestione: "artigiano", reddito: 200000, ante1996: true, forfettario: false },
    esperado: { totale: 22871.95 },
  },
  {
    nombre: "Commerciante al massimale, iscritto dal 1996 (esempio INPS)",
    origen: { tipo: "oficial", url: CIRCOLARE, detalle: "Circolare INPS 14/2026, par. 4: IVS massimo 30.598,53 (56.224 × 24,48% + 66.071 × 25,48%), più 7,44 di maternità." },
    fecha: "2026-10-14",
    entrada: { gestione: "commerciante", reddito: 200000, ante1996: false, forfettario: false },
    esperado: { totale: 30605.97 },
  },
  {
    nombre: "Artigiano forfettario con riduzione del 35%",
    origen: { tipo: "recalculado", detalle: "30.000 × 24% = 7.200; riduzione 35% = 2.520; IVS 4.680 + 7,44 = 4.687,44. Fisso 4.513,92 × 0,65 = 2.934,05 + 7,44 = 2.941,49." },
    fecha: "2026-10-14",
    entrada: { gestione: "artigiano", reddito: 30000, ante1996: false, forfettario: true },
    esperado: { totale: 4687.44, fisso: 2941.49, eccedenza: 1745.95, riduzione: 2520 },
  },
]);
