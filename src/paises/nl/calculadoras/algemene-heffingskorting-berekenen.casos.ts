import { definirCasos } from "@/motor/calculo";
import calculadora from "./algemene-heffingskorting-berekenen";

const VA = "https://www.belastingdienst.nl/wps/wcm/connect/nl/voorlopige-aanslag/content/voorlopige-aanslag-tarieven-en-heffingskortingen" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Onder de afbouwgrens",
    origen: { tipo: "oficial", url: VA, detalle: "Tot € 29.736: € 3.115." },
    fecha: "2026-10-14",
    entrada: { inkomen: 25000 },
    esperado: { korting: 3115, afbouw: 0 },
  },
  {
    nombre: "€ 50.000 verzamelinkomen",
    origen: { tipo: "oficial", url: VA, detalle: "€ 3.115 − 6,398% × (50.000 − 29.736) = 1.818,51." },
    fecha: "2026-10-14",
    entrada: { inkomen: 50000 },
    esperado: { korting: 1818.51, afbouw: 1296.49 },
  },
  {
    nombre: "Vanaf € 78.426 nul",
    origen: { tipo: "oficial", url: VA, detalle: "Vanaf € 78.426: € 0." },
    fecha: "2026-10-14",
    entrada: { inkomen: 90000 },
    esperado: { korting: 0, afbouw: 3115 },
  },
]);
