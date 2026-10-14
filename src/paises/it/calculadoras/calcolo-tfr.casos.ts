import { definirCasos } from "@/motor/calculo";
import tfr from "./calcolo-tfr";

export default definirCasos(tfr, [
  {
    nombre: "Anno intero con 30.000 euro e fondo di 10.000 euro",
    origen: {
      tipo: "recalculado",
      detalle: "30.000 / 13,5 = 2.222,22; contributo 0,50% = 150; quota 2.072,22. Tasso 1,5 + 75% di 1,4 = 2,55%; rivalutazione 255; imposta 17% = 43,35; netta 211,65; totale 12.283,87.",
    },
    fecha: "2026-10-14",
    entrada: { retribuzione: 30000, mesi: 12, fondo: 10000, inflazione: 1.4 },
    esperado: { quotaLorda: 2222.22, contributo: 150, quotaNetta: 2072.22, tasso: 2.55, rivalutazione: 255, imposta: 43.35, rivalutazioneNetta: 211.65, totale: 12283.87 },
  },
  {
    nombre: "Coefficiente di agosto 2026 (8 mesi)",
    origen: {
      tipo: "recalculado",
      detalle:
        "Tasso fisso 1,5 × 8 / 12 = 1; 75% di 3,61465021 (aumento FOI agosto 2026 su dicembre 2025) = 2,710988; tasso 3,710988%. 20.000 × 3,710988% = 742,20; imposta 126,17; netta 616,03. Quota 24.000 × 8 / 12 / 13,5 = 1.185,19, meno 80 di contributo = 1.105,19. Totale 21.721,22.",
    },
    fecha: "2026-09-20",
    entrada: { retribuzione: 24000, mesi: 8, fondo: 20000, inflazione: 3.61465021 },
    esperado: { tasso: 3.710988, rivalutazione: 742.2, imposta: 126.17, rivalutazioneNetta: 616.03, quotaLorda: 1185.19, quotaNetta: 1105.19, totale: 21721.22 },
  },
  {
    nombre: "Primo anno di lavoro, senza fondo",
    origen: { tipo: "recalculado", detalle: "13.500 / 13,5 = 1.000; contributo 67,50; quota 932,50; nessuna rivalutazione." },
    fecha: "2026-10-14",
    entrada: { retribuzione: 13500, mesi: 12, fondo: 0, inflazione: null },
    esperado: { quotaLorda: 1000, contributo: 67.5, quotaNetta: 932.5, rivalutazione: 0, totale: 932.5 },
  },
  {
    nombre: "Tredici mesi non esistono",
    origen: { tipo: "recalculado", detalle: "I mesi vanno da 1 a 12." },
    fecha: "2026-10-14",
    entrada: { retribuzione: 13500, mesi: 13, fondo: 0, inflazione: null },
    esperaError: true,
  },
]);
