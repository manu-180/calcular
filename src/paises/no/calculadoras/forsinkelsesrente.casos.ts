import { definirCasos } from "@/motor/calculo";
import forsinkelsesrente from "./forsinkelsesrente";

const F1 = "https://lovdata.no/dokument/LTI/forskrift/2025-12-18-2658";
const F2 = "https://lovdata.no/dokument/LTI/forskrift/2026-06-25-1372";

export default definirCasos(forsinkelsesrente, [
  {
    nombre: "10 000 kr forfalt 31. mars, betalt 24. oktober 2026",
    origen: { tipo: "recalculado", url: F2, detalle: "1.4 til 30.6: 91 dager × 12 % = 299,18. 1.7 til 24.10: 116 dager × 12,25 % = 389,32. Sum 688,49." },
    fecha: "2026-10-24",
    entrada: { belop: 10000, forfall: "2026-03-31", betalt: "2026-10-24" },
    esperado: { rente: 688.49, totalt: 10688.49, dager: 207, satsNa: 12.25 },
  },
  {
    nombre: "30 dager i første halvår",
    origen: { tipo: "recalculado", url: F1, detalle: "50 000 × 12 % × 30 / 365 = 493,15." },
    fecha: "2026-10-24",
    entrada: { belop: 50000, forfall: "2026-02-01", betalt: "2026-03-03" },
    esperado: { rente: 493.15 },
  },
  {
    nombre: "Betalt før forfall",
    origen: { tipo: "recalculado", url: F2, detalle: "Ingen forsinkelse." },
    fecha: "2026-10-24",
    entrada: { belop: 10000, forfall: "2026-05-01", betalt: "2026-04-01" },
    esperaError: true,
  },
]);
