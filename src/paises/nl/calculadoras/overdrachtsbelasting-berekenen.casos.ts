import { definirCasos } from "@/motor/calculo";
import calculadora from "./overdrachtsbelasting-berekenen";

const TARIEF = "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/woning/overdrachtsbelasting/tarieven_overdrachtsbelasting/het_tarief_van_de_overdrachtbelasting" as const;
const STARTER = "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/woning/overdrachtsbelasting/startersvrijstelling/startersvrijstelling" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Starter van 30 onder de grens",
    origen: { tipo: "oficial", url: STARTER, detalle: "18 tot 35 jaar, eerste keer, woning tot € 555.000: vrijgesteld." },
    fecha: "2026-10-14",
    entrada: { koopsom: 450000, soort: "eigen-woning", leeftijd: 30, eerderGebruikt: false, aandeel: 100 },
    esperado: { belasting: 0, tarief: 0, starter: "Ja" },
  },
  {
    nombre: "Starter boven de woningwaardegrens",
    origen: { tipo: "oficial", url: STARTER, detalle: "€ 560.000 is meer dan € 555.000: geen vrijstelling, 2% = 11.200." },
    fecha: "2026-10-14",
    entrada: { koopsom: 560000, soort: "eigen-woning", leeftijd: 30, eerderGebruikt: false, aandeel: 100 },
    esperado: { belasting: 11200, tarief: 2, starter: "Nee" },
  },
  {
    nombre: "Doorstromer van 40",
    origen: { tipo: "oficial", url: TARIEF, detalle: "Eigen woning: 2%. 450.000 × 2% = 9.000." },
    fecha: "2026-10-14",
    entrada: { koopsom: 450000, soort: "eigen-woning", leeftijd: 40, eerderGebruikt: false, aandeel: 100 },
    esperado: { belasting: 9000, tarief: 2 },
  },
  {
    nombre: "Beleggingswoning 2026: 8%",
    origen: { tipo: "oficial", url: TARIEF, detalle: "Woning waarin je niet zelf gaat wonen: 8% vanaf 2026. 300.000 × 8% = 24.000." },
    fecha: "2026-10-14",
    entrada: { koopsom: 300000, soort: "overige-woning", leeftijd: 45, eerderGebruikt: false, aandeel: 100 },
    esperado: { belasting: 24000, tarief: 8 },
  },
  {
    nombre: "Bedrijfspand: 10,4%",
    origen: { tipo: "oficial", url: TARIEF, detalle: "Niet-woning: 10,4%. 250.000 × 10,4% = 26.000." },
    fecha: "2026-10-14",
    entrada: { koopsom: 250000, soort: "niet-woning", leeftijd: 45, eerderGebruikt: false, aandeel: 100 },
    esperado: { belasting: 26000, tarief: 10.4 },
  },
  {
    nombre: "Samen kopen voor € 600.000: geen vrijstelling, half aandeel",
    origen: { tipo: "oficial", url: STARTER, detalle: "Voorbeeld Belastingdienst: de grens geldt voor de hele woning. 50% van 600.000 = 300.000 × 2% = 6.000." },
    fecha: "2026-10-14",
    entrada: { koopsom: 600000, soort: "eigen-woning", leeftijd: 28, eerderGebruikt: false, aandeel: 50 },
    esperado: { belasting: 6000, grondslag: 300000, starter: "Nee" },
  },
]);
