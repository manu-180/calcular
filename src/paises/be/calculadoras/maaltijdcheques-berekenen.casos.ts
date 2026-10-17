import { definirCasos } from "@/motor/calculo";
import calculadora from "./maaltijdcheques-berekenen";

const BRON = "https://werk.belgie.be/nl/themas/verloning/maaltijdcheques" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Maximale werkgeversbijdrage, 20 werkdagen",
    origen: { tipo: "oficial", url: BRON, detalle: "Werkgever maximaal 8,91, werknemer minstens 1,09: cheque van 10. 20 dagen: 200 op de kaart, 21,80 ingehouden, 178,20 voordeel." },
    fecha: "2026-10-14",
    entrada: { dagen: 20, werkgever: 8.91, werknemer: 1.09 },
    esperado: { waarde: 10, totaal: 200, inhouding: 21.8, voordeel: 178.2 },
  },
  {
    nombre: "Cheque van € 8 met 18 werkdagen",
    origen: { tipo: "recalculado", detalle: "6,91 + 1,09 = 8. 18 dagen: 144 op de kaart, 124,38 voordeel." },
    fecha: "2026-10-14",
    entrada: { dagen: 18, werkgever: 6.91, werknemer: 1.09 },
    esperado: { waarde: 8, totaal: 144, voordeel: 124.38 },
  },
  {
    nombre: "Werkgeversbijdrage boven het maximum",
    origen: { tipo: "oficial", url: BRON, detalle: "De tussenkomst van de werkgever mag niet meer bedragen dan 8,91 EUR." },
    fecha: "2026-10-14",
    entrada: { dagen: 20, werkgever: 9.5, werknemer: 1.09 },
    esperaError: true,
  },
]);
