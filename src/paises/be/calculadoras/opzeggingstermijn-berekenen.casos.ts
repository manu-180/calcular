import { definirCasos } from "@/motor/calculo";
import calculadora from "./opzeggingstermijn-berekenen";

const WET = "https://www.ejustice.just.fgov.be/eli/wet/1978/07/03/1978070303/justel" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Ontslag door de werkgever na 6 jaar en 9 maanden",
    origen: {
      tipo: "recalculado",
      url: WET,
      detalle: "Kennisgeving woensdag 14/10/2026, start maandag 19/10/2026. Anciënniteit 81 maanden: 15 weken na 4 jaar + 3 weken per begonnen jaar vanaf 5 jaar (2 jaren) = 21 weken. Laatste dag 14/3/2027. 3.900 × 3 ÷ 13 = 900 per week × 21 = 18.900.",
    },
    fecha: "2026-10-14",
    entrada: { wie: "werkgever", indienst: "2020-01-01", kennisgeving: "2026-10-14", maandloon: 3900 },
    esperado: { weken: 21, ancienniteit: "6 jaar en 9 maanden", start: "19 oktober 2026", einde: "14 maart 2027", vergoeding: 18900 },
  },
  {
    nombre: "Zelf ontslag na 6 jaar en 9 maanden",
    origen: { tipo: "recalculado", url: WET, detalle: "Art. 37/2, § 2: tussen 6 en 7 jaar anciënniteit 10 weken." },
    fecha: "2026-10-14",
    entrada: { wie: "werknemer", indienst: "2020-01-01", kennisgeving: "2026-10-14", maandloon: null },
    esperado: { weken: 10, vergoeding: null },
  },
  {
    nombre: "Tegenopzegging na meer dan een jaar",
    origen: { tipo: "recalculado", url: WET, detalle: "Art. 37/2, § 3: een jaar of meer anciënniteit geeft 4 weken." },
    fecha: "2026-10-14",
    entrada: { wie: "tegenopzegging", indienst: "2020-01-01", kennisgeving: "2026-10-14", maandloon: null },
    esperado: { weken: 4 },
  },
  {
    nombre: "Ontslag door de werkgever na 7 maanden",
    origen: { tipo: "recalculado", url: WET, detalle: "Start 19/10/2026, anciënniteit 7 maanden: tussen 6 en 9 maanden 6 weken." },
    fecha: "2026-10-14",
    entrada: { wie: "werkgever", indienst: "2026-03-01", kennisgeving: "2026-10-14", maandloon: null },
    esperado: { weken: 6, ancienniteit: "0 jaar en 7 maanden" },
  },
  {
    nombre: "Ontslag door de werkgever na 4 maanden",
    origen: { tipo: "recalculado", url: WET, detalle: "Minder dan 6 maanden: 1 week." },
    fecha: "2026-10-14",
    entrada: { wie: "werkgever", indienst: "2026-06-15", kennisgeving: "2026-10-14", maandloon: null },
    esperado: { weken: 1 },
  },
  {
    nombre: "Ontslag door de werkgever na 26 jaar",
    origen: { tipo: "recalculado", url: WET, detalle: "15 + 3 × 15 = 60 weken tot 20 jaar, + 2 vanaf 20 jaar, + 1 per begonnen jaar vanaf 21 jaar (6) = 68 weken." },
    fecha: "2026-10-14",
    entrada: { wie: "werkgever", indienst: "2000-01-01", kennisgeving: "2026-10-14", maandloon: null },
    esperado: { weken: 68 },
  },
  {
    nombre: "Opzegging vóór de indiensttreding is geen geldige invoer",
    origen: { tipo: "recalculado", detalle: "De kennisgeving kan niet vóór de start van het contract liggen." },
    fecha: "2026-10-14",
    entrada: { wie: "werkgever", indienst: "2026-12-01", kennisgeving: "2026-10-14", maandloon: null },
    esperaError: true,
  },
]);
