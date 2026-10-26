import { definirCasos } from "@/motor/calculo";
import viivastyskorko from "./viivastyskorkolaskuri";

const SP26 = "https://www.suomenpankki.fi/en/news-and-topical/press-releases-and-news/releases/2026/reference-rate-and-penalty-interest-rates-for-1-july--31-december-2026/";
const SP25 = "https://www.suomenpankki.fi/en/news-and-topical/press-releases-and-news/releases/2025/reference-rate-and-penalty-interest-rates-for-1-july--31-december-2025/";

export default definirCasos(viivastyskorko, [
  {
    nombre: "1 000 euroa 30 päivää myöhässä vuonna 2026",
    origen: { tipo: "recalculado", url: SP26, detalle: "Viivästyskorko 9,5 %: 1 000 × 9,5 % × 30 / 365 = 7,81." },
    fecha: "2026-10-24",
    entrada: { summa: 1000, erapaiva: "2026-01-31", maksupaiva: "2026-03-02", laji: "kuluttaja" },
    esperado: { korko: 7.81, paivat: 30, nykyinen: 9.5 },
  },
  {
    nombre: "Viivästys kesä-heinäkuun 2025 vaihteessa",
    origen: {
      tipo: "recalculado",
      url: SP25,
      detalle: "16.-30.6.2025: 15 päivää × 10,5 %; 1.-15.7.2025: 15 päivää × 9,5 %. 1 000 × (1,575 + 1,425) / 365 = 8,22.",
    },
    fecha: "2026-10-24",
    entrada: { summa: 1000, erapaiva: "2025-06-15", maksupaiva: "2025-07-15", laji: "kuluttaja" },
    esperado: { korko: 8.22, paivat: 30 },
  },
  {
    nombre: "Kaupallinen sopimus: viitekorko + 8",
    origen: { tipo: "recalculado", url: SP25, detalle: "11,5 % ja 10,5 % samoilla jaksoilla: 1 000 × (1,725 + 1,575) / 365 = 9,04." },
    fecha: "2026-10-24",
    entrada: { summa: 1000, erapaiva: "2025-06-15", maksupaiva: "2025-07-15", laji: "kaupallinen" },
    esperado: { korko: 9.04 },
  },
  {
    nombre: "Maksupäivä ennen eräpäivää",
    origen: { tipo: "recalculado", url: SP26, detalle: "Ei viivästystä." },
    fecha: "2026-10-24",
    entrada: { summa: 1000, erapaiva: "2026-03-01", maksupaiva: "2026-02-01", laji: "kuluttaja" },
    esperaError: true,
  },
]);
