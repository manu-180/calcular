import { definirCasos } from "@/motor/calculo";
import wymiarCzasuPracy from "./wymiar-czasu-pracy";

const KP = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001245";

export default definirCasos(wymiarCzasuPracy, [
  {
    nombre: "Styczeń 2026 r.",
    origen: { tipo: "recalculado", url: KP, detalle: "Art. 130 k.p.: 22 dni od poniedziałku do piątku, minus 1 i 6 stycznia = 20 dni, 160 godzin." },
    fecha: "2026-10-24",
    entrada: { data: "2026-01-15", zakres: "miesiac", etat: 1 },
    esperado: { dni: 20, godziny: 160, swietaWDniPowszedni: 2, swietaWSobote: 0 },
  },
  {
    nombre: "Cały rok 2026",
    origen: {
      tipo: "recalculado",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000296",
      detalle: "261 dni od poniedziałku do piątku; 8 świąt w dni powszednie (1 i 6 I, 6 IV, 1 V, 4 VI, 11 XI, 24 i 25 XII) i 2 w sobotę (15 VIII, 26 XII): 251 dni, 2008 godzin.",
    },
    fecha: "2026-10-24",
    entrada: { data: "2026-06-01", zakres: "rok", etat: 1 },
    esperado: { dni: 251, godziny: 2008, swietaWDniPowszedni: 8, swietaWSobote: 2 },
  },
  {
    nombre: "Grudzień 2026 r. na pół etatu",
    origen: { tipo: "recalculado", url: KP, detalle: "23 dni od poniedziałku do piątku, minus 24 i 25 grudnia, minus 26 grudnia w sobotę = 20 dni; 160 godzin × 0,5 = 80." },
    fecha: "2026-10-24",
    entrada: { data: "2026-12-01", zakres: "miesiac", etat: 0.5 },
    esperado: { dni: 20, godziny: 80, swietaWSobote: 1 },
  },
  {
    nombre: "Kwiecień 2027 r. z Poniedziałkiem Wielkanocnym",
    origen: { tipo: "recalculado", url: KP, detalle: "Wielkanoc 28 marca 2027 r., więc 29 marca to święto; kwiecień 2027: 22 dni od poniedziałku do piątku, bez świąt: 176 godzin." },
    fecha: "2026-10-24",
    entrada: { data: "2027-04-10", zakres: "miesiac", etat: 1 },
    esperado: { dni: 22, godziny: 176 },
  },
]);
