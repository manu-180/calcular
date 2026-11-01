import { definirCasos } from "@/motor/calculo";
import inflationsberegner from "./inflationsberegner";

const DST = "https://api.statbank.dk/v1/data/PRIS01/CSV?VAREGR=000000&ENHED=100&Tid=*";

export default definirCasos(inflationsberegner, [
  {
    nombre: "1.000 kr. fra september 2025 til september 2026",
    origen: { tipo: "oficial", url: DST, detalle: "PRIS01: september 2025 = 100,41, september 2026 = 102,60. 1.000 × 102,60 / 100,41 = 1.021,81." },
    fecha: "2026-10-24",
    entrada: { beloeb: 1000, fra: "2025-09-15", til: "2026-09-01" },
    esperado: { idag: 1021.81, forskel: 21.81, fraMaaned: "september 2025", tilMaaned: "september 2026" },
  },
  {
    nombre: "Til en måned uden tal endnu",
    origen: { tipo: "oficial", url: DST, detalle: "Oktober 2026 er ikke offentliggjort 24. oktober; beregningen stopper i september 2026." },
    fecha: "2026-10-24",
    entrada: { beloeb: 1000, fra: "2025-09-01", til: "2026-10-24" },
    esperado: { idag: 1021.81, tilMaaned: "september 2026" },
  },
  {
    nombre: "Startmåned efter slutmåned",
    origen: { tipo: "recalculado", url: DST, detalle: "Datoerne er byttet om." },
    fecha: "2026-10-24",
    entrada: { beloeb: 1000, fra: "2026-05-01", til: "2025-05-01" },
    esperaError: true,
  },
]);
