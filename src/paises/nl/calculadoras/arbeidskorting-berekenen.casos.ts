import { definirCasos } from "@/motor/calculo";
import calculadora from "./arbeidskorting-berekenen";

const VA = "https://www.belastingdienst.nl/wps/wcm/connect/nl/voorlopige-aanslag/content/voorlopige-aanslag-tarieven-en-heffingskortingen" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Eerste schijf: € 10.000",
    origen: { tipo: "oficial", url: VA, detalle: "Tot € 11.965: 8,324% × 10.000 = 832,40." },
    fecha: "2026-10-14",
    entrada: { arbeidsinkomen: 10000 },
    esperado: { korting: 832.4 },
  },
  {
    nombre: "Tweede schijf: € 20.000",
    origen: { tipo: "oficial", url: VA, detalle: "€ 996 + 31,009% × (20.000 − 11.965) = 3.487,57." },
    fecha: "2026-10-14",
    entrada: { arbeidsinkomen: 20000 },
    esperado: { korting: 3487.57 },
  },
  {
    nombre: "Derde schijf: € 40.000",
    origen: { tipo: "oficial", url: VA, detalle: "€ 5.300 + 1,950% × (40.000 − 25.845) = 5.576,02." },
    fecha: "2026-10-14",
    entrada: { arbeidsinkomen: 40000 },
    esperado: { korting: 5576.02, maximum: 5685 },
  },
  {
    nombre: "Afbouw: € 80.000",
    origen: { tipo: "oficial", url: VA, detalle: "€ 5.685 − 6,510% × (80.000 − 45.592) = 3.445,04." },
    fecha: "2026-10-14",
    entrada: { arbeidsinkomen: 80000 },
    esperado: { korting: 3445.04 },
  },
  {
    nombre: "Helemaal afgebouwd: € 140.000",
    origen: { tipo: "oficial", url: VA, detalle: "Vanaf € 132.920: € 0." },
    fecha: "2026-10-14",
    entrada: { arbeidsinkomen: 140000 },
    esperado: { korting: 0 },
  },
]);
