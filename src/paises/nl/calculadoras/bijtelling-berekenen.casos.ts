import { definirCasos } from "@/motor/calculo";
import calculadora from "./bijtelling-berekenen";

const LH = "https://download.belastingdienst.nl/belastingdienst/docs/bijlage-nieuwsbrief-loonheffingen-2026-lh2091b63fd.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Elektrische auto van 2026, € 45.000",
    origen: { tipo: "oficial", url: LH, detalle: "Tabel 12: 22%, korting 4% tot de cap van € 30.000. 9.900 − 1.200 = 8.700. Bij € 60.000 inkomen 37,56%: 3.267,72 per jaar, 272,31 per maand." },
    fecha: "2026-10-14",
    entrada: { waarde: 45000, soort: "elektrisch", jaar: "2026", youngtimer: false, eigenBijdrage: 0, inkomen: 60000 },
    esperado: { bijtelling: 8700, perMaand: 725, korting: 1200, tarief: 37.56, nettoPerJaar: 3267.72, nettoPerMaand: 272.31 },
  },
  {
    nombre: "Benzineauto van 2025, € 40.000, hoog inkomen",
    origen: { tipo: "oficial", url: LH, detalle: "22% × 40.000 = 8.800; tarief 49,50%: 4.356 per jaar." },
    fecha: "2026-10-14",
    entrada: { waarde: 40000, soort: "brandstof", jaar: "2025", youngtimer: false, eigenBijdrage: 0, inkomen: 90000 },
    esperado: { bijtelling: 8800, tarief: 49.5, nettoPerJaar: 4356, nettoPerMaand: 363 },
  },
  {
    nombre: "Elektrisch uit 2021 binnen 60 maanden, met eigen bijdrage",
    origen: { tipo: "oficial", url: LH, detalle: "22% × 50.000 = 11.000 − 10% × 40.000 = 7.000; min eigen bijdrage 1.200 = 5.800." },
    fecha: "2026-10-14",
    entrada: { waarde: 50000, soort: "elektrisch", jaar: "2021-binnen-60", youngtimer: false, eigenBijdrage: 1200, inkomen: 60000 },
    esperado: { bijtelling: 5800, korting: 4000 },
  },
  {
    nombre: "Waterstofauto: geen cap",
    origen: { tipo: "oficial", url: LH, detalle: "Korting over de hele grondslag: 22% × 70.000 − 4% × 70.000 = 12.600." },
    fecha: "2026-10-14",
    entrada: { waarde: 70000, soort: "waterstof", jaar: "2026", youngtimer: false, eigenBijdrage: 0, inkomen: 60000 },
    esperado: { bijtelling: 12600, korting: 2800 },
  },
  {
    nombre: "Youngtimer: 35% van de dagwaarde",
    origen: { tipo: "oficial", url: LH, detalle: "Auto ouder dan 16 jaar: 35% × 10.000 = 3.500." },
    fecha: "2026-10-14",
    entrada: { waarde: 10000, soort: "brandstof", jaar: "voor-2017", youngtimer: true, eigenBijdrage: 0, inkomen: 50000 },
    esperado: { bijtelling: 3500 },
  },
  {
    nombre: "Emissievrij van voor 2017 vraagt de tenaamstelling",
    origen: { tipo: "recalculado", detalle: "De korting hangt dan af van de eerste tenaamstelling." },
    fecha: "2026-10-14",
    entrada: { waarde: 40000, soort: "elektrisch", jaar: "voor-2017", youngtimer: false, eigenBijdrage: 0, inkomen: 50000 },
    esperaError: true,
  },
]);
