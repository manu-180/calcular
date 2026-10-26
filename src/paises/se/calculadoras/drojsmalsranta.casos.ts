import { definirCasos } from "@/motor/calculo";
import drojsmalsranta from "./drojsmalsranta";

const LAG = "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/rantelag-1975635_sfs-1975-635/";

export default definirCasos(drojsmalsranta, [
  {
    nombre: "10 000 kr, förfallen 30 juni 2025, betald 31 januari 2026",
    origen: {
      tipo: "recalculado",
      url: LAG,
      detalle: "6 § räntelagen: referensränta 2 % plus 8 = 10 %. 184 dagar i andra halvåret 2025 ger 504,11 kr och 31 dagar i januari 2026 ger 84,93 kr. Summa 589,04 kr.",
    },
    fecha: "2026-10-24",
    entrada: { belopp: 10000, forfallodag: "2025-06-30", betalning: "2026-01-31" },
    esperado: { ranta: 589.04, totalt: 10589.04, dagar: 215, satsIdag: 10 },
  },
  {
    nombre: "Över halvårsskiftet 2024 till 2025",
    origen: {
      tipo: "recalculado",
      url: LAG,
      detalle: "16 dagar i december 2024 med 4 + 8 = 12 % ger 52,60 kr. 31 dagar i januari 2025 med 3 + 8 = 11 % ger 93,42 kr. Summa 146,03 kr.",
    },
    fecha: "2026-10-24",
    entrada: { belopp: 10000, forfallodag: "2024-12-15", betalning: "2025-01-31" },
    esperado: { ranta: 146.03 },
  },
  {
    nombre: "Betalning före förfallodagen",
    origen: { tipo: "recalculado", url: LAG, detalle: "Ingen ränta utan dröjsmål." },
    fecha: "2026-10-24",
    entrada: { belopp: 10000, forfallodag: "2026-05-01", betalning: "2026-04-01" },
    esperaError: true,
  },
]);
