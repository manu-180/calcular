import { definirCasos } from "@/motor/calculo";
import regimeForfettario from "./regime-forfettario";

export default definirCasos(regimeForfettario, [
  {
    nombre: "Professionista con 50.000 euro e 9.000 di contributi",
    origen: { tipo: "recalculado", detalle: "50.000 × 78% = 39.000; meno 9.000 = 30.000; imposta 15% = 4.500; restano 50.000 − 4.500 − 9.000 = 36.500." },
    fecha: "2026-10-14",
    entrada: { ricavi: 50000, attivita: "professioni", aliquota: "ordinaria", contributi: 9000 },
    esperado: { coefficiente: 78, redditoLordo: 39000, imponibile: 30000, imposta: 4500, netto: 36500 },
  },
  {
    nombre: "Commercio in avvio con l'aliquota del 5%",
    origen: { tipo: "recalculado", detalle: "30.000 × 40% = 12.000; imposta 5% = 600; restano 29.400." },
    fecha: "2026-10-14",
    entrada: { ricavi: 30000, attivita: "commercio", aliquota: "avvio", contributi: 0 },
    esperado: { redditoLordo: 12000, imposta: 600, netto: 29400 },
  },
  {
    nombre: "Ricavi oltre la soglia di accesso",
    origen: { tipo: "recalculado", detalle: "90.000 × 67% = 60.300; imposta 15% = 9.045." },
    fecha: "2026-10-14",
    entrada: { ricavi: 90000, attivita: "altre", aliquota: "ordinaria", contributi: 0 },
    esperado: { redditoLordo: 60300, imposta: 9045, netto: 80955 },
  },
  {
    nombre: "Costruzioni con coefficiente dell'86%",
    origen: { tipo: "recalculado", detalle: "20.000 × 86% = 17.200; meno 4.000 = 13.200; imposta 15% = 1.980." },
    fecha: "2026-10-14",
    entrada: { ricavi: 20000, attivita: "costruzioni-immobiliare", aliquota: "ordinaria", contributi: 4000 },
    esperado: { redditoLordo: 17200, imponibile: 13200, imposta: 1980 },
  },
]);
