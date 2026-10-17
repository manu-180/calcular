import { definirCasos } from "@/motor/calculo";
import calculadora from "./hypotheekrenteaftrek-berekenen";

const WIB = "https://wetten.overheid.nl/BWBR0011353/2026-01-01" as const;

export default definirCasos(calculadora, [
  {
    nombre: "€ 9.000 rente, WOZ € 400.000, inkomen € 60.000",
    origen: {
      tipo: "recalculado",
      url: WIB,
      detalle: "Forfait 0,35% × 400.000 = 1.400; aftrek 7.600. In de tweede schijf 7.600 × 37,56% = 2.854,56, plus hogere algemene heffingskorting 7.600 × 6,398% = 486,25. Voordeel 3.340,81; netto rente 5.659,19.",
    },
    fecha: "2026-10-14",
    entrada: { rente: 9000, woz: 400000, inkomen: 60000 },
    esperado: { forfait: 1400, aftrek: 7600, voordeel: 3340.81, nettoRente: 5659.19, tariefsaanpassing: 0 },
  },
  {
    nombre: "Hoog inkomen: aftrek tegen maximaal 37,56%",
    origen: {
      tipo: "recalculado",
      url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/aftrek-en-kortingen/content/afbouw-tarief-aftrekposten-bij-hoog-inkomen",
      detalle: "Forfait 1.750; aftrek 13.250, helemaal in de hoogste schijf: 13.250 × 49,50% min tariefsaanpassing 11,94% = 13.250 × 37,56% = 4.976,70.",
    },
    fecha: "2026-10-14",
    entrada: { rente: 15000, woz: 500000, inkomen: 100000 },
    esperado: { aftrek: 13250, tariefsaanpassing: 1582.05, voordeel: 4976.7 },
  },
  {
    nombre: "Weinig rente: aftrek wegens geringe eigenwoningschuld",
    origen: { tipo: "recalculado", url: WIB, detalle: "Forfait 1.400 − rente 500 = 900; Hillen 71,867% = 646,80; bijtelling 253,20, waardoor je iets meer belasting betaalt: voordeel −111,30." },
    fecha: "2026-10-14",
    entrada: { rente: 500, woz: 400000, inkomen: 60000 },
    esperado: { hillen: 646.8, aftrek: 0, voordeel: -111.3 },
  },
  {
    nombre: "Zonder inkomen geen berekening",
    origen: { tipo: "recalculado", detalle: "Ongeldige invoer." },
    fecha: "2026-10-14",
    entrada: { rente: 9000, woz: 400000, inkomen: 0 },
    esperaError: true,
  },
]);
