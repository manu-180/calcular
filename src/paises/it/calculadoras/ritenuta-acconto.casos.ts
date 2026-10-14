import { definirCasos } from "@/motor/calculo";
import ritenutaAcconto from "./ritenuta-acconto";

export default definirCasos(ritenutaAcconto, [
  {
    nombre: "Fattura da 1.000 euro con rivalsa INPS e IVA",
    origen: { tipo: "recalculado", detalle: "Rivalsa 4% = 40; imponibile 1.040; IVA 22% = 228,80; totale 1.268,80; ritenuta 20% di 1.040 = 208; netto 1.060,80." },
    fecha: "2026-10-14",
    entrada: { compenso: 1000, rivalsa: true, iva: true },
    esperado: { rivalsa: 40, imponibile: 1040, iva: 228.8, totale: 1268.8, ritenuta: 208, netto: 1060.8 },
  },
  {
    nombre: "Fattura da 1.000 euro senza rivalsa",
    origen: { tipo: "recalculado", detalle: "IVA 220; totale 1.220; ritenuta 200; netto 1.020." },
    fecha: "2026-10-14",
    entrada: { compenso: 1000, rivalsa: false, iva: true },
    esperado: { iva: 220, totale: 1220, ritenuta: 200, netto: 1020 },
  },
  {
    nombre: "Prestazione occasionale da 500 euro",
    origen: { tipo: "recalculado", detalle: "Senza IVA: ritenuta 20% = 100; netto 400." },
    fecha: "2026-10-14",
    entrada: { compenso: 500, rivalsa: false, iva: false },
    esperado: { iva: 0, totale: 500, ritenuta: 100, netto: 400 },
  },
  {
    nombre: "Compenso a zero",
    origen: { tipo: "recalculado", detalle: "Serve un compenso positivo." },
    fecha: "2026-10-14",
    entrada: { compenso: 0, rivalsa: false, iva: false },
    esperaError: true,
  },
]);
