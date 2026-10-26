import { definirCasos } from "@/motor/calculo";
import urokZProdleni from "./urok-z-prodleni";

const NV = "https://www.zakonyprolidi.cz/cs/2013-351";

export default definirCasos(urokZProdleni, [
  {
    nombre: "Prodlení od dubna 2026",
    origen: {
      tipo: "recalculado",
      url: NV,
      detalle: "Prodlení začalo 1. 4. 2026, repo ČNB k 1. 1. 2026 = 3,50 % + 8 = 11,5 %. 10 000 × 11,5 % × 207 / 365 = 652,19 Kč.",
    },
    fecha: "2026-10-24",
    entrada: { castka: 10000, splatnost: "2026-03-31", zaplaceni: "2026-10-24" },
    esperado: { sazba: 11.5, dny: 207, urok: 652.19, celkem: 10652.19 },
  },
  {
    nombre: "Prodlení od července 2026",
    origen: {
      tipo: "recalculado",
      url: "https://www.cnb.cz/cs/casto-kladene-dotazy/.galleries/vyvoj_repo_historie.txt",
      detalle: "Repo ČNB od 19. 6. 2026 = 3,75 %, k 1. 7. 2026 tedy 3,75 + 8 = 11,75 %. 100 000 × 11,75 % × 92 / 365 = 2 961,64 Kč.",
    },
    fecha: "2026-10-24",
    entrada: { castka: 100000, splatnost: "2026-07-15", zaplaceni: "2026-10-15" },
    esperado: { sazba: 11.75, repo: 3.75, urok: 2961.64 },
  },
  {
    nombre: "Starší dluh z roku 2024",
    origen: { tipo: "recalculado", url: NV, detalle: "Repo k 1. 1. 2024 = 6,75 %, úrok 14,75 %. 50 000 × 14,75 % × 335 / 365 = 6 768,84 Kč." },
    fecha: "2026-10-24",
    entrada: { castka: 50000, splatnost: "2024-01-31", zaplaceni: "2024-12-31" },
    esperado: { sazba: 14.75, urok: 6768.84 },
  },
  {
    nombre: "Splatnost 31. 12.: prodlení začíná v novém pololetí",
    origen: { tipo: "recalculado", url: NV, detalle: "První den prodlení 1. 1. 2026, repo k tomuto dni 3,50 %. 20 000 × 11,5 % × 31 / 365 = 195,34 Kč." },
    fecha: "2026-10-24",
    entrada: { castka: 20000, splatnost: "2025-12-31", zaplaceni: "2026-01-31" },
    esperado: { zacatek: "2026-01-01", sazba: 11.5, urok: 195.34 },
  },
  {
    nombre: "Zaplaceno včas",
    origen: { tipo: "recalculado", url: NV, detalle: "Bez prodlení není úrok." },
    fecha: "2026-10-24",
    entrada: { castka: 20000, splatnost: "2026-05-31", zaplaceni: "2026-05-31" },
    esperaError: true,
  },
]);
